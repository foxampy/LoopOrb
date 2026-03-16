'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Droplets, Trophy, Target, Gift, Star, Zap, Crown } from 'lucide-react';
import { levels, quests, achievements } from './data/quests';

export default function PlayPage() {
  const [userXP, setUserXP] = useState(350);
  const currentLevel = levels.find(l => userXP >= l.minXP && userXP < (levels.find(xl => xl.level === l.level + 1)?.minXP || Infinity)) || levels[0];
  const nextLevel = levels.find(l => l.level === currentLevel.level + 1);
  const progress = nextLevel ? ((userXP - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100 : 100;

  const dailyQuests = quests.filter(q => q.type === 'daily');
  const weeklyQuests = quests.filter(q => q.type === 'weekly');
  const unlockedAchievements = achievements.filter(a => a.unlocked);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-24 bg-gradient-to-b from-[#0a1628] via-[#0d1f35] to-[#0a1628]">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero - Avatar & Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="relative inline-block">
              <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${currentLevel.color} p-1 mx-auto mb-4`}>
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-5xl">
                  {currentLevel.badge}
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold text-white">
                Уровень {currentLevel.level}
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">{currentLevel.name}</h1>
            <p className="text-slate-400">{userXP} XP</p>
            
            {/* Progress Bar */}
            {nextLevel && (
              <div className="max-w-xs mx-auto mt-4">
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className={`h-full bg-gradient-to-r ${currentLevel.color}`}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {nextLevel.minXP - userXP} XP до {nextLevel.name}
                </p>
              </div>
            )}
          </motion.div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { href: '/play/quests', icon: Target, label: 'Квесты', color: 'from-amber-500 to-orange-500', count: dailyQuests.filter(q => !q.completed).length },
              { href: '/play/achievements', icon: Trophy, label: 'Награды', color: 'from-violet-500 to-purple-500', count: unlockedAchievements.length },
              { href: '/play/world', icon: Droplets, label: 'Мир', color: 'from-cyan-500 to-blue-500' },
              { href: '/play/leaderboard', icon: Crown, label: 'Топ', color: 'from-pink-500 to-rose-500' },
            ].map((action, idx) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  href={action.href}
                  className={`block p-4 rounded-2xl bg-gradient-to-r ${action.color} bg-opacity-10 border border-white/10 hover:border-white/30 transition-all group`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <action.icon className="w-6 h-6 text-white" />
                    {action.count !== undefined && (
                      <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                        {action.count}
                      </span>
                    )}
                  </div>
                  <p className="text-white font-medium">{action.label}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Daily Check-in */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-500/30 rounded-xl flex items-center justify-center">
                  <Gift className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Ежедневный бонус!</h3>
                  <p className="text-slate-400">Забери +50 XP и случайный предмет</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl transition-colors">
                Забрать
              </button>
            </div>
          </motion.div>

          {/* Active Quests */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Активные квесты
            </h2>
            <div className="space-y-3">
              {dailyQuests.slice(0, 3).map((quest, idx) => (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{quest.icon}</span>
                      <div>
                        <h4 className="text-white font-medium">{quest.title}</h4>
                        <p className="text-slate-400 text-sm">{quest.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-yellow-400 font-bold">+{quest.xpReward} XP</span>
                      <button className="block mt-1 text-xs text-cyan-400 hover:underline">
                        Выполнить
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <Link
              href="/play/quests"
              className="block text-center text-cyan-400 mt-4 hover:underline"
            >
              Все квесты →
            </Link>
          </div>

          {/* Weekly Event */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-6 h-6 text-purple-400" />
              <h3 className="text-white font-bold text-lg">Событие недели: Водный марафон</h3>
            </div>
            <p className="text-slate-400 mb-4">
              Сделай максимум измерений this week. Топ-10 получат NFT-бейдж и 1000 VODcredit!
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-400">
                Осталось: <span className="text-white">5 дней</span>
              </div>
              <button className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white rounded-lg transition-colors">
                Участвовать
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
