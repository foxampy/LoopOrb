import { NextRequest } from "next/server";
import { successResponse, errorResponse, getPaginationParams, paginatedResponse } from "@/lib/api";

const demoProposals = [
  {
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
    _count: { votes: 145 },
    createdAt: "2026-02-15T10:00:00Z",
  },
  {
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
    _count: { votes: 89 },
    createdAt: "2026-02-10T10:00:00Z",
  },
  {
    id: "p3",
    title: "Партнёрство с ЮНЕСКО",
    description: "Вход в программу ЮНЕСКО по сохранению водных ресурсов. Это откроет доступ к международному финансированию и экспертизе.",
    category: "ECOSYSTEM",
    status: "PASSED",
    votesFor: 250000,
    votesAgainst: 5000,
    votesAbstain: 2000,
    startDate: "2026-01-20T00:00:00Z",
    endDate: "2026-02-10T23:59:59Z",
    executedAt: "2026-02-12T10:00:00Z",
    author: { id: "3", name: "Дмитрий Волков", avatar: null },
    _count: { votes: 234 },
    createdAt: "2026-01-20T10:00:00Z",
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const { page, limit } = getPaginationParams(req);

    let filtered = [...demoProposals];
    
    if (status) filtered = filtered.filter(p => p.status === status);
    if (category) filtered = filtered.filter(p => p.category === category);

    const total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    return successResponse(paginatedResponse(paginated, total, page, limit));
  } catch (error) {
    console.error("Get proposals error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newProposal = {
      id: "p" + Date.now(),
      ...body,
      status: "ACTIVE",
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      author: { id: "demo", name: "Demo User", avatar: null },
      _count: { votes: 0 },
      createdAt: new Date().toISOString(),
    };
    
    return successResponse({ proposal: newProposal }, 201);
  } catch (error) {
    console.error("Create proposal error:", error);
    return errorResponse("Internal server error", 500);
  }
}
