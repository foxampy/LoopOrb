import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api";

// POST /api/feed/[id]/like - Like/unlike a post (demo mode)
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: postId } = await params;
    
    // Demo mode - просто возвращаем liked: true
    return successResponse({ 
      liked: true, 
      postId,
      message: "Post liked successfully"
    });
  } catch (error) {
    console.error("Like post error:", error);
    return errorResponse("Failed to like post", 500);
  }
}
