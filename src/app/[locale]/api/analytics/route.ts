import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/analytics
 * Возвращает аналитику платформы
 * 
 * Статусы:
 * - 200: Успешный ответ (пустые данные если нет информации)
 * - 401: Требуется авторизация
 * - 503: Данные недоступны
 */
export async function GET(request: NextRequest) {
  try {
    // Проверка авторизации
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      // Возвращаем пустую аналитику для неавторизованных
      return NextResponse.json({
        success: true,
        data: {
          totalUsers: 0,
          activeUsers: 0,
          totalProjects: 0,
          activeProjects: 0,
          totalWaterObjects: 0,
          totalStaked: 0,
          daoProposals: 0,
          daoVotes: 0,
          userGrowth: [],
          projectGrowth: [],
          stakingStats: { total: 0, change: 0 },
          topProjects: [],
          userDistribution: [],
          waterObjectsByType: [],
          recentActivity: [],
        },
        meta: {
          isEmpty: true,
          isAuthRequired: true,
          message: "Требуется авторизация для просмотра аналитики",
        },
      }, { status: 200 });
    }

    // Пустые данные - готов к подключению реального API
    const analytics = {
      totalUsers: 0,
      activeUsers: 0,
      totalProjects: 0,
      activeProjects: 0,
      totalWaterObjects: 0,
      totalStaked: 0,
      daoProposals: 0,
      daoVotes: 0,
      userGrowth: [],
      projectGrowth: [],
      stakingStats: { total: 0, change: 0 },
      topProjects: [],
      userDistribution: [],
      waterObjectsByType: [],
      recentActivity: [],
    };

    const isEmpty = analytics.totalUsers === 0;

    return NextResponse.json({
      success: true,
      data: analytics,
      ...(isEmpty ? {
        meta: {
          isEmpty: true,
          message: "Аналитика загружается. Данные появятся после начала активности платформы.",
        },
      } : {}),
    }, { status: 200 });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch analytics",
        meta: {
          isError: true,
          message: "Сервис аналитики временно недоступен",
        },
      },
      { status: 503 }
    );
  }
}
