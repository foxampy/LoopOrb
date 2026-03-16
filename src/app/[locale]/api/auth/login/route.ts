import { NextRequest } from "next/server";
import { z } from "zod";
import { errorResponse, successResponse } from "@/lib/api";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Demo user
const demoUser = {
  id: "demo-user-001",
  email: "demo@looporb.io",
  name: "Алексей Иванов",
  role: "INVESTOR",
  avatar: null,
  unityBalance: 15420.50,
  level: 12,
  xp: 3450,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("Invalid credentials", 400);
    }

    // Demo mode - любые credentials работают
    return successResponse({
      user: demoUser,
      token: "demo-token-12345",
    });
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse("Internal server error", 500);
  }
}
