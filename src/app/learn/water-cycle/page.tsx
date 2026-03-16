'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Info, Droplets, Cloud, Snowflake, Waves, RefreshCw, Play, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface CycleStage {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  fact: string;
  color: string;
  position: { x: number; y: number };
}

const cycleStages: CycleStage[] = [
  {
    id: 'evaporation',
    name: 'Испарение',
    icon: <Droplets className="w-6 h-6" />,
    description: 'Солнце нагревает воду в океанах, реках и озёрах, и она превращается в пар, поднимаясь в атмосферу.',
    fact: 'За год с поверхности океанов испаряется около 505 000 км³ воды!',
    color: 'from-cyan-400 to-blue-500',
    position: { x: 75, y: 70 }
  },
  {
    id: 'condensation',
    name: 'Конденсация',
    icon: <Cloud className="w-6 h-6" />,
    description: 'Водяной пар поднимается вверх, охлаждается и образует крошечные капельки - это облака!',
    fact: 'Одна капля дождя собирается из миллиона микроскопических капелек в облаке!',
    color: 'from-slate-400 to-slate-500',
    position: { x: 75, y: 25 }
  },
  {
    id: 'precipitation',
    name: 'Осадки',
    icon: <Waves className="w-6 h-6" />,
    description: 'Когда капельки в облаке становятся тяжёлыми, они падают на землю в виде дождя, снега или града.',
    fact: 'Самый сильный дождь в истории выпал на Реюньоне - 1,8 метра за сутки!',
    color: 'from-blue-500 to-indigo-500',
    position: { x: 25, y: 25 }
  },
  {
    id: 'collection',
    name: 'Сбор',
    icon: <RefreshCw className="w-6 h-6" />,
    description: 'Вода собирается в реках, озёрах, подземных источниках и снова течёт к океану.',
    fact: 'Амазонка переносит в океан 20% всей пресной воды мира!',
    color: 'from-emerald-400 to-teal-500',
    position: { x: 25, y: 70 }
  }
];

export default function WaterCyclePage() {
  const [selectedStage, setSelectedStage] = useState<CycleStage | null>(null);
  const [gameMode, setGameMode] = useState(false);
  const [gameStage, setGameStage] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const startGame = () => {
    setGameMode(true);
    setGameStage(0);
    setGameCompleted(false);
  };

  const handleStageClick = (stage: CycleStage) => {
    if (gameMode) {
      const correctOrder = ['evaporation', 'condensation', 'precipitation', 'collection'];
      if (stage.id === correctOrder[gameStage]) {
        if (gameStage === 3) {
          setGameCompleted(true);
        } else {
          setGameStage(gameStage + 1);
        }
      }
    } else {
      setSelectedStage(stage);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Круговорот воды в природе
              </h1>
              <p className="text-slate-400">Исследуй, как вода путешествует по планете!</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              {gameMode ? 'Играем!' : 'Игра: Проводи капельку'}
            </motion.button>
          </div>
        </motion.div>

        {/* Game mode indicator */}
        {gameMode && !gameCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-amber-500/20 border border-amber-500/30 rounded-xl"
          >
            <p className="text-amber-400 font-bold flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              Игра: Нажимай на стадии в правильном порядке! ({gameStage + 1}/4)
            </p>
          </motion.div>
        )}

        {gameCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-6 bg-green-500/20 border border-green-500/30 rounded-xl text-center"
          >
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-white mb-2">Поздравляем!</h3>
            <p className="text-slate-400 mb-4">Ты успешно провёл капельку через весь цикл!</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setGameMode(false)}
                className="px-6 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
              >
                Завершить
              </button>
              <button
                onClick={startGame}
                className="px-6 py-2 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-600 transition-colors"
              >
                Играть снова
              </button>
            </div>
          </motion.div>
        )}

        {/* Interactive Water Cycle SVG */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-square max-w-2xl mx-auto bg-slate-800/50 border border-slate-700 rounded-3xl overflow-hidden"
          >
            {/* Background elements */}
            <div className="absolute inset-0">
              {/* Sun */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute top-8 right-8 w-16 h-16"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/30" />
              </motion.div>

              {/* Mountains */}
              <svg className="absolute bottom-0 left-0 w-1/3 h-1/3" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,100 L30,40 L60,100 Z" fill="rgba(100,116,139,0.3)" />
                <path d="M40,100 L70,30 L100,100 Z" fill="rgba(71,85,105,0.4)" />
              </svg>

              {/* Ocean */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-0 right-0 w-2/3 h-1/4 bg-gradient-to-t from-blue-600/40 to-transparent rounded-tl-full"
              />
            </div>

            {/* SVG Arrows showing cycle flow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              {/* Evaporation arrow */}
              <motion.path
                d="M75,75 Q75,50 75,30"
                stroke="url(#gradient1)"
                strokeWidth="0.5"
                strokeDasharray="2,2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Wind arrow */}
              <motion.path
                d="M75,25 Q50,25 25,25"
                stroke="url(#gradient2)"
                strokeWidth="0.5"
                strokeDasharray="2,2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              
              {/* Rain arrow */}
              <motion.path
                d="M25,25 Q25,50 25,75"
                stroke="url(#gradient3)"
                strokeWidth="0.5"
                strokeDasharray="2,2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              
              {/* River arrow */}
              <motion.path
                d="M25,75 Q50,75 75,75"
                stroke="url(#gradient4)"
                strokeWidth="0.5"
                strokeDasharray="2,2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              />

              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>
            </svg>

            {/* Interactive stage buttons */}
            {cycleStages.map((stage, index) => {
              const isActive = gameMode && index === gameStage;
              const isCompleted = gameMode && index < gameStage;

              return (
                <motion.button
                  key={stage.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStageClick(stage)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${stage.color} 
                    flex items-center justify-center text-white shadow-lg transition-all
                    ${isActive ? 'ring-4 ring-amber-400 ring-opacity-50 animate-pulse' : ''}
                    ${isCompleted ? 'ring-4 ring-green-400 ring-opacity-50' : ''}
                    ${!gameMode ? 'hover:shadow-cyan-500/50 hover:shadow-xl' : ''}
                  `}
                  style={{
                    left: `${stage.position.x}%`,
                    top: `${stage.position.y}%`
                  }}
                >
                  {isCompleted ? <CheckCircle className="w-8 h-8" /> : stage.icon}
                </motion.button>
              );
            })}

            {/* Center info */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-dashed border-slate-600/50"
              />
            </div>
          </motion.div>

          {/* Labels */}
          <div className="absolute top-0 right-0 bg-slate-800/90 border border-slate-700 rounded-xl p-4 text-center">
            <span className="text-slate-400 text-sm">Кликай на иконки!</span>
          </div>
        </div>

        {/* Stage info panel */}
        <AnimatePresence mode="wait">
          {selectedStage && !gameMode && (
            <motion.div
              key={selectedStage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <div className={`bg-gradient-to-br ${selectedStage.color} bg-opacity-10 border border-slate-700 rounded-2xl p-6 md:p-8`}>
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedStage.color} flex items-center justify-center text-white flex-shrink-0`}>
                    {selectedStage.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedStage.name}</h3>
                    <p className="text-slate-300 mb-4">{selectedStage.description}</p>
                    <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl">
                      <Info className="w-5 h-5 text-cyan-400" />
                      <p className="text-slate-400 text-sm">{selectedStage.fact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage cards */}
        {!gameMode && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {cycleStages.map((stage, index) => (
              <motion.button
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedStage(stage)}
                className={`p-4 rounded-xl border transition-all text-left ${
                  selectedStage?.id === stage.id
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stage.color} flex items-center justify-center text-white mb-3`}>
                  {stage.icon}
                </div>
                <h4 className="text-white font-bold mb-1">{stage.name}</h4>
                <p className="text-slate-400 text-xs line-clamp-2">{stage.description}</p>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
