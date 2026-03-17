"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Droplets, Shield, Database, Globe, Cpu, Award, Zap,
  TrendingUp, Users, Target, Layers, Lock, Beaker, Radio,
  ArrowRight, ChevronRight, Calculator, Wallet, Coins,
  Gift, Share2, FlaskConical, Leaf, Rocket, Clock,
  CheckCircle2, ArrowUpRight, BarChart3, PieChart, Activity,
  FolderOpen, Trophy
} from "lucide-react";

// ==================== HERO SECTION ====================
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep via-ocean-mid to-ocean-deep" />
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-500" />
        </motion.div>
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-8 backdrop-blur-sm"
        >
          <Globe className="w-5 h-5 text-cyan-400" />
          <span className="text-sm text-cyan-400 font-medium">Интерактивный Litepaper 2.0</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
          LoopOrb
          <span className="block gradient-text">Экосистема Воды</span>
        </h1>

        <p className="text-xl text-water-200/80 max-w-3xl mx-auto mb-10 leading-relaxed">
          Глобальная платформа объединения науки, технологий и человечества
          для сохранения и управления водными ресурсами через блокчейн, IoT и DAO
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="#architecture" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
            Исследовать архитектуру
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="#calculator" className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
            <Calculator className="w-5 h-5" />
            Калькуляторы
          </Link>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { value: "4", label: "Уровня архитектуры", icon: Layers },
            { value: "3", label: "Токена в системе", icon: Coins },
            { value: "$520M", label: "Выручка к 2029", icon: TrendingUp },
            { value: "20M+", label: "Пользователей", icon: Users },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4 backdrop-blur-sm">
              <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-water-200/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-cyan-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ==================== ARCHITECTURE SECTION (4 LEVELS) ====================
function ArchitectureSection() {
  const [activeLevel, setActiveLevel] = useState<number | null>(0);

  const levels = [
    {
      id: 1,
      name: "Физика",
      subtitle: "Реальные активы",
      color: "cyan",
      gradient: "from-cyan-500 to-blue-500",
      icon: Droplets,
      description: "Без физического уровня нет эмиссии токенов, нет доверия, нет экосистемы",
      components: [
        { name: "Water Objects", desc: "Реки, озёра, водохранилища" },
        { name: "Infrastructure", desc: "Очистные сооружения" },
        { name: "Storage", desc: "Хранилища воды" },
        { name: "Legal", desc: "Юридические контракты" },
      ],
    },
    {
      id: 2,
      name: "Данные",
      subtitle: "Единый источник истины",
      color: "emerald",
      gradient: "from-emerald-500 to-green-500",
      icon: Database,
      description: "Все аудитории работают с одними и теми же верифицированными данными",
      components: [
        { name: "IoT Network", desc: "Сенсоры и лаборатории" },
        { name: "Satellite", desc: "Спутниковые данные" },
        { name: "Citizen Reports", desc: "Сообщения граждан" },
        { name: "Lab Results", desc: "Результаты анализов" },
      ],
    },
    {
      id: 3,
      name: "Протоколы",
      subtitle: "Механики доверия",
      color: "amber",
      gradient: "from-amber-500 to-orange-500",
      icon: Shield,
      description: "Общие механики, обеспечивающие доверие между уровнями",
      components: [
        { name: "Data Anchoring", desc: "Привязка к блокчейну" },
        { name: "Identity", desc: "DID/SBT система" },
        { name: "Economic", desc: "Токеномика и стимулы" },
        { name: "DAO Core", desc: "Управление экосистемой" },
      ],
    },
    {
      id: 4,
      name: "Приложения",
      subtitle: "Вход для каждой аудитории",
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      icon: Globe,
      description: "Каждая аудитория имеет свой вход, но работает с общими данными",
      components: [
        { name: "VOD Citizen", desc: "Граждане и активисты" },
        { name: "VOD Operator", desc: "Операторы инфраструктуры" },
        { name: "VOD Government", desc: "Государство и регуляторы" },
        { name: "VOD Investor", desc: "Инвесторы и фонды" },
      ],
    },
  ];

  return (
    <section id="architecture" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-4">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400 font-medium">Архитектура</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            4 Уровня Экосистемы
          </h2>
          <p className="text-xl text-water-200/70 max-w-3xl mx-auto">
            Многоуровневая архитектура обеспечивает прозрачность, безопасность и масштабируемость
          </p>
        </motion.div>

        {/* Interactive Levels */}
        <div className="grid lg:grid-cols-2 gap-6">
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveLevel(activeLevel === index ? null : index)}
              className="cursor-pointer"
            >
              <div className={`glass-card p-6 h-full border-l-4 border-l-${level.color}-500 hover:border-${level.color}-500/50 transition-all duration-300 ${
                activeLevel === index ? `ring-2 ring-${level.color}-500/30` : ""
              }`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${level.gradient} flex items-center justify-center flex-shrink-0`}>
                    <level.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-water-200/50">Уровень {level.id}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{level.name}</h3>
                    <p className="text-sm text-water-200/60">{level.subtitle}</p>
                  </div>
                </div>

                <p className="text-water-200/70 mb-4">{level.description}</p>

                <AnimatePresence>
                  {(activeLevel === index || activeLevel === null) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-2 gap-3"
                    >
                      {level.components.map((comp, i) => (
                        <div key={i} className="p-3 bg-white/5 rounded-lg">
                          <div className="font-semibold text-white text-sm">{comp.name}</div>
                          <div className="text-xs text-water-200/50">{comp.desc}</div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3D Architecture Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-card p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Визуализация Архитектуры</h3>
          <div className="relative h-64 md:h-80">
            {/* Stacked Layers */}
            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className={`absolute left-0 right-0 h-16 md:h-20 bg-gradient-to-r ${level.gradient} rounded-lg flex items-center justify-center`}
                style={{
                  top: `${index * 4.5}rem`,
                  transform: `scale(${1 - index * 0.1})`,
                  zIndex: 4 - index,
                }}
              >
                <span className="text-white font-bold text-lg drop-shadow-lg">
                  {level.id}. {level.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==================== PRODUCTS SECTION ====================
function ProductsSection() {
  const products = [
    {
      icon: Globe,
      name: "LoopGlobe",
      desc: "Интерактивная карта воды",
      features: ["10M пользователей", "API для разработчиков", "Real-time данные"],
      revenue: "$45M к 2029",
      color: "cyan",
    },
    {
      icon: Wallet,
      name: "LoopHub",
      desc: "Инвестиционная платформа",
      features: ["$500M TVL", "250+ проектов", "B2I интерфейс"],
      revenue: "$30M к 2029",
      color: "emerald",
    },
    {
      icon: Radio,
      name: "LoopSense",
      desc: "Сеть мониторинга",
      features: ["100K сенсоров", "IoT интеграция", "Edge AI"],
      revenue: "$450M к 2029",
      color: "amber",
    },
    {
      icon: Shield,
      name: "LoopDAO",
      desc: "Децентрализованное управление",
      features: ["100K участников", "4 уровня решений", "Жидкая демократия"],
      revenue: "1% от транзакций",
      color: "purple",
    },
    {
      icon: Beaker,
      name: "VOD-Lab",
      desc: "Автоматические лаборатории",
      features: ["12 параметров", "Edge AI анализ", "Блокчейн-нода"],
      revenue: "$120M к 2029",
      color: "pink",
    },
    {
      icon: Trophy,
      name: "Aqua Guardians",
      desc: "Геймификация",
      features: ["5M игроков", "20 уровней", "NFT достижения"],
      revenue: "$80M к 2029",
      color: "orange",
    },
  ];

  return (
    <section id="products" className="py-20 px-4 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">Продукты</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Экосистема Продуктов
          </h2>
          <p className="text-xl text-water-200/70 max-w-3xl mx-auto">
            Шесть ключевых продуктов, образующих единую водную экономику
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${product.color}-500/20 to-${product.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <product.icon className={`w-7 h-7 text-${product.color}-400`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
              <p className="text-water-200/70 mb-4">{product.desc}</p>
              <ul className="space-y-2 mb-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-water-200/60">
                    <CheckCircle2 className={`w-4 h-4 text-${product.color}-400 flex-shrink-0`} />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className={`text-${product.color}-400 font-mono font-semibold`}>
                {product.revenue}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== TOKENOMICS SECTION ====================
function TokenomicsSection() {
  const tokens = [
    {
      name: "VOD",
      type: "Commodity Token",
      desc: "1 VOD = 1 м³ верифицированной воды",
      supply: "Неограниченная",
      backing: "Физическая вода",
      color: "cyan",
      icon: Droplets,
    },
    {
      name: "VODeco",
      type: "Governance Token",
      desc: "Токен управления DAO",
      supply: "1,000,000,000",
      backing: "Репутация + стейк",
      color: "emerald",
      icon: Shield,
    },
    {
      name: "VODcredit",
      type: "Reputation SBT",
      desc: "Нетрансферабельный токен репутации",
      supply: "Неограниченная",
      backing: "Вклад в экосистему",
      color: "amber",
      icon: Award,
    },
  ];

  const allocation = [
    { category: "Water Reserve", percentage: 35, color: "#00d4ff" },
    { category: "R&D Treasury", percentage: 25, color: "#7c3aed" },
    { category: "Community", percentage: 15, color: "#10b981" },
    { category: "Team & Foundation", percentage: 12, color: "#f59e0b" },
    { category: "Early Investors", percentage: 8, color: "#ef4444" },
    { category: "Liquidity", percentage: 3, color: "#6366f1" },
    { category: "DAO Treasury", percentage: 2, color: "#ec4899" },
  ];

  return (
    <section id="tokenomics" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 mb-4">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-400 font-medium">Токеномика</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Система Токенов
          </h2>
          <p className="text-xl text-water-200/70 max-w-3xl mx-auto">
            Три взаимосвязанных токена для разных аспектов экосистемы
          </p>
        </motion.div>

        {/* Token Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {tokens.map((token, index) => (
            <motion.div
              key={token.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 text-center hover:border-cyan-500/30 transition-all"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-${token.color}-500/20 to-${token.color}-500/10 flex items-center justify-center`}>
                <token.icon className={`w-8 h-8 text-${token.color}-400`} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{token.name}</h3>
              <p className={`text-sm text-${token.color}-400 mb-2`}>{token.type}</p>
              <p className="text-water-200/70 mb-4">{token.desc}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-water-200/50">Supply:</span>
                  <span className="text-white">{token.supply}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-water-200/50">Обеспечение:</span>
                  <span className="text-white">{token.backing}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Allocation Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-cyan-400" />
            Распределение VODeco
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* SVG Pie Chart */}
            <div className="relative w-full max-w-xs mx-auto aspect-square">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                {(() => {
                  let currentAngle = 0;
                  return allocation.map((item, index) => {
                    const startAngle = currentAngle;
                    const endAngle = currentAngle + (item.percentage / 100) * 360;
                    currentAngle = endAngle;
                    const startRad = (startAngle * Math.PI) / 180;
                    const endRad = (endAngle * Math.PI) / 180;
                    const x1 = 100 + 80 * Math.cos(startRad);
                    const y1 = 100 + 80 * Math.sin(startRad);
                    const x2 = 100 + 80 * Math.cos(endRad);
                    const y2 = 100 + 80 * Math.sin(endRad);
                    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

                    return (
                      <motion.path
                        key={item.category}
                        d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill={item.color}
                        stroke="#0f172a"
                        strokeWidth="2"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 0.85, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="cursor-pointer hover:opacity-100 transition-opacity"
                      />
                    );
                  });
                })()}
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
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
                >
                  <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white text-sm">{item.category}</span>
                      <span className="font-mono text-cyan-400">{item.percentage}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==================== INCENTIVES SECTION ====================
function IncentivesSection() {
  const incentives = [
    {
      icon: Gift,
      title: "Airdrop / Retrodrop",
      desc: "Ранним участникам экосистемы",
      amount: "10M ORB",
      color: "cyan",
    },
    {
      icon: FlaskConical,
      title: "Research Rewards",
      desc: "За научные исследования и данные",
      amount: "До 500 ORB/отчёт",
      color: "emerald",
    },
    {
      icon: Share2,
      title: "Referral Program",
      desc: "Многоуровневая реферальная система",
      amount: "5-15% от активности",
      color: "amber",
    },
    {
      icon: Trophy,
      title: "Геймификация",
      desc: "20 уровней водного цикла",
      amount: "До 100K ORB",
      color: "purple",
    },
  ];

  return (
    <section id="incentives" className="py-20 px-4 bg-gradient-to-b from-transparent via-emerald-900/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
            <Gift className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">Стимулы</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Система Вознаграждений
          </h2>
          <p className="text-xl text-water-200/70 max-w-3xl mx-auto">
            Множественные механики для вовлечения участников экосистемы
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {incentives.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-6 text-center hover:bg-white/10 transition-all group`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-8 h-8 text-${item.color}-400`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-water-200/70 text-sm mb-3">{item.desc}</p>
              <div className={`text-${item.color}-400 font-mono font-semibold`}>
                {item.amount}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== DAO SECTION ====================
function DAOSection() {
  const levels = [
    {
      level: "L1",
      name: "Constitutional",
      topic: "Изменение правил эмиссии",
      quorum: "66% VODeco + 51% валидаторов",
      time: "30 дней",
    },
    {
      level: "L2",
      name: "Economic",
      topic: "Параметры стейкинга, налогов",
      quorum: "51% VODeco",
      time: "7 дней",
    },
    {
      level: "L3",
      name: "Projects",
      topic: "Инвестиции, распределение",
      quorum: "40% VODeco + репутация",
      time: "14 дней",
    },
    {
      level: "L4",
      name: "Operational",
      topic: "Гранты, награды",
      quorum: "Делегаты",
      time: "3 дня",
    },
  ];

  return (
    <section id="dao" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
            <Shield className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">DAO</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Децентрализованное Управление
          </h2>
          <p className="text-xl text-water-200/70 max-w-3xl mx-auto">
            4 уровня принятия решений для эффективного управления экосистемой
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {levels.map((l, index) => (
            <motion.div
              key={l.level}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-black text-xl">{l.level}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{l.name}</h3>
                  <p className="text-sm text-water-200/60">{l.topic}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-water-200/50 mb-1">Кворум:</div>
                  <div className="text-sm text-white">{l.quorum}</div>
                </div>
                <div>
                  <div className="text-xs text-water-200/50 mb-1">Срок:</div>
                  <div className="text-sm text-white">{l.time}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== ROADMAP SECTION ====================
function RoadmapSection() {
  const phases = [
    {
      phase: "Phase 0",
      name: "Foundation",
      time: "Q4 2024",
      items: ["Команда 10 человек", "WhitePaper", "Seed $2M"],
      status: "completed",
    },
    {
      phase: "Phase 1",
      name: "MVP",
      time: "Q1-Q2 2025",
      items: ["LoopGlobe MVP", "Первые сенсоры", "Private $30M", "1K пользователей"],
      status: "current",
    },
    {
      phase: "Phase 2",
      name: "Launch",
      time: "Q3-Q4 2025",
      items: ["IDO $25M", "LoopHub", "DAO активация", "50K пользователей"],
      status: "upcoming",
    },
    {
      phase: "Phase 3",
      name: "Growth",
      time: "2026",
      items: ["Масштабирование", "B2B продажи", "500K пользователей", "$50M TVL"],
      status: "upcoming",
    },
    {
      phase: "Phase 4",
      name: "Scale",
      time: "2027-2028",
      items: ["Глобальное расширение", "Институционалы", "5M пользователей", "$500M TVL"],
      status: "upcoming",
    },
    {
      phase: "Phase 5",
      name: "Maturity",
      time: "2029+",
      items: ["Самодостаточная экосистема", "50M пользователей", "$5B TVL"],
      status: "upcoming",
    },
  ];

  return (
    <section id="roadmap" className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 mb-4">
            <Rocket className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-pink-400 font-medium">Roadmap</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Дорожная Карта
          </h2>
          <p className="text-xl text-water-200/70 max-w-3xl mx-auto">
            Путь развития экосистемы от концепции до глобального масштаба
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-emerald-500 to-purple-500" />

          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-center mb-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className={`absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full border-2 border-white ${
                phase.status === "completed" ? "bg-emerald-500" :
                phase.status === "current" ? "bg-cyan-500 animate-pulse" :
                "bg-slate-700"
              }`} />

              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      phase.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                      phase.status === "current" ? "bg-cyan-500/20 text-cyan-400" :
                      "bg-slate-500/20 text-slate-400"
                    }`}>
                      {phase.phase}
                    </span>
                    <span className="text-water-200/50 text-sm">{phase.time}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{phase.name}</h3>
                  <ul className="space-y-2">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-water-200/70">
                        <ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== OFFER SECTION ====================
function OfferSection() {
  const tiers = [
    {
      name: "Water Drop",
      investment: "$10K-$50K",
      price: "$0.40 (20% скидка)",
      bonuses: ["Early access"],
      roi: "10x",
    },
    {
      name: "Stream",
      investment: "$50K-$250K",
      price: "$0.35 (30% скидка)",
      bonuses: ["NFT Silver"],
      roi: "14x",
      featured: true,
    },
    {
      name: "River",
      investment: "$250K-$1M",
      price: "$0.30 (40% скидка)",
      bonuses: ["NFT Gold", "Advisory"],
      roi: "17x",
    },
    {
      name: "Ocean",
      investment: "$1M-$5M",
      price: "$0.25 (50% скидка)",
      bonuses: ["NFT Platinum", "Board seat"],
      roi: "20x",
    },
  ];

  return (
    <section id="offer" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-4">
            <Target className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400 font-medium">Offer</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Инвестиционные Предложения
          </h2>
          <p className="text-xl text-water-200/70 max-w-3xl mx-auto">
            Уровни инвестиций с прогрессивными бонусами и ROI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-6 text-center relative ${
                tier.featured ? "border-cyan-500/50 ring-2 ring-cyan-500/20" : ""
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 text-xs font-bold rounded-full">
                  РЕКОМЕНДУЕМ
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
              <div className="text-cyan-400 font-mono mb-4">{tier.investment}</div>
              <div className="text-white font-semibold mb-4">{tier.price}</div>
              <ul className="space-y-2 mb-6">
                {tier.bonuses.map((bonus, i) => (
                  <li key={i} className="flex items-center justify-center gap-2 text-sm text-water-200/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {bonus}
                  </li>
                ))}
              </ul>
              <div className="text-3xl font-black text-emerald-400">{tier.roi}</div>
              <div className="text-xs text-water-200/50">Ожидаемый ROI</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== CALCULATORS SECTION ====================
function CalculatorsSection() {
  const [activeCalc, setActiveCalc] = useState("roi");

  return (
    <section id="calculator" className="py-20 px-4 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">Калькуляторы</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Интерактивные Расчёты
          </h2>
          <p className="text-xl text-water-200/70 max-w-3xl mx-auto">
            Рассчитайте потенциальную доходность и вознаграждения в экосистеме
          </p>
        </motion.div>

        {/* Calculator Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: "roi", name: "Окупаемость устройств", icon: TrendingUp },
            { id: "staking", name: "Стейкинг APY", icon: Wallet },
            { id: "airdrop", name: "Airdrop/Retrodrop", icon: Gift },
            { id: "research", name: "Research Rewards", icon: FlaskConical },
            { id: "referral", name: "Referral Program", icon: Share2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCalc(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeCalc === tab.id
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "bg-white/5 text-water-200/70 hover:bg-white/10"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Calculator Content */}
        <AnimatePresence mode="wait">
          {activeCalc === "roi" && <ROICalculator key="roi" />}
          {activeCalc === "staking" && <StakingCalculator key="staking" />}
          {activeCalc === "airdrop" && <AirdropCalculator key="airdrop" />}
          {activeCalc === "research" && <ResearchCalculator key="research" />}
          {activeCalc === "referral" && <ReferralCalculator key="referral" />}
        </AnimatePresence>
      </div>
    </section>
  );
}

// --- ROI Calculator ---
function ROICalculator() {
  const [devicePrice, setDevicePrice] = useState(13400);
  const [monthlyRevenue, setMonthlyRevenue] = useState(1500);
  const [monthlyOpex, setMonthlyOpex] = useState(800);

  const monthlyProfit = monthlyRevenue - monthlyOpex;
  const paybackMonths = monthlyProfit > 0 ? Math.ceil(devicePrice / monthlyProfit) : 0;
  const paybackYears = (paybackMonths / 12).toFixed(1);
  const annualROI = monthlyProfit > 0 ? ((monthlyProfit * 12 / devicePrice) * 100).toFixed(1) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card p-8"
    >
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-cyan-400" />
        Окупаемость Устройств (VOD-Lab)
      </h3>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Стоимость устройства ($)</label>
          <input
            type="number"
            value={devicePrice}
            onChange={(e) => setDevicePrice(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
          />
          <input
            type="range"
            min="5000"
            max="50000"
            step="500"
            value={devicePrice}
            onChange={(e) => setDevicePrice(Number(e.target.value))}
            className="w-full mt-3 accent-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Выручка в месяц ($)</label>
          <input
            type="number"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
          />
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
            className="w-full mt-3 accent-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm text-water-200/70 mb-2">OPEX в месяц ($)</label>
          <input
            type="number"
            value={monthlyOpex}
            onChange={(e) => setMonthlyOpex(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
          />
          <input
            type="range"
            min="200"
            max="2000"
            step="100"
            value={monthlyOpex}
            onChange={(e) => setMonthlyOpex(Number(e.target.value))}
            className="w-full mt-3 accent-cyan-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-xl border border-cyan-500/30 text-center">
          <div className="text-sm text-water-200/50 mb-2">Чистая прибыль/мес</div>
          <div className="text-3xl font-bold text-emerald-400">${monthlyProfit.toLocaleString()}</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl border border-emerald-500/30 text-center">
          <div className="text-sm text-water-200/50 mb-2">Окупаемость</div>
          <div className="text-3xl font-bold text-cyan-400">{paybackMonths} мес</div>
          <div className="text-xs text-water-200/50">~{paybackYears} лет</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl border border-purple-500/30 text-center">
          <div className="text-sm text-water-200/50 mb-2">Годовой ROI</div>
          <div className="text-3xl font-bold text-purple-400">{annualROI}%</div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Staking Calculator ---
function StakingCalculator() {
  const [amount, setAmount] = useState(10000);
  const [duration, setDuration] = useState(12);

  const baseApy = 12;
  const durationBonus = Math.min((duration / 12) * 4, 10);
  const amountBonus = amount >= 100000 ? 5 : amount >= 50000 ? 3 : amount >= 10000 ? 2 : 0;
  const estimatedApy = Math.min(baseApy + durationBonus + amountBonus, 25);

  const annualYield = (amount * estimatedApy) / 100;
  const totalYield = annualYield * (duration / 12);
  const totalReturn = amount + totalYield;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card p-8"
    >
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Wallet className="w-6 h-6 text-emerald-400" />
        Калькулятор Стейкинга APY
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Сумма стейкинга (ORB)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-lg"
          />
          <input
            type="range"
            min="1000"
            max="500000"
            step="1000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full mt-3 accent-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Срок блокировки (месяцев)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-lg"
          />
          <input
            type="range"
            min="1"
            max="36"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full mt-3 accent-emerald-500"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 p-6 bg-white/5 rounded-xl mb-6">
        <div className="text-center">
          <div className="text-sm text-water-200/50 mb-1">Базовый APY</div>
          <div className="text-xl font-bold text-emerald-400">{baseApy}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-water-200/50 mb-1">Бонус срока</div>
          <div className="text-xl font-bold text-cyan-400">+{durationBonus.toFixed(1)}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-water-200/50 mb-1">Бонус суммы</div>
          <div className="text-xl font-bold text-purple-400">+{amountBonus}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-water-200/50 mb-1">Итого APY</div>
          <div className="text-2xl font-bold text-white">{estimatedApy}%</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl border border-emerald-500/30 text-center">
          <div className="text-sm text-water-200/50 mb-2">Годовой доход</div>
          <div className="text-3xl font-bold text-emerald-400">{annualYield.toLocaleString()} ORB</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-xl border border-cyan-500/30 text-center">
          <div className="text-sm text-water-200/50 mb-2">Доход за {duration} мес</div>
          <div className="text-3xl font-bold text-cyan-400">{totalYield.toLocaleString()} ORB</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl border border-purple-500/30 text-center">
          <div className="text-sm text-water-200/50 mb-2">Итого возврат</div>
          <div className="text-3xl font-bold text-purple-400">{totalReturn.toLocaleString()} ORB</div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Airdrop Calculator ---
function AirdropCalculator() {
  const [earlyAction, setEarlyAction] = useState(10);
  const [testnetTasks, setTestnetTasks] = useState(20);
  const [referrals, setReferrals] = useState(5);
  const [socialActivity, setSocialActivity] = useState(50);

  const baseAirdrop = 100;
  const earlyBonus = earlyAction * 15;
  const testnetBonus = testnetTasks * 10;
  const referralBonus = referrals * 50;
  const socialBonus = socialActivity * 2;
  const total = baseAirdrop + earlyBonus + testnetBonus + referralBonus + socialBonus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card p-8"
    >
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Gift className="w-6 h-6 text-purple-400" />
        Калькулятор Airdrop / Retrodrop
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Ранних действий (×15 ORB)</label>
          <input
            type="range"
            min="0"
            max="50"
            value={earlyAction}
            onChange={(e) => setEarlyAction(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="text-center text-purple-400 font-mono mt-1">{earlyAction}</div>
        </div>
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Testnet задач (×10 ORB)</label>
          <input
            type="range"
            min="0"
            max="100"
            value={testnetTasks}
            onChange={(e) => setTestnetTasks(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="text-center text-purple-400 font-mono mt-1">{testnetTasks}</div>
        </div>
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Рефералов (×50 ORB)</label>
          <input
            type="range"
            min="0"
            max="50"
            value={referrals}
            onChange={(e) => setReferrals(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="text-center text-purple-400 font-mono mt-1">{referrals}</div>
        </div>
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Соц. активность (×2 ORB)</label>
          <input
            type="range"
            min="0"
            max="200"
            value={socialActivity}
            onChange={(e) => setSocialActivity(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="text-center text-purple-400 font-mono mt-1">{socialActivity}</div>
        </div>
      </div>

      <div className="p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/30 text-center">
        <div className="text-sm text-water-200/50 mb-2">Общий Airdrop</div>
        <div className="text-5xl font-black text-purple-400">{total.toLocaleString()} ORB</div>
        <div className="text-sm text-water-200/50 mt-2">
          Базовый: {baseAirdrop} + Ранние: {earlyBonus} + Testnet: {testnetBonus} + Рефералы: {referralBonus} + Соц: {socialBonus}
        </div>
      </div>
    </motion.div>
  );
}

// --- Research Calculator ---
function ResearchCalculator() {
  const [reportsPerMonth, setReportsPerMonth] = useState(10);
  const [quality, setQuality] = useState(0.8);
  const [complexity, setComplexity] = useState(1.5);

  const baseReward = 100;
  const rewardPerReport = Math.round(baseReward * quality * complexity);
  const monthlyReward = rewardPerReport * reportsPerMonth;
  const annualReward = monthlyReward * 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card p-8"
    >
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FlaskConical className="w-6 h-6 text-amber-400" />
        Research Rewards
      </h3>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Отчётов в месяц</label>
          <input
            type="number"
            value={reportsPerMonth}
            onChange={(e) => setReportsPerMonth(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
          />
          <input
            type="range"
            min="1"
            max="50"
            value={reportsPerMonth}
            onChange={(e) => setReportsPerMonth(Number(e.target.value))}
            className="w-full mt-3 accent-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Качество данных ({quality.toFixed(1)})</label>
          <input
            type="range"
            min="0.5"
            max="1"
            step="0.1"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
          <div className="text-center text-amber-400 font-mono mt-1">{quality.toFixed(1)}</div>
        </div>
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Сложность ({complexity}×)</label>
          <select
            value={complexity}
            onChange={(e) => setComplexity(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
          >
            <option value={1}>Базовая (1×)</option>
            <option value={1.5}>Средняя (1.5×)</option>
            <option value={2}>Высокая (2×)</option>
            <option value={3}>Экспертная (3×)</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-xl border border-amber-500/30 text-center">
          <div className="text-sm text-water-200/50 mb-2">За отчёт</div>
          <div className="text-3xl font-bold text-amber-400">{rewardPerReport} ORB</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-xl border border-cyan-500/30 text-center">
          <div className="text-sm text-water-200/50 mb-2">В месяц</div>
          <div className="text-3xl font-bold text-cyan-400">{monthlyReward.toLocaleString()} ORB</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl border border-emerald-500/30 text-center">
          <div className="text-sm text-water-200/50 mb-2">В год</div>
          <div className="text-3xl font-bold text-emerald-400">{annualReward.toLocaleString()} ORB</div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Referral Calculator ---
function ReferralCalculator() {
  const [directRefs, setDirectRefs] = useState(20);
  const [activityPerRef, setActivityPerRef] = useState(1000);
  const [level, setLevel] = useState(2);

  const tierRates = [0.05, 0.08, 0.12, 0.15];
  const rate = tierRates[Math.min(level - 1, 3)];
  const totalActivity = directRefs * activityPerRef;
  const monthlyEarnings = totalActivity * rate;
  const annualEarnings = monthlyEarnings * 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card p-8"
    >
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Share2 className="w-6 h-6 text-cyan-400" />
        Referral Program
      </h3>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Прямых рефералов</label>
          <input
            type="number"
            value={directRefs}
            onChange={(e) => setDirectRefs(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
          />
          <input
            type="range"
            min="0"
            max="200"
            value={directRefs}
            onChange={(e) => setDirectRefs(Number(e.target.value))}
            className="w-full mt-3 accent-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Активность/реф (ORB)</label>
          <input
            type="number"
            value={activityPerRef}
            onChange={(e) => setActivityPerRef(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono"
          />
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={activityPerRef}
            onChange={(e) => setActivityPerRef(Number(e.target.value))}
            className="w-full mt-3 accent-cyan-500"
          />
        </div>
        <div>
          <label className="block text-sm text-water-200/70 mb-2">Уровень ({["Stream", "River", "Delta", "Ocean"][level - 1]})</label>
          <select
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
          >
            <option value={1}>Stream (1-10 refs, 5%)</option>
            <option value={2}>River (11-50 refs, 8%)</option>
            <option value={3}>Delta (51-200 refs, 12%)</option>
            <option value={4}>Ocean (200+ refs, 15%)</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-xl border border-cyan-500/30 text-center">
          <div className="text-sm text-water-200/50 mb-2">Ваша ставка</div>
          <div className="text-3xl font-bold text-cyan-400">{(rate * 100).toFixed(0)}%</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl border border-emerald-500/30 text-center">
          <div className="text-sm text-water-200/50 mb-2">В месяц</div>
          <div className="text-3xl font-bold text-emerald-400">{monthlyEarnings.toLocaleString()} ORB</div>
        </div>
        <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl border border-purple-500/30 text-center">
          <div className="text-sm text-water-200/50 mb-2">В год</div>
          <div className="text-3xl font-bold text-purple-400">{annualEarnings.toLocaleString()} ORB</div>
        </div>
      </div>
    </motion.div>
  );
}

// ==================== CTA SECTION ====================
function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 text-center relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-emerald-500 to-purple-500" />
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Присоединяйтесь к LoopOrb
            </h2>
            <p className="text-xl text-water-200/70 mb-10 max-w-2xl mx-auto">
              Вода — наше общее будущее. Станьте частью глобального решения
              проблемы водных ресурсов планеты.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/tokenhub" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                <TrendingUp className="w-5 h-5" />
                Инвестировать
              </Link>
              <Link href="/projecthub" className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
                <FolderOpen className="w-5 h-5" />
                Исследовать проекты
              </Link>
              <Link href="/dao" className="btn-outline flex items-center gap-2 text-lg px-8 py-4">
                <Shield className="w-5 h-5" />
                Участвовать в DAO
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==================== FOOTER ====================
function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-6 h-6 text-cyan-400" />
              <span className="text-xl font-bold gradient-text">LoopOrb</span>
            </div>
            <p className="text-sm text-water-200/60">
              Путь воды, путь жизни
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Экосистема</h4>
            <ul className="space-y-2 text-sm text-water-200/60">
              <li><Link href="/tokenhub" className="hover:text-cyan-400 transition">TokenHub</Link></li>
              <li><Link href="/projecthub" className="hover:text-cyan-400 transition">ProjectHub</Link></li>
              <li><Link href="/dao" className="hover:text-cyan-400 transition">DAO</Link></li>
              <li><Link href="/staking" className="hover:text-cyan-400 transition">Staking</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Ресурсы</h4>
            <ul className="space-y-2 text-sm text-water-200/60">
              <li><Link href="/litepaper" className="hover:text-cyan-400 transition">Litepaper</Link></li>
              <li><Link href="/litepaper2" className="hover:text-cyan-400 transition">Litepaper 2.0</Link></li>
              <li><a href="/docs/whitepaper.pdf" className="hover:text-cyan-400 transition">WhitePaper PDF</a></li>
              <li><Link href="/roadmap" className="hover:text-cyan-400 transition">Roadmap</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-water-200/60">
              <li>invest@looporb.io</li>
              <li>@LoopOrb_Official</li>
              <li>@LoopOrb</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-center text-sm text-water-200/50">
          © 2025 LoopOrb. Все права защищены. Данный документ носит информационный характер.
        </div>
      </div>
    </footer>
  );
}

// ==================== MAIN PAGE ====================
export default function Litepaper2Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <ArchitectureSection />
        <ProductsSection />
        <TokenomicsSection />
        <IncentivesSection />
        <DAOSection />
        <RoadmapSection />
        <OfferSection />
        <CalculatorsSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}