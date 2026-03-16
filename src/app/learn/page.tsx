'use client';

import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Flame, 
  Droplets,
  Sparkles,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import CourseCard from './components/CourseCard';
import { courses, leaderboard, dailyFacts } from './data/courses';

// Моковые данные пользователя (в реальном приложении будут приходить с бэкенда)
const userProgress = {
  name: 'Юный исследователь',
  xp: 45,
  streak: 2,
  completedLessons: 2,
  totalLessons: 50,
  completedCourses: 0,
  badges: ['👣']
};

// Прогресс по курсам
const courseProgress: Record<string, { completed: number; total: number }> = {
  'water-basics': { completed: 2, total: 5 },
  'water-quality': { completed: 0, total: 8 },
  'ecology-around': { completed: 0, total: 10 },
  'advanced-analytics': { completed: 0, total: 12 },
  'station-operator': { completed: 0, total: 15 }
};

export default function LearnPage() {
  // Получаем случайный факт дня (в реальном приложении можно привязать к дате)
  const todayFact = dailyFacts[new Date().getDate() % dailyFacts.length];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.05)_0%,transparent_50%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Образовательный портал
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Стань{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                экспертом по воде!
              </span>
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              Изучай курсы, проходи викторины, зарабатывай XP и открывай новые знания о самом важном ресурсе планеты!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/learn/courses">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Начать обучение
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/learn/quiz">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-slate-800 text-white font-bold rounded-2xl border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Викторина
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* User Progress Section */}
      <section className="py-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-amber-400 mb-2">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-2xl font-bold">{userProgress.xp}</span>
              </div>
              <p className="text-slate-400 text-sm">XP заработано</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-orange-400 mb-2">
                <Flame className="w-5 h-5" />
                <span className="text-2xl font-bold">{userProgress.streak}</span>
              </div>
              <p className="text-slate-400 text-sm">Дней подряд</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-cyan-400 mb-2">
                <BookOpen className="w-5 h-5" />
                <span className="text-2xl font-bold">{userProgress.completedLessons}</span>
              </div>
              <p className="text-slate-400 text-sm">Уроков пройдено</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
                <Trophy className="w-5 h-5" />
                <span className="text-2xl font-bold">{userProgress.badges.length}</span>
              </div>
              <p className="text-slate-400 text-sm">Бейджей получено</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Courses Grid */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Target className="w-6 h-6 text-cyan-400" />
                  Доступные курсы
                </h2>
                <Link href="/learn/courses" className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1">
                  Все курсы
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course, index) => {
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

              {/* Quick Actions */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/learn/water-cycle">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-4 text-center cursor-pointer"
                  >
                    <Droplets className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <p className="text-white font-medium text-sm">Круговорот воды</p>
                  </motion.div>
                </Link>
                <Link href="/learn/quiz">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-4 text-center cursor-pointer"
                  >
                    <Zap className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <p className="text-white font-medium text-sm">Викторина</p>
                  </motion.div>
                </Link>
                <Link href="/learn/kids">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-2xl p-4 text-center cursor-pointer"
                  >
                    <Sparkles className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                    <p className="text-white font-medium text-sm">Для детей</p>
                  </motion.div>
                </Link>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 rounded-2xl p-4 text-center cursor-pointer"
                >
                  <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-white font-medium text-sm">Мои награды</p>
                </motion.div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Daily Fact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Факт дня о воде</h3>
                </div>
                <div className="text-center py-4">
                  <div className="text-5xl mb-4">{todayFact.icon}</div>
                  <p className="text-slate-300">{todayFact.fact}</p>
                </div>
              </motion.div>

              {/* Leaderboard */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">Таблица лидеров</h3>
                  </div>
                </div>

                <div className="space-y-3">
                  {leaderboard.slice(0, 5).map((user, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-xl ${
                        index === 0 ? 'bg-amber-500/10 border border-amber-500/30' :
                        index === 1 ? 'bg-slate-400/10 border border-slate-400/30' :
                        index === 2 ? 'bg-orange-600/10 border border-orange-600/30' :
                        'bg-slate-700/30'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'bg-amber-500 text-white' :
                        index === 1 ? 'bg-slate-400 text-white' :
                        index === 2 ? 'bg-orange-600 text-white' :
                        'bg-slate-600 text-slate-300'
                      }`}>
                        {user.rank}
                      </div>
                      <div className="text-2xl">{user.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{user.name}</p>
                        <p className="text-slate-400 text-xs">{user.courses} курсов • {user.streak} 🔥</p>
                      </div>
                      <div className="text-right">
                        <p className="text-amber-400 font-bold">{user.xp}</p>
                        <p className="text-slate-500 text-xs">XP</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="flex items-center gap-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-white text-sm">
                      42
                    </div>
                    <div className="text-2xl">😊</div>
                    <div className="flex-1">
                      <p className="text-white font-medium">Ты</p>
                      <p className="text-slate-400 text-xs">{userProgress.completedCourses} курсов</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 font-bold">{userProgress.xp}</p>
                      <p className="text-slate-500 text-xs">XP</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
