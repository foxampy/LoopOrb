import { NextRequest, NextResponse } from "next/server";

const demoProposals = [
  {
    id: "p1",
    number: 1,
    title: "Финансирование очистки реки Амударья",
    description: "Выделение 500,000 UNITY на проект по очистке верховьев реки Амударья от промышленных отходов",
    fullDescription: "Проект включает установку фильтрационных станций и мониторинг качества воды. Ожидается улучшение качества воды на 40% в течение 2 лет.",
    category: "PROJECT_FUNDING",
    status: "active",
    level: "L3_PROJECTS" as const,
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
  },
  {
    id: "p2",
    number: 2,
    title: "Увеличение награды за добавление данных",
    description: "Предлагается увеличить награду за добавление качественных данных о водных объектах с 50 до 75 UNITY",
    fullDescription: "Это стимулирует активность сообщества и улучшит качество данных в системе.",
    category: "PARAMETER_CHANGE",
    status: "active",
    level: "L2_ECONOMIC" as const,
    votesFor: 85000,
    votesAgainst: 42000,
    votesAbstain: 8000,
    startDate: "2026-02-10T00:00:00Z",
    endDate: "2026-02-25T23:59:59Z",
    createdAt: "2026-02-10T10:00:00Z",
    votesCount: 135000,
    quorumRequired: 10,
    quorumCurrent: 13.5,
    author: { name: "Светлана Ким", reputation: 5200 },
    comments: 89,
    shares: 34,
    bookmarks: 78,
    tags: ["вознаграждения", "данные", "сообщество"],
  },
  {
    id: "p3",
    number: 3,
    title: "Партнёрство с ЮНЕСКО",
    description: "Вход в программу ЮНЕСКО по сохранению водных ресурсов",
    fullDescription: "Это откроет доступ к международному финансированию и экспертизе для масштабирования проектов.",
    category: "ECOSYSTEM",
    status: "passed",
    level: "L1_CONSTITUTIONAL" as const,
    votesFor: 250000,
    votesAgainst: 5000,
    votesAbstain: 2000,
    startDate: "2026-01-20T00:00:00Z",
    endDate: "2026-02-10T23:59:59Z",
    createdAt: "2026-01-20T10:00:00Z",
    votesCount: 257000,
    quorumRequired: 15,
    quorumCurrent: 25.7,
    author: { name: "Дмитрий Волков", reputation: 12000 },
    comments: 156,
    shares: 89,
    bookmarks: 234,
    tags: ["партнерство", "ЮНЕСКО", "масштабирование"],
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let filtered = [...demoProposals];

    if (status && status !== "all") {
      if (status === "active") {
        filtered = filtered.filter((p) => p.status === "active");
      } else if (status === "passed") {
        filtered = filtered.filter((p) => p.status === "passed");
      } else if (status === "rejected") {
        filtered = filtered.filter((p) => p.status === "rejected");
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        data: filtered,
        total: filtered.length,
      },
    });
  } catch (error) {
    console.error("Get proposals error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch proposals",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newProposal = {
      id: "p" + Date.now(),
      number: demoProposals.length + 1,
      ...body,
      status: "draft",
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      votesCount: 0,
      quorumRequired: 10,
      quorumCurrent: 0,
      author: { name: "User", reputation: 0 },
      comments: 0,
      shares: 0,
      bookmarks: 0,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: { proposal: newProposal },
    });
  } catch (error) {
    console.error("Create proposal error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create proposal",
      },
      { status: 500 }
    );
  }
}
