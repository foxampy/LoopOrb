import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api";

// TODO: Connect to database when backend is ready
// const demoProposals has been removed - no mock data

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // TODO: Fetch from database
    // const proposal = await prisma.proposal.findUnique({ where: { id } });

    return errorResponse("DAO proposals are not yet available. The platform is in development.", 503);
  } catch (error) {
    console.error("Get proposal error:", error);
    return errorResponse("Internal server error", 500);
  }
}
