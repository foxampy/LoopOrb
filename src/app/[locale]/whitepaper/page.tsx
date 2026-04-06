"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import { NeumorphicCard } from "@/components/ui/NeumorphicCard";
import {
  FileText, Download, Mail, BookOpen, Layers, Cpu,
  TrendingUp, Shield, Globe, Rocket, DollarSign, Users,
  ChevronRight, Send, CheckCircle, ExternalLink, Eye,
  FileSpreadsheet, BarChart3, Database, Zap, Target,
  ArrowRight, Star, Award, Clock, Lock
} from "lucide-react";

// Document structure sections
const documentStructure = [
  {
    pages: "Pages 1-7",
    title: "Visual Presentation",
    icon: Eye,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    textColor: "text-cyan-400",
    items: [
      "Project overview & mission",
      "Global water crisis context",
      "VODeco solution architecture",
      "Team & FoxampyLab background",
      "Token ecosystem summary",
      "Market opportunity & traction",
      "Investment highlights"
    ]
  },
  {
    pages: "Pages 8+",
    title: "Technical Whitepaper",
    icon: BookOpen,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    items: [
      "Full system architecture deep-dive",
      "Tokenomics model & emission formulas",
      "IoT sensor specifications",
      "Blockchain protocol design",
      "Security & verification layers",
      "Development roadmap & milestones",
      "Financial projections & use of funds"
    ]
  }
];

// Project highlights
const highlights = [
  {
    icon: Award,
    title: "Developed by FoxampyLab",
    description: "Research & development laboratory specializing in IoT, blockchain, and environmental monitoring",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30"
  },
  {
    icon: Rocket,
    title: "Seed Round Now Open",
    description: "First anchor investment round for platform development. Early investors get preferential terms.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30"
  },
  {
    icon: Lock,
    title: "Closed Round: $100,000",
    description: "Completed by FoxampyLab team. Demonstrates commitment and skin-in-the-game.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30"
  },
  {
    icon: Target,
    title: "Platform in Development",
    description: "First anchor investment round. Building the foundation for a sustainable water economy.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30"
  }
];

// Key metrics
const keyMetrics = [
  { label: "Total Addressable Market", value: "$1.2T", sublabel: "Global water market by 2030" },
  { label: "Token Model", value: "3-Token", sublabel: "VOD + VODeco + VODcredit" },
  { label: "VODeco Supply", value: "1B", sublabel: "Fixed emission" },
  { label: "Closed Round", value: "$100K", sublabel: "Completed by team" }
];

export default function WhitepaperPage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-8"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400 font-medium">Investor Document</span>
              </motion.div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Whitepaper &{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Investor Document
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-water-200/70 max-w-3xl mx-auto mb-10">
                Comprehensive overview of VODeco ecosystem, tokenomics, technology, and investment opportunity.
                Discover how we&apos;re building the future of water monitoring and management.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/whitepaper/read"
                  className="btn-primary flex items-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Read Whitepaper Online
                </Link>
                <a
                  href="/docs/vodeco-investor-deck.pdf"
                  download
                  className="btn-secondary flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Investor PDF
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {keyMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NeumorphicCard glow="cyan" className="text-center p-6 h-full">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium text-white mt-2">{metric.label}</div>
                  <div className="text-xs text-water-200/50 mt-1">{metric.sublabel}</div>
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Highlights Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Project Highlights</h2>
            <p className="text-water-200/60 max-w-2xl mx-auto">
              Why investors are choosing VODeco for sustainable water infrastructure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <NeumorphicCard hoverable className="h-full">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${highlight.bgColor} border ${highlight.borderColor} flex items-center justify-center flex-shrink-0`}>
                      <highlight.icon className={`w-6 h-6 ${highlight.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{highlight.title}</h3>
                      <p className="text-sm text-water-200/70">{highlight.description}</p>
                    </div>
                  </div>
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Document Structure */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Document Structure</h2>
            <p className="text-water-200/60 max-w-2xl mx-auto">
              Two parts: a visually engaging presentation followed by detailed technical documentation
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {documentStructure.map((section, index) => (
              <motion.div
                key={section.pages}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <NeumorphicCard hoverable className="h-full overflow-hidden">
                  {/* Section header */}
                  <div className={`p-6 ${section.bgColor} border-b ${section.borderColor} -mx-4 -mt-4 mb-6 rounded-t-xl`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                        <section.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className={`text-sm font-mono ${section.textColor}`}>{section.pages}</span>
                        <h3 className="text-xl font-bold text-white">{section.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Section content */}
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + i * 0.05 }}
                        className="flex items-center gap-3 text-water-200/70"
                      >
                        <ChevronRight className={`w-4 h-4 ${section.textColor} flex-shrink-0`} />
                        <span className="text-sm">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technology Stack Preview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Technology Stack</h2>
            <p className="text-water-200/60 max-w-2xl mx-auto">
              Cutting-edge technology powering the VODeco ecosystem
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Database, title: "IoT Sensor Network", desc: "Distributed water quality monitoring with real-time data streaming and edge computing.", color: "text-cyan-400", bg: "bg-cyan-500/10" },
              { icon: Shield, title: "Blockchain Verification", desc: "Immutable data records on VOD Chain with cryptographic proof of water quality metrics.", color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { icon: Cpu, title: "Edge AI Processing", desc: "NVIDIA Jetson-powered anomaly detection and predictive analytics at each sensor node.", color: "text-purple-400", bg: "bg-purple-500/10" },
              { icon: TrendingUp, title: "Token Economics", desc: "Three-token model aligning incentives across operators, investors, and communities.", color: "text-amber-400", bg: "bg-amber-500/10" },
              { icon: Globe, title: "Multi-Audience Platform", desc: "Tailored interfaces for citizens, operators, government, investors, and scientists.", color: "text-blue-400", bg: "bg-blue-500/10" },
              { icon: BarChart3, title: "Analytics Dashboard", desc: "Real-time insights into water resources, infrastructure health, and ecosystem metrics.", color: "text-pink-400", bg: "bg-pink-500/10" }
            ].map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <NeumorphicCard hoverable className="h-full">
                  <div className={`w-12 h-12 rounded-xl ${tech.bg} flex items-center justify-center mb-4`}>
                    <tech.icon className={`w-6 h-6 ${tech.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{tech.title}</h3>
                  <p className="text-sm text-water-200/70">{tech.desc}</p>
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Investment Tiers */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Investment Opportunity</h2>
            <p className="text-water-200/60 max-w-2xl mx-auto">
              Join the seed round and become part of the water revolution
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Closed Round */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <NeumorphicCard className="h-full opacity-60">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/20 text-slate-400 text-xs font-medium mb-4">
                    <Lock className="w-3 h-3" />
                    Completed
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Closed Round</h3>
                  <div className="text-3xl font-bold text-slate-400 mb-4">$100,000</div>
                  <ul className="space-y-2 text-sm text-water-200/60 text-left">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-slate-500" />
                      Completed by FoxampyLab team
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-slate-500" />
                      Demonstrates commitment
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-slate-500" />
                      Foundation established
                    </li>
                  </ul>
                </div>
              </NeumorphicCard>
            </motion.div>

            {/* Seed Round */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl rounded-2xl" />
                <NeumorphicCard glow="cyan" className="h-full relative">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium mb-4">
                      <Star className="w-3 h-3" />
                      Now Open
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Seed Round</h3>
                    <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">Open</div>
                    <ul className="space-y-2 text-sm text-water-200/70 text-left">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-cyan-400" />
                        Preferential early terms
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-cyan-400" />
                        Platform development funding
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-cyan-400" />
                        First anchor investors
                      </li>
                    </ul>
                    <button className="btn-primary w-full mt-6">
                      Contact for Details
                    </button>
                  </div>
                </NeumorphicCard>
              </div>
            </motion.div>

            {/* Future Rounds */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <NeumorphicCard className="h-full">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium mb-4">
                    <Clock className="w-3 h-3" />
                    Future
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Series A & Beyond</h3>
                  <div className="text-3xl font-bold text-purple-400 mb-4">TBD</div>
                  <ul className="space-y-2 text-sm text-water-200/60 text-left">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      Scaling operations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      International expansion
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-400" />
                      Token generation event
                    </li>
                  </ul>
                </div>
              </NeumorphicCard>
            </motion.div>
          </div>
        </section>

        {/* Request Full Document Form */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <NeumorphicCard glow="purple" className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Request Full Document</h2>
                <p className="text-water-200/70">
                  Submit your email to receive the complete investor PDF with financial projections,
                  technical specifications, and SAFT agreement details.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Request Submitted!</h3>
                  <p className="text-water-200/70">
                    We&apos;ll send the full investor document to <span className="text-cyan-400">{email}</span> within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-water-200/70 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="investor@example.com"
                        required
                        className="w-full px-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition-all"
                      />
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                    <Shield className="w-5 h-5 text-water-200/50 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-water-200/50">
                      Your information is secure and will only be used to send the investor document.
                      We respect your privacy and will not share your data with third parties.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Request Full Document
                      </>
                    )}
                  </button>
                </form>
              )}
            </NeumorphicCard>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
            <div className="relative glass-card p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Explore the Full Document?
              </h2>
              <p className="text-water-200/70 max-w-2xl mx-auto mb-8">
                Dive deep into VODeco&apos;s technology, tokenomics, and investment opportunity.
                Choose how you want to engage with our documentation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/whitepaper/read"
                  className="btn-primary flex items-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Read Online
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="/docs/vodeco-investor-deck.pdf"
                  download
                  className="btn-secondary flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-5 h-5" />
                  Download PDF
                </a>
                <Link
                  href="/tokenomics"
                  className="btn-outline flex items-center gap-2"
                >
                  <TrendingUp className="w-5 h-5" />
                  View Tokenomics
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer note */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-white/5">
          <div className="text-center">
            <p className="text-sm text-water-200/40">
              This document is for informational purposes only and does not constitute an offer to sell or a solicitation of an offer to buy any securities.
            </p>
            <p className="text-xs text-water-200/30 mt-2">
              VODeco is developed by FoxampyLab. All rights reserved. &copy; {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
