"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Droplets, ArrowLeft, Zap, Box, Activity, TrendingUp,
  Users, Clock, CheckCircle2, FileText, Globe, Shield,
  ChevronRight, Wallet, Menu, X, Award, Gem, Target,
  Cpu, Radio, Wifi, Database, Server, Hash, Lock,
  FlaskConical, Waves, Satellite, Beaker, Brain,
  TrendingDown, Plus, Minus, Lightbulb
} from "lucide-react";
import { useState } from "react";

// --- PROJECTS DATA ---
const projectsData: Record<string, any> = {
  aquacell: {
    title: "AquaCell",
    category: "Hardware Innovation",
    subtitle: "Бытовой сенсор для квартир и домов",
    description: "Портативная лаборатория для анализа воды с лабораторной точностью ±2%.",
    longDescription: `AquaCell — это компактное устройство для бытового мониторинга качества воды. 
    Пользователь получает данные о pH, температуре, турбидности, проводимости и ОВП в реальном времени.
    
    Устройство использует инновационную Lab-on-chip технологию, которая позволяет проводить 
    лабораторно-точные измерения в компактном формфакторе. NFC-верификация картриджей 
    гарантирует подлинность расходных материалов.
    
    Данные синхронизируются с мобильным приложением, где пользователь может отслеживать 
    историю измерений, получать рекомендации и участвовать в глобальной сети мониторинга воды.`,
    price: "$199",
    status: "production",
    progress: 85,
    color: "from-cyan-500 to-blue-500",
    icon: "Droplet",
    emissionRate: "10 VOD/m³",
    specs: [
      { label: "Точность измерений", value: "±2%", desc: "Лабораторная точность" },
      { label: "Параметры", value: "5 показателей", desc: "pH, T, турбидность, проводимость, ОВП" },
      { label: "Связь", value: "Bluetooth 5.0, WiFi", desc: "Мгновенная синхронизация" },
      { label: "Питание", value: "USB-C", desc: "3 месяца автономности" },
      { label: "Время анализа", value: "30 секунд", desc: "Мгновенные результаты" },
      { label: "Вес", value: "150 грамм", desc: "Компактный и портативный" },
    ],
    features: [
      { title: "Lab-on-chip", desc: "Инновационная технология миниатюризации лабораторного оборудования" },
      { title: "NFC-верификация", desc: "Защита от поддельных картриджей" },
      { title: "Облачная аналитика", desc: "История измерений и тренды" },
      { title: "Глобальная сеть", desc: "Ваши данные улучшают карту качества воды" },
    ],
    milestones: [
      { title: "Прототип MEMS-спектрометра", date: "2025-01", completed: true },
      { title: "Калибровка ±2% точности", date: "2025-03", completed: true },
      { title: "NFC-защита картриджей", date: "2025-05", completed: true },
      { title: "Сертификация ISO", date: "2025-07", completed: false },
      { title: "Массовое производство", date: "2025-09", completed: false },
    ],
    team: [
      { name: "Алексей Соколов", role: "Lead Engineer", avatar: "AS" },
      { name: "Мария Козлова", role: "Product Manager", avatar: "МК" },
      { name: "Иван Петров", role: "Hardware Architect", avatar: "ИП" },
    ],
    funding: { raised: "$450,000", goal: "$500,000", backers: 234 },
  },
  
  aquahome: {
    title: "AquaHome",
    category: "Hardware Innovation",
    subtitle: "Расширенная станция мониторинга",
    description: "Стационарная система мониторинга с автосэмплером TimeCapsule.",
    longDescription: `AquaHome — профессиональная станция для дома или небольшого офиса. 
    Автоматический отбор проб, расширенный набор датчиков, интеграция с системами умного дома.
    
    TimeCapsule технология позволяет хранить до 12 проб в квартал для последующего 
    детального анализа в лаборатории. Система работает 24/7 и предупреждает о 
    любых отклонениях качества воды.`,
    price: "$499",
    status: "testing",
    progress: 62,
    color: "from-teal-500 to-emerald-500",
    icon: "Waves",
    emissionRate: "12 VOD/m³",
    specs: [
      { label: "Проб/квартал", value: "12", desc: "TimeCapsule хранение" },
      { label: "Параметры", value: "12+", desc: "Расширенный набор датчиков" },
      { label: "Связь", value: "WiFi, Ethernet", desc: "Стабильное подключение" },
      { label: "Хранение", value: "1 год", desc: "Локальная история" },
      { label: "API", value: "REST", desc: "Для разработчиков" },
      { label: "Smart Home", value: "Alexa, Google", desc: "Голосовое управление" },
    ],
    features: [
      { title: "Автосэмплер", desc: "Автоматический отбор и хранение проб" },
      { title: "Real-time Guardian", desc: "Непрерывный мониторинг" },
      { title: "Smart Home", desc: "Интеграция с системами умного дома" },
      { title: "Расширенная аналитика", desc: "Прогнозирование и тренды" },
    ],
    milestones: [
      { title: "Прототип системы", date: "2024-11", completed: true },
      { title: "Интеграция TimeCapsule", date: "2025-01", completed: true },
      { title: "Beta-тестирование", date: "2025-04", completed: false },
      { title: "Запуск производства", date: "2025-08", completed: false },
    ],
    team: [
      { name: "Дмитрий Волков", role: "System Architect", avatar: "ДВ" },
      { name: "Анна Лебедева", role: "UX Designer", avatar: "АЛ" },
    ],
    funding: { raised: "$280,000", goal: "$350,000", backers: 156 },
  },

  aquadrone: {
    title: "AquaDrones",
    category: "Hardware Innovation",
    subtitle: "Промышленные датчики для водоемов",
    description: "Автономные катамараны для удалённого сэмплирования.",
    longDescription: `AquaDrones — автономные беспилотные катамараны для мониторинга крупных водоемов.
    Способны работать в сложных погодных условиях, автоматически собирать пробы с 
    различных точек водоема и доставлять их на берег.
    
    Идеальны для мониторинга озер, водохранилищ, заливов и промышленных водоемов.
    Геофенсинг и автономная навигация позволяют проводить регулярные обследования 
    без участия оператора.`,
    price: "$2,999",
    status: "concept",
    progress: 15,
    color: "from-amber-500 to-orange-500",
    icon: "Satellite",
    emissionRate: "15 VOD/m³",
    specs: [
      { label: "Автономность", value: "4-6 часов", desc: "Полетное время" },
      { label: "Радиус", value: "5 км", desc: "Дальность действия" },
      { label: "Связь", value: "4G/5G, LoRa", desc: "Надежная передача" },
      { label: "Груз", value: "2 кг", desc: "Проб и оборудования" },
      { label: "Погода", value: "IP67", desc: "Всепогодный корпус" },
      { label: "GPS", value: "RTK", desc: "Сантиметровая точность" },
    ],
    features: [
      { title: "Автономная навигация", desc: "Планирование маршрутов и避障" },
      { title: "Многоточечное сэмплирование", desc: "До 20 точек за рейс" },
      { title: "Облачная аналитика", desc: "3D-карты качества воды" },
      { title: "Безопасность", desc: "Автоматический возврат при проблемах" },
    ],
    milestones: [
      { title: "Концепт-дизайн", date: "2025-01", completed: true },
      { title: "Прототип корпуса", date: "2025-06", completed: false },
      { title: "Испытания на воде", date: "2025-12", completed: false },
      { title: "Производство", date: "2026-06", completed: false },
    ],
    team: [
      { name: "Сергей Морозов", role: "Robotics Lead", avatar: "СМ" },
    ],
    funding: { raised: "$180,000", goal: "$1,200,000", backers: 45 },
  },

  "ai-prediction": {
    title: "AI Prediction Engine",
    category: "Data & Analytics",
    subtitle: "Прогнозирование качества воды",
    description: "ML-модели для предсказания изменения качества воды.",
    longDescription: `Искусственный интеллект анализирует исторические данные и предсказывает 
    изменения качества воды. Помогает предотвращать кризисы и оптимизировать ресурсы.
    
    Система использует edge computing для локальной обработки данных и централизованное 
    обучение на агрегированных данных всей сети. Точность прогнозов превышает 85%.`,
    price: "Subscription",
    status: "development",
    progress: 45,
    color: "from-pink-500 to-rose-500",
    icon: "Brain",
    emissionRate: "Бонус за точность",
    specs: [
      { label: "Точность", value: ">85%", desc: "Верифицированная" },
      { label: "Горизонт", value: "7-30 дней", desc: "Прогнозирование" },
      { label: "Обновление", value: "Real-time", desc: "Непрерывное" },
      { label: "API", value: "REST + GraphQL", desc: "Для интеграции" },
    ],
    features: [
      { title: "Предиктивная аналитика", desc: "Раннее предупреждение о проблемах" },
      { title: "Edge Computing", desc: "Локальная обработка данных" },
      { title: "Коллективное обучение", desc: "Улучшение на данных сети" },
      { title: "Интеграция", desc: "С любыми датчиками" },
    ],
    milestones: [
      { title: "MVP модели", date: "2024-12", completed: true },
      { title: "Обучение на 100K+ образцах", date: "2025-03", completed: false },
      { title: "Beta API", date: "2025-06", completed: false },
      { title: "Production", date: "2025-09", completed: false },
    ],
    team: [
      { name: "Елена Васильева", role: "ML Engineer", avatar: "ЕВ" },
      { name: "Артем Кузнецов", role: "Data Scientist", avatar: "АК" },
    ],
    funding: { raised: "$320,000", goal: "$480,000", backers: 89 },
  },

  "blockchain-registry": {
    title: "Blockchain Water Registry",
    category: "Data & Analytics",
    subtitle: "Реестр водных ресурсов",
    description: "Неподкупный реестр всех водных источников на блокчейне.",
    longDescription: `Децентрализованный реестр на блокчейне для учета водных ресурсов. 
    Прозрачная история использования, права собственности, лицензии.
    
    Каждый источник воды получает уникальный цифровой паспорт. Все изменения 
    фиксируются в блокчейне и доступны для публичной проверки.`,
    price: "Free",
    status: "production",
    progress: 80,
    color: "from-cyan-600 to-blue-600",
    icon: "Database",
    emissionRate: "5 VOD/запись",
    specs: [
      { label: "Блокчейн", value: "TON/Ethereum", desc: "Мульти-чейн" },
      { label: "TPS", value: "10,000", desc: "Пропускная способность" },
      { label: "Хранение", value: "IPFS", desc: "Децентрализованное" },
      { label: "API", value: "Public", desc: "Открытый доступ" },
    ],
    features: [
      { title: "Неподкупность", desc: "Никто не может изменить историю" },
      { title: "Прозрачность", desc: "Все данные публичны" },
      { title: "Смарт-контракты", desc: "Автоматическое исполнение правил" },
      { title: "Глобальный доступ", desc: "Данные доступны из любой точки мира" },
    ],
    milestones: [
      { title: "Запуск testnet", date: "2024-10", completed: true },
      { title: "Интеграция 1000+ источников", date: "2025-01", completed: true },
      { title: "Mainnet релиз", date: "2025-04", completed: false },
      { title: "Governance launch", date: "2025-06", completed: false },
    ],
    team: [
      { name: "Максим Новиков", role: "Blockchain Lead", avatar: "МН" },
    ],
    funding: { raised: "$420,000", goal: "$500,000", backers: 312 },
  },
};

// --- PAGE COMPONENT ---
export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const project = projectsData[id];
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Проект не найден</h1>
          <Link href="/projecthub" className="text-cyan-400 hover:underline">
            Вернуться к списку проектов
          </Link>
        </div>
      </div>
    );
  }

  const pageLinks = [
    { href: "/landing", label: "Staking" },
    { href: "/ecosystem", label: "Ecosystem" },
    { href: "/projecthub", label: "ProjectHub" },
    { href: "/tokenomics", label: "Tokenomics" },
    { href: "/dao", label: "DAO" },
    { href: "/profile", label: "Account" },
  ];

  const IconComponent = {
    Droplet, Waves, Satellite, Brain, Database, FlaskConical, Zap, Box
  }[project.icon] || Droplets;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">VODeco</span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {pageLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link 
                href="/wallet"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-medium rounded-lg transition-colors text-sm"
              >
                <Wallet className="w-4 h-4" />
                Wallet
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-400"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="pt-20 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/projecthub"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к проектам
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-slate-500">{project.category}</span>
                <span className="text-slate-600">|</span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${project.progress >= 80 ? 'bg-emerald-500' : project.progress >= 50 ? 'bg-amber-500' : 'bg-blue-500'} animate-pulse`} />
                  <span className={`text-sm ${project.progress >= 80 ? 'text-emerald-400' : project.progress >= 50 ? 'text-amber-400' : 'text-blue-400'}`}>
                    {project.progress >= 80 ? 'В производстве' : project.progress >= 50 ? 'В разработке' : 'Концепт'}
                  </span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-cyan-400 mb-4">{project.subtitle}</p>
              <p className="text-slate-400 mb-6">{project.description}</p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl px-6 py-3">
                  <div className="text-sm text-slate-500">Цена</div>
                  <div className="text-2xl font-bold text-white">{project.price}</div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl px-6 py-3">
                  <div className="text-sm text-slate-500">Эмиссия</div>
                  <div className="text-2xl font-bold text-emerald-400">{project.emissionRate}</div>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-900 font-bold rounded-xl hover:from-cyan-400 hover:to-emerald-400 transition-all">
                  Инвестировать
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`relative aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br ${project.color} p-1`}
            >
              <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                <IconComponent className="w-32 h-32 text-white opacity-80" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 border-b border-slate-800">
            {[
              { id: "overview", label: "Обзор" },
              { id: "specs", label: "Характеристики" },
              { id: "milestones", label: "Milestones" },
              { id: "team", label: "Команда" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-cyan-500 text-cyan-400"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">О проекте</h3>
                    <p className="text-slate-400 whitespace-pre-line">{project.longDescription}</p>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Ключевые особенности</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {project.features.map((feature: any, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{feature.title}</h4>
                            <p className="text-sm text-slate-500">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Прогресс</h3>
                    <div className="text-3xl font-bold text-cyan-400 mb-2">{project.progress}%</div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${project.color}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Финансирование</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Собрано</span>
                        <span className="text-white font-medium">{project.funding.raised}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Цель</span>
                        <span className="text-white font-medium">{project.funding.goal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Бэкеров</span>
                        <span className="text-white font-medium">{project.funding.backers}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-medium rounded-lg transition-colors">
                      Поддержать проект
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "specs" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {project.specs.map((spec: any, i: number) => (
                  <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <div className="text-sm text-slate-500 mb-1">{spec.label}</div>
                    <div className="text-2xl font-bold text-white mb-1">{spec.value}</div>
                    <div className="text-sm text-slate-600">{spec.desc}</div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "milestones" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl"
              >
                <div className="relative">
                  <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-slate-800" />
                  {project.milestones.map((milestone: any, i: number) => (
                    <div key={i} className="relative flex items-start gap-4 pb-8">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        milestone.completed 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}>
                        {milestone.completed ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-medium ${milestone.completed ? 'text-white' : 'text-slate-400'}`}>
                            {milestone.title}
                          </h4>
                          <span className="text-xs text-slate-500">{milestone.date}</span>
                        </div>
                        {milestone.completed && (
                          <span className="text-xs text-emerald-400">✓ Завершено</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "team" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {project.team.map((member: any, i: number) => (
                  <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                      {member.avatar}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{member.name}</h4>
                      <p className="text-sm text-slate-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">VODeco ProjectHub</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/projecthub" className="hover:text-cyan-400 transition-colors">Все проекты</Link>
            <Link href="/tokenomics" className="hover:text-cyan-400 transition-colors">Tokenomics</Link>
            <Link href="/dao" className="hover:text-cyan-400 transition-colors">DAO</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
