import { NextRequest } from "next/server";
import { successResponse, errorResponse, getPaginationParams, paginatedResponse } from "@/lib/api";

/**
 * GET /api/objects
 * Возвращает список водных объектов
 * 
 * Статусы:
 * - 200: Успешный ответ (может быть пустой массив)
 * - 401: Требуется авторизация
 * - 503: Данные недоступны
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const country = searchParams.get("country");
    const status = searchParams.get("status");
    const { page, limit } = getPaginationParams(req);

    // Пустой массив - готов к подключению реального API
    let objects: any[] = [];

    // Фильтрация будет применяться к реальным данным
    if (type) objects = objects.filter(o => o.type === type);
    if (country) objects = objects.filter(o => o.country === country);
    if (status) objects = objects.filter(o => o.status === status);

    const total = objects.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = objects.slice(start, end);

    return successResponse(
      paginatedResponse(paginated, total, page, limit),
      200
    );
  } catch (error) {
    console.error("Get objects error:", error);
    return errorResponse("Internal server error", 503);
  }
}

/**
 * POST /api/objects
 * Создание нового водного объекта
 * 
 * Статусы:
 * - 201: Объект создан
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
        message: "Необходимо войти в аккаунт для добавления объекта",
      });
    }

    const body = await req.json();

    // Валидация данных
    if (!body.name || !body.type || !body.coordinates) {
      return errorResponse("Name, type and coordinates are required", 400);
    }

    // Заглушка - вернуть ошибку 503 пока API не подключено
    return errorResponse("Object creation is temporarily unavailable", 503, {
      isError: true,
      message: "Создание объектов временно недоступно. Попробуйте позже.",
    });
  } catch (error) {
    console.error("Create object error:", error);
    return errorResponse("Internal server error", 500);
  }
}
