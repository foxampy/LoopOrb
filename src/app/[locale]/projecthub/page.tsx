"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, FlaskConical, Cpu, Waves, Droplets, Microscope,
  Target, Clock, CheckCircle2, Circle, Sparkles, Lightbulb, 
  TrendingUp, Users, Gem, Award, ArrowRight, Zap, Globe,
  Menu, X, Wallet, FileText, FileCheck, Hash, Box, FolderOpen,
  Lock, Unlock, Vote, Coins, Brain, Shield, Radio,
  Thermometer, Eye, Beaker, Satellite, Droplet,
  Wifi, QrCode, Database, Server, Activity, TrendingDown,
  Plus, Minus, ChevronRight, Filter, Search, ArrowUpRight
} from "lucide-react";

// --- PROJECTS DATA FROM DOCUMENTATION ---
const projects = [
  // HARDWARE INNOVATION
  {
    id: "aquacell",
    title: "AquaCell",
    category: "Hardware Innovation",
    subtitle: "Бытовой сенсор для квартир и домов",
    description: "Портативная лаборатория для анализа воды с лабораторной точностью ±2%. Lab-on-chip технология с NFC-верификацией картриджей.",
    longDescription: "AquaCell — это компактное устройство для бытового мониторинга качества воды. Пользователь получает данные о pH, температуре, турбидности, проводимости и ОВП (окислительно-восстановительный потенциал) в реальном времени.",
    price: "$199",
    status: "production",
    progress: 85,
    icon: Droplet,
    color: "from-cyan-500 to-blue-500",
    specs: [
      { label: "Точность", value: "±2%" },
      { label: "Параметры", value: "pH, T, турбидность, ОВП" },
      { label: "Связь", value: "Bluetooth 5.0, WiFi" },
      { label: "Питание", value: "USB-C, 3 месяца" },
    ],
    emissionRate: "10 VOD/m³",
    features: [
      "Lab-on-chip технология",
      "NFC-верификация картриджей",
      "Мгновенные результаты (30 сек)",
      "Интеграция с мобильным приложением",
      "История измерений в облаке"
    ]
  },
  {
    id: "aquahome",
    title: "AquaHome",
    category: "Hardware Innovation", 
    subtitle: "Расширенная станция мониторинга",
    description: "Стационарная система мониторинга с автосэмплером TimeCapsule. 12 проб/квартал + real-time Guardian на выходе фильтра.",
    longDescription: "AquaHome — профессиональная станция для дома или небольшого офиса. Автоматический отбор проб, расширенный набор датчиков, интеграция с системами умного дома.",
    price: "$499",
    status: "testing",
    progress: 62,
    icon: Waves,
    color: "from-teal-500 to-emerald-500",
    specs: [
      { label: "Проб/квартал", value: "12" },
      { label: "Параметры", value: "12+ показателей" },
      { label: "Связь", value: "WiFi, Ethernet" },
      { label: "Хранение", value: "TimeCapsule 1 год" },
    ],
    emissionRate: "12 VOD/m³",
    features: [
      "Автосэмплер TimeCapsule",
      "Real-time monitoring",
      "Интеграция с умным домом",
      "Расширенная аналитика",
      "API доступ для разработчиков"
    ]
  },
  {
    id: "aquadrone",
    title: "AquaDrones",
    category: "Hardware Innovation",
    subtitle: "Промышленные датчики для водоемов",
    description: "Автономные катамараны для удалённого сэмплирования. 4-6 часов автономности, доставка проб между буями.",
    longDescription: "AquaDrones — автономные беспилотные катамараны для мониторинга крупных водоемов: озер, водохранилищ, заливов. Способны работать в сложных погодных условиях.",
    price: "$2,999",
    status: "concept",
    progress: 15,
    icon: Satellite,
    color: "from-amber-500 to-orange-500",
    specs: [
      { label: "Автономность", value: "4-6 часов" },
      { label: "Радиус", value: "5 км" },
      { label: "Связь", value: "4G/5G, LoRaWAN" },
      { label: "Грузоподъемность", value: "2 кг проб" },
    ],
    emissionRate: "15 VOD/m³",
    features: [
      "Автономная навигация",
      "Многоточечное сэмплирование",
      "GPS-трекинг",
      "Погодозащита IP67",
      "Облачная аналитика"
    ]
  },
  {
    id: "smart-filters",
    title: "Smart Filters",
    category: "Hardware Innovation",
    subtitle: "Интеллектуальные системы очистки",
    description: "Системы очистки воды с AI-управлением и интегрированным мониторингом качества на входе и выходе.",
    longDescription: "Smart Filters объединяют физическую очистку воды с цифровым мониторингом. AI оптимизирует расход ресурсов и предсказывает необходимость замены фильтров.",
    price: "$899",
    status: "development",
    progress: 40,
    icon: Beaker,
    color: "from-violet-500 to-purple-500",
    specs: [
      { label: "Производительность", value: "1000 л/час" },
      { label: "Статусы", value: "6 стадий очистки" },
      { label: "AI-модуль", value: "Edge computing" },
      { label: "Срок службы", value: "10 лет" },
    ],
    emissionRate: "8 VOD/m³",
    features: [
      "AI-оптимизация очистки",
      "Предиктивное обслуживание",
      "Мониторинг вход/выход",
      "Автозаказ картриджей",
      "Энергоэффективность"
    ]
  },
  
  // WATER TREATMENT
  {
    id: "desalination",
    title: "Desalination Tech",
    category: "Water Treatment",
    subtitle: "Опреснение морской воды",
    description: "Инновационные технологии опреснения с минимальным энергопотреблением и утилизацией солей.",
    longDescription: "Проект разработки энергоэффективных систем опреснения морской воды для прибрежных регионов. Использование возобновляемых источников энергии.",
    price: "Enterprise",
    status: "research",
    progress: 25,
    icon: Droplets,
    color: "from-blue-600 to-cyan-600",
    specs: [
      { label: "Эффективность", value: "99.2%" },
      { label: "Энергия", value: "2.5 кВт·ч/м³" },
      { label: "Производительность", value: "1000 м³/день" },
      { label: "Утилизация", value: "95% солей" },
    ],
    emissionRate: "20 VOD/m³",
    features: [
      "Солнечная энергия",
      "Утилизация солей",
      "Модульная конструкция",
      "Удаленный мониторинг",
      "Минимальные отходы"
    ]
  },
  {
    id: "bio-filtration",
    title: "Bio-filtration",
    category: "Water Treatment",
    subtitle: "Биологическая фильтрация",
    description: "Природные системы очистки с использованием микроорганизмов и растений для устойчивой обработки воды.",
    longDescription: "Экологичная система очистки воды без химикатов. Использует природные процессы с участием бактерий, водных растений и биопленок.",
    price: "$299",
    status: "testing",
    progress: 70,
    icon: Database,
    color: "from-emerald-600 to-green-600",
    specs: [
      { label: "Эффективность", value: "98%" },
      { label: "Без химикатов", value: "100%" },
      { label: "Обслуживание", value: "минимальное" },
      { label: "Срок", value: "20+ лет" },
    ],
    emissionRate: "15 VOD/m³",
    features: [
      "Природные процессы",
      "Нулевые выбросы",
      "Самовосстановление",
      "Эстетичный дизайн",
      "Образовательная ценность"
    ]
  },
  {
    id: "nano-filtration",
    title: "Nano-filtration",
    category: "Water Treatment",
    subtitle: "Нанофильтрационные мембраны",
    description: "Передовые мембранные технологии для удаления микропластика, тяжелых металлов и патогенов.",
    longDescription: "Нанотехнологические мембраны с контролируемым размером пор для селективной фильтрации. Удаляют загрязнители размером до 0.001 микрона.",
    price: "$599",
    status: "development",
    progress: 55,
    icon: Activity,
    color: "from-indigo-500 to-blue-500",
    specs: [
      { label: "Размер пор", value: "0.001 мкм" },
      { label: "Пропускная способность", value: "500 л/час" },
      { label: "Срок службы", value: "5 лет" },
      { label: "Самоочистка", value: "CIP-система" },
    ],
    emissionRate: "18 VOD/m³",
    features: [
      "Удаление микропластика",
      "Селективная фильтрация",
      "Самоочищающиеся мембраны",
      "IoT-мониторинг",
      "Модульность"
    ]
  },
  {
    id: "solar-purification",
    title: "Solar Purification",
    category: "Water Treatment",
    subtitle: "Солнечная дезинфекция",
    description: "Автономные системы очистки воды на солнечной энергии для регионов без электричества.",
    longDescription: "Компактная система очистки воды работающая исключительно на солнечной энергии. UV-дезинфекция и фильтрация без подключения к сети.",
    price: "$149",
    status: "production",
    progress: 90,
    icon: Zap,
    color: "from-yellow-500 to-amber-500",
    specs: [
      { label: "Мощность", value: "50 Вт (солнечная)" },
      { label: "Производительность", value: "50 л/день" },
      { label: "Эффективность", value: "99.9% бактерий" },
      { label: "Автономность", value: "100%" },
    ],
    emissionRate: "12 VOD/m³",
    features: [
      "100% солнечная энергия",
      "UV-дезинфекция",
      "Без электросети",
      "Портативность",
      "Аварийное использование"
    ]
  },

  // DATA & ANALYTICS
  {
    id: "ai-prediction",
    title: "AI Prediction Engine",
    category: "Data & Analytics",
    subtitle: "Прогнозирование качества воды",
    description: "ML-модели прогнозирования качества воды. Edge computing + централизованное обучение. Точность прогнозов >85%.",
    longDescription: "Искусственный интеллект анализирует исторические данные и предсказывает изменения качества воды. Помогает предотвращать кризисы и оптимизировать ресурсы.",
    price: "Subscription",
    status: "development",
    progress: 45,
    icon: Brain,
    color: "from-pink-500 to-rose-500",
    specs: [
      { label: "Точность", value: ">85%" },
      { label: "Горизонт", value: "7-30 дней" },
      { label: "Обновление", value: "Real-time" },
      { label: "API", value: "REST + GraphQL" },
    ],
    emissionRate: "Бонус за точность",
    features: [
      "Предиктивная аналитика",
      "Раннее предупреждение",
      "Edge computing",
      "Облачное обучение",
      "Интеграция с датчиками"
    ]
  },
  {
    id: "blockchain-registry",
    title: "Blockchain Water Registry",
    category: "Data & Analytics",
    subtitle: "Реестр водных ресурсов",
    description: "Неподкупный реестр всех водных источников с историей использования и правами собственности.",
    longDescription: "Децентрализованный реестр на блокчейне для учета водных ресурсов. Прозрачная история использования, права собственности, лицензии.",
    price: "Free",
    status: "production",
    progress: 80,
    icon: Database,
    color: "from-cyan-600 to-blue-600",
    specs: [
      { label: "Блокчейн", value: "TON / Ethereum" },
      { label: "TPS", value: "10,000" },
      { label: "Хранение", value: "IPFS" },
      { label: "Доступ", value: "Public API" },
    ],
    emissionRate: "5 VOD/запись",
    features: [
      "Неподкупность данных",
      "Прозрачная история",
      "Смарт-контракты",
      "Глобальный доступ",
      "Интеграция с ГИС"
    ]
  },
  {
    id: "climate-analysis",
    title: "Climate Impact Analysis",
    category: "Data & Analytics",
    subtitle: "Анализ влияния климата",
    description: "Моделирование влияния изменения климата на водные ресурсы региона с рекомендациями по адаптации.",
    longDescription: "Комплексный анализ климатических изменений и их влияния на водные ресурсы. Прогнозирование дефицита, наводнений, изменения качества.",
    price: "Enterprise",
    status: "research",
    progress: 30,
    icon: TrendingUp,
    color: "from-green-600 to-emerald-600",
    specs: [
      { label: "Модели", value: "IPCC + ML" },
      { label: "Горизонт", value: "50 лет" },
      { label: "Точность", value: "±5%" },
      { label: "Обновление", value: "Ежеквартально" },
    ],
    emissionRate: "По запросу",
    features: [
      "Климатическое моделирование",
      "Риск-анализ",
      "Рекомендации",
      "Отчеты для правительств",
      "Научные публикации"
    ]
  },
  {
    id: "leak-detection",
    title: "Leak Detection Systems",
    category: "Data & Analytics",
    subtitle: "Системы обнаружения утечек",
    description: "IoT-сеть датчиков для обнаружения утечек в водопроводных сетях с точностью до 10 метров.",
    longDescription: "Акустические и pressure-based датчики выявляют утечки в трубопроводах. Мгновенное оповещение и точная локализация проблемы.",
    price: "$49/месяц",
    status: "testing",
    progress: 65,
    icon: Activity,
    color: "from-red-500 to-rose-500",
    specs: [
      { label: "Точность", value: "±10 м" },
      { label: "Время реакции", value: "<1 мин" },
      { label: "Покрытие", value: "10 км" },
      { label: "Сеть", value: "LoRaWAN" },
    ],
    emissionRate: "Бонус за экономию",
    features: [
      "Акустическое обнаружение",
      "Real-time мониторинг",
      "Точная локализация",
      "Интеграция с SCADA",
      "Экономия 20-30% воды"
    ]
  },

  // COMMUNITY SOLUTIONS
  {
    id: "rural-water",
    title: "Rural Water Access",
    category: "Community Solutions",
    subtitle: "Доступ к воде в сельских районах",
    description: "Недорогие решения для обеспечения чистой питьевой водой в удаленных сельских районах развивающихся стран.",
    longDescription: "Проект направлен на обеспечение базового доступа к чистой воде в сельской местности. Простые технологии, местные материалы, обучение сообществ.",
    price: "Donation",
    status: "production",
    progress: 95,
    icon: Users,
    color: "from-amber-600 to-yellow-600",
    specs: [
      { label: "Стоимость", value: "< $50" },
      { label: "Срок службы", value: "5 лет" },
      { label: "Обслуживание", value: "местное" },
      { label: "Охват", value: "100+ человек" },
    ],
    emissionRate: "20 VOD/установка",
    features: [
      "Доступная цена",
      "Локальное производство",
      "Обучение сообществ",
      "Устойчивость",
      "Мониторинг качества"
    ]
  },
  {
    id: "education",
    title: "Educational Programs",
    category: "Community Solutions",
    subtitle: "Образовательные программы",
    description: "Образовательные инициативы по сохранению воды для школ, университетов и местных сообществ.",
    longDescription: "Программы обучения экологической грамотности, бережному использованию воды, основам мониторинга качества. Для всех возрастов.",
    price: "Free",
    status: "active",
    progress: 88,
    icon: Lightbulb,
    color: "from-purple-600 to-violet-600",
    specs: [
      { label: "Курсов", value: "50+" },
      { label: "Учащихся", value: "10,000+" },
      { label: "Языков", value: "20" },
      { label: "Сертификация", value: "DeSci" },
    ],
    emissionRate: "5 VOD/курс",
    features: [
      "Интерактивные курсы",
      "Практические занятия",
      "Сертификация",
      "Сообщество",
      "Менторство"
    ]
  },
  {
    id: "emergency",
    title: "Emergency Response",
    category: "Community Solutions",
    subtitle: "Системы реагирования на ЧС",
    description: "Быстро разворачиваемые системы очистки воды при стихийных бедствиях и чрезвычайных ситуациях.",
    longDescription: "Мобильные очистные установки для экстренной помощи при наводнениях, землетрясениях, загрязнении. Разворачиваются за 24 часа.",
    price: "NGO",
    status: "testing",
    progress: 72,
    icon: Shield,
    color: "from-red-600 to-orange-600",
    specs: [
      { label: "Развертывание", value: "24 часа" },
      { label: "Производительность", value: "10,000 л/день" },
      { label: "Портативность", value: "3 чемодана" },
      { label: "Энергия", value: "Солнечная" },
    ],
    emissionRate: "Бонус за спасение",
    features: [
      "Быстрое развертывание",
      "Военная надежность",
      "Автономность",
      "Мульти-загрязнения",
      "GPS-трекинг"
    ]
  },
  {
    id: "indigenous",
    title: "Indigenous Rights",
    category: "Community Solutions",
    subtitle: "Права коренных народов на воду",
    description: "Поддержка прав коренных народов на доступ к водным ресурсам и сохранение традиционных практик управления.",
    longDescription: "Проект защиты прав коренных народов на воду. Документирование традиционных знаний, юридическая поддержка, технологические решения.",
    price: "Grant-funded",
    status: "active",
    progress: 60,
    icon: Globe,
    color: "from-teal-600 to-cyan-600",
    specs: [
      { label: "Народов", value: "50+" },
      { label: "Регионов", value: "20" },
      { label: "Юристов", value: "Pro bono" },
      { label: "Документация", value: "Blockchain" },
    ],
    emissionRate: "По договоренности",
    features: [
      "Защита прав",
      "Документирование знаний",
      "Юридическая помощь",
      "Технологии",
      "Международное лоббирование"
    ]
  }
];

// --- CATEGORIES ---
const categories = [
  { id: "all", label: "Все проекты", count: projects.length },
  { id: "Hardware Innovation", label: "Hardware", count: projects.filter(p => p.category === "Hardware Innovation").length },
  { id: "Water Treatment", label: "Treatment", count: projects.filter(p => p.category === "Water Treatment").length },
  { id: "Data & Analytics", label: "Analytics", count: projects.filter(p => p.category === "Data & Analytics").length },
  { id: "Community Solutions", label: "Community", count: projects.filter(p => p.category === "Community Solutions").length },
];

// --- STATUS LABELS ---
const statusLabels = {
  production: { label: "В производстве", color: "bg-emerald-500", text: "text-emerald-400" },
  testing: { label: "Тестирование", color: "bg-amber-500", text: "text-amber-400" },
  development: { label: "Разработка", color: "bg-blue-500", text: "text-blue-400" },
  research: { label: "Исследования", color: "bg-purple-500", text: "text-purple-400" },
  concept: { label: "Концепт", color: "bg-slate-500", text: "text-slate-400" },
  active: { label: "Активен", color: "bg-cyan-500", text: "text-cyan-400" },
};

// --- PROJECT CARD ---
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const status = statusLabels[project.status as keyof typeof statusLabels];
  const Icon = project.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/projecthub/${project.id}`}>
        <div className="relative bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
          {/* Header with gradient */}
          <div className={`h-2 bg-gradient-to-r ${project.color}`} />
          
          <div className="p-6">
            {/* Icon and Category */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs text-slate-500">{project.category}</span>
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-800`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${status.color} animate-pulse`} />
                  <span className={`text-xs ${status.text}`}>{status.label}</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-cyan-400 mb-3">{project.subtitle}</p>
            
            {/* Description */}
            <p className="text-sm text-slate-400 mb-4 line-clamp-2">
              {project.description}
            </p>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-500">Готовность</span>
                <span className="text-cyan-400 font-mono">{project.progress}%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  className={`h-full bg-gradient-to-r ${project.color}`}
                />
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {project.specs.slice(0, 2).map((spec, i) => (
                <div key={i} className="bg-slate-800/50 rounded-lg p-2">
                  <div className="text-xs text-slate-500">{spec.label}</div>
                  <div className="text-sm text-slate-300 font-medium">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="text-sm">
                <span className="text-slate-500">Эмиссия: </span>
                <span className="text-emerald-400 font-mono">{project.emissionRate}</span>
              </div>
              <div className="flex items-center gap-1 text-cyan-400 text-sm font-medium group-hover:gap-2 transition-all">
                Подробнее
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// --- MAIN PAGE ---
export default function ProjectHubPage() {
  const t = useTranslations("projecthub");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const pageLinks = [
    { href: "/landing", label: "Staking" },
    { href: "/ecosystem", label: "Ecosystem" },
    { href: "/projecthub", label: "ProjectHub", active: true },
    { href: "/tokenomics", label: "Tokenomics" },
    { href: "/dao", label: "DAO" },
    { href: "/profile", label: "Account" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">VODeco</span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {pageLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-sm transition-colors ${
                    link.active ? "text-cyan-400" : "text-slate-400 hover:text-cyan-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link 
                href="/wallet"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-medium rounded-lg transition-colors text-sm"
              >
                <Wallet className="w-4 h-4" />
                Wallet
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-400"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-slate-800 bg-slate-950"
            >
              <div className="px-4 py-4 space-y-2">
                {pageLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2 rounded-lg text-sm ${
                      link.active 
                        ? "bg-cyan-500/10 text-cyan-400" 
                        : "text-slate-400 hover:text-cyan-400 hover:bg-slate-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400">DeSci ProjectHub</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  ProjectHub
                </span>
              </h1>
              
              <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
                {t("subtitle")}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl flex items-center gap-2 hover:from-cyan-400 hover:to-emerald-400 transition-all">
                  <Rocket className="w-5 h-5" />
                  {t("common.comingSoon")}
                </button>
                <button className="px-6 py-3 bg-slate-800 text-white font-medium rounded-xl border border-slate-700 flex items-center gap-2 hover:bg-slate-700 transition-all">
                  <FileText className="w-5 h-5" />
                  {t("common.comingSoon")}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Проектов", value: "16", icon: FolderOpen },
              { label: "Исследователей", value: "156+", icon: Users },
              { label: "Всего финансирования", value: "$4.2M", icon: Gem },
              { label: "Патентов", value: "23", icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center"
              >
                <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-cyan-500 text-slate-900"
                    : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                }`}
              >
                {cat.label}
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.id ? "bg-slate-900/20" : "bg-slate-700"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Как это работает</h2>
            <p className="text-slate-400">От идеи до коммерциализации — 6 этапов</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { step: "1", title: "Предложение", desc: "Подготовка проекта с бюджетом и milestones", icon: FileText },
              { step: "2", title: "Ревью", desc: "Обзор сообществом и peer review", icon: Users },
              { step: "3", title: "Голосование", desc: "DAO голосование с квадратичным весом", icon: Vote },
              { step: "4", title: "Разработка", desc: "Milestone-based funding", icon: Cpu },
              { step: "5", title: "Верификация", desc: "Проверка выполнения этапов", icon: CheckCircle2 },
              { step: "6", title: "IP-NFT", desc: "Токенизация и коммерциализация", icon: Hash },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-xs text-cyan-400 mb-1">Шаг {item.step}</div>
                <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/30 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Готовы строить будущее водной экономики?
            </h2>
            <p className="text-slate-400 mb-6">
              Присоединяйтесь к экосистеме исследователей и разработчиков. 
              Получите грант на разработку вашего проекта.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                Подать заявку
              </button>
              <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 transition-colors">
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">VODeco ProjectHub</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/landing" className="hover:text-cyan-400 transition-colors">Staking</Link>
            <Link href="/ecosystem" className="hover:text-cyan-400 transition-colors">Ecosystem</Link>
            <Link href="/tokenomics" className="hover:text-cyan-400 transition-colors">Tokenomics</Link>
            <Link href="/dao" className="hover:text-cyan-400 transition-colors">DAO</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
