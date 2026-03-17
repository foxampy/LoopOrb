import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/dao/proposals
 * Возвращает список предложений DAO
 * 
 * Статусы:
 * - 200: Успешный ответ (может быть пустой массив)
 * - 401: Требуется авторизация
 * - 503: Данные недоступны
 */
export async function GET(req: NextRequest) {
  try {
    // Проверка авторизации (заглушка - реализовать при подключении auth)
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      // Возвращаем пустой список для неавторизованных
      return NextResponse.json({
        success: true,
        data: {
          data: [],
          total: 0,
        },
        meta: {
          isEmpty: true,
          message: "Данные загружаются. Требуется авторизация для просмотра предложений.",
        },
      }, { status: 200 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const level = searchParams.get("level");
    const category = searchParams.get("category");

    // Пустой массив данных - готов к подключению реального API
    let proposals: any[] = [];

    // Фильтрация будет применяться к реальным данным
    if (status && status !== "all") {
      proposals = proposals.filter((p) => p.status === status);
    }
    if (level) {
      proposals = proposals.filter((p) => p.level === level);
    }
    if (category) {
      proposals = proposals.filter((p) => p.category === category);
    }

    const isEmpty = proposals.length === 0;

    return NextResponse.json({
      success: true,
      data: {
        data: proposals,
        total: proposals.length,
      },
      meta: isEmpty ? {
        isEmpty: true,
        message: "Предложения отсутствуют. Станьте первым, кто создаст предложение!",
      } : undefined,
    }, { status: 200 });
  } catch (error) {
    console.error("Get proposals error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch proposals",
        meta: {
          isError: true,
          message: "Сервис временно недоступен. Попробуйте позже.",
        },
      },
      { status: 503 }
    );
  }
}

/**
 * POST /api/dao/proposals
 * Создание нового предложения DAO
 * 
 * Статусы:
 * - 201: Предложение создано
 * - 400: Ошибка валидации
 * - 401: Требуется авторизация
 * - 500: Ошибка сервера
 */
export async function POST(req: NextRequest) {
  try {
    // Проверка авторизации
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        {
          success: false,
          error: "Authorization required",
          meta: {
            isAuthRequired: true,
            message: "Необходимо войти в аккаунт для создания предложения",
          },
        },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Валидация данных
    if (!body.title || !body.description) {
      return NextResponse.json(
        {
          success: false,
          error: "Title and description are required",
        },
        { status: 400 }
      );
    }

    // Заглушка для создания - вернуть ошибку 503 пока API не подключено
    return NextResponse.json(
      {
        success: false,
        error: "Proposal creation is temporarily unavailable",
        meta: {
          isError: true,
          message: "Создание предложений временно недоступно. Попробуйте позже.",
        },
      },
      { status: 503 }
    );
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
