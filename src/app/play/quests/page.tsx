'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { ArrowLeft, CheckCircle2, Clock, Target, Users, BookOpen } from 'lucide-react';
import { quests, getQuestsByType } from '../data/quests';

export default function QuestsPage() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'story' | 'family'>('daily');
  const filteredQuests = getQuestsByType(activeTab);

  const tabs = [
    { id: 'daily', label: 'Ежедневные', icon: Clock },
    { id: 'weekly', label: 'Еженедельные', icon: Target },
    { id: 'story', label: 'Сюжетные', icon: BookOpen },
    { id: 'family', label: 'Семейные', icon: Users },
  ];

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
            <h1 className="text-2xl font-bold text-white">Квесты</h1>
          </div>

          {/* XP Progress Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400">Сегодня заработано</p>
                <p className="text-3xl font-bold text-white">120 XP</p>
              </div>
              <div className="text-right">
                <p className="text-slate-400">Выполнено квестов</p>
                <p className="text-3xl font-bold text-cyan-400">3/8</p>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quests List */}
          <div className="space-y-4">
            {filteredQuests.map((quest, idx) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white/5 border rounded-2xl p-6 ${
                  quest.completed ? 'border-green-500/30' : 'border-white/10'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{quest.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${quest.completed ? 'text-green-400' : 'text-white'}`}>
                        {quest.title}
                      </h3>
                      {quest.completed && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                    </div>
                    <p className="text-slate-400 mb-4">{quest.description}</p>
                    
                    {/* Progress */}
                    {!quest.completed && (
                      <div className="mb-4">
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-500 transition-all"
                            style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                          />
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                          {quest.progress} / {quest.target}
                        </p>
                      </div>
                    )}

                    {/* Rewards */}
                    <div className="flex items-center gap-4">
                      <span className="text-yellow-400 font-bold">+{quest.xpReward} XP</span>
                      {quest.badgeReward && (
                        <span className="text-sm text-purple-400">🏅 {quest.badgeReward}</span>
                      )}
                      {quest.itemReward && (
                        <span className="text-sm text-cyan-400">{quest.itemReward}</span>
                      )}
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
