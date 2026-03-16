'use client';

import { motion } from 'framer-motion';
import { Achievement, rarityConfig, categories } from '../data/achievements';
import { Lock, Check, Star, Droplets, Heart, Users, BarChart, Home, Crown, Map, BookOpen, Share2, Award, UserPlus, Trophy, Globe, Database, Shield, Anchor } from 'lucide-react';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDetails?: boolean;
  onClick?: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Droplets,
  Heart,
  Users,
  BarChart,
  Home,
  Crown,
  Map,
  BookOpen,
  Share2,
  Award,
  UserPlus,
  Trophy,
  Globe,
  Database,
  Shield,
  Anchor,
  Check,
};

export default function AchievementBadge({ 
  achievement, 
  size = 'md', 
  showDetails = false,
  onClick 
}: AchievementBadgeProps) {
  const rarity = rarityConfig[achievement.rarity];
  const category = categories[achievement.category];
  const IconComponent = iconMap[achievement.icon] || Star;

  const sizeClasses = {
    sm: {
      container: 'w-12 h-12',
      icon: 'w-5 h-5',
      emoji: 'text-lg',
    },
    md: {
      container: 'w-16 h-16',
      icon: 'w-7 h-7',
      emoji: 'text-2xl',
    },
    lg: {
      container: 'w-24 h-24',
      icon: 'w-10 h-10',
      emoji: 'text-4xl',
    },
    xl: {
      container: 'w-32 h-32',
      icon: 'w-14 h-14',
      emoji: 'text-5xl',
    },
  };

  const classes = sizeClasses[size];

  return (
    <motion.div
      className={`relative ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      whileHover={achievement.unlocked ? { scale: 1.05, rotate: 5 } : {}}
      whileTap={achievement.unlocked ? { scale: 0.95 } : {}}
    >
      {/* Badge Container */}
      <div
        className={`${classes.container} rounded-2xl flex items-center justify-center relative overflow-hidden
          ${achievement.unlocked 
            ? `bg-gradient-to-br ${rarity.bg} border-2 ${rarity.border}` 
            : 'bg-gray-800/50 border-2 border-gray-700 grayscale'
          }
          transition-all duration-300
        `}
      >
        {/* Shine effect for unlocked */}
        {achievement.unlocked && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
          />
        )}

        {/* Icon */}
        {achievement.unlocked ? (
          <IconComponent className={`${classes.icon} ${rarity.color} drop-shadow-lg`} />
        ) : (
          <Lock className={`${classes.icon} text-gray-600`} />
        )}

        {/* Progress ring for locked achievements */}
        {!achievement.unlocked && achievement.progress && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-gray-700"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-blue-500"
              strokeDasharray={`${(achievement.progress.current / achievement.progress.total) * 283} 283`}
              style={{ transition: 'stroke-dasharray 0.5s ease' }}
            />
          </svg>
        )}

        {/* Category indicator */}
        <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${category.color} 
          bg-gray-900 flex items-center justify-center text-xs`}>
          {category.icon}
        </div>
      </div>

      {/* Tooltip/Details */}
      {showDetails && (
        <div className="mt-3 text-center">
          <h4 className={`font-bold text-sm ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
            {achievement.name}
          </h4>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{achievement.description}</p>
          
          {/* Progress for locked */}
          {!achievement.unlocked && achievement.progress && (
            <div className="mt-2">
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(achievement.progress.current / achievement.progress.total) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {achievement.progress.current} / {achievement.progress.total}
              </span>
            </div>
          )}

          {/* XP reward */}
          <div className="flex items-center justify-center gap-1 mt-2">
            <Star className="w-3 h-3 text-yellow-400" />
            <span className="text-xs text-yellow-400">+{achievement.xpReward} XP</span>
          </div>

          {/* Unlocked date */}
          {achievement.unlocked && achievement.unlockedAt && (
            <p className="text-xs text-gray-500 mt-1">
              Получено {new Date(achievement.unlockedAt).toLocaleDateString('ru-RU')}
            </p>
          )}
        </div>
      )}

      {/* Unlocked animation overlay */}
      {achievement.unlocked && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 10 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl" />
        </motion.div>
      )}
    </motion.div>
  );
}

// Achievement Grid Component
interface AchievementGridProps {
  achievements: Achievement[];
  size?: 'sm' | 'md' | 'lg';
  columns?: 3 | 4 | 5 | 6;
  showDetails?: boolean;
  onAchievementClick?: (achievement: Achievement) => void;
}

export function AchievementGrid({ 
  achievements, 
  size = 'md', 
  columns = 4,
  showDetails = false,
  onAchievementClick 
}: AchievementGridProps) {
  const gridCols = {
    3: 'grid-cols-3 sm:grid-cols-3',
    4: 'grid-cols-3 sm:grid-cols-4',
    5: 'grid-cols-4 sm:grid-cols-5',
    6: 'grid-cols-4 sm:grid-cols-6',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {achievements.map((achievement, index) => (
        <motion.div
          key={achievement.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <AchievementBadge
            achievement={achievement}
            size={size}
            showDetails={showDetails}
            onClick={() => onAchievementClick?.(achievement)}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Achievement Category Filter
interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <motion.button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
          selectedCategory === null
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Все
      </motion.button>
      {Object.entries(categories).map(([key, value]) => (
        <motion.button
          key={key}
          onClick={() => onSelectCategory(key)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
            selectedCategory === key
              ? `bg-gradient-to-r from-gray-700 to-gray-600 ${value.color}`
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{value.icon}</span>
          <span className="hidden sm:inline">{value.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

// Achievement Rarity Filter
interface RarityFilterProps {
  selectedRarity: string | null;
  onSelectRarity: (rarity: string | null) => void;
}

export function RarityFilter({ selectedRarity, onSelectRarity }: RarityFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <motion.button
        onClick={() => onSelectRarity(null)}
        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          selectedRarity === null
            ? 'bg-gray-700 text-white'
            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Все редкости
      </motion.button>
      {Object.entries(rarityConfig).map(([key, value]) => (
        <motion.button
          key={key}
          onClick={() => onSelectRarity(key)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
            selectedRarity === key
              ? `${value.bg} ${value.color} ${value.border}`
              : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {value.label}
        </motion.button>
      ))}
    </div>
  );
}
