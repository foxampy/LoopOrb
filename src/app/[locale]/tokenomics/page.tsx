"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Droplets, Shield, TrendingUp, Lock, Database, Globe,
  Users, Award, Zap, PieChart, ArrowRight, CheckCircle2,
  Activity, Gem, Coins, Cpu, Wallet, Clock,
  ChevronDown, ChevronUp, AlertCircle, BarChart3
} from "lucide-react";

// --- THREE TOKEN SYSTEM ---
const tokens = [
  {
    id: "vod",
    name: "VOD",
    fullName: "Water Commodity Token",
    type: "Commodity",
    description: "Право на 1 м³ верифицированной воды. Эмитируется только при верификации физического объёма.",
    icon: Droplets,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/20",
    textColor: "text-cyan-400",
    supply: "Неограниченная",
    backing: "1 м³ воды в лицензированном хранилище",
    emission: "Только при верификации физического объёма",
    holders: "Операторы, граждане, инвесторы",
    useCases: [
      "Оплата 1 м³ воды (1 VOD = 1 м³)",
      "Стейкинг в инфраструктурные проекты",
      "Торговля на TokenHub",
      "Оплата услуг экосистемы"
    ],
    mechanics: [
      "Эмиссия = Объём × Качество данных × Актуальность × Репутация",
      "Налог на хранение: 2% годовых (стимул к использованию)",
      "Regional caps: макс 10% ресурсов региона на 1 holder",
      "Сжигание при выкупе воды или услуг"
    ]
  },
  {
    id: "vodeco",
    name: "VODeco",
    fullName: "Governance Token",
    type: "Governance",
    description: "Токен управления DAO. Фиксированная эмиссия. Дает право голоса и участия в валидации.",
    icon: Shield,
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-500/20",
    textColor: "text-emerald-400",
    supply: "1,000,000,000 (фиксированная)",
    backing: "Репутация + стейк в экосистеме",
    emission: "Фиксированная, полностью разморожена к 2027",
    holders: "DAO-участники, валидаторы, инвесторы",
    useCases: [
      "Голосование в DAO (L1-L4 решения)",
      "Стейкинг для Validator Node (100,000 VODeco)",
      "Делегирование голосов",
      "Участие в квадратичном голосовании"
    ],
    mechanics: [
      "Стейк для валидаторов: 100,000 VODeco",
      "Слэшинг за недобросовестность",
      "Награды пропорционально стейку и uptime",
      "Право вето у Government SBT на критической инфраструктуре"
    ]
  },
  {
    id: "vodcredit",
    name: "VODcredit",
    fullName: "Reputation SBT",
    type: "Reputation (SBT)",
    description: "Нетрансферабельный токен репутации. Начисляется за вклад в экосистему.",
    icon: Award,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/20",
    textColor: "text-amber-400",
    supply: "Неограниченная",
    backing: "Вклад в экосистему (данные, валидация, разработка)",
    emission: "Алгоритмически за полезные действия",
    holders: "Все участники экосистемы",
    useCases: [
      "Повышение репутации в DAO",
      "Увеличенные награды за данные",
      "Доступ к привилегированным функциям",
      "Кэшбэк и бонусы в экосистеме"
    ],
    mechanics: [
      "Нельзя продать или передать (Soulbound)",
      "Начисляется за данные, валидацию, обучение",
      "Влияет на множитель эмиссии VOD",
      "Может быть снижен за недобросовестность"
    ]
  }
];

// --- TOKEN ALLOCATION ---
const allocation = [
  { category: "Water Reserve", percentage: 35, amount: "350M VODeco", color: "#00d4ff", desc: "Физическое обеспечение водными ресурсами" },
  { category: "R&D Treasury", percentage: 25, amount: "250M VODeco", color: "#7c3aed", desc: "Финансирование проектов TokenHub" },
  { category: "Community", percentage: 15, amount: "150M VODeco", color: "#10b981", desc: "Стимулы, аирдропы, награды" },
  { category: "Team & Foundation", percentage: 12, amount: "120M VODeco", color: "#f59e0b", desc: "Команда и фонд развития (вестинг 4 года)" },
  { category: "Early Investors", percentage: 8, amount: "80M VODeco", color: "#ef4444", desc: "Pre-seed и Seed раунды (вестинг 2 года)" },
  { category: "Liquidity", percentage: 3, amount: "30M VODeco", color: "#6366f1", desc: "Ликвидность и маркет-мейкинг" },
  { category: "DAO Treasury", percentage: 2, amount: "20M VODeco", color: "#ec4899", desc: "Казна управления" },
];

// --- EMISSION FORMULA ---
function EmissionFormula() {
  const [volume, setVolume] = useState(10000);
  const [quality, setQuality] = useState(0.95);
  const [actuality, setActuality] = useState(1.0);
  const [reputation, setReputation] = useState(1.2);

  const emission = Math.round(volume * quality * actuality * reputation);

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-cyan-400" />
        Формула эмиссии VOD
      </h3>

      <div className="p-4 bg-slate-900/50 rounded-xl mb-6 font-mono text-sm text-cyan-400">
        EMISSION = Объём × Качество × Актуальность × Репутация
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Объём воды (м³)</label>
          <input
            type="number"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
          />
        </div>
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Качество данных (0-1)</label>
          <input
            type="range"
            min="0.5"
            max="1"
            step="0.05"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full mt-3 accent-cyan-500"
          />
          <div className="text-center text-cyan-400 font-mono mt-1">{quality.toFixed(2)}</div>
        </div>
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Актуальность</label>
          <select
            value={actuality}
            onChange={(e) => setActuality(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
          >
            <option value={1.0}>Real-time (1.0)</option>
            <option value={0.5}>Часовая задержка (0.5)</option>
            <option value={0.1}>Сутки (0.1)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Репутация оператора</label>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={reputation}
            onChange={(e) => setReputation(Number(e.target.value))}
            className="w-full mt-3 accent-cyan-500"
          />
          <div className="text-center text-cyan-400 font-mono mt-1">{reputation.toFixed(1)}x</div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-xl border border-cyan-500/30 text-center">
        <div className="text-sm text-water-200/50 mb-2">Эмиссия VOD</div>
        <div className="text-4xl font-black text-cyan-400">{emission.toLocaleString()} VOD</div>
        <div className="text-sm text-water-200/50 mt-2">за {volume.toLocaleString()} м³ верифицированной воды</div>
      </div>
    </div>
  );
}

// --- TOKEN CARD ---
function TokenCard({ token, isActive, onClick }: { token: typeof tokens[0]; isActive: boolean; onClick: () => void }) {
  const Icon = token.icon;

  return (
    <motion.div
      layout
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 ${
        isActive ? "md:col-span-2 lg:col-span-3" : ""
      }`}
    >
      <div className={`glass-card p-6 h-full hover:border-cyan-500/30 transition-all ${
        isActive ? "border-cyan-500/50" : ""
      }`}>
        <div className="flex items-start gap-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${token.color} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-bold text-white">{token.name}</h3>
              <span className={`px-2 py-0.5 rounded text-xs ${token.bgColor} ${token.textColor}`}>
                {token.type}
              </span>
            </div>
            <p className="text-sm text-water-200/50">{token.fullName}</p>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-lg transition">
            {isActive ? <ChevronUp className="w-5 h-5 text-water-200/50" /> : <ChevronDown className="w-5 h-5 text-water-200/50" />}
          </button>
        </div>

        <p className="text-water-200/70 mt-4">{token.description}</p>

        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-white/10"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Параметры</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-water-200/50">Эмиссия</span>
                      <span className="text-white">{token.supply}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-water-200/50">Обеспечение</span>
                      <span className="text-white">{token.backing}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-water-200/50">Механизм</span>
                      <span className="text-white">{token.emission}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-water-200/50">Держатели</span>
                      <span className="text-white">{token.holders}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Использование</h4>
                  <ul className="space-y-2">
                    {token.useCases.map((use, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-water-200/70">
                        <CheckCircle2 className={`w-4 h-4 ${token.textColor} flex-shrink-0 mt-0.5`} />
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/5 rounded-xl">
                <h4 className="text-sm font-semibold text-white mb-3">Механика</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {token.mechanics.map((mech, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-water-200/60">
                      <Zap className={`w-4 h-4 ${token.textColor} flex-shrink-0 mt-0.5`} />
                      {mech}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// --- ALLOCATION CHART ---
function AllocationChart() {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  const total = allocation.reduce((sum, item) => sum + item.percentage, 0);
  let currentAngle = 0;
  const segments = allocation.map((item) => {
    const startAngle = currentAngle;
    const endAngle = currentAngle + (item.percentage / total) * 360;
    currentAngle = endAngle;
    return { ...item, startAngle, endAngle };
  });

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <PieChart className="w-5 h-5 text-cyan-400" />
        Распределение VODeco
      </h3>

      <div className="grid md:grid-cols-2 gap-8">
        {/* SVG Pie Chart */}
        <div className="relative w-full max-w-xs mx-auto aspect-square">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            {segments.map((segment, index) => {
              const startRad = (segment.startAngle * Math.PI) / 180;
              const endRad = (segment.endAngle * Math.PI) / 180;
              const x1 = 100 + 80 * Math.cos(startRad);
              const y1 = 100 + 80 * Math.sin(startRad);
              const x2 = 100 + 80 * Math.cos(endRad);
              const y2 = 100 + 80 * Math.sin(endRad);
              const largeArc = segment.endAngle - segment.startAngle > 180 ? 1 : 0;

              return (
                <motion.path
                  key={segment.category}
                  d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={segment.color}
                  stroke="#0f172a"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: hoveredSlice === index ? 1 : 0.85, scale: hoveredSlice === index ? 1.05 : 1 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredSlice(index)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className="cursor-pointer"
                  style={{ transformOrigin: "100px 100px" }}
                />
              );
            })}
            <circle cx="100" cy="100" r="40" fill="#0f172a" />
            <text x="100" y="95" textAnchor="middle" className="fill-slate-400 text-xs">SUPPLY</text>
            <text x="100" y="110" textAnchor="middle" className="fill-cyan-400 text-sm font-bold">1B</text>
          </svg>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {allocation.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                hoveredSlice === index ? "bg-slate-800 border-cyan-500/30" : "bg-white/5 border-white/10"
              }`}
              onMouseEnter={() => setHoveredSlice(index)}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white text-sm">{item.category}</span>
                  <span className="font-mono text-cyan-400">{item.percentage}%</span>
                </div>
                <div className="text-xs text-water-200/50">{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- DAO LEVELS ---
function DAOLevels() {
  const levels = [
    { level: "L1", name: "Constitutional", topic: "Изменение правил эмиссии", quorum: "66% VODeco + 51% валидаторов", mechanism: "Мультиподпись + 30 дней", time: "30 дней" },
    { level: "L2", name: "Economic", topic: "Параметры стейкинга, налогов", quorum: "51% VODeco", mechanism: "Прямое голосование", time: "7 дней" },
    { level: "L3", name: "Projects", topic: "Инвестиции, распределение", quorum: "40% VODeco + репутация", mechanism: "Квадратичное голосование", time: "14 дней" },
    { level: "L4", name: "Operational", topic: "Гранты, награды", quorum: "Делегаты", mechanism: "Жидкая демократия", time: "3 дня" },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Shield className="w-5 h-5 text-cyan-400" />
        Уровни DAO
      </h3>

      <div className="grid gap-4">
        {levels.map((l, index) => (
          <motion.div
            key={l.level}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400 font-bold">{l.level}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-white">{l.name}</h4>
                  <span className="text-xs text-water-200/50">• {l.topic}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-water-200/50">Кворум:</span>
                    <span className="text-white ml-1">{l.quorum}</span>
                  </div>
                  <div>
                    <span className="text-water-200/50">Механизм:</span>
                    <span className="text-white ml-1">{l.mechanism}</span>
                  </div>
                  <div>
                    <span className="text-water-200/50">Срок:</span>
                    <span className="text-white ml-1">{l.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// --- MAIN PAGE ---
export default function TokenomicsPage() {
  const t = useTranslations("tokenomics");
  const [activeToken, setActiveToken] = useState<string>("vod");

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
              <Coins className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-medium">{t("title")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-water-200/70 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* Three Tokens */}
          <div className="grid gap-6 mb-8">
            {tokens.map((token) => (
              <TokenCard
                key={token.id}
                token={token}
                isActive={activeToken === token.id}
                onClick={() => setActiveToken(activeToken === token.id ? "" : token.id)}
              />
            ))}
          </div>

          {/* Emission Formula & Allocation */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <EmissionFormula />
            <AllocationChart />
          </div>

          {/* DAO Levels */}
          <div className="mb-8">
            <DAOLevels />
          </div>

          {/* Ecosystem Integration Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6 text-cyan-400" />
              Взаимосвязанная экосистема
            </h2>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-slate-900/50 rounded-xl border border-cyan-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Database className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">ProjectHub</h3>
                    <p className="text-xs text-water-200/50">16 R&D проектов</p>
                  </div>
                </div>
                <p className="text-sm text-water-200/70 mb-4">
                  R&D инициативы от концепции до продакшена. Каждый проект проходит 
                  стадии верификации и может получить финансирование через TokenHub.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded">Hardware</span>
                  <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded">AI/ML</span>
                  <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded">Community</span>
                </div>
              </div>

              <div className="p-6 bg-slate-900/50 rounded-xl border border-emerald-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Coins className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">TokenHub</h3>
                    <p className="text-xs text-water-200/50">Инвестиции & DeFi</p>
                  </div>
                </div>
                <p className="text-sm text-water-200/70 mb-4">
                  B2I интерфейс для инвестирования в R&D проекты. Стейкинг с APY 8-32%, 
                  DEX-интеграция для обмена токенов, ликвидность для VOD/VODeco.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded">Стейкинг</span>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded">DEX</span>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded">Liquidity</span>
                </div>
              </div>

              <div className="p-6 bg-slate-900/50 rounded-xl border border-amber-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">DAO Governance</h3>
                    <p className="text-xs text-water-200/50">4 уровня решений</p>
                  </div>
                </div>
                <p className="text-sm text-water-200/70 mb-4">
                  Децентрализованное управление через VODeco. От конституционных решений 
                  до операционных — все прозрачно и верифицируемо на блокчейне.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded">L1-L4</span>
                  <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded">Voting</span>
                  <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded">Validators</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-cyan-500/5 via-emerald-500/5 to-amber-500/5 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Потоки стоимости</h3>
              <div className="grid md:grid-cols-5 gap-4 text-center">
                <div className="p-4">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-medium text-white text-sm">Данные</div>
                  <div className="text-xs text-water-200/50">Сенсоры IoT</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="p-4">
                  <div className="text-2xl mb-2">💧</div>
                  <div className="font-medium text-white text-sm">VOD</div>
                  <div className="text-xs text-water-200/50">Эмиссия</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="p-4">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="font-medium text-white text-sm">VODeco</div>
                  <div className="text-xs text-water-200/50">Гovernance</div>
                </div>
              </div>
              <div className="flex justify-center my-2">
                <ArrowRight className="w-5 h-5 text-cyan-400 rotate-90" />
              </div>
              <div className="grid md:grid-cols-5 gap-4 text-center">
                <div className="p-4">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="font-medium text-white text-sm">VODcredit</div>
                  <div className="text-xs text-water-200/50">Репутация</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-cyan-400 rotate-180" />
                </div>
                <div className="p-4">
                  <div className="text-2xl mb-2">🚀</div>
                  <div className="font-medium text-white text-sm">R&D</div>
                  <div className="text-xs text-water-200/50">ProjectHub</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-cyan-400 rotate-180" />
                </div>
                <div className="p-4">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="font-medium text-white text-sm">TokenHub</div>
                  <div className="text-xs text-water-200/50">Инвестиции</div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="font-medium text-white text-sm">Water-Backed</div>
                  <div className="text-xs text-water-200/50">Каждый VOD обеспечен 1м³ воды</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="font-medium text-white text-sm">Transparent</div>
                  <div className="text-xs text-water-200/50">Все операции на блокчейне</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="font-medium text-white text-sm">Sustainable</div>
                  <div className="text-xs text-water-200/50">ESG-ориентированная модель</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {t("cta.title")}
            </h3>
            <p className="text-water-200/70 mb-6 max-w-2xl mx-auto">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/tokenhub" className="btn-primary flex items-center gap-2">
                <Gem className="w-5 h-5" />
                {t("cta.invest")}
              </Link>
              <Link href="/staking" className="btn-secondary flex items-center gap-2">
                <Lock className="w-5 h-5" />
                {t("cta.stake")}
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
