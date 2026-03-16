"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Search,
  Filter,
  FolderOpen,
  MapPin,
  Users,
  TrendingUp,
  ChevronDown,
  Droplets,
  Leaf,
  Zap,
  Globe,
  Target,
  Clock,
  BarChart3,
  Shield,
  Award,
  ArrowRight,
} from "lucide-react";

// 📊 Детальные проекты из документов LoopOrb
const detailedProjects = [
  {
    id: "proj-1",
    slug: "modernization-uzbekistan-bukhara",
    name: "Модернизация насосных станций Бухарского региона",
    shortDescription: "Комплексная реконструкция 12 насосных станций с IoT-мониторингом. Снижение потерь воды на 35%.",
    fullDescription: `Проект направлен на модернизацию устаревшей инфраструктуры водоснабжения Бухарского региона Узбекистана. 

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
    gallery: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800",
    ],
    targetAmount: 45000000,
    raisedAmount: 28400000,
    minInvestment: 100,
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
      waterSaved: 12500000, // м³/год
      co2Reduced: 4500, // тонн/год
      peopleBenefited: 500000,
      jobsCreated: 120,
    },
    tags: ["инфраструктура", "IoT", "Узбекистан", "модернизация"],
  },
  {
    id: "proj-2",
    slug: "aral-sea-restoration",
    name: "Спасение Аральского моря — Phase 1",
    shortDescription: "Комплексное восстановление северной части Аральского моря. Лесопосадки, каналы, биополигоны.",
    fullDescription: `Аральское море — одна из крупнейших экологических катастроф XX века. Но восстановление возможно!

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
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    ],
    targetAmount: 120000000,
    raisedAmount: 34500000,
    minInvestment: 500,
    expectedApy: 8.5,
    irr: 0, // Социальный проект
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
      co2Reduced: 850000, // тонн/год через лесопосадки
      peopleBenefited: 2000000,
      jobsCreated: 3500,
    },
    tags: ["восстановление", "экология", "мега-проект", "международный"],
  },
  {
    id: "proj-3",
    slug: "nile-cleanup-cairo",
    name: "Чистый Нил — Каирская программа",
    shortDescription: "Очистка 50 км берегов Нила в районе Каира. Удаление пластика, очистка стоков, образование.",
    fullDescription: `Нил — артерия жизни для 300 миллионов человек. Но в районе Каира река страдает от загрязнения.

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
    gallery: [
      "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800",
    ],
    targetAmount: 25000000,
    raisedAmount: 18700000,
    minInvestment: 50,
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
  },
  {
    id: "proj-4",
    slug: "amazon-conservation-brazil",
    name: "Амазония: Защита водного баланса бассейна",
    shortDescription: "Комплексная программа защиты Амазонки. Мониторинг вырубок, восстановление лесов, защита прав.",
    fullDescription: `Амазонка производит 20% всей пресной воды планеты. Её сохранение — ключ к климатической стабильности.

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
    gallery: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      "https://images.unsplash.com/photo-1518182170546-0766bc6f9213?w=800",
    ],
    targetAmount: 85000000,
    raisedAmount: 52300000,
    minInvestment: 200,
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
  },
  {
    id: "proj-5",
    slug: "lake-victoria-watch",
    name: "Виктория Watch — Мониторинг озера",
    shortDescription: "Сеть из 200 IoT-сенсоров для мониторинга качества воды озера Виктория. Раннее предупреждение.",
    fullDescription: `Озеро Виктория — второе по величине пресноводное озеро мира. 40 млн человек зависят от его вод.

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
    gallery: [],
    targetAmount: 12000000,
    raisedAmount: 8900000,
    minInvestment: 50,
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
  },
  {
    id: "proj-6",
    slug: "ganga-clean-varanasi",
    name: "Чистый Ганг — Варанаси-Канпур",
    shortDescription: "Комплексная очистка 150 км священной реки. Очистные сооружения, баржи, биовосстановление.",
    fullDescription: `Ганг — священная река для 1.1 млрд индусов. Проект 'Чистый Ганг' — крупнейшая программа очистки реки в истории.

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
    gallery: [],
    targetAmount: 320000000,
    raisedAmount: 241000000,
    minInvestment: 1000,
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
  },
  {
    id: "proj-7",
    slug: "balkhash-emergency",
    name: "Экстренное спасение озера Балхаш",
    shortDescription: "Критический проект по спасению озера от полного высыхания. Диверсия вод, мониторинг, защита.",
    fullDescription: `Балхаш — одно из крупнейших озёр Азии. За 50 лет его площадь сократилась на 40%. Без действий озеро исчезнет к 2035.

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
    gallery: [],
    targetAmount: 180000000,
    raisedAmount: 23000000,
    minInvestment: 100,
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
  },
  {
    id: "proj-8",
    slug: "solar-water-kenya",
    name: "Solar Water Kenya — Солнечные насосы",
    shortDescription: "500 солнечных насосных станций для сельской Кении. Доступ к воде для 500,000 человек.",
    fullDescription: `В сельской Кении 40% населения не имеет доступа к чистой воде. Солнечные насосы — устойчивое решение.

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
    gallery: [],
    targetAmount: 15000000,
    raisedAmount: 12800000,
    minInvestment: 25,
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
  },
];

const projectTypes = [
  { value: "", label: "Все типы", icon: FolderOpen },
  { value: "INFRASTRUCTURE", label: "Инфраструктура", icon: Zap },
  { value: "RESTORATION", label: "Восстановление", icon: Leaf },
  { value: "CLEANUP", label: "Очистка", icon: Droplets },
  { value: "MONITORING", label: "Мониторинг", icon: BarChart3 },
  { value: "CONSERVATION", label: "Консервация", icon: Shield },
];

const countries = [
  { value: "", label: "Все страны" },
  { value: "Узбекистан", label: "🇺🇿 Узбекистан" },
  { value: "Казахстан", label: "🇰🇿 Казахстан" },
  { value: "Египет", label: "🇪🇬 Египет" },
  { value: "Бразилия", label: "🇧🇷 Бразилия" },
  { value: "Индия", label: "🇮🇳 Индия" },
  { value: "Кения", label: "🇰🇪 Кения" },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(detailedProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [selectedProject, setSelectedProject] = useState<typeof detailedProjects[0] | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesType = !type || p.type === type;
    const matchesCountry = !country || p.country.includes(country);
    return matchesSearch && matchesType && matchesCountry;
  });

  // Статистика
  const totalRaised = projects.reduce((sum, p) => sum + p.raisedAmount, 0);
  const totalTarget = projects.reduce((sum, p) => sum + p.targetAmount, 0);
  const totalMembers = projects.reduce((sum, p) => sum + p.membersCount, 0);
  const avgEsg = Math.round(projects.reduce((sum, p) => sum + p.esgScore, 0) / projects.length);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Проекты экосистемы <span className="gradient-text">ProjectHub</span>
                </h1>
                <p className="text-water-200/70">
                  Инвестируйте в реальные проекты по сохранению водных ресурсов
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/projects/new" className="btn-primary">
                  <Zap className="w-4 h-4 mr-2 inline" />
                  Создать проект
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Stats Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: "Собрано средств", value: `$${(totalRaised / 1e6).toFixed(1)}M`, icon: TrendingUp, color: "text-green-400" },
              { label: "Целевая сумма", value: `$${(totalTarget / 1e6).toFixed(0)}M`, icon: Target, color: "text-water-400" },
              { label: "Участников", value: totalMembers.toLocaleString(), icon: Users, color: "text-cyan-400" },
              { label: "Средний ESG", value: avgEsg, icon: Award, color: "text-yellow-400" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-water-200/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-water-200/50" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Поиск проектов..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-water-500 transition"
                />
              </div>

              {/* Type Filter */}
              <div className="relative min-w-[200px]">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-water-200/50" />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-8 text-white appearance-none focus:outline-none focus:border-water-500 transition"
                >
                  {projectTypes.map((t) => (
                    <option key={t.value} value={t.value} className="bg-ocean-deep">
                      {t.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-water-200/50 pointer-events-none" />
              </div>

              {/* Country Filter */}
              <div className="relative min-w-[200px]">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-water-200/50" />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-8 text-white appearance-none focus:outline-none focus:border-water-500 transition"
                >
                  {countries.map((c) => (
                    <option key={c.value} value={c.value} className="bg-ocean-deep">
                      {c.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-water-200/50 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin" />
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FolderOpen className="w-16 h-16 text-water-200/30 mx-auto mb-4" />
              <p className="text-water-200/50 text-lg">Проекты не найдены</p>
              <p className="text-water-200/30 text-sm mt-2">
                Попробуйте изменить параметры поиска
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </>
  );
}

function ProjectCard({ project, onClick }: { project: typeof detailedProjects[0]; onClick: () => void }) {
  const progress = project.targetAmount
    ? Math.min(100, (project.raisedAmount / project.targetAmount) * 100)
    : 0;

  const typeLabels: Record<string, string> = {
    INFRASTRUCTURE: "Инфраструктура",
    RESTORATION: "Восстановление",
    CLEANUP: "Очистка",
    MONITORING: "Мониторинг",
    CONSERVATION: "Консервация",
  };

  const statusLabels: Record<string, { text: string; color: string }> = {
    ACTIVE: { text: "Активен", color: "bg-green-500/20 text-green-400" },
    FUNDRAISING: { text: "Сбор средств", color: "bg-yellow-500/20 text-yellow-400" },
    PENDING: { text: "В ожидании", color: "bg-gray-500/20 text-gray-400" },
  };

  return (
    <div
      onClick={onClick}
      className="block glass-card-hover overflow-hidden group h-full cursor-pointer"
    >
      {/* Cover */}
      <div className="h-40 bg-gradient-to-br from-water-500/30 to-cyan-glow/30 relative overflow-hidden">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FolderOpen className="w-16 h-16 text-water-400/50" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2 py-1 backdrop-blur-sm rounded text-xs font-medium capitalize ${statusLabels[project.status]?.color || "bg-ocean-deep/80 text-white"}`}>
            {statusLabels[project.status]?.text || project.status}
          </span>
        </div>
        {project.esgScore && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-green-500/20 backdrop-blur-sm rounded text-xs font-medium text-green-400">
              ESG {project.esgScore}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-water-200/50 uppercase tracking-wider">
            {typeLabels[project.type] || project.type}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-water-400 transition">
          {project.name}
        </h3>
        <p className="text-sm text-water-200/60 mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Progress */}
        {project.targetAmount && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-water-200/70">
                ${(project.raisedAmount / 1e6).toFixed(1)}M
              </span>
              <span className="text-water-200/50">
                ${(project.targetAmount / 1e6).toFixed(0)}M
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-water-400 to-cyan-glow rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-right text-xs text-cyan-glow mt-1">
              {progress.toFixed(1)}%
            </div>
          </div>
        )}

        {/* Impact Preview */}
        <div className="flex gap-4 mb-4 text-xs">
          {project.impact.peopleBenefited > 0 && (
            <div className="text-water-200/70">
              <Users className="w-3 h-3 inline mr-1" />
              {(project.impact.peopleBenefited / 1e6).toFixed(1)}M человек
            </div>
          )}
          {project.impact.co2Reduced > 0 && (
            <div className="text-green-400/70">
              <Leaf className="w-3 h-3 inline mr-1" />
              {project.impact.co2Reduced.toLocaleString()} т CO₂
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm pt-4 border-t border-white/10">
          <div className="flex items-center gap-4 text-water-200/50">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {project.country.split(" / ")[0]}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {project.membersCount}
            </span>
          </div>
          {project.expectedApy > 0 && (
            <span className="flex items-center gap-1 text-green-400">
              <TrendingUp className="w-4 h-4" />
              {project.expectedApy}% APY
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectDetailModal({ project, onClose }: { project: typeof detailedProjects[0]; onClose: () => void }) {
  const progress = project.targetAmount
    ? Math.min(100, (project.raisedAmount / project.targetAmount) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 overflow-hidden">
          <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition"
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-water-500/30 rounded-full text-sm text-water-300">
                {project.type}
              </span>
              <span className="px-3 py-1 bg-green-500/30 rounded-full text-sm text-green-300">
                ESG {project.esgScore}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white">{project.name}</h2>
          </div>
        </div>

        <div className="p-6 grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3">О проекте</h3>
              <p className="text-water-200/80 whitespace-pre-line">{project.fullDescription}</p>
            </section>

            {/* Milestones */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3">Этапы проекта</h3>
              <div className="space-y-3">
                {project.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.completed ? "bg-green-500 text-white" : "bg-white/10 text-water-200"
                    }`}>
                      {milestone.completed ? "✓" : idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-white">{milestone.name}</span>
                        <span className="text-water-200/50 text-sm">{milestone.date}</span>
                      </div>
                      {milestone.progress !== undefined && !milestone.completed && (
                        <div className="h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-water-400 rounded-full" style={{ width: `${milestone.progress}%` }} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Team */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3">Команда</h3>
              <div className="flex flex-wrap gap-4">
                {project.team.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3 glass-card p-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep font-bold">
                      {member.avatar}
                    </div>
                    <div>
                      <div className="text-white font-medium">{member.name}</div>
                      <div className="text-water-200/60 text-sm">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Documents */}
            <section>
              <h3 className="text-xl font-semibold text-white mb-3">Документы</h3>
              <div className="flex flex-wrap gap-3">
                {project.documents.map((doc, idx) => (
                  <button key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition">
                    <FolderOpen className="w-4 h-4 text-water-400" />
                    <span className="text-white text-sm">{doc.name}</span>
                    <span className="text-water-200/40 text-xs">({doc.size})</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Stats & Invest */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <div className="glass-card p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Финансирование</h3>
              <div className="text-3xl font-bold text-white mb-1">
                ${(project.raisedAmount / 1e6).toFixed(1)}M
              </div>
              <div className="text-water-200/60 text-sm mb-3">
                собрано из ${(project.targetAmount / 1e6).toFixed(0)}M
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-water-400 to-cyan-glow rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <div className="text-right text-cyan-glow font-medium">{progress.toFixed(1)}%</div>
            </div>

            {/* Impact Stats */}
            <div className="glass-card p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Влияние</h3>
              <div className="space-y-3">
                {project.impact.peopleBenefited > 0 && (
                  <div className="flex justify-between">
                    <span className="text-water-200/70">Людей получат доступ к воде</span>
                    <span className="text-white font-medium">{(project.impact.peopleBenefited / 1e6).toFixed(1)}M</span>
                  </div>
                )}
                {project.impact.waterSaved > 0 && (
                  <div className="flex justify-between">
                    <span className="text-water-200/70">Воды сохранено/год</span>
                    <span className="text-white font-medium">{(project.impact.waterSaved / 1e6).toFixed(1)}M м³</span>
                  </div>
                )}
                {project.impact.co2Reduced > 0 && (
                  <div className="flex justify-between">
                    <span className="text-water-200/70">CO₂ предотвращено</span>
                    <span className="text-green-400 font-medium">{project.impact.co2Reduced.toLocaleString()} т/год</span>
                  </div>
                )}
                {project.impact.jobsCreated > 0 && (
                  <div className="flex justify-between">
                    <span className="text-water-200/70">Рабочих мест</span>
                    <span className="text-white font-medium">{project.impact.jobsCreated}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Investment Info */}
            <div className="glass-card p-5">
              <h3 className="text-lg font-semibold text-white mb-4">Инвестирование</h3>
              <div className="space-y-3 mb-5">
                {project.expectedApy > 0 && (
                  <div className="flex justify-between">
                    <span className="text-water-200/70">Ожидаемая доходность</span>
                    <span className="text-green-400 font-medium">{project.expectedApy}% APY</span>
                  </div>
                )}
                {project.irr > 0 && (
                  <div className="flex justify-between">
                    <span className="text-water-200/70">IRR</span>
                    <span className="text-white font-medium">{project.irr}%</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-water-200/70">Минимальная сумма</span>
                  <span className="text-white font-medium">${project.minInvestment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-water-200/70">Участников</span>
                  <span className="text-white font-medium">{project.membersCount}</span>
                </div>
              </div>
              <Link 
                href={`/projects/${project.slug}`}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Инвестировать
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* SDG Goals */}
            <div className="glass-card p-5">
              <h3 className="text-lg font-semibold text-white mb-3">Цели ООН (SDG)</h3>
              <div className="flex flex-wrap gap-2">
                {project.sdgGoals.map((goal) => (
                  <span key={goal} className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold">
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
