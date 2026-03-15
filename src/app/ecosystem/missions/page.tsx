"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { 
  Target, 
  Calendar, 
  Award, 
  Loader2,
  CheckCircle2,
  Clock,
  Droplets,
  Users,
  BookOpen,
  Compass,
  Sparkles
} from "lucide-react";

interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONETIME' | 'PROJECT';
  category: 'DATA_COLLECTION' | 'VALIDATION' | 'PROJECT_PARTICIPATION' | 'SOCIAL' | 'EDUCATION' | 'EXPLORATION';
  xpReward: number;
  unityReward: number;
  requirements: any;
  userProgress?: {
    status: string;
    progress: number;
    target: number;
    startedAt: string;
    completedAt?: string;
  } | null;
}

const categoryIcons: Record<string, any> = {
  DATA_COLLECTION: Droplets,
  VALIDATION: CheckCircle2,
  PROJECT_PARTICIPATION: Target,
  SOCIAL: Users,
  EDUCATION: BookOpen,
  EXPLORATION: Compass,
};

const typeLabels: Record<string, string> = {
  DAILY: 'Ежедневное',
  WEEKLY: 'Еженедельное',
  MONTHLY: 'Ежемесячное',
  ONETIME: 'Разовое',
  PROJECT: 'Проектное',
};

const categoryLabels: Record<string, string> = {
  DATA_COLLECTION: 'Сбор данных',
  VALIDATION: 'Валидация',
  PROJECT_PARTICIPATION: 'Проекты',
  SOCIAL: 'Социальное',
  EDUCATION: 'Образование',
  EXPLORATION: 'Исследование',
};

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [claimingMission, setClaimingMission] = useState<string | null>(null);

  useEffect(() => {
    fetchMissions();
  }, []);

  const fetchMissions = async () => {
    try {
      const res = await fetch('/api/missions?progress=true');
      const data = await res.json();
      if (data.success) {
        setMissions(data.data.missions);
      }
    } catch (error) {
      console.error('Failed to fetch missions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartMission = async (missionId: string) => {
    try {
      const res = await fetch(`/api/missions?missionId=${missionId}&action=start`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        fetchMissions();
      }
    } catch (error) {
      console.error('Failed to start mission:', error);
    }
  };

  const handleClaimMission = async (missionId: string) => {
    setClaimingMission(missionId);
    try {
      const res = await fetch(`/api/missions?missionId=${missionId}&action=claim`, {
        method: 'POST',
      });
      const data = await res.json();
      if (data.success) {
        fetchMissions();
      }
    } catch (error) {
      console.error('Failed to claim mission:', error);
    } finally {
      setClaimingMission(null);
    }
  };

  const filteredMissions = activeFilter === 'all' 
    ? missions 
    : missions.filter(m => m.type === activeFilter || m.category === activeFilter);

  const filterOptions = [
    { id: 'all', label: 'Все' },
    { id: 'DAILY', label: 'Ежедневные' },
    { id: 'WEEKLY', label: 'Еженедельные' },
    { id: 'PROJECT', label: 'Проектные' },
  ];

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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-water-500/10 text-water-400 mb-4"
            >
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">Миссии и задания</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Выполняй миссии</h1>
            <p className="text-slate-400 max-w-xl mx-auto">
              Получайте XP и токены за участие в экосистеме. Чем активнее вы участвуете, тем выше ваш уровень!
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
                  <p className="text-2xl font-bold text-white">
                    {missions.filter(m => m.userProgress?.status === 'COMPLETED').length}
                  </p>
                  <p className="text-slate-400 text-sm">Выполнено</p>
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
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {missions.filter(m => m.userProgress?.status === 'ACTIVE').length}
                  </p>
                  <p className="text-slate-400 text-sm">Активно</p>
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
                    {missions.reduce((acc, m) => acc + (m.userProgress?.status === 'COMPLETED' ? m.xpReward : 0), 0).toLocaleString()}
                  </p>
                  <p className="text-slate-400 text-sm">XP заработано</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setActiveFilter(option.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === option.id
                    ? 'bg-water-500 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Missions Grid */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 text-water-500 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredMissions.map((mission, index) => (
                  <MissionCard
                    key={mission.id}
                    mission={mission}
                    index={index}
                    onStart={() => handleStartMission(mission.id)}
                    onClaim={() => handleClaimMission(mission.id)}
                    isClaiming={claimingMission === mission.id}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {!isLoading && filteredMissions.length === 0 && (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Нет доступных миссий</h3>
              <p className="text-slate-400">Загляните позже, новые миссии появятся скоро!</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

interface MissionCardProps {
  mission: Mission;
  index: number;
  onStart: () => void;
  onClaim: () => void;
  isClaiming: boolean;
}

function MissionCard({ mission, index, onStart, onClaim, isClaiming }: MissionCardProps) {
  const Icon = categoryIcons[mission.category] || Target;
  const progress = mission.userProgress?.progress || 0;
  const target = mission.userProgress?.target || (mission.requirements as any)?.count || 1;
  const isCompleted = mission.userProgress?.status === 'COMPLETED';
  const isActive = mission.userProgress?.status === 'ACTIVE';
  const canClaim = isActive && progress >= target;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-white/5 backdrop-blur-sm rounded-xl border overflow-hidden transition-all hover:border-water-500/50 ${
        isCompleted ? 'border-emerald-500/30' : 'border-white/10'
      }`}
    >
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isCompleted ? 'bg-emerald-500/10' : 'bg-water-500/10'
          }`}>
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <Icon className="w-5 h-5 text-water-400" />
            )}
          </div>
          <div className="flex gap-1">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/5 text-slate-400">
              {typeLabels[mission.type]}
            </span>
          </div>
        </div>

        <h3 className="font-semibold text-white mb-1">{mission.title}</h3>
        <p className="text-sm text-slate-400 line-clamp-2">{mission.description}</p>
      </div>

      {/* Progress */}
      {isActive && (
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400">Прогресс</span>
            <span className="text-water-400">{progress}/{target}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((progress / target) * 100, 100)}%` }}
              className="h-full bg-water-500 rounded-full"
            />
          </div>
        </div>
      )}

      {/* Rewards & Action */}
      <div className="px-4 pb-4 pt-2 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-white font-medium">+{mission.xpReward}</span>
            <span className="text-slate-500 text-xs">XP</span>
          </div>
          {mission.unityReward > 0 && (
            <div className="flex items-center gap-1 text-sm">
              <Droplets className="w-4 h-4 text-water-400" />
              <span className="text-white font-medium">+{mission.unityReward}</span>
            </div>
          )}
        </div>

        {!mission.userProgress ? (
          <button
            onClick={onStart}
            className="px-4 py-2 bg-water-500 hover:bg-water-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Начать
          </button>
        ) : canClaim ? (
          <button
            onClick={onClaim}
            disabled={isClaiming}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {isClaiming && <Loader2 className="w-4 h-4 animate-spin" />}
            Забрать
          </button>
        ) : isCompleted ? (
          <span className="px-4 py-2 text-emerald-400 text-sm font-medium flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            Выполнено
          </span>
        ) : (
          <span className="px-4 py-2 text-slate-500 text-sm">
            В процессе
          </span>
        )}
      </div>
    </motion.div>
  );
}
