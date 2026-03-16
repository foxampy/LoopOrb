"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Plus, Crown, Droplets } from "lucide-react";
import { SimpleHeader } from "../components/SimpleNav";
import { WaterMascot, SpeechBubble } from "../components/WaterMascot";

// Mock family members
const familyMembers = [
  { id: 1, name: "Бабушка Люда", role: "grandma", saved: 1250, avatar: "👵", color: "bg-pink-100" },
  { id: 2, name: "Дедушка Петя", role: "grandpa", saved: 980, avatar: "👴", color: "bg-blue-100" },
  { id: 3, name: "Мама", role: "parent", saved: 2100, avatar: "👩", color: "bg-purple-100" },
  { id: 4, name: "Папа", role: "parent", saved: 1850, avatar: "👨", color: "bg-green-100" },
  { id: 5, name: "Катя", role: "child", saved: 450, avatar: "👧", color: "bg-yellow-100" },
];

const weeklyChallenge = {
  title: "Семейный вызов",
  description: "Сэкономить 500 литров воды за неделю",
  progress: 350,
  goal: 500,
  reward: "🏆 Супер-семья",
};

export default function SimpleFamilyPage() {
  const totalSaved = familyMembers.reduce((sum, m) => sum + m.saved, 0);
  const [, setShowAddMember] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      <SimpleHeader title="Моя семья" />

      <div className="p-4">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 mb-6"
        >
          <WaterMascot size="small" emotion="happy" />
          <SpeechBubble>
            Вместе мы спасли уже {totalSaved.toLocaleString()} литров! 💪
          </SpeechBubble>
        </motion.div>

        {/* Family Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-orange-400 to-amber-500 rounded-3xl p-5 text-white shadow-lg mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <Users size={28} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-100">Наша семья</p>
                <p className="font-bold text-2xl">{familyMembers.length} человек</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-orange-100">Всего спасено</p>
              <p className="font-bold text-2xl">{totalSaved.toLocaleString()} л</p>
            </div>
          </div>

          {/* Family avatars */}
          <div className="flex -space-x-3">
            {familyMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ scale: 0, x: -20 }}
                animate={{ scale: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`w-12 h-12 rounded-full ${member.color} border-3 border-white flex items-center justify-center text-2xl`}
              >
                {member.avatar}
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowAddMember(true)}
              className="w-12 h-12 rounded-full bg-white/30 border-3 border-white flex items-center justify-center text-white"
            >
              <Plus size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Weekly Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-sm mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🎯</span>
            <div>
              <h3 className="font-bold text-slate-800">{weeklyChallenge.title}</h3>
              <p className="text-sm text-slate-500">{weeklyChallenge.description}</p>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-600">Прогресс</span>
              <span className="font-bold text-orange-600">
                {weeklyChallenge.progress} / {weeklyChallenge.goal} л
              </span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(weeklyChallenge.progress / weeklyChallenge.goal) * 100}%` }}
                className="h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Награда:</span>
            <span className="font-bold text-amber-600">{weeklyChallenge.reward}</span>
          </div>
        </motion.div>

        {/* Family Leaderboard */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Crown size={24} className="text-amber-400" />
            Наши герои
          </h2>

          <div className="space-y-3">
            {[...familyMembers]
              .sort((a, b) => b.saved - a.saved)
              .map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4"
                >
                  {/* Rank */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? "bg-yellow-100 text-yellow-600" :
                    index === 1 ? "bg-slate-100 text-slate-600" :
                    index === 2 ? "bg-orange-100 text-orange-600" :
                    "bg-slate-50 text-slate-400"
                  }`}>
                    {index + 1}
                  </div>

                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full ${member.color} flex items-center justify-center text-2xl`}>
                    {member.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800">{member.name}</h3>
                    <div className="flex items-center gap-1 text-cyan-600">
                      <Droplets size={14} />
                      <span className="text-sm font-medium">{member.saved.toLocaleString()} л</span>
                    </div>
                  </div>

                  {/* Rank icon for top 3 */}
                  {index < 3 && (
                    <div className="text-2xl">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </div>
                  )}
                </motion.div>
              ))}
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 grid grid-cols-2 gap-3"
        >
          <button className="p-4 bg-white rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">📊</div>
            <div className="font-medium text-slate-700">Статистика</div>
          </button>
          <button className="p-4 bg-white rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🎁</div>
            <div className="font-medium text-slate-700">Награды</div>
          </button>
        </motion.div>

        {/* Spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
}
