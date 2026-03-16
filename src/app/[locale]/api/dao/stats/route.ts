import { NextRequest, NextResponse } from "next/server";

// GET /api/dao/stats - Get DAO statistics
export async function GET(req: NextRequest) {
  try {
    // In production, fetch from database
    const stats = {
      totalProposals: 12,
      activeProposals: 3,
      passedProposals: 7,
      rejectedProposals: 2,
      totalParticipants: 1247,
      totalVotingPower: 2500000,
      userVotingPower: 0,
      userStaked: 0,
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("DAO stats error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch DAO stats",
      },
      { status: 500 }
    );
  }
}
