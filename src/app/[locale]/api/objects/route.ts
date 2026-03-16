import { NextRequest } from "next/server";
import { successResponse, errorResponse, getPaginationParams, paginatedResponse } from "@/lib/api";

const demoObjects = [
  {
    id: "o1",
    name: "Амударья",
    nameLocal: "Амударё",
    type: "RIVER",
    country: "Узбекистан",
    region: "Сурхандарьинская область",
    coordinates: { lat: 37.5, lng: 62.0 },
    status: "ACTIVE",
    qualityIndex: 65,
    description: "Одна из двух крупнейших рек Средней Азии. Исторически впадала в Аральское море, сейчас основная часть воды используется для орошения.",
    creator: { id: "1", name: "Айбек Токтомбаев" },
    _count: { data: 45, projects: 3 },
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "o2",
    name: "Иссыл-Куль",
    nameLocal: "Ысык-Көл",
    type: "LAKE",
    country: "Кыргызстан",
    region: "Иссык-Кульская область",
    coordinates: { lat: 42.4, lng: 77.2 },
    status: "ACTIVE",
    qualityIndex: 85,
    description: "Крупнейшее озеро Киргизии, одно из крупнейших высокогорных озёр мира. Солёное озеро без стока.",
    creator: { id: "2", name: "Светлана Ким" },
    _count: { data: 128, projects: 2 },
    createdAt: "2026-01-20T10:00:00Z",
  },
  {
    id: "o3",
    name: "Аральское море",
    nameLocal: "Арал теңізі",
    type: "LAKE",
    country: "Узбекистан/Казахстан",
    region: "Каракалпакстан",
    coordinates: { lat: 45.0, lng: 60.0 },
    status: "CRITICAL",
    qualityIndex: 35,
    description: "Ранее четвёртое по величине озеро в мире. К 2009 году обмелело более чем на 90%.",
    creator: { id: "3", name: "Профессор Светлана Каримова" },
    _count: { data: 234, projects: 5 },
    createdAt: "2026-01-25T10:00:00Z",
  },
  {
    id: "o4",
    name: "Балхаш",
    nameLocal: "Балқаш",
    type: "LAKE",
    country: "Казахстан",
    region: "Алматинская область",
    coordinates: { lat: 46.0, lng: 74.5 },
    status: "MONITORING",
    qualityIndex: 72,
    description: "Одно из крупнейших озёр мира, частично пресное, частично солёное. Под угрозой обмеления.",
    creator: { id: "4", name: "Нурлан Сериков" },
    _count: { data: 67, projects: 2 },
    createdAt: "2026-02-01T10:00:00Z",
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const country = searchParams.get("country");
    const status = searchParams.get("status");
    const { page, limit } = getPaginationParams(req);

    let filtered = [...demoObjects];
    
    if (type) filtered = filtered.filter(o => o.type === type);
    if (country) filtered = filtered.filter(o => o.country === country);
    if (status) filtered = filtered.filter(o => o.status === status);

    const total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    return successResponse(paginatedResponse(paginated, total, page, limit));
  } catch (error) {
    console.error("Get objects error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newObject = {
      id: "o" + Date.now(),
      ...body,
      status: "ACTIVE",
      qualityIndex: null,
      creator: { id: "demo", name: "Demo User" },
      _count: { data: 0, projects: 0 },
      createdAt: new Date().toISOString(),
    };
    
    return successResponse({ object: newObject }, 201);
  } catch (error) {
    console.error("Create object error:", error);
    return errorResponse("Internal server error", 500);
  }
}
