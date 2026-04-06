import { NextRequest } from "next/server";
import { z } from "zod";
import { errorResponse } from "@/lib/api";

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

    // Staking is not yet available. The platform is in development.
    return errorResponse("Staking is not yet available. The platform is in development.", 503);
  } catch (error) {
    console.error("Create stake error:", error);
    return errorResponse("Internal server error", 500);
  }
}
