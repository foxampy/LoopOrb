import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api";

// POST /api/auth/register - Register new user (demo mode)
export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return errorResponse("Missing required fields", 400);
    }

    // Demo mode - просто возвращаем success
    return successResponse({
      user: {
        id: "new-user-" + Date.now(),
        email,
        name,
        role: "CITIZEN",
        unityBalance: 10,
      },
      token: "demo-token-" + Date.now(),
    });
  } catch (error) {
    console.error("Register error:", error);
    return errorResponse("Internal server error", 500);
  }
}
