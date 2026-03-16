"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { 
  User, 
  Microscope, 
  TrendingUp, 
  Building2, 
  Settings,
  Droplets,
  Award,
  Target,
  BarChart3,
  MapPin,
  Bell,
  ChevronRight
} from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  role: 'CITIZEN' | 'SCIENTIST' | 'INVESTOR' | 'GOVERNMENT' | 'OPERATOR' | 'ADMIN';
  level: number;
  xp: number;
  reputation: number;
  unityBalance: number;
  vodecoBalance: number;
  vodBalance: number;
  stakedAmount: number;
  postsCount: number;
  projectsCount: number;
  dataCount: number;
}

const roleConfig = {
  CITIZEN: {
    title: 'Гражданин',
    icon: User,
    color: 'blue',
    description: 'Участвуйте в мониторинге воды, выполняйте миссии и зарабатывайте награды',
    features: [
      { icon: Target, label: 'Миссии', desc: 'Ежедневные задания', href: '/ecosystem/missions' },
      { icon: Award, label: 'Достижения', desc: 'Ваши бейджи', href: '/ecosystem/achievements' },
      { icon: MapPin, label: 'Объекты', desc: 'Мониторинг воды', href: '/objects' },
    ]
  },
  SCIENTIST: {
    title: 'Учёный',
    icon: Microscope,
    color: 'emerald',
    description: 'Доступ к данным, валидация исследований, публикации',
    features: [
      { icon: BarChart3, label: 'Данные', desc: 'Анализ и валидация', href: '/scientist/data' },
      { icon: Microscope, label: 'Исследования', desc: 'Ваши публикации', href: '/scientist/research' },
      { icon: Droplets, label: 'API Доступ', desc: 'Программный доступ', href: '/scientist/api' },
    ]
  },
  INVESTOR: {
    title: 'Инвестор',
    icon: TrendingUp,
    color: 'purple',
    description: 'Управление портфелем, аналитика ROI, голосования DAO',
    features: [
      { icon: TrendingUp, label: 'Портфель', desc: 'Ваши инвестиции', href: '/investor/portfolio' },
      { icon: BarChart3, label: 'Аналитика', desc: 'ROI и метрики', href: '/investor/analytics' },
      { icon: Droplets, label: 'Проекты', desc: 'Новые возможности', href: '/tokenhub' },
    ]
  },
  GOVERNMENT: {
    title: 'Государственный',
    icon: Building2,
    color: 'amber',
    description: 'Региональная аналитика, кризисный центр, отчёты',
    features: [
      { icon: BarChart3, label: 'Дашборд', desc: 'Региональная сводка', href: '/government/dashboard' },
      { icon: Bell, label: 'Кризис-центр', desc: 'Оперативные данные', href: '/government/crisis' },
      { icon: MapPin, label: 'Объекты', desc: 'Инфраструктура', href: '/government/objects' },
    ]
  },
  OPERATOR: {
    title: 'Оператор',
    icon: Settings,
    color: 'orange',
    description: 'Управление IoT, техобслуживание, мониторинг',
    features: [
      { icon: Settings, label: 'Сенсоры', desc: 'IoT управление', href: '/operator/sensors' },
      { icon: Bell, label: 'Алерты', desc: 'Уведомления', href: '/operator/alerts' },
      { icon: BarChart3, label: 'Аналитика', desc: 'Предиктивные данные', href: '/operator/analytics' },
    ]
  },
  ADMIN: {
    title: 'Администратор',
    icon: User,
    color: 'red',
    description: 'Управление платформой, модерация, настройки',
    features: [
      { icon: User, label: 'Пользователи', desc: 'Управление доступом', href: '/admin/users' },
      { icon: BarChart3, label: 'Статистика', desc: 'Метрики платформы', href: '/admin/stats' },
      { icon: Settings, label: 'Настройки', desc: 'Конфигурация', href: '/admin/settings' },
    ]
  },
};

export default function CabinetPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.success) {
        setUser(data.data.user);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setIsLoading(false);
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
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center">
            <User className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Требуется авторизация</h1>
            <p className="text-slate-400">Войдите, чтобы получить доступ к кабинету</p>
          </div>
        </main>
      </>
    );
  }

  const config = roleConfig[user.role] || roleConfig.CITIZEN;
  const RoleIcon = config.icon;
  const progressToNextLevel = ((user.xp % 1000) / 1000) * 100;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl bg-${config.color}-500/10 flex items-center justify-center`}>
                <RoleIcon className={`w-8 h-8 text-${config.color}-400`} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{config.title}</h1>
                <p className="text-slate-400">{config.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Уровень"
              value={user.level}
              subtext={`${user.xp.toLocaleString()} XP`}
              progress={progressToNextLevel}
              color="blue"
            />
            <StatCard
              label="Репутация"
              value={user.reputation}
              subtext="Очки доверия"
              color="purple"
            />
            <StatCard
              label="VODeco"
              value={user.vodecoBalance.toLocaleString()}
              subtext="Governance токен"
              color="emerald"
            />
            <StatCard
              label="В стейкинге"
              value={user.stakedAmount.toLocaleString()}
              subtext="Заблокировано"
              color="amber"
            />
          </div>

          {/* Role Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {config.features.map((feature, index) => (
              <motion.a
                key={feature.label}
                href={feature.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-water-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-${config.color}-500/10 flex items-center justify-center`}>
                    <feature.icon className={`w-6 h-6 text-${config.color}-400`} />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-water-400 transition-colors" />
                </div>
                <h3 className="font-semibold text-white mb-1">{feature.label}</h3>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </motion.a>
            ))}
          </div>

          {/* Activity Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-bold text-white mb-6">Активность</h2>
            <div className="grid grid-cols-3 gap-4">
              <ActivityItem
                label="Посты"
                value={user.postsCount || 0}
                icon={Droplets}
              />
              <ActivityItem
                label="Проекты"
                value={user.projectsCount || 0}
                icon={Target}
              />
              <ActivityItem
                label="Данные"
                value={user.dataCount || 0}
                icon={BarChart3}
              />
            </div>
          </motion.div>

          {/* Role Switcher (for testing/demo) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <p className="text-yellow-400 text-sm mb-2">Режим разработки: Смена роли</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(roleConfig).map(([role, cfg]) => (
                  <button
                    key={role}
                    onClick={() => {
                      fetch('/api/auth/role', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ role })
                      }).then(() => fetchUserData());
                    }}
                    className={`px-3 py-1 rounded-lg text-xs ${
                      user.role === role 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {cfg.title}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  subtext: string;
  progress?: number;
  color: string;
}

function StatCard({ label, value, subtext, progress, color }: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <p className="text-slate-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-slate-500">{subtext}</p>
      {progress !== undefined && (
        <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-${color}-500 rounded-full`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

interface ActivityItemProps {
  label: string;
  value: number;
  icon: any;
}

function ActivityItem({ label, value, icon: Icon }: ActivityItemProps) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-2">
        <Icon className="w-6 h-6 text-water-400" />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}
