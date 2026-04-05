"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Wallet,
  FolderOpen,
  Droplets,
  TrendingUp,
  Award,
  Users,
  ArrowRight,
  Plus,
  Bell,
  Download,
  Settings,
  Share2,
  UserPlus,
  Activity,
  Microscope,
  BarChart3,
  FileText,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Globe,
  Heart,
  MessageCircle,
  Eye,
  DollarSign,
  PieChart,
  Layers,
  Filter,
  Grid3X3,
  List,
  RefreshCw,
  ChevronDown,
  Star,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// ==========================================
// TYPES & INTERFACES
// ==========================================

type UserRole = "CITIZEN" | "SCIENTIST" | "INVESTOR" | "GOVERNMENT" | "OPERATOR" | "ADMIN";

interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  unityBalance: number;
  stakedAmount: number;
  level: number;
  xp: number;
  reputation: number;
  role: UserRole;
  handle?: string;
  bio?: string;
  // VODeco 3-token system
  vodBalance: number;
  vodecoBalance: number;
  vodcreditScore: number;
}

interface TokenBalance {
  VOD: number;
  VODeco: number;
  VODcredit: number;
  UNITY: number;
}

interface Project {
  id: string;
  slug: string;
  name: string;
  coverImage?: string;
  status: string;
  raisedAmount: number;
  targetAmount?: number;
  apy?: number;
  myInvestment?: number;
  roi?: number;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  type: "DAILY" | "WEEKLY" | "MONTHLY" | "ONETIME";
  category: string;
  progress: number;
  target: number;
  xpReward: number;
  vodReward: number;
  status: "ACTIVE" | "COMPLETED" | "EXPIRED";
  endDate?: string;
}

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error" | "achievement" | "mission";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  icon?: string;
}

interface SensorData {
  id: string;
  objectId: string;
  objectName: string;
  objectType: string;
  ph: number;
  temperature: number;
  turbidity: number;
  tds: number;
  dissolvedOxygen: number;
  qualityIndex: number;
  status: "good" | "warning" | "critical";
  lastUpdate: string;
  coordinates?: { lat: number; lng: number };
}

interface FriendActivity {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  action: string;
  target?: string;
  timestamp: string;
  type: "achievement" | "data" | "project" | "mission" | "investment";
}

interface AIRecommendation {
  id: string;
  type: "project" | "mission" | "object" | "group" | "friend";
  title: string;
  description: string;
  matchScore: number;
  image?: string;
  href: string;
}

interface PortfolioHistory {
  date: string;
  value: number;
}

interface DashboardData {
  user: User | null;
  tokenBalances: TokenBalance;
  projects: Project[];
  missions: Mission[];
  notifications: Notification[];
  sensorData: SensorData[];
  friendActivity: FriendActivity[];
  recommendations: AIRecommendation[];
  portfolioHistory: PortfolioHistory[];
  stats: {
    totalInvested: number;
    totalROI: number;
    missionsCompleted: number;
    dataPoints: number;
    friendsCount: number;
    alertsCount: number;
  };
}

// ==========================================
// WIDGET COMPONENTS
// ==========================================

// Token Balance Widget
function TokenBalanceWidget({ balances }: { balances: TokenBalance }) {
  const tokens = [
    { name: "VOD", value: balances.VOD, color: "from-cyan-400 to-blue-500", icon: Droplets },
    { name: "VODeco", value: balances.VODeco, color: "from-purple-400 to-pink-500", icon: Globe },
    { name: "VODcredit", value: balances.VODcredit, color: "from-amber-400 to-orange-500", icon: Award },
    { name: "UNITY", value: balances.UNITY, color: "from-green-400 to-emerald-500", icon: Wallet },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Баланс токенов</h3>
        <Link href="/wallet" className="text-sm text-water-400 hover:text-water-300 transition">
          Все операции →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {tokens.map((token) => (
          <div
            key={token.name}
            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition"
          >
            <div className="flex items-center gap-2 mb-2">
              <token.icon className={`w-4 h-4 bg-gradient-to-r ${token.color} rounded-full p-0.5`} />
              <span className="text-sm text-water-200/70">{token.name}</span>
            </div>
            <div className="text-xl font-bold text-white">
              {token.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Active Projects Widget
function ActiveProjectsWidget({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Активные проекты</h3>
        <Link href="/projects" className="text-sm text-water-400 hover:text-water-300 transition">
          Все проекты →
        </Link>
      </div>
      <div className="space-y-3">
        {projects.length > 0 ? (
          projects.slice(0, 4).map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-water-500/30 to-cyan-glow/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition">
                <FolderOpen className="w-5 h-5 text-water-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">{project.name}</div>
                <div className="flex items-center gap-3 text-xs text-water-200/60">
                  {project.myInvestment !== undefined && (
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {project.myInvestment.toLocaleString()}
                    </span>
                  )}
                  {project.roi !== undefined && (
                    <span className={`flex items-center gap-1 ${project.roi >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {project.roi >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {project.roi >= 0 ? "+" : ""}{project.roi}%
                    </span>
                  )}
                  <span className="capitalize">{project.status}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-water-200/30 flex-shrink-0" />
            </Link>
          ))
        ) : (
          <div className="text-center py-8 text-water-200/50">
            Нет активных проектов
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Missions Progress Widget
function MissionsWidget({ missions }: { missions: Mission[] }) {
  const activeMissions = missions.filter((m) => m.status === "ACTIVE");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Текущие миссии</h3>
        <Link href="/missions" className="text-sm text-water-400 hover:text-water-300 transition">
          Все миссии →
        </Link>
      </div>
      <div className="space-y-4">
        {activeMissions.length > 0 ? (
          activeMissions.slice(0, 3).map((mission) => (
            <div key={mission.id} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="font-medium text-white">{mission.title}</div>
                  <div className="text-xs text-water-200/50">{mission.description}</div>
                </div>
                <Target className="w-5 h-5 text-water-400 flex-shrink-0 ml-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-water-200/70">Прогресс</span>
                  <span className="text-water-200/50">
                    {mission.progress} / {mission.target}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-water-400 to-cyan-glow rounded-full transition-all duration-500"
                    style={{ width: `${(mission.progress / mission.target) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-water-200/40">
                    Награда: {mission.xpReward} XP + {mission.vodReward} VOD
                  </span>
                  {mission.endDate && (
                    <span className="text-water-200/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(mission.endDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-water-200/50">
            Нет активных миссий
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Notifications Widget
function NotificationsWidget({ notifications }: { notifications: Notification[] }) {
  const unreadNotifications = notifications.filter((n) => !n.read);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
      case "achievement":
        return CheckCircle;
      case "warning":
        return AlertTriangle;
      case "error":
        return AlertTriangle;
      case "mission":
        return Target;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
      case "achievement":
        return "text-green-400 bg-green-500/20";
      case "warning":
        return "text-amber-400 bg-amber-500/20";
      case "error":
        return "text-red-400 bg-red-500/20";
      case "mission":
        return "text-purple-400 bg-purple-500/20";
      default:
        return "text-water-400 bg-water-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Уведомления</h3>
        <Link href="/notifications" className="text-sm text-water-400 hover:text-water-300 transition">
          Все уведомления →
        </Link>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {unreadNotifications.length > 0 ? (
          unreadNotifications.slice(0, 5).map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            const colorClass = getNotificationColor(notification.type);
            return (
              <div
                key={notification.id}
                className="flex items-start gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition"
              >
                <div className={`w-8 h-8 rounded-full ${colorClass} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white text-sm">{notification.title}</div>
                  <div className="text-xs text-water-200/60 truncate">{notification.message}</div>
                  <div className="text-xs text-water-200/40 mt-1">
                    {new Date(notification.createdAt).toLocaleString("ru-RU", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-water-200/50">
            Нет непрочитанных уведомлений
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Friend Activity Feed Widget
function FriendActivityWidget({ activities }: { activities: FriendActivity[] }) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return Award;
      case "data":
        return Droplets;
      case "project":
        return FolderOpen;
      case "mission":
        return Target;
      case "investment":
        return TrendingUp;
      default:
        return Activity;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Активность друзей</h3>
        <Link href="/feed" className="text-sm text-water-400 hover:text-water-300 transition">
          Вся лента →
        </Link>
      </div>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {activities.length > 0 ? (
          activities.slice(0, 5).map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep font-bold text-xs flex-shrink-0">
                  {activity.userAvatar ? (
                    <img src={activity.userAvatar} alt={activity.userName} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    activity.userName.charAt(0).toUpperCase()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white">
                    <span className="font-medium">{activity.userName}</span>{" "}
                    <span className="text-water-200/70">{activity.action}</span>
                    {activity.target && (
                      <span className="text-water-400 font-medium"> {activity.target}</span>
                    )}
                  </div>
                  <div className="text-xs text-water-200/40">
                    {new Date(activity.timestamp).toLocaleString("ru-RU", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <Icon className="w-4 h-4 text-water-400 flex-shrink-0" />
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-water-200/50">
            Нет активности друзей
          </div>
        )}
      </div>
    </motion.div>
  );
}

// AI Recommendations Widget
function AIRecommendationsWidget({ recommendations }: { recommendations: AIRecommendation[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Рекомендации AI</h3>
        <Zap className="w-5 h-5 text-yellow-400" />
      </div>
      <div className="space-y-3">
        {recommendations.length > 0 ? (
          recommendations.slice(0, 3).map((rec) => (
            <Link
              key={rec.id}
              href={rec.href}
              className="block bg-white/5 hover:bg-white/10 rounded-lg p-4 transition group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="font-medium text-white group-hover:text-water-400 transition">
                    {rec.title}
                  </div>
                  <div className="text-xs text-water-200/60 mt-1">{rec.description}</div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs">
                  <Star className="w-3 h-3 fill-yellow-400" />
                  {rec.matchScore}%
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8 text-water-200/50">
            Нет рекомендаций
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Live Sensor Data Widget
function SensorDataWidget({ sensors }: { sensors: SensorData[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-400 bg-green-500/20";
      case "warning":
        return "text-amber-400 bg-amber-500/20";
      case "critical":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-water-400 bg-water-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Живые данные сенсоров</h3>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-water-200/50">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Online
          </span>
          <Link href="/vod-lab" className="text-sm text-water-400 hover:text-water-300 transition">
            Все сенсоры →
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {sensors.length > 0 ? (
          sensors.slice(0, 6).map((sensor) => (
            <div
              key={sensor.id}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-water-200/70 truncate">{sensor.objectName}</div>
                <div className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(sensor.status)}`}>
                  {sensor.qualityIndex}%
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-water-200/60">
                  <span>pH</span>
                  <span className="text-white">{sensor.ph?.toFixed(1)}</span>
                </div>
                <div className="flex justify-between text-water-200/60">
                  <span>Temp</span>
                  <span className="text-white">{sensor.temperature?.toFixed(1)}°C</span>
                </div>
                <div className="flex justify-between text-water-200/60">
                  <span>O₂</span>
                  <span className="text-white">{sensor.dissolvedOxygen?.toFixed(1)}</span>
                </div>
              </div>
              <div className="text-xs text-water-200/40 mt-2">
                {new Date(sensor.lastUpdate).toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-water-200/50">
            Нет данных сенсоров
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Portfolio Chart Widget
function PortfolioChartWidget({ history }: { history: PortfolioHistory[] }) {
  const maxValue = Math.max(...history.map((h) => h.value));
  const minValue = Math.min(...history.map((h) => h.value));
  const range = maxValue - minValue || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Динамика портфеля</h3>
        <div className="flex items-center gap-2">
          <select className="bg-white/10 text-white text-sm px-3 py-1 rounded-lg border border-white/10 focus:outline-none focus:border-water-400">
            <option>7D</option>
            <option>30D</option>
            <option>90D</option>
            <option>1Y</option>
          </select>
        </div>
      </div>
      <div className="h-48 flex items-end gap-1">
        {history.map((point, index) => {
          const height = ((point.value - minValue) / range) * 100;
          const isIncreasing = index > 0 && point.value >= history[index - 1].value;
          return (
            <div
              key={point.date}
              className={`flex-1 rounded-t transition-all duration-300 ${
                isIncreasing
                  ? "bg-gradient-to-t from-green-500/50 to-green-400/50"
                  : "bg-gradient-to-t from-red-500/50 to-red-400/50"
              } hover:opacity-80`}
              style={{ height: `${Math.max(10, height)}%` }}
              title={`${point.date}: $${point.value.toLocaleString()}`}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-xs text-water-200/40">
        <span>{history[0]?.date}</span>
        <span>{history[history.length - 1]?.date}</span>
      </div>
    </motion.div>
  );
}

// Quick Actions Widget
function QuickActionsWidget({ role }: { role: UserRole }) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const quickActions = [
    {
      label: "Добавить данные",
      icon: Plus,
      href: "/objects/new",
      color: "from-cyan-400 to-blue-500",
      roles: ["CITIZEN", "SCIENTIST", "OPERATOR"],
    },
    {
      label: "Инвестировать",
      icon: TrendingUp,
      href: "/projects",
      color: "from-green-400 to-emerald-500",
      roles: ["CITIZEN", "INVESTOR"],
    },
    {
      label: "Поделиться",
      icon: Share2,
      href: "/feed",
      color: "from-purple-400 to-pink-500",
      roles: ["CITIZEN", "SCIENTIST", "INVESTOR", "GOVERNMENT", "OPERATOR"],
    },
    {
      label: "Пригласить друга",
      icon: UserPlus,
      action: () => setShowInviteModal(true),
      color: "from-amber-400 to-orange-500",
      roles: ["CITIZEN", "SCIENTIST", "INVESTOR", "GOVERNMENT", "OPERATOR", "ADMIN"],
    },
    {
      label: "Экспорт отчёта",
      icon: Download,
      action: () => setShowExportModal(true),
      color: "from-blue-400 to-indigo-500",
      roles: ["SCIENTIST", "GOVERNMENT", "OPERATOR", "ADMIN"],
    },
    {
      label: "Настройки",
      icon: Settings,
      href: "/settings",
      color: "from-gray-400 to-slate-500",
      roles: ["CITIZEN", "SCIENTIST", "INVESTOR", "GOVERNMENT", "OPERATOR", "ADMIN"],
    },
  ].filter((action) => action.roles.includes(role));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Быстрые действия</h3>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => action.action?.()}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg bg-gradient-to-br ${action.color} bg-opacity-20 hover:bg-opacity-30 transition group`}
            >
              {action.href ? (
                <Link href={action.href} className="flex flex-col items-center">
                  <action.icon className="w-6 h-6 text-white group-hover:scale-110 transition" />
                  <span className="text-xs text-white/80 text-center mt-1">{action.label}</span>
                </Link>
              ) : (
                <>
                  <action.icon className="w-6 h-6 text-white group-hover:scale-110 transition" />
                  <span className="text-xs text-white/80 text-center">{action.label}</span>
                </>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Пригласить друга</h3>
              <p className="text-water-200/70 mb-4">
                Отправьте пригласительную ссылку другу и получите бонусы после его регистрации.
              </p>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  readOnly
                  value={`https://looporb.io/register?ref=${user?.handle || user?.id}`}
                  className="flex-1 bg-white/10 text-white px-4 py-2 rounded-lg border border-white/10 focus:outline-none"
                />
                <button className="btn-primary whitespace-nowrap">
                  Копировать
                </button>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 btn-secondary flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Поделиться
                </button>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 btn-outline"
                >
                  Закрыть
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowExportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Экспорт отчёта</h3>
              <p className="text-water-200/70 mb-4">Выберите формат экспорта данных:</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition">
                  <FileText className="w-8 h-8 text-water-400" />
                  <span className="text-sm text-white">PDF</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition">
                  <BarChart3 className="w-8 h-8 text-green-400" />
                  <span className="text-sm text-white">Excel</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition">
                  <Layers className="w-8 h-8 text-purple-400" />
                  <span className="text-sm text-white">CSV</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition">
                  <PieChart className="w-8 h-8 text-amber-400" />
                  <span className="text-sm text-white">JSON</span>
                </button>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="w-full btn-outline"
              >
                Отмена
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Stats Overview Widget
function StatsOverviewWidget({ stats }: { stats: DashboardData["stats"] }) {
  const statItems = [
    { label: "Всего инвестировано", value: `$${stats.totalInvested.toLocaleString()}`, icon: DollarSign, color: "text-green-400" },
    { label: "Общий ROI", value: `${stats.totalROI >= 0 ? "+" : ""}${stats.totalROI}%`, icon: TrendingUp, color: stats.totalROI >= 0 ? "text-green-400" : "text-red-400" },
    { label: "Миссий завершено", value: stats.missionsCompleted.toString(), icon: Target, color: "text-purple-400" },
    { label: "Точек данных", value: stats.dataPoints.toString(), icon: Microscope, color: "text-cyan-400" },
    { label: "Друзей", value: stats.friendsCount.toString(), icon: Users, color: "text-pink-400" },
    { label: "Алертов", value: stats.alertsCount.toString(), icon: AlertTriangle, color: "text-amber-400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 lg:grid-cols-6 gap-4"
    >
      {statItems.map((stat) => (
        <div key={stat.label} className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
            <span className="text-xs text-water-200/60">{stat.label}</span>
          </div>
          <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
        </div>
      ))}
    </motion.div>
  );
}

// ==========================================
// ROLE-SPECIFIC DASHBOARD CONTENT
// ==========================================

function CitizenDashboard({ data }: { data: DashboardData }) {
  return (
    <>
      <StatsOverviewWidget stats={data.stats} />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <TokenBalanceWidget balances={data.tokenBalances} />
          <MissionsWidget missions={data.missions} />
          <FriendActivityWidget activities={data.friendActivity} />
        </div>
        <div className="space-y-8">
          <ActiveProjectsWidget projects={data.projects} />
          <NotificationsWidget notifications={data.notifications} />
          <AIRecommendationsWidget recommendations={data.recommendations} />
        </div>
      </div>
    </>
  );
}

function ScientistDashboard({ data }: { data: DashboardData }) {
  return (
    <>
      <StatsOverviewWidget stats={data.stats} />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <SensorDataWidget sensors={data.sensorData} />
          <PortfolioChartWidget history={data.portfolioHistory} />
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">API Доступ</h3>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-water-200/70">API Key</span>
                  <button className="text-xs text-water-400 hover:text-water-300">
                    Сгенерировать новый
                  </button>
                </div>
                <code className="block bg-black/30 text-green-400 p-3 rounded text-xs font-mono break-all">
                  sk_test_*********************
                </code>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">1,234</div>
                  <div className="text-xs text-water-200/60">Запросов сегодня</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">98.5%</div>
                  <div className="text-xs text-water-200/60">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <TokenBalanceWidget balances={data.tokenBalances} />
          <NotificationsWidget notifications={data.notifications} />
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Публикации</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Link key={i} href="#" className="block bg-white/5 hover:bg-white/10 rounded-lg p-3 transition">
                  <div className="text-sm font-medium text-white">Исследование качества воды #{i}</div>
                  <div className="text-xs text-water-200/60 mt-1">Опубликовано {i} мес. назад</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InvestorDashboard({ data }: { data: DashboardData }) {
  return (
    <>
      <StatsOverviewWidget stats={data.stats} />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PortfolioChartWidget history={data.portfolioHistory} />
          <ActiveProjectsWidget projects={data.projects} />
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Голосования DAO</h3>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">Предложение #{i}: Развитие инфраструктуры</span>
                    <span className="text-xs text-water-200/50">2 дня осталось</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-water-200/70">
                      <span>За</span>
                      <span>Против</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                      <div className="h-full bg-green-500" style={{ width: "65%" }} />
                      <div className="h-full bg-red-500" style={{ width: "35%" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <TokenBalanceWidget balances={data.tokenBalances} />
          <NotificationsWidget notifications={data.notifications} />
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Дивиденды</h3>
            <div className="text-3xl font-bold text-green-400 mb-2">
              $1,234.56
            </div>
            <div className="text-sm text-water-200/60">
              Получено в этом месяце
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-water-200/60">Ожидаемые</span>
                <span className="text-white">$456.78</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function GovernmentDashboard({ data }: { data: DashboardData }) {
  return (
    <>
      <StatsOverviewWidget stats={data.stats} />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Кризис-центр</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-500/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">12</div>
                <div className="text-xs text-water-200/60">Нормальных объектов</div>
              </div>
              <div className="bg-amber-500/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-amber-400">3</div>
                <div className="text-xs text-water-200/60">Требуют внимания</div>
              </div>
              <div className="bg-red-500/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-400">1</div>
                <div className="text-xs text-water-200/60">Критических</div>
              </div>
            </div>
          </div>
          <SensorDataWidget sensors={data.sensorData} />
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">KPI Региона</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-sm text-water-200/60 mb-1">Качество воды</div>
                <div className="text-2xl font-bold text-green-400">87%</div>
                <div className="text-xs text-green-400 mt-1">+5% за месяц</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-sm text-water-200/60 mb-1">Охват мониторингом</div>
                <div className="text-2xl font-bold text-cyan-400">94%</div>
                <div className="text-xs text-cyan-400 mt-1">+12% за месяц</div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <TokenBalanceWidget balances={data.tokenBalances} />
          <NotificationsWidget notifications={data.notifications} />
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Отчёты</h3>
            <div className="space-y-3">
              {["Ежемесячный отчёт", "Экологический анализ", "Статистика региона"].map((report) => (
                <button key={report} className="w-full flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition text-left">
                  <FileText className="w-5 h-5 text-water-400" />
                  <span className="text-sm text-white">{report}</span>
                  <Download className="w-4 h-4 text-water-200/30 ml-auto" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function OperatorDashboard({ data }: { data: DashboardData }) {
  return (
    <>
      <StatsOverviewWidget stats={data.stats} />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <SensorDataWidget sensors={data.sensorData} />
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Алерты</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition">
                  <AlertTriangle className={`w-5 h-5 ${i === 1 ? "text-red-400" : i === 2 ? "text-amber-400" : "text-blue-400"}`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">Алерт #{i}: Отклонение параметров</div>
                    <div className="text-xs text-water-200/60">Объект #{i} • {i * 2} часа назад</div>
                  </div>
                  <button className="text-xs text-water-400 hover:text-water-300">
                    Принять
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">График ТОиР</h3>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <Clock className="w-5 h-5 text-water-400" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">Плановое ТО #{i}</div>
                    <div className="text-xs text-water-200/60">Завтра, 10:00</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <TokenBalanceWidget balances={data.tokenBalances} />
          <NotificationsWidget notifications={data.notifications} />
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Сенсоры</h3>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-white">{i * 10}</div>
                  <div className="text-xs text-water-200/60">Сенсоров</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AdminDashboard({ data }: { data: DashboardData }) {
  return (
    <>
      <StatsOverviewWidget stats={data.stats} />
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Статистика платформы</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10,234</div>
                <div className="text-xs text-water-200/60">Пользователей</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1,567</div>
                <div className="text-xs text-water-200/60">Проектов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">$12.5M</div>
                <div className="text-xs text-water-200/60">Инвестиций</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98.9%</div>
                <div className="text-xs text-water-200/60">Uptime</div>
              </div>
            </div>
          </div>
          <PortfolioChartWidget history={data.portfolioHistory} />
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Модерация</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">Пользователь #{i}</div>
                    <div className="text-xs text-water-200/60">Жалоба на контент</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                      Одобрить
                    </button>
                    <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-xs">
                      Отклонить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <TokenBalanceWidget balances={data.tokenBalances} />
          <NotificationsWidget notifications={data.notifications} />
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Пользователи</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-water-200/60">Всего</span>
                <span className="text-white">10,234</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-water-200/60">Онлайн</span>
                <span className="text-green-400">1,234</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-water-200/60">Новых за неделю</span>
                <span className="text-cyan-400">+156</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================

// Mock user state for widget modals
let user: User | null = null;

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [wsConnected, setWsConnected] = useState(false);

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    try {
      const userRes = await fetch("/api/auth/me");
      const userData = await userRes.json();

      if (!userData.success) {
        // Redirect to login or show guest view
        return;
      }

      user = userData.data.user;

      // Fetch dashboard data (mock for now)
      const dashboardRes = await fetch("/api/dashboard");
      const dashboardData = await dashboardRes.json();

      if (dashboardData.success) {
        setData({
          ...dashboardData.data,
          user: userData.data.user,
        });
      }
    } catch (error) {
      console.error("Dashboard error:", error);
      // Use mock data for development
      setData(getMockDashboardData());
    } finally {
      setIsLoading(false);
    }
  }, []);

  // WebSocket connection for real-time updates
  useEffect(() => {
    fetchDashboardData();

    // WebSocket for live sensor data and notifications
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001");

    ws.onopen = () => {
      setWsConnected(true);
      console.log("WebSocket connected");
    };

    ws.onclose = () => {
      setWsConnected(false);
      console.log("WebSocket disconnected");
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "sensor_update" && data) {
          setData((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              sensorData: prev.sensorData.map((sensor) =>
                sensor.id === message.data.id ? { ...sensor, ...message.data } : sensor
              ),
            };
          });
        }
        if (message.type === "notification" && data) {
          setData((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              notifications: [message.data, ...prev.notifications],
            };
          });
        }
      } catch (error) {
        console.error("WebSocket message error:", error);
      }
    };

    return () => {
      ws.close();
    };
  }, [fetchDashboardData]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-water-200/70">Загрузка дашборда...</p>
          </div>
        </main>
      </>
    );
  }

  if (!data?.user) {
    // Guest view - redirect to landing or show overview
    window.location.href = "/landing";
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <p className="text-water-200/70">Перенаправление...</p>
        </main>
      </>
    );
  }

  const renderRoleDashboard = () => {
    if (!data.user) return null;
    
    switch (data.user.role) {
      case "CITIZEN":
        return <CitizenDashboard data={data} />;
      case "SCIENTIST":
        return <ScientistDashboard data={data} />;
      case "INVESTOR":
        return <InvestorDashboard data={data} />;
      case "GOVERNMENT":
        return <GovernmentDashboard data={data} />;
      case "OPERATOR":
        return <OperatorDashboard data={data} />;
      case "ADMIN":
        return <AdminDashboard data={data} />;
      default:
        return <CitizenDashboard data={data} />;
    }
  };

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
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Привет, {data.user.name.split(" ")[0]}! 👋
                </h1>
                <p className="text-water-200/70">
                  Панель управления • {getUserRoleName(data.user.role)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* WebSocket Status */}
                <div className="flex items-center gap-2 text-xs text-water-200/50">
                  <span className={`w-2 h-2 rounded-full ${wsConnected ? "bg-green-400" : "bg-red-400"}`} />
                  {wsConnected ? "Online" : "Offline"}
                </div>
                {/* Refresh Button */}
                <button
                  onClick={fetchDashboardData}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
                  title="Обновить данные"
                >
                  <RefreshCw className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* User Stats Bar */}
            <div className="glass-card p-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep font-bold">
                    {data.user.avatar ? (
                      <img src={data.user.avatar} alt={data.user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      data.user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-white">{data.user.name}</div>
                    <div className="text-xs text-water-200/50">Уровень {data.user.level}</div>
                  </div>
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-400">{data.user.xp} XP</div>
                    <div className="text-xs text-water-200/50">Опыт</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-400">{data.user.reputation}</div>
                    <div className="text-xs text-water-200/50">Репутация</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-cyan-400" />
                    <span className="text-white font-medium">{data.tokenBalances.VOD.toFixed(2)} VOD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-purple-400" />
                    <span className="text-white font-medium">{data.tokenBalances.VODeco.toFixed(2)} VODeco</span>
                  </div>
                </div>
              </div>
              {/* XP Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-water-200/70">Прогресс до уровня {data.user.level + 1}</span>
                  <span className="text-water-200/50">{data.user.xp % 100} / 100 XP</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-water-400 to-cyan-glow rounded-full transition-all duration-500"
                    style={{ width: `${data.user.xp % 100}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActionsWidget role={data.user.role} />
          </div>

          {/* Role-Specific Dashboard */}
          {renderRoleDashboard()}
        </div>
      </main>
    </>
  );
}

// ==========================================
// HELPERS
// ==========================================

function getUserRoleName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    CITIZEN: "Гражданин",
    SCIENTIST: "Учёный",
    INVESTOR: "Инвестор",
    GOVERNMENT: "Государственный служащий",
    OPERATOR: "Оператор",
    ADMIN: "Администратор",
  };
  return roleNames[role];
}

// Mock data for development
function getMockDashboardData(): DashboardData {
  return {
    user: {
      id: "1",
      name: "Иван Петров",
      email: "ivan@example.com",
      avatar: undefined,
      unityBalance: 1000,
      stakedAmount: 500,
      level: 5,
      xp: 350,
      reputation: 150,
      role: "CITIZEN",
      handle: "ivan_p",
      vodBalance: 250.5,
      vodecoBalance: 100,
      vodcreditScore: 75,
    },
    tokenBalances: {
      VOD: 250.5,
      VODeco: 100,
      VODcredit: 75,
      UNITY: 1000,
    },
    projects: [
      {
        id: "1",
        slug: "clean-water-africa",
        name: "Чистая вода для Африки",
        status: "ACTIVE",
        raisedAmount: 50000,
        targetAmount: 100000,
        myInvestment: 500,
        roi: 12.5,
      },
      {
        id: "2",
        slug: "river-monitoring",
        name: "Мониторинг рек",
        status: "FUNDING",
        raisedAmount: 25000,
        targetAmount: 50000,
        myInvestment: 250,
        roi: -5.2,
      },
    ],
    missions: [
      {
        id: "1",
        title: "Добавить 5 точек данных",
        description: "Соберите данные о качестве воды",
        type: "DAILY",
        category: "DATA_COLLECTION",
        progress: 3,
        target: 5,
        xpReward: 100,
        vodReward: 10,
        status: "ACTIVE",
        endDate: new Date(Date.now() + 86400000).toISOString(),
      },
    ],
    notifications: [
      {
        id: "1",
        type: "achievement",
        title: "Новое достижение!",
        message: "Вы получили значок «Исследователь вод»",
        read: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        type: "mission",
        title: "Миссия завершена",
        message: "Вы выполнили ежедневную миссию",
        read: false,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
    sensorData: [
      {
        id: "1",
        objectId: "1",
        objectName: "Река Москва",
        objectType: "RIVER",
        ph: 7.2,
        temperature: 18.5,
        turbidity: 5.2,
        tds: 250,
        dissolvedOxygen: 8.5,
        qualityIndex: 85,
        status: "good",
        lastUpdate: new Date().toISOString(),
      },
    ],
    friendActivity: [
      {
        id: "1",
        userId: "2",
        userName: "Анна С.",
        action: "получил достижение",
        target: "Защитник природы",
        timestamp: new Date().toISOString(),
        type: "achievement",
      },
    ],
    recommendations: [
      {
        id: "1",
        type: "project",
        title: "Очистка озера Байкал",
        description: "Соответствует вашим интересам на 95%",
        matchScore: 95,
        href: "/projects/baikal-cleanup",
      },
    ],
    portfolioHistory: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString("ru-RU", { day: "numeric", month: "short" }),
      value: 5000 + Math.random() * 2000 - 1000 + i * 50,
    })),
    stats: {
      totalInvested: 750,
      totalROI: 8.5,
      missionsCompleted: 12,
      dataPoints: 45,
      friendsCount: 23,
      alertsCount: 2,
    },
  };
}
