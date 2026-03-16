'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { ArrowLeft, Lock } from 'lucide-react';
import { achievements, getAchievementsByRarity } from '../data/quests';

const rarityColors = {
  common: 'from-slate-400 to-slate-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-amber-400 to-amber-600',
};

const rarityLabels = {
  common: 'Обычная',
  rare: 'Редкая',
  epic: 'Эпическая',
  legendary: 'Легендарная',
};

export default function AchievementsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-24 bg-gradient-to-b from-[#0a1628] via-[#0d1f35] to-[#0a1628]">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/play" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-slate-400" />
            </Link>
            <h1 className="text-2xl font-bold text-white">Достижения</h1>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {['common', 'rare', 'epic', 'legendary'].map((rarity) => {
              const count = achievements.filter(a => a.rarity === rarity && a.unlocked).length;
              const total = achievements.filter(a => a.rarity === rarity).length;
              return (
                <div key={rarity} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-slate-400 text-sm mb-1">{rarityLabels[rarity as keyof typeof rarityLabels]}</p>
                  <p className="text-2xl font-bold text-white">{count}/{total}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Achievements Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className={`relative p-6 rounded-2xl border ${
                  achievement.unlocked
                    ? `bg-gradient-to-r ${rarityColors[achievement.rarity]} bg-opacity-10 border-white/20`
                    : 'bg-white/5 border-white/10 opacity-70'
                }`}
              >
                {!achievement.unlocked && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-5 h-5 text-slate-500" />
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
                    achievement.unlocked ? 'bg-white/20' : 'bg-slate-800'
                  }`}>
                    {achievement.unlocked ? '✨' : '🔒'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{achievement.name}</h3>
                    <p className="text-slate-400 text-sm mb-3">{achievement.description}</p>
                    
                    {achievement.progress !== undefined && achievement.target && (
                      <div className="mb-3">
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-500"
                            style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {achievement.progress} / {achievement.target}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-400 font-bold text-sm">+{achievement.xp} XP</span>
                      <span className={`text-xs px-2 py-1 rounded-full bg-white/10 ${
                        achievement.rarity === 'legendary' ? 'text-amber-400' :
                        achievement.rarity === 'epic' ? 'text-purple-400' :
                        achievement.rarity === 'rare' ? 'text-blue-400' : 'text-slate-400'
                      }`}>
                        {rarityLabels[achievement.rarity]}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
