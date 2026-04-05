"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import {
  Wallet,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  ChevronRight,
  Plus,
  Lock,
} from "lucide-react";

interface WalletData {
  wallet: {
    balance: number;
    totalStaked: number;
    totalEarned: number;
  };
  transactions: {
    id: string;
    type: string;
    amount: number;
    description: string;
    createdAt: string;
  }[];
  stakes: {
    id: string;
    project: {
      id: string;
      name: string;
      slug: string;
    };
    amount: number;
    apy: number;
    startDate: string;
  }[];
}

export default function WalletPage() {
  const t = useTranslations();
  const [data, setData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "stakes" | "history">("overview");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check auth first
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.data.user);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (user) {
      fetchWallet();
    }
  }, [user]);

  const fetchWallet = async () => {
    try {
      const res = await fetch("/api/wallet");
      const result = await res.json();

      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Wallet error:", error);
    }
  };

  const handleUnstake = async (stakeId: string) => {
    try {
      const res = await fetch("/api/wallet/unstake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stakeId }),
      });

      if (res.ok) {
        fetchWallet();
      }
    } catch (error) {
      console.error("Unstake error:", error);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin" />
        </main>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-water-500/20 flex items-center justify-center">
                <Lock className="w-10 h-10 text-water-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">
                Требуется авторизация
              </h1>
              <p className="text-water-200/70 mb-8">
                Кошелёк доступен только авторизованным пользователям. 
                Войдите, чтобы управлять своими UNITY токенами.
              </p>
              <div className="space-y-3">
                <Link href="/login" className="block w-full btn-primary text-center">
                  Войти
                </Link>
                <Link href="/register" className="block w-full btn-outline text-center">
                  Создать аккаунт
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-water-200/50">Не удалось загрузить данные кошелька</div>
        </main>
      </>
    );
  }

  const { wallet, transactions, stakes } = data;
  const totalBalance = wallet.balance + wallet.totalStaked;

  const transactionTypes: Record<string, { label: string; color: string; icon: typeof ArrowDownLeft }> = {
    REGISTRATION_BONUS: { label: "Бонус за регистрацию", color: "text-green-400", icon: Plus },
    STAKE: { label: "Стейкинг", color: "text-orange-400", icon: ArrowUpRight },
    UNSTAKE: { label: "Разстейкинг", color: "text-blue-400", icon: ArrowDownLeft },
    STAKE_REWARD: { label: "Награда за стейкинг", color: "text-green-400", icon: TrendingUp },
    TRANSFER_IN: { label: "Получение", color: "text-green-400", icon: ArrowDownLeft },
    TRANSFER_OUT: { label: "Отправка", color: "text-red-400", icon: ArrowUpRight },
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 mb-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-water-500/20 to-cyan-glow/20 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <Wallet className="w-6 h-6 text-water-400" />
                <span className="text-water-200/70">Ваш баланс</span>
              </div>
              <div className="text-5xl font-bold gradient-text mb-6">
                {totalBalance.toFixed(2)} UNITY
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-sm text-water-200/50 mb-1">Доступно</div>
                  <div className="text-xl font-semibold text-white">
                    {wallet.balance.toFixed(2)}
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-sm text-water-200/50 mb-1">В стейкинге</div>
                  <div className="text-xl font-semibold text-orange-400">
                    {wallet.totalStaked.toFixed(2)}
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-sm text-water-200/50 mb-1">Заработано</div>
                  <div className="text-xl font-semibold text-green-400">
                    {wallet.totalEarned.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { id: "overview", label: "Обзор" },
              { id: "stakes", label: "Стейкинг" },
              { id: "history", label: "История" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab.id
                    ? "bg-water-500/20 text-water-400"
                    : "text-water-200/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Быстрые действия</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a
                    href="/projects"
                    className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition"
                  >
                    <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Застейкать UNITY</div>
                      <div className="text-sm text-water-200/60">
                        Инвестируйте в проекты
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-water-200/30 ml-auto" />
                  </a>

                  <a
                    href="/buy"
                    className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition"
                  >
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <ArrowDownLeft className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Купить UNITY</div>
                      <div className="text-sm text-water-200/60">
                        Pre-Sale со скидкой 33%
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-water-200/30 ml-auto" />
                  </a>
                </div>

                {stakes.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold text-white mt-8">Активные стейки</h3>
                    <div className="space-y-3">
                      {stakes.slice(0, 3).map((stake) => (
                        <div
                          key={stake.id}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                        >
                          <div>
                            <div className="font-medium text-white">
                              {stake.project.name}
                            </div>
                            <div className="text-sm text-water-200/60">
                              {stake.amount.toFixed(2)} UNITY • {stake.apy}% APY
                            </div>
                          </div>
                          <button
                            onClick={() => handleUnstake(stake.id)}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition"
                          >
                            Вывести
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "stakes" && (
              <div className="space-y-4">
                {stakes.length > 0 ? (
                  stakes.map((stake) => (
                    <div
                      key={stake.id}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {stake.project.name}
                          </div>
                          <div className="text-sm text-water-200/60">
                            С {new Date(stake.startDate).toLocaleDateString("ru-RU")}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">
                          {stake.amount.toFixed(2)} UNITY
                        </div>
                        <div className="text-sm text-green-400">{stake.apy}% APY</div>
                      </div>
                      <button
                        onClick={() => handleUnstake(stake.id)}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition ml-4"
                      >
                        Вывести
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-water-200/20 mx-auto mb-4" />
                    <p className="text-water-200/50">У вас нет активных стейков</p>
                    <a
                      href="/projects"
                      className="inline-block mt-4 btn-primary"
                    >
                      Застейкать UNITY
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-3">
                {transactions.length > 0 ? (
                  transactions.map((tx) => {
                    const typeInfo = transactionTypes[tx.type] || {
                      label: tx.type,
                      color: "text-water-200",
                      icon: Clock,
                    };
                    const Icon = typeInfo.icon;

                    return (
                      <div
                        key={tx.id}
                        className="flex items-center gap-4 p-4 bg-white/5 rounded-lg"
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            tx.amount > 0 ? "bg-green-500/20" : "bg-orange-500/20"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              tx.amount > 0 ? "text-green-400" : "text-orange-400"
                            }`}
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="font-medium text-white">{typeInfo.label}</div>
                          <div className="text-sm text-water-200/60">
                            {tx.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-semibold ${
                              tx.amount > 0 ? "text-green-400" : "text-white"
                            }`}
                          >
                            {tx.amount > 0 ? "+" : ""}
                            {tx.amount.toFixed(2)} UNITY
                          </div>
                          <div className="text-xs text-water-200/40">
                            {new Date(tx.createdAt).toLocaleDateString("ru-RU")}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 text-water-200/20 mx-auto mb-4" />
                    <p className="text-water-200/50">История транзакций пуста</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
}
