import { NextRequest } from "next/server";
import { z } from "zod";
import { successResponse, errorResponse, getPaginationParams, paginatedResponse } from "@/lib/api";

const addDataSchema = z.object({
  measuredAt: z.string().datetime().optional(),
  location: z.object({ lat: z.number(), lng: z.number() }).optional(),
  ph: z.number().min(0).max(14).optional(),
  temperature: z.number().optional(),
  turbidity: z.number().optional(),
  tds: z.number().optional(),
  conductivity: z.number().optional(),
  dissolvedOxygen: z.number().optional(),
  nitrates: z.number().optional(),
  phosphates: z.number().optional(),
  bacteriaCount: z.number().optional(),
  clarity: z.number().min(0).max(10).optional(),
  images: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

const demoWaterData = [
  { id: "d1", ph: 7.2, temperature: 18.5, turbidity: 12, tds: 450, measuredAt: "2026-02-20T08:00:00Z", user: { id: "1", name: "Айбек Т.", avatar: null } },
  { id: "d2", ph: 7.1, temperature: 19.0, turbidity: 15, tds: 480, measuredAt: "2026-02-19T08:00:00Z", user: { id: "2", name: "Светлана К.", avatar: null } },
  { id: "d3", ph: 7.3, temperature: 18.0, turbidity: 10, tds: 420, measuredAt: "2026-02-18T08:00:00Z", user: { id: "3", name: "Иван С.", avatar: null } },
  { id: "d4", ph: 7.0, temperature: 19.5, turbidity: 18, tds: 510, measuredAt: "2026-02-17T08:00:00Z", user: { id: "4", name: "Мария П.", avatar: null } },
];

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { page, limit } = getPaginationParams(req);

    const total = demoWaterData.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = demoWaterData.slice(start, end);

    return successResponse(paginatedResponse(paginated, total, page, limit));
  } catch (error) {
    console.error("Get object data error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: objectId } = await params;
    const body = await req.json();
    const result = addDataSchema.safeParse(body);

    if (!result.success) {
      return errorResponse("Validation failed", 400, result.error.flatten());
    }

    const data = result.data;

    // Demo mode - возвращаем созданные данные
    const waterData = {
      id: "d" + Date.now(),
      ...data,
      objectId,
      userId: "demo-user",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    return successResponse({ data: waterData }, 201);
  } catch (error) {
    console.error("Add data error:", error);
    return errorResponse("Internal server error", 500);
  }
}
