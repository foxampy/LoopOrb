import { NextResponse } from "next/server";

export async function GET() {
  // Demo mode - всегда возвращаем healthy для демонстрации
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0-demo",
    mode: "demo",
    services: {
      database: "demo_mode",
      api: "running",
    },
  });
}
