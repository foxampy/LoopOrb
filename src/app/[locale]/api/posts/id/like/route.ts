import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth/api";

// POST /api/posts/id/like - Like/unlike a post
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
    
    // Check if already liked
    const existingLike = await prisma.like.findFirst({
      where: {
        postId: id,
        userId: auth.user.id
      }
    });
    
    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
      
      await prisma.post.update({
        where: { id },
        data: { likesCount: { decrement: 1 } }
      });
      
      return NextResponse.json({
        success: true,
        data: { liked: false }
      });
    }
    
    // Like
    await prisma.like.create({
      data: {
        postId: id,
        userId: auth.user.id
      }
    });
    
    await prisma.post.update({
      where: { id },
      data: { likesCount: { increment: 1 } }
    });
    
    // Create notification for post author
    const post = await prisma.post.findUnique({
      where: { id },
      select: { authorId: true }
    });
    
    if (post && post.authorId !== auth.user.id) {
      await prisma.notification.create({
        data: {
          userId: post.authorId,
          type: 'POST_LIKE',
          title: 'New like on your post',
          message: `${auth.user.name} liked your post`,
          data: { postId: id, userId: auth.user.id }
        }
      });
    }
    
    return NextResponse.json({
      success: true,
      data: { liked: true }
    });
    
  } catch (error) {
    console.error("Like post error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
