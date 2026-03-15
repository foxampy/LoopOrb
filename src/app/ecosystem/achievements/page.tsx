"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { 
  Award, 
  Loader2, 
  Droplets,
  Microscope,
  Users,
  TrendingUp,
  Star,
  Lock,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: 'EXPLORER' | 'SCIENTIST' | 'ACTIVIST' | 'INVESTOR' | 'INFLUENCER' | 'SPECIAL';
  icon: string;
  color: string;
  xpReward: number;
  unityReward: number;
  isUnlocked?: boolean;
  unlockedAt?: string;
}

const categoryIcons: Record<string, any> = {
  EXPLORER: Droplets,
  SCIENTIST: Microscope,
  ACTIVIST: Users,
  INVESTOR: TrendingUp,
  INFLUENCER: Star,
  SPECIAL: Award,
};

const categoryLabels: Record<string, string> = {
  EXPLORER: 'Исследователь',
  SCIENTIST: 'Учёный',
  ACTIVIST: 'Активист',
  INVESTOR: 'Инвестор',
  INFLUENCER: 'Лидер мнений',
  SPECIAL: 'Особые',
};

const categoryColors: Record<string, string> = {
  EXPLORER: 'from-blue-500 to-cyan-400',
  SCIENTIST: 'from-emerald-500 to-teal-400',
  ACTIVIST: 'from-orange-500 to-amber-400',
  INVESTOR: 'from-purple-500 to-pink-400',
  INFLUENCER: 'from-yellow-500 to-amber-400',
  SPECIAL: 'from-red-500 to-rose-400',
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await fetch('/api/achievements?user=true');
      const data = await res.json();
      if (data.success) {
        setAchievements(data.data.achievements);
      }
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAchievements = async () => {
    try {
      const res = await fetch('/api/achievements', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.data.unlocked > 0) {
        fetchAchievements();
      }
    } catch (error) {
      console.error('Failed to check achievements:', error);
    }
  };

  const filteredAchievements = activeCategory === 'all'
    ? achievements
    : achievements.filter(a => a.category === activeCategory);

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalXP = achievements
    .filter(a => a.isUnlocked)
    .reduce((acc, a) => acc + a.xpReward, 0);

  const categories = ['all', ...Array.from(new Set(achievements.map(a => a.category)))];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 mb-4"
            >
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Достижения</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Коллекция достижений</h1>
            <p className="text-slate-400 max-w-xl mx-auto">
              Зарабатывайте бейджи за активность в экосистеме. Каждое достижение приносит XP и уникальные награды.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{unlockedCount}/{achievements.length}</p>
                  <p className="text-slate-400 text-sm">Разблокировано</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{totalXP.toLocaleString()}</p>
                  <p className="text-slate-400 text-sm">XP получено</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {Math.round((unlockedCount / Math.max(achievements.length, 1)) * 100)}%
                  </p>
                  <p className="text-slate-400 text-sm">Прогресс</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Check Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={checkAchievements}
              className="px-6 py-3 bg-water-500 hover:bg-water-600 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Проверить новые достижения
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-water-500 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category === 'all' ? 'Все' : categoryLabels[category]}
              </button>
            ))}
          </div>

          {/* Achievements Grid */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-water-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map((achievement, index) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

function AchievementCard({ achievement, index }: AchievementCardProps) {
  const Icon = categoryIcons[achievement.category] || Award;
  const gradient = categoryColors[achievement.category] || 'from-slate-500 to-slate-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`relative bg-white/5 backdrop-blur-sm rounded-xl border overflow-hidden transition-all ${
        achievement.isUnlocked 
          ? 'border-white/20 hover:border-water-500/50' 
          : 'border-white/5 opacity-60'
      }`}
    >
      {/* Unlocked Badge */}
      {achievement.isUnlocked && (
        <div className="absolute top-3 right-3">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
        </div>
      )}

      <div className="p-5">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 ${
          !achievement.isUnlocked && 'grayscale'
        }`}>
          {achievement.isUnlocked ? (
            <Icon className="w-7 h-7 text-white" />
          ) : (
            <Lock className="w-6 h-6 text-white/70" />
          )}
        </div>

        {/* Content */}
        <h3 className="font-semibold text-white mb-1">{achievement.name}</h3>
        <p className="text-sm text-slate-400 mb-4">{achievement.description}</p>

        {/* Category & Rewards */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-xs text-slate-500">
            {categoryLabels[achievement.category]}
          </span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-medium">+{achievement.xpReward}</span>
            </div>
            {achievement.unityReward > 0 && (
              <div className="flex items-center gap-1 text-sm">
                <Droplets className="w-4 h-4 text-water-400" />
                <span className="text-white font-medium">+{achievement.unityReward}</span>
              </div>
            )}
          </div>
        </div>

        {/* Unlocked Date */}
        {achievement.isUnlocked && achievement.unlockedAt && (
          <p className="text-xs text-emerald-400 mt-3">
            Получено {new Date(achievement.unlockedAt).toLocaleDateString('ru-RU')}
          </p>
        )}
      </div>
    </motion.div>
  );
}
