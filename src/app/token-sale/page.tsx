'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import {
  Coins,
  TrendingUp,
  Shield,
  Clock,
  Wallet,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  Copy,
  ExternalLink,
  Gem,
  Zap,
  Target,
  Lock
} from 'lucide-react';

const TOKEN_SALE_INFO = {
  token: 'VODeco',
  symbol: 'VOD',
  price: 0.05,
  raised: 2847500,
  goal: 5000000,
  endDate: '2026-04-30',
  minPurchase: 100,
  maxPurchase: 50000,
  totalSupply: 1000000000,
  saleSupply: 100000000, // 10% for sale
  acceptedCurrencies: ['USDT', 'USDC', 'ETH', 'BTC'],
};

const TIERS = [
  {
    name: 'Early Bird',
    allocation: '0 - 72 hours',
    bonus: '+20%',
    min: 100,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Whitelist',
    allocation: 'Day 3 - 7',
    bonus: '+15%',
    min: 500,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    name: 'Public',
    allocation: 'Day 7+',
    bonus: '+0%',
    min: 100,
    color: 'from-violet-500 to-purple-600',
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Connect Wallet',
    description: 'Connect your MetaMask, WalletConnect, or other supported wallet.',
  },
  {
    number: '02',
    title: 'Select Amount',
    description: 'Choose how many VOD tokens you want to purchase.',
  },
  {
    number: '03',
    title: 'Confirm Transaction',
    description: 'Review and confirm your purchase transaction.',
  },
  {
    number: '04',
    title: 'Receive Tokens',
    description: 'Tokens will be sent to your wallet after the sale ends.',
  },
];

export default function TokenSalePage() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USDT');
  const [copied, setCopied] = useState(false);

  const progress = (TOKEN_SALE_INFO.raised / TOKEN_SALE_INFO.goal) * 100;
  const vodAmount = amount ? parseFloat(amount) / TOKEN_SALE_INFO.price : 0;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 bg-gradient-to-b from-[#0a1628] via-[#0d1f35] to-[#0a1628]">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto relative">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm mb-6"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Token Sale Live
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  VODeco Token Sale
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-400 max-w-2xl mx-auto"
              >
                Participate in the future of water resource management. 
                Join our token sale and become part of the global water ecosystem.
              </motion.p>
            </div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            >
              {[
                { label: 'Token Price', value: `$${TOKEN_SALE_INFO.price}`, icon: Coins },
                { label: 'Raised', value: `$${TOKEN_SALE_INFO.raised.toLocaleString()}`, icon: TrendingUp },
                { label: 'Goal', value: `$${TOKEN_SALE_INFO.goal.toLocaleString()}`, icon: Target },
                { label: 'Participants', value: '1,247', icon: Wallet },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                >
                  <stat.icon className="w-6 h-6 text-cyan-500 mb-3" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-12"
            >
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Sale Progress</span>
                <span className="text-cyan-400 font-bold">{progress.toFixed(1)}%</span>
              </div>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-slate-500">
                <span>${TOKEN_SALE_INFO.raised.toLocaleString()} raised</span>
                <span>${TOKEN_SALE_INFO.goal.toLocaleString()} goal</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Purchase Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Purchase Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Wallet className="w-6 h-6 text-cyan-500" />
                  Purchase VOD
                </h2>

                {/* Currency Selection */}
                <div className="mb-6">
                  <label className="block text-slate-400 text-sm mb-2">Select Currency</label>
                  <div className="grid grid-cols-4 gap-2">
                    {TOKEN_SALE_INFO.acceptedCurrencies.map((curr) => (
                      <button
                        key={curr}
                        onClick={() => setCurrency(curr)}
                        className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                          currency === curr
                            ? 'bg-cyan-500 text-white'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Input */}
                <div className="mb-6">
                  <label className="block text-slate-400 text-sm mb-2">
                    Amount ({currency})
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={`Min ${TOKEN_SALE_INFO.minPurchase} ${currency}`}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs bg-white/10 text-slate-400 rounded hover:bg-white/20">
                      MAX
                    </button>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-slate-500">
                    <span>Min: {TOKEN_SALE_INFO.minPurchase} USDT</span>
                    <span>Max: {TOKEN_SALE_INFO.maxPurchase} USDT</span>
                  </div>
                </div>

                {/* You Receive */}
                {vodAmount > 0 && (
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 mb-6">
                    <p className="text-slate-400 text-sm mb-1">You will receive</p>
                    <p className="text-2xl font-bold text-cyan-400">
                      {vodAmount.toLocaleString()} VOD
                    </p>
                  </div>
                )}

                {/* Connect Wallet Button */}
                <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Connect Wallet
                </button>

                <p className="text-center text-slate-500 text-sm mt-4">
                  By purchasing, you agree to the{' '}
                  <Link href="/saft" className="text-cyan-400 hover:underline">
                    SAFT Agreement
                  </Link>
                </p>
              </motion.div>

              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Contract Address */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-500" />
                    Token Contract
                  </h3>
                  <div className="bg-slate-900/50 rounded-lg p-3 flex items-center justify-between">
                    <code className="text-cyan-400 text-sm truncate">
                      0x1234...5678
                    </code>
                    <button
                      onClick={() => handleCopy('0x1234567890abcdef')}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Copy className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Vesting Info */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-violet-500" />
                    Vesting Schedule
                  </h3>
                  <div className="space-y-3">
                    {[
                      { period: 'At TGE', percentage: '20%', color: 'bg-emerald-500' },
                      { period: 'Month 3', percentage: '20%', color: 'bg-cyan-500' },
                      { period: 'Month 6', percentage: '20%', color: 'bg-blue-500' },
                      { period: 'Month 9', percentage: '20%', color: 'bg-violet-500' },
                      { period: 'Month 12', percentage: '20%', color: 'bg-purple-500' },
                    ].map((vest, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${vest.color}`} />
                        <span className="text-slate-400 flex-1">{vest.period}</span>
                        <span className="text-white font-medium">{vest.percentage}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audit Badge */}
                <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Audited by CertiK</p>
                      <p className="text-slate-400 text-sm">Smart contract security verified</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-emerald-500 ml-auto" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tiers Section */}
        <section className="py-12 px-4 bg-slate-900/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Sale Tiers
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {TIERS.map((tier, index) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tier.color} flex items-center justify-center mb-4`}>
                    <Gem className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{tier.allocation}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Min:</span>
                    <span className="text-white">{tier.min} USDT</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-slate-400">Bonus:</span>
                    <span className={`font-bold ${tier.bonus !== '+0%' ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {tier.bonus}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                How to Participate
              </span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-5xl font-bold text-white/10 mb-4">{step.number}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.description}</p>
                  {index < STEPS.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-8 -right-3 w-6 h-6 text-slate-700" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Warning */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 flex gap-4">
              <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0" />
              <div>
                <h4 className="text-amber-400 font-semibold mb-2">Important Notice</h4>
                <p className="text-slate-400 text-sm">
                  Token sales involve significant risk. Please read our{' '}
                  <Link href="/saft" className="text-cyan-400 hover:underline">SAFT Agreement</Link>
                  {' '}and ensure you understand the risks before participating. 
                  This is not financial advice.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
