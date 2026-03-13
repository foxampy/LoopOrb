import { successResponse, errorResponse } from "@/lib/api";

// Demo user for presentation
const demoUser = {
  id: "demo-user-001",
  email: "demo@looporb.io",
  name: "Алексей Иванов",
  role: "INVESTOR",
  avatar: null,
  bio: "Инвестор в экологические проекты. Верю в будущее устойчивого водопользования.",
  unityBalance: 15420.50,
  stakedAmount: 8750.00,
  level: 12,
  xp: 3450,
  reputation: 85,
  createdAt: "2026-01-10T10:00:00Z",
};

export async function GET() {
  try {
    // Demo mode - всегда возвращаем demo пользователя
    return successResponse({ user: demoUser });
  } catch (error) {
    console.error("Get user error:", error);
    return errorResponse("Internal server error", 500);
  }
}
