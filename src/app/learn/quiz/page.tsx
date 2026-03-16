'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Brain, Rocket, Trophy, Star } from 'lucide-react';
import Link from 'next/link';
import QuizGame from '../components/QuizGame';
import { quizQuestions } from '../data/courses';

type Difficulty = 'easy' | 'medium' | 'hard';

const difficultyConfig = {
  easy: {
    label: 'Легкая',
    description: 'Для начинающих исследователей',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-400',
    timePerQuestion: 20,
    xpMultiplier: 1
  },
  medium: {
    label: 'Средняя',
    description: 'Для тех, кто знает основы',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-400',
    timePerQuestion: 15,
    xpMultiplier: 2
  },
  hard: {
    label: 'Сложная',
    description: 'Для настоящих экспертов',
    icon: <Rocket className="w-6 h-6" />,
    color: 'from-purple-500 to-violet-400',
    timePerQuestion: 10,
    xpMultiplier: 3
  }
};

export default function QuizPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [completedGames, setCompletedGames] = useState<Record<Difficulty, { score: number; xp: number }>>({
    easy: { score: 0, xp: 0 },
    medium: { score: 0, xp: 0 },
    hard: { score: 0, xp: 0 }
  });

  const startGame = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setGameStarted(true);
  };

  const handleComplete = (score: number, xp: number) => {
    if (selectedDifficulty) {
      setCompletedGames(prev => ({
        ...prev,
        [selectedDifficulty]: { score, xp }
      }));
    }
  };

  const handleRestart = () => {
    setGameStarted(false);
    setSelectedDifficulty(null);
  };

  // Если игра начата
  if (gameStarted && selectedDifficulty) {
    return (
      <div className="min-h-screen bg-slate-950 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => setGameStarted(false)}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад к выбору
            </button>
          </motion.div>

          {/* Quiz Game */}
          <QuizGame
            questions={quizQuestions[selectedDifficulty]}
            difficulty={selectedDifficulty}
            onComplete={handleComplete}
            onRestart={handleRestart}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link href="/learn" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Назад к порталу
          </Link>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mb-6"
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Викторина по воде
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Проверь свои знания! Отвечай на вопросы, зарабатывай XP и получай награды.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto"
        >
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center">
            <Trophy className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {Object.values(completedGames).filter(g => g.score > 0).length}
            </p>
            <p className="text-slate-400 text-sm">Пройдено</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center">
            <Star className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">
              {Object.values(completedGames).reduce((sum, g) => sum + g.xp, 0)}
            </p>
            <p className="text-slate-400 text-sm">XP заработано</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center">
            <Zap className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">10</p>
            <p className="text-slate-400 text-sm">Вопросов</p>
          </div>
        </motion.div>

        {/* Difficulty Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Object.keys(difficultyConfig) as Difficulty[]).map((difficulty, index) => {
            const config = difficultyConfig[difficulty];
            const gameResult = completedGames[difficulty];

            return (
              <motion.div
                key={difficulty}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <button
                  onClick={() => startGame(difficulty)}
                  className="w-full text-left group"
                >
                  <div className={`relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 p-6 transition-all duration-300 hover:border-slate-600 ${
                    gameResult.score > 0 ? 'ring-2 ring-green-500/30' : ''
                  }`}>
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                        {config.icon}
                      </div>

                      {/* Info */}
                      <h3 className="text-xl font-bold text-white mb-1">{config.label}</h3>
                      <p className="text-slate-400 text-sm mb-4">{config.description}</p>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-slate-500">⏱️ {config.timePerQuestion} сек/вопрос</span>
                        <span className="text-amber-400">⭐ x{config.xpMultiplier} XP</span>
                      </div>

                      {/* Completed badge */}
                      {gameResult.score > 0 && (
                        <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/30">
                          {gameResult.score}/10 ✅
                        </div>
                      )}

                      {/* Play button */}
                      <div className={`mt-4 py-2 px-4 rounded-xl font-medium text-center transition-all bg-gradient-to-r ${config.color} text-white`}>
                        {gameResult.score > 0 ? 'Играть снова' : 'Начать'}
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 bg-slate-800/30 border border-slate-700 rounded-2xl"
        >
          <h3 className="text-lg font-bold text-white mb-4">💡 Советы для успеха:</h3>
          <ul className="space-y-2 text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              Внимательно читай вопросы и все варианты ответов
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              Следи за таймером - у тебя ограниченное время!
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              После ответа читай пояснения - это поможет запомнить
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              Проходи курсы перед викториной для лучшего результата
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
