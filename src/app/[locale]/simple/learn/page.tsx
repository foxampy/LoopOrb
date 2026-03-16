"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle, Star, BookOpen, Lightbulb, Shield, Droplets } from "lucide-react";
import { SimpleHeader } from "../components/SimpleNav";
import { WaterMascot, SpeechBubble } from "../components/WaterMascot";
import { Badge } from "../components/ProgressCard";

// Learning sections
const sections = [
  {
    id: "why",
    icon: Droplets,
    title: "Почему вода важна?",
    color: "from-blue-400 to-cyan-500",
    content: {
      text: `Вода — это жизнь! Без воды не могут жить ни люди, ни животные, ни растения.

      🌍 Интересные факты:
      • Человек на 60% состоит из воды
      • Мы можем прожить без воды только 3 дня
      • Земля — единственная планета с жидкой водой
      • Вода замораживается при 0°C и кипит при 100°C`,
      quiz: {
        question: "Сколько дней человек может прожить без воды?",
        options: ["1 день", "3 дня", "7 дней", "30 дней"],
        correct: 1,
      },
    },
  },
  {
    id: "check",
    icon: Shield,
    title: "Как проверить воду?",
    color: "from-green-400 to-emerald-500",
    content: {
      text: `Чистая вода должна быть прозрачной и без запаха.

      👀 Признаки чистой воды:
      • Прозрачная, без цвета
      • Нет неприятного запаха
      • Нет плавающих частиц
      • Не оставляет осадок

      ⚠️ Если вода мутная или пахнет — не пей!`,
      quiz: {
        question: "Какой запах у чистой воды?",
        options: [
          "Запах хлорки",
          "Запах тины",
          "Нет запаха",
          "Запах металла",
        ],
        correct: 2,
      },
    },
  },
  {
    id: "save",
    icon: Lightbulb,
    title: "Как сохранить воду?",
    color: "from-amber-400 to-orange-500",
    content: {
      text: `Каждый из нас может помочь сохранить воду!

      💡 Простые советы:
      • Закрывай кран, пока чистишь зубы (-6 литров!)
      • Принимай быстрый душ (-50 литров!)
      • Сообщай о протечках
      • Поливай цветы вечером
      • Используй стиралку при полной загрузке`,
      quiz: {
        question: "Сколько литров можно сэкономить, закрыв кран во время чистки зубов?",
        options: ["1 литр", "3 литра", "6 литров", "10 литров"],
        correct: 2,
      },
    },
  },
];

// Earned badges
const earnedBadges = [
  { icon: "💧", name: "Начинающий", description: "Открыл первый урок", earned: true, earnedDate: "15.03.2026" },
  { icon: "🎓", name: "Ученик", description: "Прошёл 3 урока", earned: false },
  { icon: "🏆", name: "Эксперт", description: "Ответил на все вопросы", earned: false },
];

export default function SimpleLearnPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [completedSections, setCompletedSections] = useState<string[]>(["why"]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState<Record<string, boolean>>({});

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const handleQuizAnswer = (sectionId: string, optionIndex: number, correctIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [sectionId]: optionIndex });
    setShowResult({ ...showResult, [sectionId]: true });
    
    if (optionIndex === correctIndex && !completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SimpleHeader title="Учимся про воду" />

      <div className="p-4">
        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 mb-6"
        >
          <WaterMascot size="small" emotion="excited" />
          <SpeechBubble>
            Давай узнаем много интересного про воду! 📚✨
          </SpeechBubble>
        </motion.div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600">Прогресс обучения</span>
            <span className="font-bold text-cyan-600">
              {Math.round((completedSections.length / sections.length) * 100)}%
            </span>
          </div>
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(completedSections.length / sections.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-3 mb-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            const isCompleted = completedSections.includes(section.id);

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => handleSectionClick(section.id)}
                  className={`w-full rounded-2xl overflow-hidden transition-all ${
                    isActive ? "shadow-lg" : "shadow-sm hover:shadow-md"
                  }`}
                >
                  {/* Section header */}
                  <div
                    className={`p-4 bg-gradient-to-r ${section.color} text-white flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-xl">
                        <Icon size={24} className="text-white" />
                      </div>
                      <span className="font-bold text-lg">{section.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="p-1 bg-white/30 rounded-full"
                        >
                          <CheckCircle size={20} className="text-white" />
                        </motion.div>
                      )}
                      <motion.div
                        animate={{ rotate: isActive ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight size={24} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Section content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-white"
                      >
                        <div className="p-4">
                          {/* Content text */}
                          <div className="text-slate-700 whitespace-pre-line mb-6 leading-relaxed">
                            {section.content.text}
                          </div>

                          {/* Quiz */}
                          <div className="bg-slate-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Star size={20} className="text-amber-400" />
                              <span className="font-bold text-slate-800">Проверь себя!</span>
                            </div>
                            <p className="text-slate-700 mb-4 font-medium">
                              {section.content.quiz.question}
                            </p>
                            <div className="space-y-2">
                              {section.content.quiz.options.map((option, optIndex) => {
                                const isSelected = quizAnswers[section.id] === optIndex;
                                const isCorrect = optIndex === section.content.quiz.correct;
                                const showAnswer = showResult[section.id];

                                return (
                                  <motion.button
                                    key={optIndex}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() =>
                                      !showResult[section.id] &&
                                      handleQuizAnswer(
                                        section.id,
                                        optIndex,
                                        section.content.quiz.correct
                                      )
                                    }
                                    disabled={showResult[section.id]}
                                    className={`w-full p-3 rounded-xl text-left font-medium transition-all ${
                                      showAnswer
                                        ? isCorrect
                                          ? "bg-green-100 text-green-800 border-2 border-green-400"
                                          : isSelected
                                          ? "bg-red-100 text-red-800 border-2 border-red-400"
                                          : "bg-white border-2 border-slate-200"
                                        : isSelected
                                        ? "bg-cyan-100 text-cyan-800 border-2 border-cyan-400"
                                        : "bg-white border-2 border-slate-200 hover:border-cyan-300"
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span>{option}</span>
                                      {showAnswer && isCorrect && (
                                        <span className="text-green-600">✓ Правильно!</span>
                                      )}
                                      {showAnswer && isSelected && !isCorrect && (
                                        <span className="text-red-600">✗ Неверно</span>
                                      )}
                                    </div>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Badges section */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="text-2xl">🏅</span> Мои награды
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {earnedBadges.map((badge, index) => (
              <Badge key={index} {...badge} />
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="h-8" />
      </div>
    </div>
  );
}
