'use client';

import { motion } from 'framer-motion';
import { levels, getLevelByXP, getXPToNextLevel } from '../data/achievements';
import { Star, Zap } from 'lucide-react';

interface LevelProgressProps {
  xp: number;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function LevelProgress({ xp, showDetails = true, size = 'md' }: LevelProgressProps) {
  const currentLevel = getLevelByXP(xp);
  const nextLevelProgress = getXPToNextLevel(xp);
  const nextLevel = levels.find(l => l.level === currentLevel.level + 1);

  const sizeClasses = {
    sm: {
      container: 'h-8',
      badge: 'w-8 h-8 text-lg',
      bar: 'h-2',
      text: 'text-xs',
    },
    md: {
      container: 'h-12',
      badge: 'w-12 h-12 text-2xl',
      bar: 'h-3',
      text: 'text-sm',
    },
    lg: {
      container: 'h-16',
      badge: 'w-16 h-16 text-3xl',
      bar: 'h-4',
      text: 'text-base',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div className="w-full">
      {/* Level Badge and Info */}
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          className={`${classes.badge} rounded-xl bg-gradient-to-br ${currentLevel.color} 
            flex items-center justify-center shadow-lg shadow-${currentLevel.color.split('-')[1]}-500/30`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{currentLevel.badge}</span>
        </motion.div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">{currentLevel.name}</span>
            <span className={`${classes.text} text-gray-400`}>• Уровень {currentLevel.level}</span>
          </div>
          {showDetails && nextLevel && (
            <div className="flex items-center gap-2 mt-1">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className={`${classes.text} text-gray-300`}>
                {nextLevelProgress.current} / {nextLevelProgress.needed} XP
              </span>
            </div>
          )}
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="font-bold text-white">{xp.toLocaleString()}</span>
          </div>
          <span className={`${classes.text} text-gray-400`}>XP</span>
        </div>
      </div>

      {/* Progress Bar */}
      {showDetails && (
        <div className="relative">
          <div className={`${classes.bar} w-full bg-gray-700 rounded-full overflow-hidden`}>
            <motion.div
              className={`h-full bg-gradient-to-r ${currentLevel.color} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${nextLevelProgress.percent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          
          {/* Milestone markers */}
          <div className="flex justify-between mt-2">
            {levels.slice(0, -1).map((level) => (
              <div
                key={level.level}
                className={`w-2 h-2 rounded-full ${
                  level.level <= currentLevel.level ? 'bg-green-400' : 'bg-gray-600'
                }`}
                title={level.name}
              />
            ))}
          </div>
          
          {/* Next level hint */}
          {nextLevel && nextLevelProgress.percent >= 80 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-2"
            >
              <span className="text-xs text-yellow-300">
                🎉 Ещё {nextLevelProgress.needed - nextLevelProgress.current} XP до {nextLevel.name}!
              </span>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
