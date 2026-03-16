'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  Star, 
  ArrowRight,
  Sparkles,
  RotateCcw,
  Zap
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizGameProps {
  questions: QuizQuestion[];
  difficulty: 'easy' | 'medium' | 'hard';
  onComplete: (score: number, xpEarned: number) => void;
  onRestart: () => void;
}

export default function QuizGame({ questions, difficulty, onComplete, onRestart }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<{questionId: number; correct: boolean}[]>([]);

  const difficultyConfig = {
    easy: { time: 20, xpMultiplier: 1, color: 'from-green-500 to-emerald-400', label: 'Легкий' },
    medium: { time: 15, xpMultiplier: 2, color: 'from-blue-500 to-cyan-400', label: 'Средний' },
    hard: { time: 10, xpMultiplier: 3, color: 'from-purple-500 to-violet-400', label: 'Сложный' }
  };

  const config = difficultyConfig[difficulty];

  useEffect(() => {
    setTimeLeft(config.time);
  }, [currentQuestion, config.time]);

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswer(-1); // Time's up
    }
  }, [timeLeft, isAnswered, showResults]);

  const handleAnswer = useCallback((answerIndex: number) => {
    if (isAnswered) return;
    
    setIsAnswered(true);
    setSelectedAnswer(answerIndex);
    
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, { questionId: questions[currentQuestion].id, correct: isCorrect }]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setShowResults(true);
        const xpEarned = isCorrect 
          ? (score + 1) * 10 * config.xpMultiplier 
          : score * 10 * config.xpMultiplier;
        onComplete(score + (isCorrect ? 1 : 0), xpEarned);
      }
    }, 2000);
  }, [currentQuestion, isAnswered, questions, score, answers, config.xpMultiplier, onComplete]);

  const getBadge = (percentage: number) => {
    if (percentage === 100) return { name: 'Идеалист', icon: '👑', color: 'from-yellow-400 to-amber-500' };
    if (percentage >= 80) return { name: 'Эксперт', icon: '🏆', color: 'from-cyan-400 to-blue-500' };
    if (percentage >= 60) return { name: 'Знаток', icon: '🥈', color: 'from-slate-400 to-slate-500' };
    return { name: 'Новичок', icon: '🌱', color: 'from-green-400 to-emerald-500' };
  };

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    const badge = getBadge(percentage);
    const xpEarned = score * 10 * config.xpMultiplier;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-slate-800/80 border border-slate-700 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r ${badge.color} p-8 text-center`}>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="text-6xl mb-4"
            >
              {badge.icon}
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Викторина завершена!</h2>
            <p className="text-white/80">Ты получил звание: <span className="font-bold">{badge.name}</span></p>
          </div>

          {/* Stats */}
          <div className="p-8">
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-slate-700/50 rounded-2xl">
                <p className="text-3xl font-bold text-white">{score}/{questions.length}</p>
                <p className="text-slate-400 text-sm">Правильных</p>
              </div>
              <div className="text-center p-4 bg-slate-700/50 rounded-2xl">
                <p className="text-3xl font-bold text-cyan-400">{percentage}%</p>
                <p className="text-slate-400 text-sm">Результат</p>
              </div>
              <div className="text-center p-4 bg-amber-500/20 rounded-2xl border border-amber-500/30">
                <p className="text-3xl font-bold text-amber-400">+{xpEarned}</p>
                <p className="text-amber-400/70 text-sm">XP</p>
              </div>
            </div>

            {/* Answer review */}
            <div className="space-y-3 mb-8">
              <h3 className="text-lg font-bold text-white mb-4">Разбор ответов:</h3>
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    answer.correct ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
                  }`}
                >
                  {answer.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  )}
                  <span className="text-sm text-slate-300">
                    Вопрос {index + 1}: {answer.correct ? 'Правильно' : 'Неправильно'}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={onRestart}
                className="flex-1 py-3 px-6 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Ещё раз
              </button>
              <button
                onClick={() => window.location.href = '/learn'}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-medium hover:from-cyan-600 hover:to-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                В портал
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Difficulty badge */}
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${config.color} text-white text-sm font-medium mb-6`}>
        <Zap className="w-4 h-4" />
        {config.label} уровень
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Вопрос {currentQuestion + 1} из {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className={`h-full bg-gradient-to-r ${config.color} rounded-full`}
          />
        </div>
      </div>

      {/* Timer */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
          timeLeft <= 5 ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-slate-700/50 text-slate-300'
        }`}>
          <Clock className="w-5 h-5" />
          <span className="font-bold text-lg">{timeLeft}с</span>
        </div>
      </div>

      {/* Question card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 md:p-8"
      >
        <h2 className="text-xl md:text-2xl font-bold text-white mb-8 text-center">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={`w-full p-4 md:p-5 rounded-xl border-2 text-left transition-all ${
                isAnswered
                  ? index === question.correctAnswer
                    ? 'border-green-500 bg-green-500/20'
                    : selectedAnswer === index
                    ? 'border-red-500 bg-red-500/20'
                    : 'border-slate-700 bg-slate-800/50 opacity-50'
                  : 'border-slate-600 bg-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  isAnswered
                    ? index === question.correctAnswer
                      ? 'bg-green-500 text-white'
                      : selectedAnswer === index
                      ? 'bg-red-500 text-white'
                      : 'bg-slate-600 text-slate-400'
                    : 'bg-slate-600 text-white'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-white text-lg">{option}</span>
                {isAnswered && index === question.correctAnswer && (
                  <CheckCircle className="w-6 h-6 text-green-400 ml-auto" />
                )}
                {isAnswered && selectedAnswer === index && index !== question.correctAnswer && (
                  <XCircle className="w-6 h-6 text-red-400 ml-auto" />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl"
            >
              <p className="text-cyan-400">
                <span className="font-bold">💡 Пояснение:</span> {question.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Score indicator */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <Star className="w-5 h-5 text-amber-400" />
        <span className="text-slate-400">Правильных ответов: <span className="text-white font-bold">{score}</span></span>
      </div>
    </div>
  );
}
