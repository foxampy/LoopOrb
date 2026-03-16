import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateRequest } from "@/lib/auth/api";

// POST /api/auth/role - Change user role (dev only)
export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateRequest(request);
    
    if (!auth.user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 }
      );
    }
    
    // Only allow in development
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { success: false, error: "Not allowed in production" },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { role } = body;
    
    const validRoles = ['CITIZEN', 'SCIENTIST', 'INVESTOR', 'GOVERNMENT', 'OPERATOR', 'ADMIN'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { success: false, error: "Invalid role" },
        { status: 400 }
      );
    }
    
    await prisma.user.update({
      where: { id: auth.user.id },
      data: { role }
    });
    
    return NextResponse.json({
      success: true,
      data: { role }
    });
    
  } catch (error) {
    console.error("Change role error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
