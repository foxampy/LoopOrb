"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/i18n/I18nContext";
import LanguageSelector from "@/components/LanguageSelector";
import {
  Droplets, Globe, Users, Zap, Shield, Lock, Unlock, Target, 
  TrendingUp, Activity, ChevronDown, ArrowRight, CheckCircle2, 
  AlertTriangle, Menu, X, Wallet, Microscope, Database, Server,
  Layers, Cpu, Scan, Satellite,
  Hexagon, Sparkles, Beaker, FlaskConical, ArrowUpRight,
  Coins, Gem, PieChart, BarChart3, TrendingDown, Plus, Minus,
  Clock, FileText, ExternalLink, Download, Mail,
  Network, Share2, Workflow,
  Scale, Gavel, MessageSquare, Search, Filter,
  Settings, Sliders,
  Eye, Fingerprint, Key, QrCode,
  Award, Star, Flame,
  RefreshCw, RotateCcw, Repeat,
  ChevronRight, ChevronLeft,
  MapPin, Navigation, Locate, LocateFixed, Crosshair,
  Focus, Camera, Video, Mic, Volume2,
  Play, Pause, Square, SkipForward, SkipBack, VolumeX,
  Maximize, Minimize, Monitor, Smartphone, Laptop,
  Home, Building2, Factory, Warehouse,
  Banknote, CreditCard, Wallet2, Receipt,
  Package, Truck, Plane, Ship as ShipIcon, Train, Car, Bike,
  TreePine, Mountain, Cloud, CloudRain, CloudSnow, CloudLightning,
  ThermometerSun, Droplet, Waves as WavesIcon,
  Fish, Shell, LifeBuoy, Umbrella, Glasses,
  Sunrise, Sunset, Moon, Star as StarIcon, Sparkles as SparklesIcon
} from "lucide-react";

// --- ANIMATED COUNTER ---
function CountUp({ end, duration = 2, suffix = "", prefix = "" }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleRef = (node: HTMLSpanElement | null) => {
    if (node) {
      ref.current = node;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
        { threshold: 0.5 }
      );
      observer.observe(node);
    }
  };

  if (typeof window !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { useEffect } = require('react');
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
  }

  return <span ref={handleRef}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// --- NAVBAR ---
function Navbar() {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (typeof window !== 'undefined') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { useEffect } = require('react');
    useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  }

  const pageLinks = [
    { href: "/landing", label: "Staking" },
    { href: "/ecosystem", label: "Ecosystem", active: true },
    { href: "/projecthub", label: "ProjectHub" },
    { href: "/tokenomics", label: "Tokenomics" },
    { href: "/dao", label: "DAO" },
    { href: "/profile", label: "Account" },
  ];

  const anchorLinks = [
    { href: "#unity", label: "Unity" },
    { href: "#problems", label: "Problems" },
    { href: "#solutions", label: "Solutions" },
    { href: "#tools", label: "Tools" },
    { href: "#economy", label: "Economy" },
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
                <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <span className="text-lg lg:text-xl font-bold text-white">VODeco</span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {pageLinks.map((link) => (
                <Link key={link.href} href={link.href} 
                  className={`text-sm transition-colors ${link.active ? 'text-cyan-400' : 'text-slate-300 hover:text-cyan-400'}`}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              <LanguageSelector />
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition-colors text-sm">
                <Wallet className="w-4 h-4" />
                <span>Connect</span>
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
              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Pages</div>
                <div className="grid grid-cols-2 gap-2">
                  {pageLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} 
                       className={`flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                         link.active ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
                       }`}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-slate-800 pt-3">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">On this page</div>
                <div className="space-y-1">
                  {anchorLinks.map((link) => (
                    <a key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} 
                       className="block text-sm text-slate-300 hover:text-cyan-400 transition-colors py-2 px-2">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg mt-4 transition-colors">
                <Wallet className="w-5 h-5" />
                Connect Wallet
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
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[200px]" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
          <Network className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-300 font-medium">Unified Global Infrastructure</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
          <span className="block">The Power of</span>
          <span className="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 bg-clip-text text-transparent">
            Universal Unity
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto mb-8">
          In a world of fragmented systems and isolated solutions, VODeco unites all objects, subjects, 
          projects, and structures into a single decentralized autonomous organism. From molecular water 
          sensors to planetary governance — one protocol, one vision, one future.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#unity" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
            <Globe className="w-5 h-5" />
            Explore Ecosystem
          </a>
          <a href="#tools" className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white font-medium rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2">
            <Layers className="w-5 h-5" />
            View Architecture
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

// --- UNITY SECTION ---
function UnitySection() {
  return (
    <section id="unity" className="relative py-20 md:py-28 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">Why Unity Matters</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Everything Connected</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Fragmentation is the enemy of progress. VODeco creates a single nervous system for Earth's water resources, 
            connecting every drop, every sensor, every decision-maker into a unified intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-12">
          {[
            { icon: Droplets, label: "Water Molecules", value: "10²⁵", color: "text-cyan-400", bg: "bg-cyan-500/10" },
            { icon: Cpu, label: "IoT Sensors", value: "100K+", color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { icon: Users, label: "Participants", value: "1M+", color: "text-violet-400", bg: "bg-violet-500/10" },
            { icon: Globe, label: "Countries", value: "195", color: "text-amber-400", bg: "bg-amber-500/10" },
          ].map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className="p-4 md:p-6 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl ${stat.bg} flex items-center justify-center mb-2 md:mb-3 mx-auto`}>
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
              </div>
              <div className="text-xl md:text-2xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} 
          className="p-6 md:p-8 bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-slate-800 rounded-2xl">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">The Network Effect</h3>
              <p className="text-slate-400 mb-4">
                Every new node strengthens the entire network. When a sensor in the Amazon connects, 
                it improves predictions for droughts in Australia. When a DAO votes on funding, 
                it accelerates research that benefits the entire planet.
              </p>
              <ul className="space-y-2">
                {[
                  "Cross-validated data from millions of sources",
                  "AI-powered prediction across global water systems",
                  "Instant response to contamination events",
                  "Democratic allocation of resources"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-xl blur-xl" />
              <div className="relative p-6 bg-slate-950/50 border border-slate-800 rounded-xl">
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/30" />
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-4 rounded-full border-2 border-dashed border-emerald-500/30" />
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-8 rounded-full border-2 border-dashed border-violet-500/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe className="w-16 h-16 text-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- PROBLEMS SECTION ---
function ProblemsSection() {
  return (
    <section id="problems" className="relative py-20 md:py-28 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[150px]" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4">Critical Challenges</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Global Crisis Points</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Humanity faces interconnected crises that require unified solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {[
            { icon: Droplets, title: "Water Scarcity", stat: "2.2B People", desc: "Without safe water", color: "text-cyan-400", bg: "bg-cyan-500/10" },
            { icon: AlertTriangle, title: "Climate", stat: "+1.5°C", desc: "Rising temperatures", color: "text-orange-400", bg: "bg-orange-500/10" },
            { icon: Database, title: "Data Silos", stat: "90% Dark", desc: "Fragmented systems", color: "text-violet-400", bg: "bg-violet-500/10" },
            { icon: Lock, title: "Centralized", stat: "Monopolies", desc: "Opaque control", color: "text-red-400", bg: "bg-red-500/10" },
            { icon: TrendingDown, title: "Biodiversity", stat: "68% Decline", desc: "Ecosystem collapse", color: "text-emerald-400", bg: "bg-emerald-500/10" },
            { icon: Clock, title: "Time Critical", stat: "7 Years", desc: "To SDG 6 deadline", color: "text-amber-400", bg: "bg-amber-500/10" },
          ].map((problem, index) => (
            <motion.div key={problem.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className="p-3 md:p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:bg-slate-900/80 transition-colors text-center md:text-left">
              <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg ${problem.bg} flex items-center justify-center mb-2 md:mb-3 mx-auto md:mx-0`}>
                <problem.icon className={`w-4 h-4 md:w-6 md:h-6 ${problem.color}`} />
              </div>
              <div className="text-[10px] md:text-sm font-semibold text-slate-500 mb-1">{problem.stat}</div>
              <h3 className="text-sm md:text-lg font-bold text-white mb-1">{problem.title}</h3>
              <p className="text-[10px] md:text-sm text-slate-400">{problem.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- SOLUTIONS SECTION ---
function SolutionsSection() {
  return (
    <section id="solutions" className="relative py-20 md:py-28 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-4">Our Approach</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Decentralized Solutions</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Transforming water management through blockchain, governance, and incentives.
          </p>
        </motion.div>

        <div className="space-y-4 md:space-y-6">
          {[
            { num: "01", title: "Universal Data Layer", desc: "Every water molecule monitored. Real-time data from IoT sensors feeds into immutable blockchain.", features: ["10,000+ sensors", "Real-time alerts", "AI predictions"] },
            { num: "02", title: "Democratic Governance", desc: "DAO-based decisions ensure water resources are managed by those who depend on them.", features: ["Liquid democracy", "Proposal voting", "Treasury management"] },
            { num: "03", title: "Economic Alignment", desc: "Water-backed tokens make preserving water quality profitable. Stake VOD, earn yield.", features: ["8-25% APY", "Data monetization", "Project funding"] },
            { num: "04", title: "Open Infrastructure", desc: "All hardware and software is open source. Anyone can build, improve, or integrate.", features: ["Open hardware", "Public APIs", "Research commons"] },
          ].map((solution, index) => (
            <motion.div key={solution.num} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className="p-4 md:p-8 bg-slate-900/50 border border-slate-800 rounded-xl md:rounded-2xl">
              <div className="grid md:grid-cols-12 gap-4 md:gap-6 items-start">
                <div className="md:col-span-1">
                  <span className="text-2xl md:text-4xl font-black text-slate-800">{solution.num}</span>
                </div>
                <div className="md:col-span-7">
                  <h3 className="text-lg md:text-2xl font-bold text-white mb-2">{solution.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{solution.desc}</p>
                </div>
                <div className="md:col-span-4">
                  <ul className="space-y-1 md:space-y-2">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-slate-300">
                        <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 flex-shrink-0" />
                        {feature}
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

export default function EcosystemPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <HeroSection />
      <UnitySection />
      <ProblemsSection />
      <SolutionsSection />
      <ToolsSection />
      <EconomySection />
      <CTASection />
    </main>
  );
}

// --- TOOLS SECTION ---
function ToolsSection() {
  const [activeTool, setActiveTool] = useState(0);
  
  const tools = [
    {
      icon: Microscope,
      title: "AquaCell",
      subtitle: "Portable Laboratory",
      desc: "Pocket-sized water analyzer with lab-grade precision. ±2% accuracy for 50+ parameters.",
      specs: ["pH, TDS, heavy metals", "Bacteria detection", "Blockchain verification", "6-month battery"],
      color: "cyan"
    },
    {
      icon: Cpu,
      title: "VOD Chain",
      subtitle: "Blockchain Core",
      desc: "10,000 TPS blockchain for water data anchoring. Proof-of-Water consensus mechanism.",
      specs: ["Sub-second finality", "Cross-chain bridges", "Smart contracts", "Data oracles"],
      color: "emerald"
    },
    {
      icon: Satellite,
      title: "AquaNode",
      subtitle: "IoT Network",
      desc: "Solar-powered monitoring stations providing continuous water quality data.",
      specs: ["Multi-depth sensors", "Satellite uplink", "5-year autonomy", "Global coverage"],
      color: "violet"
    },
    {
      icon: Database,
      title: "Data Lake",
      subtitle: "Storage Layer",
      desc: "Decentralized storage for raw water data. IPFS + Filecoin for permanent archives.",
      specs: ["Petabyte scale", "Immutable records", "Global replication", "Open access"],
      color: "amber"
    },
    {
      icon: Gavel,
      title: "DAO Portal",
      subtitle: "Governance",
      desc: "Democratic decision-making for water resource allocation and project funding.",
      specs: ["Proposal system", "Voting power", "Treasury mgmt", "Dispute resolution"],
      color: "rose"
    },
    {
      icon: Wallet,
      title: "VOD Wallet",
      subtitle: "Token Management",
      desc: "Secure wallet for staking, trading, and managing water-backed tokens.",
      specs: ["Multi-chain support", "Staking interface", "NFT display", "Swap integration"],
      color: "indigo"
    }
  ];

  const colorClasses: Record<string, { text: string; bg: string; border: string }> = {
    cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
    emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
    violet: { text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
    amber: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
    rose: { text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30" },
    indigo: { text: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/30" },
  };

  return (
    <section id="tools" className="relative py-20 md:py-28 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">Technology Stack</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Ecosystem Tools</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            A complete stack of hardware, software, and protocols working in harmony.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
          {/* Tool Navigation - Compact on mobile */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
              {tools.map((tool, index) => {
                const colors = colorClasses[tool.color];
                return (
                  <button
                    key={tool.title}
                    onClick={() => setActiveTool(index)}
                    className={`p-2 md:p-4 rounded-xl border text-left transition-all ${
                      activeTool === index 
                        ? `${colors.bg} ${colors.border} border` 
                        : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <tool.icon className={`w-4 h-4 md:w-6 md:h-6 ${colors.text} mb-1 md:mb-2`} />
                    <div className="text-xs md:text-sm font-bold text-white truncate">{tool.title}</div>
                    <div className="text-[10px] text-slate-500 hidden md:block">{tool.subtitle}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tool Details */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTool}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 md:p-8 bg-slate-900/50 border border-slate-800 rounded-2xl h-full"
              >
                {(() => {
                  const tool = tools[activeTool];
                  const colors = colorClasses[tool.color];
                  return (
                    <>
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl ${colors.bg} flex items-center justify-center`}>
                          <tool.icon className={`w-6 h-6 md:w-8 md:h-8 ${colors.text}`} />
                        </div>
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-white">{tool.title}</h3>
                          <p className={`text-sm ${colors.text}`}>{tool.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-slate-400 mb-4 md:mb-6 text-sm md:text-base">{tool.desc}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {tool.specs.map((spec, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-slate-300">
                            <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0`} />
                            {spec}
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- ECONOMY SECTION ---
function EconomySection() {
  return (
    <section id="economy" className="relative py-20 md:py-28 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">Tokenomics</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Water-Backed Economy</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            1 VOD = 1 cubic meter of verified water. Sustainable incentives for planetary stewardship.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
          {/* Token Allocation */}
          <div className="p-4 md:p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
            <h3 className="text-lg font-bold text-white mb-4">Token Allocation</h3>
            <div className="space-y-3">
              {[
                { label: "Water Reserve", value: "35%", color: "bg-cyan-500" },
                { label: "R&D Treasury", value: "25%", color: "bg-emerald-500" },
                { label: "Community", value: "15%", color: "bg-violet-500" },
                { label: "Team", value: "12%", color: "bg-amber-500" },
                { label: "Investors", value: "8%", color: "bg-rose-500" },
                { label: "Liquidity", value: "5%", color: "bg-slate-500" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color.replace('bg-', '').replace('-500', '') === 'cyan' ? '#06b6d4' : item.color.replace('bg-', '').replace('-500', '') === 'emerald' ? '#10b981' : item.color.replace('bg-', '').replace('-500', '') === 'violet' ? '#8b5cf6' : item.color.replace('bg-', '').replace('-500', '') === 'amber' ? '#f59e0b' : item.color.replace('bg-', '').replace('-500', '') === 'rose' ? '#f43f5e' : '#64748b' }} />
                  <div className="flex-1 flex justify-between items-center">
                    <span className="text-sm text-slate-300">{item.label}</span>
                    <span className="text-sm font-bold text-white">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staking Tiers */}
          <div className="p-4 md:p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
            <h3 className="text-lg font-bold text-white mb-4">Staking Rewards</h3>
            <div className="space-y-3">
              {[
                { tier: "Explorer", amount: "1,000 VOD", apy: "8-12%", color: "text-slate-400" },
                { tier: "Guardian", amount: "10,000 VOD", apy: "12-18%", color: "text-cyan-400" },
                { tier: "Validator", amount: "100,000 VOD", apy: "18-25%", color: "text-emerald-400" },
              ].map((item) => (
                <div key={item.tier} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg">
                  <div>
                    <div className="text-sm font-semibold text-white">{item.tier}</div>
                    <div className="text-xs text-slate-500">{item.amount}</div>
                  </div>
                  <div className={`text-lg font-bold ${item.color}`}>{item.apy}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: "Total Supply", value: "1.386B", sub: "VOD" },
            { label: "Water Backing", value: "1", sub: "m³ per VOD" },
            { label: "Staked", value: "60%", sub: "Circulating" },
            { label: "Validators", value: "2,847", sub: "Active nodes" },
          ].map((metric, index) => (
            <motion.div key={metric.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className="p-3 md:p-4 bg-slate-900/30 border border-slate-800 rounded-xl text-center">
              <div className="text-lg md:text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-xs text-slate-400">{metric.label}</div>
              <div className="text-[10px] text-slate-600">{metric.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- CTA SECTION ---
function CTASection() {
  return (
    <section className="relative py-20 md:py-28 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
            <Globe className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Join the Network</h2>
          <p className="text-base md:text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Be part of the unified global infrastructure for water resource management. 
            Stake VOD, deploy sensors, or contribute to open research.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/landing" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" />
              Start Staking
            </a>
            <a href="/projecthub" className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white font-medium rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2">
              <Microscope className="w-5 h-5" />
              Explore Projects
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
