'use client';

import { motion } from 'framer-motion';
import { Lock, Play, CheckCircle, Clock, Star, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Course } from '../data/courses';

interface CourseCardProps {
  course: Course;
  userXp: number;
  progress?: number;
  completedLessons?: number;
}

export default function CourseCard({ course, userXp, progress = 0, completedLessons = 0 }: CourseCardProps) {
  const isLocked = course.locked && (course.requiredXp || 0) > userXp;
  const isCompleted = progress === 100;
  
  const levelColors = {
    beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    intermediate: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    advanced: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    expert: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
  };

  const levelNames = {
    beginner: 'Начинающий',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
    expert: 'Эксперт'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!isLocked ? { y: -8, scale: 1.02 } : {}}
      className={`relative overflow-hidden rounded-2xl border ${
        isLocked 
          ? 'border-slate-700 bg-slate-800/50' 
          : 'border-slate-700 bg-slate-800/80 hover:border-cyan-500/50'
      } transition-all duration-300`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-10`} />
      
      {/* Lock overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center z-10">
          <div className="text-center">
            <Lock className="w-12 h-12 text-slate-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Требуется {course.requiredXp} XP</p>
          </div>
        </div>
      )}

      {/* Completed badge */}
      {isCompleted && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/30 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Завершено
          </div>
        </div>
      )}

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl shadow-lg`}>
            {course.id === 'water-basics' && '💧'}
            {course.id === 'water-quality' && '🧪'}
            {course.id === 'ecology-around' && '🌿'}
            {course.id === 'advanced-analytics' && '📊'}
            {course.id === 'station-operator' && '👨‍🔬'}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${levelColors[course.level]}`}>
            {levelNames[course.level]}
          </span>
        </div>

        {/* Title and description */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{course.title}</h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">{course.description}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessonsCount} уроков</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400">+{course.xpReward} XP</span>
          </div>
        </div>

        {/* Progress bar */}
        {!isLocked && progress > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Прогресс</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className={`h-full bg-gradient-to-r ${course.color} rounded-full`}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {completedLessons} из {course.lessonsCount} уроков
            </p>
          </div>
        )}

        {/* Badge */}
        {course.badge && (
          <div className="mb-4 p-2 bg-slate-700/50 rounded-lg border border-slate-600/50">
            <p className="text-xs text-slate-400">Награда за прохождение:</p>
            <p className="text-sm font-medium text-cyan-400">{course.badge}</p>
          </div>
        )}

        {/* Action button */}
        {!isLocked && (
          <Link href={`/learn/courses/${course.id}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                isCompleted
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                  : progress > 0
                  ? 'bg-cyan-500 text-white hover:bg-cyan-600'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Пройдено
                </>
              ) : progress > 0 ? (
                <>
                  <Play className="w-4 h-4" />
                  Продолжить
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Начать курс
                </>
              )}
            </motion.button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
