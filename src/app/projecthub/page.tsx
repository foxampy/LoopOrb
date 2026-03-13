"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, FlaskConical, Cpu, Waves, Droplets, Microscope,
  Satellite, Target, Clock, CheckCircle2, Circle, Hexagon, Triangle,
  Sparkles, Lightbulb, TrendingUp, Users, Gem, Award, ArrowRight,
  Zap, Globe, Menu, X, Wallet, FileText, FileCheck, Hash, Box,
  Lock, Unlock, Vote, Coins, Brain, Shield
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

// --- PROJECT LIFECYCLE COMPONENT ---
function ProjectLifecycle() {
  const stages = [
    {
      id: 1,
      title: "Proposal Submission",
      subtitle: "Подготовка предложения",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      details: [
        "Описание проекта и целей",
        "Таймлайн и milestones",
        "Бюджет и распределение",
        "Информация о команде"
      ]
    },
    {
      id: 2,
      title: "Community Review",
      subtitle: "Обзор сообществом",
      icon: Users,
      color: "from-cyan-500 to-teal-500",
      details: [
        "7-14 дней публичного ревью",
        "Peer review от экспертов",
        "Обсуждение в Discord",
        "Правки по обратной связи"
      ]
    },
    {
      id: 3,
      title: "DAO Voting",
      subtitle: "Голосование DAO",
      icon: Vote,
      color: "from-teal-500 to-emerald-500",
      details: [
        "Квадратичное голосование",
        "Quorum: 5% от staked VOD",
        "Порог одобрения: 60%",
        "7 дней голосования"
      ]
    },
    {
      id: 4,
      title: "Development",
      subtitle: "Разработка",
      icon: Cpu,
      color: "from-emerald-500 to-green-500",
      details: [
        "Smart contract escrow",
        "Milestone-based funding",
        "Регулярные обновления",
        "Открытый репозиторий"
      ]
    },
    {
      id: 5,
      title: "Milestone Verification",
      subtitle: "Верификация этапов",
      icon: FileCheck,
      color: "from-green-500 to-lime-500",
      details: [
        "Предоставление доказательств",
        "DAO verification vote",
        "Release next tranche",
        "Или project termination"
      ]
    },
    {
      id: 6,
      title: "IP-NFT Creation",
      subtitle: "Коммерциализация",
      icon: Hash,
      color: "from-lime-500 to-yellow-500",
      details: [
        "Создание IP-NFT",
        "Токенизация интеллектуальной собственности",
        "Revenue distribution",
        "40% инвесторам, 30% команде"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {stages.map((stage, index) => (
        <motion.div
          key={stage.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative flex items-start gap-4 p-4 rounded-xl border bg-[#e8f5f0] border-[#1e3a5f]/20"
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${stage.color}`}>
            <stage.icon className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-[#1e3a5f]">{stage.id}. {stage.title}</span>
            </div>
            <div className="text-sm text-[#2d6a4f] mb-2">{stage.subtitle}</div>
            <div className="space-y-1">
              {stage.details.map((detail, i) => (
                <div key={i} className="text-xs text-[#1e3a5f]/60 flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#1e3a5f]/40" />
                  {detail}
                </div>
              ))}
            </div>
          </div>
          
          {index < stages.length - 1 && (
            <div className="absolute -bottom-3 left-6 w-px h-6 bg-gradient-to-b from-[#1e3a5f]/20 to-transparent" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// --- FUNDING TIERS COMPONENT ---
function FundingTiers() {
  const tiers = [
    { name: "Micro Grant", amount: "$5K - $20K", duration: "3 months", requirements: "MVP, 1 milestone", color: "from-slate-500 to-slate-600" },
    { name: "Seed Grant", amount: "$20K - $100K", duration: "6 months", requirements: "Team, prototype", color: "from-cyan-500 to-blue-500" },
    { name: "Growth Grant", amount: "$100K - $500K", duration: "12 months", requirements: "Traction, partners", color: "from-emerald-500 to-teal-500", featured: true },
    { name: "Scale Grant", amount: "$500K - $2M", duration: "24 months", requirements: "Revenue, market fit", color: "from-amber-500 to-orange-500" },
    { name: "Moonshot", amount: "$2M+", duration: "36 months", requirements: "Breakthrough tech", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {tiers.map((tier, index) => (
        <motion.div
          key={tier.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`relative p-4 rounded-xl border ${tier.featured ? 'border-[#2d6a4f] border-2' : 'border-[#1e3a5f]/20'} bg-[#e8f5f0]`}
        >
          {tier.featured && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#2d6a4f] text-white text-[10px] font-bold rounded-full">
              POPULAR
            </div>
          )}
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tier.color} flex items-center justify-center mb-3`}>
            <Coins className="w-4 h-4 text-white" />
          </div>
          <h4 className="font-bold text-[#1e3a5f] text-sm mb-1">{tier.name}</h4>
          <div className="text-lg font-bold text-[#2d6a4f] mb-2">{tier.amount}</div>
          <div className="text-xs text-[#1e3a5f]/60 space-y-1">
            <div>Duration: {tier.duration}</div>
            <div className="text-[10px]">{tier.requirements}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

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

// --- MAIN PAGE ---
export default function ProjectHubPage() {
  return (
    <div className="min-h-screen bg-[#d4ede4] text-[#1e3a5f] overflow-x-hidden">
      <style jsx global>{`
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #d4ede4; }
        ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 5px; border: 2px solid #d4ede4; }
        ::-webkit-scrollbar-thumb:hover { background: #2d6a4f; }
      `}</style>

      <ProjectHubNavbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e3a5f]/10 rounded-full border-2 border-[#1e3a5f]/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#2d6a4f]" />
              <span className="text-sm font-medium text-[#1e3a5f]">VODeco ProjectHub</span>
              <span className="text-xs text-[#1e3a5f]/50 font-mono">v1.0</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black text-[#1e3a5f] mb-6 tracking-tight">
              <span className="relative inline-block">
                DeSci
                <motion.span
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-8 h-8"
                >
                  <Sparkles className="w-full h-full text-[#f4a261]" />
                </motion.span>
              </span>
              <br />
              <span className="text-[#2d6a4f]">PROJECTHUB</span>
            </h1>

            <p className="text-lg md:text-xl text-[#1e3a5f]/70 max-w-3xl mx-auto mb-8 leading-relaxed">
              Децентрализованная платформа для финансирования, разработки и коммерциализации 
              инноваций в области водных технологий. Открытая наука с токенизацией IP через IP-NFT.
            </p>

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
                  Стать инвестором
                </span>
              </RetroButton>
            </div>
          </motion.div>

          {/* --- PROJECT LIFECYCLE --- */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <NeomorphicCard className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center border-2 border-[#2d6a4f]/30">
                  <Target className="w-5 h-5 text-[#2d6a4f]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1e3a5f]">Жизненный Цикл Проекта</h3>
                  <p className="text-xs text-[#1e3a5f]/60">От идеи до коммерциализации</p>
                </div>
              </div>
              <ProjectLifecycle />
            </NeomorphicCard>

            <div className="space-y-6">
              {/* IP-NFT Info */}
              <NeomorphicCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center border-2 border-[#1e3a5f]/30">
                    <Hash className="w-5 h-5 text-[#1e3a5f]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1e3a5f]">IP-NFT Integration</h3>
                    <p className="text-xs text-[#1e3a5f]/60">Токенизация интеллектуальной собственности</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#1e3a5f]/5 rounded-lg">
                    <span className="text-sm text-[#1e3a5f]">Инвесторам проекта</span>
                    <span className="font-bold text-[#2d6a4f]">40%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#1e3a5f]/5 rounded-lg">
                    <span className="text-sm text-[#1e3a5f]">Команде разработки</span>
                    <span className="font-bold text-[#2d6a4f]">30%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#1e3a5f]/5 rounded-lg">
                    <span className="text-sm text-[#1e3a5f]">DAO Treasury</span>
                    <span className="font-bold text-[#2d6a4f]">20%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#1e3a5f]/5 rounded-lg">
                    <span className="text-sm text-[#1e3a5f]">Community Rewards</span>
                    <span className="font-bold text-[#2d6a4f]">10%</span>
                  </div>
                </div>
              </NeomorphicCard>

              {/* Milestone Based Funding */}
              <NeomorphicCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center border-2 border-[#2d6a5f]/30">
                    <CheckCircle2 className="w-5 h-5 text-[#2d6a4f]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1e3a5f]">Milestone-Based Payouts</h3>
                    <p className="text-xs text-[#1e3a5f]/60">Структура выплат по этапам</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold">1</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#1e3a5f]">После голосования DAO</div>
                      <div className="text-xs text-[#1e3a5f]/60">20% начальный капитал</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-[#1e3a5f]/5">
                    <div className="w-8 h-8 rounded-full bg-[#1e3a5f]/30 flex items-center justify-center text-white text-sm font-bold">2</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#1e3a5f]">Milestone 1 Complete</div>
                      <div className="text-xs text-[#1e3a5f]/60">30% после верификации</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-[#1e3a5f]/5">
                    <div className="w-8 h-8 rounded-full bg-[#1e3a5f]/30 flex items-center justify-center text-white text-sm font-bold">3</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#1e3a5f]">Milestone 2 Complete</div>
                      <div className="text-xs text-[#1e3a5f]/60">30% после верификации</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-[#1e3a5f]/5">
                    <div className="w-8 h-8 rounded-full bg-[#1e3a5f]/30 flex items-center justify-center text-white text-sm font-bold">4</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-[#1e3a5f]">Финальный отчет</div>
                      <div className="text-xs text-[#1e3a5f]/60">20% после сдачи</div>
                    </div>
                  </div>
                </div>
              </NeomorphicCard>
            </div>
          </div>

          {/* --- FUNDING TIERS --- */}
          <NeomorphicCard className="p-6 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center border-2 border-[#2d6a4f]/30">
                <Coins className="w-5 h-5 text-[#2d6a4f]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1e3a5f]">Уровни Финансирования</h3>
                <p className="text-xs text-[#1e3a5f]/60">От микро-грантов до moonshot-проектов</p>
              </div>
            </div>
            <FundingTiers />
          </NeomorphicCard>

          {/* --- PROJECT CATEGORIES --- */}
          <NeomorphicCard className="p-6 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center border-2 border-[#1e3a5f]/30">
                <FlaskConical className="w-5 h-5 text-[#1e3a5f]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1e3a5f]">Категории Проектов</h3>
                <p className="text-xs text-[#1e3a5f]/60">4 направления исследований и разработок</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { 
                  icon: Cpu, 
                  title: "Hardware Innovation", 
                  desc: "AquaCell Pro, AquaDrones, Portable Test Kits, Smart Filters",
                  color: "from-blue-500 to-cyan-500"
                },
                { 
                  icon: Droplets, 
                  title: "Water Treatment", 
                  desc: "Desalination, Bio-filtration, Nano-filtration, Solar Purification",
                  color: "from-cyan-500 to-teal-500"
                },
                { 
                  icon: Brain, 
                  title: "Data & Analytics", 
                  desc: "AI Prediction, Blockchain Registry, Climate Analysis, Leak Detection",
                  color: "from-emerald-500 to-green-500"
                },
                { 
                  icon: Users, 
                  title: "Community Solutions", 
                  desc: "Rural Water Access, Education, Emergency Response, Indigenous Rights",
                  color: "from-amber-500 to-orange-500"
                },
              ].map((cat, index) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl border border-[#1e3a5f]/20 bg-[#e8f5f0]"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3`}>
                    <cat.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-bold text-[#1e3a5f] text-sm mb-2">{cat.title}</h4>
                  <p className="text-xs text-[#1e3a5f]/60">{cat.desc}</p>
                </motion.div>
              ))}
            </div>
          </NeomorphicCard>

          {/* --- STATS & METRICS --- */}
          <div className="grid md:grid-cols-4 gap-4 mb-16">
            {[
              { label: "Целевая цель (12м)", value: "25", sub: "активных проектов", icon: Rocket },
              { label: "Финансирование", value: "$2M", sub: "общий бюджет", icon: Coins },
              { label: "IP-NFTs", value: "10", sub: "создано", icon: Hash },
              { label: "Успешность", value: "70%", sub: "target success rate", icon: Target },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <NeomorphicCard className="p-5 text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center border-2 border-[#2d6a4f]/30 mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-[#2d6a4f]" />
                  </div>
                  <div className="text-3xl font-bold text-[#1e3a5f] mb-1">{stat.value}</div>
                  <div className="text-sm text-[#1e3a5f]/70">{stat.label}</div>
                  <div className="text-xs text-[#2d6a4f] mt-1">{stat.sub}</div>
                </NeomorphicCard>
              </motion.div>
            ))}
          </div>

          {/* --- GOVERNANCE RIGHTS --- */}
          <NeomorphicCard className="p-6 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center border-2 border-[#2d6a4f]/30">
                <Vote className="w-5 h-5 text-[#2d6a4f]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1e3a5f]">Уровни Участия и Права</h3>
                <p className="text-xs text-[#1e3a5f]/60">В зависимости от уровня инвестиций</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-[#1e3a5f]/20">
                    <th className="text-left py-3 px-4 text-sm font-bold text-[#1e3a5f]">Уровень</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-[#1e3a5f]">Инвестиции</th>
                    <th className="text-left py-3 px-4 text-sm font-bold text-[#1e3a5f]">Права</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { level: "Observer", investment: "$0 - $100", rights: "Чтение, комментарии" },
                    { level: "Contributor", investment: "$100 - $1,000", rights: "Голосование, Q&A" },
                    { level: "Supporter", investment: "$1,000 - $10,000", rights: "Создание предложений" },
                    { level: "Patron", investment: "$10,000 - $100,000", rights: "Приоритетный доступ, advisory" },
                    { level: "Champion", investment: "$100,000+", rights: "Board seat, стратегические решения" },
                  ].map((row, index) => (
                    <tr key={row.level} className="border-b border-[#1e3a5f]/10">
                      <td className="py-3 px-4 text-sm font-medium text-[#2d6a4f]">{row.level}</td>
                      <td className="py-3 px-4 text-sm text-[#1e3a5f]">{row.investment}</td>
                      <td className="py-3 px-4 text-sm text-[#1e3a5f]/70">{row.rights}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </NeomorphicCard>

          {/* --- CTA --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
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
                    Присоединяйтесь к экосистеме исследователей и разработчиков. 
                    Получите грант на разработку вашего проекта в VOD.
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

      {/* --- FOOTER --- */}
      <footer className="py-8 px-4 border-t-2 border-[#1e3a5f]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2d6a4f] flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[#1e3a5f]">VODeco ProjectHub</span>
            <span className="text-xs text-[#1e3a5f]/40 font-mono">v1.0</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#1e3a5f]/60">
            <Link href="/landing" className="hover:text-[#2d6a4f] transition-colors">Staking</Link>
            <Link href="/tokenomics" className="hover:text-[#2d6a4f] transition-colors">Токеномика</Link>
            <Link href="/dao" className="hover:text-[#2d6a4f] transition-colors">DAO</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
