import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api";
import { prisma } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth/api";

// GET /api/auth/me - Get current user
export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    
    if (!auth.user) {
      return successResponse({ user: null });
    }
    
    // Get full user data with counts
    const user = await prisma.user.findUnique({
      where: { id: auth.user.id },
      include: {
        _count: {
          select: {
            posts: true,
            data: true,
            stakes: true,
            projects: true,
          }
        }
      }
    });
    
    if (!user) {
      return successResponse({ user: null });
    }
    
    // Format user data
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      handle: user.handle,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role,
      level: user.level,
      xp: user.xp,
      reputation: user.reputation,
      unityBalance: Number(user.unityBalance),
      // @ts-ignore - new fields from updated schema
      vodecoBalance: Number(user.vodecoBalance || 0),
      // @ts-ignore
      vodBalance: Number(user.vodBalance || 0),
      stakedAmount: Number(user.stakedAmount),
      postsCount: user._count.posts,
      dataCount: user._count.data,
      projectsCount: user._count.projects,
      createdAt: user.createdAt,
    };
    
    return successResponse({ user: userData });
  } catch (error) {
    console.error("Get user error:", error);
    return errorResponse("Internal server error", 500);
  }
}
