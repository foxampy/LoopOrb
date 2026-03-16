import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth/api";

// GET /api/feed - Get personalized feed
export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);
    const type = searchParams.get("type"); // 'all', 'news', 'projects', 'dao', 'following'
    const skip = (page - 1) * limit;
    
    // Build where clause based on feed type
    let where: any = {};
    
    switch (type) {
      case 'news':
        where.type = { in: ['NEWS', 'CRISIS_ALERT'] };
        break;
      case 'projects':
        where.type = 'PROJECT_UPDATE';
        break;
      case 'dao':
        where.type = 'DAO_PROPOSAL';
        break;
      case 'following':
        if (auth.user) {
          const following = await prisma.follow.findMany({
            where: { followerId: auth.user.id },
            select: { followingId: true }
          });
          where.authorId = { in: following.map(f => f.followingId) };
        }
        break;
      default:
        // 'all' - no filter
        break;
    }
    
    // Get posts with engagement data
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            handle: true,
            avatar: true,
            level: true,
            reputation: true
          }
        },
        project: {
          select: {
            id: true,
            name: true,
            slug: true,
            coverImage: true
          }
        },
        object: {
          select: {
            id: true,
            name: true,
            type: true,
            country: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      },
      orderBy: [
        { createdAt: 'desc' }
      ],
      skip,
      take: limit
    });
    
    // Check if user liked posts
    let likedPostIds: string[] = [];
    if (auth.user) {
      const likes = await prisma.like.findMany({
        where: {
          userId: auth.user.id,
          postId: { in: posts.map(p => p.id) }
        },
        select: { postId: true }
      });
      likedPostIds = likes.map(l => l.postId);
    }
    
    // Enrich posts with user-specific data
    const enrichedPosts = posts.map(post => ({
      ...post,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
      isLiked: likedPostIds.includes(post.id),
      _count: undefined
    }));
    
    // Get total count
    const total = await prisma.post.count({ where });
    
    return NextResponse.json({
      success: true,
      data: {
        posts: enrichedPosts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
    
  } catch (error) {
    console.error("Feed API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
