import { NextRequest, NextResponse } from "next/server";

// POST /api/dao/[id]/vote - Vote on a proposal
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { vote } = body;

    if (!vote || !["for", "against", "abstain"].includes(vote)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid vote type. Must be 'for', 'against', or 'abstain'",
        },
        { status: 400 }
      );
    }

    // Voting is not yet available. The platform is in development.
    return NextResponse.json(
      {
        success: false,
        error: "DAO voting is not yet available. The platform is in development.",
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to record vote",
      },
      { status: 500 }
    );
  }
}

// GET /api/dao/[id] - Get proposal details
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Proposals are not yet available. The platform is in development.
    return NextResponse.json(
      {
        success: false,
        error: "DAO proposals are not yet available. The platform is in development.",
      },
      { status: 503 }
    );
  } catch (error) {
    console.error("Get proposal error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Proposal not found",
      },
      { status: 404 }
    );
  }
}
