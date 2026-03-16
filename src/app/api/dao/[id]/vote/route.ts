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

    // In production, verify authentication and record vote in database
    // For now, return success with mock response

    return NextResponse.json({
      success: true,
      data: {
        vote: {
          proposalId: id,
          vote,
          votingPower: 1000, // Mock voting power
          timestamp: new Date().toISOString(),
        },
        message: "Vote recorded successfully",
      },
    });
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

    // Mock proposal data
    const proposal = {
      id,
      number: 1,
      title: "Финансирование очистки реки Амударья",
      description: "Выделение 500,000 UNITY на проект по очистке верховьев реки Амударья",
      fullDescription:
        "Проект включает установку фильтрационных станций и мониторинг качества воды. Ожидается улучшение качества воды на 40% в течение 2 лет.",
      category: "PROJECT_FUNDING",
      status: "active",
      level: "L3_PROJECTS",
      votesFor: 125000,
      votesAgainst: 15000,
      votesAbstain: 5000,
      startDate: "2026-02-15T00:00:00Z",
      endDate: "2026-03-15T23:59:59Z",
      createdAt: "2026-02-15T10:00:00Z",
      votesCount: 145000,
      quorumRequired: 5,
      quorumCurrent: 14.5,
      author: { name: "ЭкоФонд Центральной Азии", reputation: 8500 },
      comments: 47,
      shares: 23,
      bookmarks: 156,
      tags: ["экология", "финансирование", "реки"],
    };

    return NextResponse.json({
      success: true,
      data: { proposal },
    });
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
