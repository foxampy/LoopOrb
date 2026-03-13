"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, FlaskConical, Cpu, Waves, Droplets, Microscope,
  Satellite, Target, Clock, CheckCircle2, Circle, Hexagon, Triangle,
  Sparkles, Lightbulb, TrendingUp, Users, Gem, Award, ArrowRight,
  Zap, Globe, Menu, X, Wallet
} from "lucide-react";

// --- UNIVERSAL NAVBAR FOR PROJECTHUB ---
function ProjectHubNavbar() {
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
    { href: "/projecthub", label: "ProjectHub", active: true },
    { href: "/tokenomics", label: "Tokenomics" },
    { href: "/dao", label: "DAO" },
    { href: "/profile", label: "Account" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled ? "bg-[#d4ede4]/95 backdrop-blur-xl border-[#1e3a5f]/20" : "bg-[#d4ede4] border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-[#2d6a4f] to-[#1e3a5f] flex items-center justify-center shadow-[0_4px_0_0_#1b4332]">
                <Droplets className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <span className="text-lg lg:text-xl font-bold text-[#1e3a5f]">VODeco</span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {pageLinks.map((link) => (
                <Link key={link.href} href={link.href} 
                  className={`text-sm font-medium transition-colors ${
                    link.active 
                      ? "text-[#2d6a4f]" 
                      : "text-[#1e3a5f]/70 hover:text-[#2d6a4f]"
                  }`}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/wallet" 
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#2d6a4f] hover:bg-[#1b4332] text-[#e8f5f0] rounded-lg transition-colors text-sm font-medium border-2 border-[#1b4332] shadow-[0_3px_0_0_#1b4332] active:translate-y-[2px] active:shadow-none">
                <Wallet className="w-4 h-4" />
                <span>Wallet</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="lg:hidden p-2 text-[#1e3a5f]">
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
            className="fixed inset-x-0 top-16 z-40 lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto bg-[#d4ede4] border-b border-[#1e3a5f]/20"
          >
            <div className="px-4 py-4">
              <div className="mb-4">
                <div className="text-xs font-semibold uppercase tracking-wider mb-2 px-2 text-[#1e3a5f]/60">Navigation</div>
                <div className="grid grid-cols-2 gap-2">
                  {pageLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} 
                       className={`flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                         link.active 
                           ? "bg-[#2d6a4f]/10 text-[#2d6a4f] font-medium" 
                           : "text-[#1e3a5f] hover:bg-[#1e3a5f]/10"
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
interface Project {
  id: string;
  name: string;
  code: string;
  category: "hardware" | "software" | "infrastructure" | "research";
  status: "concept" | "development" | "testing" | "production";
  budget: string;
  timeline: string;
  progress: number;
  description: string;
  icon: any;
  color: string;
  team: number;
  impact: string;
}

interface Milestone {
  id: string;
  projectId: string;
  title: string;
  date: string;
  completed: boolean;
}

// --- MOCK DATA ---
const projects: Project[] = [
  {
    id: "aquacell-genesis",
    name: "AquaCell Genesis",
    code: "AC-G1",
    category: "hardware",
    status: "production",
    budget: "$450,000",
    timeline: "Q1-Q4 2025",
    progress: 85,
    description: "Портативная лаборатория для анализа воды с лабораторной точностью ±2%. Lab-on-chip технология с NFC-верификацией картриджей.",
    icon: FlaskConical,
    color: "mint",
    team: 12,
    impact: "2,400+ устройств",
  },
  {
    id: "aquahome-pro",
    name: "AquaHome Pro",
    code: "AH-P1",
    category: "hardware",
    status: "testing",
    budget: "$350,000",
    timeline: "Q2-Q4 2025",
    progress: 62,
    description: "Стационарная система мониторинга с автосэмплером TimeCapsule. 12 проб/квартал + real-time Guardian на выходе фильтра.",
    icon: HomeIcon,
    color: "mint",
    team: 8,
    impact: "Beta: 150 домов",
  },
  {
    id: "vod-chain",
    name: "VOD Chain Core",
    code: "VC-C1",
    category: "software",
    status: "development",
    budget: "$600,000",
    timeline: "Q1-Q3 2025",
    progress: 45,
    description: "Блокчейн-ядро на TON с 10k TPS. Data Anchoring Protocol — верификация водных данных через криптографические хеши.",
    icon: Cpu,
    color: "navy",
    team: 15,
    impact: "Testnet live",
  },
  {
    id: "ai-analytics",
    name: "AI Analytics Engine",
    code: "AI-A1",
    category: "software",
    status: "development",
    budget: "$480,000",
    timeline: "Q2-Q4 2025",
    progress: 38,
    description: "ML-модели прогнозирования качества воды. Edge computing + централизованное обучение. Точность прогнозов >85%.",
    icon: BrainIcon,
    color: "navy",
    team: 10,
    impact: "MVP ready",
  },
  {
    id: "aquadrone",
    name: "AquaDrone Fleet",
    code: "AD-F1",
    category: "infrastructure",
    status: "concept",
    budget: "$1,200,000",
    timeline: "2025-2026",
    progress: 15,
    description: "Автономные катамараны для удалённого сэмплирования. 4-6 часов автономности, доставка проб между буями.",
    icon: Satellite,
    color: "mint",
    team: 6,
    impact: "R&D phase",
  },
  {
    id: "desci-protocol",
    name: "DeSci Verification",
    code: "DS-V1",
    category: "research",
    status: "testing",
    budget: "$180,000",
    timeline: "Q3-Q4 2025",
    progress: 70,
    description: "Протокол peer-review на блокчейне. Верификация научных исследований с токенизацией IP через IP-NFT.",
    icon: Microscope,
    color: "navy",
    team: 5,
    impact: "Pilot: 50 papers",
  },
];

const milestones: Milestone[] = [
  { id: "m1", projectId: "aquacell-genesis", title: "Прототип MEMS-спектрометра", date: "2025-01", completed: true },
  { id: "m2", projectId: "aquacell-genesis", title: "Калибровка ±2% точности", date: "2025-03", completed: true },
  { id: "m3", projectId: "aquacell-genesis", title: "NFC-защита картриджей", date: "2025-05", completed: true },
  { id: "m4", projectId: "aquacell-genesis", title: "Сертификация ISO", date: "2025-07", completed: false },
  { id: "m5", projectId: "vod-chain", title: "Testnet запуск", date: "2025-02", completed: true },
  { id: "m6", projectId: "vod-chain", title: "Data Anchoring v1", date: "2025-04", completed: false },
  { id: "m7", projectId: "vod-chain", title: "Mainnet релиз", date: "2025-08", completed: false },
];

const stats = [
  { label: "Активных проектов", value: "12", icon: Rocket, trend: "+3" },
  { label: "Исследователей", value: "156", icon: Users, trend: "+24" },
  { label: "Бюджет R&D", value: "$4.2M", icon: Gem, trend: "Q2" },
  { label: "Патентов", value: "23", icon: Award, trend: "+5" },
];

// --- HELPER COMPONENTS ---
function HomeIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function BrainIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}

// --- NEO-BRUTALIST CARD ---
function NeomorphicCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div
      className={`
        relative bg-[#e8f5f0] rounded-2xl
        ${hover ? "hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_#1e3a5f]" : ""}
        transition-all duration-300 ease-out
        border-2 border-[#1e3a5f]/20
        shadow-[4px_4px_0px_0px_#1e3a5f]/30
        ${className}
      `}
    >
      {/* Texture overlay */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// --- RETRO BUTTON ---
function RetroButton({ children, variant = "primary", className = "", onClick }: { children: React.ReactNode; variant?: "primary" | "secondary" | "outline"; className?: string; onClick?: () => void }) {
  const variants = {
    primary: "bg-[#2d6a4f] text-[#e8f5f0] border-[#1b4332] shadow-[4px_4px_0px_0px_#1b4332]",
    secondary: "bg-[#1e3a5f] text-[#e8f5f0] border-[#0d1b2a] shadow-[4px_4px_0px_0px_#0d1b2a]",
    outline: "bg-transparent text-[#1e3a5f] border-[#1e3a5f] shadow-[3px_3px_0px_0px_#1e3a5f]/50",
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-3 rounded-xl font-semibold text-sm uppercase tracking-wider
        border-2 ${variants[variant]}
        hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_currentColor]
        active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_currentColor]
        transition-all duration-150
        ${className}
      `}
    >
      {children}
    </button>
  );
}

// --- PROJECT CARD ---
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon;
  const isMint = project.color === "mint";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <NeomorphicCard className="h-full group">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`
              w-14 h-14 rounded-xl flex items-center justify-center
              ${isMint ? "bg-[#2d6a4f]/10 text-[#2d6a4f]" : "bg-[#1e3a5f]/10 text-[#1e3a5f]"}
              border-2 ${isMint ? "border-[#2d6a4f]/30" : "border-[#1e3a5f]/30"}
              group-hover:scale-110 transition-transform duration-300
            `}>
              <Icon className="w-7 h-7" />
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-[#1e3a5f]/60 uppercase tracking-wider">{project.code}</div>
              <div className={`
                inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mt-1
                ${project.status === "production" ? "bg-[#2d6a4f]/20 text-[#2d6a4f]" :
                  project.status === "testing" ? "bg-[#f4a261]/20 text-[#e76f51]" :
                  project.status === "development" ? "bg-[#1e3a5f]/20 text-[#1e3a5f]" :
                  "bg-[#6c757d]/20 text-[#6c757d]"}
              `}>
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  project.status === "production" ? "bg-[#2d6a4f]" :
                  project.status === "testing" ? "bg-[#e76f51]" :
                  project.status === "development" ? "bg-[#1e3a5f]" : "bg-[#6c757d]"
                }`} />
                {project.status === "production" ? "В производстве" :
                 project.status === "testing" ? "Тестирование" :
                 project.status === "development" ? "Разработка" : "Концепт"}
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-xl font-bold text-[#1e3a5f] mb-2 group-hover:text-[#2d6a4f] transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-[#1e3a5f]/70 leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#1e3a5f]/60 font-medium">Прогресс</span>
              <span className="text-[#2d6a4f] font-bold">{project.progress}%</span>
            </div>
            <div className="h-3 bg-[#1e3a5f]/10 rounded-full overflow-hidden border border-[#1e3a5f]/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                className={`
                  h-full rounded-full relative
                  ${isMint ? "bg-gradient-to-r from-[#2d6a4f] to-[#40916c]" : "bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87]"}
                `}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </motion.div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-[#1e3a5f]/5 rounded-lg p-2 text-center border border-[#1e3a5f]/10">
              <div className="text-xs text-[#1e3a5f]/50 mb-1">Бюджет</div>
              <div className="text-sm font-bold text-[#1e3a5f]">{project.budget}</div>
            </div>
            <div className="bg-[#1e3a5f]/5 rounded-lg p-2 text-center border border-[#1e3a5f]/10">
              <div className="text-xs text-[#1e3a5f]/50 mb-1">Команда</div>
              <div className="text-sm font-bold text-[#1e3a5f]">{project.team}</div>
            </div>
            <div className="bg-[#1e3a5f]/5 rounded-lg p-2 text-center border border-[#1e3a5f]/10">
              <div className="text-xs text-[#1e3a5f]/50 mb-1">Таймлайн</div>
              <div className="text-sm font-bold text-[#1e3a5f]">{project.timeline}</div>
            </div>
          </div>

          {/* Impact Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#1e3a5f]/60">
              <Target className="w-3.5 h-3.5" />
              <span>Impact: <span className="text-[#2d6a4f] font-semibold">{project.impact}</span></span>
            </div>
            <button className="text-[#2d6a4f] hover:text-[#1e3a5f] transition-colors">
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </NeomorphicCard>
    </motion.div>
  );
}

// --- MILESTONE TIMELINE ---
function MilestoneTimeline() {
  const projectMilestones = milestones.filter(m => m.projectId === "aquacell-genesis");
  
  return (
    <NeomorphicCard className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center border-2 border-[#2d6a4f]/30">
          <Clock className="w-5 h-5 text-[#2d6a4f]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#1e3a5f]">Майлстоуны AquaCell</h3>
          <p className="text-xs text-[#1e3a5f]/60">Дорожная карта разработки</p>
        </div>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-8 bottom-4 w-0.5 bg-[#1e3a5f]/20" />
        
        <div className="space-y-4">
          {projectMilestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative flex items-start gap-4"
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10
                border-2 ${milestone.completed 
                  ? "bg-[#2d6a4f] border-[#2d6a4f] text-white" 
                  : "bg-[#e8f5f0] border-[#1e3a5f]/30 text-[#1e3a5f]/40"}
              `}>
                {milestone.completed ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>
              <div className={`flex-1 pb-4 ${index !== projectMilestones.length - 1 ? "border-b border-[#1e3a5f]/10" : ""}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-medium ${milestone.completed ? "text-[#1e3a5f]" : "text-[#1e3a5f]/50"}`}>
                    {milestone.title}
                  </span>
                  <span className="text-xs font-mono text-[#1e3a5f]/40">{milestone.date}</span>
                </div>
                {milestone.completed && (
                  <span className="text-xs text-[#2d6a4f] font-medium">✓ Завершено</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </NeomorphicCard>
  );
}

// --- RETRO STATS CARD ---
function RetroStatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const Icon = stat.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <NeomorphicCard className="p-5 h-full">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center border-2 border-[#2d6a4f]/30">
            <Icon className="w-6 h-6 text-[#2d6a4f]" />
          </div>
          <span className="text-xs font-mono text-[#2d6a4f] bg-[#2d6a4f]/10 px-2 py-1 rounded-full">
            {stat.trend}
          </span>
        </div>
        <div className="text-3xl font-bold text-[#1e3a5f] mb-1">{stat.value}</div>
        <div className="text-sm text-[#1e3a5f]/60">{stat.label}</div>
      </NeomorphicCard>
    </motion.div>
  );
}

// --- DECORATIVE RETRO ELEMENTS ---
function RetroDecorations() {
  return (
    <>
      {/* Floating geometric shapes */}
      <motion.div
        animate={{ 
          y: [0, -20, 0], 
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-24 h-24 opacity-10 pointer-events-none"
      >
        <Hexagon className="w-full h-full text-[#1e3a5f]" strokeWidth={1} />
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 15, 0], 
          rotate: [0, -10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 left-10 w-16 h-16 opacity-10 pointer-events-none"
      >
        <Triangle className="w-full h-full text-[#2d6a4f]" strokeWidth={1} />
      </motion.div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#1e3a5f 1px, transparent 1px),
            linear-gradient(90deg, #1e3a5f 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </>
  );
}

// --- MAIN PAGE ---
export default function ProjectHubPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const filters = [
    { id: "all", label: "Все проекты", count: projects.length },
    { id: "hardware", label: "Hardware", count: projects.filter(p => p.category === "hardware").length },
    { id: "software", label: "Software", count: projects.filter(p => p.category === "software").length },
    { id: "infrastructure", label: "Инфраструктура", count: projects.filter(p => p.category === "infrastructure").length },
    { id: "research", label: "Исследования", count: projects.filter(p => p.category === "research").length },
  ];

  return (
    <div className="min-h-screen bg-[#d4ede4] text-[#1e3a5f] overflow-x-hidden">
      {/* Custom scrollbar styles */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #d4ede4;
        }
        ::-webkit-scrollbar-thumb {
          background: #1e3a5f;
          border-radius: 5px;
          border: 2px solid #d4ede4;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #2d6a4f;
        }
      `}</style>

      <ProjectHubNavbar />
      <RetroDecorations />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a5f]/10 rounded-full border-2 border-[#1e3a5f]/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#2d6a4f]" />
              <span className="text-sm font-medium text-[#1e3a5f]">VODeco ProjectHub</span>
              <span className="text-xs text-[#1e3a5f]/50 font-mono">v2.0</span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-black text-[#1e3a5f] mb-6 tracking-tight">
              <span className="relative inline-block">
                ЦЕНТР
                <motion.span
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-8 h-8"
                >
                  <Sparkles className="w-full h-full text-[#f4a261]" />
                </motion.span>
              </span>
              <br />
              <span className="text-[#2d6a4f]">РАЗРАБОТОК</span>
            </h1>

            <p className="text-lg md:text-xl text-[#1e3a5f]/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              Экосистема инновационных проектов для децентрализованной экономики воды. 
              От автономных лабораторий до блокчейн-протоколов.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <RetroButton variant="primary">
                <span className="flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Предложить проект
                </span>
              </RetroButton>
              <RetroButton variant="outline">
                <span className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Стать контрибьютором
                </span>
              </RetroButton>
            </div>
          </motion.div>

          {/* --- STATS GRID --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <RetroStatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>

          {/* --- FILTER TABS --- */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${activeFilter === filter.id
                    ? "bg-[#1e3a5f] text-[#e8f5f0] shadow-[4px_4px_0px_0px_#0d1b2a]"
                    : "bg-[#e8f5f0] text-[#1e3a5f] border-2 border-[#1e3a5f]/20 hover:border-[#1e3a5f]/40"
                  }
                `}
              >
                {filter.label}
                <span className={`
                  ml-2 text-xs px-1.5 py-0.5 rounded-full
                  ${activeFilter === filter.id ? "bg-[#e8f5f0]/20" : "bg-[#1e3a5f]/10"}
                `}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* --- PROJECTS GRID --- */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </div>

          {/* --- BOTTOM SECTION: TIMELINE + INFO --- */}
          <div className="grid lg:grid-cols-2 gap-6">
            <MilestoneTimeline />
            
            {/* Ecosystem Info Card */}
            <NeomorphicCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center border-2 border-[#1e3a5f]/30">
                  <Globe className="w-5 h-5 text-[#1e3a5f]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1e3a5f]">Экосистема VODeco</h3>
                  <p className="text-xs text-[#1e3a5f]/60">12-слойная архитектура</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#1e3a5f]/5 rounded-xl p-4 border border-[#1e3a5f]/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Waves className="w-5 h-5 text-[#2d6a4f]" />
                    <span className="font-semibold text-[#1e3a5f]">Физический слой</span>
                  </div>
                  <p className="text-sm text-[#1e3a5f]/60">
                    Датчики, IoT-устройства, автономные лаборатории — всё оборудование для сбора данных.
                  </p>
                </div>

                <div className="bg-[#1e3a5f]/5 rounded-xl p-4 border border-[#1e3a5f]/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Cpu className="w-5 h-5 text-[#1e3a5f]" />
                    <span className="font-semibold text-[#1e3a5f]">Блокчейн слой</span>
                  </div>
                  <p className="text-sm text-[#1e3a5f]/60">
                    VOD Chain с Data Anchoring — криптографическая верификация всех водных данных.
                  </p>
                </div>

                <div className="bg-[#1e3a5f]/5 rounded-xl p-4 border border-[#1e3a5f]/10">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-[#f4a261]" />
                    <span className="font-semibold text-[#1e3a5f]">Экономический слой</span>
                  </div>
                  <p className="text-sm text-[#1e3a5f]/60">
                    Water-backed токеномика: 1 VOD = 1 м³ верифицированной воды.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t-2 border-[#1e3a5f]/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#1e3a5f]/60">Всего проектов в хабе</span>
                  <span className="text-2xl font-bold text-[#2d6a4f]">12</span>
                </div>
              </div>
            </NeomorphicCard>
          </div>

          {/* --- FOOTER CTA --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <NeomorphicCard className="p-8 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-[#2d6a4f] flex items-center justify-center flex-shrink-0">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-[#1e3a5f] mb-2">
                    Готовы строить будущее водной экономики?
                  </h3>
                  <p className="text-[#1e3a5f]/60 mb-4">
                    Присоединяйтесь к 156+ исследователям и разработчикам. 
                    Получите грант на разработку вашего проекта в VODCoin.
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <RetroButton variant="primary">
                      <span className="flex items-center gap-2">
                        Подать заявку
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </RetroButton>
                    <RetroButton variant="outline">
                      <span className="flex items-center gap-2">
                        Документация
                      </span>
                    </RetroButton>
                  </div>
                </div>
              </div>
            </NeomorphicCard>
          </motion.div>
        </div>
      </section>

      {/* --- DECORATIVE FOOTER --- */}
      <footer className="py-8 px-4 border-t-2 border-[#1e3a5f]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2d6a4f] flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#1e3a5f]">VODeco ProjectHub</span>
            <span className="text-xs text-[#1e3a5f]/40 font-mono">v2.0.1-beta</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#1e3a5f]/60">
            <Link href="/" className="hover:text-[#2d6a4f] transition-colors">Главная</Link>
            <Link href="/tokenomics" className="hover:text-[#2d6a4f] transition-colors">Токеномика</Link>
            <Link href="/dao" className="hover:text-[#2d6a4f] transition-colors">DAO</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
