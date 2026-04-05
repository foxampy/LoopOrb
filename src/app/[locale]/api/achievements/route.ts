import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth/api";

// GET /api/achievements - Get all achievements
export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const includeUser = searchParams.get("user") === 'true';

    const where: any = {};
    if (category) where.category = category.toUpperCase();

    const achievements = await prisma.achievement.findMany({
      where,
      orderBy: [
        // @ts-ignore - collectionValue exists in schema but not in generated types yet
        { collectionValue: 'desc' },
        { xpReward: 'desc' }
      ]
    });

    // If user is authenticated, include their unlocked achievements
    let achievementsWithStatus = achievements;
    if (auth.user && includeUser) {
      const userAchievements = await prisma.userAchievement.findMany({
        where: { userId: auth.user.id },
      });

      const unlockedIds = new Set(userAchievements.map(ua => ua.achievementId));

      achievementsWithStatus = achievements.map(achievement => {
        const userAchievement = userAchievements.find(ua => ua.achievementId === achievement.id);
        return {
          ...achievement,
          isUnlocked: unlockedIds.has(achievement.id),
          unlockedAt: userAchievement?.unlockedAt,
          // @ts-ignore - progress may exist in extended schema
          progress: (userAchievement as any)?.progress || 0,
        };
      });
    }

    return NextResponse.json({
      success: true,
      data: { achievements: achievementsWithStatus }
    });

  } catch (error) {
    console.error("Get achievements error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/achievements/check - Check and award achievements
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);

    if (!auth.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get user's current stats
    const user = await prisma.user.findUnique({
      where: { id: auth.user.id },
      include: {
        _count: {
          select: {
            posts: true,
            data: true,
            stakes: true,
            projects: true,
            objects: true
          }
        },
        achievements: {
          select: { achievementId: true }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const unlockedIds = new Set(user.achievements.map(a => a.achievementId));

    // Get all achievements not yet unlocked
    const achievements = await prisma.achievement.findMany({
      where: {
        id: { notIn: Array.from(unlockedIds) }
      }
    });

    const newlyUnlocked = [];

    // Check each achievement condition
    for (const achievement of achievements) {
      const condition = achievement.condition as any;
      let shouldUnlock = false;

      switch (condition?.type) {
        case 'posts_count':
          shouldUnlock = user._count.posts >= condition.value;
          break;
        case 'data_count':
          shouldUnlock = user._count.data >= condition.value;
          break;
        case 'stakes_count':
          shouldUnlock = user._count.stakes >= condition.value;
          break;
        case 'projects_count':
          shouldUnlock = user._count.projects >= condition.value;
          break;
        case 'level':
          shouldUnlock = user.level >= condition.value;
          break;
        case 'xp':
          shouldUnlock = user.xp >= condition.value;
          break;
        case 'reputation':
          shouldUnlock = user.reputation >= condition.value;
          break;
        case 'objects_count':
          shouldUnlock = user._count.objects >= condition.value;
          break;
        // Add more cases as needed for other achievement types
      }

      if (shouldUnlock) {
        // Award achievement
        await prisma.userAchievement.create({
          data: {
            userId: auth.user.id,
            achievementId: achievement.id
          }
        });

        // Award XP and ORB tokens
        await prisma.user.update({
          where: { id: auth.user.id },
          data: {
            xp: { increment: achievement.xpReward },
            // @ts-ignore - orbReward exists in schema
            unityBalance: { increment: Number((achievement as any).orbReward) }
          }
        });

        // Create notification
        await prisma.notification.create({
          data: {
            userId: auth.user.id,
            type: 'ACHIEVEMENT_UNLOCKED',
            title: 'Достижение разблокировано!',
            message: `Вы получили "${achievement.name}" и заработали ${achievement.xpReward} XP`,
            data: {
              achievementId: achievement.id,
              achievementName: achievement.name,
              xpReward: achievement.xpReward,
              // @ts-ignore - orbReward exists in schema
              orbReward: Number((achievement as any).orbReward),
            }
          }
        });

        newlyUnlocked.push(achievement);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        checked: achievements.length,
        unlocked: newlyUnlocked.length,
        achievements: newlyUnlocked
      }
    });

  } catch (error) {
    console.error("Check achievements error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
