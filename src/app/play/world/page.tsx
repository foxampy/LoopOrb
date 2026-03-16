'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Map,
  Lock,
  Star,
  Target,
  Zap,
  ChevronRight,
  Home,
  Waves,
  Mountain,
  Fish,
  Snowflake,
  Globe,
  Info,
  X
} from 'lucide-react';

interface Zone {
  id: string;
  name: string;
  emoji: string;
  level: number;
  unlocked: boolean;
  color: string;
  position: { x: number; y: number };
  description: string;
  quests: number;
  creatures: number;
  bgGradient: string;
  features: string[];
}

const zones: Zone[] = [
  { 
    id: 'home', 
    name: 'Дом', 
    emoji: '🏠', 
    level: 1, 
    unlocked: true, 
    color: 'from-green-400 to-emerald-500',
    position: { x: 20, y: 70 },
    description: 'Начало твоего путешествия. Здесь ты изучишь основы и получишь первое задание.',
    quests: 3,
    creatures: 2,
    bgGradient: 'from-green-900/40 to-emerald-900/40',
    features: ['Обучение', 'Первые квесты', 'Базовые существа'],
  },
  { 
    id: 'river', 
    name: 'Река', 
    emoji: '🏞️', 
    level: 1, 
    unlocked: true, 
    color: 'from-blue-400 to-cyan-500',
    position: { x: 35, y: 50 },
    description: 'Бурная река с чистейшей водой. Идеальное место для первых измерений.',
    quests: 5,
    creatures: 5,
    bgGradient: 'from-blue-900/40 to-cyan-900/40',
    features: ['Измерения', 'Речные существа', 'Течение'],
  },
  { 
    id: 'lake', 
    name: 'Озеро', 
    emoji: '🏖️', 
    level: 2, 
    unlocked: true, 
    color: 'from-cyan-400 to-teal-500',
    position: { x: 50, y: 30 },
    description: 'Спокойное озеро с множеством тайн на дне. Здесь водятся редкие виды.',
    quests: 7,
    creatures: 8,
    bgGradient: 'from-cyan-900/40 to-teal-900/40',
    features: ['Глубокие воды', 'Озёрные тайны', 'Редкие виды'],
  },
  { 
    id: 'sea', 
    name: 'Море', 
    emoji: '🌊', 
    level: 3, 
    unlocked: false, 
    color: 'from-indigo-400 to-blue-500',
    position: { x: 70, y: 45 },
    description: 'Бескрайнее море с богатой фауной. Требуется уровень 3 для доступа.',
    quests: 10,
    creatures: 12,
    bgGradient: 'from-indigo-900/40 to-blue-900/40',
    features: ['Приливы', 'Морская жизнь', 'Кораллы'],
  },
  { 
    id: 'glacier', 
    name: 'Ледник', 
    emoji: '🧊', 
    level: 4, 
    unlocked: false, 
    color: 'from-cyan-300 to-blue-300',
    position: { x: 80, y: 20 },
    description: 'Древние ледники тают. Исследуй эту хрупкую экосистему.',
    quests: 8,
    creatures: 6,
    bgGradient: 'from-cyan-800/40 to-blue-800/40',
    features: ['Ледниковый период', 'Арктические виды', 'Таяние'],
  },
  { 
    id: 'ocean', 
    name: 'Океан', 
    emoji: '🐋', 
    level: 5, 
    unlocked: false, 
    color: 'from-purple-400 to-indigo-500',
    position: { x: 85, y: 65 },
    description: 'Таинственный океан. Только легенды могут достичь его глубин.',
    quests: 15,
    creatures: 20,
    bgGradient: 'from-purple-900/40 to-indigo-900/40',
    features: ['Бездна', 'Легендарные существа', 'Тайны глубин'],
  },
];

// Connection paths between zones
const connections = [
  { from: 'home', to: 'river' },
  { from: 'river', to: 'lake' },
  { from: 'lake', to: 'sea' },
  { from: 'sea', to: 'glacier' },
  { from: 'sea', to: 'ocean' },
];

export default function WorldPage() {
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [playerPosition, setPlayerPosition] = useState({ x: 20, y: 70 });
  const [isMoving, setIsMoving] = useState(false);
  const playerLevel = 3;

  const handleZoneClick = (zone: Zone) => {
    if (!zone.unlocked && zone.level > playerLevel) return;
    
    if (zone.unlocked) {
      setIsMoving(true);
      setPlayerPosition(zone.position);
      setTimeout(() => {
        setIsMoving(false);
        setSelectedZone(zone);
      }, 500);
    } else {
      setSelectedZone(zone);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link 
                href="/play"
                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center
                  hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </Link>
              <div>
                <h1 className="font-bold text-white">Игровой мир</h1>
                <p className="text-xs text-gray-400">Исследуй зоны и открывай новые территории</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-gray-800 px-3 py-1.5 rounded-lg">
                <Map className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white">
                  {zones.filter(z => z.unlocked).length}/{zones.length} зон
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 py-6">
        {/* World Map Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative aspect-[16/9] bg-gradient-to-br from-gray-800/50 to-gray-900/50 
            rounded-3xl border border-gray-700 overflow-hidden"
        >
          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 20% 70%, rgba(34, 197, 94, 0.3) 0%, transparent 30%),
                radial-gradient(circle at 35% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 25%),
                radial-gradient(circle at 50% 30%, rgba(6, 182, 212, 0.3) 0%, transparent 35%),
                radial-gradient(circle at 70% 45%, rgba(99, 102, 241, 0.3) 0%, transparent 30%),
                radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.2) 0%, transparent 25%),
                radial-gradient(circle at 85% 65%, rgba(139, 92, 246, 0.3) 0%, transparent 35%)
              `,
            }} />
          </div>

          {/* Grid Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-5">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Connection Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections.map((conn, index) => {
              const fromZone = zones.find(z => z.id === conn.from);
              const toZone = zones.find(z => z.id === conn.to);
              if (!fromZone || !toZone) return null;
              
              return (
                <motion.line
                  key={index}
                  x1={`${fromZone.position.x}%`}
                  y1={`${fromZone.position.y}%`}
                  x2={`${toZone.position.x}%`}
                  y2={`${toZone.position.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              );
            })}
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>

          {/* Zones */}
          {zones.map((zone, index) => (
            <motion.button
              key={zone.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${zone.position.x}%`, top: `${zone.position.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleZoneClick(zone)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`relative ${zone.unlocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                {/* Zone Circle */}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${zone.color} 
                  flex items-center justify-center shadow-lg ${
                    zone.unlocked ? 'shadow-blue-500/30' : 'shadow-gray-500/10 grayscale'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl">{zone.emoji}</span>
                </div>
                
                {/* Level Badge */}
                {!zone.unlocked && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gray-800 
                    border-2 border-gray-600 flex items-center justify-center">
                    <Lock className="w-3 h-3 text-gray-400" />
                  </div>
                )}

                {/* Zone Label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <span className={`text-sm font-medium ${zone.unlocked ? 'text-white' : 'text-gray-500'}`}>
                    {zone.name}
                  </span>
                  {!zone.unlocked && (
                    <span className="text-xs text-gray-500 block text-center">Ур. {zone.level}</span>
                  )}
                </div>

                {/* Pulse effect for unlocked zones */}
                {zone.unlocked && (
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${zone.color} opacity-30`}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.button>
          ))}

          {/* Player Avatar */}
          <motion.div
            className="absolute w-8 h-8 z-10"
            style={{ 
              left: `${playerPosition.x}%`, 
              top: `${playerPosition.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{ 
              x: 0, 
              y: [0, -5, 0],
            }}
            transition={{ 
              y: { duration: 0.5, repeat: Infinity },
              left: { duration: 0.5 },
              top: { duration: 0.5 },
            }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 
              flex items-center justify-center border-2 border-white shadow-lg">
              <span className="text-sm">👤</span>
            </div>
            {isMoving && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-yellow-400"
                animate={{ scale: [1, 2], opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </motion.div>
        </motion.div>

        {/* Zone Details Modal */}
        <AnimatePresence>
          {selectedZone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={() => setSelectedZone(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`bg-gradient-to-br ${selectedZone.bgGradient} rounded-3xl p-6 max-w-md w-full 
                  border border-gray-700`}
                onClick={e => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedZone.color} 
                      flex items-center justify-center`}>
                      <span className="text-3xl">{selectedZone.emoji}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{selectedZone.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">Уровень {selectedZone.level}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedZone(null)}
                    className="w-8 h-8 rounded-lg bg-gray-800/50 flex items-center justify-center
                      hover:bg-gray-700/50 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4">{selectedZone.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gray-800/50">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <Target className="w-4 h-4" />
                      Квесты
                    </div>
                    <span className="text-xl font-bold text-white">{selectedZone.quests}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-800/50">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <Fish className="w-4 h-4" />
                      Существа
                    </div>
                    <span className="text-xl font-bold text-white">{selectedZone.creatures}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Особенности</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedZone.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-gray-800/50 text-sm text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                {selectedZone.unlocked ? (
                  <Link
                    href={`/play/world/${selectedZone.id}`}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 
                      text-white font-medium flex items-center justify-center gap-2
                      hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                  >
                    <span>Перейти в зону</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="p-4 rounded-xl bg-gray-800/50 text-center">
                    <Lock className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">
                      Доступно с уровня {selectedZone.level}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Текущий уровень: {playerLevel}
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid sm:grid-cols-3 gap-4"
        >
          <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-sm font-medium text-white">Открытая зона</span>
            </div>
            <p className="text-xs text-gray-400">Нажми, чтобы перейти и начать исследование</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <span className="text-sm font-medium text-white">Заблокирована</span>
            </div>
            <p className="text-xs text-gray-400">Повысь уровень, чтобы открыть новые территории</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="text-sm font-medium text-white">Твой персонаж</span>
            </div>
            <p className="text-xs text-gray-400">Нажми на зону, чтобы переместить персонажа</p>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
