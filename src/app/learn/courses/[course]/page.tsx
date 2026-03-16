'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Star, 
  BookOpen, 
  CheckCircle, 
  Play, 
  Lock,
  Trophy,
  Award,
  Target,
  Zap,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { courses, Course, Lesson } from '../../data/courses';

interface CoursePageProps {
  params: Promise<{ course: string }>;
}

export default function CoursePage({ params }: CoursePageProps) {
  // В Next.js 15 params - это Promise
  // Для простоты используем use, но здесь покажем базовую структуру
  // В реальном приложении нужно использовать React.use(params)
  
  const [isEnrolled, setIsEnrolled] = useState(false);
  
  // Получаем courseId из URL (в реальном приложении)
  const courseId = 'water-basics'; // Заглушка для примера
  
  const course = courses.find((c: Course) => c.id === courseId);
  
  if (!course) {
    notFound();
  }

  // Моковые данные прогресса
  const completedLessons = [1]; // ID пройденных уроков
  const userXp = 45;
  const isLocked = course.locked && (course.requiredXp || 0) > userXp;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'from-green-500 to-emerald-400';
      case 'intermediate': return 'from-blue-500 to-cyan-400';
      case 'advanced': return 'from-purple-500 to-violet-400';
      case 'expert': return 'from-amber-500 to-orange-400';
      default: return 'from-slate-500 to-slate-400';
    }
  };

  const getLevelName = (level: string) => {
    switch (level) {
      case 'beginner': return 'Начинающий';
      case 'intermediate': return 'Средний';
      case 'advanced': return 'Продвинутый';
      case 'expert': return 'Эксперт';
      default: return level;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            href="/learn/courses" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Все курсы
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-slate-800/80 border border-slate-700 mb-8"
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-20`} />
          
          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Course icon */}
              <div className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-5xl md:text-6xl shadow-2xl flex-shrink-0`}>
                {course.id === 'water-basics' && '💧'}
                {course.id === 'water-quality' && '🧪'}
                {course.id === 'ecology-around' && '🌿'}
                {course.id === 'advanced-analytics' && '📊'}
                {course.id === 'station-operator' && '👨‍🔬'}
              </div>

              {/* Course info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getLevelColor(course.level)} text-white`}>
                    {getLevelName(course.level)}
                  </span>
                  {isLocked && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Требуется {course.requiredXp} XP
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{course.title}</h1>
                <p className="text-slate-400 text-lg mb-6 max-w-2xl">{course.fullDescription}</p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2 text-slate-400">
                    <BookOpen className="w-5 h-5" />
                    <span>{course.lessonsCount} уроков</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold">+{course.xpReward} XP</span>
                  </div>
                </div>

                {/* CTA Button */}
                {!isLocked && (
                  <div className="flex gap-4">
                    {completedLessons.length > 0 ? (
                      <Link href={`/learn/courses/${course.id}/lesson-${completedLessons.length + 1}`}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center gap-2"
                        >
                          <Play className="w-5 h-5" />
                          Продолжить обучение
                        </motion.button>
                      </Link>
                    ) : (
                      <Link href={`/learn/courses/${course.id}/lesson-1`}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center gap-2"
                        >
                          <Play className="w-5 h-5" />
                          Начать курс
                        </motion.button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  Содержание курса
                </h2>
              </div>

              <div className="divide-y divide-slate-700">
                {course.lessons.map((lesson: Lesson, index: number) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isCurrent = completedLessons.length === index;
                  const isLocked = index > completedLessons.length;

                  return (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {isLocked ? (
                        <div className="p-4 flex items-center gap-4 opacity-50">
                          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-slate-500" />
                          </div>
                          <div className="flex-1">
                            <p className="text-slate-400 font-medium">{lesson.title}</p>
                            <p className="text-slate-600 text-sm">{lesson.duration}</p>
                          </div>
                        </div>
                      ) : (
                        <Link href={`/learn/courses/${course.id}/lesson-${lesson.id}`}>
                          <div className={`p-4 flex items-center gap-4 hover:bg-slate-700/50 transition-colors ${
                            isCurrent ? 'bg-cyan-500/10' : ''
                          }`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isCompleted 
                                ? 'bg-green-500 text-white' 
                                : isCurrent 
                                ? 'bg-cyan-500 text-white'
                                : 'bg-slate-700 text-slate-400'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <span className="font-bold">{lesson.id}</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`font-medium ${isCompleted ? 'text-green-400' : 'text-white'}`}>
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-3 text-sm">
                                <span className="text-slate-400">{lesson.duration}</span>
                                <span className="text-amber-400">+{lesson.xp} XP</span>
                              </div>
                            </div>
                            <ChevronRight className={`w-5 h-5 ${isCurrent ? 'text-cyan-400' : 'text-slate-600'}`} />
                          </div>
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rewards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Награды</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                  <div className="text-3xl">{course.badge?.split(' ')[0]}</div>
                  <div>
                    <p className="text-white font-medium">{course.badge?.split(' ').slice(1).join(' ')}</p>
                    <p className="text-slate-400 text-sm">За прохождение курса</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl">
                  <Zap className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-white font-medium">+{course.xpReward} XP</p>
                    <p className="text-slate-400 text-sm">Общий бонус</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Course Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Твой прогресс</h3>
              </div>

              <div className="text-center py-4">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-slate-700"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - completedLessons.length / course.lessonsCount)}`}
                      className="text-cyan-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {Math.round((completedLessons.length / course.lessonsCount) * 100)}%
                    </span>
                  </div>
                </div>
                <p className="text-slate-400">
                  {completedLessons.length} из {course.lessonsCount} уроков
                </p>
              </div>
            </motion.div>

            {/* Time estimate */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Время прохождения</h3>
              </div>
              <p className="text-slate-400 text-sm mb-4">Примерное время для завершения курса:</p>
              <p className="text-2xl font-bold text-white">{course.duration}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
