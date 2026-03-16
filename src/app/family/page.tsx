'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Heart, Target, Star, Plus, Trophy, Crown, Droplets } from 'lucide-react';

const familyMembers = [
  { id: 1, name: 'Папа', role: 'father', avatar: '👨', xp: 1200, level: 4, color: 'from-blue-500 to-blue-600' },
  { id: 2, name: 'Мама', role: 'mother', avatar: '👩', xp: 980, level: 3, color: 'from-pink-500 to-pink-600' },
  { id: 3, name: 'Сын', role: 'child', avatar: '👦', xp: 650, level: 3, color: 'from-green-500 to-green-600' },
  { id: 4, name: 'Дочь', role: 'child', avatar: '👧', xp: 420, level: 2, color: 'from-purple-500 to-purple-600' },
];

const familyChallenges = [
  { id: 1, title: 'Неделя без пластика', progress: 3, target: 7, xp: 500, icon: '♻️' },
  { id: 2, title: 'Сбор дождевой воды', progress: 1, target: 1, xp: 300, icon: '🌧️' },
  { id: 3, title: 'Все делают измерения', progress: 2, target: 4, xp: 200, icon: '💧' },
];

const weeklyTasks = [
  { id: 1, title: 'Проверить качество воды в кране', assigned: 'Папа', completed: true },
  { id: 2, title: 'Прочитать раздел об экологии', assigned: 'Сын', completed: false },
  { id: 3, title: 'Сделать пост в семейный чат', assigned: 'Мама', completed: true },
  { id: 4, title: 'Пройти квиз вместе', assigned: 'Вся семья', completed: false },
];

export default function FamilyPage() {
  const totalXP = familyMembers.reduce((sum, m) => sum + m.xp, 0);
  const familyLevel = Math.floor(totalXP / 1000) + 1;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-24 bg-gradient-to-b from-[#0a1628] via-[#0d1f35] to-[#0a1628]">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/20 border border-pink-500/30 rounded-full text-pink-400 text-sm mb-4">
              <Heart className="w-4 h-4" />
              Семейный клан
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Семья Ивановых</h1>
            <p className="text-slate-400">Уровень клана: <span className="text-pink-400 font-bold">{familyLevel}</span> • {totalXP} XP общий</p>
          </motion.div>

          {/* Family Members */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {familyMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-gradient-to-r ${member.color} bg-opacity-10 border border-white/10 rounded-2xl p-4 text-center hover:border-white/30 transition-all`}
              >
                <div className="text-4xl mb-2">{member.avatar}</div>
                <h3 className="text-white font-semibold">{member.name}</h3>
                <p className="text-slate-400 text-sm">Уровень {member.level}</p>
                <p className="text-pink-400 text-xs mt-1">{member.xp} XP</p>
              </motion.div>
            ))}
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="border-2 border-dashed border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center text-slate-500 hover:border-white/40 hover:text-white transition-all"
            >
              <Plus className="w-8 h-8 mb-2" />
              <span className="text-sm">Пригласить</span>
            </motion.button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Family Challenges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pink-500/20 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-pink-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Семейные челленджи</h2>
              </div>

              <div className="space-y-4">
                {familyChallenges.map((challenge) => (
                  <div key={challenge.id} className="bg-slate-900/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{challenge.icon}</span>
                      <div className="flex-1">
                        <h4 className="text-white font-medium">{challenge.title}</h4>
                      </div>
                      <span className="text-pink-400 font-bold">+{challenge.xp}</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {challenge.progress} / {challenge.target}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Weekly Tasks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Задания на неделю</h2>
              </div>

              <div className="space-y-3">
                {weeklyTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      task.completed ? 'bg-green-500/10 border border-green-500/30' : 'bg-slate-900/50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      task.completed ? 'bg-green-500' : 'bg-slate-700'
                    }`}>
                      {task.completed && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${task.completed ? 'text-green-400 line-through' : 'text-white'}`}>
                        {task.title}
                      </p>
                      <p className="text-xs text-slate-500">{task.assigned}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Family Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: 'Измерений', value: '156', icon: Droplets },
              { label: 'Сохранено воды', value: '2,340 л', icon: Heart },
              { label: 'Завершено квестов', value: '23', icon: Trophy },
              { label: 'Место в топе', value: '#47', icon: Crown },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 text-pink-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </main>
    </>
  );
}
