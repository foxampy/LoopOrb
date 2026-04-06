import { NextRequest } from "next/server";
import { z } from "zod";
import { errorResponse } from "@/lib/api";

const unstakeSchema = z.object({ stakeId: z.string() });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = unstakeSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("Validation failed", 400, result.error.flatten());
    }

    // Unstaking is not yet available. The platform is in development.
    return errorResponse("Unstaking is not yet available. The platform is in development.", 503);
  } catch (error) {
    console.error("Unstake error:", error);
    return errorResponse("Internal server error", 500);
  }
}
