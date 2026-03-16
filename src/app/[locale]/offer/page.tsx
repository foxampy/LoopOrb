'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { 
  Droplets, 
  Globe, 
  TrendingUp, 
  Shield,
  Zap,
  Users,
  Leaf,
  ArrowRight,
  Play,
  CheckCircle,
  Quote,
  ChevronDown,
  ChevronUp,
  Clock,
  Target,
  Award
} from 'lucide-react';

const STATS = [
  { value: '43+', label: 'Monitoring Stations', icon: Globe },
  { value: '16', label: 'R&D Projects', icon: Zap },
  { value: '12', label: 'Countries', icon: Globe },
  { value: '$2.8M', label: 'Raised', icon: TrendingUp },
];

const FEATURES = [
  {
    icon: Droplets,
    title: 'Water Verification',
    description: 'Real-time water quality verification using IoT sensors and blockchain technology.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Shield,
    title: 'Decentralized Governance',
    description: 'DAO-based decision making ensuring transparent and fair resource management.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: TrendingUp,
    title: 'Investment Returns',
    description: 'Multiple revenue streams from hardware sales, data services, and token economics.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Leaf,
    title: 'ESG Impact',
    description: 'Measurable environmental impact with carbon credits and water conservation.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Zap,
    title: 'AI Analytics',
    description: 'Advanced predictive models for water quality and resource optimization.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: Users,
    title: 'Global Community',
    description: 'Network of scientists, operators, investors, and citizens working together.',
    color: 'from-pink-500 to-rose-500',
  },
];

const TESTIMONIALS = [
  {
    quote: "LoopOrb represents the future of water resource management. The combination of IoT and blockchain creates unprecedented transparency.",
    author: "Dr. Sarah Chen",
    role: "Environmental Scientist",
    company: "UN Water Program",
  },
  {
    quote: "As an investor, I see massive potential in the VODeco ecosystem. The team has delivered on every milestone.",
    author: "Michael Roberts",
    role: "Partner",
    company: "Aqua Ventures",
  },
  {
    quote: "The VOD-Lab technology has revolutionized how we monitor water quality in our region.",
    author: "Aziz Karimov",
    role: "Director",
    company: "Uzbekistan Water Authority",
  },
];

const FAQS = [
  {
    question: "What is VODeco and how does it work?",
    answer: "VODeco is a decentralized ecosystem for water resource management. It combines IoT sensors, blockchain verification, and AI analytics to create a transparent and efficient water economy.",
  },
  {
    question: "How can I invest in VODeco?",
    answer: "You can participate in our token sale by visiting the Token Sale page. We accept USDT, USDC, ETH, and BTC. Minimum investment is $100.",
  },
  {
    question: "What is the use case for VOD tokens?",
    answer: "VOD tokens represent verified water resources and can be used for accessing data services, participating in governance, staking for rewards, and trading on supported exchanges.",
  },
  {
    question: "How is the project funded?",
    answer: "The project is funded through token sales, R&D investments, strategic partnerships, and revenue from hardware sales and data services.",
  },
  {
    question: "What is the vesting schedule?",
    answer: "Tokens vest over 12 months with 20% released at TGE, followed by quarterly releases. This ensures long-term alignment between investors and the project.",
  },
];

const PARTNERS = [
  'Polygon', 'Chainlink', 'Filecoin', 'IPFS', 'OpenAI', 'The Graph'
];

function FAQItem({ faq, isOpen, onClick }: { faq: typeof FAQS[0]; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left hover:opacity-80 transition-opacity"
      >
        <span className="text-white font-medium pr-8">{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-cyan-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
        )}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="text-slate-400 pb-6">{faq.answer}</p>
      </motion.div>
    </div>
  );
}

export default function OfferPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1f35] to-[#0a1628]">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-6">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  Token Sale Live - $2.8M Raised
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Invest in the Future
                  </span>
                  <br />
                  <span className="text-white">of Water</span>
                </h1>

                <p className="text-xl text-slate-400 mb-8 max-w-xl">
                  Join the global movement to revolutionize water resource management 
                  through blockchain, IoT, and AI technology.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/token-sale"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl transition-all hover:scale-105"
                  >
                    Invest Now
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-all">
                    <Play className="w-5 h-5" />
                    Watch Video
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-6 mt-12">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 border-2 border-[#0a1628] flex items-center justify-center text-white text-xs font-bold"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-400 text-sm">
                    <span className="text-white font-semibold">1,247+</span> investors joined
                  </p>
                </div>
              </motion.div>

              {/* Right Content - Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    {STATS.map((stat, index) => (
                      <div key={index} className="text-center p-4">
                        <stat.icon className="w-8 h-8 text-cyan-500 mx-auto mb-3" />
                        <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-slate-400 text-sm">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-400">Sale Progress</span>
                      <span className="text-cyan-400 font-bold">56.9%</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[56.9%] bg-gradient-to-r from-cyan-500 to-blue-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2"
            >
              <div className="w-1 h-2 bg-cyan-500 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Why Invest in VODeco?
                </span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                A comprehensive ecosystem combining cutting-edge technology with real-world impact
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tokenomics Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Three-Token Economy
                  </span>
                </h2>
                <p className="text-xl text-slate-400 mb-8">
                  Our innovative token model creates a sustainable economic ecosystem 
                  with clear utility and value accrual mechanisms.
                </p>

                <div className="space-y-4">
                  {[
                    { name: 'VOD', desc: 'Water commodity token - 1 VOD = 1 m³ water', color: 'bg-cyan-500' },
                    { name: 'VODeco', desc: 'Governance token with fixed 1B supply', color: 'bg-blue-500' },
                    { name: 'VODcredit', desc: 'Reputation SBT for ecosystem contributions', color: 'bg-purple-500' },
                  ].map((token) => (
                    <div key={token.name} className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                      <div className={`w-3 h-3 rounded-full ${token.color}`} />
                      <div>
                        <p className="text-white font-semibold">{token.name}</p>
                        <p className="text-slate-400 text-sm">{token.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Token Distribution</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Water Reserve', percent: '30%', color: 'from-cyan-500 to-cyan-600' },
                    { label: 'R&D Treasury', percent: '20%', color: 'from-blue-500 to-blue-600' },
                    { label: 'Community', percent: '15%', color: 'from-violet-500 to-violet-600' },
                    { label: 'Team & Foundation', percent: '15%', color: 'from-purple-500 to-purple-600' },
                    { label: 'Early Investors', percent: '10%', color: 'from-pink-500 to-pink-600' },
                    { label: 'Liquidity', percent: '5%', color: 'from-emerald-500 to-emerald-600' },
                    { label: 'DAO Treasury', percent: '5%', color: 'from-amber-500 to-amber-600' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400">{item.label}</span>
                        <span className="text-white font-medium">{item.percent}</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${item.color}`} style={{ width: item.percent }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                What Experts Say
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
                >
                  <Quote className="w-10 h-10 text-cyan-500/50 mb-4" />
                  <p className="text-slate-300 mb-6">{testimonial.quote}</p>
                  <div>
                    <p className="text-white font-semibold">{testimonial.author}</p>
                    <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                    <p className="text-slate-500 text-sm">{testimonial.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-slate-400 mb-8">Trusted by leading technology partners</p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {PARTNERS.map((partner) => (
                <div key={partner} className="text-2xl font-bold text-slate-600 hover:text-slate-400 transition-colors">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              {FAQS.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  isOpen={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/30 rounded-3xl p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Invest in the Future?
              </h2>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                Join 1,247+ investors who are already part of the VODeco ecosystem. 
                Token sale ends soon.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/token-sale"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl transition-all hover:scale-105"
                >
                  <Target className="w-5 h-5" />
                  Join Token Sale
                </Link>
                <Link
                  href="/whitepaper"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-all"
                >
                  <Award className="w-5 h-5" />
                  Read Whitepaper
                </Link>
              </div>

              <div className="flex justify-center gap-8 mt-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Audited by CertiK
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  KYC Required
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Legal Compliance
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
