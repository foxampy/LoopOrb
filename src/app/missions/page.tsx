"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target, Gift, Users, Wallet, Share2, Database, BookOpen,
  CheckCircle, Clock, Lock, ChevronRight, Gem, Star, Zap,
  ArrowRight, Copy, Twitter, MessageCircle, Plus, Loader2,
  TrendingUp, Award, Globe, Droplets
} from "lucide-react";

// Mission Types
interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'onboarding' | 'referral' | 'investment' | 'content' | 'data' | 'social';
  reward: {
    xp: number;
    tokens: number;
    badge?: string;
  };
  requirements: {
    action: string;
    target: number;
    current: number;
  };
  status: 'available' | 'in_progress' | 'completed' | 'claimed';
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit?: string;
}

const missionCategories = [
  { id: "all", label: "Все миссии", icon: Target },
  { id: "onboarding", label: "Начало", icon: Star },
  { id: "referral", label: "Приглашения", icon: Users },
  { id: "investment", label: "Инвестиции", icon: Wallet },
  { id: "content", label: "Контент", icon: Share2 },
  { id: "data", label: "Данные", icon: Database },
];

const difficultyColors = {
  easy: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
  medium: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
  hard: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
};

const defaultMissions: Mission[] = [
  // Onboarding
  {
    id: "profile-complete",
    title: "Заполни профиль",
    description: "Добавь аватар, заполни био и укажи локацию",
    type: "onboarding",
    reward: { xp: 50, tokens: 0 },
    requirements: { action: "Заполнить профиль", target: 5, current: 0 },
    status: "available",
    difficulty: "easy",
  },
  {
    id: "email-verify",
    title: "Подтверди email",
    description: "Подтверди свой email адрес для безопасности",
    type: "onboarding",
    reward: { xp: 20, tokens: 0 },
    requirements: { action: "Подтвердить", target: 1, current: 0 },
    status: "available",
    difficulty: "easy",
  },
  {
    id: "join-telegram",
    title: "Присоединись к Telegram",
    description: "Вступи в наш Telegram канал для новостей",
    type: "onboarding",
    reward: { xp: 30, tokens: 0 },
    requirements: { action: "Подписаться", target: 1, current: 0 },
    status: "available",
    difficulty: "easy",
  },
  // Referrals
  {
    id: "refer-1",
    title: "Пригласи 1 друга",
    description: "Поделись реферальной ссылкой с другом",
    type: "referral",
    reward: { xp: 100, tokens: 10 },
    requirements: { action: "Приглашено", target: 1, current: 0 },
    status: "available",
    difficulty: "easy",
  },
  {
    id: "refer-5",
    title: "Пригласи 5 друзей",
    description: "Расширяй сообщество водных активистов",
    type: "referral",
    reward: { xp: 500, tokens: 50, badge: "Амбассадор" },
    requirements: { action: "Приглашено", target: 5, current: 0 },
    status: "available",
    difficulty: "medium",
  },
  {
    id: "refer-10",
    title: "Пригласи 10 друзей",
    description: "Стань лидером сообщества",
    type: "referral",
    reward: { xp: 1000, tokens: 100, badge: "Лидер" },
    requirements: { action: "Приглашено", target: 10, current: 0 },
    status: "available",
    difficulty: "hard",
  },
  // Investment
  {
    id: "buy-100",
    title: "Купи токенов на $100",
    description: "Сделай первую покупку VOD токенов",
    type: "investment",
    reward: { xp: 200, tokens: 20 },
    requirements: { action: "Куплено", target: 100, current: 0 },
    status: "available",
    difficulty: "easy",
  },
  {
    id: "buy-500",
    title: "Купи токенов на $500",
    description: "Увеличь свой портфель VOD",
    type: "investment",
    reward: { xp: 500, tokens: 50 },
    requirements: { action: "Куплено", target: 500, current: 0 },
    status: "available",
    difficulty: "medium",
  },
  {
    id: "buy-1000",
    title: "Купи токенов на $1000",
    description: "Стань серьезным инвестором экосистемы",
    type: "investment",
    reward: { xp: 1000, tokens: 100, badge: "Инвестор" },
    requirements: { action: "Куплено", target: 1000, current: 0 },
    status: "available",
    difficulty: "hard",
  },
  {
    id: "stake-30",
    title: "Застейкай на 30 дней",
    description: "Заблокируй токены для поддержки сети",
    type: "investment",
    reward: { xp: 300, tokens: 30 },
    requirements: { action: "Дней", target: 30, current: 0 },
    status: "available",
    difficulty: "medium",
  },
  // Content
  {
    id: "write-review",
    title: "Оставь отзыв",
    description: "Расскажи о своем опыте с платформой",
    type: "content",
    reward: { xp: 50, tokens: 5 },
    requirements: { action: "Отзывы", target: 1, current: 0 },
    status: "available",
    difficulty: "easy",
  },
  {
    id: "write-article",
    title: "Напиши статью",
    description: "Поделись знаниями о водных ресурсах",
    type: "content",
    reward: { xp: 200, tokens: 20 },
    requirements: { action: "Статьи", target: 1, current: 0 },
    status: "available",
    difficulty: "medium",
  },
  {
    id: "create-video",
    title: "Создай видео",
    description: "Создай видео о VODeco на YouTube/TikTok",
    type: "content",
    reward: { xp: 500, tokens: 50 },
    requirements: { action: "Видео", target: 1, current: 0 },
    status: "available",
    difficulty: "hard",
  },
  {
    id: "share-twitter",
    title: "Поделись в Twitter",
    description: "Расскажи о VODeco в соцсетях",
    type: "content",
    reward: { xp: 30, tokens: 3 },
    requirements: { action: "Посты", target: 1, current: 0 },
    status: "available",
    difficulty: "easy",
  },
  // Data
  {
    id: "register-object",
    title: "Зарегистрируй объект",
    description: "Добавь водный объект в базу данных",
    type: "data",
    reward: { xp: 100, tokens: 10 },
    requirements: { action: "Объекты", target: 1, current: 0 },
    status: "available",
    difficulty: "easy",
  },
  {
    id: "add-5-measurements",
    title: "Добавь 5 измерений",
    description: "Загрузи данные о качестве воды",
    type: "data",
    reward: { xp: 150, tokens: 15 },
    requirements: { action: "Измерения", target: 5, current: 0 },
    status: "available",
    difficulty: "easy",
  },
  {
    id: "verify-data",
    title: "Верифицируй данные",
    description: "Подтверди данные других пользователей",
    type: "data",
    reward: { xp: 50, tokens: 5 },
    requirements: { action: "Верификации", target: 5, current: 0 },
    status: "available",
    difficulty: "easy",
  },
  {
    id: "add-research",
    title: "Добавь исследование",
    description: "Внеси вклад в библиотеку знаний",
    type: "data",
    reward: { xp: 200, tokens: 20 },
    requirements: { action: "Исследования", target: 1, current: 0 },
    status: "available",
    difficulty: "medium",
  },
];

function MissionCard({ mission, index }: { mission: Mission; index: number }) {
  const progressPercent = Math.min(100, (mission.requirements.current / mission.requirements.target) * 100);
  const diffColors = difficultyColors[mission.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card overflow-hidden hover:border-water-500/30 transition-colors"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${diffColors.bg} flex items-center justify-center`}>
              {mission.type === 'referral' && <Users className={`w-5 h-5 ${diffColors.text}`} />}
              {mission.type === 'investment' && <Wallet className={`w-5 h-5 ${diffColors.text}`} />}
              {mission.type === 'content' && <Share2 className={`w-5 h-5 ${diffColors.text}`} />}
              {mission.type === 'data' && <Database className={`w-5 h-5 ${diffColors.text}`} />}
              {mission.type === 'onboarding' && <Star className={`w-5 h-5 ${diffColors.text}`} />}
            </div>
            <div>
              <h3 className="font-semibold text-white">{mission.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${diffColors.border} ${diffColors.text}`}>
                {mission.difficulty === 'easy' ? 'Легко' : mission.difficulty === 'medium' ? 'Средне' : 'Сложно'}
              </span>
            </div>
          </div>
          {mission.status === 'completed' && (
            <CheckCircle className="w-6 h-6 text-green-400" />
          )}
          {mission.status === 'claimed' && (
            <div className="flex items-center gap-1 text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>Получено</span>
            </div>
          )}
        </div>

        <p className="text-sm text-water-200/60 mb-4">{mission.description}</p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-water-200/50">{mission.requirements.action}</span>
            <span className="text-white">
              {mission.requirements.current} / {mission.requirements.target}
            </span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-water-500 to-cyan-glow rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            />
          </div>
        </div>

        {/* Rewards */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-cyan-glow">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">+{mission.reward.xp} XP</span>
            </div>
            {mission.reward.tokens > 0 && (
              <div className="flex items-center gap-1 text-emerald-400">
                <Gem className="w-4 h-4" />
                <span className="text-sm font-medium">+{mission.reward.tokens} VOD</span>
              </div>
            )}
            {mission.reward.badge && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                {mission.reward.badge}
              </span>
            )}
          </div>

          {mission.status === 'available' && (
            <button className="btn-primary text-sm px-4 py-2">
              Начать
            </button>
          )}
          {mission.status === 'in_progress' && (
            <button className="btn-secondary text-sm px-4 py-2">
              Продолжить
            </button>
          )}
          {mission.status === 'completed' && (
            <button className="bg-green-500 hover:bg-green-400 text-slate-900 font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
              Получить награду
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Referral Section
function ReferralSection() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://vodeco.io/ref/USER_ID"; // TODO: Replace with real user ID

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Приглашай друзей и зарабатывай</h3>
          <p className="text-water-200/60 text-sm">
            Получай 10 VOD за каждого приглашенного друга + 10% от их наград
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 lg:flex-none relative">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="w-full lg:w-64 bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-sm text-white"
            />
          </div>
          <button
            onClick={handleCopy}
            className="btn-secondary flex items-center gap-2"
          >
            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Скопировано" : "Копировать"}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
        {[
          { label: "Приглашено", value: "0", icon: Users },
          { label: "Активных", value: "0", icon: Zap },
          { label: "Заработано", value: "0 VOD", icon: Gem },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <stat.icon className="w-5 h-5 text-cyan-glow mx-auto mb-1" />
            <div className="text-xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-water-200/50">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Retrodrop Section
function RetrodropSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-8 border-gradient-to-r from-purple-500/30 to-pink-500/30"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
          <Gift className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-white">Ретродроп VOD</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
              Скоро
            </span>
          </div>
          <p className="text-water-200/60 text-sm mb-4">
            Выполняй миссии сейчас и получи дополнительные токены при запуске. 
            Распределение будет основано на твоей активности.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-purple-400">5%</div>
              <div className="text-xs text-water-200/50">от supply</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-pink-400">TBD</div>
              <div className="text-xs text-water-200/50">дата запуска</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-cyan-400">0 XP</div>
              <div className="text-xs text-water-200/50">твой вклад</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-water-200/60">
            <Clock className="w-4 h-4" />
            <span>Следите за обновлениями в Telegram</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MissionsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [missions, setMissions] = useState<Mission[]>(defaultMissions);
  const [isLoading, setIsLoading] = useState(false);
  const [userStats, setUserStats] = useState({
    completed: 0,
    totalXP: 0,
    totalTokens: 0,
  });

  useEffect(() => {
    // TODO: Load from API
    calculateStats();
  }, [missions]);

  const calculateStats = () => {
    const completed = missions.filter(m => m.status === 'completed' || m.status === 'claimed').length;
    const totalXP = missions
      .filter(m => m.status === 'claimed')
      .reduce((sum, m) => sum + m.reward.xp, 0);
    const totalTokens = missions
      .filter(m => m.status === 'claimed')
      .reduce((sum, m) => sum + m.reward.tokens, 0);
    
    setUserStats({ completed, totalXP, totalTokens });
  };

  const filteredMissions = missions.filter(m => 
    activeCategory === "all" || m.type === activeCategory
  );

  return (
    <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Миссии & Награды</h1>
          <p className="text-water-200/70">
            Выполняй задания, зарабатывай XP и токены VOD
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="glass-card p-4 text-center">
            <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.completed}</div>
            <div className="text-xs text-water-200/50">Выполнено</div>
          </div>
          <div className="glass-card p-4 text-center">
            <Zap className="w-6 h-6 text-cyan-glow mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.totalXP}</div>
            <div className="text-xs text-water-200/50">XP заработано</div>
          </div>
          <div className="glass-card p-4 text-center">
            <Gem className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.totalTokens}</div>
            <div className="text-xs text-water-200/50">VOD получено</div>
          </div>
        </motion.div>

        {/* Retrodrop Banner */}
        <RetrodropSection />

        {/* Referral */}
        <ReferralSection />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-2 mb-6 overflow-x-auto"
        >
          <div className="flex gap-2 min-w-max">
            {missionCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "bg-water-500/20 text-water-400"
                    : "text-water-200/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Missions Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredMissions.map((mission, index) => (
            <MissionCard key={mission.id} mission={mission} index={index} />
          ))}
        </div>

        {filteredMissions.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-water-200/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Нет миссий</h3>
            <p className="text-water-200/50">Выберите другую категорию</p>
          </div>
        )}

        {/* Knowledge Base CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 glass-card p-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Библиотека знаний</h3>
                <p className="text-water-200/60 text-sm">
                  Добавляй исследования и получай награды за вклад в науку
                </p>
              </div>
            </div>
            <Link href="/knowledge" className="btn-secondary flex items-center gap-2">
              Перейти
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
