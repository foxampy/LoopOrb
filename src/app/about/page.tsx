"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Droplets, Globe, Award, TrendingUp, Users, Clock,
  ChevronRight, ArrowRight, History, Target, Zap
} from "lucide-react";

const timeline = [
  {
    year: "2003",
    title: "Начало пути с Culligan",
    description: "Оборудование Culligan установлено в Ташкентском аквапарке. Высокотехнологичные решения гарантируют долгий срок службы и высокое качество воды.",
    icon: Droplets
  },
  {
    year: "2004-2006",
    title: "Расширение по СНГ",
    description: "Установки Culligan в Казахстане, Туркменистане, на Белорусских и Украинских предприятиях. Партнёрство с Nemiroff, Gazprom, ALROSA.",
    icon: Globe
  },
  {
    year: "2012",
    title: "Создание Culligan Bel",
    description: "Инвестиционный проект по организации производства оборудования для водоподготовки на территории Беларуси. Фабрика в Заславле.",
    icon: Award
  },
  {
    year: "2014-2016",
    title: "Международное признание",
    description: "Белорусско-американский инвестиционный форум в Нью-Йорке. Culligan Eurasia выбирает Беларусь как центр производства.",
    icon: TrendingUp
  },
  {
    year: "2017-2021",
    title: "Разработка UNICAP Global",
    description: "Формирование видения помощи обществу и планете. Разработка концепции VODPROM — платформы для реализации совместных решений.",
    icon: Target
  },
  {
    year: "2024-2026",
    title: "Запуск VODeco",
    description: "Создание децентрализованной экосистемы мониторинга воды на базе блокчейна. Интеграция IoT, AI и автоматических лабораторий.",
    icon: Zap
  }
];

const phases = [
  {
    phase: "Фаза 1",
    title: "VODPROM",
    description: "Платформа для реализации совместных решений по развитию водных ресурсов. Public-Private Partnership с правительствами стран.",
    features: ["PPP контракты", "Производство оборудования", "Интеграция блокчейна"]
  },
  {
    phase: "Фаза 2",
    title: "Расширение",
    description: "Выход в другие области ЖКХ — очистка сточных вод, переработка отходов. Масштабирование на новые регионы.",
    features: ["Водоотведение", "Переработка отходов", "Новые регионы"]
  },
  {
    phase: "Фаза 3",
    title: "Будущее",
    description: "Дальнейшее развитие в сферах энергетики, транспорта, промышленности и здравоохранения. Глобальная экосистема.",
    features: ["Энергетика", "Транспорт", "Здравоохранение"]
  }
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
                <History className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400 font-medium">Наша история</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Путь к <span className="gradient-text">водной экономике</span>
              </h1>
              <p className="text-xl text-water-200/70 max-w-3xl mx-auto">
                Более 20 лет опыта в водоподготовке от Culligan к глобальной 
                децентрализованной экосистеме VODeco
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Наша миссия</h2>
              <p className="text-lg text-water-200/80 max-w-2xl mx-auto">
                Вода — один из ключевых ресурсов Земли, используемых как для повседневной жизни, 
                так и для промышленности. Мы посвятили жизнь изучению взаимодействия водных 
                ресурсов экосистемы Земли и человеческого организма.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Хронология развития</h2>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-cyan-500/30 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-400 font-bold">
                          {item.year}
                        </span>
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="text-water-200/70">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Phases */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Этапы развития</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {phases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-400 text-sm font-semibold w-fit mb-4">
                    {phase.phase}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-water-200/70 mb-4">{phase.description}</p>
                  <ul className="space-y-2">
                    {phase.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-cyan-400">
                        <ChevronRight className="w-4 h-4" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "20+", label: "Лет опыта" },
                { value: "50+", label: "Стран" },
                { value: "1000+", label: "Объектов" },
                { value: "$200M+", label: "Инвестиций" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-6 text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                  <div className="text-sm text-water-200/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="glass-card p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Присоединяйтесь к нам</h3>
              <p className="text-water-200/70 mb-6 max-w-2xl mx-auto">
                Станьте частью глобального движения за прозрачность и устойчивость 
                водных ресурсов. Инвестируйте в будущее планеты.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/tokenhub" className="btn-primary flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Инвестировать
                </Link>
                <Link href="/litepaper" className="btn-secondary flex items-center gap-2">
                  <ArrowRight className="w-5 h-5" />
                  Читать Litepaper
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
