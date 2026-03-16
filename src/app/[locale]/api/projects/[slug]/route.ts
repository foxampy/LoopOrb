import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api";

const demoProjects: Record<string, any> = {
  "vod-lab-israel": {
    id: "1",
    slug: "vod-lab-israel",
    name: "VOD Lab Israel",
    description: "Проект по созданию передовой лаборатории для исследования методов опреснения морской воды с использованием солнечной энергии.\n\nНаши цели:\n- Разработка энергоэффективных методов опреснения\n- Использование возобновляемой энергии\n- Снижение стоимости очистки воды на 40%\n- Обучение местных специалистов",
    shortDescription: "Исследовательская лаборатория по очистке морской воды",
    type: "RESEARCH",
    category: "WATER_TREATMENT",
    status: "ACTIVE",
    country: "Израиль",
    region: "Южный округ",
    city: "Эйлат",
    coverImage: null,
    targetAmount: 2500000,
    raisedAmount: 1250000,
    minStake: 100,
    expectedApy: 12.5,
    esgScore: 85,
    sdgGoals: [6, 9, 13],
    members: [
      { user: { id: "1", name: "Доктор Ави Коэн", avatar: null, role: "SCIENTIST" }, role: "LEAD" },
      { user: { id: "2", name: "Сара Леви", avatar: null, role: "SCIENTIST" }, role: "CONTRIBUTOR" },
      { user: { id: "3", name: "Михаль Орен", avatar: null, role: "INVESTOR" }, role: "MEMBER" },
    ],
    objects: [
      { object: { id: "o5", name: "Красное море", type: "SEA" } }
    ],
    milestones: [
      { id: "m1", title: "Покупка оборудования", status: "COMPLETED", dueDate: "2026-03-01T00:00:00Z" },
      { id: "m2", title: "Установка солнечных панелей", status: "IN_PROGRESS", dueDate: "2026-05-01T00:00:00Z" },
      { id: "m3", title: "Запуск пилотного проекта", status: "PENDING", dueDate: "2026-08-01T00:00:00Z" },
      { id: "m4", title: "Масштабирование", status: "PENDING", dueDate: "2026-12-01T00:00:00Z" },
    ],
    _count: { stakes: 128 },
    createdAt: "2026-01-15T10:00:00Z",
  },
  "aral-restoration": {
    id: "2",
    slug: "aral-restoration",
    name: "Возрождение Арала",
    description: "Комплексный проект по восстановлению водных ресурсов Аральского моря через перераспределение водных потоков и посадку солеустойчивых растений.\n\nИстория:\nАральское море было четвёртым по величине озером в мире. К 2009 году обмелело более чем на 90%. Мы верим, что можем вернуть жизнь этому региону.\n\nПлан действий:\n1. Перераспределение водных ресурсов\n2. Посадка солеустойчивых растений\n3. Создание экологических зон\n4. Развитие экотуризма",
    shortDescription: "Восстановление экосистемы Аральского моря",
    type: "RESTORATION",
    category: "CONSERVATION",
    status: "FUNDING",
    country: "Узбекистан",
    region: "Каракалпакстан",
    city: "Нукус",
    coverImage: null,
    targetAmount: 15000000,
    raisedAmount: 3200000,
    minStake: 500,
    expectedApy: 8.2,
    esgScore: 92,
    sdgGoals: [6, 13, 15],
    members: [
      { user: { id: "4", name: "Профессор Светлана Каримова", avatar: null, role: "SCIENTIST" }, role: "LEAD" },
      { user: { id: "5", name: "Доктор Бахтияр Рахимов", avatar: null, role: "SCIENTIST" }, role: "CONTRIBUTOR" },
    ],
    objects: [
      { object: { id: "o3", name: "Аральское море", type: "LAKE" } }
    ],
    milestones: [
      { id: "m5", title: "Исследование почв", status: "COMPLETED", dueDate: "2026-01-01T00:00:00Z" },
      { id: "m6", title: "Перераспределение воды", status: "IN_PROGRESS", dueDate: "2026-06-01T00:00:00Z" },
      { id: "m7", title: "Посадка растений", status: "PENDING", dueDate: "2026-09-01T00:00:00Z" },
    ],
    _count: { stakes: 567 },
    createdAt: "2026-02-01T10:00:00Z",
  },
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const project = demoProjects[slug] || {
      id: "unknown",
      slug,
      name: "Проект не найден",
      description: "",
      shortDescription: "",
      type: "OTHER",
      category: "OTHER",
      status: "DRAFT",
      country: "",
      members: [],
      objects: [],
      milestones: [],
      _count: { stakes: 0 },
      createdAt: new Date().toISOString(),
    };

    return successResponse({ project });
  } catch (error) {
    console.error("Get project error:", error);
    return errorResponse("Internal server error", 500);
  }
}
