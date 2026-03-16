'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  CheckCircle, 
  XCircle, 
  ChevronLeft, 
  ChevronRight,
  Trophy,
  Clock,
  Star,
  Sparkles,
  Volume2,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { Lesson, QuizQuestion } from '../data/courses';

interface LessonPlayerProps {
  lesson: Lesson;
  courseId: string;
  courseTitle: string;
  totalLessons: number;
  currentLessonIndex: number;
  onComplete: (xp: number) => void;
  onNext: () => void;
  onPrev: () => void;
  isCompleted: boolean;
}

export default function LessonPlayer({
  lesson,
  courseId,
  courseTitle,
  totalLessons,
  currentLessonIndex,
  onComplete,
  onNext,
  onPrev,
  isCompleted
}: LessonPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lessonFinished, setLessonFinished] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  // Auto-mark lesson content as read after some time
  useEffect(() => {
    if (!isCompleted && !lessonFinished) {
      const timer = setTimeout(() => {
        setLessonFinished(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isCompleted, lessonFinished]);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const isCorrect = index === lesson.quiz?.[0]?.correctAnswer;
    if (isCorrect) {
      setEarnedXp(lesson.xp);
      setQuizCompleted(true);
    }
  };

  const handleCompleteLesson = () => {
    onComplete(lesson.xp);
    setShowQuiz(false);
  };

  const quiz = lesson.quiz?.[0];
  const isCorrect = selectedAnswer === quiz?.correctAnswer;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
          <Link href={`/learn/courses/${courseId}`} className="hover:text-cyan-400 transition-colors">
            {courseTitle}
          </Link>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="text-slate-500">Урок {currentLessonIndex + 1}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{lesson.title}</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-bold">+{lesson.xp} XP</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Clock className="w-5 h-5" />
              <span>{lesson.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentLessonIndex + 1) / totalLessons) * 100}%` }}
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
          />
        </div>
        <p className="text-sm text-slate-500 mt-2">
          Урок {currentLessonIndex + 1} из {totalLessons}
        </p>
      </div>

      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden mb-6"
      >
        {/* Video/Image placeholder */}
        <div className="relative h-64 md:h-80 bg-gradient-to-br from-cyan-900/50 to-blue-900/50 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.1)_0%,transparent_70%)]" />
          
          {!showQuiz ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="relative w-20 h-20 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center backdrop-blur-sm"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-cyan-400" />
              ) : (
                <Play className="w-8 h-8 text-cyan-400 ml-1" />
              )}
            </motion.button>
          ) : (
            <div className="text-center">
              <Sparkles className="w-16 h-16 text-amber-400 mx-auto mb-2" />
              <p className="text-white font-bold text-lg">Мини-викторина!</p>
            </div>
          )}

          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-cyan-400/10 blur-xl" />
          <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full bg-blue-400/10 blur-xl" />
        </div>

        {/* Lesson content */}
        <div className="p-6">
          {!showQuiz ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-medium">Содержание урока</span>
              </div>
              
              <p className="text-slate-300 leading-relaxed text-lg">
                {lesson.content || 'Загрузка содержимого урока...'}
              </p>

              {/* Complete button */}
              {!isCompleted && lessonFinished && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Пройти проверку знаний
                  </button>
                </motion.div>
              )}

              {isCompleted && (
                <div className="mt-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="text-green-400 font-bold">Урок пройден!</p>
                    <p className="text-green-400/70 text-sm">Ты получил +{lesson.xp} XP</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <AnimatePresence mode="wait">
              {!quizCompleted ? (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-xl font-bold text-white mb-4">{quiz?.question}</h3>
                  
                  <div className="space-y-3">
                    {quiz?.options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                        whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          selectedAnswer === index
                            ? isCorrect
                              ? 'border-green-500 bg-green-500/20'
                              : 'border-red-500 bg-red-500/20'
                            : selectedAnswer !== null && index === quiz?.correctAnswer
                            ? 'border-green-500 bg-green-500/20'
                            : 'border-slate-600 bg-slate-700/50 hover:border-cyan-500/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-sm font-bold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-white">{option}</span>
                          {selectedAnswer === index && (
                            isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                            )
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-4 rounded-xl ${
                        isCorrect ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'
                      }`}
                    >
                      <p className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                        {isCorrect ? '✅ ' : '❌ '} {quiz?.explanation}
                      </p>
                      {!isCorrect && (
                        <button
                          onClick={() => {
                            setSelectedAnswer(null);
                            setShowExplanation(false);
                          }}
                          className="mt-3 text-sm text-cyan-400 hover:text-cyan-300"
                        >
                          Попробовать снова
                        </button>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4"
                  >
                    <Trophy className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">Поздравляем!</h3>
                  <p className="text-slate-400 mb-4">Ты успешно прошел урок и получил:</p>
                  
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/20 border border-amber-500/30 rounded-full mb-6">
                    <Star className="w-6 h-6 text-amber-400" />
                    <span className="text-2xl font-bold text-amber-400">+{earnedXp} XP</span>
                  </div>

                  <button
                    onClick={handleCompleteLesson}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all"
                  >
                    Завершить урок
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={currentLessonIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700/50 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Предыдущий
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalLessons }).map((_, i) => (
            <Link
              key={i}
              href={`/learn/courses/${courseId}/lesson-${i + 1}`}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentLessonIndex
                  ? 'bg-cyan-500 w-8'
                  : i < currentLessonIndex
                  ? 'bg-green-500'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={currentLessonIndex === totalLessons - 1 || (!isCompleted && !quizCompleted)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-500/30 transition-colors"
        >
          Следующий
          <ChevronLeft className="w-5 h-5 rotate-180" />
        </button>
      </div>
    </div>
  );
}
