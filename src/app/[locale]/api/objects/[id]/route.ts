import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api";

const demoObjects: Record<string, any> = {
  "o1": {
    id: "o1",
    name: "Амударья",
    nameLocal: "Амударё",
    type: "RIVER",
    country: "Узбекистан",
    region: "Сурхандарьинская область",
    city: "Термез",
    coordinates: { lat: 37.5, lng: 62.0 },
    status: "ACTIVE",
    qualityIndex: 65,
    description: "Одна из двух крупнейших рек Средней Азии. Исторически впадала в Аральское море, сейчас основная часть воды используется для орошения.",
    history: "В древности река называлась Оксом. Вдоль её берегов располагались древние города Бактрия и Согдиана.",
    threats: ["Перерасход воды на орошение", "Загрязнение от промышленности", "Снижение уровня воды"],
    creator: { id: "1", name: "Айбек Токтомбаев", avatar: null },
    _count: { data: 45, projects: 3 },
    createdAt: "2026-01-15T10:00:00Z",
  },
  "o2": {
    id: "o2",
    name: "Иссыл-Куль",
    nameLocal: "Ысык-Көл",
    type: "LAKE",
    country: "Кыргызстан",
    region: "Иссык-Кульская область",
    city: "Чолпон-Ата",
    coordinates: { lat: 42.4, lng: 77.2 },
    status: "ACTIVE",
    qualityIndex: 85,
    description: "Крупнейшее озеро Киргизии, одно из крупнейших высокогорных озёр мира. Солёное озеро без стока.",
    history: "Озеро известно своими целебными свойствами с древних времён.",
    threats: ["Угроза повышения уровня воды", "Загрязнение туристической инфраструктурой"],
    creator: { id: "2", name: "Светлана Ким", avatar: null },
    _count: { data: 128, projects: 2 },
    createdAt: "2026-01-20T10:00:00Z",
  },
  "o3": {
    id: "o3",
    name: "Аральское море",
    nameLocal: "Арал теңізі",
    type: "LAKE",
    country: "Узбекистан/Казахстан",
    region: "Каракалпакстан",
    city: "Муйнак",
    coordinates: { lat: 45.0, lng: 60.0 },
    status: "CRITICAL",
    qualityIndex: 35,
    description: "Ранее четвёртое по величине озеро в мире. К 2009 году обмелело более чем на 90%.",
    history: "В 1960-х годах началось обмеление из-за перерасхода воды Амударьи и Сырдарьи на орошение.",
    threats: ["Обмеление", "Солёность", "Уход рыбы", "Климатические изменения"],
    creator: { id: "3", name: "Профессор Светлана Каримова", avatar: null },
    _count: { data: 234, projects: 5 },
    createdAt: "2026-01-25T10:00:00Z",
  },
};

const demoRecentData = [
  { id: "d1", ph: 7.2, temperature: 18.5, turbidity: 12, tds: 450, measuredAt: "2026-02-20T08:00:00Z", user: { id: "1", name: "Айбек Т.", avatar: null } },
  { id: "d2", ph: 7.1, temperature: 19.0, turbidity: 15, tds: 480, measuredAt: "2026-02-19T08:00:00Z", user: { id: "2", name: "Светлана К.", avatar: null } },
  { id: "d3", ph: 7.3, temperature: 18.0, turbidity: 10, tds: 420, measuredAt: "2026-02-18T08:00:00Z", user: { id: "3", name: "Иван С.", avatar: null } },
];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const obj = demoObjects[id] || {
      id,
      name: "Объект не найден",
      type: "OTHER",
      country: "",
      coordinates: { lat: 0, lng: 0 },
      status: "INACTIVE",
      qualityIndex: null,
      description: "",
      creator: { id: "0", name: "Unknown", avatar: null },
      _count: { data: 0, projects: 0 },
      createdAt: new Date().toISOString(),
    };

    return successResponse({
      object: {
        ...obj,
        dataCount: obj._count.data,
        projectsCount: obj._count.projects,
      },
      recentData: demoRecentData,
    });
  } catch (error) {
    console.error("Get object error:", error);
    return errorResponse("Internal server error", 500);
  }
}
