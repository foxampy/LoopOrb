import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, first_name, last_name, username, photo_url } = body;

    if (!id) {
      return errorResponse("Invalid Telegram data", 400);
    }

    // Demo mode - возвращаем demo пользователя
    const name = first_name + (last_name ? ` ${last_name}` : "");
    
    return successResponse({
      user: {
        id: "telegram-" + id,
        telegramId: id,
        name,
        handle: username || null,
        avatar: photo_url || null,
        role: "CITIZEN",
        unityBalance: 15,
        level: 1,
        xp: 0,
      },
      isNewUser: true,
      token: "demo-telegram-token",
    });
  } catch (error) {
    console.error("Telegram auth error:", error);
    return errorResponse("Internal server error", 500);
  }
}
