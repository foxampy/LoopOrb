"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, Gauge, Droplets, Zap, Shield, Lock, TrendingUp, TrendingDown, Minus,
  Hexagon, Microchip, Database, Server, RefreshCw, Settings, CheckCircle2,
  Gem, Coins, Globe, Users, Award, Sparkles, Beaker, Atom, ArrowRight,
  Menu, X, Wallet
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

interface ConversionStage {
  stage: number;
  name: string;
  input: string;
  output: string;
  formula: string;
  active: boolean;
}

// --- MOCK DATA ---
const metrics: TokenMetric[] = [
  { id: "price", label: "VOD Price", value: "1.24", unit: "USD", change: 2.4, status: "optimal", icon: Coins },
  { id: "w_index", label: "Water Index W_m³", value: "1.20", unit: "USD", change: 0.8, status: "normal", icon: Droplets },
  { id: "supply", label: "Circulating Supply", value: "127.4M", unit: "VOD", change: 5.2, status: "normal", icon: Database },
  { id: "staked", label: "Total Staked", value: "84.2M", unit: "VOD", change: 12.1, status: "optimal", icon: Lock },
  { id: "validators", label: "Active Nodes", value: "2,847", unit: "nodes", change: 8.7, status: "optimal", icon: Server },
  { id: "emission", label: "Daily Emission", value: "24,500", unit: "VOD", change: -2.1, status: "normal", icon: Activity },
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

const conversionStages: ConversionStage[] = [
  { stage: 1, name: "VODCoin Grant", input: "100,000 VODCoin", output: "$5,000", formula: "Fixed @ $0.05", active: true },
  { stage: 2, name: "Time Staking", input: "12 months", output: "+12% bonus", formula: "1 + (months/100)", active: true },
  { stage: 3, name: "Verification", input: "Project Success", output: "+50% multiplier", formula: "KPI completion", active: false },
  { stage: 4, name: "VOD Emission", input: "Verified Work", output: "6,462 VOD", formula: "$ value / W_m³", active: false },
];

const priceBands = {
  floor: 1.00,
  current: 1.24,
  ceiling: 5.00,
  optimal: 1.20,
};

// --- CHROMIUM STYLES ---
const chromeGradient = "bg-gradient-to-br from-slate-300 via-slate-100 to-slate-400";
const chromeBorder = "border border-slate-300/50";
const darkPanel = "bg-slate-900/90 border border-slate-700/50";
const neonCyan = "text-cyan-400";
const neonBlue = "text-blue-400";
const neonGreen = "text-emerald-400";
const neonAmber = "text-amber-400";
const neonRed = "text-rose-400";

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
      {/* Chrome border effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-400/20 via-transparent to-slate-600/20 pointer-events-none" />
      
      {/* Scanline effect */}
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

function GaugeMeter({ value, min, max, label, unit, color = "cyan" }: { value: number; min: number; max: number; label: string; unit: string; color?: string }) {
  const percentage = ((value - min) / (max - min)) * 100;
  const colorClasses: Record<string, string> = {
    cyan: "text-cyan-400",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    rose: "text-rose-400",
  };
  
  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Outer chrome ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-400 via-slate-200 to-slate-500 p-1">
        <div className="w-full h-full rounded-full bg-slate-900" />
      </div>
      
      {/* Gauge background */}
      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="56"
          fill="none"
          stroke="#1e293b"
          strokeWidth="8"
          strokeDasharray="351.86"
          strokeDashoffset="87.97"
          strokeLinecap="round"
        />
        <motion.circle
          cx="64"
          cy="64"
          r="56"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray="351.86"
          strokeDashoffset={351.86 - (351.86 * 0.75 * percentage / 100)}
          strokeLinecap="round"
          className={`${colorClasses[color]} drop-shadow-[0_0_8px_currentColor]`}
          initial={{ strokeDashoffset: 351.86 }}
          animate={{ strokeDashoffset: 351.86 - (351.86 * 0.75 * percentage / 100) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      
      {/* Center display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-xl font-mono font-bold text-slate-100">{value.toFixed(2)}</div>
        <div className="text-xs text-slate-500">{unit}</div>
      </div>
      
      {/* Label */}
      <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-slate-400 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

function DigitalDisplay({ value, label, className = "" }: { value: string; label: string; className?: string }) {
  return (
    <div className={`bg-slate-950 rounded-lg p-4 border border-slate-800 ${className}`}>
      <div className="font-mono text-3xl text-cyan-400 tracking-wider drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
        {value.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            {char}
          </motion.span>
        ))}
      </div>
      <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">{label}</div>
      
      {/* LED dots */}
      <div className="flex gap-1 mt-3">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${i < 6 ? "bg-cyan-400 shadow-[0_0_4px_currentColor]" : "bg-slate-800"}`}
          />
        ))}
      </div>
    </div>
  );
}

function ConversionPipeline() {
  return (
    <div className="space-y-3">
      {conversionStages.map((stage, index) => (
        <motion.div
          key={stage.stage}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 }}
          className={`relative flex items-center gap-4 p-4 rounded-xl border ${
            stage.active 
              ? "bg-slate-800/50 border-cyan-500/30" 
              : "bg-slate-900/30 border-slate-700/30 opacity-60"
          }`}
        >
          {/* Stage number */}
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-lg ${
            stage.active 
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
              : "bg-slate-800 text-slate-500 border border-slate-700"
          }`}>
            {stage.stage}
          </div>
          
          {/* Stage info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-slate-200">{stage.name}</span>
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
            <div className="text-xs text-slate-500 font-mono">{stage.formula}</div>
          </div>
          
          {/* Conversion flow */}
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-400">{stage.input}</span>
            <ArrowRight className="w-4 h-4 text-slate-600" />
            <span className={stage.active ? "text-cyan-400 font-mono" : "text-slate-500 font-mono"}>
              {stage.output}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PriceBandVisualizer() {
  const currentPercent = ((priceBands.current - priceBands.floor) / (priceBands.ceiling - priceBands.floor)) * 100;
  const optimalPercent = ((priceBands.optimal - priceBands.floor) / (priceBands.ceiling - priceBands.floor)) * 100;
  
  return (
    <div className="relative">
      {/* Price bar background */}
      <div className="h-8 bg-slate-800 rounded-full overflow-hidden relative border border-slate-700">
        {/* Gradient zones */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-900/30 via-emerald-900/30 to-rose-900/30" />
        
        {/* Optimal zone */}
        <div 
          className="absolute top-0 bottom-0 bg-emerald-500/20"
          style={{ 
            left: `${optimalPercent - 10}%`, 
            width: "20%",
          }}
        />
        
        {/* Current price indicator */}
        <motion.div
          initial={{ left: 0 }}
          animate={{ left: `${currentPercent}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_10px_currentColor]"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="text-xs font-mono text-cyan-400">${priceBands.current}</span>
          </div>
        </motion.div>
      </div>
      
      {/* Labels */}
      <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono">
        <span>Floor: ${priceBands.floor}</span>
        <span className="text-emerald-400">Optimal: ${priceBands.optimal}</span>
        <span>Ceiling: ${priceBands.ceiling}</span>
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
  
  // Calculate pie chart segments
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
      {/* Custom scrollbar */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #020617;
        }
        ::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>

      <TokenomicsNavbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(cyan 1px, transparent 1px),
              linear-gradient(90deg, cyan 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Floating hexagons */}
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
            {/* Chrome badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 mb-6">
              <Microchip className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-mono text-slate-300">VODeco Tokenomics Engine</span>
              <span className="text-xs text-slate-500">v4.0</span>
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

            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Двухуровневая архитектура: VODCoin для разработки → VOD обеспеченный водой.
              <br />
              <span className="text-cyan-400 font-mono">1 VOD = 1 м³ верифицированной воды</span>
            </p>
          </motion.div>

          {/* --- METRICS GRID --- */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {metrics.map((metric, index) => (
              <MetricCard key={metric.id} metric={metric} index={index} />
            ))}
          </div>

          {/* --- MAIN DASHBOARD --- */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column - Gauges */}
            <div className="space-y-6">
              {/* Price Gauge */}
              <div className={`${darkPanel} rounded-xl p-6 relative overflow-hidden`}>
                <ScannerOverlay />
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6 relative z-10">
                  Price Monitor
                </h3>
                <GaugeMeter 
                  value={priceBands.current} 
                  min={priceBands.floor} 
                  max={priceBands.ceiling}
                  label="VOD/USD"
                  unit="$"
                  color="cyan"
                />
              </div>

              {/* Water Index */}
              <div className={`${darkPanel} rounded-xl p-6 relative overflow-hidden`}>
                <ScannerOverlay />
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6 relative z-10">
                  Water Index W_m³
                </h3>
                <GaugeMeter 
                  value={priceBands.optimal} 
                  min={0} 
                  max={2}
                  label="Base Index"
                  unit="$"
                  color="emerald"
                />
              </div>

              {/* Digital Counter */}
              <DigitalDisplay 
                value="1,386,000,000"
                label="Total Supply VOD"
              />
            </div>

            {/* Center column - Price Bands & Conversion */}
            <div className="lg:col-span-2 space-y-6">
              {/* Price Stabilization */}
              <div className={`${darkPanel} rounded-xl p-6`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    Price Stabilization Bands
                  </h3>
                  <StatusIndicator status="optimal" />
                </div>
                
                <PriceBandVisualizer />
                
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800">
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-1">Floor</div>
                    <div className="text-lg font-mono text-rose-400">${priceBands.floor}</div>
                    <div className="text-xs text-slate-600">DAO Buyback</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-1">Current</div>
                    <div className="text-lg font-mono text-cyan-400">${priceBands.current}</div>
                    <div className="text-xs text-slate-600">Market</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-500 mb-1">Ceiling</div>
                    <div className="text-lg font-mono text-amber-400">${priceBands.ceiling}</div>
                    <div className="text-xs text-slate-600">DAO Mint</div>
                  </div>
                </div>
              </div>

              {/* Conversion Pipeline */}
              <div className={`${darkPanel} rounded-xl p-6`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-cyan-400" />
                    VODCoin → VOD Conversion
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">Anti-Speculative</span>
                </div>
                
                <ConversionPipeline />
                
                <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-500 font-mono mb-2">FORMULA:</div>
                  <div className="text-sm text-slate-300 font-mono">
                    VOD = (VODCoin × Price_Coin) / W_m³ × (1 + Time_Bonus + Verify_Multiplier)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- ALLOCATION SECTION --- */}
          <div className={`${darkPanel} rounded-xl p-6 mt-6`}>
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
                  {/* Center hole */}
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

          {/* --- EMISSION MECHANICS --- */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className={`${darkPanel} rounded-xl p-6`}>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Data Anchoring Emission
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                  <div className="text-xs text-slate-500 font-mono mb-2">DAILY EMISSION PER NODE:</div>
                  <div className="text-lg font-mono text-cyan-400">
                    10 VOD × Uptime_% × Quality_Score × Network_Effect
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[
                    { label: "Base Rate", value: "10 VOD/day", color: "text-slate-400" },
                    { label: "Uptime Multiplier", value: "0.1 - 1.0", color: "text-emerald-400" },
                    { label: "Quality Score", value: "0.1 - 2.0", color: "text-cyan-400" },
                    { label: "Network Effect", value: "1.0 - 3.0", color: "text-amber-400" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">{item.label}</span>
                      <span className={`font-mono ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${darkPanel} rounded-xl p-6`}>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                W_m³ Index Formula
              </h3>
              
              <div className="space-y-3">
                {[
                  { label: "Base Energy", value: "$0.30", desc: "Добыча и транспорт" },
                  { label: "Treatment", value: "$0.40", desc: "Очистка до питьевой" },
                  { label: "Scarcity", value: "$0.20", desc: "Региональный дефицит" },
                  { label: "Quality", value: "$0.30", desc: "Индекс чистоты" },
                  { label: "Carbon", value: "$0.05", desc: "Углеродный след" },
                  { label: "Efficiency", value: "-$0.05", desc: "Экономия ресурсов", negative: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                    <div>
                      <div className="text-sm text-slate-300">{item.label}</div>
                      <div className="text-xs text-slate-600">{item.desc}</div>
                    </div>
                    <span className={`font-mono ${item.negative ? "text-rose-400" : "text-emerald-400"}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
                
                <div className="pt-3 mt-3 border-t-2 border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Total W_m³</span>
                    <span className="text-xl font-mono text-cyan-400">$1.20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- FOOTER CTA --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className={`${darkPanel} rounded-2xl p-8 max-w-3xl mx-auto relative overflow-hidden`}>
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-emerald-500/10" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-100 mb-2">
                  Начните зарабатывать VOD
                </h3>
                <p className="text-slate-400 mb-6">
                  Установите AquaCell или AquaHome, верифицируйте данные о воде 
                  и получайте токены за каждый кубометр оцифрованной воды.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Купить устройство
                  </button>
                  <button className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors border border-slate-700">
                    Стейкать VOD
                  </button>
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
              <span className="text-xs text-slate-500 ml-2 font-mono">v4.0.2-stable</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/" className="hover:text-cyan-400 transition-colors">Главная</Link>
            <Link href="/projecthub" className="hover:text-cyan-400 transition-colors">ProjectHub</Link>
            <Link href="/dao" className="hover:text-cyan-400 transition-colors">DAO</Link>
            <Link href="/whitepaper" className="hover:text-cyan-400 transition-colors">Whitepaper</Link>
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
