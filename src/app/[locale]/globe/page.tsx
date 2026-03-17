"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Filter,
  Search,
  Download,
  Share2,
  Users,
  MessageSquare,
  Ruler,
  Sun,
  Moon,
  Eye,
  EyeOff,
  RefreshCw,
  AlertTriangle,
  Droplets,
  Waves,
  MapPin,
  Target,
  Globe2,
  Thermometer,
  Activity,
  TrendingUp,
  Clock,
  X,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Zap,
  Wind,
  CloudRain,
  Navigation,
  Plus,
  Minus,
  RotateCcw,
  Camera,
  Video,
  Smartphone,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { EmergencyButton } from "@/components/EmergencyButton";
import { EmergencyReportData } from "@/components/EmergencyModal";

// Динамический импорт Globe3D для избежания SSR проблем
const Globe3D = dynamic(() => import("@/components/Globe3D"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-ocean-deep flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-water-200/70">Загрузка 3D глобуса...</p>
      </div>
    </div>
  ),
});

// ============================================
// ТИПЫ ДАННЫХ
// ============================================

interface WaterObject {
  id: string;
  name: string;
  nameLocal?: string;
  type: string;
  country: string;
  region?: string;
  coordinates: { lat: number; lng: number };
  status: string;
  qualityIndex?: number;
  description?: string;
  crisis?: boolean;
  _count?: { data: number; projects: number };
}

interface PumpingStation {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  type: string;
  irr: number;
  investment: number;
  status: string;
}

interface Sensor {
  id: string;
  name: string;
  objectId?: string;
  objectName?: string;
  coordinates: { lat: number; lng: number };
  status: string;
  batteryLevel: number;
  lastReading: string;
  parameters: {
    ph?: number;
    temperature?: number;
    turbidity?: number;
    tds?: number;
    dissolvedOxygen?: number;
    conductivity?: number;
    nitrates?: number;
    phosphates?: number;
  };
  alerts?: string[];
}

interface VodLab {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  status: string;
  parameters: number;
}

interface Project {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  type: string;
  status: string;
  country: string;
  coordinates: { lat: number; lng: number };
  targetAmount: number;
  raisedAmount: number;
  esgScore?: number;
  impact?: {
    waterSaved?: number;
    co2Reduced?: number;
    peopleBenefited?: number;
    jobsCreated?: number;
  };
}

interface SensorDataPoint {
  timestamp: string;
  ph: number;
  temperature: number;
  turbidity: number;
  tds: number;
}

interface Alert {
  id: string;
  type: "CRITICAL" | "WARNING" | "INFO";
  objectId: string;
  objectName: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

// ============================================
// MOCK ДАННЫЕ
// ============================================

const WATER_OBJECTS: WaterObject[] = [
  // Центральная Азия
  { id: "wo1", name: "Амударья", nameLocal: "Амударё", type: "RIVER", country: "Узбекистан", region: "Сурхандарьинская область", coordinates: { lat: 37.5, lng: 62.0 }, status: "ACTIVE", qualityIndex: 65, description: "Одна из двух крупнейших рек Средней Азии", _count: { data: 45, projects: 3 } },
  { id: "wo2", name: "Сырдарья", nameLocal: "Сирдарё", type: "RIVER", country: "Казахстан", region: "Кызылординская область", coordinates: { lat: 45.5, lng: 62.5 }, status: "ACTIVE", qualityIndex: 58, _count: { data: 38, projects: 2 } },
  { id: "wo3", name: "Аральское море", nameLocal: "Арал теңізі", type: "LAKE", country: "Узбекистан/Казахстан", region: "Каракалпакстан", coordinates: { lat: 45.0, lng: 60.0 }, status: "CRITICAL", qualityIndex: 35, crisis: true, description: "Крупнейшая экологическая катастрофа XX века", _count: { data: 234, projects: 5 } },
  { id: "wo4", name: "Иссык-Куль", nameLocal: "Ысык-Көл", type: "LAKE", country: "Кыргызстан", region: "Иссык-Кульская область", coordinates: { lat: 42.4, lng: 77.2 }, status: "ACTIVE", qualityIndex: 85, _count: { data: 128, projects: 2 } },
  { id: "wo5", name: "Балхаш", nameLocal: "Балқаш", type: "LAKE", country: "Казахстан", region: "Жетысуская область", coordinates: { lat: 46.0, lng: 74.5 }, status: "MONITORING", qualityIndex: 72, crisis: true, _count: { data: 67, projects: 2 } },
  { id: "wo6", name: "Иртыш", type: "RIVER", country: "Казахстан", coordinates: { lat: 52.0, lng: 73.0 }, status: "ACTIVE", qualityIndex: 68, _count: { data: 52, projects: 1 } },
  { id: "wo7", name: "Урал", type: "RIVER", country: "Казахстан/Россия", coordinates: { lat: 51.0, lng: 52.0 }, status: "ACTIVE", qualityIndex: 61, _count: { data: 41, projects: 1 } },
  { id: "wo8", name: "Чарын", type: "RIVER", country: "Казахстан", coordinates: { lat: 43.5, lng: 78.5 }, status: "ACTIVE", qualityIndex: 79, _count: { data: 23, projects: 0 } },
  { id: "wo9", name: "Талас", type: "RIVER", country: "Кыргызстан/Казахстан", coordinates: { lat: 42.5, lng: 72.0 }, status: "MONITORING", qualityIndex: 55, _count: { data: 19, projects: 1 } },
  { id: "wo10", name: "Чуй", type: "RIVER", country: "Кыргызстан/Казахстан", coordinates: { lat: 42.8, lng: 74.5 }, status: "ACTIVE", qualityIndex: 63, _count: { data: 31, projects: 0 } },

  // Ближний Восток
  { id: "wo11", name: "Тигр", nameLocal: "Dicle", type: "RIVER", country: "Ирак", coordinates: { lat: 33.0, lng: 44.0 }, status: "ACTIVE", qualityIndex: 48, _count: { data: 89, projects: 2 } },
  { id: "wo12", name: "Евфрат", nameLocal: "Fırat", type: "RIVER", country: "Ирак", coordinates: { lat: 32.5, lng: 45.0 }, status: "ACTIVE", qualityIndex: 52, _count: { data: 76, projects: 2 } },
  { id: "wo13", name: "Мертвое море", nameLocal: "ים המלח", type: "LAKE", country: "Израиль/Иордания", coordinates: { lat: 31.5, lng: 35.5 }, status: "CRITICAL", qualityIndex: 25, crisis: true, _count: { data: 145, projects: 3 } },
  { id: "wo14", name: "Озеро Кинерет", nameLocal: "ים כנרת", type: "LAKE", country: "Израиль", coordinates: { lat: 32.9, lng: 35.6 }, status: "ACTIVE", qualityIndex: 78, _count: { data: 98, projects: 1 } },
  { id: "wo15", name: "Персидский залив", type: "SEA", country: "ОАЭ/Катар", coordinates: { lat: 26.0, lng: 52.0 }, status: "ACTIVE", qualityIndex: 71, _count: { data: 67, projects: 2 } },
  { id: "wo16", name: "Иордан", type: "RIVER", country: "Израиль/Иордания", coordinates: { lat: 32.0, lng: 35.5 }, status: "MONITORING", qualityIndex: 42, _count: { data: 54, projects: 1 } },

  // Индия
  { id: "wo17", name: "Ганг", nameLocal: "गंगा", type: "RIVER", country: "Индия", coordinates: { lat: 25.5, lng: 87.5 }, status: "CRITICAL", qualityIndex: 42, crisis: true, _count: { data: 312, projects: 4 } },
  { id: "wo18", name: "Ямуна", nameLocal: "यमुना", type: "RIVER", country: "Индия", coordinates: { lat: 28.6, lng: 77.2 }, status: "CRITICAL", qualityIndex: 38, crisis: true, _count: { data: 187, projects: 2 } },
  { id: "wo19", name: "Брахмапутра", type: "RIVER", country: "Индия", coordinates: { lat: 26.2, lng: 91.8 }, status: "ACTIVE", qualityIndex: 68, _count: { data: 94, projects: 1 } },
  { id: "wo20", name: "Кавери", type: "RIVER", country: "Индия", coordinates: { lat: 11.0, lng: 77.8 }, status: "ACTIVE", qualityIndex: 74, _count: { data: 61, projects: 1 } },
  { id: "wo21", name: "Нармада", type: "RIVER", country: "Индия", coordinates: { lat: 22.0, lng: 73.0 }, status: "ACTIVE", qualityIndex: 69, _count: { data: 48, projects: 0 } },

  // Китай
  { id: "wo22", name: "Янцзы", nameLocal: "长江", type: "RIVER", country: "Китай", coordinates: { lat: 30.0, lng: 115.0 }, status: "MONITORING", qualityIndex: 55, _count: { data: 156, projects: 2 } },
  { id: "wo23", name: "Хуанхэ", nameLocal: "黄河", type: "RIVER", country: "Китай", coordinates: { lat: 35.0, lng: 110.0 }, status: "MONITORING", qualityIndex: 48, _count: { data: 134, projects: 2 } },
  { id: "wo24", name: "Жемчужная река", type: "RIVER", country: "Китай", coordinates: { lat: 23.1, lng: 113.3 }, status: "ACTIVE", qualityIndex: 62, _count: { data: 87, projects: 1 } },
  { id: "wo25", name: "Озеро Дунтинху", type: "LAKE", country: "Китай", coordinates: { lat: 29.3, lng: 112.9 }, status: "MONITORING", qualityIndex: 58, _count: { data: 45, projects: 1 } },
  { id: "wo26", name: "Цинхай", type: "LAKE", country: "Китай", coordinates: { lat: 36.5, lng: 100.0 }, status: "ACTIVE", qualityIndex: 81, _count: { data: 39, projects: 0 } },

  // Африка
  { id: "wo27", name: "Нил", nameLocal: "النيل", type: "RIVER", country: "Египет", coordinates: { lat: 30.0, lng: 31.0 }, status: "ACTIVE", qualityIndex: 68, _count: { data: 201, projects: 3 } },
  { id: "wo28", name: "Виктория", type: "LAKE", country: "Уганда/Кения", coordinates: { lat: -1.0, lng: 33.0 }, status: "ACTIVE", qualityIndex: 78, _count: { data: 167, projects: 2 } },
  { id: "wo29", name: "Танганьика", type: "LAKE", country: "Танзания", coordinates: { lat: -6.0, lng: 30.0 }, status: "ACTIVE", qualityIndex: 81, _count: { data: 89, projects: 1 } },
  { id: "wo30", name: "Озеро Чад", type: "LAKE", country: "Чад", coordinates: { lat: 13.2, lng: 14.0 }, status: "CRITICAL", qualityIndex: 32, crisis: true, _count: { data: 78, projects: 2 } },

  // Глобальные
  { id: "wo31", name: "Амазонка", nameLocal: "Amazonas", type: "RIVER", country: "Бразилия", coordinates: { lat: -3.0, lng: -60.0 }, status: "ACTIVE", qualityIndex: 82, _count: { data: 289, projects: 3 } },
  { id: "wo32", name: "Миссисипи", type: "RIVER", country: "США", coordinates: { lat: 35.0, lng: -90.0 }, status: "ACTIVE", qualityIndex: 71, _count: { data: 178, projects: 2 } },
  { id: "wo33", name: "Волга", type: "RIVER", country: "Россия", coordinates: { lat: 48.0, lng: 44.0 }, status: "ACTIVE", qualityIndex: 64, _count: { data: 134, projects: 1 } },
  { id: "wo34", name: "Байкал", type: "LAKE", country: "Россия", coordinates: { lat: 53.5, lng: 108.0 }, status: "ACTIVE", qualityIndex: 95, _count: { data: 245, projects: 2 } },
];

const PUMPING_STATIONS: PumpingStation[] = [
  { id: "ps1", name: "Насосная станция #2", location: "Джизак, Узбекистан", lat: 40.1158, lng: 67.8422, type: "PUMPING", irr: 18, investment: 6.2, status: "active" },
  { id: "ps2", name: "Korovulbozor PS", location: "Бухара, Узбекистан", lat: 39.7681, lng: 64.4556, type: "PUMPING", irr: 22, investment: 8.1, status: "active" },
  { id: "ps3", name: "Jondor PS", location: "Бухара, Узбекистан", lat: 39.7167, lng: 63.5833, type: "PUMPING", irr: 20, investment: 12.0, status: "construction" },
  { id: "ps4", name: "Насосная станция #3", location: "Навои, Узбекистан", lat: 40.0964, lng: 65.3792, type: "PUMPING", irr: 17, investment: 9.5, status: "planning" },
  { id: "ps5", name: "Dekhkanabad PS", location: "Кашкадарья, Узбекистан", lat: 38.5111, lng: 66.8319, type: "PUMPING", irr: 15, investment: 7.2, status: "construction" },
];

const VOD_LABS: VodLab[] = [
  { id: "lab1", name: "VOD-Lab Tashkent", location: "Ташкент, Узбекистан", lat: 41.2995, lng: 69.2401, status: "online", parameters: 87 },
  { id: "lab2", name: "VOD-Lab Jerusalem", location: "Иерусалим, Израиль", lat: 31.7683, lng: 35.2137, status: "online", parameters: 94 },
  { id: "lab3", name: "VOD-Lab Nairobi", location: "Найроби, Кения", lat: -1.2921, lng: 36.8219, status: "maintenance", parameters: 0 },
  { id: "lab4", name: "VOD-Lab Singapore", location: "Сингапур", lat: 1.3521, lng: 103.8198, status: "online", parameters: 91 },
  { id: "lab5", name: "VOD-Lab Dubai", location: "Дубай, ОАЭ", lat: 25.2048, lng: 55.2708, status: "online", parameters: 88 },
];

const PROJECTS: Project[] = [
  { id: "proj-1", slug: "modernization-uzbekistan-bukhara", name: "Модернизация насосных станций Бухарского региона", shortDescription: "Комплексная реконструкция 12 насосных станций", type: "INFRASTRUCTURE", status: "ACTIVE", country: "Узбекистан", coordinates: { lat: 39.76, lng: 64.42 }, targetAmount: 45000000, raisedAmount: 28400000, esgScore: 87, impact: { waterSaved: 12500000, co2Reduced: 4500, peopleBenefited: 500000, jobsCreated: 120 } },
  { id: "proj-2", slug: "aral-sea-restoration", name: "Спасение Аральского моря — Phase 1", shortDescription: "Комплексное восстановление северной части Аральского моря", type: "RESTORATION", status: "FUNDRAISING", country: "Узбекистан / Казахстан", coordinates: { lat: 45.0, lng: 60.0 }, targetAmount: 120000000, raisedAmount: 34500000, esgScore: 98, impact: { co2Reduced: 850000, peopleBenefited: 2000000, jobsCreated: 3500 } },
  { id: "proj-3", slug: "nile-cleanup-cairo", name: "Чистый Нил — Каирская программа", shortDescription: "Очистка 50 км берегов Нила в районе Каира", type: "CLEANUP", status: "ACTIVE", country: "Египет", coordinates: { lat: 30.04, lng: 31.23 }, targetAmount: 25000000, raisedAmount: 18700000, esgScore: 92, impact: { co2Reduced: 1200, peopleBenefited: 5000000, jobsCreated: 800 } },
  { id: "proj-4", slug: "amazon-conservation-brazil", name: "Амазония: Защита водного баланса", shortDescription: "Комплексная программа защиты Амазонки", type: "CONSERVATION", status: "ACTIVE", country: "Бразилия", coordinates: { lat: -3.46, lng: -62.21 }, targetAmount: 85000000, raisedAmount: 52300000, esgScore: 96, impact: { co2Reduced: 2500000, peopleBenefited: 30000000, jobsCreated: 1200 } },
  { id: "proj-5", slug: "lake-victoria-watch", name: "Виктория Watch — Мониторинг озера", shortDescription: "Сеть из 200 IoT-сенсоров для мониторинга", type: "MONITORING", status: "ACTIVE", country: "Кения / Уганда", coordinates: { lat: -1.0, lng: 33.0 }, targetAmount: 12000000, raisedAmount: 8900000, esgScore: 94, impact: { peopleBenefited: 40000000, jobsCreated: 45 } },
  { id: "proj-6", slug: "ganga-clean-varanasi", name: "Чистый Ганг — Варанаси-Канпур", shortDescription: "Комплексная очистка 150 км священной реки", type: "CLEANUP", status: "ACTIVE", country: "Индия", coordinates: { lat: 25.31, lng: 83.01 }, targetAmount: 320000000, raisedAmount: 241000000, esgScore: 95, impact: { co2Reduced: 15000, peopleBenefited: 450000000, jobsCreated: 5000 } },
  { id: "proj-7", slug: "balkhash-emergency", name: "Экстренное спасение озера Балхаш", shortDescription: "Критический проект по спасению озера", type: "RESTORATION", status: "FUNDRAISING", country: "Казахстан", coordinates: { lat: 46.0, lng: 74.5 }, targetAmount: 180000000, raisedAmount: 23000000, esgScore: 99, impact: { co2Reduced: 50000, peopleBenefited: 2000000, jobsCreated: 500 } },
  { id: "proj-8", slug: "solar-water-kenya", name: "Solar Water Kenya — Солнечные насосы", shortDescription: "500 солнечных насосных станций для сельской Кении", type: "INFRASTRUCTURE", status: "ACTIVE", country: "Кения", coordinates: { lat: -0.5, lng: 37.0 }, targetAmount: 15000000, raisedAmount: 12800000, esgScore: 93, impact: { co2Reduced: 8000, peopleBenefited: 500000, jobsCreated: 250 } },
];

// Генерация сенсоров для каждого водного объекта
const generateSensors = (): Sensor[] => {
  const sensors: Sensor[] = [];
  WATER_OBJECTS.forEach((obj, index) => {
    const sensorCount = Math.floor(Math.random() * 3) + 1; // 1-3 сенсора на объект
    for (let i = 0; i < sensorCount; i++) {
      const latOffset = (Math.random() - 0.5) * 0.5;
      const lngOffset = (Math.random() - 0.5) * 0.5;
      sensors.push({
        id: `sensor-${obj.id}-${i + 1}`,
        name: `${obj.name} Sensor #${i + 1}`,
        objectId: obj.id,
        objectName: obj.name,
        coordinates: {
          lat: obj.coordinates.lat + latOffset,
          lng: obj.coordinates.lng + lngOffset,
        },
        status: Math.random() > 0.15 ? "online" : Math.random() > 0.5 ? "offline" : "maintenance",
        batteryLevel: Math.floor(Math.random() * 40) + 60,
        lastReading: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        parameters: {
          ph: +(6.5 + Math.random() * 2.5).toFixed(1),
          temperature: +(15 + Math.random() * 20).toFixed(1),
          turbidity: +(5 + Math.random() * 45).toFixed(0),
          tds: +(300 + Math.random() * 400).toFixed(0),
          dissolvedOxygen: +(5 + Math.random() * 5).toFixed(1),
          conductivity: +(400 + Math.random() * 600).toFixed(0),
        },
        alerts: Math.random() > 0.8 ? ["Высокая мутность", "Низкий pH"] : undefined,
      });
    }
  });
  return sensors;
};

const SENSORS = generateSensors();

const ALERTS: Alert[] = [
  { id: "a1", type: "CRITICAL", objectId: "wo3", objectName: "Аральское море", message: "Критический уровень воды: -2.3м за месяц", timestamp: new Date(Date.now() - 300000).toISOString(), acknowledged: false },
  { id: "a2", type: "CRITICAL", objectId: "wo17", objectName: "Ганг", message: "Превышение уровня бактерий в 5 раз", timestamp: new Date(Date.now() - 600000).toISOString(), acknowledged: false },
  { id: "a3", type: "WARNING", objectId: "wo13", objectName: "Мертвое море", message: "Ускоренное испарение: +15% к норме", timestamp: new Date(Date.now() - 900000).toISOString(), acknowledged: true },
  { id: "a4", type: "WARNING", objectId: "sensor-wo22-1", objectName: "Янцзы Sensor #1", message: "Низкий уровень кислорода: 4.2 мг/л", timestamp: new Date(Date.now() - 1200000).toISOString(), acknowledged: false },
  { id: "a5", type: "INFO", objectId: "ps2", objectName: "Korovulbozor PS", message: "Плановое ТО через 3 дня", timestamp: new Date(Date.now() - 1800000).toISOString(), acknowledged: true },
];

// ============================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================

const getQualityColor = (index: number): string => {
  if (index >= 80) return "#22c55e";
  if (index >= 60) return "#84cc16";
  if (index >= 40) return "#eab308";
  return "#ef4444";
};

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "active":
    case "online":
      return "#22c55e";
    case "construction":
    case "maintenance":
      return "#eab308";
    case "critical":
    case "offline":
      return "#ef4444";
    default:
      return "#64748b";
  }
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

// ============================================
// КОМПОНЕНТЫ ПАНЕЛЕЙ
// ============================================

// Панель фильтров
function FilterPanel({
  activeFilters,
  onFilterChange,
  onClose
}: {
  activeFilters: Record<string, boolean>;
  onFilterChange: (filter: string, value: boolean) => void;
  onClose: () => void;
}) {
  const filters = [
    { id: "rivers", label: "Реки", icon: Waves },
    { id: "lakes", label: "Озёра", icon: Droplets },
    { id: "stations", label: "Станции", icon: MapPin },
    { id: "sensors", label: "Сенсоры", icon: Activity },
    { id: "labs", label: "Лаборатории", icon: Target },
    { id: "projects", label: "Проекты", icon: Globe2 },
    { id: "alerts", label: "Алерты", icon: AlertTriangle },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="absolute top-20 left-4 z-40 bg-ocean-900/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 w-64"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Filter className="w-4 h-4 text-water-400" />
          Фильтры
        </h3>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      <div className="space-y-2">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilters[filter.id] ?? true;
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id, !isActive)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                isActive
                  ? "bg-water-500/20 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-water-400" : ""}`} />
              {filter.label}
              <div className={`ml-auto w-4 h-4 rounded-full border-2 ${
                isActive ? "border-water-400 bg-water-400" : "border-slate-600"
              }`}>
                {isActive && <CheckIcon className="w-3 h-3 text-ocean-900" />}
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

// Панель поиска
function SearchPanel({
  searchQuery,
  onSearchChange,
  searchResults,
  onSelectResult,
  onClose
}: {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchResults: any[];
  onSelectResult: (result: any) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-20 left-1/2 -translate-x-1/2 z-40 bg-ocean-900/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 w-96 max-h-96 overflow-y-auto"
    >
      <div className="flex items-center gap-3 mb-4">
        <Search className="w-5 h-5 text-water-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Поиск объектов, сенсоров, проектов..."
          className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none"
          autoFocus
        />
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      {searchQuery && searchResults.length > 0 && (
        <div className="space-y-2">
          {searchResults.slice(0, 8).map((result) => (
            <button
              key={result.id}
              onClick={() => {
                onSelectResult(result);
                onClose();
              }}
              className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition-colors text-left"
            >
              <div className={`w-2 h-2 rounded-full ${
                result.type === "sensor" ? "bg-cyan-400" :
                result.type === "project" ? "bg-purple-400" :
                result.qualityIndex && result.qualityIndex < 50 ? "bg-red-400" : "bg-emerald-400"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{result.name}</p>
                <p className="text-xs text-slate-400 truncate">
                  {result.type === "sensor" ? "Сенсор" : result.country || result.location}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
      {searchQuery && searchResults.length === 0 && (
        <p className="text-center text-slate-400 text-sm py-4">Ничего не найдено</p>
      )}
    </motion.div>
  );
}

// Панель алертов
function AlertsPanel({
  alerts,
  onAcknowledge,
  onClose
}: {
  alerts: Alert[];
  onAcknowledge: (id: string) => void;
  onClose: () => void;
}) {
  const unacknowledged = alerts.filter(a => !a.acknowledged);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="absolute top-20 right-4 z-40 bg-ocean-900/95 backdrop-blur-xl rounded-2xl border border-white/10 p-4 w-80 max-h-96 overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          Алерты
          {unacknowledged.length > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
              {unacknowledged.length}
            </span>
          )}
        </h3>
        <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-xl border ${
              alert.type === "CRITICAL" ? "bg-red-500/10 border-red-500/30" :
              alert.type === "WARNING" ? "bg-yellow-500/10 border-yellow-500/30" :
              "bg-blue-500/10 border-blue-500/30"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{alert.objectName}</p>
                <p className="text-xs text-slate-300 mt-1">{alert.message}</p>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </p>
              </div>
              {!alert.acknowledged && (
                <button
                  onClick={() => onAcknowledge(alert.id)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <CheckIcon className="w-4 h-4 text-emerald-400" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Попап объекта
function ObjectPopup({
  data,
  onClose,
  onShare,
  onInvite,
  onComment
}: {
  data: any;
  onClose: () => void;
  onShare: () => void;
  onInvite: () => void;
  onComment: () => void;
}) {
  const [showHistory, setShowHistory] = useState(false);
  const [sensorDataHistory, setSensorDataHistory] = useState<SensorDataPoint[]>([]);

  useEffect(() => {
    // Генерация исторических данных для графика
    if (data.type === "sensor" || data.type === "object") {
      const history: SensorDataPoint[] = [];
      const now = Date.now();
      for (let i = 24; i >= 0; i--) {
        const timestamp = new Date(now - i * 3600000).toISOString();
        history.push({
          timestamp,
          ph: +(7 + Math.random() * 0.5 - 0.25).toFixed(1),
          temperature: +(18 + Math.random() * 4 - 2).toFixed(1),
          turbidity: +(15 + Math.random() * 10 - 5).toFixed(0),
          tds: +(450 + Math.random() * 50 - 25).toFixed(0),
        });
      }
      setSensorDataHistory(history);
    }
  }, [data]);

  if (!data) return null;

  const renderContent = () => {
    switch (data.type) {
      case "object":
        return (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${data.crisis ? "bg-red-500/20" : "bg-water-500/20"}`}>
                <Waves className={`w-6 h-6 ${data.crisis ? "text-red-400" : "text-water-400"}`} />
              </div>
              <div>
                <h3 className="font-bold text-white">{data.name}</h3>
                <p className="text-sm text-slate-400">{data.country}{data.region ? `, ${data.region}` : ""}</p>
              </div>
            </div>

            {data.crisis && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Критическая экологическая ситуация</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Тип</p>
                <p className="text-sm text-white">{data.type === "RIVER" ? "Река" : data.type === "LAKE" ? "Озеро" : data.type === "SEA" ? "Море" : data.type}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Качество воды</p>
                <p className={`text-sm font-bold ${
                  (data.qualityIndex || 0) >= 70 ? "text-emerald-400" :
                  (data.qualityIndex || 0) >= 50 ? "text-yellow-400" : "text-red-400"
                }`}>
                  {data.qualityIndex || "N/A"}/100
                </p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Измерений</p>
                <p className="text-sm text-white">{data._count?.data || 0}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Проектов</p>
                <p className="text-sm text-white">{data._count?.projects || 0}</p>
              </div>
            </div>

            {data.description && (
              <p className="text-sm text-slate-300 mb-4">{data.description}</p>
            )}

            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  (data.qualityIndex || 0) >= 70 ? "bg-emerald-400" :
                  (data.qualityIndex || 0) >= 50 ? "bg-yellow-400" : "bg-red-400"
                }`}
                style={{ width: `${data.qualityIndex || 0}%` }}
              />
            </div>
          </>
        );

      case "sensor":
        return (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${
                data.status === "online" ? "bg-emerald-500/20" :
                data.status === "maintenance" ? "bg-yellow-500/20" : "bg-red-500/20"
              }`}>
                <Activity className={`w-6 h-6 ${
                  data.status === "online" ? "text-emerald-400" :
                  data.status === "maintenance" ? "text-yellow-400" : "text-red-400"
                }`} />
              </div>
              <div>
                <h3 className="font-bold text-white">{data.name}</h3>
                <p className="text-sm text-slate-400">{data.objectName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Статус</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    data.status === "online" ? "bg-emerald-400 animate-pulse" :
                    data.status === "maintenance" ? "bg-yellow-400" : "bg-red-400"
                  }`} />
                  <span className="text-sm text-white capitalize">{data.status}</span>
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Батарея</p>
                <p className={`text-sm font-bold ${
                  data.batteryLevel > 50 ? "text-emerald-400" :
                  data.batteryLevel > 20 ? "text-yellow-400" : "text-red-400"
                }`}>{data.batteryLevel}%</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Thermometer className="w-3 h-3 text-slate-400" />
                  <p className="text-xs text-slate-400">Температура</p>
                </div>
                <p className="text-lg text-white font-bold">{data.parameters.temperature}°C</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="w-3 h-3 text-slate-400" />
                  <p className="text-xs text-slate-400">pH</p>
                </div>
                <p className={`text-lg font-bold ${
                  (data.parameters.ph || 7) >= 6.5 && (data.parameters.ph || 7) <= 8.5 ? "text-emerald-400" : "text-yellow-400"
                }`}>{data.parameters.ph}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Wind className="w-3 h-3 text-slate-400" />
                  <p className="text-xs text-slate-400">Мутность</p>
                </div>
                <p className="text-lg text-white font-bold">{data.parameters.turbidity} NTU</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-3 h-3 text-slate-400" />
                  <p className="text-xs text-slate-400">TDS</p>
                </div>
                <p className="text-lg text-white font-bold">{data.parameters.tds} ppm</p>
              </div>
            </div>

            {data.alerts && data.alerts.length > 0 && (
              <div className="mb-4 space-y-1">
                {data.alerts.map((alert: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-red-400 text-xs">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{alert}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm text-white transition-colors mb-4"
            >
              <TrendingUp className="w-4 h-4" />
              {showHistory ? "Скрыть историю" : "Показать историю"}
            </button>

            {showHistory && (
              <div className="mb-4 p-3 bg-white/5 rounded-xl">
                <p className="text-xs text-slate-400 mb-2">Динамика параметров (24ч)</p>
                <div className="h-24 flex items-end gap-1">
                  {sensorDataHistory.map((point, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-water-500/30 to-water-400/60 rounded-t transition-all hover:from-water-400/50 hover:to-water-300/80"
                      style={{ height: `${(point.ph / 10) * 100}%` }}
                      title={`pH: ${point.ph}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        );

      case "station":
        return (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${
                data.status === "active" ? "bg-emerald-500/20" :
                data.status === "construction" ? "bg-yellow-500/20" : "bg-slate-500/20"
              }`}>
                <MapPin className={`w-6 h-6 ${
                  data.status === "active" ? "text-emerald-400" :
                  data.status === "construction" ? "text-yellow-400" : "text-slate-400"
                }`} />
              </div>
              <div>
                <h3 className="font-bold text-white">{data.name}</h3>
                <p className="text-sm text-slate-400">{data.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Тип</p>
                <p className="text-sm text-white">{data.type}</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">IRR</p>
                <p className="text-sm font-bold text-emerald-400">{data.irr}%</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Инвестиции</p>
                <p className="text-sm text-white">${data.investment}M</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Статус</p>
                <p className="text-sm text-white capitalize">{data.status}</p>
              </div>
            </div>
          </>
        );

      case "lab":
        return (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${data.status === "online" ? "bg-purple-500/20" : "bg-slate-500/20"}`}>
                <Target className={`w-6 h-6 ${data.status === "online" ? "text-purple-400" : "text-slate-400"}`} />
              </div>
              <div>
                <h3 className="font-bold text-white">{data.name}</h3>
                <p className="text-sm text-slate-400">{data.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Статус</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    data.status === "online" ? "bg-emerald-400 animate-pulse" : "bg-slate-400"
                  }`} />
                  <span className="text-sm text-white capitalize">{data.status}</span>
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Параметров</p>
                <p className="text-sm text-white">{data.parameters}</p>
              </div>
            </div>
          </>
        );

      case "project":
        const progress = (data.raisedAmount / data.targetAmount) * 100;
        return (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <Globe2 className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">{data.name}</h3>
                <p className="text-sm text-slate-400">{data.shortDescription}</p>
              </div>
            </div>

            {data.esgScore && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-emerald-400">ESG Score</span>
                  <span className="text-lg font-bold text-emerald-400">{data.esgScore}/100</span>
                </div>
              </div>
            )}

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Собрано</span>
                <span className="text-white font-medium">${formatNumber(data.raisedAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Цель</span>
                <span className="text-white font-medium">${formatNumber(data.targetAmount)}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 text-right">{progress.toFixed(1)}%</p>
            </div>

            {data.impact && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {data.impact.peopleBenefited && (
                  <div className="p-2 bg-white/5 rounded-lg">
                    <p className="text-xs text-slate-400">Людей</p>
                    <p className="text-sm text-white font-medium">{formatNumber(data.impact.peopleBenefited)}</p>
                  </div>
                )}
                {data.impact.co2Reduced && (
                  <div className="p-2 bg-white/5 rounded-lg">
                    <p className="text-xs text-slate-400">CO₂</p>
                    <p className="text-sm text-white font-medium">{formatNumber(data.impact.co2Reduced)} т</p>
                  </div>
                )}
                {data.impact.jobsCreated && (
                  <div className="p-2 bg-white/5 rounded-lg">
                    <p className="text-xs text-slate-400">Рабочих мест</p>
                    <p className="text-sm text-white font-medium">{formatNumber(data.impact.jobsCreated)}</p>
                  </div>
                )}
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="absolute left-1/2 -translate-x-1/2 top-[55%] w-80 md:w-96 bg-ocean-900/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 z-50"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-1 hover:bg-white/10 rounded-lg transition-colors"
      >
        <X className="w-5 h-5 text-slate-400" />
      </button>

      {renderContent()}

      <div className="flex gap-2 mb-4">
        <button
          onClick={onShare}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-water-500/20 hover:bg-water-500/30 text-water-400 rounded-xl text-sm font-medium transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Поделиться
        </button>
        <button
          onClick={onInvite}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-xl text-sm font-medium transition-colors"
        >
          <Users className="w-4 h-4" />
          Пригласить
        </button>
        <button
          onClick={onComment}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-xl text-sm font-medium transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Комментарии
        </button>
      </div>

      <button className="w-full py-3 bg-gradient-to-r from-water-500 to-cyan-500 hover:from-water-600 hover:to-cyan-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-water-500/25">
        Подробнее
      </button>
    </motion.div>
  );
}

// Иконка галочки
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

// ============================================
// ОСНОВНАЯ СТРАНИЦА
// ============================================

export default function GlobePage() {
  // Состояния
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState<string>("all");
  const [isRotating, setIsRotating] = useState(true);
  const [isDayMode, setIsDayMode] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({
    rivers: true,
    lakes: true,
    stations: true,
    sensors: true,
    labs: true,
    projects: true,
    alerts: true,
  });
  const [alerts, setAlerts] = useState<Alert[]>(ALERTS);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isARMode, setIsARMode] = useState(false);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measurePoints, setMeasurePoints] = useState<{lat: number, lng: number}[]>([]);
  
  // Состояния для экстренных репортов
  const [emergencyReportStatus, setEmergencyReportStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [showEmergencyToast, setShowEmergencyToast] = useState(false);

  // Поиск
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return [
      ...WATER_OBJECTS.filter(o => o.name.toLowerCase().includes(query)).map(o => ({ ...o, type: "object" })),
      ...SENSORS.filter(s => s.name.toLowerCase().includes(query)).map(s => ({ ...s, type: "sensor" })),
      ...PROJECTS.filter(p => p.name.toLowerCase().includes(query)).map(p => ({ ...p, type: "project" })),
      ...PUMPING_STATIONS.filter(ps => ps.name.toLowerCase().includes(query)).map(ps => ({ ...ps, type: "station" })),
    ];
  }, [searchQuery]);

  // Обработчики
  const handleFilterChange = useCallback((filter: string, value: boolean) => {
    setActiveFilters(prev => ({ ...prev, [filter]: value }));
  }, []);

  const handleSelectResult = useCallback((result: any) => {
    setSelectedMarker({ type: result.type, data: result });
    setIsRotating(false);
  }, []);

  const handleAcknowledgeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  }, []);

  /**
   * Обработчик отправки экстренного отчёта
   */
  const handleEmergencyReportSubmit = useCallback(async (data: EmergencyReportData) => {
    setEmergencyReportStatus("submitting");
    
    try {
      // Загрузка медиафайлов (в реальности - на сервер)
      const mediaUrls: string[] = [];
      for (const file of data.mediaFiles) {
        // Mock: генерация URL для загруженных файлов
        mediaUrls.push(URL.createObjectURL(file));
      }

      // Отправка отчёта на сервер
      const response = await fetch("/api/emergency/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          incidentType: data.incidentType,
          description: data.description,
          location: data.location,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          mediaUrls,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error?.message || "Ошибка отправки отчёта");
      }

      // Успешная отправка
      setEmergencyReportStatus("success");
      setShowEmergencyToast(true);
      
      // Создание маркера на глобусе (в реальности - через WebSocket)
      console.log("Emergency report created:", result.data);
      
      // Скрытие toast через 5 секунд
      setTimeout(() => {
        setShowEmergencyToast(false);
        setEmergencyReportStatus("idle");
      }, 5000);

    } catch (error) {
      console.error("Emergency report error:", error);
      setEmergencyReportStatus("error");
      setShowEmergencyToast(true);
      
      setTimeout(() => {
        setShowEmergencyToast(false);
        setEmergencyReportStatus("idle");
      }, 5000);
    }
  }, []);

  const handleExport = useCallback((format: "csv" | "json") => {
    const data = {
      waterObjects: WATER_OBJECTS,
      sensors: SENSORS,
      stations: PUMPING_STATIONS,
      labs: VOD_LABS,
      projects: PROJECTS,
      exportedAt: new Date().toISOString(),
    };

    let content: string;
    let mimeType: string;
    let extension: string;

    if (format === "json") {
      content = JSON.stringify(data, null, 2);
      mimeType = "application/json";
      extension = "json";
    } else {
      // CSV export for water objects
      const headers = ["ID", "Name", "Type", "Country", "Quality", "Status"];
      const rows = WATER_OBJECTS.map(o => [
        o.id,
        o.name,
        o.type,
        o.country,
        o.qualityIndex || "",
        o.status,
      ]);
      content = [headers, ...rows].map(row => row.join(",")).join("\n");
      mimeType = "text/csv";
      extension = "csv";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `looporb-globe-export-${new Date().toISOString().split("T")[0]}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share && selectedMarker) {
      navigator.share({
        title: selectedMarker.data.name,
        text: selectedMarker.data.description || `Объект: ${selectedMarker.data.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Ссылка скопирована в буфер обмена");
    }
  }, [selectedMarker]);

  const handleMeasureClick = useCallback(() => {
    setIsMeasuring(!isMeasuring);
    setMeasurePoints([]);
  }, [isMeasuring]);

  // Статистика
  const stats = useMemo(() => ({
    objects: WATER_OBJECTS.length,
    sensors: SENSORS.length,
    stations: PUMPING_STATIONS.length,
    labs: VOD_LABS.length,
    projects: PROJECTS.length,
    alerts: alerts.filter(a => !a.acknowledged).length,
  }), [alerts]);

  const layers = [
    { id: "all", label: "Все", icon: Globe2, color: "text-white", count: stats.objects + stats.projects + stats.stations + stats.labs },
    { id: "objects", label: "Объекты", icon: Waves, color: "text-water-400", count: stats.objects },
    { id: "sensors", label: "Сенсоры", icon: Activity, color: "text-cyan-400", count: stats.sensors },
    { id: "stations", label: "Станции", icon: MapPin, color: "text-emerald-400", count: stats.stations },
    { id: "labs", label: "Лаборатории", icon: Target, color: "text-purple-400", count: stats.labs },
    { id: "projects", label: "Проекты", icon: Globe2, color: "text-blue-400", count: stats.projects },
  ];

  return (
    <div className={`min-h-screen ${isFullscreen ? "" : "pt-16"}`}>
      {!isFullscreen && <Navbar />}

      {/* Основной контейнер */}
      <div className={`relative ${isFullscreen ? "h-screen" : "h-[calc(100vh-4rem)]"} bg-ocean-950 overflow-hidden`}>
        {/* 3D Canvas */}
        <Suspense fallback={
          <div className="min-h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-water-200/70">Загрузка 3D глобуса...</p>
            </div>
          </div>
        }>
          <Globe3D
            selectedMarker={selectedMarker}
            onMarkerSelect={setSelectedMarker}
            activeLayer={activeLayer}
            isRotating={isRotating}
            onRotationStop={() => setIsRotating(false)}
            isDayMode={isDayMode}
            activeFilters={activeFilters}
            waterObjects={WATER_OBJECTS}
            sensors={SENSORS}
            stations={PUMPING_STATIONS}
            labs={VOD_LABS}
            projects={PROJECTS}
            isMeasuring={isMeasuring}
            measurePoints={measurePoints}
            onMeasurePoint={(point) => setMeasurePoints(prev => [...prev, point])}
          />
        </Suspense>

        {/* Верхняя панель управления */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
          {/* Кнопки фильтров */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-xl backdrop-blur-xl border transition-colors ${
              showFilters ? "bg-water-500/30 border-water-400/50 text-white" : "bg-ocean-900/80 border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Фильтры</span>
            </div>
          </button>

          {/* Кнопка поиска */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`px-4 py-2 rounded-xl backdrop-blur-xl border transition-colors ${
              showSearch ? "bg-water-500/30 border-water-400/50 text-white" : "bg-ocean-900/80 border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span className="text-sm font-medium">Поиск</span>
            </div>
          </button>

          {/* Кнопка алертов */}
          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className={`px-4 py-2 rounded-xl backdrop-blur-xl border transition-colors relative ${
              showAlerts ? "bg-water-500/30 border-water-400/50 text-white" : "bg-ocean-900/80 border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Алерты</span>
              {stats.alerts > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {stats.alerts}
                </span>
              )}
            </div>
          </button>

          {/* Кнопка измерения расстояний */}
          <button
            onClick={handleMeasureClick}
            className={`px-4 py-2 rounded-xl backdrop-blur-xl border transition-colors ${
              isMeasuring ? "bg-water-500/30 border-water-400/50 text-white" : "bg-ocean-900/80 border-white/10 text-slate-300 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              <span className="text-sm font-medium">Измерение</span>
            </div>
          </button>
        </div>

        {/* Панели */}
        <AnimatePresence>
          {showFilters && (
            <FilterPanel
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClose={() => setShowFilters(false)}
            />
          )}
          {showSearch && (
            <SearchPanel
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              searchResults={searchResults}
              onSelectResult={handleSelectResult}
              onClose={() => setShowSearch(false)}
            />
          )}
          {showAlerts && (
            <AlertsPanel
              alerts={alerts}
              onAcknowledge={handleAcknowledgeAlert}
              onClose={() => setShowAlerts(false)}
            />
          )}
        </AnimatePresence>

        {/* Левая панель - Слои */}
        <div className="absolute top-20 left-4 z-40 bg-ocean-900/90 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-water-400" />
            Слои
          </h3>
          <div className="space-y-2">
            {layers.map((layer) => {
              const Icon = layer.icon;
              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${
                    activeLayer === layer.id
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeLayer === layer.id ? layer.color : ""}`} />
                  {layer.label}
                  <span className="ml-auto text-xs text-slate-500">{layer.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Правая панель - Статистика и управление */}
        <div className="absolute top-20 right-4 z-40 flex flex-col gap-2">
          {/* Статистика */}
          <div className="bg-ocean-900/90 backdrop-blur-xl rounded-xl border border-white/10 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-white">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>{stats.objects + stats.sensors + stats.stations + stats.labs + stats.projects} объектов</span>
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Droplets className="w-3 h-3" /> {stats.objects}
              </span>
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3" /> {stats.sensors}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {stats.stations}
              </span>
            </div>
          </div>

          {/* Индикатор вращения */}
          {!isRotating && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl px-4 py-2"
            >
              <div className="flex items-center gap-2 text-sm text-yellow-400">
                <InfoIcon className="w-4 h-4" />
                <span>Вращение остановлено</span>
              </div>
            </motion.div>
          )}

          {/* Кнопки управления */}
          <div className="bg-ocean-900/90 backdrop-blur-xl rounded-xl border border-white/10 p-3 space-y-2">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="w-full flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors"
            >
              {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRotating ? "Стоп" : "Вращение"}
            </button>
            <button
              onClick={() => setIsDayMode(!isDayMode)}
              className="w-full flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors"
            >
              {isDayMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              {isDayMode ? "Ночь" : "День"}
            </button>
            <button
              onClick={() => handleExport("json")}
              className="w-full flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors"
            >
              <Download className="w-4 h-4" />
              Экспорт JSON
            </button>
            <button
              onClick={() => handleExport("csv")}
              className="w-full flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white transition-colors"
            >
              <Download className="w-4 h-4" />
              Экспорт CSV
            </button>
          </div>
        </div>

        {/* Нижняя панель - Легенда */}
        <div className="absolute bottom-4 left-4 z-40 bg-ocean-900/90 backdrop-blur-xl rounded-xl border border-white/10 p-4">
          <h4 className="text-xs font-semibold text-slate-400 mb-2">Легенда</h4>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-slate-300">Хорошее (70-100)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="text-slate-300">Среднее (50-69)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-slate-300">Плохое (0-49)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
              <span className="text-slate-300">Проект</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-sm" />
              <span className="text-slate-300">VOD-Lab</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-slate-300">Сенсор online</span>
            </div>
          </div>
        </div>

        {/* Кнопки управления видом */}
        <div className="absolute bottom-4 right-4 z-40 flex flex-col gap-2">
          <button
            onClick={() => setIsARMode(!isARMode)}
            className={`p-3 rounded-xl backdrop-blur-xl border transition-colors ${
              isARMode ? "bg-water-500/30 border-water-400/50 text-white" : "bg-ocean-900/80 border-white/10 text-slate-300 hover:text-white"
            }`}
            title="AR режим"
          >
            <Smartphone className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-3 rounded-xl backdrop-blur-xl border bg-ocean-900/80 border-white/10 text-slate-300 hover:text-white transition-colors"
            title="Полноэкранный режим"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
          <button
            onClick={() => {
              setMeasurePoints([]);
              setIsMeasuring(false);
              setIsRotating(true);
              setSelectedMarker(null);
            }}
            className="p-3 rounded-xl backdrop-blur-xl border bg-ocean-900/80 border-white/10 text-slate-300 hover:text-white transition-colors"
            title="Сбросить вид"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Попап объекта */}
        <AnimatePresence>
          {selectedMarker && (
            <ObjectPopup
              data={selectedMarker.data}
              onClose={() => {
                setSelectedMarker(null);
                setIsRotating(true);
              }}
              onShare={handleShare}
              onInvite={() => alert("Функция приглашения будет доступна в следующей версии")}
              onComment={() => alert("Функция комментариев будет доступна в следующей версии")}
            />
          )}
        </AnimatePresence>

        {/* Индикатор измерения */}
        {isMeasuring && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 bg-ocean-900/90 backdrop-blur-xl rounded-xl border border-water-400/30 px-4 py-2"
          >
            <div className="flex items-center gap-3 text-sm text-white">
              <Ruler className="w-4 h-4 text-water-400" />
              <span>Режим измерения: кликните на точки для измерения расстояния</span>
              {measurePoints.length > 0 && (
                <span className="px-2 py-0.5 bg-water-500/20 text-water-400 rounded-full text-xs">
                  {measurePoints.length} точек
                </span>
              )}
              <button
                onClick={() => {
                  setMeasurePoints([]);
                  setIsMeasuring(false);
                }}
                className="ml-2 p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Emergency Button */}
        <EmergencyButton onReportSubmit={handleEmergencyReportSubmit} />

        {/* Emergency Toast Notification */}
        <AnimatePresence>
          {showEmergencyToast && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-28 left-1/2 -translate-x-1/2 z-50"
            >
              <div
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl backdrop-blur-xl border shadow-2xl ${
                  emergencyReportStatus === "success"
                    ? "bg-green-500/20 border-green-500/30"
                    : emergencyReportStatus === "error"
                    ? "bg-red-500/20 border-red-500/30"
                    : "bg-ocean-900/90 border-white/10"
                }`}
                style={{
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
                }}
              >
                {emergencyReportStatus === "success" ? (
                  <>
                    <div className="p-2 rounded-xl bg-green-500/20">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-200">Репорт отправлен!</p>
                      <p className="text-xs text-green-400/70">После верификации вы получите $50-500 VOD</p>
                    </div>
                  </>
                ) : emergencyReportStatus === "error" ? (
                  <>
                    <div className="p-2 rounded-xl bg-red-500/20">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-red-200">Ошибка отправки</p>
                      <p className="text-xs text-red-400/70">Попробуйте снова позже</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2 rounded-xl bg-cyan-500/20">
                      <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-cyan-200">Отправка репорта...</p>
                      <p className="text-xs text-cyan-400/70">Пожалуйста, подождите</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Иконка Info
function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
