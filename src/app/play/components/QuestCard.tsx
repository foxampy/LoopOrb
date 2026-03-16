'use client';

import { motion } from 'framer-motion';
import { Quest } from '../data/quests';
import { Check, Clock, Lock, Gift, Star, Zap } from 'lucide-react';
import { useState } from 'react';

interface QuestCardProps {
  quest: Quest;
  onComplete?: (questId: string) => void;
  compact?: boolean;
}

// Quest type configuration
const typeConfig: Record<string, { label: string; icon: string; color: string }> = {
  daily: { label: 'Ежедневный', icon: '📅', color: 'text-blue-400 bg-blue-500/10' },
  weekly: { label: 'Еженедельный', icon: '📆', color: 'text-purple-400 bg-purple-500/10' },
  story: { label: 'Сюжетный', icon: '📖', color: 'text-amber-400 bg-amber-500/10' },
  family: { label: 'Семейный', icon: '👨‍👩‍👧‍👦', color: 'text-green-400 bg-green-500/10' },
};

// Difficulty colors (based on quest type as fallback)
const difficultyColors: Record<string, string> = {
  daily: 'bg-blue-500',
  weekly: 'bg-purple-500',
  story: 'bg-amber-500',
  family: 'bg-green-500',
};

export default function QuestCard({ quest, onComplete, compact = false }: QuestCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const typeInfo = typeConfig[quest.type];
  const progressPercent = quest.target > 0
    ? Math.min(100, (quest.progress / quest.target) * 100)
    : 0;

  const handleComplete = () => {
    if (quest.completed || isCompleting) return;
    setIsCompleting(true);
    setTimeout(() => {
      onComplete?.(quest.id);
      setIsCompleting(false);
    }, 1000);
  };

  if (compact) {
    return (
      <motion.div
        className={`p-3 rounded-xl border ${
          quest.completed 
            ? 'bg-green-500/10 border-green-500/30' 
            : 'bg-gray-800/50 border-gray-700'
        } flex items-center gap-3`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={`w-10 h-10 rounded-lg ${difficultyColors[quest.type]} bg-opacity-20
          flex items-center justify-center text-xl`}>
          {typeInfo.icon}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white truncate text-sm">{quest.title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span className="text-xs text-gray-400">+{quest.xpReward} XP</span>
          </div>
        </div>

        {quest.completed ? (
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="w-4 h-4 text-green-400" />
          </div>
        ) : (
          <button
            onClick={handleComplete}
            disabled={progressPercent < 100}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              progressPercent >= 100
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg hover:shadow-green-500/30'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {progressPercent >= 100 ? 'Забрать' : `${quest.progress}/${quest.target}`}
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border transition-all ${
        quest.completed
          ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/20 border-green-500/30'
          : 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-700 hover:border-gray-600'
      }`}
      whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Difficulty indicator */}
      <div className={`absolute top-0 left-0 w-1 h-full ${difficultyColors[quest.type]}`} />
      
      <div className="p-5 pl-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{typeInfo.icon}</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeInfo.color} bg-gray-800`}>
              {typeInfo.label}
            </span>
            {quest.completed && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                ✓ Выполнено
              </span>
            )}
          </div>
          
          {/* Rewards */}
          <div className="flex items-center gap-2">
            {quest.badgeReward && (
              <span className="text-lg" title="Бейдж">{quest.badgeReward}</span>
            )}
            {quest.itemReward && (
              <span className="text-lg" title="Предмет">{quest.itemReward}</span>
            )}
            <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-lg">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span className="text-xs font-medium text-yellow-400">+{quest.xpReward}</span>
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="font-bold text-white text-lg mb-1">{quest.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{quest.description}</p>

        {/* Progress */}
        {quest.target && !quest.completed && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Прогресс</span>
              <span>{quest.progress} / {quest.target}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${difficultyColors[quest.type]}`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        )}

        {/* Cooldown indicator - removed as not in Quest interface */}

        {/* Action Button */}
        <motion.button
          onClick={handleComplete}
          disabled={quest.completed || progressPercent < 100 || isCompleting}
          className={`w-full py-2.5 rounded-xl font-medium transition-all ${
            quest.completed
              ? 'bg-green-500/20 text-green-400 cursor-default'
              : progressPercent >= 100
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/30'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={progressPercent >= 100 && !quest.completed ? { scale: 1.02 } : {}}
          whileTap={progressPercent >= 100 && !quest.completed ? { scale: 0.98 } : {}}
        >
          {isCompleting ? (
            <span className="flex items-center justify-center gap-2">
              <motion.div
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              Загрузка...
            </span>
          ) : quest.completed ? (
            <span className="flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              Выполнено!
            </span>
          ) : progressPercent >= 100 ? (
            <span className="flex items-center justify-center gap-2">
              <Gift className="w-4 h-4" />
              Забрать награду
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              В процессе
            </span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

// Grid component for multiple quests
interface QuestGridProps {
  quests: Quest[];
  onComplete?: (questId: string) => void;
  columns?: 1 | 2 | 3;
}

export function QuestGrid({ quests, onComplete, columns = 2 }: QuestGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {quests.map((quest, index) => (
        <motion.div
          key={quest.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <QuestCard quest={quest} onComplete={onComplete} />
        </motion.div>
      ))}
    </div>
  );
}
