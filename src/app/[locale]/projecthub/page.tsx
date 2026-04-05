"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Droplets, FlaskConical, Cpu, Waves, Zap, Globe,
  Brain, Database, Activity, Shield, Users, Lightbulb,
  TrendingUp, Award, Rocket, Target, CheckCircle2, Circle,
  Sparkles, ArrowRight, Search, Filter, MapPin, Calendar,
  DollarSign, Percent, Clock, Heart, MessageCircle, Share2,
  UserPlus, BarChart3, Layers, Grid, Map, Star, ThumbsUp,
  ChevronRight, X, Plus, Minus, ExternalLink, Download,
  Microscope, Satellite, Beaker, Wifi, QrCode, Server,
  Thermometer, Eye, Radio, Box, Factory, Home, Leaf,
  GraduationCap, HeartPulse, HandCoins, Building, Landmark,
  Baby, Fish, Ship, Wind, Sun, Cloud, Snowflake, Flame,
  TestTube, Pill, Stethoscope, Utensils, ShoppingBag,
  Coins, Wallet, CreditCard, LineChart, PieChart,
  Lock, Key, Unlock, Scan, Barcode, Ruler, Weight,
  Gauge, Compass, Anchor, Flag, Trophy, Medal, Gem
} from "lucide-react";

// ============================================================================
// ТИПЫ И ИНТЕРФЕЙСЫ
// ============================================================================

interface ProjectSpec {
  label: string;
  value: string;
}

interface ProjectFeature {
  title: string;
  description?: string;
}

interface FinancialParams {
  budget: string;
  irr: string;
  roi?: string;
  paybackPeriod?: string;
  fundingAvailable?: string;
  coqs?: string;
  tokenReward?: string;
}

interface Milestone {
  title: string;
  date: string;
  status: "completed" | "in_progress" | "pending";
}

interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: string;
  status: "production" | "testing" | "development" | "research" | "concept" | "active" | "planning";
  progress: number;
  icon: any;
  color: string;
  specs: ProjectSpec[];
  features: ProjectFeature[];
  financials?: FinancialParams;
  milestones?: Milestone[];
  team?: TeamMember[];
  region?: string;
  esgScore?: number;
  emissionRate?: string;
  mermaidDiagram?: string;
  likes?: number;
  comments?: number;
  investors?: number;
}

// ============================================================================
// ДАННЫЕ ПРОЕКТОВ - ПОЛНАЯ ЭКОСИСТЕМА LOOPORB/VODECO
// ============================================================================

const projects: Project[] = [
  // ==========================================================================
  // B2C ПРОДУКТЫ (8 продуктов)
  // ==========================================================================
  
  // --- AQUACELL GO ---
  {
    id: "aquacell-go",
    title: "AquaCell Go",
    category: "B2C Products",
    subtitle: "Карманный скрининг воды для туристов",
    description: "Базовый анализатор: pH, TDS, температура, ORP. Bluetooth + мобильное приложение. NFT-верификация проб. 50 тестов/картридж.",
    longDescription: "AquaCell Go — это портативный анализатор воды для туристов, активистов и энтузиастов. Компактный размер (85×55×18 мм), вес всего 95г. Подключается к смартфону через Bluetooth 5.0. Зарабатывайте токены за каждую пробу воды.",
    price: "$149",
    status: "production",
    progress: 95,
    icon: Droplets,
    color: "from-emerald-500 to-green-600",
    specs: [
      { label: "Параметры", value: "pH, TDS, t°, ORP" },
      { label: "Точность", value: "±10%" },
      { label: "Картридж", value: "50 тестов" },
      { label: "Связь", value: "BLE 5.0" },
      { label: "Батарея", value: "6 мес (CR2032)" },
      { label: "Вес", value: "95 г" },
    ],
    features: [
      { title: "Мгновенный анализ", description: "Результат за 30 секунд через приложение" },
      { title: "NFT-верификация", description: "Каждая проба хэшируется в блокчейн" },
      { title: "GPS-привязка", description: "Точная геометка каждой пробы" },
      { title: "Геймификация", description: "NFT-бейджи за достижения" },
    ],
    financials: {
      budget: "$150K",
      irr: "35%",
      roi: "54%",
      paybackPeriod: "1.5-2 мес",
      coqs: "$65",
      tokenReward: "$2-5/проба",
    },
    milestones: [
      { title: "Прототип", date: "Q1 2025", status: "completed" },
      { title: "Сертификация", date: "Q2 2025", status: "completed" },
      { title: "Массовое производство", date: "Q4 2025", status: "in_progress" },
    ],
    region: "Global",
    esgScore: 88,
    emissionRate: "5 VOD/проба",
    likes: 445,
    comments: 78,
    investors: 32,
  },

  // --- AQUACELL PRO ---
  {
    id: "aquacell-pro",
    title: "AquaCell Pro",
    category: "B2C Products",
    subtitle: "Полевой анализатор для экспедиторов",
    description: "Спектрофотометр (NO₃, PO₄, NH₄), турбидность, DO. NB-IoT автономная связь. GPS+RTK (±1м). 30 тестов/картридж.",
    longDescription: "AquaCell Pro — профессиональный полевой анализатор для экспедиторов, исследователей и экологов. Встроенный спектрофотометр для точного анализа нитратов, фосфатов, аммония. Автономная NB-IoT связь без телефона.",
    price: "$449",
    status: "production",
    progress: 92,
    icon: Microscope,
    color: "from-cyan-500 to-blue-600",
    specs: [
      { label: "Параметры", value: "12 (хим+физ)" },
      { label: "Точность", value: "±5%" },
      { label: "Картридж", value: "30 тестов" },
      { label: "Связь", value: "NB-IoT/LTE-M + GPS" },
      { label: "Батарея", value: "3 мес" },
      { label: "Вес", value: "120 г" },
    ],
    features: [
      { title: "Спектрофотометр", description: "MEMS-спектрометр 200-1000 нм" },
      { title: "Автономная связь", description: "NB-IoT без смартфона" },
      { title: "RTK-GPS", description: "Точность позиционирования ±1м" },
      { title: "Премиум данные", description: "Высокая цена за пробы ($8-15)" },
    ],
    financials: {
      budget: "$300K",
      irr: "38%",
      roi: "58%",
      paybackPeriod: "2.5-3 мес",
      coqs: "$180",
      tokenReward: "$8-15/проба",
    },
    milestones: [
      { title: "MVP", date: "Q2 2025", status: "completed" },
      { title: "Полевые тесты", date: "Q3 2025", status: "completed" },
      { title: "Запуск продаж", date: "Q1 2026", status: "in_progress" },
    ],
    region: "Global",
    esgScore: 90,
    emissionRate: "12 VOD/проба",
    likes: 312,
    comments: 52,
    investors: 24,
  },

  // --- AQUACELL LAB ---
  {
    id: "aquacell-lab",
    title: "AquaCell Lab",
    category: "B2C Products",
    subtitle: "Лабораторная точность в поле",
    description: "Флуориметр (E.coli, тяжёлые металлы), ICP-MS чипы (Pb, As, Cd, Hg). Фото-фиксация. Калибровка NIST.",
    longDescription: "AquaCell Lab — флагманский портативный анализатор с лабораторной точностью. Флуориметр для детекции бактерий, электрохимические сенсоры для тяжёлых металлов. Данные принимаются в научные журналы.",
    price: "$1,299",
    status: "testing",
    progress: 85,
    icon: FlaskConical,
    color: "from-purple-500 to-violet-600",
    specs: [
      { label: "Параметры", value: "25+ (лабораторные)" },
      { label: "Точность", value: "±2%" },
      { label: "Картридж", value: "15 тестов" },
      { label: "Связь", value: "NB-IoT + RTK + фото" },
      { label: "Батарея", value: "1 мес" },
      { label: "Вес", value: "180 г" },
    ],
    features: [
      { title: "Флуориметр", description: "Детекция E.coli, колиформ" },
      { title: "ICP-MS чипы", description: "Pb, As, Cd, Hg с точностью ±2%" },
      { title: "Фото-фиксация", description: "Визуальное подтверждение пробы" },
      { title: "Научный уровень", description: "Данные для публикаций (DOI)" },
    ],
    financials: {
      budget: "$500K",
      irr: "42%",
      roi: "65%",
      paybackPeriod: "3-4 мес",
      coqs: "$650",
      tokenReward: "$25-50/проба",
    },
    milestones: [
      { title: "Прототип", date: "Q3 2025", status: "completed" },
      { title: "Лабораторная валидация", date: "Q4 2025", status: "completed" },
      { title: "Сертификация ISO", date: "Q2 2026", status: "pending" },
    ],
    region: "Global",
    esgScore: 92,
    emissionRate: "40 VOD/проба",
    likes: 267,
    comments: 48,
    investors: 19,
  },

  // --- AQUACELL MINI ---
  {
    id: "aquacell-mini",
    title: "AquaCell Mini",
    category: "B2C Products",
    subtitle: "Игровой анализатор для детей 8-14",
    description: "Безопасные индикаторы (pH, хлор). Геймификация (NFT-бейджи). QR-коды для школ. Нет острых элементов.",
    longDescription: "AquaCell Mini — образовательный анализатор для детей. Безопасные тесты, яркая геймификация, NFT-бейджи за достижения. Интеграция со школьными программами по экологии.",
    price: "$79",
    status: "production",
    progress: 90,
    icon: Baby,
    color: "from-pink-400 to-rose-500",
    specs: [
      { label: "Параметры", value: "pH, хлор (безопасные)" },
      { label: "Точность", value: "±15%" },
      { label: "Картридж", value: "20 тестов" },
      { label: "Связь", value: "BLE (только приложение)" },
      { label: "Батарея", value: "12 мес" },
      { label: "Вес", value: "45 г" },
    ],
    features: [
      { title: "Безопасность", description: "Нет химических реагентов" },
      { title: "NFT-бейджи", description: "Юный гидролог, Спаситель реки" },
      { title: "Школьная программа", description: "Интеграция с уроками" },
      { title: "Квесты", description: "Найди 5 источников в парке" },
    ],
    financials: {
      budget: "$100K",
      irr: "25%",
      roi: "40%",
      paybackPeriod: "N/A (образование)",
      coqs: "$35",
      tokenReward: "Образовательные токены",
    },
    milestones: [
      { title: "Разработка", date: "Q1 2025", status: "completed" },
      { title: "Тесты в школах", date: "Q3 2025", status: "completed" },
      { title: "Массовые продажи", date: "Q4 2025", status: "in_progress" },
    ],
    region: "Global",
    esgScore: 95,
    emissionRate: "N/A",
    likes: 523,
    comments: 89,
    investors: 42,
  },

  // --- AQUAPURE KIT ---
  {
    id: "aquapure-kit",
    title: "AquaPure Kit",
    category: "B2C Products",
    subtitle: "Модульная очистка воды в поле",
    description: "Титановый фляжка 600мл. Модули: механика, уголь, ионообмен, ОСМОС, УФ. Конфигуратор по результатам AquaCell.",
    longDescription: "AquaPure Kit — модульная система очистки воды для походов, путешествий и экстремальных условий. Конфигурируется по результатам анализа AquaCell. Компактная (180г), универсальная.",
    price: "$59 - $149",
    status: "production",
    progress: 88,
    icon: Droplets,
    color: "from-blue-500 to-cyan-600",
    specs: [
      { label: "Объём", value: "600 мл" },
      { label: "Модули", value: "5 типов" },
      { label: "Вес", value: "180 г" },
      { label: "Ресурс", value: "1000-5000 л" },
      { label: "Материал", value: "Титан + BPA-free" },
    ],
    features: [
      { title: "Модульность", description: "Только нужные фильтры" },
      { title: "Механика 0.1 мкм", description: "Базовая очистка (всегда)" },
      { title: "Уголь", description: "Хлор, органика ($12, 500л)" },
      { title: "ОСМОС", description: "Морская вода ($45, 100л)" },
      { title: "УФ-LED", description: "Вирусы, бактерии ($35)" },
    ],
    financials: {
      budget: "$120K",
      irr: "30%",
      roi: "45%",
      paybackPeriod: "5-7 походов",
      coqs: "$25-$80",
      tokenReward: "5% кэшбэк в токенах",
    },
    region: "Global",
    esgScore: 87,
    likes: 389,
    comments: 67,
    investors: 28,
  },

  // --- AQUAHOME TAP ---
  {
    id: "aquahome-tap",
    title: "AquaHome Tap",
    category: "B2C Products",
    subtitle: "Умный фильтр под мойку",
    description: "TDS, давление, расходомер. NFC-картриджи (авто-учет). Блокировка при пробое фильтра. LED-индикатор на кран.",
    longDescription: "AquaHome Tap — умная система фильтрации с автоматическим мониторингом. NFC-картриджи учитывают каждый литр. Блокировка крана при пробое фильтра. Пассивный доход за передачу данных.",
    price: "$299",
    status: "production",
    progress: 92,
    icon: Home,
    color: "from-emerald-500 to-teal-600",
    specs: [
      { label: "Фильтрация", value: "5 ступеней" },
      { label: "Сенсоры", value: "TDS, давление, расход" },
      { label: "Ресурс картриджа", value: "6 мес / 6000 л" },
      { label: "Связь", value: "WiFi + BLE" },
      { label: "Индикатор", value: "LED на кран" },
    ],
    features: [
      { title: "NFC-картриджи", description: "Авто-учёт расхода" },
      { title: "Авто-заказ", description: "Заказ при 80% износа" },
      { title: "Аварийная блокировка", description: "Защита при пробое" },
      { title: "Пассивный доход", description: "$0.10/день за данные TDS" },
    ],
    financials: {
      budget: "$280K",
      irr: "28%",
      roi: "42%",
      paybackPeriod: "24 мес (экономия)",
      coqs: "$120",
      tokenReward: "$30/мес пассивно",
    },
    region: "Global",
    esgScore: 86,
    emissionRate: "3 VOD/день",
    likes: 356,
    comments: 61,
    investors: 26,
  },

  // --- AQUAHOME PRO ---
  {
    id: "aquahome-pro",
    title: "AquaHome Pro",
    category: "B2C Products",
    subtitle: "Система долговременного мониторинга",
    description: "TimeCapsule: автосэмплер (12 проб/3 мес). Guardian: Real-time TDS/ORP/UV. Электромагнитный клапан. LoRaWAN backup.",
    longDescription: "AquaHome Pro — премиальная система с автосэмплером TimeCapsule и защитой Guardian. Автоматически берёт пробу раз в неделю, хранит 3 месяца. Мгновенная блокировка при аномалиях.",
    price: "$599",
    status: "testing",
    progress: 78,
    icon: Clock,
    color: "from-indigo-500 to-purple-600",
    specs: [
      { label: "Сэмплер", value: "12 проб / 3 мес" },
      { label: "Сенсоры", value: "TDS, ORP, UV-254, t°" },
      { label: "Клапан", value: "Электромагнитный" },
      { label: "Связь", value: "WiFi + LoRaWAN" },
      { label: "Реакция", value: "<1 сек" },
    ],
    features: [
      { title: "TimeCapsule", description: "Автосэмплер с консервацией" },
      { title: "Guardian", description: "Real-time защита на выходе" },
      { title: "Лабораторный анализ", description: "$5/анализ раз в 3 мес" },
      { title: "Двойной доход", description: "$0.50/день + $5/анализ" },
    ],
    financials: {
      budget: "$350K",
      irr: "40%",
      roi: "55%",
      paybackPeriod: "18-20 мес",
      coqs: "$280",
      tokenReward: "$50/мес пассивно",
    },
    milestones: [
      { title: "Прототип сэмплера", date: "Q2 2025", status: "completed" },
      { title: "Тесты Guardian", date: "Q4 2025", status: "completed" },
      { title: "Запуск", date: "Q2 2026", status: "pending" },
    ],
    region: "Global",
    esgScore: 89,
    emissionRate: "15 VOD/день",
    likes: 278,
    comments: 47,
    investors: 20,
  },

  // --- AQUAHOME SHOWER ---
  {
    id: "aquahome-shower",
    title: "AquaHome Shower",
    category: "B2C Products",
    subtitle: "Система для душа: обезжелезивание + смягчение",
    description: "Солевой умягчитель (авто-регенерация). Ферротон (железо). УФ-C LED (легионелла). Сенсор жесткости.",
    longDescription: "AquaHome Shower — система для очистки воды душа. Удаляет железо, умягчает, уничтожает легионеллу. Сенсор жесткости на выходе. Данные о региональной жесткости продаются муниципалитетам.",
    price: "$499",
    status: "production",
    progress: 85,
    icon: HeartPulse,
    color: "from-rose-400 to-pink-500",
    specs: [
      { label: "Умягчение", value: "Солевая регенерация" },
      { label: "Обезжелезивание", value: "Ферротон (до 5 мг/л)" },
      { label: "Стерилизация", value: "УФ-C LED" },
      { label: "Сенсор", value: "Жесткость на выходе" },
      { label: "Расход соли", value: "1 мешок/мес" },
    ],
    features: [
      { title: "Авто-регенерация", description: "По расходу, не по времени" },
      { title: "Защита от легионеллы", description: "УФ-C 254 нм" },
      { title: "Для кожи и волос", description: "Мягкая вода = красота" },
      { title: "Данные", description: "$0.05/день за мониторинг" },
    ],
    financials: {
      budget: "$250K",
      irr: "26%",
      roi: "38%",
      paybackPeriod: "30 мес (здоровье)",
      coqs: "$220",
      tokenReward: "$15/мес пассивно",
    },
    region: "Global",
    esgScore: 84,
    emissionRate: "1.5 VOD/день",
    likes: 312,
    comments: 54,
    investors: 23,
  },

  // ==========================================================================
  // B2B ПРОДУКТЫ (4 продукта)
  // ==========================================================================

  // --- AQUAFARM STATION ---
  {
    id: "aquafarm-station",
    title: "AquaFarm Station",
    category: "B2B Products",
    subtitle: "Мониторинг агро-орошения",
    description: "Нитраты/фосфаты в дренажных водах. Погодная станция. API для систем полива. Комплаенс отчетность.",
    longDescription: "AquaFarm Station — система мониторинга для агрохолдингов. Контроль нитратов и фосфатов в дренажных водах, интеграция с системами полива, автоматическая отчётность для экологов.",
    price: "$2,999 + $200/мес",
    status: "production",
    progress: 88,
    icon: Leaf,
    color: "from-green-600 to-emerald-700",
    specs: [
      { label: "Параметры", value: "NO₃, PO₄, pH, EC" },
      { label: "Погода", value: "t°, влажность, осадки" },
      { label: "API", value: "Интеграция с поливом" },
      { label: "Отчётность", value: "EcoStandards" },
      { label: "Связь", value: "4G + LoRaWAN" },
    ],
    features: [
      { title: "Комплаенс", description: "Авто-отчёты для регуляторов" },
      { title: "Зелёные кредиты", description: "Продажа избытка нитратов" },
      { title: "Экономия воды", description: "До 30% через оптимизацию" },
      { title: "Штрафы", description: "Токеновые санкции за превышение" },
    ],
    financials: {
      budget: "$450K",
      irr: "32%",
      roi: "48%",
      paybackPeriod: "6 мес",
      coqs: "$1,200",
      tokenReward: "$500/мес",
    },
    region: "Global",
    esgScore: 91,
    emissionRate: "150 VOD/день",
    likes: 189,
    comments: 34,
    investors: 15,
  },

  // --- AQUAPOOL PRO ---
  {
    id: "aquapool-pro",
    title: "AquaPool Pro",
    category: "B2B Products",
    subtitle: "Коммерческие бассейны: хлор/pH/ORP real-time",
    description: "Хлор/pH/ORP real-time. Автодозаторы. Легионелла early warning. Отчеты для Роспотребнадзора.",
    longDescription: "AquaPool Pro — система мониторинга для отелей, фитнес-центров, аквапарков. Real-time контроль хлора, pH, ORP. Автоматические отчёты для контролирующих органов.",
    price: "$899 + $50/мес",
    status: "production",
    progress: 90,
    icon: Waves,
    color: "from-cyan-600 to-blue-700",
    specs: [
      { label: "Параметры", value: "Cl, pH, ORP, t°" },
      { label: "Автодозаторы", value: "Интеграция" },
      { label: "Легионелла", value: "Early warning" },
      { label: "Отчёты", value: "Роспотребнадзор" },
      { label: "Связь", value: "WiFi + Ethernet" },
    ],
    features: [
      { title: "Страховой полис", description: "Данные = страховка" },
      { title: "Parametric insurance", description: "Авто-выплата при обнаружении" },
      { title: "Экономия химии", description: "До 25% через оптимизацию" },
      { title: "Репутация", description: "Публичный сертификат качества" },
    ],
    financials: {
      budget: "$200K",
      irr: "28%",
      roi: "40%",
      paybackPeriod: "12 мес",
      coqs: "$380",
      tokenReward: "$100/мес",
    },
    region: "Global",
    esgScore: 87,
    emissionRate: "30 VOD/день",
    likes: 156,
    comments: 27,
    investors: 11,
  },

  // --- AQUAINDUSTRIAL ---
  {
    id: "aquaindustrial",
    title: "AquaIndustrial",
    category: "B2B Products",
    subtitle: "Промышленные стоки: входной/выходной контроль",
    description: "COD, BOD, тяжёлые металлы. Непрерывный мониторинг 24/7. Юридически значимые отчеты. Интеграция с MES/ERP.",
    longDescription: "AquaIndustrial — система для заводов и очистных сооружений. Непрерывный мониторинг входных и выходных стоков. Юридически значимые отчёты для регуляторов.",
    price: "От $5,000 + $500/мес",
    status: "testing",
    progress: 75,
    icon: Factory,
    color: "from-slate-600 to-gray-700",
    specs: [
      { label: "Параметры", value: "COD, BOD, металлы" },
      { label: "Частота", value: "24/7 непрерывно" },
      { label: "Отчёты", value: "Юридически значимые" },
      { label: "Интеграция", value: "MES/ERP" },
      { label: "Связь", value: "Ethernet + 4G" },
    ],
    features: [
      { title: "Carbon Credits", description: "Токенизация квот" },
      { title: "Авто-налоги", description: "Расчёт эко-налогов" },
      { title: "Комплаенс", description: "Защита от штрафов" },
      { title: "Оптимизация", description: "Снижение издержек" },
    ],
    financials: {
      budget: "$600K",
      irr: "35%",
      roi: "52%",
      paybackPeriod: "По контракту",
      coqs: "$2,000",
      tokenReward: "По договору",
    },
    region: "Global",
    esgScore: 88,
    emissionRate: "200 VOD/день",
    likes: 134,
    comments: 22,
    investors: 9,
  },

  // --- AQUA LAB VALIDATOR ---
  {
    id: "aqualab-validator",
    title: "AquaLab Validator",
    category: "B2B Products",
    subtitle: "Верификация полевых данных (cross-check)",
    description: "Лабораторная верификация данных с полевых устройств. Cross-check для блокчейна. % от транзакции.",
    longDescription: "AquaLab Validator — сервис верификации для лабораторий-партнёров. Перекрёстная проверка данных с AquaCell, подтверждение аномалий, арбитраж спорных проб.",
    price: "% от транзакции",
    status: "development",
    progress: 60,
    icon: TestTube,
    color: "from-violet-600 to-purple-700",
    specs: [
      { label: "Верификация", value: "Cross-check" },
      { label: "Арбитраж", value: "Спорные пробы" },
      { label: "Калибровка", value: "Эталонные образцы" },
      { label: "DOI", value: "Публикации данных" },
    ],
    features: [
      { title: "Validator Node", description: "Статус валидатора" },
      { title: "$20/верификация", description: "Дополнительный доход" },
      { title: "Научные публикации", description: "Данные с DOI" },
      { title: "Репутация", description: "Рейтинг лаборатории" },
    ],
    financials: {
      budget: "$180K",
      irr: "50%",
      roi: "75%",
      paybackPeriod: "4 мес",
      tokenReward: "25 VOD/верификация",
    },
    region: "Global",
    esgScore: 93,
    likes: 98,
    comments: 16,
    investors: 7,
  },

  // ==========================================================================
  // B2G ПРОДУКТЫ (2 продукта)
  // ==========================================================================

  // --- AQUANODE BUOY ---
  {
    id: "aquanode-buoy",
    title: "AquaNode Buoy",
    category: "B2G Products",
    subtitle: "Стационарные буи в реках/озёрах",
    description: "Солнечная панель + батарея. Мультисенсорный зонд (до 10м). Спутниковая связь. Акустический модем.",
    longDescription: "AquaNode Buoy — стационарный буй для мониторинга водоёмов. Солнечное питание, спутниковая связь, мультисенсорный зонд. Грантовая модель для государств.",
    price: "$5,000 (грант 100%)",
    status: "production",
    progress: 82,
    icon: Anchor,
    color: "from-blue-700 to-indigo-800",
    specs: [
      { label: "Глубина", value: "До 10 м" },
      { label: "Питание", value: "Солнце + батарея" },
      { label: "Связь", value: "Спутник + акустика" },
      { label: "Сенсоры", value: "10 параметров" },
      { label: "Срок службы", value: "5 лет" },
    ],
    features: [
      { title: "Грантовая модель", description: "100% покрытие стоимости" },
      { title: "OpenData", description: "Продажа в открытый доступ" },
      { title: "Обслуживание", description: "$100/мес токенами" },
      { title: "Базовая сеть", description: "Фундамент экосистемы" },
    ],
    financials: {
      budget: "$800K",
      irr: "25%",
      roi: "35%",
      paybackPeriod: "6 мес (грант)",
      coqs: "$2,500",
      tokenReward: "$800/мес",
    },
    region: "Global",
    esgScore: 94,
    emissionRate: "250 VOD/день",
    likes: 167,
    comments: 29,
    investors: 11,
  },

  // --- AQUADRONE ---
  {
    id: "aquadrone",
    title: "AquaDrone",
    category: "B2G Products",
    subtitle: "Автономный катамаран для удалённых водоёмов",
    description: "Беспилотный (4-6 часов). Взятие проб в труднодоступных зонах. Доставка картриджей. Аварийный поиск.",
    longDescription: "AquaDrone — автономный катамаран для мониторинга труднодоступных водоёмов. Забор проб с поверхности, аэрофотосъёмка, доставка картриджей между буями.",
    price: "$15,000 (DAO-финансирование)",
    status: "testing",
    progress: 68,
    icon: Satellite,
    color: "from-sky-600 to-blue-700",
    specs: [
      { label: "Автономность", value: "4-6 часов" },
      { label: "Дальность", value: "5 км" },
      { label: "Полезная нагрузка", value: "2 кг" },
      { label: "Связь", value: "4G + спутник" },
      { label: "Камера", value: "4K + тепловизор" },
    ],
    features: [
      { title: "Mission Rewards", description: "Токены за миссии DAO" },
      { title: "Data Harvesting", description: "Премиум данные" },
      { title: "Аварийный поиск", description: "Поиск загрязнений" },
      { title: "Контракты", description: "Мониторинг по заказу" },
    ],
    financials: {
      budget: "$1.2M",
      irr: "30%",
      roi: "45%",
      paybackPeriod: "18 мес",
      coqs: "$7,000",
      tokenReward: "По миссиям",
    },
    milestones: [
      { title: "Прототип", date: "Q2 2025", status: "completed" },
      { title: "Полевые тесты", date: "Q4 2025", status: "completed" },
      { title: "Сертификация", date: "Q3 2026", status: "pending" },
    ],
    region: "Global",
    esgScore: 90,
    emissionRate: "500 VOD/миссия",
    likes: 234,
    comments: 41,
    investors: 17,
  },

  // ==========================================================================
  // PLATFORM ПРОДУКТЫ (6 продуктов)
  // ==========================================================================

  // --- PROOF-OF-WATER ---
  {
    id: "proof-of-water",
    title: "Proof-of-Water",
    category: "Platform",
    subtitle: "Консенсус качества данных",
    description: "Криптографическая подпись проб. GPS-валидация. Консенсус 2-of-3. Burn механизм для фейковых данных.",
    longDescription: "Proof-of-Water — протокол консенсуса для верификации водных данных. Криптографическая подпись, GPS-валидация, консенсус соседних устройств. Слэшинг за ложные данные.",
    price: "Протокол",
    status: "production",
    progress: 90,
    icon: Lock,
    color: "from-emerald-600 to-green-700",
    specs: [
      { label: "Консенсус", value: "2-of-3" },
      { label: "Подпись", value: "ECDSA secp256k1" },
      { label: "GPS", value: "±0.5 м" },
      { label: "Слэшинг", value: "$5 за фейк" },
      { label: "Награда", value: "10% от данных" },
    ],
    features: [
      { title: "Стейкинг", description: "Валидаторы: 100k+ VOD" },
      { title: "Слэшинг", description: "Штраф за ложные данные" },
      { title: "Оракулы", description: "Внешние данные" },
      { title: "Аудит", description: "Публичная верификация" },
    ],
    financials: {
      budget: "$400K",
      irr: "45%",
      roi: "70%",
      tokenReward: "10% от комиссии",
    },
    region: "Global",
    esgScore: 96,
    likes: 289,
    comments: 52,
    investors: 21,
  },

  // --- AQUADEX ---
  {
    id: "aquadex",
    title: "AquaDEX",
    category: "Platform",
    subtitle: "Биржа данных о воде",
    description: "Торговля датасетами (B2B). Фьючерсы на качество воды. NFT на уникальные локации. Комиссия 2.5%.",
    longDescription: "AquaDEX — децентрализованная биржа данных о воде. Покупка и продажа датасетов, фьючерсы на качество, NFT на эксклюзивные локации.",
    price: "Комиссия 2.5%",
    status: "development",
    progress: 65,
    icon: LineChart,
    color: "from-cyan-500 to-blue-600",
    specs: [
      { label: "Комиссия", value: "2.5%" },
      { label: "Листинг", value: "Плата в токенах" },
      { label: "Фьючерсы", value: "Предиктивные рынки" },
      { label: "NFT", value: "Уникальные локации" },
      { label: "Ликвидность", value: "Farming токенов" },
    ],
    features: [
      { title: "Датасеты", description: "B2B торговля" },
      { title: "Фьючерсы", description: "Прогноз качества" },
      { title: "NFT локации", description: "Право на сбор" },
      { title: "Farming", description: "Доход за ликвидность" },
    ],
    financials: {
      budget: "$600K",
      irr: "50%",
      roi: "80%",
      tokenReward: "2.5% с транзакции",
    },
    region: "Global",
    esgScore: 92,
    likes: 267,
    comments: 48,
    investors: 19,
  },

  // --- ORACLE NETWORK ---
  {
    id: "oracle-network",
    title: "LoopOrb Oracle Network",
    category: "Platform",
    subtitle: "Верификация внешних данных",
    description: "Подключение к лабораториям (LIMS). Погодные API. Спутниковые снимки. Мосты к другим DePIN сетям.",
    longDescription: "Oracle Network — мост между блокчейном и внешними данными. Интеграция с лабораториями, погодными сервисами, спутниками.",
    price: "Оплата за запрос",
    status: "testing",
    progress: 72,
    icon: Server,
    color: "from-purple-600 to-violet-700",
    specs: [
      { label: "LIMS", value: "Интеграция" },
      { label: "Погода", value: "OpenWeather, AccuWeather" },
      { label: "Спутники", value: "Sentinel-2, Landsat" },
      { label: "DePIN", value: "Helium, Hivemapper" },
    ],
    features: [
      { title: "Оракулы", description: "% за верификацию" },
      { title: "Challenge", description: "Оспаривание с залогом" },
      { title: "Мосты", description: "Кросс-чейн данные" },
    ],
    financials: {
      budget: "$350K",
      irr: "40%",
      roi: "60%",
      tokenReward: "По запросу",
    },
    region: "Global",
    esgScore: 91,
    likes: 178,
    comments: 31,
    investors: 14,
  },

  // --- AQUAEDU ---
  {
    id: "aquaedu",
    title: "AquaEdu Platform",
    category: "Platform",
    subtitle: "Образование и сертификация",
    description: "Курсы гидрологии. Сертификация Гражданский инспектор. Школьные программы. AR-визуализация.",
    longDescription: "AquaEdu — образовательная платформа LoopOrb. Курсы для всех возрастов, сертификация гражданских инспекторов, интеграция со школами.",
    price: "Оплата в токенах",
    status: "production",
    progress: 85,
    icon: GraduationCap,
    color: "from-amber-500 to-orange-600",
    specs: [
      { label: "Курсов", value: "50+" },
      { label: "Языков", value: "20" },
      { label: "Сертификация", value: "DeSci" },
      { label: "AR", value: "Визуализация" },
    ],
    features: [
      { title: "VOD Junior", description: "10-16 лет, игра" },
      { title: "VOD Pro", description: "Студенты, операторы" },
      { title: "VOD Developer", description: "Программисты" },
      { title: "Гранты", description: "Токены студентам" },
    ],
    financials: {
      budget: "$150K",
      irr: "25%",
      roi: "35%",
      tokenReward: "За обучение",
    },
    region: "Global",
    esgScore: 97,
    emissionRate: "5 VOD/курс",
    likes: 423,
    comments: 71,
    investors: 35,
  },

  // --- AQUASDK ---
  {
    id: "aquasdk",
    title: "AquaSDK",
    category: "Platform",
    subtitle: "API для разработчиков",
    description: "API для умных домов. Виджеты для мэппингов. Webhook'и для событий. Мобильные SDK.",
    longDescription: "AquaSDK — набор инструментов для разработчиков. Интеграция данных LoopOrb в умные дома, приложения, карты.",
    price: "Freemium: $99/мес Pro",
    status: "production",
    progress: 80,
    icon: Cpu,
    color: "from-slate-500 to-gray-600",
    specs: [
      { label: "API", value: "REST/GraphQL" },
      { label: "SDK", value: "Python/C++/JS" },
      { label: "Webhook", value: "Критические события" },
      { label: "Freemium", value: "Базовый бесплатно" },
    ],
    features: [
      { title: "Умный дом", description: "Интеграция" },
      { title: "Виджеты", description: "Карты качества" },
      { title: "Usage", description: "Плата за calls" },
    ],
    financials: {
      budget: "$200K",
      irr: "35%",
      roi: "50%",
      tokenReward: "$99/мес Pro",
    },
    region: "Global",
    esgScore: 89,
    likes: 156,
    comments: 27,
    investors: 11,
  },

  // --- AQUAVAULT ---
  {
    id: "aquavault",
    title: "AquaVault",
    category: "Platform",
    subtitle: "Децентрализованное хранилище",
    description: "IPFS для сырых данных. Шифрование приватных проб. Временные капсулы. Бэкап для институтов.",
    longDescription: "AquaVault — децентрализованное хранилище водных данных. IPFS для raw data, шифрование, временные капсулы для научных работ.",
    price: "Плата в токенах за GB/год",
    status: "development",
    progress: 58,
    icon: Database,
    color: "from-indigo-600 to-purple-700",
    specs: [
      { label: "Storage", value: "IPFS" },
      { label: "Шифрование", value: "AES-256" },
      { label: "Капсулы", value: "N лет" },
      { label: "Бэкап", value: "Для институтов" },
    ],
    features: [
      { title: "Хранение", description: "GB/год в токенах" },
      { title: "Ретривал", description: "Оплата за доступ" },
      { title: "Капсулы", description: "Отложенный доступ" },
    ],
    financials: {
      budget: "$280K",
      irr: "30%",
      roi: "45%",
      tokenReward: "По объёму",
    },
    region: "Global",
    esgScore: 90,
    likes: 134,
    comments: 22,
    investors: 9,
  },

  // ==========================================================================
  // INFRASTRUCTURE PROJECTS (PPP станции)
  // ==========================================================================
  {
    id: "ppp-jizzakh-2",
    title: "Pumping Station No. 2 (Jizzakh)",
    category: "Infrastructure",
    subtitle: "Модернизация насосной станции, Узбекистан",
    description: "PPP проект модернизации насосной станции в Джизакской области. Мощность 40,000 м³/день, IRR 17%.",
    longDescription: "Насосная станция №2 в Джизакской области — часть национальной системы управления водными ресурсами. Модернизация по программе Water Resources Development Concept 2020-2030.",
    price: "$7,760,600",
    status: "active",
    progress: 45,
    icon: Factory,
    color: "from-amber-600 to-orange-700",
    specs: [
      { label: "Регион", value: "Джизакская обл." },
      { label: "Мощность", value: "40,000 м³/день" },
      { label: "Срок PPP", value: "10 лет" },
      { label: "Модернизация", value: "Насосы, автоматика, IoT" },
    ],
    features: [
      { title: "Госгарантии", description: "Правительство" },
      { title: "Техпартнёры", description: "Culligan, Aqseptence" },
      { title: "Финансирование", description: "IFC, ADB, IsDB" },
    ],
    financials: {
      budget: "$7,760,600",
      irr: "17%",
      fundingAvailable: "$2,328,180",
      paybackPeriod: "8 лет",
    },
    milestones: [
      { title: "Подписание PPP", date: "Q1 2025", status: "completed" },
      { title: "Начало модернизации", date: "Q3 2025", status: "in_progress" },
      { title: "Ввод в эксплуатацию", date: "Q2 2026", status: "pending" },
    ],
    region: "Uzbekistan",
    esgScore: 84,
    emissionRate: "100 VOD/день",
    likes: 89,
    comments: 15,
    investors: 7,
  },
  {
    id: "ppp-korovulbozor",
    title: "Korovulbozor Pumping Station",
    category: "Infrastructure",
    subtitle: "Насосная станция, Бухарская область",
    description: "PPP проект модернизации станции в Бухарской области. Мощность 50,000 м³/день, IRR 15%.",
    longDescription: "Насосная станция Korovulbozor обслуживает Бухарскую область. Модернизация включает замену насосов, установку IoT-сенсоров, автоматизацию.",
    price: "$6,189,700",
    status: "active",
    progress: 38,
    icon: Building,
    color: "from-orange-600 to-red-700",
    specs: [
      { label: "Регион", value: "Бухарская обл." },
      { label: "Мощность", value: "50,000 м³/день" },
      { label: "Срок PPP", value: "10 лет" },
      { label: "IRR", value: "15%" },
    ],
    features: [
      { title: "Автоматизация", description: "SCADA + IoT сенсоры" },
      { title: "Энергоэффективность", description: "Частотные преобразователи" },
      { title: "Дистанционный мониторинг", description: "Real-time данные" },
    ],
    financials: {
      budget: "$6,189,700",
      irr: "15%",
      fundingAvailable: "$1,856,910",
      paybackPeriod: "9 лет",
    },
    region: "Uzbekistan",
    esgScore: 82,
    emissionRate: "90 VOD/день",
    likes: 76,
    comments: 12,
    investors: 6,
  },
  {
    id: "ppp-kuyumazar-aux",
    title: "Kuyumazar Auxiliary Station",
    category: "Infrastructure",
    subtitle: "Вспомогательная станция, Бухара",
    description: "Крупнейший PPP проект сети. Мощность 75,000 м³/день, IRR 22% — максимальная доходность.",
    longDescription: "Вспомогательная насосная станция Kuyumazar — ключевой узел водораспределения в Бухарской области. Highest IRR в портфеле.",
    price: "$11,965,400",
    status: "active",
    progress: 52,
    icon: Landmark,
    color: "from-red-600 to-rose-800",
    specs: [
      { label: "Регион", value: "Бухарская обл." },
      { label: "Мощность", value: "75,000 м³/день" },
      { label: "Срок PPP", value: "10 лет" },
      { label: "IRR", value: "22%" },
    ],
    features: [
      { title: "Максимальная доходность", description: "22% IRR" },
      { title: "Стратегическое значение", description: "Ключевой узел сети" },
      { title: "Полная автоматизация", description: "Industry 4.0" },
    ],
    financials: {
      budget: "$11,965,400",
      irr: "22%",
      fundingAvailable: "$3,589,620",
      paybackPeriod: "7 лет",
    },
    region: "Uzbekistan",
    esgScore: 85,
    emissionRate: "150 VOD/день",
    likes: 112,
    comments: 19,
    investors: 9,
  },
  {
    id: "ppp-kuyumazar",
    title: "Kuyumazar Main Station",
    category: "Infrastructure",
    subtitle: "Основная станция, Бухара",
    description: "Основная насосная станция Kuyumazar. Мощность 55,000 м³/день, IRR 17%.",
    longDescription: "Основная станция Kuyumazar работает в паре с вспомогательной. Совместная мощность 130,000 м³/день.",
    price: "$7,760,600",
    status: "active",
    progress: 48,
    icon: Factory,
    color: "from-amber-700 to-red-800",
    features: [],
    specs: [
      { label: "Регион", value: "Бухарская обл." },
      { label: "Мощность", value: "55,000 м³/день" },
      { label: "Срок PPP", value: "10 лет" },
      { label: "IRR", value: "17%" },
    ],
    financials: {
      budget: "$7,760,600",
      irr: "17%",
      fundingAvailable: "$2,328,180",
      paybackPeriod: "8 лет",
    },
    region: "Uzbekistan",
    esgScore: 83,
    emissionRate: "110 VOD/день",
    likes: 84,
    comments: 14,
    investors: 7,
  },
  {
    id: "ppp-amu-bukhara-1",
    title: "Amu-Bukhara-1 Station",
    category: "Infrastructure",
    subtitle: "Магистральная станция от Амударьи",
    description: "Станция подачи воды от Амударьи. Мощность 60,000 м³/день, IRR 20%.",
    longDescription: "Amu-Bukhara-1 забирает воду из Амударьи для снабжения Бухарской области. Критически важный объект инфраструктуры.",
    price: "$9,490,100",
    status: "active",
    progress: 41,
    icon: Waves,
    color: "from-blue-700 to-cyan-800",
    features: [],
    specs: [
      { label: "Источник", value: "Амударья" },
      { label: "Мощность", value: "60,000 м³/день" },
      { label: "Срок PPP", value: "10 лет" },
      { label: "IRR", value: "20%" },
    ],
    financials: {
      budget: "$9,490,100",
      irr: "20%",
      fundingAvailable: "$2,837,030",
      paybackPeriod: "7.5 лет",
    },
    region: "Uzbekistan",
    esgScore: 86,
    emissionRate: "120 VOD/день",
    likes: 95,
    comments: 16,
    investors: 8,
  },

  // ==========================================================================
  // COMMUNITY SOLUTIONS
  // ==========================================================================
  {
    id: "rural-water-access",
    title: "Rural Water Access",
    category: "Community Solutions",
    subtitle: "Доступ к воде в сельских районах",
    description: "Недорогие решения для обеспечения чистой питьевой водой в удалённых сельских районах. Стоимость <$50 на систему.",
    longDescription: "Проект направлен на обеспечение базового доступа к чистой воде в сельской местности развивающихся стран. Простые технологии, местные материалы, обучение сообществ.",
    price: "Donation $50",
    status: "production",
    progress: 95,
    icon: Heart,
    color: "from-amber-600 to-yellow-700",
    specs: [
      { label: "Стоимость", value: "<$50" },
      { label: "Срок службы", value: "5 лет" },
      { label: "Обслуживание", value: "Местное" },
      { label: "Охват", value: "100+ человек" },
    ],
    features: [
      { title: "Био-песчаные фильтры", description: "Местные материалы" },
      { title: "Сбор дождевой воды", description: "Простые системы" },
      { title: "Обучение", description: "Техническое обслуживание сообществом" },
    ],
    financials: {
      budget: "$300K",
      irr: "10%",
      roi: "Social impact",
      paybackPeriod: "N/A",
    },
    region: "Global",
    esgScore: 99,
    emissionRate: "20 VOD/установка",
    likes: 567,
    comments: 89,
    investors: 42,
  },
  {
    id: "education-programs",
    title: "Educational Programs",
    category: "Community Solutions",
    subtitle: "Образовательные инициативы",
    description: "Курсы по водной экологии для школ, университетов и местных сообществ. 50+ курсов, 20 языков.",
    longDescription: "Программы обучения экологической грамотности, бережному использованию воды, основам мониторинга качества. Для всех возрастов.",
    price: "Free",
    status: "active",
    progress: 88,
    icon: GraduationCap,
    color: "from-purple-600 to-violet-700",
    specs: [
      { label: "Курсов", value: "50+" },
      { label: "Учащихся", value: "10,000+" },
      { label: "Языков", value: "20" },
      { label: "Сертификация", value: "DeSci" },
    ],
    features: [
      { title: "VOD Junior", description: "10-16 лет, игровая форма" },
      { title: "VOD Pro", description: "Студенты, операторы" },
      { title: "VOD Developer", description: "Программисты" },
    ],
    financials: {
      budget: "$150K",
      irr: "10%",
      roi: "Social impact",
      paybackPeriod: "N/A",
    },
    region: "Global",
    esgScore: 97,
    emissionRate: "5 VOD/курс",
    likes: 423,
    comments: 71,
    investors: 35,
  },
  {
    id: "emergency-response",
    title: "Emergency Response Systems",
    category: "Community Solutions",
    subtitle: "Системы реагирования на ЧС",
    description: "Быстро разворачиваемые системы очистки воды при стихийных бедствиях. Развёртывание за 24 часа.",
    longDescription: "Мобильные очистные установки для экстренной помощи при наводнениях, землетрясениях, загрязнении. 10,000 л/день.",
    price: "NGO/Government",
    status: "testing",
    progress: 72,
    icon: Shield,
    color: "from-red-600 to-orange-700",
    specs: [
      { label: "Развёртывание", value: "24 часа" },
      { label: "Производительность", value: "10,000 л/день" },
      { label: "Портативность", value: "3 чемодана" },
      { label: "Энергия", value: "Солнечная" },
    ],
    features: [
      { title: "Мобильность", description: "Авиадоставка" },
      { title: "Автономность", description: "Солнечные панели + аккумулятор" },
      { title: "Мульти-загрязнения", description: "Любые типы загрязнения" },
    ],
    financials: {
      budget: "$350K",
      irr: "15%",
      roi: "Social impact",
      paybackPeriod: "N/A",
    },
    region: "Global",
    esgScore: 98,
    emissionRate: "Бонус за спасение",
    likes: 334,
    comments: 56,
    investors: 26,
  },

  // ==========================================================================
  // R&D PROJECTS
  // ==========================================================================
  {
    id: "flood-warning",
    title: "Flood Early Warning System",
    category: "R&D",
    subtitle: "Предсказание наводнений за 72 часа",
    description: "Интеграция метеоданных, уровней рек, AI-прогнозирование. Автоматические алерты населению.",
    longDescription: "Система раннего предупреждения о наводнениях использует датчики уровня воды, осадков, почвенной влажности и AI-модели для прогнозирования за 72 часа.",
    price: "Government",
    status: "testing",
    progress: 64,
    icon: Radio,
    color: "from-blue-600 to-indigo-700",
    specs: [
      { label: "Горизонт прогноза", value: "72 часа" },
      { label: "Точность", value: ">80%" },
      { label: "Датчики", value: "Уровень, осадки, влажность" },
      { label: "Алерты", value: "SMS, Push, Email" },
    ],
    features: [
      { title: "Радарные датчики", description: "Бесконтактное измерение уровня" },
      { title: "AI модель", description: "Прогнозирование паводков" },
      { title: "Интеграция", description: "МЧС, гидрометцентры" },
    ],
    financials: {
      budget: "$700K",
      irr: "19%",
      roi: "35%",
      paybackPeriod: "5 лет",
    },
    region: "Global",
    esgScore: 93,
    emissionRate: "Бонус за предупреждение",
    likes: 187,
    comments: 32,
    investors: 13,
  },
  {
    id: "esg-reporting",
    title: "ESG Reporting Tool",
    category: "R&D",
    subtitle: "Автоматические ESG-отчёты",
    description: "Генерация отчётов по стандартам GRI, SASB, TCFD. Интеграция с данными сенсоров.",
    longDescription: "Автоматическая генерация ESG отчётов для компаний и правительств. Соответствие международным стандартам, верификация через блокчейн.",
    price: "$299-999/мес",
    status: "production",
    progress: 82,
    icon: Database,
    color: "from-emerald-600 to-green-700",
    specs: [
      { label: "Стандарты", value: "GRI, SASB, TCFD" },
      { label: "SDG", value: "Цель 6 (Чистая вода)" },
      { label: "Верификация", value: "Блокчейн" },
      { label: "Интеграция", value: "API сенсоров" },
    ],
    features: [
      { title: "Автоматизация", description: "Генерация отчёта за минуты" },
      { title: "Углеродный след", description: "Расчёт Scope 1,2,3" },
      { title: "Биоразнообразие", description: "Оценка влияния на экосистемы" },
    ],
    financials: {
      budget: "$250K",
      irr: "16%",
      roi: "30%",
      paybackPeriod: "18 месяцев",
    },
    region: "Global",
    esgScore: 94,
    emissionRate: "10 VOD/отчёт",
    likes: 156,
    comments: 27,
    investors: 11,
  },
  {
    id: "carbon-credits",
    title: "Carbon Credits Link",
    category: "R&D",
    subtitle: "Токенизация углеродных кредитов",
    description: "Связь водных проектов с углеродным рынком. 1 сохранённый м³ воды = X кредитов.",
    longDescription: "Проект токенизации углеродных кредитов от водных проектов. Интеграция с Verra, Gold Standard для продажи на углеродном рынке.",
    price: "Commission 5%",
    status: "planning",
    progress: 25,
    icon: Leaf,
    color: "from-green-700 to-emerald-800",
    specs: [
      { label: "Стандарты", value: "Verra, Gold Standard" },
      { label: "Блокчейн", value: "Polygon" },
      { label: "Комиссия", value: "5%" },
      { label: "Конверсия", value: "1 м³ = X кредитов" },
    ],
    features: [
      { title: "Верификация", description: "Автоматическая через сенсоры" },
      { title: "Токенизация", description: "NFT кредиты" },
      { title: "Рынок", description: "Продажа компаниям" },
    ],
    financials: {
      budget: "$450K",
      irr: "17%",
      roi: "32%",
      paybackPeriod: "3 года",
    },
    region: "Global",
    esgScore: 96,
    emissionRate: "По продаже",
    likes: 143,
    comments: 24,
    investors: 10,
  },
  {
    id: "global-water-map",
    title: "Global Water Map",
    category: "R&D",
    subtitle: "3D визуализация водных объектов",
    description: "Интерактивная 3D карта всех водных объектов с интеграцией 43+ сенсоров. Three.js + Deck.gl.",
    longDescription: "Глобальная 3D визуализация водных ресурсов с реальными данными сенсоров. Спутниковые снимки, слои качества, загрязнений.",
    price: "Free",
    status: "production",
    progress: 78,
    icon: Globe,
    color: "from-cyan-600 to-blue-700",
    specs: [
      { label: "Технологии", value: "Three.js, Deck.gl" },
      { label: "Сенсоры", value: "43+ онлайн" },
      { label: "Спутники", value: "Sentinel-2, Landsat" },
      { label: "Слои", value: "10+ типов" },
    ],
    features: [
      { title: "3D глобус", description: "Интерактивная визуализация" },
      { title: "Real-time данные", description: "Интеграция с сенсорами" },
      { title: "Исторические слои", description: "Изменения во времени" },
    ],
    financials: {
      budget: "$280K",
      irr: "14%",
      roi: "25%",
      paybackPeriod: "24 месяца",
    },
    region: "Global",
    esgScore: 90,
    emissionRate: "1 VOD/просмотр",
    likes: 278,
    comments: 47,
    investors: 20,
  },
];

// ============================================================================
// КАТЕГОРИИ И ФИЛЬТРЫ
// ============================================================================

const categories = [
  { id: "all", label: "Все", icon: Layers },
  { id: "B2C Products", label: "B2C (8)", icon: Users },
  { id: "B2B Products", label: "B2B (4)", icon: Building },
  { id: "B2G Products", label: "B2G (2)", icon: Landmark },
  { id: "Platform", label: "Platform (6)", icon: Cpu },
  { id: "Infrastructure", label: "Infrastructure", icon: Factory },
  { id: "Community Solutions", label: "Community", icon: Heart },
  { id: "R&D", label: "R&D", icon: FlaskConical },
];

const statusLabels: Record<string, { label: string; color: string; text: string }> = {
  production: { label: "В производстве", color: "bg-emerald-500", text: "text-emerald-400" },
  testing: { label: "Тестирование", color: "bg-amber-500", text: "text-amber-400" },
  development: { label: "Разработка", color: "bg-blue-500", text: "text-blue-400" },
  research: { label: "Исследования", color: "bg-purple-500", text: "text-purple-400" },
  concept: { label: "Концепт", color: "bg-slate-500", text: "text-slate-400" },
  active: { label: "Активен", color: "bg-cyan-500", text: "text-cyan-400" },
  planning: { label: "Планирование", color: "bg-gray-500", text: "text-gray-400" },
  beta: { label: "Бета", color: "bg-indigo-500", text: "text-indigo-400" },
};

const sortOptions = [
  { id: "popular", label: "Популярные", icon: Star },
  { id: "newest", label: "Новые", icon: Sparkles },
  { id: "irr", label: "По IRR", icon: Percent },
  { id: "budget", label: "По бюджету", icon: DollarSign },
  { id: "progress", label: "По прогрессу", icon: Target },
  { id: "payback", label: "По окупаемости", icon: Clock },
];

// ============================================================================
// КАРТОЧКА ПРОЕКТА
// ============================================================================

function ProjectCard({ project, index, onCompare, isComparing }: {
  project: Project;
  index: number;
  onCompare: (project: Project) => void;
  isComparing: boolean;
}) {
  const status = statusLabels[project.status] || { label: project.status, color: "bg-slate-500", text: "text-slate-400" };
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative"
    >
      <div className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.12)] hover:-translate-y-1">
        {/* Gradient Header */}
        <div className={`h-1.5 bg-gradient-to-r ${project.color}`} />

        <div className="p-5">
          {/* Header Row */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/50`}>
                <div className={`w-2 h-2 rounded-full ${status.color} animate-pulse`} />
                <span className={`text-xs font-medium ${status.text}`}>{status.label}</span>
              </div>
              {project.esgScore && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <Leaf className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">ESG {project.esgScore}</span>
                </div>
              )}
            </div>
          </div>

          {/* Title & Subtitle */}
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-cyan-400/90 mb-3 font-medium">{project.subtitle}</p>

          {/* Description */}
          <p className="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Price & Financial Badge */}
          <div className="mb-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Цена</span>
              <span className="text-sm font-bold text-white">{project.price}</span>
            </div>
            {project.financials && (
              <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="text-xs text-slate-500">IRR</div>
                    <div className="text-sm font-bold text-emerald-400">{project.financials.irr}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Бюджет</div>
                    <div className="text-sm font-bold text-cyan-400">{project.financials.budget}</div>
                  </div>
                  {project.financials.paybackPeriod && (
                    <div>
                      <div className="text-xs text-slate-500">Окупаемость</div>
                      <div className="text-sm font-bold text-amber-400">{project.financials.paybackPeriod}</div>
                    </div>
                  )}
                </div>
                {project.financials.tokenReward && (
                  <div className="mt-2 pt-2 border-t border-slate-700/50">
                    <div className="text-xs text-slate-500">Токены</div>
                    <div className="text-sm font-bold text-purple-400">{project.financials.tokenReward}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-500">Прогресс</span>
              <span className="text-cyan-400 font-mono font-medium">{project.progress}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                className={`h-full bg-gradient-to-r ${project.color}`}
              />
            </div>
          </div>

          {/* Specs Preview */}
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {project.specs.slice(0, 2).map((spec, i) => (
              <div key={i} className="bg-slate-800/30 rounded-lg px-2 py-1.5">
                <div className="text-xs text-slate-500 truncate">{spec.label}</div>
                <div className="text-xs text-slate-300 font-medium truncate">{spec.value}</div>
              </div>
            ))}
          </div>

          {/* Social Stats */}
          <div className="flex items-center gap-4 mb-4 pt-4 border-t border-slate-800/50">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Heart className="w-4 h-4" />
              <span className="text-xs">{project.likes || 0}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{project.comments || 0}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <Users className="w-4 h-4" />
              <span className="text-xs">{project.investors || 0}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href={`/projecthub/${project.id}`}
              className="flex-1 px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-sm font-medium rounded-lg border border-cyan-500/30 transition-colors flex items-center justify-center gap-1.5"
            >
              Изучить
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => onCompare(project)}
              className={`p-2 rounded-lg border transition-colors ${
                isComparing
                  ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
                  : "bg-slate-800/30 border-slate-700/50 text-slate-400 hover:text-cyan-400"
              }`}
              title="Сравнить"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-pink-400 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:text-cyan-400 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// МОДАЛЬНОЕ ОКНО СРАВНЕНИЯ
// ============================================================================

function ComparisonModal({
  projects,
  onClose
}: {
  projects: Project[];
  onClose: () => void;
}) {
  if (projects.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-slate-900 border border-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto"
      >
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Сравнение проектов</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-4">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <div key={project.id} className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-xs text-slate-400 mb-3">{project.subtitle}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">Категория</span>
                      <span className="text-xs text-slate-300">{project.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">Статус</span>
                      <span className="text-xs text-slate-300">{statusLabels[project.status]?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">Цена</span>
                      <span className="text-xs text-white">{project.price}</span>
                    </div>
                    {project.financials && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-500">IRR</span>
                          <span className="text-xs font-bold text-emerald-400">{project.financials.irr}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-500">Бюджет</span>
                          <span className="text-xs text-cyan-400">{project.financials.budget}</span>
                        </div>
                        {project.financials.paybackPeriod && (
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Окупаемость</span>
                            <span className="text-xs text-slate-300">{project.financials.paybackPeriod}</span>
                          </div>
                        )}
                        {project.financials.tokenReward && (
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Токены</span>
                            <span className="text-xs text-purple-400">{project.financials.tokenReward}</span>
                          </div>
                        )}
                      </>
                    )}
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-500">Прогресс</span>
                      <span className="text-xs text-cyan-400">{project.progress}%</span>
                    </div>
                    {project.esgScore && (
                      <div className="flex justify-between">
                        <span className="text-xs text-slate-500">ESG Score</span>
                        <span className="text-xs text-emerald-400">{project.esgScore}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Specs Comparison */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-4">Характеристики</h3>
            <div className="bg-slate-800/30 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left p-3 text-sm text-slate-400 font-medium">Параметр</th>
                    {projects.map((p) => (
                      <th key={p.id} className="text-left p-3 text-sm text-white font-medium">{p.title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {projects[0].specs.map((spec, i) => (
                    <tr key={i} className="border-b border-slate-700/30 last:border-0">
                      <td className="p-3 text-sm text-slate-400">{spec.label}</td>
                      {projects.map((p) => {
                        const pSpec = p.specs.find((s) => s.label === spec.label);
                        return (
                          <td key={p.id} className="p-3 text-sm text-slate-300">
                            {pSpec?.value || "-"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Features Comparison */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-4">Функции</h3>
            <div className="grid grid-cols-3 gap-4">
              {projects.map((p) => (
                <div key={p.id} className="space-y-2">
                  {p.features.map((f, i) => (
                    <div key={i} className="text-xs">
                      <span className="text-cyan-400 font-medium">{f.title}:</span>
                      <span className="text-slate-300 ml-1">{f.description}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// КАЛЬКУЛЯТОР ROI
// ============================================================================

function ROICalculator({ project }: { project: Project | null }) {
  const [investment, setInvestment] = useState<string>("10000");
  const [years, setYears] = useState<number>(5);

  if (!project || !project.financials) return null;

  const irr = parseFloat(project.financials.irr) || 0;
  const investedAmount = parseFloat(investment) || 0;
  const returnValue = investedAmount * Math.pow(1 + irr / 100, years);

  return (
    <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
      <h3 className="font-bold text-white mb-3 flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-cyan-400" />
        Калькулятор ROI
      </h3>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-slate-500 block mb-1">Сумма инвестиций ($)</label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="text-xs text-slate-500 block mb-1">Срок (лет)</label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setYears(Math.max(1, years - 1))}
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="flex-1 text-center text-white font-medium">{years} лет</span>
            <button
              onClick={() => setYears(Math.min(10, years + 1))}
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-700/50">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-slate-500">IRR проекта</span>
            <span className="text-sm font-bold text-emerald-400">{project.financials.irr}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500">Возврат через {years} лет</span>
            <span className="text-lg font-bold text-cyan-400">${returnValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ОСНОВНАЯ СТРАНИЦА
// ============================================================================

export default function ProjectHubPage() {
  const t = useTranslations("projecthub");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [compareList, setCompareList] = useState<Project[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [esgMin, setEsgMin] = useState(0);

  // Фильтрация и сортировка
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Категория
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Поиск
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.subtitle.toLowerCase().includes(query)
      );
    }

    // ESG фильтр
    if (esgMin > 0) {
      result = result.filter((p) => (p.esgScore || 0) >= esgMin);
    }

    // Сортировка
    switch (sortBy) {
      case "popular":
        result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      case "newest":
        result.sort((a, b) => b.progress - a.progress);
        break;
      case "irr":
        result.sort((a, b) => {
          const irrA = parseFloat(a.financials?.irr || "0");
          const irrB = parseFloat(b.financials?.irr || "0");
          return irrB - irrA;
        });
        break;
      case "budget":
        result.sort((a, b) => {
          const parseBudget = (bgt: string) => {
            const num = parseFloat(bgt.replace(/[^0-9.]/g, ""));
            if (bgt.includes("M")) return num * 1000000;
            if (bgt.includes("K")) return num * 1000;
            return num;
          };
          return parseBudget(b.financials?.budget || "0") - parseBudget(a.financials?.budget || "0");
        });
        break;
      case "progress":
        result.sort((a, b) => b.progress - a.progress);
        break;
      case "payback":
        result.sort((a, b) => {
          const parsePayback = (pb: string) => {
            if (!pb) return 999;
            const match = pb.match(/(\d+\.?\d*)/);
            return match ? parseFloat(match[1]) : 999;
          };
          return parsePayback(a.financials?.paybackPeriod || "") - parsePayback(b.financials?.paybackPeriod || "");
        });
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy, esgMin]);

  // Обработка сравнения
  const handleCompare = (project: Project) => {
    if (compareList.find((p) => p.id === project.id)) {
      setCompareList(compareList.filter((p) => p.id !== project.id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, project]);
    }
  };

  // Статистика
  const stats = [
    { label: "Проектов", value: projects.length.toString(), icon: FlaskConical },
    { label: "B2C", value: "8", icon: Users },
    { label: "B2B", value: "4", icon: Building },
    { label: "B2G", value: "2", icon: Landmark },
    { label: "Platform", value: "6", icon: Cpu },
    { label: "Инвесторов", value: "156+", icon: Users },
    { label: "Финансирование", value: "$9.9M", icon: DollarSign },
    { label: "Средний IRR", value: "17.5%", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">LoopOrb Ecosystem</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                ProjectHub
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-8">
              Полная экосистема продуктов LoopOrb: 20+ проектов для мониторинга, очистки и токенизации воды. B2C, B2B, B2G и Platform решения.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl flex items-center gap-2 hover:from-cyan-400 hover:to-emerald-400 transition-all shadow-lg shadow-cyan-500/25">
                <Rocket className="w-5 h-5" />
                Подать проект
              </button>
              <button className="px-6 py-3 bg-slate-800/60 backdrop-blur text-white font-medium rounded-xl border border-slate-700/60 hover:bg-slate-700/60 transition-all flex items-center gap-2">
                <Database className="w-5 h-5" />
                Whitepaper
              </button>
              <Link
                href="/projecthub/map"
                className="px-6 py-3 bg-slate-800/60 backdrop-blur text-white font-medium rounded-xl border border-slate-700/60 hover:bg-slate-700/60 transition-all flex items-center gap-2"
              >
                <Map className="w-5 h-5" />
                Карта проектов
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/60 rounded-xl p-4 text-center hover:border-cyan-500/30 transition-colors"
              >
                <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/60 rounded-2xl p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Поиск проектов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-slate-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-800/50 border border-slate-700/60 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-1 bg-slate-800/50 rounded-xl p-1 border border-slate-700/60">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "map" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Map className="w-5 h-5" />
                </button>
              </div>

              {/* Compare Button */}
              {compareList.length > 0 && (
                <button
                  onClick={() => setShowComparison(true)}
                  className="px-4 py-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 font-medium rounded-xl border border-cyan-500/30 transition-colors flex items-center gap-2"
                >
                  <BarChart3 className="w-5 h-5" />
                  Сравнить ({compareList.length})
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800/60">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 shadow-lg shadow-cyan-500/25"
                        : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/60"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Advanced Filters Toggle */}
            <div className="mt-4 pt-4 border-t border-slate-800/60">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? "Скрыть фильтры" : "Расширенные фильтры"}
                <ChevronRight className={`w-4 h-4 transition-transform ${showFilters ? "rotate-90" : ""}`} />
              </button>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid md:grid-cols-3 gap-4 mt-4 pt-4"
                  >
                    <div>
                      <label className="text-xs text-slate-500 block mb-2">ESG Score: {esgMin}+</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={esgMin}
                        onChange={(e) => setEsgMin(parseInt(e.target.value))}
                        className="w-full accent-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 block mb-2">Бюджет: ${priceRange[0]} - ${priceRange[1]}K</label>
                      <input
                        type="range"
                        min="0"
                        max="20000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-cyan-500"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() => {
                          setEsgMin(0);
                          setPriceRange([0, 20000]);
                          setSearchQuery("");
                          setActiveCategory("all");
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors"
                      >
                        Сбросить фильтры
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Проекты не найдены</h3>
              <p className="text-slate-400">Попробуйте изменить параметры поиска</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === "grid"
                ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}>
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onCompare={handleCompare}
                    isComparing={!!compareList.find((p) => p.id === project.id)}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/30 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Экосистема LoopOrb</h2>
            <p className="text-slate-400">Полный цикл: от анализа до токенизации</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "B2C (8)", desc: "Потребительские устройства", icon: Users, color: "from-emerald-500 to-green-600", products: "AquaCell Go/Pro/Lab/Mini, AquaPure, AquaHome Tap/Pro/Shower" },
              { title: "B2B (4)", desc: "Бизнес решения", icon: Building, color: "from-cyan-500 to-blue-600", products: "AquaFarm, AquaPool, AquaIndustrial, AquaLab Validator" },
              { title: "B2G (2)", desc: "Государство", icon: Landmark, color: "from-blue-600 to-indigo-700", products: "AquaNode Buoy, AquaDrone" },
              { title: "Platform (6)", desc: "Протоколы", icon: Cpu, color: "from-purple-500 to-violet-600", products: "Proof-of-Water, AquaDEX, Oracle, AquaEdu, AquaSDK, AquaVault" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative bg-slate-900/50 border border-slate-800/60 rounded-xl p-6 hover:border-cyan-500/30 transition-colors"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400 mb-3">{item.desc}</p>
                <p className="text-xs text-slate-500">{item.products}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/30 rounded-2xl p-8 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-emerald-500/5 animate-pulse" />
            <div className="relative">
              <h2 className="text-2xl font-bold text-white mb-4">
                Готовы строить будущее водной экономики?
              </h2>
              <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
                Присоединяйтесь к экосистеме исследователей и разработчиков.
                Получите грант на разработку вашего проекта или инвестируйте в существующие.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/25">
                  <Rocket className="w-4 h-4" />
                  Подать заявку
                </button>
                <button className="px-6 py-3 bg-slate-800/60 hover:bg-slate-700/60 text-white font-medium rounded-lg border border-slate-700/60 transition-colors">
                  Подробнее о грантах
                </button>
                <Link
                  href="/dao"
                  className="px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-medium rounded-lg border border-emerald-500/30 transition-colors flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Участвовать в DAO
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">LoopOrb ProjectHub</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/landing" className="hover:text-cyan-400 transition-colors">Staking</Link>
            <Link href="/ecosystem" className="hover:text-cyan-400 transition-colors">Ecosystem</Link>
            <Link href="/tokenomics" className="hover:text-cyan-400 transition-colors">Tokenomics</Link>
            <Link href="/dao" className="hover:text-cyan-400 transition-colors">DAO</Link>
            <a href="/docs/WHITEPAPER_VODECO_ECOSYSTEM.md" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <Database className="w-4 h-4" />
              Whitepaper
            </a>
          </div>
        </div>
      </footer>

      {/* Comparison Modal */}
      <AnimatePresence>
        {showComparison && compareList.length > 0 && (
          <ComparisonModal
            projects={compareList}
            onClose={() => setShowComparison(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
