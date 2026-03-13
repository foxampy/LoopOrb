"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Calendar, CheckCircle, Clock, DollarSign, Users,
  Target, FileText, Video, Package, Shield, Zap, Wallet,
  Loader2, Plus, Minus, ShoppingCart, Gem, ChevronRight,
  Bluetooth, QrCode, Share2, ExternalLink, AlertCircle,
  Award, TrendingUp, Globe, BarChart3
} from "lucide-react";

// Types
interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  status: 'concept' | 'development' | 'testing' | 'production';
  category: string;
  categoryLabel: string;
  budget: string;
  timeline: string;
  progress: number;
  team: { name: string; role: string; avatar?: string }[];
  
  // Pre-order
  preorderEnabled: boolean;
  preorderGoal: number;
  preorderRaised: number;
  preorderTiers: PreorderTier[];
  
  // Media
  coverImage?: string;
  videoUrl?: string;
  whitepaperUrl?: string;
  
  // Features
  features: string[];
  specifications: Record<string, string>;
  
  // Device integration
  hasDevice: boolean;
  deviceName?: string;
  connectionType?: 'bluetooth' | 'qr' | 'wifi';
}

interface PreorderTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  includes: string[];
  quantity: number;
  maxQuantity: number;
  sold: number;
}

// Empty project state (no demo data)
const emptyProject: Project = {
  id: "",
  slug: "",
  name: "",
  tagline: "",
  description: "",
  longDescription: "",
  status: "concept",
  category: "",
  categoryLabel: "",
  budget: "",
  timeline: "",
  progress: 0,
  team: [],
  preorderEnabled: false,
  preorderGoal: 0,
  preorderRaised: 0,
  preorderTiers: [],
  features: [],
  specifications: {},
  hasDevice: false,
};

const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
  concept: { label: "Концепт", color: "text-slate-400", bg: "bg-slate-500/20" },
  development: { label: "Разработка", color: "text-yellow-400", bg: "bg-yellow-500/20" },
  testing: { label: "Тестирование", color: "text-amber-400", bg: "bg-amber-500/20" },
  production: { label: "В производстве", color: "text-green-400", bg: "bg-green-500/20" },
};

// Placeholder until API is ready
const mockProject: Project = {
  id: "aquacell-genesis",
  slug: "aquacell-genesis",
  name: "AquaCell Genesis",
  tagline: "Портативная лаборатория для анализа воды с лабораторной точностью",
  description: "AquaCell Genesis — это портативное устройство для анализа качества воды с точностью лабораторного оборудования. Lab-on-chip технология с NFC-верификацией.",
  longDescription: `
    AquaCell Genesis представляет собой революционное решение для мониторинга качества воды. 
    Устройство использует передовую MEMS-технологию для анализа 12 параметров воды за 3 минуты.
    
    Основные возможности:
    - Измерение pH, температуры, проводимости
    - Анализ содержания растворенного кислорода
    - Обнаружение тяжелых металлов
    - NFC-верификация результатов
    - Интеграция с VODeco блокчейном
    
    Устройство идеально подходит для:
    - Экологических инспекций
    - Сельского хозяйства
    - Аквариумистики
    - Питьевого водоснабжения
  `,
  status: "testing",
  category: "hardware",
  categoryLabel: "Hardware",
  budget: "$450,000",
  timeline: "Q4 2025",
  progress: 75,
  team: [
    { name: "Dr. Sarah Chen", role: "Chief Scientist" },
    { name: "Michael Ross", role: "Hardware Engineer" },
    { name: "Elena Petrova", role: "Product Manager" },
  ],
  preorderEnabled: true,
  preorderGoal: 100000,
  preorderRaised: 67500,
  preorderTiers: [
    {
      id: "early-bird",
      name: "Early Bird",
      price: 299,
      originalPrice: 399,
      description: "Первые 100 устройств со скидкой 25%",
      includes: ["AquaCell Genesis", "3 картриджа", "Мобильное приложение", "1 год гарантии"],
      quantity: 1,
      maxQuantity: 100,
      sold: 67,
    },
    {
      id: "standard",
      name: "Standard",
      price: 349,
      originalPrice: 399,
      description: "Стандартный комплект",
      includes: ["AquaCell Genesis", "1 картридж", "Мобильное приложение", "1 год гарантии"],
      quantity: 1,
      maxQuantity: 500,
      sold: 234,
    },
    {
      id: "pro",
      name: "Professional",
      price: 599,
      description: "Профессиональный набор",
      includes: ["AquaCell Genesis", "10 картриджей", "Калибровочный набор", "API доступ", "3 года гарантии"],
      quantity: 1,
      maxQuantity: 200,
      sold: 45,
    },
  ],
  features: [
    "12 параметров анализа",
    "Точность ±2%",
    "Результаты за 3 минуты",
    "NFC-верификация",
    "Блокчейн-запись",
    "12 часов автономной работы",
  ],
  specifications: {
    "Размеры": "150 x 75 x 30 мм",
    "Вес": "250 г",
    "Экран": "2.4\" OLED",
    "Связь": "Bluetooth 5.0, NFC",
    "Батарея": "2000 mAh",
    "Защита": "IP67",
  },
  hasDevice: true,
  deviceName: "AquaCell Genesis",
  connectionType: "bluetooth",
};

// Pre-order Tier Card
function PreorderTierCard({ 
  tier, 
  selected, 
  onSelect, 
  quantity, 
  onQuantityChange 
}: { 
  tier: PreorderTier; 
  selected: boolean;
  onSelect: () => void;
  quantity: number;
  onQuantityChange: (delta: number) => void;
}) {
  const available = tier.maxQuantity - tier.sold;
  const isSoldOut = available <= 0;
  
  return (
    <div 
      onClick={!isSoldOut ? onSelect : undefined}
      className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${
        selected 
          ? "border-cyan-glow bg-cyan-glow/10" 
          : isSoldOut
            ? "border-white/10 bg-white/5 opacity-50 cursor-not-allowed"
            : "border-white/10 hover:border-white/20"
      }`}
    >
      {selected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-glow rounded-full flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-slate-900" />
        </div>
      )}
      
      {tier.originalPrice && (
        <div className="absolute -top-2 left-4 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
          -{Math.round((1 - tier.price / tier.originalPrice) * 100)}%
        </div>
      )}

      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-white">{tier.name}</h4>
          <p className="text-xs text-water-200/60">{tier.description}</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-white">${tier.price}</div>
          {tier.originalPrice && (
            <div className="text-sm text-water-200/40 line-through">${tier.originalPrice}</div>
          )}
        </div>
      </div>

      <ul className="space-y-1 mb-3">
        {tier.includes.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-water-200/70">
            <CheckCircle className="w-3 h-3 text-green-400" />
            {item}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <div className="text-xs text-water-200/50">
          {tier.sold} / {tier.maxQuantity} продано
        </div>
        
        {selected && (
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onQuantityChange(-1); }}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button 
              onClick={(e) => { e.stopPropagation(); onQuantityChange(1); }}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
              disabled={quantity >= available}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {isSoldOut && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-xl">
          <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
            Распродано
          </span>
        </div>
      )}
    </div>
  );
}

// Device Connection Info
function DeviceConnectionInfo({ type }: { type?: 'bluetooth' | 'qr' | 'wifi' }) {
  const configs = {
    bluetooth: {
      icon: Bluetooth,
      title: "Bluetooth LE",
      description: "Подключение через Bluetooth Low Energy для экономии энергии",
      steps: ["Включите Bluetooth на устройстве", "Откройте приложение VODeco", "Нажмите 'Подключить устройство'"],
    },
    qr: {
      icon: QrCode,
      title: "QR-код",
      description: "Сканирование QR-кода для быстрого сопряжения",
      steps: ["Нажмите кнопку на устройстве", "Отсканируйте QR-код камерой", "Подтвердите подключение"],
    },
    wifi: {
      icon: Globe,
      title: "Wi-Fi Direct",
      description: "Прямое Wi-Fi соединение для удаленного доступа",
      steps: ["Подключитесь к Wi-Fi сети устройства", "Введите пароль", "Синхронизируйте данные"],
    },
  };

  const config = type ? configs[type] : configs.bluetooth;
  const Icon = config.icon;

  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-cyan-glow" />
        </div>
        <div>
          <h4 className="font-medium text-white">{config.title}</h4>
          <p className="text-xs text-water-200/60">{config.description}</p>
        </div>
      </div>
      
      <div className="text-xs text-water-200/50 mb-3">
        Будет доступно в мобильном приложении после получения устройства
      </div>
      
      <div className="space-y-2">
        {config.steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">
              {i + 1}
            </span>
            <span className="text-water-200/70">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState<Project>(mockProject); // Using mock for UI development
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "rewards">("overview");
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [tierQuantities, setTierQuantities] = useState<Record<string, number>>({});
  const [isPreordering, setIsPreordering] = useState(false);

  useEffect(() => {
    // Simulate API load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [params.slug]);

  const handleQuantityChange = (tierId: string, delta: number) => {
    setTierQuantities(prev => ({
      ...prev,
      [tierId]: Math.max(1, (prev[tierId] || 1) + delta)
    }));
  };

  const handlePreorder = async () => {
    if (!selectedTier) return;
    setIsPreordering(true);
    // TODO: API call
    await new Promise(r => setTimeout(r, 1500));
    setIsPreordering(false);
    alert("Pre-order placed successfully!");
  };

  const selectedTierData = project.preorderTiers.find(t => t.id === selectedTier);
  const totalPrice = selectedTierData 
    ? selectedTierData.price * (tierQuantities[selectedTier] || 1)
    : 0;

  if (isLoading) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-glow animate-spin" />
      </main>
    );
  }

  const status = statusLabels[project.status];
  const fundingProgress = (project.preorderRaised / project.preorderGoal) * 100;

  return (
    <main className="min-h-screen pt-20 pb-8">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-mid to-ocean-deep" />
        {project.coverImage && (
          <img src={project.coverImage} alt={project.name} className="w-full h-full object-cover opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            <Link href="/projecthub" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition">
              <ArrowLeft className="w-4 h-4" />
              Назад к проектам
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.name}</h1>
            <p className="text-lg text-water-200/80 max-w-2xl">{project.tagline}</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-4 flex flex-wrap items-center gap-4"
            >
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.color}`}>
                {status.label}
              </span>
              <span className="text-sm text-water-200/60">{project.categoryLabel}</span>
              <span className="text-sm text-water-200/60 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {project.timeline}
              </span>
              <span className="text-sm text-water-200/60 flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {project.budget}
              </span>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-2">
              {[
                { id: "overview", label: "Обзор", icon: Target },
                { id: "specs", label: "Характеристики", icon: FileText },
                { id: "rewards", label: "Награды", icon: Award },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === tab.id
                      ? "bg-water-500/20 text-water-400"
                      : "text-water-200/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Description */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">О проекте</h3>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-water-200/80 whitespace-pre-line">{project.longDescription}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Возможности</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {project.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-water-200/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Команда</h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {project.team.map((member, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep font-bold">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-white">{member.name}</div>
                            <div className="text-sm text-water-200/60">{member.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "specs" && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Технические характеристики</h3>
                    <div className="grid gap-2">
                      {Object.entries(project.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                          <span className="text-water-200/60">{key}</span>
                          <span className="text-white font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "rewards" && (
                <motion.div
                  key="rewards"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Staking Info */}
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Gem className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Стейкинг в проект</h3>
                        <p className="text-sm text-water-200/60">Поддержите разработку и получите награды</p>
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-3 gap-4 mb-4">
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-purple-400">12-18%</div>
                        <div className="text-xs text-water-200/50">APY</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-white">$100</div>
                        <div className="text-xs text-water-200/50">Минимум</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-white">30-365 дн</div>
                        <div className="text-xs text-water-200/50">Срок</div>
                      </div>
                    </div>

                    <Link 
                      href={`/staking?project=${project.slug}`}
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Застейкать в проект
                    </Link>
                  </div>

                  {/* Device Integration */}
                  {project.hasDevice && (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                          <Bluetooth className="w-5 h-5 text-cyan-glow" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">Подключение устройства</h3>
                          <p className="text-sm text-water-200/60">{project.deviceName}</p>
                        </div>
                      </div>
                      
                      <DeviceConnectionInfo type={project.connectionType} />
                      
                      <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-blue-200/80">
                            Полная интеграция с устройством будет доступна в мобильном приложении 
                            после его официального запуска. Сейчас вы можете сделать предзаказ.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pre-order Card */}
            {project.preorderEnabled && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Предзаказ
                </h3>

                {/* Funding Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-water-200/60">Собрано</span>
                    <span className="text-white">${project.preorderRaised.toLocaleString()} / ${project.preorderGoal.toLocaleString()}</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-glow to-emerald-400 rounded-full transition-all"
                      style={{ width: `${fundingProgress}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-cyan-glow mt-1">
                    {fundingProgress.toFixed(0)}% цели
                  </div>
                </div>

                {/* Tiers */}
                <div className="space-y-3 mb-6">
                  {project.preorderTiers.map((tier) => (
                    <PreorderTierCard
                      key={tier.id}
                      tier={tier}
                      selected={selectedTier === tier.id}
                      onSelect={() => setSelectedTier(tier.id)}
                      quantity={tierQuantities[tier.id] || 1}
                      onQuantityChange={(delta) => handleQuantityChange(tier.id, delta)}
                    />
                  ))}
                </div>

                {/* Total & CTA */}
                {selectedTier && (
                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-water-200/70">Итого:</span>
                      <span className="text-2xl font-bold text-white">${totalPrice}</span>
                    </div>
                    <button
                      onClick={handlePreorder}
                      disabled={isPreordering}
                      className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isPreordering ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Оформление...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Оформить предзаказ
                        </>
                      )}
                    </button>
                    <p className="text-xs text-water-200/50 text-center mt-3">
                      Оплата будет списана при начале производства
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Прогресс</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-water-200/60">Готовность</span>
                  <span className="text-white">{project.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-water-400 to-cyan-glow rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Прототип готов</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>Тестирование</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Clock className="w-4 h-4" />
                  <span>Сертификация</span>
                </div>
                <div className="flex items-center gap-2 text-water-200/40">
                  <div className="w-4 h-4 rounded-full border border-white/20" />
                  <span>Производство</span>
                </div>
              </div>
            </motion.div>

            {/* Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Поделиться</h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="btn-secondary text-sm flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Скопировать
                </button>
                <button className="btn-secondary text-sm flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Twitter
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
