import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api";

const demoProposals: Record<string, any> = {
  "p1": {
    id: "p1",
    title: "Финансирование очистки реки Амударья",
    description: "Выделение 500,000 UNITY на проект по очистке верховьев реки Амударья от промышленных отходов. Проект включает установку фильтрационных станций и мониторинг качества воды.",
    category: "PROJECT_FUNDING",
    status: "ACTIVE",
    votesFor: 125000,
    votesAgainst: 15000,
    votesAbstain: 5000,
    startDate: "2026-02-15T00:00:00Z",
    endDate: "2026-03-15T23:59:59Z",
    author: { id: "1", name: "ЭкоФонд Центральной Азии", avatar: null },
    votes: [
      { user: { id: "1", name: "Алексей Иванов", avatar: null }, vote: "FOR", weight: 15000 },
      { user: { id: "2", name: "Мария Петрова", avatar: null }, vote: "FOR", weight: 8000 },
      { user: { id: "3", name: "Иван Сидоров", avatar: null }, vote: "AGAINST", weight: 5000 },
    ],
    createdAt: "2026-02-15T10:00:00Z",
  },
  "p2": {
    id: "p2",
    title: "Увеличение награды за добавление данных",
    description: "Предлагается увеличить награду за добавление качественных данных о водных объектах с 50 до 75 UNITY для стимулирования активности сообщества.",
    category: "PARAMETER_CHANGE",
    status: "ACTIVE",
    votesFor: 85000,
    votesAgainst: 42000,
    votesAbstain: 8000,
    startDate: "2026-02-10T00:00:00Z",
    endDate: "2026-02-25T23:59:59Z",
    author: { id: "2", name: "Светлана Ким", avatar: null },
    votes: [
      { user: { id: "1", name: "Алексей Иванов", avatar: null }, vote: "FOR", weight: 15000 },
    ],
    createdAt: "2026-02-10T10:00:00Z",
  },
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const proposal = demoProposals[id] || {
      id,
      title: "Предложение не найдено",
      description: "",
      category: "OTHER",
      status: "CANCELLED",
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      votes: [],
      author: { id: "0", name: "Unknown", avatar: null },
      createdAt: new Date().toISOString(),
    };

    const forVotes = proposal.votesFor;
    const againstVotes = proposal.votesAgainst;
    const abstainVotes = proposal.votesAbstain;
    const totalVotes = forVotes + againstVotes + abstainVotes;

    return successResponse({
      proposal,
      results: {
        for: forVotes,
        against: againstVotes,
        abstain: abstainVotes,
        total: totalVotes,
        forPercentage: totalVotes > 0 ? (forVotes / totalVotes) * 100 : 0,
      },
    });
  } catch (error) {
    console.error("Get proposal error:", error);
    return errorResponse("Internal server error", 500);
  }
}
