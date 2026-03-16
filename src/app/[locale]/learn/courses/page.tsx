'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Search, Lock, Unlock, Star } from 'lucide-react';
import Link from 'next/link';
import CourseCard from '../components/CourseCard';
import { courses } from '../data/courses';

// Моковые данные пользователя
const userProgress = {
  xp: 45,
  completedCourses: [],
  inProgressCourses: ['water-basics']
};

// Прогресс по курсам
const courseProgress: Record<string, { completed: number; total: number }> = {
  'water-basics': { completed: 2, total: 5 },
  'water-quality': { completed: 0, total: 8 },
  'ecology-around': { completed: 0, total: 10 },
  'advanced-analytics': { completed: 0, total: 12 },
  'station-operator': { completed: 0, total: 15 }
};

export default function CoursesPage() {
  const availableCourses = courses.filter(c => !c.locked || (c.requiredXp || 0) <= userProgress.xp);
  const lockedCourses = courses.filter(c => c.locked && (c.requiredXp || 0) > userProgress.xp);

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/learn" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Назад к порталу
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Все курсы</h1>
              <p className="text-slate-400">Выбери курс и начни своё путешествие в мир воды!</p>
            </div>
            
            <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-4 py-2">
              <Star className="w-5 h-5 text-amber-400 fill-current" />
              <span className="text-white font-bold">{userProgress.xp}</span>
              <span className="text-slate-400 text-sm">XP</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-white">{courses.length}</p>
            <p className="text-slate-400 text-sm">Всего курсов</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-green-400">{availableCourses.length}</p>
            <p className="text-slate-400 text-sm">Доступно</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-cyan-400">{userProgress.inProgressCourses.length}</p>
            <p className="text-slate-400 text-sm">В процессе</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center">
            <p className="text-3xl font-bold text-amber-400">{userProgress.completedCourses.length}</p>
            <p className="text-slate-400 text-sm">Завершено</p>
          </div>
        </motion.div>

        {/* Available Courses */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Unlock className="w-5 h-5 text-green-400" />
            <h2 className="text-xl font-bold text-white">Доступные курсы</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course, index) => {
              const progress = courseProgress[course.id];
              const progressPercent = Math.round((progress.completed / progress.total) * 100);
              
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CourseCard
                    course={course}
                    userXp={userProgress.xp}
                    progress={progressPercent}
                    completedLessons={progress.completed}
                  />
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Locked Courses */}
        {lockedCourses.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-slate-500" />
              <h2 className="text-xl font-bold text-white">Закрытые курсы</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lockedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CourseCard
                    course={course}
                    userXp={userProgress.xp}
                    progress={0}
                    completedLessons={0}
                  />
                </motion.div>
              ))}
            </div>

            {/* How to unlock */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl"
            >
              <h3 className="text-lg font-bold text-white mb-2">Как открыть новые курсы?</h3>
              <p className="text-slate-400 mb-4">Проходи доступные курсы и зарабатывай XP, чтобы открыть продвинутые уровни!</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-slate-300">100 XP для Экологии</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-purple-400" />
                  <span className="text-slate-300">500 XP для Аналитики</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="text-slate-300">1000 XP для Оператора</span>
                </div>
              </div>
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}
