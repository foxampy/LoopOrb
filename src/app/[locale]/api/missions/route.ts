import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth/api";

// GET /api/missions - Get available missions
export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    const { searchParams } = new URL(request.url);
    
    const type = searchParams.get("type"); // 'daily', 'weekly', 'onetime'
    const category = searchParams.get("category");
    const includeUserProgress = searchParams.get("progress") === 'true';
    
    const where: any = { isActive: true };
    
    if (type) where.type = type.toUpperCase();
    if (category) where.category = category.toUpperCase();
    
    // For time-based missions, check availability
    const now = new Date();
    
    const missions = await prisma.mission.findMany({
      where,
      orderBy: [
        { type: 'asc' },
        { xpReward: 'desc' }
      ]
    });
    
    // Filter out expired and not yet started missions
    const availableMissions = missions.filter(m => {
      if (m.startDate && m.startDate > now) return false;
      if (m.endDate && m.endDate < now) return false;
      return true;
    });
    
    // If user is authenticated, include their progress
    let missionsWithProgress = availableMissions;
    if (auth.user && includeUserProgress) {
      const userMissions = await prisma.userMission.findMany({
        where: {
          userId: auth.user.id,
          missionId: { in: availableMissions.map(m => m.id) }
        }
      });
      
      missionsWithProgress = availableMissions.map(mission => {
        const userMission = userMissions.find(um => um.missionId === mission.id);
        return {
          ...mission,
          userProgress: userMission ? {
            status: userMission.status,
            progress: userMission.progress,
            target: userMission.target,
            startedAt: userMission.startedAt,
            completedAt: userMission.completedAt
          } : null
        };
      });
    }
    
    return NextResponse.json({
      success: true,
      data: { missions: missionsWithProgress }
    });
    
  } catch (error) {
    console.error("Get missions error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/missions/[id]/start - Start a mission
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    
    if (!auth.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const missionId = searchParams.get("missionId");
    const action = searchParams.get("action"); // 'start', 'progress', 'claim'
    
    if (!missionId) {
      return NextResponse.json(
        { success: false, error: "Mission ID required" },
        { status: 400 }
      );
    }
    
    const mission = await prisma.mission.findUnique({
      where: { id: missionId }
    });
    
    if (!mission) {
      return NextResponse.json(
        { success: false, error: "Mission not found" },
        { status: 404 }
      );
    }
    
    // Get or create user mission
    let userMission = await prisma.userMission.findUnique({
      where: {
        userId_missionId: {
          userId: auth.user.id,
          missionId
        }
      }
    });
    
    if (action === 'start' && !userMission) {
      // Parse requirements to get target
      const requirements = mission.requirements as any;
      const target = requirements?.count || 1;
      
      userMission = await prisma.userMission.create({
        data: {
          userId: auth.user.id,
          missionId,
          target,
          progress: 0,
          status: 'ACTIVE'
        }
      });
      
      return NextResponse.json({
        success: true,
        data: { userMission }
      });
    }
    
    if (action === 'progress' && userMission) {
      const newProgress = userMission.progress + 1;
      const isCompleted = newProgress >= userMission.target;
      
      userMission = await prisma.userMission.update({
        where: { id: userMission.id },
        data: {
          progress: newProgress,
          status: isCompleted ? 'COMPLETED' : 'ACTIVE',
          completedAt: isCompleted ? new Date() : null
        }
      });
      
      // If completed, award rewards
      if (isCompleted) {
        await prisma.user.update({
          where: { id: auth.user.id },
          data: {
            xp: { increment: mission.xpReward },
            unityBalance: { increment: mission.unityReward }
          }
        });
        
        // Create achievement notification
        await prisma.notification.create({
          data: {
            userId: auth.user.id,
            type: 'MISSION_COMPLETED',
            title: 'Mission Completed!',
            message: `You completed "${mission.title}" and earned ${mission.xpReward} XP`,
            data: { missionId, xpReward: mission.xpReward }
          }
        });
      }
      
      return NextResponse.json({
        success: true,
        data: { 
          userMission,
          completed: isCompleted,
          rewards: isCompleted ? {
            xp: mission.xpReward,
            unity: mission.unityReward
          } : null
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      data: { userMission }
    });
    
  } catch (error) {
    console.error("Mission action error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
