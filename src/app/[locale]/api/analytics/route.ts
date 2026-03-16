import { NextRequest, NextResponse } from "next/server";

// GET /api/analytics - Get platform analytics
export async function GET(request: NextRequest) {
  try {
    // In production, fetch from database
    // For now, return mock data structure
    const analytics = {
      totalUsers: 1247,
      activeUsers: 342,
      totalProjects: 4,
      activeProjects: 3,
      totalWaterObjects: 156,
      totalStaked: 25000,
      daoProposals: 12,
      daoVotes: 5500000,
      userGrowth: [
        { date: "2024-01-01", value: 100 },
        { date: "2024-01-02", value: 150 },
        { date: "2024-01-03", value: 200 },
        { date: "2024-01-04", value: 280 },
        { date: "2024-01-05", value: 350 },
        { date: "2024-01-06", value: 420 },
        { date: "2024-01-07", value: 500 },
      ],
      projectGrowth: [
        { date: "2024-01-01", value: 1 },
        { date: "2024-01-02", value: 2 },
        { date: "2024-01-03", value: 2 },
        { date: "2024-01-04", value: 3 },
        { date: "2024-01-05", value: 3 },
        { date: "2024-01-06", value: 4 },
        { date: "2024-01-07", value: 4 },
      ],
      stakingStats: {
        total: 25000,
        change: 5.2,
      },
      topProjects: [
        { name: "VOD-Lab Israel", raised: 125000, progress: 62 },
        { name: "Balkhash Conservation", raised: 89000, progress: 45 },
        { name: "Ocean Cleanup Initiative", raised: 67000, progress: 34 },
      ],
      userDistribution: [
        { role: "Citizen", count: 520, percentage: 42 },
        { role: "Scientist", count: 312, percentage: 25 },
        { role: "Investor", count: 249, percentage: 20 },
        { role: "Operator", count: 104, percentage: 8 },
        { role: "Government", count: 62, percentage: 5 },
      ],
      waterObjectsByType: [
        { type: "Реки", count: 62 },
        { type: "Озера", count: 45 },
        { type: "Станции", count: 28 },
        { type: "Океаны", count: 21 },
      ],
      recentActivity: [
        {
          type: "user",
          action: "Новый пользователь присоединился",
          time: "2 мин назад",
          user: "Alex M.",
        },
        {
          type: "project",
          action: "Проект 'Чистая вода' запущен",
          time: "15 мин назад",
          user: "EcoTeam",
        },
        {
          type: "water",
          action: "Добавлены данные по реке Волга",
          time: "1 час назад",
          user: "Dr. Smith",
        },
        {
          type: "stake",
          action: "Стейкинг 500 UNITY",
          time: "2 часа назад",
          user: "Investor123",
        },
        {
          type: "dao",
          action: "Создано новое предложение",
          time: "3 часа назад",
          user: "DAO_Master",
        },
      ],
    };

    return NextResponse.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch analytics",
      },
      { status: 500 }
    );
  }
}
