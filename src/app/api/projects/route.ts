import { NextRequest } from "next/server";
import { successResponse, errorResponse, getPaginationParams, paginatedResponse } from "@/lib/api";

// 📊 Детальные проекты из документов LoopOrb
const detailedProjects = [
  {
    id: "proj-1",
    slug: "modernization-uzbekistan-bukhara",
    name: "Модернизация насосных станций Бухарского региона",
    shortDescription: "Комплексная реконструкция 12 насосных станций с IoT-мониторингом. Снижение потерь воды на 35%.",
    description: `Проект направлен на модернизацию устаревшей инфраструктуры водоснабжения Бухарского региона Узбекистана. 

Задачи:
• Замена 12 насосных станций на энергоэффективные
• Установка IoT-датчиков для real-time мониторинга
• Автоматизация системы управления давлением
• Обучение местного персонала

Ожидаемые результаты:
✓ Снижение потерь воды с 45% до 10%
✓ Экономия электроэнергии 8.5 МВтч/год
✓ Улучшение водоснабжения для 500,000+ жителей
✓ Создание 120 рабочих мест`,
    type: "INFRASTRUCTURE",
    status: "ACTIVE",
    country: "Узбекистан",
    region: "Бухарская область",
    coordinates: { lat: 39.76, lng: 64.42 },
    coverImage: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800",
    targetAmount: 45000000,
    raisedAmount: 28400000,
    minStake: 100,
    expectedApy: 12.5,
    irr: 14.2,
    esgScore: 87,
    sdgGoals: [6, 9, 11, 13],
    membersCount: 1247,
    stakesCount: 342,
    startDate: "2025-12-01",
    endDate: "2027-06-30",
    milestones: [
      { name: "Проектирование", completed: true, date: "2025-12" },
      { name: "Закупка оборудования", completed: true, date: "2026-01" },
      { name: "Монтаж станций 1-6", completed: false, progress: 65, date: "2026-06" },
      { name: "Монтаж станций 7-12", completed: false, progress: 30, date: "2026-12" },
      { name: "Запуск IoT-системы", completed: false, date: "2027-03" },
    ],
    team: [
      { name: "Азиз Каримов", role: "Руководитель проекта", avatar: "AK" },
      { name: "Елена Смирнова", role: "Инженер-гидролог", avatar: "ES" },
      { name: "Михаил Чен", role: "IoT-специалист", avatar: "MC" },
    ],
    documents: [
      { name: "Техническое задание", type: "pdf", size: "2.4 MB" },
      { name: "Экологическая экспертиза", type: "pdf", size: "8.1 MB" },
      { name: "Финансовая модель", type: "xlsx", size: "1.2 MB" },
    ],
    impact: {
      waterSaved: 12500000,
      co2Reduced: 4500,
      peopleBenefited: 500000,
      jobsCreated: 120,
    },
    tags: ["инфраструктура", "IoT", "Узбекистан", "модернизация"],
    creator: { id: "1", name: "Азиз Каримов", avatar: null },
    createdAt: "2025-11-15T10:00:00Z",
  },
  {
    id: "proj-2",
    slug: "aral-sea-restoration",
    name: "Спасение Аральского моря — Phase 1",
    shortDescription: "Комплексное восстановление северной части Аральского моря. Лесопосадки, каналы, биополигоны.",
    description: `Аральское море — одна из крупнейших экологических катастроф XX века. Но восстановление возможно!

План действий:
• Восстановление гидрологического баланса
• Создание зелёного пояса из 500,000 деревьев
• Постройка каналов для стока воды
• Создание биополигонов для восстановления флоры и фауны
• Мониторинг через спутники и дроны

Научное обоснование:
Исследования показывают, что северная часть (Малое Аральское) может быть восстановлена за 5-7 лет при правильном управлении водными ресурсами.

Международное сотрудничество:
Проект поддержан Всемирным банком, UNDP, ЕБРР и правительствами Узбекистана и Казахстана.`,
    type: "RESTORATION",
    status: "FUNDRAISING",
    country: "Узбекистан / Казахстан",
    region: "Аральский регион",
    coordinates: { lat: 45.0, lng: 60.0 },
    coverImage: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800",
    targetAmount: 120000000,
    raisedAmount: 34500000,
    minStake: 500,
    expectedApy: 8.5,
    irr: 0,
    esgScore: 98,
    sdgGoals: [6, 13, 15],
    membersCount: 8902,
    stakesCount: 1234,
    startDate: "2026-03-01",
    endDate: "2031-12-31",
    milestones: [
      { name: "DAO-голосование", completed: true, date: "2026-02" },
      { name: "Создание фонда", completed: false, progress: 45, date: "2026-03" },
      { name: "Закупка земель", completed: false, date: "2026-06" },
      { name: "Старт лесопосадок", completed: false, date: "2026-09" },
      { name: "Строительство каналов", completed: false, date: "2027-06" },
      { name: "Первое наполнение", completed: false, date: "2028-03" },
    ],
    team: [
      { name: "Доктор С. Васильев", role: "Главный эколог", avatar: "СВ" },
      { name: "Айгуль Нурматова", role: "Координатор проекта", avatar: "АН" },
      { name: "Джеймс Уилсон", role: "Эксперт Всемирного банка", avatar: "JW" },
    ],
    documents: [
      { name: "Feasibility Study", type: "pdf", size: "45 MB" },
      { name: "Environmental Impact", type: "pdf", size: "32 MB" },
      { name: "Stakeholder Analysis", type: "pdf", size: "8 MB" },
    ],
    impact: {
      waterSaved: 0,
      co2Reduced: 850000,
      peopleBenefited: 2000000,
      jobsCreated: 3500,
    },
    tags: ["восстановление", "экология", "мега-проект", "международный"],
    creator: { id: "2", name: "Айгуль Нурматова", avatar: null },
    createdAt: "2026-02-01T10:00:00Z",
  },
  {
    id: "proj-3",
    slug: "nile-cleanup-cairo",
    name: "Чистый Нил — Каирская программа",
    shortDescription: "Очистка 50 км берегов Нила в районе Каира. Удаление пластика, очистка стоков, образование.",
    description: `Нил — артерия жизни для 300 миллионов человек. Но в районе Каира река страдает от загрязнения.

Комплексная программа:
• Ежедневная очистка берегов от мусора
• 15 барж-сборщиков пластика
• 5 мобильных очистных установок
• Образовательные программы для 50 школ
• Ремонт 200 точек сброса сточных вод

Технологии:
Автономные катамараны с AI-распознаванием мусора, солнечные очистные установки, биоразлагаемые барьеры.

Социальный аспект:
Проект создаёт 800 рабочих мест для жителей трущоб вдоль Нила, предоставляя стабильный доход и социальные гарантии.`,
    type: "CLEANUP",
    status: "ACTIVE",
    country: "Египет",
    region: "Каир",
    coordinates: { lat: 30.04, lng: 31.23 },
    coverImage: "https://images.unsplash.com/photo-1539650116455-25167a0f8730?w=800",
    targetAmount: 25000000,
    raisedAmount: 18700000,
    minStake: 50,
    expectedApy: 10.2,
    irr: 11.5,
    esgScore: 92,
    sdgGoals: [6, 11, 14],
    membersCount: 3421,
    stakesCount: 678,
    startDate: "2025-09-01",
    endDate: "2027-08-31",
    milestones: [
      { name: "Закупка барж", completed: true, date: "2025-11" },
      { name: "Набор команды", completed: true, date: "2025-12" },
      { name: "Запуск первых 5 барж", completed: true, date: "2026-01" },
      { name: "Очистка 25 км", completed: false, progress: 40, date: "2026-06" },
      { name: "Школьная программа", completed: false, progress: 60, date: "2026-09" },
    ],
    team: [
      { name: "Ахмед Хасан", role: "Локальный координатор", avatar: "АХ" },
      { name: "Сара Джонсон", role: "Эколог", avatar: "SJ" },
    ],
    documents: [
      { name: "Project Plan", type: "pdf", size: "12 MB" },
      { name: "Waste Analysis", type: "pdf", size: "5 MB" },
    ],
    impact: {
      waterSaved: 0,
      co2Reduced: 1200,
      peopleBenefited: 5000000,
      jobsCreated: 800,
    },
    tags: ["очистка", "Нил", "пластик", "образование"],
    creator: { id: "3", name: "Ахмед Хасан", avatar: null },
    createdAt: "2025-08-15T10:00:00Z",
  },
  {
    id: "proj-4",
    slug: "amazon-conservation-brazil",
    name: "Амазония: Защита водного баланса бассейна",
    shortDescription: "Комплексная программа защиты Амазонки. Мониторинг вырубок, восстановление лесов, защита прав.",
    description: `Амазонка производит 20% всей пресной воды планеты. Её сохранение — ключ к климатической стабильности.

Программа включает:
• Спутниковый мониторинг вырубок (real-time)
• Восстановление 10,000 га лесов
• Поддержка коренных народов (15 племён)
• Юридическая защита реки (статус юридического лица)
• Образовательные программы

Инновации:
Дроны-сеялки, AI-предсказание точек вырубки, биометрическая идентификация деревьев.

Правовая защита:
После исторического решения суда Амазонка имеет право на 'здоровое существование'. Проект финансирует юристов для защиты этих прав.`,
    type: "CONSERVATION",
    status: "ACTIVE",
    country: "Бразилия",
    region: "Амазонский бассейн",
    coordinates: { lat: -3.46, lng: -62.21 },
    coverImage: "https://images.unsplash.com/photo-1516934024742-b461fba47600?w=800",
    targetAmount: 85000000,
    raisedAmount: 52300000,
    minStake: 200,
    expectedApy: 7.8,
    irr: 0,
    esgScore: 96,
    sdgGoals: [6, 13, 15, 16],
    membersCount: 6789,
    stakesCount: 890,
    startDate: "2025-06-01",
    endDate: "2030-12-31",
    milestones: [
      { name: "Спутниковая сеть", completed: true, date: "2025-09" },
      { name: "Юридический фонд", completed: true, date: "2025-12" },
      { name: "Первые иски", completed: true, date: "2026-01" },
      { name: "Лесопосадки 2,000 га", completed: false, progress: 45, date: "2026-06" },
    ],
    team: [
      { name: "Мария Силва", role: "Эколог", avatar: "MS" },
      { name: "Педро Альварес", role: "Активист", avatar: "PA" },
    ],
    documents: [
      { name: "Legal Framework", type: "pdf", size: "15 MB" },
      { name: "Forest Plan", type: "pdf", size: "22 MB" },
    ],
    impact: {
      waterSaved: 0,
      co2Reduced: 2500000,
      peopleBenefited: 30000000,
      jobsCreated: 1200,
    },
    tags: ["консервация", "Амазонка", "климат", "права природы"],
    creator: { id: "4", name: "Мария Силва", avatar: null },
    createdAt: "2025-05-20T10:00:00Z",
  },
  {
    id: "proj-5",
    slug: "lake-victoria-watch",
    name: "Виктория Watch — Мониторинг озера",
    shortDescription: "Сеть из 200 IoT-сенсоров для мониторинга качества воды озера Виктория. Раннее предупреждение.",
    description: `Озеро Виктория — второе по величине пресноводное озеро мира. 40 млн человек зависят от его вод.

Система мониторинга:
• 200 автономных сенсоров с солнечными батареями
• Измерение: pH, температура, мутность, кислород, микропластик
• AI-аналитика для прогнозирования цветения водорослей
• Мобильное приложение для рыбаков
• API для исследователей

Раннее предупреждение:
Система предсказывает вспышки водорослей за 72 часа, давая время на принятие мер.

Данные открыты:
Все данные доступны учёным по всему миру через Research API LoopOrb.`,
    type: "MONITORING",
    status: "ACTIVE",
    country: "Кения / Уганда / Танзания",
    region: "Озеро Виктория",
    coordinates: { lat: -1.0, lng: 33.0 },
    coverImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    targetAmount: 12000000,
    raisedAmount: 8900000,
    minStake: 50,
    expectedApy: 9.5,
    irr: 10.8,
    esgScore: 94,
    sdgGoals: [6, 9, 14],
    membersCount: 2345,
    stakesCount: 456,
    startDate: "2025-08-01",
    endDate: "2027-02-28",
    milestones: [
      { name: "Разработка сенсоров", completed: true, date: "2025-10" },
      { name: "Установка 50 сенсоров", completed: true, date: "2026-01" },
      { name: "Установка 150 сенсоров", completed: false, progress: 60, date: "2026-06" },
    ],
    team: [
      { name: "Доктор Окото", role: "Главный исследователь", avatar: "DO" },
    ],
    documents: [
      { name: "Sensor Specs", type: "pdf", size: "8 MB" },
    ],
    impact: {
      waterSaved: 0,
      co2Reduced: 0,
      peopleBenefited: 40000000,
      jobsCreated: 45,
    },
    tags: ["мониторинг", "IoT", "Виктория", "наука"],
    creator: { id: "5", name: "Доктор Окото", avatar: null },
    createdAt: "2025-07-10T10:00:00Z",
  },
  {
    id: "proj-6",
    slug: "ganga-clean-varanasi",
    name: "Чистый Ганг — Варанаси-Канпур",
    shortDescription: "Комплексная очистка 150 км священной реки. Очистные сооружения, баржи, биовосстановление.",
    description: `Ганг — священная река для 1.1 млрд индусов. Проект 'Чистый Ганг' — крупнейшая программа очистки реки в истории.

Компоненты проекта:
• 15 новых очистных сооружений (пропускная способность 500 MLD)
• 20 барж для сбора плавучего мусора
• 50 км берегоукрепления
• Система биовосстановления водных растений
• Крематории с фильтрацией (снижение ритуального загрязнения)

Религиозная чувствительность:
Проект разработан с учётом религиозных практик. Все изменения согласованы с духовными лидерами.

Результаты Phase 1:
Уровень загрязнения снизился на 68%. Вода снова пригодна для ритуального купания.`,
    type: "CLEANUP",
    status: "ACTIVE",
    country: "Индия",
    region: "Уттар-Прадеш",
    coordinates: { lat: 25.31, lng: 83.01 },
    coverImage: "https://images.unsplash.com/photo-1561361058-4b0475f4f42c?w=800",
    targetAmount: 320000000,
    raisedAmount: 241000000,
    minStake: 1000,
    expectedApy: 6.5,
    irr: 8.2,
    esgScore: 95,
    sdgGoals: [6, 11, 14],
    membersCount: 12345,
    stakesCount: 2341,
    startDate: "2024-01-01",
    endDate: "2028-12-31",
    milestones: [
      { name: "Проектирование", completed: true, date: "2024-06" },
      { name: "Станции 1-5", completed: true, date: "2025-03" },
      { name: "Станции 6-10", completed: true, date: "2025-09" },
      { name: "Станции 11-15", completed: false, progress: 70, date: "2026-06" },
    ],
    team: [
      { name: "Раджesh Шарма", role: "Директор проекта", avatar: "РШ" },
      { name: "Лиза Чен", role: "Инженер очистных", avatar: "LC" },
    ],
    documents: [
      { name: "Master Plan", type: "pdf", size: "85 MB" },
      { name: "Environmental Clearance", type: "pdf", size: "45 MB" },
    ],
    impact: {
      waterSaved: 0,
      co2Reduced: 15000,
      peopleBenefited: 450000000,
      jobsCreated: 5000,
    },
    tags: ["очистка", "Ганг", "Индия", "мега-проект"],
    creator: { id: "6", name: "Раджesh Шарма", avatar: null },
    createdAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "proj-7",
    slug: "balkhash-emergency",
    name: "Экстренное спасение озера Балхаш",
    shortDescription: "Критический проект по спасению озера от полного высыхания. Диверсия вод, мониторинг, защита.",
    description: `Балхаш — одно из крупнейших озёр Азии. За 50 лет его площадь сократилась на 40%. Без действий озеро исчезнет к 2035.

Экстренные меры:
• Перераспределение водных потоков из притоков
• Создание солнечных испарителей для снижения потерь
• Законодательные ограничения на водозабор
• Масштабная кампания осведомлённости

Сложности:
Проект требует координации между Казахстаном и Китаем (верховья реки Или). Политические переговоры в процессе.

Статус:
Объявлено чрезвычайное экологическое положение. Требуется международная поддержка.`,
    type: "RESTORATION",
    status: "FUNDRAISING",
    country: "Казахстан",
    region: "Жетысуская область",
    coordinates: { lat: 46.0, lng: 74.5 },
    coverImage: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800",
    targetAmount: 180000000,
    raisedAmount: 23000000,
    minStake: 100,
    expectedApy: 0,
    irr: 0,
    esgScore: 99,
    sdgGoals: [6, 13, 15],
    membersCount: 5678,
    stakesCount: 890,
    startDate: "2026-04-01",
    endDate: "2032-12-31",
    milestones: [
      { name: "DAO-голосование", completed: true, date: "2026-02" },
      { name: "Переговоры с Китаем", completed: false, progress: 30, date: "2026-06" },
      { name: "Старт работ", completed: false, date: "2026-09" },
    ],
    team: [
      { name: "Ерлан Козыбаев", role: "Казахстанский координатор", avatar: "ЕК" },
    ],
    documents: [
      { name: "Emergency Report", type: "pdf", size: "25 MB" },
    ],
    impact: {
      waterSaved: 0,
      co2Reduced: 50000,
      peopleBenefited: 2000000,
      jobsCreated: 500,
    },
    tags: ["кризис", "Балхаш", "Казахстан", "экстренный"],
    creator: { id: "7", name: "Ерлан Козыбаев", avatar: null },
    createdAt: "2026-02-10T10:00:00Z",
  },
  {
    id: "proj-8",
    slug: "solar-water-kenya",
    name: "Solar Water Kenya — Солнечные насосы",
    shortDescription: "500 солнечных насосных станций для сельской Кении. Доступ к воде для 500,000 человек.",
    description: `В сельской Кении 40% населения не имеет доступа к чистой воде. Солнечные насосы — устойчивое решение.

Проект включает:
• 500 солнечных насосных станций
• 100 км водопроводов
• 200 точек водоразбора
• Обучение местных механиков
• Микрофинансирование для женских кооперативов

Технология:
Станции работают полностью на солнечной энергии, не требуют подключения к сети. Срок службы — 20+ лет.

Социальный эффект:
Освобождение женщин и детей от ежедневного похода за водой (экономия 4-6 часов в день). Возможность ходить в школу и работать.`,
    type: "INFRASTRUCTURE",
    status: "ACTIVE",
    country: "Кения",
    region: "Восточная провинция",
    coordinates: { lat: -0.5, lng: 37.0 },
    coverImage: "https://images.unsplash.com/photo-1537655780520-1e392ef81e87?w=800",
    targetAmount: 15000000,
    raisedAmount: 12800000,
    minStake: 25,
    expectedApy: 11.2,
    irr: 13.5,
    esgScore: 93,
    sdgGoals: [6, 7, 5, 1],
    membersCount: 4567,
    stakesCount: 1234,
    startDate: "2025-03-01",
    endDate: "2026-12-31",
    milestones: [
      { name: "Пилот 20 станций", completed: true, date: "2025-06" },
      { name: "Фаза 1 (100 станций)", completed: true, date: "2025-12" },
      { name: "Фаза 2 (200 станций)", completed: false, progress: 80, date: "2026-06" },
      { name: "Фаза 3 (180 станций)", completed: false, date: "2026-12" },
    ],
    team: [
      { name: "Амина Джабо", role: "Координатор", avatar: "AJ" },
      { name: "Джон Кипрото", role: "Инженер", avatar: "JK" },
    ],
    documents: [
      { name: "Implementation Report", type: "pdf", size: "15 MB" },
    ],
    impact: {
      waterSaved: 0,
      co2Reduced: 8000,
      peopleBenefited: 500000,
      jobsCreated: 250,
    },
    tags: ["солнечная энергия", "Кения", "вода", "социальный"],
    creator: { id: "8", name: "Амина Джабо", avatar: null },
    createdAt: "2025-02-20T10:00:00Z",
  },
];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const country = searchParams.get("country");
    const { page, limit } = getPaginationParams(req);

    let filtered = [...detailedProjects];
    
    if (status) filtered = filtered.filter(p => p.status === status);
    if (type) filtered = filtered.filter(p => p.type === type);
    if (country) filtered = filtered.filter(p => p.country.includes(country));

    const total = filtered.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    return successResponse(paginatedResponse(paginated, total, page, limit));
  } catch (error) {
    console.error("Get projects error:", error);
    return errorResponse("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") + "-" + Date.now().toString(36);
    
    const newProject = {
      id: Date.now().toString(),
      slug,
      ...body,
      status: "PENDING_REVIEW",
      raisedAmount: 0,
      membersCount: 1,
      stakesCount: 0,
      creator: { id: "demo", name: "Demo User", avatar: null },
      createdAt: new Date().toISOString(),
    };
    
    return successResponse({ project: newProject }, 201);
  } catch (error) {
    return errorResponse("Internal server error", 500);
  }
}
