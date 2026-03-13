import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api";

const demoNotifications = [
  {
    id: "n1",
    type: "MISSION_COMPLETED",
    title: "Миссия выполнена!",
    message: "Вы успешно выполнили миссию 'Эколог недели' и получили 200 XP и 100 UNITY",
    data: { missionId: "m1" },
    isRead: false,
    createdAt: "2026-02-20T09:00:00Z",
  },
  {
    id: "n2",
    type: "STAKE_REWARD",
    title: "Награда за стейкинг",
    message: "Вы получили 12.5 UNITY награды за стейкинг в проект 'Возрождение Арала'",
    data: { projectId: "2" },
    isRead: false,
    createdAt: "2026-02-19T10:00:00Z",
  },
  {
    id: "n3",
    type: "PROJECT_UPDATE",
    title: "Обновление проекта",
    message: "Проект 'VOD Lab Israel' достиг 50% цели финансирования!",
    data: { projectId: "1" },
    isRead: true,
    readAt: "2026-02-18T12:00:00Z",
    createdAt: "2026-02-18T10:00:00Z",
  },
  {
    id: "n4",
    type: "DAO_VOTE",
    title: "Новое голосование",
    message: "Началось голосование по предложению 'Финансирование очистки реки Амударья'",
    data: { proposalId: "p1" },
    isRead: true,
    readAt: "2026-02-15T14:00:00Z",
    createdAt: "2026-02-15T10:00:00Z",
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const unreadOnly = searchParams.get("unread") === "true";

    const notifications = unreadOnly 
      ? demoNotifications.filter(n => !n.isRead)
      : demoNotifications;
    
    const unreadCount = demoNotifications.filter(n => !n.isRead).length;

    return successResponse({ notifications, unreadCount });
  } catch (error) {
    console.error("Get notifications error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();
    
    return successResponse({ message: "Marked as read", id });
  } catch (error) {
    console.error("Mark read error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return errorResponse("ID required", 400);

    return successResponse({ message: "Deleted", id });
  } catch (error) {
    console.error("Delete notification error:", error);
    return errorResponse("Internal server error", 500);
  }
}
