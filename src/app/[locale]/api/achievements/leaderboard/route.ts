import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/achievements/leaderboard - Get achievements leaderboard
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");

    // Get users with their achievement stats
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        avatar: true,
        achievements: {
          select: {
            achievement: {
              select: {
                id: true,
                xpReward: true,
              }
            }
          }
        },
        xp: true,
      },
      orderBy: {
        xp: 'desc',
      },
      take: limit,
    });

    const leaderboard = users.map(user => ({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      achievementsCount: user.achievements.length,
      xp: user.xp,
      totalXpFromAchievements: user.achievements.reduce(
        (sum, ua) => sum + ua.achievement.xpReward, 
        0
      ),
    }));

    return NextResponse.json({
      success: true,
      data: { leaderboard }
    });

  } catch (error) {
    console.error("Get leaderboard error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
