"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Wallet, TrendingUp, Lock, Unlock, Droplets, Shield,
  Zap, Award, Globe, ChevronRight, ArrowUpRight,
  BarChart3, Users, Gem, AlertCircle, CheckCircle2,
  Target, Clock, Percent, Coins, Database, Radio,
  Cpu, Activity, Filter, Search, SlidersHorizontal,
  ArrowRight, Plus, Minus, FileText, PieChart,
  Link as LinkIcon, RefreshCw
} from "lucide-react";

// --- INVESTMENT PROJECTS DATA ---
const investmentProjects = [
  {
    id: "vod-lab-node",
    name: "VOD-Lab Node",
    category: "R&D / Hardware",
    description: "Автономный лабораторный узел с автоматическим анализатором воды. 100+ параметров, спектрофотометр, картриджная система.",
    status: "active", // active, fundraising, completed
    fundingGoal: 500000,
    funded: 320000,
    apy: "15-25%",
    minStake: 1000,
    lockPeriod: "12 месяцев",
    riskLevel: "medium",
    backers: 234,
    image: "lab",
    specs: {
      parameters: "100+",
      accuracy: "±2%",
      autonomy: "3 дня",
      lifespan: "10 лет"
    },
    emissions: "10 VOD/м³ верифицированной воды",
    features: [
      "UV-Vis-NIR спектрофотометр",
      "Картриджная система (12 слотов)",
      "Edge AI для верификации",
      "Автоматическая калибровка",
      "Блокчейн-нода VOD Chain"
    ]
  },
  {
    id: "aquacell-pro",
    name: "AquaCell Pro",
    category: "Hardware / IoT",
    description: "Промышленный сенсор для операторов водоканалов. Мониторинг 20+ параметров в реальном времени.",
    status: "fundraising",
    fundingGoal: 350000,
    funded: 180000,
    apy: "12-18%",
    minStake: 500,
    lockPeriod: "6 месяцев",
    riskLevel: "low",
    backers: 156,
    image: "sensor",
    specs: {
      parameters: "20+",
      accuracy: "±1%",
      autonomy: "72 часа",
      lifespan: "5 лет"
    },
    emissions: "5 VOD/м³",
    features: [
      "IP68 защита",
      "LoRaWAN + 4G связь",
      "Солнечная панель",
      "HSM шифрование",
      "Автоматические обновления"
    ]
  },
  {
    id: "ai-prediction-engine",
    name: "AI Prediction Engine",
    category: "Software / AI",
    description: "ML-модели прогнозирования качества воды. Раннее обнаружение аномалий, предсказание аварий за 72 часа.",
    status: "active",
    fundingGoal: 800000,
    funded: 520000,
    apy: "18-32%",
    minStake: 2000,
    lockPeriod: "18 месяцев",
    riskLevel: "high",
    backers: 89,
    image: "ai",
    specs: {
      accuracy: ">85%",
      horizon: "72 часа",
      models: "50+",
      latency: "<100ms"
    },
    emissions: "Бонус за точность прогнозов",
    features: [
      "Deep Learning модели",
      "Real-time inference",
      "Ансамблевые прогнозы",
      "Интеграция с IoT",
      "API для разработчиков"
    ]
  },
  {
    id: "blockchain-registry",
    name: "Blockchain Water Registry",
    category: "Infrastructure",
    description: "Неподкупный реестр водных ресурсов на блокчейне. NFT-паспорта источников, смарт-контракты, верификация.",
    status: "active",
    fundingGoal: 750000,
    funded: 620000,
    apy: "10-15%",
    minStake: 1000,
    lockPeriod: "12 месяцев",
    riskLevel: "low",
    backers: 312,
    image: "blockchain",
    specs: {
      tps: "10000",
      latency: "<1s",
      nodes: "50+",
      sources: "1000+"
    },
    emissions: "5 VOD/запись",
    features: [
      "Мультичейн архитектура (TON/Ethereum)",
      "IPFS хранение",
      "SBT для репутации",
      "DAO управление",
      "Открытый API"
    ]
  },
  {
    id: "vod-expedition",
    name: "VOD-Expedition Kit",
    category: "R&D / Mobile",
    description: "Портативная лаборатория для полевых исследований. 50+ параметров в чемодане Pelican Case.",
    status: "fundraising",
    fundingGoal: 400000,
    funded: 280000,
    apy: "14-22%",
    minStake: 800,
    lockPeriod: "9 месяцев",
    riskLevel: "medium",
    backers: 178,
    image: "expedition",
    specs: {
      parameters: "50+",
      weight: "12 кг",
      battery: "8 часов",
      lifespan: "7 лет"
    },
    emissions: "8 VOD/м³",
    features: [
      "UV-Vis спектрофотометр",
      "Микробиологический анализ",
      "GPS привязка данных",
      "Offline работа",
      "Синхронизация с облаком"
    ]
  },
  {
    id: "leak-detection-network",
    name: "Leak Detection Network",
    category: "IoT / Infrastructure",
    description: "Сеть акустических датчиков для обнаружения утечек в трубопроводах. Точность до 10 метров.",
    status: "active",
    fundingGoal: 600000,
    funded: 290000,
    apy: "13-20%",
    minStake: 600,
    lockPeriod: "12 месяцев",
    riskLevel: "medium",
    backers: 67,
    image: "network",
    specs: {
      coverage: "10 км",
      accuracy: "±10 м",
      reaction: "<1 мин",
      battery: "5 лет"
    },
    emissions: "Бонус за экономию воды",
    features: [
      "Акустическое обнаружение",
      "LoRaWAN mesh сеть",
      "AI классификация утечек",
      "SCADA интеграция",
      "Автоматические алерты"
    ]
  },
  {
    id: "rural-water-pilot",
    name: "Rural Water Access Pilot",
    category: "Community / Social",
    description: "Пилотный проект обеспечения водой сельских районов. 500 установок в 12 странах.",
    status: "fundraising",
    fundingGoal: 500000,
    funded: 420000,
    apy: "8-12%",
    minStake: 100,
    lockPeriod: "24 месяца",
    riskLevel: "low",
    backers: 890,
    image: "community",
    specs: {
      installations: "500",
      countries: "12",
      people: "50000+",
      cost: "< $50"
    },
    emissions: "20 VOD/установка",
    features: [
      "Солнечная энергия",
      "Без электросети",
      "Локальное обслуживание",
      "Мониторинг качества",
      "Женские кооперативы"
    ]
  },
  {
    id: "climate-impact-model",
    name: "Climate Impact Analysis",
    category: "R&D / Science",
    description: "Моделирование влияния изменения климата на водные ресурсы. Горизонт 50 лет.",
    status: "fundraising",
    fundingGoal: 1200000,
    funded: 380000,
    apy: "10-16%",
    minStake: 1500,
    lockPeriod: "36 месяцев",
    riskLevel: "high",
    backers: 45,
    image: "climate",
    specs: {
      horizon: "50 лет",
      accuracy: "±5%",
      models: "IPCC + ML",
      regions: "Глобально"
    },
    emissions: "По запросу",
    features: [
      "IPCC модели",
      "ML-прогнозирование",
      "Риск-анализ",
      "Отчеты для ООН",
      "Научные публикации"
    ]
  }
];

// --- STAKING TIERS FOR TOKENHUB ---
const stakingTiers = [
  {
    name: "Explorer",
    minAmount: 1000,
    maxAmount: 9999,
    baseApy: 8,
    color: "from-slate-600 to-slate-500",
    icon: "🔍",
    description: "Базовый уровень для новых инвесторов"
  },
  {
    name: "Guardian",
    minAmount: 10000,
    maxAmount: 99999,
    baseApy: 12,
    color: "from-cyan-500 to-emerald-500",
    icon: "🛡️",
    featured: true,
    description: "Оптимальный баланс риска и доходности"
  },
  {
    name: "Validator",
    minAmount: 100000,
    maxAmount: null,
    baseApy: 18,
    color: "from-amber-500 to-orange-500",
    icon: "⚡",
    description: "Максимальные награды для крупных стейкеров"
  }
];

// --- PROJECT CARD COMPONENT ---
function ProjectCard({ project, index }: { project: typeof investmentProjects[0]; index: number }) {
  const progress = (project.funded / project.fundingGoal) * 100;
  const statusColors: Record<string, string> = {
    active: "bg-emerald-500",
    fundraising: "bg-amber-500",
    completed: "bg-blue-500"
  };
  const statusLabels: Record<string, string> = {
    active: "Активен",
    fundraising: "Сбор средств",
    completed: "Завершён"
  };
  const riskLabels: Record<string, { text: string; color: string }> = {
    low: { text: "Низкий", color: "text-emerald-400" },
    medium: { text: "Средний", color: "text-amber-400" },
    high: { text: "Высокий", color: "text-red-400" }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group"
    >
      {/* Header Gradient */}
      <div className={`h-2 bg-gradient-to-r ${
        project.category.includes("Hardware") ? "from-cyan-500 to-blue-500" :
        project.category.includes("AI") ? "from-pink-500 to-purple-500" :
        project.category.includes("Community") ? "from-amber-500 to-orange-500" :
        "from-emerald-500 to-teal-500"
      }`} />

      <div className="p-6">
        {/* Top Row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xs text-water-200/50 uppercase tracking-wider">{project.category}</span>
            <h3 className="text-xl font-bold text-white mt-1 group-hover:text-cyan-400 transition">{project.name}</h3>
          </div>
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-800`}>
            <div className={`w-2 h-2 rounded-full ${statusColors[project.status]} animate-pulse`} />
            <span className="text-xs text-water-200/70">{statusLabels[project.status]}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-water-200/70 mb-4 line-clamp-2">{project.description}</p>

        {/* Specs */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {Object.entries(project.specs).slice(0, 4).map(([key, value]) => (
            <div key={key} className="bg-white/5 rounded-lg p-2 text-center">
              <div className="text-xs text-water-200/50 capitalize">{key}</div>
              <div className="text-sm font-semibold text-white">{value}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.features.slice(0, 3).map((feature, i) => (
            <span key={i} className="px-2 py-0.5 bg-white/5 rounded text-xs text-water-200/60">
              {feature}
            </span>
          ))}
          {project.features.length > 3 && (
            <span className="px-2 py-0.5 bg-white/5 rounded text-xs text-water-200/40">
              +{project.features.length - 3}
            </span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-water-200/50">Собрано</span>
            <span className="text-white">{progress.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
            />
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-cyan-400">${project.funded.toLocaleString()}</span>
            <span className="text-water-200/50">${project.fundingGoal.toLocaleString()}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-b border-white/10">
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-400">{project.apy}</div>
            <div className="text-xs text-water-200/50">APY</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-white">{project.minStake.toLocaleString()}</div>
            <div className="text-xs text-water-200/50">Мин. стейк</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${riskLabels[project.riskLevel].color}`}>
              {riskLabels[project.riskLevel].text}
            </div>
            <div className="text-xs text-water-200/50">Риск</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-water-200/50">
            <Users className="w-4 h-4" />
            <span>{project.backers} инвесторов</span>
          </div>
          <Link
            href={`/tokenhub/${project.id}`}
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition"
          >
            Инвестировать
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// --- CALCULATOR COMPONENT ---
function StakingCalculator() {
  const [amount, setAmount] = useState(10000);
  const [duration, setDuration] = useState(12);
  const [tier, setTier] = useState(stakingTiers[1]);

  useEffect(() => {
    const newTier = stakingTiers.find(
      (t) => amount >= t.minAmount && (t.maxAmount === null || amount <= t.maxAmount)
    ) || stakingTiers[0];
    setTier(newTier);
  }, [amount]);

  const durationBonus = Math.min((duration / 12) * 4, 10);
  const amountBonus = amount >= 100000 ? 5 : amount >= 50000 ? 3 : amount >= 10000 ? 2 : 0;
  const estimatedApy = tier.baseApy + durationBonus + amountBonus;
  const annualYield = (amount * estimatedApy) / 100;

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Zap className="w-5 h-5 text-cyan-400" />
        Калькулятор стейкинга
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Сумма (UNITY)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
            min="1000"
            step="100"
          />
          <input
            type="range"
            min="1000"
            max="500000"
            step="1000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full mt-3 accent-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Срок (месяцев)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
            min="1"
            max="36"
          />
          <input
            type="range"
            min="1"
            max="36"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full mt-3 accent-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/5 rounded-xl">
        <div className="text-center">
          <div className="text-sm text-water-200/50 mb-1">Уровень</div>
          <div className="text-lg font-bold text-cyan-400">{tier.name}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-water-200/50 mb-1">APY</div>
          <div className="text-2xl font-bold text-emerald-400">{estimatedApy}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-water-200/50 mb-1">Годовой доход</div>
          <div className="text-lg font-bold text-white">{annualYield.toLocaleString()} UNITY</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-water-200/50 mb-1">Доход за {duration} мес</div>
          <div className="text-lg font-bold text-cyan-400">
            {(annualYield * (duration / 12)).toLocaleString()} UNITY
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE ---
export default function TokenHubPage() {
  const t = useTranslations("tokenhub");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: t("filters.all"), count: investmentProjects.length },
    { id: "hardware", label: t("filters.hardware"), count: investmentProjects.filter(p => p.category.includes("Hardware")).length },
    { id: "software", label: t("filters.software"), count: investmentProjects.filter(p => p.category.includes("Software")).length },
    { id: "community", label: t("filters.community"), count: investmentProjects.filter(p => p.category.includes("Community")).length },
  ];

  const filteredProjects = investmentProjects.filter(project => {
    const matchesCategory = activeCategory === "all" || 
      (activeCategory === "hardware" && project.category.includes("Hardware")) ||
      (activeCategory === "software" && project.category.includes("Software")) ||
      (activeCategory === "community" && project.category.includes("Community"));
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalFunded = investmentProjects.reduce((sum, p) => sum + p.funded, 0);
  const totalGoal = investmentProjects.reduce((sum, p) => sum + p.fundingGoal, 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
              <Gem className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">TokenHub</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("title").split(" ").slice(0, 2).join(" ")} <span className="gradient-text">{t("title").split(" ").slice(2).join(" ")}</span>
            </h1>
            <p className="text-lg text-water-200/70 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: t("stats.totalRaised"), value: `$${(totalFunded / 1000000).toFixed(1)}M`, icon: Wallet },
              { label: t("stats.goal"), value: `$${(totalGoal / 1000000).toFixed(1)}M`, icon: Target },
              { label: t("stats.activeProjects"), value: investmentProjects.filter(p => p.status === "active").length.toString(), icon: Activity },
              { label: t("stats.investors"), value: "2,451", icon: Users },
            ].map((stat, index) => (
              <div key={stat.label} className="glass-card p-4 text-center">
                <stat.icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-water-200/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Calculator */}
          <div className="mb-8">
            <StakingCalculator />
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-cyan-500 text-slate-900"
                      : "bg-white/5 text-water-200/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat.label}
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat.id ? "bg-slate-900/20" : "bg-white/10"
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
            <div className="relative flex-grow max-w-md ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-water-200/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("filters.search")}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-water-200/50 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">{t("howItWorks.title")}</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: t("howItWorks.step1.title"), desc: t("howItWorks.step1.desc"), icon: Search },
                { step: "2", title: t("howItWorks.step2.title"), desc: t("howItWorks.step2.desc"), icon: Lock },
                { step: "3", title: t("howItWorks.step3.title"), desc: t("howItWorks.step3.desc"), icon: TrendingUp },
                { step: "4", title: t("howItWorks.step4.title"), desc: t("howItWorks.step4.desc"), icon: Globe },
              ].map((item, index) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-water-200/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Implementation Standard Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 mt-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Стандарт реализации VOD Token Standard</h2>
                <p className="text-water-200/50">Техническая архитектура и интеграция с ProjectHub</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-cyan-400" />
                  Архитектура токенов
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "VOD (Commodity)", desc: "1 VOD = 1 м³ верифицированной воды. Эмиссия только при физической верификации", color: "cyan" },
                    { label: "VODeco (Governance)", desc: "Управление DAO, стейкинг для валидаторов, фиксированная эмиссия 1B", color: "emerald" },
                    { label: "VODcredit (SBT)", desc: "Репутация участников, нетрансферабельный, начисляется за вклад", color: "amber" },
                  ].map((token, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl">
                      <div className="font-semibold text-white mb-1">{token.label}</div>
                      <div className="text-sm text-water-200/60">{token.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-cyan-400" />
                  Интеграция с ProjectHub
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <div className="font-semibold text-white mb-2">ProjectHub → TokenHub Pipeline</div>
                    <p className="text-sm text-water-200/60 mb-3">
                      Проекты из ProjectHub (16 R&D инициатив) проходят через стадии: 
                      Concept → Prototype → Pilot → Production. На каждой стадии открывается 
                      возможность инвестирования через TokenHub.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">Concept: $100-500K</span>
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded">Prototype: $500K-2M</span>
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded">Production: $2M+</span>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl">
                    <div className="font-semibold text-white mb-2">Cross-Platform Rewards</div>
                    <p className="text-sm text-water-200/60">
                      Участие в проектах ProjectHub (данные, исследования) автоматически 
                      начисляет VODcredit → повышает множитель эмиссии VOD → увеличивает 
                      доходность инвестиций в TokenHub.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-cyan-400" />
                  Token Swaps
                </h4>
                <p className="text-sm text-water-200/60">
                  DEX-интеграция для обмена VOD ↔ VODeco. Ликвидность обеспечивается 
                  через пулы с APY 5-15%. Автоматические market makers для стабильности.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  Liquidity Pools
                </h4>
                <p className="text-sm text-water-200/60">
                  VOD/TON, VODeco/TON, VOD/VODeco пулы. TVL растёт пропорционально 
                  количеству верифицированных источников воды в сети.
                </p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  Security
                </h4>
                <p className="text-sm text-water-200/60">
                  Multi-sig контракты, аудит CertiK, HSM-модули для hardware-нод. 
                  Слэшинг за недобросовестность валидаторов.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tokenomics Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-8 mt-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <PieChart className="w-6 h-6 text-cyan-400" />
              Взаимосвязанная структура токеномики
            </h2>

            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/30">
                <div className="text-cyan-400 text-sm font-medium mb-2">Уровень 1</div>
                <h3 className="text-xl font-bold text-white mb-3">Вода (VOD)</h3>
                <p className="text-sm text-water-200/70 mb-4">
                  Базовый слой — физический актив. Каждый VOD backed 1м³ воды.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-water-200/50">Эмиссия</span>
                    <span className="text-cyan-400">Алгоритмическая</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-water-200/50">Налог</span>
                    <span className="text-cyan-400">2% годовых</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/30">
                <div className="text-emerald-400 text-sm font-medium mb-2">Уровень 2</div>
                <h3 className="text-xl font-bold text-white mb-3">Управление (VODeco)</h3>
                <p className="text-sm text-water-200/70 mb-4">
                  Голосование DAO, валидация, инвестиции в R&D через TokenHub.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-water-200/50">Эмиссия</span>
                    <span className="text-emerald-400">1B фикс</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-water-200/50">Стейк</span>
                    <span className="text-emerald-400">100K для валидатора</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/30">
                <div className="text-amber-400 text-sm font-medium mb-2">Уровень 3</div>
                <h3 className="text-xl font-bold text-white mb-3">Репутация (VODcredit)</h3>
                <p className="text-sm text-water-200/70 mb-4">
                  SBT токен за вклад. Влияет на эмиссию и привилегии.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-water-200/50">Тип</span>
                    <span className="text-amber-400">Soulbound</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-water-200/50">Начисление</span>
                    <span className="text-amber-400">За активность</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4">Взаимосвязь компонентов</h3>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl mb-2">💧</div>
                  <div className="font-semibold text-white">Данные</div>
                  <div className="text-xs text-water-200/50">Сенсоры → VODcredit</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="font-semibold text-white">Эмиссия</div>
                  <div className="text-xs text-water-200/50">VODcredit × Объём = VOD</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="text-3xl mb-2">🏛️</div>
                  <div className="font-semibold text-white">Управление</div>
                  <div className="text-xs text-water-200/50">VODeco + DAO</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <div className="text-3xl mb-2">🚀</div>
                  <div className="font-semibold text-white">Инвестиции</div>
                  <div className="text-xs text-water-200/50">TokenHub → R&D</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
