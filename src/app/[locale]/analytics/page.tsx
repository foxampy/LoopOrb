"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Wallet,
  Droplets,
  FolderOpen,
  Gavel,
  Target,
  Award,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
  Sparkles,
  Crown,
  Zap,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  activeProjects: number;
  totalWaterObjects: number;
  totalStaked: number;
  daoProposals: number;
  daoVotes: number;
  userGrowth: Array<{ date: string; value: number }>;
  projectGrowth: Array<{ date: string; value: number }>;
  stakingStats: { total: number; change: number };
  topProjects: Array<{ name: string; raised: number; progress: number }>;
  userDistribution: Array<{ role: string; count: number; percentage: number }>;
  waterObjectsByType: Array<{ label: string; value: number }>;
  recentActivity: Array<{ type: string; action: string; time: string; user: string }>;
}

const defaultAnalytics: AnalyticsData = {
  totalUsers: 0,
  activeUsers: 0,
  totalProjects: 0,
  activeProjects: 0,
  totalWaterObjects: 0,
  totalStaked: 0,
  daoProposals: 0,
  daoVotes: 0,
  userGrowth: [],
  projectGrowth: [],
  stakingStats: { total: 0, change: 0 },
  topProjects: [],
  userDistribution: [],
  waterObjectsByType: [],
  recentActivity: [],
};

// Mock data for guest preview (will be replaced with real data after registration)
const guestPreviewData: Partial<AnalyticsData> = {
  totalUsers: 1247,
  activeUsers: 342,
  totalProjects: 4,
  activeProjects: 3,
  totalWaterObjects: 156,
  totalStaked: 25000,
  daoProposals: 0,
  daoVotes: 0,
};

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  delay = 0,
}: {
  title: string;
  value: string | number;
  change?: number;
  icon: any;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass-card p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm ${
              change >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {change >= 0 ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            <span className="font-medium">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-water-200/60">{title}</div>
    </motion.div>
  );
}

function ChartPlaceholder({
  title,
  icon: Icon,
  children,
  locked = false,
}: {
  title: string;
  icon: any;
  children?: React.ReactNode;
  locked?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-water-500/20 flex items-center justify-center">
            <Icon className="w-4 h-4 text-water-400" />
          </div>
          <h3 className="font-semibold text-white">{title}</h3>
        </div>
        {locked && (
          <div className="flex items-center gap-1 text-xs text-water-200/50">
            <Lock className="w-3 h-3" />
            <span>Только для участников</span>
          </div>
        )}
      </div>
      {locked ? (
        <div className="h-48 flex flex-col items-center justify-center text-center">
          <Lock className="w-10 h-10 text-water-200/30 mb-3" />
          <p className="text-water-200/50 text-sm mb-2">
            Зарегистрируйтесь для просмотра детальной аналитики
          </p>
          <Link href="/register" className="btn-primary text-sm">
            Создать аккаунт
          </Link>
        </div>
      ) : (
        children
      )}
    </motion.div>
  );
}

function SimpleBarChart({ data }: { data: Array<{ label: string; value: number }> }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-water-200/50">
        Нет данных
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="h-40 flex items-end gap-2">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full bg-gradient-to-t from-water-500 to-cyan-400 rounded-t transition-all duration-500"
            style={{
              height: `${(item.value / maxValue) * 120}px`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
          <span className="text-xs text-water-200/60 truncate w-full text-center">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function ActivityFeed({ activities }: { activities: AnalyticsData["recentActivity"] }) {
  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-8 text-water-200/50">
        <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p>Нет недавней активности</p>
      </div>
    );
  }

  const typeIcons: Record<string, any> = {
    user: Users,
    project: FolderOpen,
    water: Droplets,
    dao: Gavel,
    stake: Wallet,
  };

  const typeColors: Record<string, string> = {
    user: "bg-blue-500/20 text-blue-400",
    project: "bg-green-500/20 text-green-400",
    water: "bg-cyan-500/20 text-cyan-400",
    dao: "bg-purple-500/20 text-purple-400",
    stake: "bg-amber-500/20 text-amber-400",
  };

  return (
    <div className="space-y-3">
      {activities.map((activity, index) => {
        const Icon = typeIcons[activity.type] || Activity;
        const color = typeColors[activity.type] || "bg-gray-500/20 text-gray-400";

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
          >
            <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{activity.action}</p>
              <p className="text-xs text-water-200/50">{activity.user}</p>
            </div>
            <span className="text-xs text-water-200/40 whitespace-nowrap">{activity.time}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function GuestUpsellBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-8 bg-gradient-to-r from-water-500/20 to-cyan-500/20 border-water-500/30"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-water-400 to-cyan-400 flex items-center justify-center">
            <Crown className="w-7 h-7 text-ocean-deep" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Получите полный доступ к аналитике
            </h3>
            <p className="text-sm text-water-200/70">
              Зарегистрируйтесь сейчас и получите скидку 50% на годовую подписку Premium
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/register" className="btn-primary text-center whitespace-nowrap">
            Создать аккаунт
          </Link>
          <Link href="/login" className="btn-secondary text-center whitespace-nowrap">
            Войти
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>(defaultAnalytics);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        // Check if user is authenticated
        const userRes = await fetch("/api/auth/me");
        const userData = await userRes.json();

        if (userData.success) {
          setIsGuest(false);
          // Load real analytics data
          const res = await fetch("/api/analytics");
          const data = await res.json();
          if (data.success) {
            setAnalytics(data.data);
          }
        } else {
          setIsGuest(true);
          // Use preview data for guests
          setAnalytics({
            ...defaultAnalytics,
            ...guestPreviewData,
            userDistribution: [
              { role: "Citizen", count: 520, percentage: 42 },
              { role: "Scientist", count: 312, percentage: 25 },
              { role: "Investor", count: 249, percentage: 20 },
              { role: "Operator", count: 104, percentage: 8 },
              { role: "Government", count: 62, percentage: 5 },
            ],
            waterObjectsByType: [
              { label: "Реки", value: 62 },
              { label: "Озера", value: 45 },
              { label: "Станции", value: 28 },
              { label: "Океаны", value: 21 },
            ],
            recentActivity: [
              { type: "user", action: "Новый пользователь присоединился", time: "2 мин назад", user: "Alex M." },
              { type: "project", action: "Проект 'Чистая вода' запущен", time: "15 мин назад", user: "EcoTeam" },
              { type: "water", action: "Добавлены данные по реке Волга", time: "1 час назад", user: "Dr. Smith" },
              { type: "stake", action: "Стейкинг 500 UNITY", time: "2 часа назад", user: "Investor123" },
              { type: "dao", action: "Создано новое предложение", time: "3 часа назад", user: "DAO_Master" },
            ],
          });
        }
      } catch (error) {
        console.error("Failed to load analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, []);

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

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-water-400" />
                  Аналитика экосистемы
                </h1>
                <p className="text-water-200/70">
                  Детальные метрики и статистика платформы LoopOrb
                </p>
              </div>
              {isGuest && (
                <Link href="/register" className="btn-primary inline-flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Получить Premium со скидкой 50%
                </Link>
              )}
            </div>
          </motion.div>

          {/* Guest Upsell */}
          {isGuest && <GuestUpsellBanner />}

          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Пользователей"
              value={analytics.totalUsers.toLocaleString()}
              change={12.5}
              icon={Users}
              color="bg-gradient-to-br from-blue-500 to-cyan-500"
              delay={0}
            />
            <StatCard
              title="Активных проектов"
              value={analytics.activeProjects}
              change={8.3}
              icon={FolderOpen}
              color="bg-gradient-to-br from-green-500 to-emerald-500"
              delay={0.1}
            />
            <StatCard
              title="Водных объектов"
              value={analytics.totalWaterObjects}
              change={15.7}
              icon={Droplets}
              color="bg-gradient-to-br from-cyan-500 to-blue-500"
              delay={0.2}
            />
            <StatCard
              title="В стейкинге"
              value={`${(analytics.totalStaked / 1000).toFixed(1)}K UNITY`}
              change={-2.4}
              icon={Wallet}
              color="bg-gradient-to-br from-purple-500 to-pink-500"
              delay={0.3}
            />
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Предложений DAO"
              value={analytics.daoProposals}
              icon={Gavel}
              color="bg-gradient-to-br from-amber-500 to-orange-500"
              delay={0.4}
            />
            <StatCard
              title="Голосов в DAO"
              value={analytics.daoVotes.toLocaleString()}
              icon={Target}
              color="bg-gradient-to-br from-red-500 to-pink-500"
              delay={0.5}
            />
            <StatCard
              title="Активных пользователей"
              value={analytics.activeUsers}
              change={5.2}
              icon={Activity}
              color="bg-gradient-to-br from-teal-500 to-green-500"
              delay={0.6}
            />
            <StatCard
              title="Всего проектов"
              value={analytics.totalProjects}
              icon={Award}
              color="bg-gradient-to-br from-indigo-500 to-purple-500"
              delay={0.7}
            />
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <ChartPlaceholder title="Рост пользователей" icon={LineChart} locked={isGuest}>
              <SimpleBarChart
                data={[
                  { label: "Пн", value: 120 },
                  { label: "Вт", value: 180 },
                  { label: "Ср", value: 150 },
                  { label: "Чт", value: 220 },
                  { label: "Пт", value: 280 },
                  { label: "Сб", value: 250 },
                  { label: "Вс", value: 310 },
                ]}
              />
            </ChartPlaceholder>

            <ChartPlaceholder title="Распределение по ролям" icon={PieChart} locked={isGuest}>
              <SimpleBarChart data={analytics.userDistribution.map((d) => ({ label: d.role, value: d.count }))} />
            </ChartPlaceholder>
          </div>

          {/* Second Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <ChartPlaceholder title="Водные объекты по типам" icon={Droplets} locked={isGuest}>
              <SimpleBarChart data={analytics.waterObjectsByType} />
            </ChartPlaceholder>

            <ChartPlaceholder title="Топ проектов" icon={TrendingUp} locked={isGuest}>
              <div className="space-y-3">
                {[
                  { name: "VOD-Lab Israel", raised: 125000, progress: 62 },
                  { name: "Balkhash Conservation", raised: 89000, progress: 45 },
                  { name: "Ocean Cleanup Initiative", raised: 67000, progress: 34 },
                ].map((project, index) => (
                  <div key={index} className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white font-medium">{project.name}</span>
                      <span className="text-xs text-water-200/60">${project.raised.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-water-400 to-cyan-400 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ChartPlaceholder>
          </div>

          {/* Activity Feed & Additional Info */}
          <div className="grid lg:grid-cols-2 gap-6">
            <ChartPlaceholder title="Последняя активность" icon={Activity} locked={isGuest}>
              <ActivityFeed activities={analytics.recentActivity} />
            </ChartPlaceholder>

            <ChartPlaceholder title="Статистика стейкинга" icon={Wallet} locked={isGuest}>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm text-white">Общий объем стейкинга</div>
                      <div className="text-xs text-water-200/60">Все проекты</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      {(analytics.totalStaked / 1000).toFixed(1)}K
                    </div>
                    <div className="text-xs text-green-400">+{analytics.stakingStats.change || 5.2}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-white/5 rounded-lg text-center">
                    <div className="text-2xl font-bold text-cyan-400">12-20%</div>
                    <div className="text-xs text-water-200/60 mt-1">Средний APY</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {analytics.activeProjects}
                    </div>
                    <div className="text-xs text-water-200/60 mt-1">Активных пулов</div>
                  </div>
                </div>

                <Link
                  href="/staking"
                  className="block w-full btn-primary text-center mt-4"
                >
                  Начать стейкинг
                </Link>
              </div>
            </ChartPlaceholder>
          </div>

          {/* Premium Features Teaser */}
          {isGuest && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 glass-card p-8 text-center"
            >
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Разблокируйте Premium аналитику
                </h3>
                <p className="text-water-200/70 mb-6">
                  Получите доступ к расширенным метрикам, AI-прогнозам, экспорту данных и персональным отчетам
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: LineChart, text: "AI прогнозы" },
                    { icon: BarChart3, text: "Кастомные отчеты" },
                    { icon: Zap, text: "Real-time данные" },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center justify-center gap-2 text-sm text-water-200/70">
                      <feature.icon className="w-4 h-4 text-amber-400" />
                      {feature.text}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/register" className="btn-primary inline-flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Начать бесплатно
                  </Link>
                  <Link href="/buy" className="btn-secondary inline-flex items-center justify-center gap-2">
                    <Info className="w-4 h-4" />
                    Узнать больше
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
