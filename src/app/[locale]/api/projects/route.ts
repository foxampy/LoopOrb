import { NextRequest } from "next/server";
import { successResponse, errorResponse, getPaginationParams, paginatedResponse } from "@/lib/api";

/**
 * GET /api/projects
 * Возвращает список проектов
 * 
 * Статусы:
 * - 200: Успешный ответ (пустой массив если нет проектов)
 * - 401: Требуется авторизация
 * - 503: Данные недоступны
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const country = searchParams.get("country");
    const { page, limit } = getPaginationParams(req);

    // Пустой массив - готов к подключению реального API
    let projects: any[] = [];

    // Фильтрация будет применяться к реальным данным
    if (status) projects = projects.filter(p => p.status === status);
    if (type) projects = projects.filter(p => p.type === type);
    if (country) projects = projects.filter(p => p.country?.includes(country));

    const total = projects.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = projects.slice(start, end);
    const isEmpty = projects.length === 0;

    return successResponse(
      paginatedResponse(paginated, total, page, limit),
      200,
      isEmpty ? {
        isEmpty: true,
        message: "Проекты отсутствуют. Станьте первым, кто создаст проект!",
      } : undefined
    );
  } catch (error) {
    console.error("Get projects error:", error);
    return errorResponse("Internal server error", 503);
  }
}

/**
 * POST /api/projects
 * Создание нового проекта
 * 
 * Статусы:
 * - 201: Проект создан
 * - 400: Ошибка валидации
 * - 401: Требуется авторизация
 * - 503: Сервис недоступен
 */
export async function POST(req: NextRequest) {
  try {
    // Проверка авторизации
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return errorResponse("Authorization required", 401, {
        isAuthRequired: true,
        message: "Необходимо войти в аккаунт для создания проекта",
      });
    }

    const body = await req.json();

    // Валидация данных
    if (!body.name || !body.description || !body.type) {
      return errorResponse("Name, description and type are required", 400);
    }

    // Заглушка - вернуть ошибку 503 пока API не подключено
    return errorResponse("Project creation is temporarily unavailable", 503, {
      isError: true,
      message: "Создание проектов временно недоступно. Попробуйте позже.",
    });
  } catch (error) {
    console.error("Create project error:", error);
    return errorResponse("Internal server error", 500);
  }
}
