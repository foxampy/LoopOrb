import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api";

// Demo wallet data
const demoWallet = {
  id: "wallet-001",
  userId: "demo-user-001",
  balance: 15420.50,
  totalStaked: 8750.00,
  totalEarned: 1250.75,
  createdAt: "2026-01-10T10:00:00Z",
  updatedAt: "2026-02-20T10:00:00Z",
};

const demoTransactions = [
  { id: "t1", type: "STAKE", amount: 1000, description: "Стейкинг в проект 'Возрождение Арала'", status: "COMPLETED", createdAt: "2026-02-18T10:00:00Z" },
  { id: "t2", type: "STAKE_REWARD", amount: 45.50, description: "Награда за стейкинг", status: "COMPLETED", createdAt: "2026-02-17T10:00:00Z" },
  { id: "t3", type: "ADD_DATA", amount: 50, description: "Добавление данных о качестве воды", status: "COMPLETED", createdAt: "2026-02-15T10:00:00Z" },
  { id: "t4", type: "MISSION_REWARD", amount: 200, description: "Награда за миссию 'Эколог недели'", status: "COMPLETED", createdAt: "2026-02-10T10:00:00Z" },
  { id: "t5", type: "STAKE", amount: 500, description: "Стейкинг в проект 'VOD Lab Israel'", status: "COMPLETED", createdAt: "2026-02-05T10:00:00Z" },
];

const demoStakes = [
  { 
    id: "s1", 
    projectId: "2", 
    project: { id: "2", name: "Возрождение Арала", slug: "aral-restoration" },
    amount: 5000, 
    apy: 8.2, 
    status: "ACTIVE",
    startDate: "2026-01-15T10:00:00Z",
    totalRewarded: 125.50,
  },
  { 
    id: "s2", 
    projectId: "1", 
    project: { id: "1", name: "VOD Lab Israel", slug: "vod-lab-israel" },
    amount: 3750, 
    apy: 12.5, 
    status: "ACTIVE",
    startDate: "2026-02-01T10:00:00Z",
    totalRewarded: 85.25,
  },
];

// GET /api/wallet - Get user wallet (demo mode)
export async function GET(req: NextRequest) {
  try {
    return successResponse({ 
      wallet: demoWallet, 
      transactions: demoTransactions, 
      stakes: demoStakes 
    });
  } catch (error) {
    console.error("Get wallet error:", error);
    return errorResponse("Internal server error", 500);
  }
}
