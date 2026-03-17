import { NextRequest } from "next/server";
import { z } from "zod";
import { errorResponse, successResponse } from "@/lib/api";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

/**
 * POST /api/auth/login
 * Аутентификация пользователя
 * 
 * Статусы:
 * - 200: Успешный вход
 * - 400: Ошибка валидации
 * - 401: Неверные учётные данные
 * - 503: Сервис аутентификации недоступен
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("Invalid email or password format", 400);
    }

    // Заглушка - вернуть ошибку 503 пока auth API не подключено
    // В production здесь будет вызов реального auth-сервиса
    return errorResponse(
      "Authentication service is temporarily unavailable",
      503,
      {
        isError: true,
        message: "Сервис аутентификации временно недоступен. Попробуйте позже.",
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse("Internal server error", 500);
  }
}
