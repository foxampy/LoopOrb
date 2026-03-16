"use client";

import { motion } from "framer-motion";
import { Droplets, Award, Star } from "lucide-react";

interface ProgressCardProps {
  savedLiters: number;
  level: number;
  nextBadge?: string;
  className?: string;
}

export function ProgressCard({
  savedLiters,
  level,
  nextBadge = "Спаситель воды",
  className = "",
}: ProgressCardProps) {
  // Calculate progress to next level (every 100 liters = new level)
  const progressToNextLevel = (savedLiters % 100) / 100;
  const litersToNextLevel = 100 - (savedLiters % 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl p-5 text-white shadow-lg ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/20 rounded-xl">
            <Droplets size={24} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-cyan-100">Твой вклад</p>
            <p className="font-bold text-lg">{savedLiters.toLocaleString()} литров</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
          <Star size={16} className="text-yellow-300" fill="currentColor" />
          <span className="font-bold">Уровень {level}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-cyan-100">До следующего уровня</span>
          <span className="font-medium">{litersToNextLevel} л</span>
        </div>
        <div className="h-4 bg-black/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressToNextLevel * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full"
          />
        </div>
      </div>

      {/* Next badge preview */}
      <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-3">
        <div className="p-2 bg-yellow-400/30 rounded-xl">
          <Award size={28} className="text-yellow-300" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-cyan-100">Следующая награда</p>
          <p className="font-bold">{nextBadge}</p>
        </div>
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="text-2xl">🏆</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Simple badge display
interface BadgeProps {
  icon: string;
  name: string;
  description: string;
  earned?: boolean;
  earnedDate?: string;
}

export function Badge({
  icon,
  name,
  description,
  earned = false,
  earnedDate,
}: BadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: earned ? 1.05 : 1 }}
      whileTap={{ scale: 0.95 }}
      className={`relative p-4 rounded-2xl border-2 transition-all ${
        earned
          ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300"
          : "bg-slate-100 border-slate-200 opacity-60"
      }`}
    >
      <div className="text-center">
        <div className="text-4xl mb-2">{icon}</div>
        <h3 className={`font-bold ${earned ? "text-slate-800" : "text-slate-500"}`}>
          {name}
        </h3>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
        {earned && earnedDate && (
          <p className="text-xs text-green-600 mt-2 font-medium">
            ✓ Получено {earnedDate}
          </p>
        )}
        {!earned && (
          <div className="mt-2">
            <span className="inline-block px-2 py-1 bg-slate-200 text-slate-500 text-xs rounded-full">
              🔒 Заблокировано
            </span>
          </div>
        )}
      </div>
      
      {earned && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs">✓</span>
        </motion.div>
      )}
    </motion.div>
  );
}

// Achievement notification
export function AchievementNotification({
  badgeName,
  onClose,
}: {
  badgeName: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.8 }}
      className="fixed top-20 left-4 right-4 max-w-sm mx-auto bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 shadow-xl z-50"
    >
      <div className="flex items-center gap-3">
        <div className="text-4xl">🏆</div>
        <div className="flex-1">
          <p className="text-sm text-yellow-900 font-medium">Новое достижение!</p>
          <p className="text-white font-bold text-lg">{badgeName}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
        >
          <span className="text-white">✕</span>
        </button>
      </div>
    </motion.div>
  );
}
