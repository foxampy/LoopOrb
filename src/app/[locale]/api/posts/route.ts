import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth/api";

// GET /api/posts - Get posts (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const userId = searchParams.get("userId");
    const projectId = searchParams.get("projectId");
    const objectId = searchParams.get("objectId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);
    const skip = (page - 1) * limit;
    
    const where: any = {};
    if (userId) where.authorId = userId;
    if (projectId) where.projectId = projectId;
    if (objectId) where.objectId = objectId;
    
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            handle: true,
            avatar: true,
            level: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });
    
    const total = await prisma.post.count({ where });
    
    return NextResponse.json({
      success: true,
      data: {
        posts: posts.map(post => ({
          ...post,
          likesCount: post._count.likes,
          commentsCount: post._count.comments,
          _count: undefined
        })),
        pagination: { page, limit, total, pages: Math.ceil(total / limit) }
      }
    });
    
  } catch (error) {
    console.error("Posts API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post (authenticated)
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    
    if (!auth.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { content, images = [], projectId, objectId, mentions = [], hashtags = [] } = body;
    
    // Validate
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Content is required" },
        { status: 400 }
      );
    }
    
    if (content.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Content too long (max 5000 characters)" },
        { status: 400 }
      );
    }
    
    // Create post
    const post = await prisma.post.create({
      data: {
        content: content.trim(),
        images,
        authorId: auth.user.id,
        projectId: projectId || null,
        objectId: objectId || null,
        mentions,
        hashtags
        // type: 'GENERAL' // TODO: Enable after schema migration
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            handle: true,
            avatar: true,
            level: true
          }
        }
      }
    });
    
    // Award XP for posting
    await prisma.user.update({
      where: { id: auth.user.id },
      data: { xp: { increment: 10 } }
    });
    
    return NextResponse.json({
      success: true,
      data: { post }
    });
    
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
