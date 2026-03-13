import { NextRequest } from "next/server";
import { z } from "zod";
import { successResponse, errorResponse } from "@/lib/api";

const voteSchema = z.object({
  vote: z.enum(["FOR", "AGAINST", "ABSTAIN"]),
  reason: z.string().optional(),
});

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const result = voteSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("Validation failed", 400, result.error.flatten());
    }

    const { vote, reason } = result.data;
    const votingPower = 15420; // Demo voting power

    // Demo mode - просто возвращаем success
    return successResponse({ 
      message: "Vote recorded successfully", 
      votingPower,
      vote,
      proposalId: id,
      reason: reason || null,
    });
  } catch (error) {
    console.error("Vote error:", error);
    return errorResponse("Internal server error", 500);
  }
}
