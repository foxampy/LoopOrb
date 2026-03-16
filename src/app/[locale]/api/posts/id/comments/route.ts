import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth/api";

// GET /api/posts/id/comments - Get comments for a post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  try {
    const { id } = await params as { id: string };
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);
    const skip = (page - 1) * limit;
    
    const comments = await prisma.comment.findMany({
      where: {
        postId: id,
        parentId: null // Only top-level comments
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
        },
        replies: {
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
          },
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    });
    
    const total = await prisma.comment.count({
      where: { postId: id, parentId: null }
    });
    
    return NextResponse.json({
      success: true,
      data: {
        comments,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) }
      }
    });
    
  } catch (error) {
    console.error("Get comments error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/posts/id/comments - Add a comment
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  try {
    const auth = await authenticateRequest(request);
    const { id } = await params as { id: string };
    
    if (!auth.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { content, parentId } = body;
    
    if (!content || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Content is required" },
        { status: 400 }
      );
    }
    
    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        postId: id,
        authorId: auth.user.id,
        parentId: parentId || null
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
    
    // Update post comments count
    await prisma.post.update({
      where: { id },
      data: { commentsCount: { increment: 1 } }
    });
    
    // Award XP
    await prisma.user.update({
      where: { id: auth.user.id },
      data: { xp: { increment: 5 } }
    });
    
    // Notify post author
    const post = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true }
    });
    
    if (post && post.authorId !== auth.user.id) {
      await prisma.notification.create({
        data: {
          userId: post.authorId,
          type: 'POST_COMMENT',
          title: 'New comment on your post',
          message: `${auth.user.name} commented on your post`,
          data: { postId: id, commentId: comment.id, userId: auth.user.id }
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      data: { comment }
    });
    
  } catch (error) {
    console.error("Create comment error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
