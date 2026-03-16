'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Sparkles, 
  Palette, 
  Search, 
  Filter, 
  BookOpen,
  Star,
  Heart,
  CheckCircle,
  X,
  RotateCcw
} from 'lucide-react';
import Link from 'next/link';

// Игра "Найди отличия"
const differenceGame = {
  differences: [
    { id: 1, found: false, x: 20, y: 30 },
    { id: 2, found: false, x: 60, y: 50 },
    { id: 3, found: false, x: 80, y: 20 },
    { id: 4, found: false, x: 40, y: 70 },
    { id: 5, found: false, x: 10, y: 80 },
  ]
};

// Игра "Собери фильтр"
const filterStages = [
  { id: 1, name: 'Гравий', icon: '🪨', description: 'Убирает большие частицы' },
  { id: 2, name: 'Песок', icon: '🏖️', description: 'Задерживает мелкий мусор' },
  { id: 3, name: 'Уголь', icon: '⚫', description: 'Убирает запахи и вкусы' },
  { id: 4, name: 'Ткань', icon: '🧽', description: 'Финальная очистка' },
];

// Сказка "Приключения капельки"
const fairytale = [
  {
    page: 1,
    title: 'Рождение капельки',
    text: 'Жила-была маленькая капелька Капа. Она родилась в тёплом океане, когда солнышко согрело поверхность воды. Капа была такая лёгкая, что полетела вверх, в небо!',
    illustration: '🌊☀️💧'
  },
  {
    page: 2,
    title: 'Путешествие в облаках',
    text: 'В небе Капа встретила других капелек. Вместе они образовали пушистое белое облако. Они путешествовали над горами, лесами и городами, наблюдая за миром с высоты.',
    illustration: '☁️🏔️🌲'
  },
  {
    page: 3,
    title: 'Дождь и река',
    text: 'Когда облако стало тяжёлым, Капа упала на землю дождиком. Она попала в горную речку и понеслась вниз по течению, бурля и пенясь!',
    illustration: '🌧️⛰️🌊'
  },
  {
    page: 4,
    title: 'Домой в океан',
    text: 'Река несла Капу всё дальше. Она прошла через озёра и опять попала в океан. Теперь она ждёт, когда солнышко снова позовёт её в новое путешествие!',
    illustration: '🌊🏠🔄'
  }
];

// Задания для родителей и детей
const familyTasks = [
  { id: 1, task: 'Вместе посчитайте, сколько кранов в вашем доме', icon: '🚰', difficulty: 'Легко' },
  { id: 2, task: 'Нарисуйте вместе круговорот воды', icon: '🎨', difficulty: 'Весело' },
  { id: 3, task: 'Проведите опыт: заморозьте воду и посмотрите, что получится', icon: '🧊', difficulty: 'Интересно' },
  { id: 4, task: 'Вместе сходите на речку или озеро и понаблюдайте за птицами', icon: '🦆', difficulty: 'Прогулка' },
  { id: 5, task: 'Сделайте фильтр для воды из бутылки и разных материалов', icon: '🔬', difficulty: 'Опыт' },
  { id: 6, task: 'Посадите вместе цветок и наблюдайте, как он пьёт воду', icon: '🌱', difficulty: 'Долгосрочно' },
];

export default function KidsPage() {
  const [activeGame, setActiveGame] = useState<'none' | 'differences' | 'filter' | 'fairytale'>('none');
  const [differencesFound, setDifferencesFound] = useState<number[]>([]);
  const [filterBuilt, setFilterBuilt] = useState<number[]>([]);
  const [fairytalePage, setFairytalePage] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  // Игра "Найди отличия"
  const handleDifferenceClick = (id: number) => {
    if (!differencesFound.includes(id)) {
      setDifferencesFound([...differencesFound, id]);
    }
  };

  // Игра "Собери фильтр"
  const handleFilterClick = (id: number) => {
    if (filterBuilt.length === id - 1) {
      setFilterBuilt([...filterBuilt, id]);
    }
  };

  const resetFilter = () => {
    setFilterBuilt([]);
  };

  // Задания
  const toggleTask = (id: number) => {
    if (completedTasks.includes(id)) {
      setCompletedTasks(completedTasks.filter(t => t !== id));
    } else {
      setCompletedTasks([...completedTasks, id]);
    }
  };

  if (activeGame === 'differences') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-500/20 to-purple-500/20 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => setActiveGame('none')}
            className="flex items-center gap-2 text-slate-300 hover:text-white mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">🔍 Найди отличия в воде</h2>
            <p className="text-slate-300">Найди {5 - differencesFound.length} отличий между картинками!</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Image 1 */}
            <div className="aspect-square bg-slate-800 rounded-2xl relative overflow-hidden border-2 border-slate-700">
              <div className="absolute inset-0 flex items-center justify-center text-8xl">
                🌊
              </div>
              <div className="absolute bottom-4 left-4 bg-slate-900/80 px-3 py-1 rounded-full text-sm text-slate-300">
                Оригинал
              </div>
            </div>

            {/* Image 2 with clickable differences */}
            <div className="aspect-square bg-slate-800 rounded-2xl relative overflow-hidden border-2 border-slate-700">
              <div className="absolute inset-0 flex items-center justify-center text-8xl">
                🌊
              </div>
              {differenceGame.differences.map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => handleDifferenceClick(diff.id)}
                  className={`absolute w-12 h-12 rounded-full transition-all ${
                    differencesFound.includes(diff.id)
                      ? 'bg-green-500/50 border-2 border-green-400'
                      : 'hover:bg-cyan-500/30'
                  }`}
                  style={{ left: `${diff.x}%`, top: `${diff.y}%` }}
                >
                  {differencesFound.includes(diff.id) && (
                    <CheckCircle className="w-6 h-6 text-green-400 mx-auto" />
                  )}
                </button>
              ))}
              <div className="absolute bottom-4 left-4 bg-slate-900/80 px-3 py-1 rounded-full text-sm text-slate-300">
                Найди отличия!
              </div>
            </div>
          </div>

          {differencesFound.length === 5 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-6 bg-green-500/20 border border-green-500/30 rounded-2xl"
            >
              <p className="text-2xl mb-2">🎉</p>
              <h3 className="text-xl font-bold text-white">Молодец!</h3>
              <p className="text-slate-300">Ты нашёл все отличия!</p>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  if (activeGame === 'filter') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-500/20 to-orange-500/20 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => setActiveGame('none')}
            className="flex items-center gap-2 text-slate-300 hover:text-white mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">🔧 Собери фильтр</h2>
            <p className="text-slate-300">Нажимай на слои в правильном порядке!</p>
          </div>

          {/* Filter bottle visualization */}
          <div className="max-w-xs mx-auto mb-8">
            <div className="relative">
              {/* Bottle */}
              <div className="w-48 h-64 mx-auto border-4 border-slate-600 rounded-b-3xl rounded-t-lg bg-slate-800/50 relative overflow-hidden">
                {/* Water */}
                <motion.div
                  initial={{ height: '20%' }}
                  animate={{ height: `${20 + filterBuilt.length * 15}%` }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500 to-blue-400 opacity-50"
                />
                
                {/* Filter layers */}
                <div className="absolute inset-0 flex flex-col-reverse">
                  {filterBuilt.map((stageId, index) => {
                    const stage = filterStages.find(s => s.id === stageId);
                    return (
                      <motion.div
                        key={stageId}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex-1 flex items-center justify-center border-t border-slate-600/50"
                        style={{ backgroundColor: `rgba(100, 116, 139, ${0.2 + index * 0.1})` }}
                      >
                        <span className="text-3xl">{stage?.icon}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              {/* Clean water drop */}
              {filterBuilt.length === 4 && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-4xl"
                >
                  💧✨
                </motion.div>
              )}
            </div>
          </div>

          {/* Filter stages buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {filterStages.map((stage, index) => {
              const isActive = filterBuilt.length === index;
              const isDone = filterBuilt.includes(stage.id);

              return (
                <motion.button
                  key={stage.id}
                  whileHover={isActive ? { scale: 1.05 } : {}}
                  whileTap={isActive ? { scale: 0.95 } : {}}
                  onClick={() => handleFilterClick(stage.id)}
                  disabled={!isActive}
                  className={`p-4 rounded-2xl border-2 text-center transition-all ${
                    isDone
                      ? 'bg-green-500/20 border-green-500/50'
                      : isActive
                      ? 'bg-amber-500/20 border-amber-400 hover:bg-amber-500/30'
                      : 'bg-slate-800/50 border-slate-700 opacity-50'
                  }`}
                >
                  <div className="text-4xl mb-2">{stage.icon}</div>
                  <p className={`font-bold ${isDone || isActive ? 'text-white' : 'text-slate-500'}`}>
                    {stage.name}
                  </p>
                  <p className="text-xs text-slate-400">{stage.description}</p>
                </motion.button>
              );
            })}
          </div>

          {filterBuilt.length === 4 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center p-6 bg-green-500/20 border border-green-500/30 rounded-2xl"
            >
              <p className="text-2xl mb-2">🎉</p>
              <h3 className="text-xl font-bold text-white">Фильтр готов!</h3>
              <p className="text-slate-300">Теперь вода чистая и можно её пить!</p>
              <button
                onClick={resetFilter}
                className="mt-4 px-6 py-2 bg-slate-700 text-white rounded-xl flex items-center gap-2 mx-auto hover:bg-slate-600"
              >
                <RotateCcw className="w-4 h-4" />
                Собрать снова
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  if (activeGame === 'fairytale') {
    const currentPage = fairytale[fairytalePage];

    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-500/20 to-blue-500/20 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <button
            onClick={() => setActiveGame('none')}
            className="flex items-center gap-2 text-slate-300 hover:text-white mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">📚 Приключения капельки</h2>
            <p className="text-slate-300">Страница {fairytalePage + 1} из {fairytale.length}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={fairytalePage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-slate-800/80 border border-slate-700 rounded-3xl overflow-hidden"
            >
              {/* Illustration */}
              <div className="h-48 bg-gradient-to-br from-cyan-900/50 to-blue-900/50 flex items-center justify-center">
                <span className="text-8xl">{currentPage.illustration}</span>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">{currentPage.title}</h3>
                <p className="text-slate-300 text-lg leading-relaxed">{currentPage.text}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setFairytalePage(Math.max(0, fairytalePage - 1))}
              disabled={fairytalePage === 0}
              className="px-6 py-3 bg-slate-700 text-white rounded-xl disabled:opacity-50 hover:bg-slate-600 transition-colors"
            >
              ← Назад
            </button>

            <div className="flex gap-2">
              {fairytale.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setFairytalePage(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === fairytalePage ? 'bg-cyan-400 w-6' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setFairytalePage(Math.min(fairytale.length - 1, fairytalePage + 1))}
              disabled={fairytalePage === fairytale.length - 1}
              className="px-6 py-3 bg-cyan-500 text-white rounded-xl disabled:opacity-50 hover:bg-cyan-600 transition-colors"
            >
              Дальше →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main kids page
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-pink-500 to-orange-400 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link href="/learn" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
            <ArrowLeft className="w-5 h-5" />
            Назад к порталу
          </Link>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-block text-6xl mb-4"
          >
            🌈
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Водный мир для детей
          </h1>
          <p className="text-xl text-white/80">
            Игры, сказки и задания для юных исследователей воды!
          </p>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Find Differences */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveGame('differences')}
            className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-3xl p-6 text-left hover:bg-white/30 transition-all"
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">Найди отличия</h3>
            <p className="text-white/70">Найди 5 отличий между картинками с водой!</p>
          </motion.button>

          {/* Build Filter */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveGame('filter')}
            className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-3xl p-6 text-left hover:bg-white/30 transition-all"
          >
            <div className="text-5xl mb-4">🔧</div>
            <h3 className="text-xl font-bold text-white mb-2">Собери фильтр</h3>
            <p className="text-white/70">Собери фильтр слой за слоем, чтобы очистить воду!</p>
          </motion.button>

          {/* Fairytale */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveGame('fairytale')}
            className="bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-3xl p-6 text-left hover:bg-white/30 transition-all"
          >
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-white mb-2">Приключения капельки</h3>
            <p className="text-white/70">Читай сказку о путешествии маленькой капельки!</p>
          </motion.button>
        </div>

        {/* Coloring Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-8 h-8 text-white" />
            <h2 className="text-2xl font-bold text-white">Раскраска водный мир</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['🌊 Океан', '☁️ Облако', '🐠 Рыбка', '🚢 Кораблик'].map((item, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-2xl p-4 text-center hover:bg-white/20 transition-colors cursor-pointer"
              >
                <div className="text-5xl mb-2">{item.split(' ')[0]}</div>
                <p className="text-white font-medium">{item.split(' ')[1]}</p>
                <p className="text-white/60 text-sm mt-2">Скачать раскраску</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Family Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-white" />
            <h2 className="text-2xl font-bold text-white">Задания для родителей и детей</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {familyTasks.map((task) => (
              <motion.button
                key={task.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleTask(task.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-4 ${
                  completedTasks.includes(task.id)
                    ? 'bg-green-500/20 border-green-400/50'
                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                }`}
              >
                <div className="text-4xl">{task.icon}</div>
                <div className="flex-1">
                  <p className={`font-medium ${completedTasks.includes(task.id) ? 'text-green-400 line-through' : 'text-white'}`}>
                    {task.task}
                  </p>
                  <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full">
                    {task.difficulty}
                  </span>
                </div>
                {completedTasks.includes(task.id) && (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                )}
              </motion.button>
            ))}
          </div>

          {completedTasks.length === familyTasks.length && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-6 text-center p-6 bg-yellow-400/20 border border-yellow-400/30 rounded-2xl"
            >
              <p className="text-4xl mb-2">🎉🏆🎉</p>
              <h3 className="text-xl font-bold text-white">Супер!</h3>
              <p className="text-white/80">Вы выполнили все задания вместе!</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
