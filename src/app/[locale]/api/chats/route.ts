import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth/api";

// GET /api/chats - Get user's chats
export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    
    if (!auth.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }

    // TODO: Enable after prisma generate
    // const chats = await prisma.chat.findMany({...})
    
    return NextResponse.json({
      success: true,
      data: { chats: [] }
    });
    
  } catch (error) {
    console.error("Get chats error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/chats - Create a new chat
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    
    if (!auth.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: { chat: { id: "temp" } }
    });
    
  } catch (error) {
    console.error("Create chat error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
