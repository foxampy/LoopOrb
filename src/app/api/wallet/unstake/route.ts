import { NextRequest } from "next/server";
import { z } from "zod";
import { successResponse, errorResponse } from "@/lib/api";

const unstakeSchema = z.object({ stakeId: z.string() });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = unstakeSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("Validation failed", 400, result.error.flatten());
    }

    const { stakeId } = result.data;

    // Demo mode - просто возвращаем success
    const reward = 45.5;
    const principal = 1000;

    return successResponse({ 
      message: "Unstaked successfully", 
      stakeId,
      principal, 
      reward,
      total: principal + reward
    });
  } catch (error) {
    console.error("Unstake error:", error);
    return errorResponse("Internal server error", 500);
  }
}
