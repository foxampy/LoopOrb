"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Gem,
  Shield,
  TrendingUp,
  Calculator,
  Wallet,
  Award,
  AlertCircle,
  CheckCircle2,
  Zap,
} from "lucide-react";

// --- STAKING TIERS DATA ---
const stakingTiers = [
  {
    id: "explorer",
    name: "Исследователь",
    nameEn: "Explorer",
    minAmount: 1000,
    maxAmount: 9999,
    baseApy: 8,
    maxApy: 12,
    color: "from-slate-600 to-slate-500",
    icon: "🔍",
    features: [
      "Базовые награды за стейкинг",
      "Доступ к DAO голосованиям",
      "Ежемесячные бонусы",
      "Базовая поддержка",
    ],
    requirements: [
      "Минимум 1,000 UNITY",
      "Без ограничения по сроку",
    ],
  },
  {
    id: "guardian",
    name: "Хранитель",
    nameEn: "Guardian",
    minAmount: 10000,
    maxAmount: 99999,
    baseApy: 12,
    maxApy: 18,
    color: "from-cyan-500 to-emerald-500",
    icon: "🛡️",
    featured: true,
    features: [
      "Повышенные награды 12-18%",
      "Pre-order доступ к устройствам",
      "Права голосования в DAO",
      "Эксклюзивные NFT-бейджи",
      "Приоритетная поддержка",
    ],
    requirements: [
      "Минимум 10,000 UNITY",
      "Рекомендуемый срок 6+ месяцев",
    ],
  },
  {
    id: "validator",
    name: "Валидатор",
    nameEn: "Validator",
    minAmount: 100000,
    maxAmount: null,
    baseApy: 18,
    maxApy: 25,
    color: "from-amber-500 to-orange-500",
    icon: "⚡",
    features: [
      "Максимальные награды 18-25%",
      "Возможность запуска ноды валидации",
      "Валидация водных данных",
      "Дивиденды от комиссий сети",
      "White-glove поддержка",
      "Доступ к закрытым мероприятиям",
    ],
    requirements: [
      "Минимум 100,000 UNITY",
      "Обязательный срок 12+ месяцев",
      "Технические требования для ноды",
    ],
  },
];

// --- CALCULATOR COMPONENT ---
function StakingCalculator() {
  const [amount, setAmount] = useState(10000);
  const [duration, setDuration] = useState(12);
  const [tier, setTier] = useState(stakingTiers[1]);

  useEffect(() => {
    const newTier = stakingTiers.find(
      (t) => amount >= t.minAmount && (t.maxAmount === null || amount <= t.maxAmount)
    ) || stakingTiers[0];
    setTier(newTier);
  }, [amount]);

  const baseApy = tier.baseApy;
  const durationBonus = Math.min((duration / 12) * 4, 10);
  const amountBonus = amount >= 100000 ? 5 : amount >= 50000 ? 3 : amount >= 10000 ? 2 : 0;
  const estimatedApy = Math.min(baseApy + durationBonus + amountBonus, tier.maxApy);
  
  const annualYield = (amount * estimatedApy) / 100;
  const totalYield = annualYield * (duration / 12);
  const totalReturn = amount + totalYield;

  return (
    <div className="glass-card p-6 md:p-8">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-cyan-400" />
        Калькулятор доходности
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Amount Input */}
        <div>
          <label className="block text-sm text-water-200/70 mb-2">
            Сумма стейкинга (UNITY)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-lg focus:outline-none focus:border-cyan-500 transition"
            min="1000"
            step="100"
          />
          <input
            type="range"
            min="1000"
            max="500000"
            step="1000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full mt-3 accent-cyan-500"
          />
          <div className="flex justify-between text-xs text-water-200/50 mt-1">
            <span>1,000</span>
            <span>500,000</span>
          </div>
        </div>

        {/* Duration Input */}
        <div>
          <label className="block text-sm text-water-200/70 mb-2">
            Срок блокировки (месяцев)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono text-lg focus:outline-none focus:border-cyan-500 transition"
            min="1"
            max="36"
          />
          <input
            type="range"
            min="1"
            max="36"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full mt-3 accent-cyan-500"
          />
          <div className="flex justify-between text-xs text-water-200/50 mt-1">
            <span>1 мес</span>
            <span>36 мес</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/5 rounded-xl">
        <div className="text-center">
          <div className="text-sm text-water-200/50 mb-1">Ваш уровень</div>
          <div className="text-lg font-bold text-cyan-400">{tier.name}</div>
          <div className="text-xs text-water-200/50">{tier.nameEn}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-water-200/50 mb-1">APY</div>
          <div className="text-2xl font-bold text-emerald-400">{estimatedApy}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-water-200/50 mb-1">Годовой доход</div>
          <div className="text-xl font-bold text-white">{annualYield.toLocaleString()} UNITY</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-water-200/50 mb-1">Итого через {duration} мес</div>
          <div className="text-xl font-bold text-cyan-400">{totalReturn.toLocaleString()} UNITY</div>
        </div>
      </div>

      {/* Formula Breakdown */}
      <div className="mt-4 p-4 bg-slate-900/50 rounded-xl border border-white/5">
        <div className="text-sm text-water-200/50 mb-2">Формула расчета:</div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded">Базовый APY: {baseApy}%</span>
          <span className="text-water-200/30">+</span>
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">Бонус срока: +{durationBonus.toFixed(1)}%</span>
          {amountBonus > 0 && (
            <>
              <span className="text-water-200/30">+</span>
              <span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded">Бонус суммы: +{amountBonus}%</span>
            </>
          )}
          <span className="text-water-200/30">=</span>
          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded font-bold">Итого: {estimatedApy}%</span>
        </div>
      </div>
    </div>
  );
}

// --- TIER CARD COMPONENT ---
function TierCard({ tier, index }: { tier: typeof stakingTiers[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative p-6 rounded-2xl border ${
        tier.featured 
          ? "bg-gradient-to-b from-cyan-500/10 to-emerald-500/10 border-cyan-500/50 md:-mt-4 md:mb-4" 
          : "bg-white/5 border-white/10 hover:border-white/20"
      } transition-all`}
    >
      {tier.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 text-xs font-bold rounded-full">
          РЕКОМЕНДУЕМ
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center text-3xl`}>
          {tier.icon}
        </div>
        <h3 className="text-xl font-bold text-white">{tier.name}</h3>
        <p className="text-sm text-water-200/50">{tier.nameEn}</p>
      </div>

      {/* Amount Range */}
      <div className="text-center mb-4">
        <div className="text-cyan-400 font-mono">
          {tier.minAmount.toLocaleString()} - {tier.maxAmount ? tier.maxAmount.toLocaleString() : "∞"} UNITY
        </div>
      </div>

      {/* APY */}
      <div className="text-center mb-6">
        <div className="text-4xl font-black text-white">{tier.baseApy}-{tier.maxApy}%</div>
        <div className="text-sm text-water-200/50">APY</div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-water-200/70">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Requirements */}
      <div className="pt-4 border-t border-white/10 mb-6">
        <div className="text-xs text-water-200/50 mb-2">Требования:</div>
        {tier.requirements.map((req, i) => (
          <div key={i} className="text-xs text-water-200/70 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {req}
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
        tier.featured 
          ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 hover:from-cyan-400 hover:to-emerald-400" 
          : "bg-white/10 text-white hover:bg-white/20"
      }`}>
        Выбрать уровень
      </button>
    </motion.div>
  );
}

// --- STAKING INFO SECTION ---
function StakingInfoSection() {
  const benefits = [
    {
      icon: Shield,
      title: "Гарантия обеспечения водой",
      desc: "Все стейкинг-награды обеспечены реальными данными о воде и комиссиями инфраструктуры",
      color: "text-emerald-400",
    },
    {
      icon: TrendingUp,
      title: "Устойчивый доход",
      desc: "Доходность 8-25% APY в зависимости от уровня и срока стейкинга",
      color: "text-cyan-400",
    },
    {
      icon: Award,
      title: "Управление DAO",
      desc: "Застейканные токены дают право голоса в управлении экосистемой",
      color: "text-amber-400",
    },
    {
      icon: Zap,
      title: "Измеримый эффект",
      desc: "Каждый застейканный токен финансирует верифицированные узлы мониторинга воды",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {benefits.map((benefit, index) => (
        <motion.div
          key={benefit.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card p-6 text-center"
        >
          <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-white/5 flex items-center justify-center`}>
            <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
          </div>
          <h4 className="font-semibold text-white mb-2">{benefit.title}</h4>
          <p className="text-sm text-water-200/60">{benefit.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

// --- MAIN PAGE ---
export default function StakingPage() {
  const t = useTranslations("staking");
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
              <Gem className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">{t("title")}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-water-200/70 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </motion.div>

          {/* Staking Tiers */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">{t("tiers.title")}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {stakingTiers.map((tier, index) => (
                <TierCard key={tier.id} tier={tier} index={index} />
              ))}
            </div>
          </div>

          {/* Calculator */}
          <div className="mb-12">
            <StakingCalculator />
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Преимущества стейкинга</h2>
            <StakingInfoSection />
          </div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Как работает стейкинг</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Выбери уровень", desc: "Определи сумму и срок стейкинга" },
                { step: "2", title: "Застейкай токены", desc: "Заблокируй UNITY в смарт-контракте" },
                { step: "3", title: "Получай награды", desc: "Ежедневные начисления в токенах UNITY" },
                { step: "4", title: "Управляй", desc: "Голосуй за проекты в DAO" },
              ].map((item, index) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xl">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-water-200/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="glass-card p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Готов начать?</h3>
              <p className="text-water-200/70 mb-6">
                Присоединяйся к тысячам стейкеров, которые уже зарабатывают 
                на защите водных ресурсов планеты.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/wallet" className="btn-primary flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Перейти в кошелек
                </Link>
                <Link href="/buy" className="btn-secondary flex items-center gap-2">
                  <Gem className="w-5 h-5" />
                  Купить UNITY
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
