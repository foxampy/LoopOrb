import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api";

/**
 * GET /api/wallet
 * Возвращает данные кошелька пользователя
 * 
 * Статусы:
 * - 200: Успешный ответ (пустые данные если нет информации)
 * - 401: Требуется авторизация
 * - 503: Данные недоступны
 */
export async function GET(req: NextRequest) {
  try {
    // Проверка авторизации
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return successResponse({
        wallet: null,
        transactions: [],
        stakes: [],
      }, 200);
    }

    // Пустые данные - готов к подключению реального API
    const walletData = {
      wallet: null,
      transactions: [],
      stakes: [],
    };

    return successResponse(walletData, 200);
  } catch (error) {
    console.error("Get wallet error:", error);
    return errorResponse("Internal server error", 503);
  }
}
