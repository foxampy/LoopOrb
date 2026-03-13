"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { I18nProvider, useI18n } from "@/i18n/I18nContext";
import LanguageSelector from "@/components/LanguageSelector";
import {
  Droplets, Shield, Globe, Users, TrendingUp, Lock, Unlock, Zap, 
  Activity, ChevronDown, ArrowRight, CheckCircle2, AlertTriangle, 
  Menu, X, Wallet, Microscope, Target, Gem, Eye, Award,
  Calculator, ChevronRight, PieChart, Layers, Database, Server,
  Hexagon, Sparkles, Beaker, FlaskConical, ArrowUpRight,
  Clock, Percent, FileText, HelpCircle, Mail, ExternalLink,
  Plus, Minus
} from "lucide-react";

// --- ANIMATED COUNTER ---
function CountUp({ end, duration = 2, suffix = "", prefix = "" }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// --- NAVBAR ---
function Navbar() {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#crisis", label: t("crisis.label") },
    { href: "#dao", label: t("dao.label") },
    { href: "#staking", label: t("staking.label") },
    { href: "#projecthub", label: t("projecthub.label") },
    { href: "#faq", label: t("faq.label") },
  ];

  const pageLinks = [
    { href: "/landing", label: "Staking" },
    { href: "/ecosystem", label: "Ecosystem" },
    { href: "/projecthub", label: "ProjectHub" },
    { href: "/tokenomics", label: "Tokenomics" },
    { href: "/dao", label: "DAO" },
    { href: "/profile", label: "Account" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                <Droplets className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <span className="text-lg lg:text-xl font-bold text-white">VODeco</span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {pageLinks.map((link) => (
                <Link key={link.href} href={link.href} 
                  className={`text-sm transition-colors ${link.href === '/landing' ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'}`}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              <LanguageSelector />
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm">
                <Wallet className="w-4 h-4" />
                <span>{t("nav.connect")}</span>
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-slate-300">
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
            className="fixed inset-x-0 top-16 z-40 bg-slate-950/98 backdrop-blur-xl border-b border-slate-800 lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="px-4 py-4">
              {/* Page Links Grid */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Pages</div>
                <div className="grid grid-cols-2 gap-2">
                  {pageLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} 
                       className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Anchor Links */}
              <div className="border-t border-slate-800 pt-3">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">On this page</div>
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} 
                       className="block text-sm text-slate-300 hover:text-cyan-400 transition-colors py-2 px-2">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg mt-4 transition-colors">
                <Wallet className="w-5 h-5" />
                {t("nav.connect")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- HERO SECTION ---
function HeroSection() {
  const { t } = useI18n();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[150px]" />
        <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[150px]" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-6">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="text-sm text-red-300 font-medium">{t("hero.badge")}</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
          <span className="block">{t("hero.title")}</span>
          <span className="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {t("hero.subtitle")}
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-8">
          {t("hero.description")}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#staking" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
            <Zap className="w-5 h-5" />
            {t("hero.cta_primary")}
          </a>
          <a href="#projecthub" className="w-full sm:w-auto px-6 py-3 bg-slate-800/50 hover:bg-slate-800 text-white font-medium rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2">
            <Microscope className="w-5 h-5" />
            {t("hero.cta_secondary")}
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2 text-slate-500">
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// --- CRISIS SECTION ---
function CrisisSection() {
  const { t } = useI18n();
  
  return (
    <section id="crisis" className="relative py-20 md:py-28 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">{t("crisis.label")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{t("crisis.title")}</h2>
        </motion.div>

        {/* Stats Grid - Responsive: 3 cols on mobile (compact), full on desktop */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
          {[
            { key: "people", value: 22, suffix: "B", icon: Users, color: "text-red-400", bg: "bg-red-500/10" },
            { key: "shortage", value: 40, suffix: "%", icon: TrendingUp, color: "text-orange-400", bg: "bg-orange-500/10" },
            { key: "infrastructure", value: 67, prefix: "$", suffix: "T", icon: Database, color: "text-amber-400", bg: "bg-amber-500/10" },
          ].map((stat, index) => (
            <motion.div key={stat.key} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className="p-3 md:p-8 bg-slate-900/50 border border-slate-800 rounded-xl md:rounded-2xl text-center md:text-left">
              <stat.icon className={`w-5 h-5 md:w-10 md:h-10 ${stat.color} mb-2 md:mb-4 mx-auto md:mx-0`} />
              <div className="text-xl md:text-5xl font-black text-white mb-1 md:mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p className="text-slate-400 text-[10px] md:text-sm leading-tight">{t(`crisis.stats.${stat.key}.label`)}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
          <p className="text-base md:text-lg text-slate-300 mb-6">{t("crisis.description")}</p>
          <blockquote className="text-lg md:text-xl font-light text-cyan-400 italic">"{t("crisis.quote")}"</blockquote>
        </motion.div>
      </div>
    </section>
  );
}

// --- DAO SECTION ---
function DAOSection() {
  const { t } = useI18n();
  
  return (
    <section id="dao" className="relative py-20 md:py-28 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">{t("dao.label")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t("dao.title")}</h2>
          <p className="text-lg md:text-xl text-cyan-400">{t("dao.subtitle")}</p>
        </motion.div>

        {/* Principles - 3 cols on all screens */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-12">
          {[
            { key: "transparent", icon: Eye },
            { key: "equal", icon: Users },
            { key: "open", icon: Unlock },
          ].map((item, index) => (
            <motion.div key={item.key} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className="p-3 md:p-8 bg-slate-900/50 border border-slate-800 rounded-xl md:rounded-2xl hover:border-cyan-500/50 transition-colors text-center md:text-left">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-cyan-500/10 flex items-center justify-center mb-2 md:mb-4 mx-auto md:mx-0">
                <item.icon className="w-4 h-4 md:w-6 md:h-6 text-cyan-400" />
              </div>
              <h3 className="text-xs md:text-lg font-bold text-white mb-1 md:mb-2">{t(`dao.principles.${item.key}.title`)}</h3>
              <p className="text-slate-400 text-[10px] md:text-sm leading-tight hidden md:block">{t(`dao.principles.${item.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { key: "voting", icon: Target },
            { key: "treasury", icon: Gem },
            { key: "consensus", icon: CheckCircle2 },
          ].map((item, index) => (
            <motion.div key={item.key} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 md:p-6 bg-slate-900/30 border border-slate-800/50 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">{t(`dao.features.${item.key}.title`)}</h4>
                <p className="text-sm text-slate-400">{t(`dao.features.${item.key}.desc`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- STAKING SECTION ---
function StakingSection() {
  const { t } = useI18n();
  const [stakeAmount, setStakeAmount] = useState(10000);
  const [duration, setDuration] = useState(12);

  const baseApy = 8;
  const durationBonus = Math.min((duration / 12) * 4, 10);
  const amountBonus = stakeAmount >= 100000 ? 5 : stakeAmount >= 10000 ? 3 : 0;
  const estimatedApy = baseApy + durationBonus + amountBonus;
  const annualYield = Math.floor((stakeAmount * estimatedApy) / 100);

  const tiers = [
    { key: "explorer", min: 1000, max: 9999, color: "bg-slate-800", apy: "8-12%" },
    { key: "guardian", min: 10000, max: 99999, color: "bg-gradient-to-b from-cyan-500/10 to-emerald-500/10 border-cyan-500/50", featured: true, apy: "12-18%" },
    { key: "validator", min: 100000, max: 999999, color: "bg-slate-800", apy: "18-25%" },
  ];

  return (
    <section id="staking" className="relative py-20 md:py-28 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">{t("staking.label")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t("staking.title")}</h2>
          <p className="text-lg text-slate-400">{t("staking.subtitle")}</p>
        </motion.div>

        {/* Tiers - 3 cols compact on mobile */}
        <div className="grid grid-cols-3 gap-2 md:gap-6 mb-8 md:mb-12">
          {tiers.map((tier, index) => (
            <motion.div key={tier.key} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className={`relative p-3 md:p-6 rounded-xl md:rounded-2xl border ${tier.color} ${tier.featured ? "md:-mt-4 md:mb-4" : "border-slate-800"}`}>
              {tier.featured && (
                <div className="absolute -top-2 md:-top-3 left-1/2 -translate-x-1/2 px-2 md:px-3 py-0.5 md:py-1 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 text-[10px] md:text-xs font-bold rounded-full">
                  POP
                </div>
              )}
              <div className="mb-2 md:mb-6 text-center md:text-left">
                <h3 className="text-xs md:text-xl font-bold text-white mb-0.5 md:mb-1">{t(`staking.tiers.${tier.key}.name`)}</h3>
                <p className="text-cyan-400 font-mono text-[10px] md:text-sm">{t(`staking.tiers.${tier.key}.amount`)}</p>
              </div>
              <div className="mb-2 md:mb-4 text-center md:text-left">
                <div className="text-lg md:text-3xl font-black text-white">{tier.apy}</div>
                <div className="text-[10px] md:text-xs text-slate-500">APY</div>
              </div>
              <p className="text-[10px] md:text-sm text-slate-400 mb-2 md:mb-6 hidden md:block">{t(`staking.tiers.${tier.key}.rewards`)}</p>
              <button className={`w-full py-1.5 md:py-3 rounded-lg md:rounded-xl font-semibold text-[10px] md:text-sm transition-colors ${
                tier.featured ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900" : "bg-slate-800 text-white hover:bg-slate-700"
              }`}>
                Select
              </button>
            </motion.div>
          ))}
        </div>

        {/* Calculator */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
          <div className="p-6 md:p-8 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-cyan-400" />
              {t("staking.calculator.title")}
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-slate-400 mb-2">{t("staking.calculator.amount")}</label>
                <input type="number" value={stakeAmount} onChange={(e) => setStakeAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-sm" />
                <input type="range" min="1000" max="500000" step="1000" value={stakeAmount} onChange={(e) => setStakeAmount(Number(e.target.value))}
                  className="w-full mt-3 accent-cyan-500" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">{t("staking.calculator.duration")}</label>
                <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono text-sm" />
                <input type="range" min="1" max="36" value={duration} onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full mt-3 accent-cyan-500" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 p-4 bg-slate-950/50 rounded-xl text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400">{estimatedApy}%</div>
                <div className="text-xs text-slate-500">{t("staking.calculator.apy")}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-400">{annualYield.toLocaleString()}</div>
                <div className="text-xs text-slate-500">{t("staking.calculator.estimated")}</div>
              </div>
              <div className="flex items-center justify-center gap-1 text-emerald-400">
                <Shield className="w-4 h-4" />
                <span className="text-xs">{t("staking.calculator.water_backed")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- PROJECTHUB SECTION ---
function ProjectHubSection() {
  const { t } = useI18n();
  
  const projects = [
    { key: "aquacell", progress: 85, color: "from-cyan-500 to-emerald-500" },
    { key: "vodchain", progress: 45, color: "from-violet-500 to-purple-500" },
    { key: "aquadrones", progress: 15, color: "from-amber-500 to-orange-500" },
  ];

  return (
    <section id="projecthub" className="relative py-20 md:py-28 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">{t("projecthub.label")}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t("projecthub.title")}</h2>
          <p className="text-lg text-slate-400">{t("projecthub.subtitle")}</p>
        </motion.div>

        {/* Stats - 3 cols compact on mobile */}
        <div className="grid grid-cols-3 gap-2 md:gap-6 mb-8 md:mb-12">
          {[
            { key: "projects", value: "12", icon: Layers },
            { key: "funded", value: "$4.2M", icon: Database },
            { key: "researchers", value: "156", icon: Users },
          ].map((stat, index) => (
            <motion.div key={stat.key} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className="p-3 md:p-6 bg-slate-900/30 border border-slate-800 rounded-lg md:rounded-xl text-center">
              <stat.icon className="w-5 h-5 md:w-8 md:h-8 text-violet-400 mx-auto mb-1 md:mb-3" />
              <div className="text-lg md:text-2xl font-bold text-white mb-0.5 md:mb-1">{stat.value}</div>
              <div className="text-[10px] md:text-sm text-slate-500 leading-tight">{t(`projecthub.stats.${stat.key}`)}</div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <motion.div key={project.key} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{t(`projecthub.featured.${project.key}.title`)}</h3>
                  <p className="text-sm text-slate-400">{t(`projecthub.featured.${project.key}.desc`)}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500">{t(`projecthub.featured.${project.key}.progress`)}</span>
                  <ArrowUpRight className="w-4 h-4 text-violet-400" />
                </div>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${project.progress}%` }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${project.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors">
            {t("projecthub.cta")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

// --- FAQ SECTION ---
function FAQSection() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = ["what", "staking", "backed", "projects", "validators"];

  return (
    <section id="faq" className="relative py-20 md:py-28 bg-slate-950">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-slate-800 text-slate-300 text-sm font-medium mb-4">{t("faq.label")}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t("faq.title")}</h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((key, index) => (
            <motion.div key={key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-medium text-white pr-4">{t(`faq.items.${key}.q`)}</span>
                {openIndex === index ? <Minus className="w-5 h-5 text-cyan-400 flex-shrink-0" /> : <Plus className="w-5 h-5 text-slate-400 flex-shrink-0" />}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="px-5 pb-5 text-slate-400 text-sm leading-relaxed">{t(`faq.items.${key}.a`)}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- CTA SECTION ---
function CTASection() {
  const { t } = useI18n();
  
  return (
    <section className="relative py-20 md:py-28 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-emerald-500/5" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t("cta.title")}</h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">{t("cta.subtitle")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#staking" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              {t("cta.button")}
            </a>
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white font-medium rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              {t("cta.secondary")}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- FOOTER ---
function Footer() {
  const { t } = useI18n();
  
  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-white">VODeco</span>
              <p className="text-xs text-slate-500">{t("footer.tagline")}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <Link href="/projecthub" className="hover:text-cyan-400 transition-colors">{t("footer.links.ecosystem")}</Link>
            <Link href="/dao" className="hover:text-cyan-400 transition-colors">{t("footer.links.governance")}</Link>
            <Link href="/tokenomics" className="hover:text-cyan-400 transition-colors">{t("nav.tokenomics")}</Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-900 text-center text-sm text-slate-600">
          {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}

// --- ECOSYSTEM ARCHITECTURE SECTION ---
function EcosystemArchitectureSection() {
  const { t } = useI18n();
  
  const layers = [
    {
      id: "physical",
      title: "Physical Layer",
      subtitle: "Физический слой",
      icon: Droplets,
      color: "from-blue-500 to-cyan-500",
      items: ["AquaCell", "AquaHome", "AquaDrones", "Industrial IoT"],
      description: "Устройства сбора данных о качестве воды"
    },
    {
      id: "transmission",
      title: "Data Transmission",
      subtitle: "Передача данных",
      icon: Activity,
      color: "from-cyan-500 to-teal-500",
      items: ["Bluetooth 5.0", "WiFi", "LoRaWAN", "4G/5G", "QR-код"],
      description: "Шифрованная передача данных с датчиков"
    },
    {
      id: "validation",
      title: "Validation Layer",
      subtitle: "Валидация",
      icon: Shield,
      color: "from-teal-500 to-emerald-500",
      items: ["Validation Nodes", "Peer Verification", "USGS API", "Anomaly Detection"],
      description: "Проверка достоверности данных"
    },
    {
      id: "blockchain",
      title: "Blockchain Layer",
      subtitle: "Блокчейн",
      icon: Database,
      color: "from-emerald-500 to-green-500",
      items: ["Data Anchoring", "SHA-256 Hashing", "IPFS Storage", "Smart Contracts"],
      description: "Запечатывание данных в блокчейне"
    },
    {
      id: "token",
      title: "Token Emission",
      subtitle: "Эмиссия токена",
      icon: Zap,
      color: "from-green-500 to-lime-500",
      items: ["10 VOD/m³ Base", "Quality Multiplier", "Staking Rewards", "DAO Governance"],
      description: "Выпуск VOD токенов за верифицированные м³"
    },
    {
      id: "application",
      title: "Application Layer",
      subtitle: "Приложения",
      icon: Globe,
      color: "from-lime-500 to-yellow-500",
      items: ["ProjectHub", "Data Marketplace", "DeSci Research", "B2B API"],
      description: "Продукты и сервисы экосистемы"
    }
  ];

  return (
    <section id="ecosystem" className="relative py-20 md:py-28 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[200px]" />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
            {t("ecosystem.label") || "Ecosystem Architecture"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("ecosystem.title") || "6-Layer Water Economy"}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            От физического кубометра воды до цифрового токена — полный цикл верификации и эмиссии
          </p>
        </motion.div>

        {/* Architecture Flow */}
        <div className="space-y-4">
          {layers.map((layer, index) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-center gap-4 p-4 md:p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500/30 transition-colors">
                {/* Icon */}
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center flex-shrink-0`}>
                  <layer.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-white">{layer.title}</h3>
                    <span className="text-sm text-cyan-400">{layer.subtitle}</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-3 hidden md:block">{layer.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Arrow */}
                {index < layers.length - 1 && (
                  <div className="hidden md:flex items-center justify-center w-8">
                    <ArrowRight className="w-6 h-6 text-slate-600" />
                  </div>
                )}
              </div>
              
              {/* Connection line */}
              {index < layers.length - 1 && (
                <div className="absolute left-6 md:left-8 bottom-0 translate-y-full w-0.5 h-4 bg-gradient-to-b from-slate-700 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Key Principle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 md:p-8 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/30 rounded-2xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Ключевой принцип: 1 VOD = 1 м³ верифицированной воды
              </h3>
              <p className="text-slate-400">
                Токен выходит в эмиссию только после полного цикла: оцифровка → валидация → хэширование → запечатывание.
                Никакой эмиссии без реального физического обеспечения.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- MAIN PAGE ---
function LandingContent() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <HeroSection />
      <CrisisSection />
      <EcosystemArchitectureSection />
      <DAOSection />
      <StakingSection />
      <ProjectHubSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}

export default function LandingPage() {
  return (
    <I18nProvider>
      <LandingContent />
    </I18nProvider>
  );
}
