import { NextRequest } from "next/server";
import { z } from "zod";
import { successResponse, errorResponse } from "@/lib/api";

const stakeSchema = z.object({
  projectId: z.string(),
  amount: z.number().positive(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = stakeSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("Validation failed", 400, result.error.flatten());
    }

    const { projectId, amount } = result.data;

    // Demo mode - просто возвращаем success
    const stake = {
      id: "stake" + Date.now(),
      userId: "demo-user-001",
      projectId,
      amount,
      apy: 10,
      status: "ACTIVE",
      startDate: new Date().toISOString(),
    };

    return successResponse({ stake, message: "Successfully staked " + amount + " UNITY" }, 201);
  } catch (error) {
    console.error("Create stake error:", error);
    return errorResponse("Internal server error", 500);
  }
}
