import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api";

const demoMissions = [
  {
    id: "m1",
    title: "Эколог недели",
    description: "Добавьте данные о 3 водных объектах за неделю",
    type: "WEEKLY",
    category: "DATA_COLLECTION",
    requirements: { action: "add_data", count: 3 },
    xpReward: 200,
    unityReward: 100,
    isActive: true,
    endDate: "2026-02-23T23:59:59Z",
  },
  {
    id: "m2",
    title: "Исследователь",
    description: "Добавьте данные о качестве воды (pH, температура, мутность)",
    type: "DAILY",
    category: "DATA_COLLECTION",
    requirements: { action: "add_quality_data", count: 1 },
    xpReward: 50,
    unityReward: 25,
    isActive: true,
    endDate: "2026-02-20T23:59:59Z",
  },
  {
    id: "m3",
    title: "Социальный активист",
    description: "Сделайте 5 постов в ленте",
    type: "WEEKLY",
    category: "SOCIAL",
    requirements: { action: "create_post", count: 5 },
    xpReward: 150,
    unityReward: 75,
    isActive: true,
    endDate: "2026-02-23T23:59:59Z",
  },
  {
    id: "m4",
    title: "Первый стейк",
    description: "Застейкайте UNITY в любой проект",
    type: "ONETIME",
    category: "PROJECT_PARTICIPATION",
    requirements: { action: "stake", count: 1 },
    xpReward: 500,
    unityReward: 250,
    isActive: true,
    endDate: null,
  },
];

const demoUserMissions = [
  {
    id: "um1",
    missionId: "m1",
    mission: demoMissions[0],
    progress: 2,
    target: 3,
    status: "ACTIVE",
    startedAt: "2026-02-17T10:00:00Z",
  },
];

export async function GET(req: NextRequest) {
  try {
    return successResponse({ 
      available: demoMissions, 
      active: demoUserMissions, 
      completedCount: 12 
    });
  } catch (error) {
    console.error("Get missions error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { missionId } = await req.json();
    
    return successResponse({ 
      message: "Reward claimed",
      missionId,
      reward: { xp: 200, unity: 100 }
    });
  } catch (error) {
    console.error("Claim reward error:", error);
    return errorResponse("Internal server error", 500);
  }
}
