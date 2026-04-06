"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Wallet,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Clock,
  Shield,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Building2,
  Bitcoin,
  Info,
  Copy,
  ChevronRight,
  Zap,
  Gift,
  Users,
} from "lucide-react";

const packages = [
  {
    id: "starter",
    name: "Starter",
    amount: 100,
    price: 10,
    bonus: 0,
    popular: false,
  },
  {
    id: "growth",
    name: "Growth",
    amount: 500,
    price: 45,
    bonus: 5,
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    amount: 1000,
    price: 80,
    bonus: 15,
    popular: false,
  },
  {
    id: "whale",
    name: "Whale",
    amount: 5000,
    price: 350,
    bonus: 100,
    popular: false,
  },
  {
    id: "custom",
    name: "Custom",
    amount: 0,
    price: 0,
    bonus: 0,
    popular: false,
    custom: true,
  },
];

const paymentMethods = [
  { id: "card", name: "Банковская карта", icon: CreditCard, description: "Visa, Mastercard, МИР" },
  { id: "bank", name: "Банковский перевод", icon: Building2, description: "SWIFT, SEPA" },
  { id: "crypto", name: "Криптовалюта", icon: Bitcoin, description: "USDT, USDC, BTC, ETH" },
];

const saleInfo = {
  name: "Seed Round — Token Booking",
  price: 0.10,
  nextRoundPrice: 0.15,
  totalSupply: 100_000_000,
  sold: 12_450_000,
  hardCap: 5_000_000,
  raised: 1_245_000,
  closedRound: "$100,000 (Completed by FoxampyLab Team)",
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
};

export default function BuyTokensPage() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState(packages[1]);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [referralCode, setReferralCode] = useState("");
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = saleInfo.endDate.getTime() - now;
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateTotal = () => {
    const amount = selectedPackage.custom ? parseFloat(customAmount) || 0 : selectedPackage.amount;
    const price = amount * saleInfo.price;
    const bonus = selectedPackage.custom ? Math.floor(amount * 0.02) : selectedPackage.bonus;
    return { amount, price, bonus, total: amount + bonus };
  };

  const handlePurchase = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setShowSuccess(true);
  };

  const { amount, price, bonus, total } = calculateTotal();
  const progress = (saleInfo.raised / saleInfo.hardCap) * 100;

  if (showSuccess) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 max-w-md w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Покупка успешна!</h2>
            <p className="text-water-200/70 mb-6">
              Вы приобрели <span className="text-cyan-400 font-semibold">{total.toLocaleString()} UNITY</span>
              <br />
              (включая бонус {bonus.toLocaleString()} UNITY)
            </p>
            
            <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
              <div className="text-sm text-water-200/50 mb-1">TxID</div>
              <div className="flex items-center gap-2">
                <code className="text-xs text-white font-mono">0x7f8a9b...2c3d4e</code>
                <button className="text-water-400 hover:text-water-300">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link href="/wallet" className="flex-1 btn-primary">
                Перейти в кошелёк
              </Link>
            </div>
          </motion.div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/wallet"
              className="inline-flex items-center gap-2 text-water-200/70 hover:text-white mb-4 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад в кошелёк
            </Link>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Book Seed Round Tokens</h1>
                <p className="text-water-200/70">
                  Token booking for Seed Round — Tokens that carry verified water data. Developed by FoxampyLab.
                </p>
              </div>
              <div className="glass-card px-4 py-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-water-500/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-water-400" />
                </div>
                <div>
                  <div className="text-xs text-water-200/50">Ваш баланс</div>
                  <div className="font-semibold text-white">0 UNITY</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Sale Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-ocean-deep" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">{saleInfo.name}</h2>
                      <p className="text-sm text-emerald-400">Platform in Development — First Anchor Investment Round</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold gradient-text">${saleInfo.price}</div>
                    <div className="text-sm text-water-200/50">
                      <span className="line-through">${saleInfo.nextRoundPrice}</span> за UNITY
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-water-200/70">Прогресс продаж</span>
                    <span className="text-white">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-water-400 to-cyan-glow rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-water-200/50">${saleInfo.raised.toLocaleString()} собрано</span>
                    <span className="text-water-200/50">Hard Cap: ${saleInfo.hardCap.toLocaleString()}</span>
                  </div>
                </div>

                {/* Countdown */}
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                  <Clock className="w-5 h-5 text-water-400" />
                  <div className="flex-1">
                    <div className="text-sm text-water-200/70 mb-1">До окончания раунда</div>
                    <div className="flex gap-2">
                      {[
                        { value: timeLeft.days, label: "дн" },
                        { value: timeLeft.hours, label: "час" },
                        { value: timeLeft.minutes, label: "мин" },
                        { value: timeLeft.seconds, label: "сек" },
                      ].map((item, i) => (
                        <div key={i} className="bg-ocean-deep px-2 py-1 rounded text-center min-w-[50px]">
                          <div className="text-lg font-bold text-white">{String(item.value).padStart(2, "0")}</div>
                          <div className="text-xs text-water-200/50">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Closed Round Info */}
                <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="text-sm font-medium text-white">Closed Round: $100,000</div>
                    <div className="text-xs text-water-200/60">Completed by FoxampyLab Team — Seed Round now open for booking</div>
                  </div>
                </div>
              </motion.div>

              {/* Package Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Выберите пакет</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`relative p-4 rounded-lg border-2 transition text-left ${
                        selectedPackage.id === pkg.id
                          ? "border-water-500 bg-water-500/10"
                          : "border-transparent bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gradient-to-r from-water-500 to-cyan-glow text-ocean-deep text-xs font-bold rounded-full">
                          Популярный
                        </div>
                      )}
                      <div className="font-medium text-white mb-1">{pkg.name}</div>
                      {pkg.custom ? (
                        <input
                          type="number"
                          value={customAmount}
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedPackage(pkg);
                          }}
                          placeholder="Введите сумму"
                          className="w-full bg-ocean-deep border border-white/10 rounded px-2 py-1 text-sm text-white placeholder:text-white/30"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <>
                          <div className="text-2xl font-bold gradient-text">{pkg.amount.toLocaleString()}</div>
                          <div className="text-sm text-water-200/50">UNITY</div>
                          {pkg.bonus > 0 && (
                            <div className="text-xs text-green-400 mt-1">+{pkg.bonus} бонус</div>
                          )}
                          <div className="text-sm text-white mt-2">${pkg.price}</div>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Способ оплаты</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full p-4 rounded-lg border-2 transition flex items-center gap-4 ${
                        paymentMethod === method.id
                          ? "border-water-500 bg-water-500/10"
                          : "border-transparent bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        paymentMethod === method.id ? "bg-water-500/20" : "bg-white/5"
                      }`}>
                        <method.icon className={`w-6 h-6 ${
                          paymentMethod === method.id ? "text-water-400" : "text-water-200/50"
                        }`} />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-medium text-white">{method.name}</div>
                        <div className="text-sm text-water-200/50">{method.description}</div>
                      </div>
                      {paymentMethod === method.id && (
                        <CheckCircle className="w-5 h-5 text-water-400" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Referral Code */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">Реферальный код</h3>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="Введите код (опционально)"
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-water-500 transition"
                  />
                  <button className="btn-secondary">Применить</button>
                </div>
                <p className="text-sm text-water-200/50 mt-2">
                  Получите дополнительно 5% бонусов при использовании реферального кода
                </p>
              </motion.div>
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6 sticky top-24"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Итого</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-water-200/70">UNITY токены</span>
                    <span className="text-white">{amount.toLocaleString()}</span>
                  </div>
                  {bonus > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-water-200/70">Бонус ({Math.round(bonus / amount * 100)}%)</span>
                      <span className="text-green-400">+{bonus.toLocaleString()}</span>
                    </div>
                  )}
                  {referralCode && (
                    <div className="flex justify-between text-sm">
                      <span className="text-water-200/70">Реферальный бонус</span>
                      <span className="text-yellow-400">+{Math.floor(amount * 0.05).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="h-px bg-white/10 my-3" />
                  <div className="flex justify-between">
                    <span className="text-water-200/70">Всего токенов</span>
                    <span className="text-xl font-bold gradient-text">
                      {(total + (referralCode ? Math.floor(amount * 0.05) : 0)).toLocaleString()} UNITY
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-water-200/70">К оплате</span>
                    <span className="text-lg font-semibold text-white">${price.toFixed(2)}</span>
                  </div>
                </div>

                {/* Savings */}
                {bonus > 0 && (
                  <div className="p-3 bg-green-500/10 rounded-lg mb-4">
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>Вы экономите ${(bonus * saleInfo.nextRoundPrice).toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Agreement */}
                <label className="flex items-start gap-3 mb-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-5 h-5 rounded border-white/20 bg-white/5 text-water-500 focus:ring-water-500 mt-0.5"
                  />
                  <span className="text-sm text-water-200/70">
                    Я согласен с{" "}
                    <Link href="/saft" className="text-water-400 hover:underline">Условиями использования</Link>{" "}
                    и{" "}
                    <Link href="/litepaper" className="text-water-400 hover:underline">Политикой конфиденциальности</Link>
                  </span>
                </label>

                {/* Buy Button */}
                <button
                  onClick={handlePurchase}
                  disabled={!agreed || amount === 0 || isProcessing}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Обработка...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Book Seed Round Tokens
                    </>
                  )}
                </button>

                {/* Security Note */}
                <div className="flex items-center gap-2 mt-4 text-xs text-water-200/50">
                  <Shield className="w-4 h-4" />
                  <span>Безопасная оплата с шифрованием SSL</span>
                </div>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <h4 className="font-medium text-white mb-3">Seed Round Benefits</h4>
                <ul className="space-y-2 text-sm">
                  {[
                    "Early access at Seed Round price",
                    "Tokens that carry verified water data",
                    "Priority access to future staking",
                    "DAO governance participation",
                    "Developed by FoxampyLab",
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-water-200/70">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
