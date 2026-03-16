"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Map, BookOpen, Gamepad2, ChevronRight } from "lucide-react";
import { WaterMascot, SpeechBubble } from "./components/WaterMascot";
import { ProgressCard } from "./components/ProgressCard";

// Animation variants
const containerVariants: Record<string, any> = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Record<string, any> = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export default function SimpleHomePage() {
  return (
    <div className="min-h-screen p-4">
      {/* Hero Section with Mascot */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 p-6 mb-6 text-white shadow-xl"
      >
        {/* Decorative bubbles */}
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10" />
        <div className="absolute bottom-8 right-12 w-8 h-8 rounded-full bg-white/10" />
        <div className="absolute top-12 left-4 w-4 h-4 rounded-full bg-cyan-300/50" />

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-2"
              >
                Привет! 👋
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-cyan-100 leading-relaxed"
              >
                Я — <span className="font-bold text-white">Капелька</span>!
                <br />
                Помогу узнать про воду и спасти планету 💧
              </motion.p>
            </div>
            <WaterMascot size="medium" emotion="waving" />
          </div>
        </div>
      </motion.section>

      {/* Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <ProgressCard savedLiters={2450} level={24} nextBadge="Водный герой" />
      </motion.div>

      {/* Quick tip from mascot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-start gap-3 mb-6"
      >
        <WaterMascot size="small" emotion="thinking" />
        <SpeechBubble className="flex-1">
          Знаешь? Если закрыть кран во время чистки зубов — сэкономишь 6 литров воды! 🦷💧
        </SpeechBubble>
      </motion.div>

      {/* Main Action Buttons */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <h2 className="text-xl font-bold text-slate-800 mb-4">Что будем делать?</h2>

        {/* Map Button */}
        <motion.div variants={itemVariants}>
          <Link href="/simple/map">
            <ActionCard
              icon={<Map size={32} className="text-white" />}
              title="🗺️ Посмотреть карту воды"
              description="Узнай, где вода чистая, а где нет"
              color="from-green-400 to-emerald-500"
              bgIcon="🌍"
            />
          </Link>
        </motion.div>

        {/* Learn Button */}
        <motion.div variants={itemVariants}>
          <Link href="/simple/learn">
            <ActionCard
              icon={<BookOpen size={32} className="text-white" />}
              title="📚 Узнать про экологию"
              description="Интересные факты и советы"
              color="from-blue-400 to-cyan-500"
              bgIcon="📖"
            />
          </Link>
        </motion.div>

        {/* Play Button */}
        <motion.div variants={itemVariants}>
          <Link href="/simple/play">
            <ActionCard
              icon={<Gamepad2 size={32} className="text-white" />}
              title="🎮 Играть и учиться"
              description="Весёлые игры про воду"
              color="from-purple-400 to-pink-500"
              bgIcon="🎲"
            />
          </Link>
        </motion.div>
      </motion.section>

      {/* Daily Challenge */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-5 border-2 border-amber-200"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🎯</span>
          <div>
            <h3 className="font-bold text-amber-900">Задание дня</h3>
            <p className="text-sm text-amber-700">Выполни и получи награду!</p>
          </div>
        </div>
        <p className="text-amber-800 text-lg mb-3">
          Принял душ меньше 5 минут? Отлично! Ты сэкономил ~50 литров! 🚿
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold rounded-xl transition-colors"
        >
          ✓ Я выполнил!
        </motion.button>
      </motion.section>

      {/* Fun Fact */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 text-center"
      >
        <div className="inline-block bg-white rounded-2xl px-6 py-4 shadow-md">
          <p className="text-sm text-slate-500 mb-1">🤔 Знаешь ли ты?</p>
          <p className="text-slate-700 font-medium">
            71% поверхности Земли покрыто водой,
            <br />
            но только 1% — питьевая! 💧
          </p>
        </div>
      </motion.section>

      {/* Spacer for bottom nav */}
      <div className="h-8" />
    </div>
  );
}

// Action Card Component
interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgIcon: string;
}

function ActionCard({ icon, title, description, color, bgIcon }: ActionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${color} p-5 text-white shadow-lg`}
    >
      {/* Background decoration */}
      <div className="absolute -right-4 -top-4 text-8xl opacity-20 select-none">
        {bgIcon}
      </div>

      <div className="relative z-10 flex items-center gap-4">
        <div className="p-3 bg-white/20 rounded-xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-sm text-white/90">{description}</p>
        </div>
        <ChevronRight size={24} className="text-white/70" />
      </div>
    </motion.div>
  );
}
