"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import {
  ArrowLeft, FileText, Droplets, Shield, Database, Globe,
  Cpu, TrendingUp, Users, Zap, Target, Beaker, Lock,
  Layers, Rocket, ChevronRight, Download, ExternalLink
} from "lucide-react";

const chapters = [
  {
    id: "executive-summary",
    number: "01",
    title: "Executive Summary",
    icon: FileText,
    description: "VODeco mission, vision, and the opportunity in water monitoring",
    pages: "1-2"
  },
  {
    id: "water-crisis",
    number: "02",
    title: "The Water Crisis",
    icon: Droplets,
    description: "Global water challenges: scarcity, quality, and infrastructure",
    pages: "3-4"
  },
  {
    id: "solution",
    number: "03",
    title: "The VODeco Solution",
    icon: Globe,
    description: "How IoT + blockchain creates transparent water economy",
    pages: "5-7"
  },
  {
    id: "architecture",
    number: "04",
    title: "System Architecture",
    icon: Layers,
    description: "4-level architecture: Physics, Data, Protocols, Applications",
    pages: "8-15"
  },
  {
    id: "tokenomics",
    number: "05",
    title: "Tokenomics Deep-Dive",
    icon: TrendingUp,
    description: "Three-token model: VOD, VODeco, VODcredit mechanics and emission",
    pages: "16-25"
  },
  {
    id: "sensors",
    number: "06",
    title: "Sensor Specifications",
    icon: Cpu,
    description: "VOD-Lab Pro hardware design, components, and capabilities",
    pages: "26-32"
  },
  {
    id: "blockchain",
    number: "07",
    title: "Blockchain Protocol",
    icon: Database,
    description: "VOD Chain consensus, data anchoring, and verification",
    pages: "33-38"
  },
  {
    id: "security",
    number: "08",
    title: "Security Model",
    icon: Lock,
    description: "Physical, sensor, network, and cryptographic security layers",
    pages: "39-44"
  },
  {
    id: "roadmap",
    number: "09",
    title: "Roadmap & Milestones",
    icon: Target,
    description: "Development phases from prototype to global ecosystem",
    pages: "45-48"
  },
  {
    id: "financials",
    number: "10",
    title: "Financial Projections",
    icon: Beaker,
    description: "Revenue models, unit economics, and growth projections",
    pages: "49-54"
  },
  {
    id: "team",
    number: "11",
    title: "Team & FoxampyLab",
    icon: Users,
    description: "Development team, advisors, and organizational structure",
    pages: "55-56"
  },
  {
    id: "investment",
    number: "12",
    title: "Investment Terms",
    icon: Rocket,
    description: "Seed round details, SAFT terms, and use of funds",
    pages: "57-60"
  }
];

export default function WhitepaperReaderPage() {
  const t = useTranslations();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8">
        {/* Header */}
        <section className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-4 mb-6">
              <Link
                href="/whitepaper"
                className="flex items-center gap-2 text-water-200/70 hover:text-white transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400 font-medium">Online Reader</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                VODeco Whitepaper
              </h1>
              <p className="text-lg text-water-200/70 max-w-3xl">
                Comprehensive technical documentation covering architecture, tokenomics,
                sensor specifications, and investment opportunity.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <a
                  href="/docs/vodeco-whitepaper.pdf"
                  download
                  className="btn-secondary flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
                <Link
                  href="/tokenomics"
                  className="btn-outline flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Interactive Tokenomics
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Chapters Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter, index) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="glass-card p-6 hover:border-cyan-500/30 transition-all cursor-pointer group h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                      <chapter.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="text-xs font-mono text-water-200/40">
                      pp. {chapter.pages}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-cyan-400/60">
                      {chapter.number}
                    </span>
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition">
                      {chapter.title}
                    </h3>
                  </div>

                  <p className="text-sm text-water-200/60 mb-4">
                    {chapter.description}
                  </p>

                  <div className="flex items-center gap-1 text-sm text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Read chapter</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Coming Soon Notice */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 mb-4">
              <Zap className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Full Whitepaper In Progress
            </h2>
            <p className="text-water-200/70 mb-6">
              The complete technical whitepaper is currently being finalized.
              Each chapter above will be published sequentially. Request early access
              to receive chapters as they become available.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/whitepaper"
                className="btn-primary"
              >
                Request Early Access
              </Link>
              <Link
                href="/litepaper"
                className="btn-secondary"
              >
                Read Litepaper
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
