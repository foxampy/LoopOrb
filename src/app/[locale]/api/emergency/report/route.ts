import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/emergency/report
 * 
 * Создание нового отчёта о критическом загрязнении
 * 
 * Request Body:
 * - incidentType: "spill" | "fish_death" | "color_change" | "other"
 * - description: string
 * - location: { lat: number, lng: number, address?: string }
 * - contactEmail?: string
 * - contactPhone?: string
 * - mediaUrls?: string[] (URL загруженных файлов)
 * 
 * Response:
 * - reportId: string
 * - status: "pending" | "verified" | "rejected"
 * - rewardAmount?: number (после верификации)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Валидация обязательных полей
    const { incidentType, location } = body;

    if (!incidentType || !location) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Необходимо указать тип происшествия и местоположение",
          },
        },
        { status: 400 }
      );
    }

    // Валидация типа происшествия
    const validTypes = ["spill", "fish_death", "color_change", "other"];
    if (!validTypes.includes(incidentType)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Неверный тип происшествия",
          },
        },
        { status: 400 }
      );
    }

    // Валидация координат
    const { lat, lng } = location;
    if (
      typeof lat !== "number" ||
      typeof lng !== "number" ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Неверные координаты",
          },
        },
        { status: 400 }
      );
    }

    // Генерация ID отчёта (в реальности - из БД)
    const reportId = `emerg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Определение диапазона награды на основе типа
    const rewardRanges: Record<string, { min: number; max: number }> = {
      spill: { min: 100, max: 500 },
      fish_death: { min: 50, max: 300 },
      color_change: { min: 50, max: 200 },
      other: { min: 50, max: 150 },
    };

    const rewardRange = rewardRanges[incidentType];

    // TODO: Сохранение в базу данных
    // TODO: Отправка уведомления модераторам
    // TODO: Создание маркера на глобусе
    // TODO: WebSocket событие для реального времени

    return NextResponse.json(
      {
        success: true,
        data: {
          reportId,
          status: "pending",
          incidentType,
          location,
          estimatedReward: {
            min: rewardRange.min,
            max: rewardRange.max,
            currency: "VOD",
          },
          message: "Репорт успешно создан. После верификации вы получите награду.",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Emergency report error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Произошла ошибка при создании отчёта",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/emergency/report/:id
 * 
 * Получение статуса отчёта
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const reportId = searchParams.get("id");

  if (!reportId) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Необходимо указать ID отчёта",
        },
      },
      { status: 400 }
    );
  }

  // TODO: Получение из БД
  // Mock response
  return NextResponse.json({
    success: true,
    data: {
      reportId,
      status: "pending",
      createdAt: new Date().toISOString(),
      verificationProgress: 0,
    },
  });
}
