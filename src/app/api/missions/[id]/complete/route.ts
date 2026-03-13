import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: missionId } = await params;
    
    // Demo mode - возвращаем награду
    return successResponse({ 
      message: "Mission completed successfully",
      missionId,
      reward: 100,
      xpReward: 200,
    });
  } catch (error) {
    console.error("Complete mission error:", error);
    return errorResponse("Failed to complete mission", 500);
  }
}
