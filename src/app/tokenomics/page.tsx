"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Gauge, Droplets, Zap, Shield, Lock, TrendingUp, TrendingDown, Minus,
  Hexagon, Microchip, Database, Server, RefreshCw, Settings, CheckCircle2,
  Gem, Coins, Globe, Users, Award, Sparkles, Beaker, Atom, ArrowRight,
  Menu, X, Wallet, Radio, Wifi, QrCode, FileCheck, Hash, Box,
  Droplet, Thermometer, Eye, Clock, MapPin, AlertTriangle
} from "lucide-react";

// --- UNIVERSAL NAVBAR FOR TOKENOMICS ---
function TokenomicsNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pageLinks = [
    { href: "/landing", label: "Staking" },
    { href: "/ecosystem", label: "Ecosystem" },
    { href: "/projecthub", label: "ProjectHub" },
    { href: "/tokenomics", label: "Tokenomics", active: true },
    { href: "/dao", label: "DAO" },
    { href: "/profile", label: "Account" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50" : "bg-slate-950"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Droplets className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <span className="text-lg lg:text-xl font-bold text-slate-100">VODeco</span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {pageLinks.map((link) => (
                <Link key={link.href} href={link.href} 
                  className={`text-sm font-medium transition-colors ${
                    link.active 
                      ? "text-cyan-400" 
                      : "text-slate-400 hover:text-cyan-400"
                  }`}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/wallet" 
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-900 rounded-lg transition-all text-sm font-semibold">
                <Wallet className="w-4 h-4" />
                <span>Wallet</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="lg:hidden p-2 text-slate-300">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto bg-slate-950/98 border-b border-slate-800"
          >
            <div className="px-4 py-4">
              <div className="mb-4">
                <div className="text-xs font-semibold uppercase tracking-wider mb-2 px-2 text-slate-500">Navigation</div>
                <div className="grid grid-cols-2 gap-2">
                  {pageLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} 
                       className={`flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                         link.active 
                           ? "bg-cyan-500/10 text-cyan-400 font-medium" 
                           : "text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50"
                       }`}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- TYPES ---
interface TokenMetric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  change?: number;
  status: "normal" | "warning" | "critical" | "optimal";
  icon: any;
}

interface AllocationItem {
  category: string;
  percentage: number;
  amount: string;
  color: string;
  description: string;
  locked: boolean;
}

// --- MOCK DATA ---
const metrics: TokenMetric[] = [
  { id: "price", label: "VOD Price", value: "1.24", unit: "USD", change: 2.4, status: "optimal", icon: Coins },
  { id: "w_index", label: "Water Index W_m³", value: "1.20", unit: "USD", change: 0.8, status: "normal", icon: Droplets },
  { id: "supply", label: "Circulating Supply", value: "0", unit: "VOD", change: 0, status: "normal", icon: Database },
  { id: "staked", label: "Total Staked", value: "0", unit: "VOD", change: 0, status: "optimal", icon: Lock },
  { id: "validators", label: "Active Nodes", value: "0", unit: "nodes", change: 0, status: "optimal", icon: Server },
  { id: "sealed", label: "Sealed m³", value: "0", unit: "m³", change: 0, status: "normal", icon: Box },
];

const allocations: AllocationItem[] = [
  { category: "Water Reserve", percentage: 35, amount: "485.1M VOD", color: "#00d4ff", description: "Физическое обеспечение водными ресурсами", locked: true },
  { category: "R&D Treasury", percentage: 25, amount: "346.5M VOD", color: "#7c3aed", description: "Финансирование проектов ProjectHub", locked: true },
  { category: "Community", percentage: 15, amount: "207.9M VOD", color: "#10b981", description: "Стимулы, аирдропы, награды", locked: false },
  { category: "Team & Foundation", percentage: 12, amount: "166.3M VOD", color: "#f59e0b", description: "Команда и фонд развития", locked: true },
  { category: "Early Investors", percentage: 8, amount: "110.9M VOD", color: "#ef4444", description: "Pre-seed и Seed раунды", locked: true },
  { category: "Liquidity", percentage: 3, amount: "41.6M VOD", color: "#6366f1", description: "Ликвидность и маркет-мейкинг", locked: false },
  { category: "DAO Treasury", percentage: 2, amount: "27.7M VOD", color: "#ec4899", description: "Казна управления", locked: false },
];

const priceBands = {
  floor: 1.00,
  current: 1.24,
  ceiling: 5.00,
  optimal: 1.20,
};

// --- CHROMIUM STYLES ---
const darkPanel = "bg-slate-900/90 border border-slate-700/50";

// --- HELPER COMPONENTS ---
function StatusIndicator({ status }: { status: string }) {
  const colors = {
    normal: "bg-emerald-500",
    warning: "bg-amber-500",
    critical: "bg-rose-500",
    optimal: "bg-cyan-400",
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${colors[status as keyof typeof colors]} animate-pulse shadow-[0_0_8px_currentColor]`} />
      <span className="text-xs uppercase tracking-wider text-slate-400">{status}</span>
    </div>
  );
}

function MetricCard({ metric, index }: { metric: TokenMetric; index: number }) {
  const Icon = metric.icon;
  const isPositive = metric.change && metric.change > 0;
  const isNegative = metric.change && metric.change < 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-xl p-5 ${darkPanel} backdrop-blur-xl`}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-400/20 via-transparent to-slate-600/20 pointer-events-none" />
      <motion.div
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-cyan-400/20 pointer-events-none"
      />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center">
            <Icon className="w-5 h-5 text-slate-300" />
          </div>
          <StatusIndicator status={metric.status} />
        </div>
        
        <div className="mb-2">
          <div className="text-2xl font-mono font-bold text-slate-100 tracking-tight">
            {metric.value}
            {metric.unit && <span className="text-sm text-slate-400 ml-1">{metric.unit}</span>}
          </div>
          <div className="text-xs text-slate-500 uppercase tracking-wider">{metric.label}</div>
        </div>
        
        {metric.change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-mono ${
            isPositive ? "text-emerald-400" : isNegative ? "text-rose-400" : "text-slate-400"
          }`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : isNegative ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
            <span>{Math.abs(metric.change)}%</span>
            <span className="text-slate-500 ml-1">24h</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// --- EMISSION FLOW COMPONENT ---
function EmissionFlowDiagram() {
  const stages = [
    {
      id: 1,
      title: "Physical Water",
      subtitle: "Физический м³ воды",
      icon: Droplet,
      color: "from-blue-500 to-cyan-500",
      details: ["AquaCell / AquaHome / Industrial Sensors", "pH, температура, турбидность, ОВП"],
      active: true
    },
    {
      id: 2,
      title: "Data Transmission",
      subtitle: "Передача данных",
      icon: Radio,
      color: "from-cyan-500 to-teal-500",
      details: ["Bluetooth / WiFi / LoRaWAN / 4G", "Шифрование AES-256"],
      active: true
    },
    {
      id: 3,
      title: "Validation",
      subtitle: "Валидация данных",
      icon: Eye,
      color: "from-teal-500 to-emerald-500",
      details: ["Проверка валидаторами (min 3)", "Диапазоны, геолокация, anti-replay"],
      active: false
    },
    {
      id: 4,
      title: "Sealing",
      subtitle: "Запечатывание",
      icon: Hash,
      color: "from-emerald-500 to-green-500",
      details: ["SHA-256 хэширование", "Запись в блокчейн-ноду"],
      active: false
    },
    {
      id: 5,
      title: "Token Emission",
      subtitle: "Эмиссия токена",
      icon: Zap,
      color: "from-green-500 to-lime-500",
      details: ["10 VOD base × множители", "На кошелек владельца"],
      active: false
    }
  ];

  return (
    <div className="space-y-4">
      {stages.map((stage, index) => (
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 }}
          className={`relative flex items-start gap-4 p-4 rounded-xl border ${
            stage.active 
              ? "bg-slate-800/50 border-cyan-500/30" 
              : "bg-slate-900/30 border-slate-700/30"
          }`}
        >
          {/* Stage number */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${stage.color}`}>
            <stage.icon className="w-6 h-6 text-white" />
          </div>
          
          {/* Stage info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-slate-200">{stage.id}. {stage.title}</span>
              {stage.active && (
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-xs text-cyan-400"
                >
                  ● ACTIVE
                </motion.span>
              )}
            </div>
            <div className="text-sm text-cyan-400 mb-2">{stage.subtitle}</div>
            <div className="space-y-1">
              {stage.details.map((detail, i) => (
                <div key={i} className="text-xs text-slate-500 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-slate-600" />
                  {detail}
                </div>
              ))}
            </div>
          </div>
          
          {/* Arrow */}
          {index < stages.length - 1 && (
            <div className="absolute -bottom-3 left-6 w-px h-6 bg-gradient-to-b from-slate-600 to-transparent" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// --- EMISSION FORMULA COMPONENT ---
function EmissionFormula() {
  return (
    <div className={`${darkPanel} rounded-xl p-6`}>
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Atom className="w-4 h-4 text-cyan-400" />
        Формула Эмиссии
      </h3>
      
      <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 mb-4">
        <div className="text-sm text-slate-300 font-mono leading-relaxed">
          VOD_emitted = Base_Rate × Quality_Multiplier × Scarcity_Multiplier × Continuity_Bonus × (1 - Slashing)
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { label: "Base_Rate", value: "10 VOD/m³", desc: "Базовая ставка", color: "text-cyan-400" },
          { label: "Quality_Multiplier", value: "0.5x - 2.0x", desc: "pH, турбидность, чистота", color: "text-emerald-400" },
          { label: "Scarcity_Multiplier", value: "1.0x - 3.0x", desc: "Региональный дефицит", color: "text-amber-400" },
          { label: "Continuity_Bonus", value: "1.0x - 1.25x", desc: "Непрерывность данных", color: "text-blue-400" },
          { label: "Slashing", value: "0 - 100%", desc: "Штраф за аномалии", color: "text-rose-400" },
        ].map((item) => (
          <div key={item.label} className="p-3 bg-slate-900/50 rounded-lg border border-slate-800">
            <div className="text-xs text-slate-500 mb-1">{item.label}</div>
            <div className={`font-mono font-semibold ${item.color}`}>{item.value}</div>
            <div className="text-xs text-slate-600">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- WATER INDEX COMPONENT ---
function WaterIndexComponent() {
  const components = [
    { label: "Base Energy", value: "$0.30", desc: "Добыча и транспорт" },
    { label: "Treatment", value: "$0.40", desc: "Очистка до питьевой" },
    { label: "Scarcity", value: "$0.20", desc: "Региональный дефицит" },
    { label: "Quality", value: "$0.30", desc: "Индекс чистоты" },
    { label: "Carbon", value: "$0.05", desc: "Углеродный след" },
    { label: "Efficiency", value: "-$0.05", desc: "Экономия ресурсов", negative: true },
  ];

  return (
    <div className={`${darkPanel} rounded-xl p-6`}>
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Droplets className="w-4 h-4 text-cyan-400" />
        Water Index W_m³ Components
      </h3>
      
      <div className="space-y-2 mb-4">
        {components.map((item) => (
          <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
            <div>
              <div className="text-sm text-slate-300">{item.label}</div>
              <div className="text-xs text-slate-600">{item.desc}</div>
            </div>
            <span className={`font-mono font-semibold ${item.negative ? "text-rose-400" : "text-emerald-400"}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t-2 border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold text-slate-200">Total W_m³</span>
            <div className="text-xs text-slate-500">Базовая цена 1 м³ верифицированной воды</div>
          </div>
          <span className="text-2xl font-mono font-bold text-cyan-400">$1.20</span>
        </div>
      </div>
    </div>
  );
}

// --- SCANNING ANIMATION ---
function ScannerOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      <motion.div
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:100%_4px]" />
    </div>
  );
}

// --- MAIN PAGE ---
export default function TokenomicsPage() {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  
  const total = allocations.reduce((sum, item) => sum + item.percentage, 0);
  let currentAngle = 0;
  const segments = allocations.map((item) => {
    const startAngle = currentAngle;
    const endAngle = currentAngle + (item.percentage / total) * 360;
    currentAngle = endAngle;
    return { ...item, startAngle, endAngle };
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden">
      <style jsx global>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #020617; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>

      <TokenomicsNavbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-10 w-64 h-64 opacity-5 pointer-events-none"
        >
          <Hexagon className="w-full h-full text-cyan-400" strokeWidth={0.5} />
        </motion.div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 mb-6">
              <Microchip className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-mono text-slate-300">VODeco Tokenomics Engine</span>
              <span className="text-xs text-slate-500">v1.0</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-100 mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-slate-100 via-cyan-200 to-slate-300 bg-clip-text text-transparent">
                WATER-BACKED
              </span>
              <br />
              <span className="text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                TOKENOMICS
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              Токен VOD выходит в эмиссию <span className="text-cyan-400 font-semibold">ТОЛЬКО</span> после полного цикла верификации: 
              оцифровка физического кубометра воды → валидация данных → хэширование в ноду → эмиссия токена.
            </p>
          </motion.div>

          {/* --- METRICS GRID --- */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {metrics.map((metric, index) => (
              <MetricCard key={metric.id} metric={metric} index={index} />
            ))}
          </div>

          {/* --- EMISSION FLOW SECTION --- */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            <div className={`${darkPanel} rounded-xl p-6 relative overflow-hidden`}>
              <ScannerOverlay />
              <h3 className="text-lg font-semibold text-slate-200 mb-6 relative z-10 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-cyan-400" />
                Token Emission Flow
              </h3>
              <EmissionFlowDiagram />
            </div>

            <div className="space-y-6">
              <EmissionFormula />
              <WaterIndexComponent />
            </div>
          </div>

          {/* --- ALLOCATION SECTION --- */}
          <div className={`${darkPanel} rounded-xl p-6 mb-6`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-cyan-400" />
                Token Allocation
              </h3>
              <span className="text-sm text-slate-500 font-mono">Total: 1.386B VOD</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* SVG Pie Chart */}
              <div className="relative w-full max-w-md mx-auto aspect-square">
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
                  <text x="100" y="110" textAnchor="middle" className="fill-cyan-400 text-sm font-bold">1.386B</text>
                </svg>
              </div>

              {/* Legend */}
              <div className="space-y-3">
                {allocations.map((item, index) => (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                      hoveredSlice === index 
                        ? "bg-slate-800 border-cyan-500/30" 
                        : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                    }`}
                    onMouseEnter={() => setHoveredSlice(index)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  >
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}` }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-200">{item.category}</span>
                        {item.locked && <Lock className="w-3 h-3 text-amber-400" />}
                      </div>
                      <div className="text-xs text-slate-500">{item.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-slate-200">{item.percentage}%</div>
                      <div className="text-xs text-slate-500">{item.amount}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* --- STAKING TIERS --- */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { name: "Explorer", min: "1,000", max: "9,999", apy: "8-12%", color: "from-slate-700 to-slate-600", features: ["Базовые награды", "Доступ к DAO", "Ежемесячные бонусы"] },
              { name: "Guardian", min: "10,000", max: "99,999", apy: "12-18%", color: "from-cyan-600 to-emerald-600", featured: true, features: ["Повышенные награды", "Pre-order доступ", "Governance rights", "Эксклюзивные NFT"] },
              { name: "Validator", min: "100,000", max: "∞", apy: "18-25%", color: "from-amber-600 to-orange-600", features: ["Максимальные награды", "Запуск ноды", "Валидация данных", "Дивиденды от комиссий"] },
            ].map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-xl border ${tier.featured ? 'border-cyan-500/50' : 'border-slate-700'} bg-slate-900/50`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 text-xs font-bold rounded-full">
                    RECOMMENDED
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{tier.name}</h3>
                <div className="text-sm text-slate-400 mb-4">{tier.min} - {tier.max} VOD</div>
                <div className="text-3xl font-bold text-cyan-400 mb-4">{tier.apy} <span className="text-sm text-slate-500">APY</span></div>
                <ul className="space-y-2">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="text-sm text-slate-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* --- KEY PRINCIPLE --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className={`${darkPanel} rounded-2xl p-8 max-w-4xl mx-auto relative overflow-hidden border-2 border-cyan-500/30`}>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-emerald-500/5" />
              
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                  <Box className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-100 mb-4">
                  Ключевой Принцип Эмиссии
                </h3>
                <p className="text-lg text-slate-300 mb-6">
                  <span className="text-cyan-400 font-semibold">1 VOD = 1 м³ верифицированной воды</span>
                </p>
                <div className="text-slate-400 max-w-2xl mx-auto space-y-2">
                  <p>Токен выходит в эмиссию <span className="text-emerald-400 font-semibold">ТОЛЬКО</span> после полного цикла:</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {["Оцифровка физического м³", "Валидация данных", "Хэширование в ноду", "Эмиссия токена"].map((step, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-800 rounded-full text-sm text-cyan-400 border border-cyan-500/30">
                        {i + 1}. {step}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-slate-200">VODeco Tokenomics</span>
              <span className="text-xs text-slate-500 ml-2 font-mono">v1.0</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/landing" className="hover:text-cyan-400 transition-colors">Staking</Link>
            <Link href="/projecthub" className="hover:text-cyan-400 transition-colors">ProjectHub</Link>
            <Link href="/dao" className="hover:text-cyan-400 transition-colors">DAO</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Pie chart icon helper
function PieIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}
