import { successResponse, errorResponse } from "@/lib/api";

// GET /api/notifications/count - Get unread count (demo mode)
export async function GET() {
  try {
    // Demo mode - возвращаем 2 непрочитанных уведомления
    return successResponse({ count: 2 });
  } catch (error) {
    console.error("Get notification count error:", error);
    return errorResponse("Failed to get notification count", 500);
  }
}
