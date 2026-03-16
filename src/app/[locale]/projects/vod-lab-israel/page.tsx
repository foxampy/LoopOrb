"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  ArrowLeft,
  MapPin,
  TrendingUp,
  Users,
  Clock,
  Target,
  Droplets,
  Microscope,
  Shield,
  CheckCircle,
  AlertTriangle,
  Building2,
  ExternalLink,
  ChevronRight,
  Wallet,
  Info,
  Cpu,
  Satellite,
  Beaker,
  Zap,
  Thermometer,
  Award,
  FileText,
  Download,
  Share2,
} from "lucide-react";

const projectData = {
  slug: "vod-lab-israel",
  name: "VOD-Lab Israel: Единый стандарт IoT-анализаторов воды",
  shortDescription: "Пилотный проект по внедрению автоматических лабораторных анализаторов воды с блокчейн-верификацией. Начало — Израиль, где отсутствует регулярный контроль питьевой воды.",
  type: "TECHNOLOGY",
  category: "RESEARCH",
  status: "FUNDING",
  country: "Израиль",
  region: "Ближний Восток",
  coordinates: { lat: 31.5, lng: 34.8 },
  
  // Financial
  targetAmount: 5000000,
  raisedAmount: 1245000,
  minStake: 100,
  expectedApy: 18,
  
  // ESG
  esgScore: 92,
  sdgGoals: [6, 9, 11, 13, 17],
  impactMetrics: {
    waterQuality: "+85% точность",
    coverage: "1,000 точек мониторинга",
    responseTime: "< 10 минут",
    beneficiaries: "9.9M человек",
  },
  
  // Timeline
  startDate: "2026-03-01",
  endDate: "2027-03-01",
  
  // Team
  team: [
    { name: "Dr. Elena Rosenberg", role: "Lead Scientist", org: "Weizmann Institute" },
    { name: "Prof. David Cohen", role: "CTO", org: "Technion" },
    { name: "Sarah Miller", role: "Project Manager", org: "VODeco Labs" },
    { name: "Michael Chen", role: "Blockchain Architect", org: "LoopOrb" },
  ],
  
  // Milestones
  milestones: [
    { 
      id: "m1", 
      title: "Разработка протокола VOD-Lab Standard", 
      date: "2026-03-01", 
      status: "IN_PROGRESS",
      budget: 500000,
      deliverables: ["Техническая спецификация", "API документация", "Смарт-контракты"],
    },
    { 
      id: "m2", 
      title: "Производство первых 50 узлов", 
      date: "2026-06-01", 
      status: "PENDING",
      budget: 800000,
      deliverables: ["50 анализаторов", "Тестирование", "Сертификация"],
    },
    { 
      id: "m3", 
      title: "Установка пилотных станций в Израиле", 
      date: "2026-09-01", 
      status: "PENDING",
      budget: 1200000,
      deliverables: ["50 точек в Тель-Авиве", "50 точек в Иерусалиме", "Обучение персонала"],
    },
    { 
      id: "m4", 
      title: "Масштабирование на 1000 узлов", 
      date: "2027-03-01", 
      status: "PENDING",
      budget: 2500000,
      deliverables: ["1000 работающих станций", "Полное покрытие страны", "Отчёт ООН"],
    },
  ],
  
  // Technical Specs from architecture
  technicalSpecs: {
    housing: {
      name: "Корпус",
      spec: "IP68, -40°C до +60°C, солнечная панель",
      cost: 3000,
    },
    pump: {
      name: "Насосная система",
      spec: "Микродозирование, 0.1-10 мл/мин, самоочистка",
      cost: 800,
    },
    spectrometer: {
      name: "Спектрофотометр",
      spec: "UV-Vis-NIR, 190-1100 нм, 20+ параметров",
      cost: 5000,
    },
    cartridge: {
      name: "Картриджная система",
      spec: "12 слотов, автозамена, RFID-маркировка",
      cost: 2000,
    },
    reagents: {
      name: "Реагенты",
      spec: "6 месяцев автономной работы",
      cost: 500,
      period: "month",
    },
    edge: {
      name: "Edge-computing",
      spec: "NVIDIA Jetson, локальный AI, шифрование",
      cost: 1500,
    },
    comms: {
      name: "Коммуникации",
      spec: "LoRaWAN + спутник + 4G backup",
      cost: 600,
    },
    blockchain: {
      name: "Блокчейн-нода",
      spec: "Лёгкая нода VOD Chain, подпись транзакций",
      cost: 500,
    },
  },
  
  // Cartridge Matrix
  cartridgeMatrix: [
    { name: "Базовый", params: "pH, температура, проводимость, мутность, ОВП", frequency: "Непрерывно", lifespan: "1 год" },
    { name: "Металлы-1", params: "Pb, Cd, Hg, As (тяжёлые)", frequency: "1 раз/день", lifespan: "6 месяцев" },
    { name: "Металлы-2", params: "Fe, Mn, Cu, Zn", frequency: "1 раз/день", lifespan: "6 месяцев" },
    { name: "Органика", params: "ПАВ, фенолы, нефтепродукты", frequency: "1 раз/6 часов", lifespan: "4 месяца" },
    { name: "Микробиология", params: "E.coli, колиформы, легионелла", frequency: "1 раз/день", lifespan: "3 месяца" },
    { name: "Нитраты/фосфаты", params: "NO3, NO2, PO4, NH4", frequency: "Непрерывно", lifespan: "8 месяцев" },
    { name: "Пестициды", params: "20+ препаратов (гербицид, инсектицид)", frequency: "1 раз/неделю", lifespan: "6 месяцев" },
    { name: "Микропластик", params: "Частицы 1-1000 мкм, классификация", frequency: "1 раз/неделю", lifespan: "4 месяца" },
  ],
  
  documents: [
    { name: "Техническое задание VOD-Lab", type: "PDF", size: "2.4 MB" },
    { name: "Экономическая модель", type: "XLSX", size: "1.1 MB" },
    { name: "Сертификаты соответствия", type: "PDF", size: "5.8 MB" },
    { name: "Партнёрское соглашение Weizmann", type: "PDF", size: "890 KB" },
  ],
};

export default function VODLabProjectPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "tech" | "milestones" | "team">("overview");
  const [stakeAmount, setStakeAmount] = useState("");
  
  const progress = (projectData.raisedAmount / projectData.targetAmount) * 100;
  const totalCapex = Object.values(projectData.technicalSpecs).reduce((sum: number, item: any) => 
    sum + (item.period ? item.cost * 12 : item.cost), 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8">
        {/* Hero */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-cyan-500/30 to-teal-500/40" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-transparent to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Все проекты
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 max-w-3xl">
                {projectData.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-400">
                  {projectData.type}
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/70 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {projectData.country}
                </span>
                <span className="px-3 py-1 bg-green-500/20 rounded-full text-sm text-green-400">
                  ESG {projectData.esgScore}
                </span>
                <span className="px-3 py-1 bg-yellow-500/20 rounded-full text-sm text-yellow-400">
                  Сбор средств
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs */}
              <div className="glass-card p-2">
                <div className="flex gap-2 overflow-x-auto">
                  {[
                    { id: "overview", label: "Обзор", icon: Info },
                    { id: "tech", label: "Технологии", icon: Cpu },
                    { id: "milestones", label: "Майлстоуны", icon: Target },
                    { id: "team", label: "Команда", icon: Users },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                        activeTab === tab.id
                          ? "bg-water-500/20 text-water-400"
                          : "text-water-200/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">О проекте</h3>
                      <p className="text-water-200/80 leading-relaxed">
                        {projectData.shortDescription}
                      </p>
                      
                      <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-400 mb-1">Проблема в Израиле</h4>
                            <p className="text-sm text-red-200/70">
                              Израиль официально отказался от проведения регулярного химического анализа 
                              питьевой воды для населения. Данные IoT-систем не верифицируются независимо, 
                              а показания разных поставщиков расходятся на 15-30%.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Цели проекта</h3>
                      <ul className="space-y-2">
                        {[
                          "Разработать единый открытый протокол для IoT-анализаторов воды",
                          "Установить 1000 автоматических станций мониторинга",
                          "Обеспечить верификацию данных через блокчейн",
                          "Создать независимую систему контроля качества воды",
                          "Подготовить отчёт для ООН по SDG 6",
                        ].map((goal, i) => (
                          <li key={i} className="flex items-start gap-2 text-water-200/80">
                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Влияние (Impact)</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {Object.entries(projectData.impactMetrics).map(([key, value]) => (
                          <div key={key} className="p-4 bg-white/5 rounded-lg">
                            <div className="text-2xl font-bold gradient-text">{value as string}</div>
                            <div className="text-sm text-water-200/50">
                              {key === "waterQuality" ? "Качество воды" :
                               key === "coverage" ? "Покрытие" :
                               key === "responseTime" ? "Время реакции" :
                               "Бенефициары"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">SDG Цели</h3>
                      <div className="flex flex-wrap gap-2">
                        {projectData.sdgGoals.map((goal) => (
                          <span
                            key={goal}
                            className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium"
                          >
                            SDG {goal}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "tech" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Техническая спецификация VOD-Lab</h3>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left py-3 px-2 text-water-200/50">Компонент</th>
                              <th className="text-left py-3 px-2 text-water-200/50">Спецификация</th>
                              <th className="text-right py-3 px-2 text-water-200/50">Стоимость</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(projectData.technicalSpecs).map(([key, item]: [string, any]) => (
                              <tr key={key} className="border-b border-white/5">
                                <td className="py-3 px-2 text-white font-medium">{item.name}</td>
                                <td className="py-3 px-2 text-water-200/70">{item.spec}</td>
                                <td className="py-3 px-2 text-right text-cyan-glow">
                                  ${item.cost.toLocaleString()}
                                  {item.period && "/" + (item.period === "month" ? "мес" : item.period)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-4 p-4 bg-white/5 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-white font-medium">Общая стоимость узла (CAPEX)</span>
                          <span className="text-xl font-bold gradient-text">~$13,400</span>
                        </div>
                        <p className="text-sm text-water-200/50 mt-1">
                          OPEX: ~$800/мес (реагенты, связь, обслуживание)
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Картриджная матрица анализов</h3>
                      <div className="grid gap-3">
                        {projectData.cartridgeMatrix.map((cartridge, index) => (
                          <div key={index} className="p-4 bg-white/5 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-white">{cartridge.name}</h4>
                              <span className="text-xs text-water-200/50">{cartridge.lifespan}</span>
                            </div>
                            <p className="text-sm text-water-200/70 mb-1">{cartridge.params}</p>
                            <p className="text-xs text-cyan-glow">{cartridge.frequency}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-blue-500/10 rounded-lg">
                      <h4 className="font-medium text-blue-400 mb-2 flex items-center gap-2">
                        <Cpu className="w-5 h-5" />
                        Процесс: От пробы до токена
                      </h4>
                      <div className="grid grid-cols-5 gap-2 mt-4 text-center text-xs">
                        {["Забор воды", "Анализ", "Верификация", "Эмиссия", "Распределение"].map((step, i) => (
                          <div key={i} className="space-y-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto text-blue-400 font-bold">
                              {i + 1}
                            </div>
                            <span className="text-water-200/70">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "milestones" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Майлстоуны проекта</h3>
                    {projectData.milestones.map((milestone, index) => (
                      <div
                        key={milestone.id}
                        className={`p-4 rounded-lg border ${
                          milestone.status === "COMPLETED" 
                            ? "bg-green-500/10 border-green-500/30" 
                            : milestone.status === "IN_PROGRESS"
                            ? "bg-yellow-500/10 border-yellow-500/30"
                            : "bg-white/5 border-white/10"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              milestone.status === "COMPLETED" ? "bg-green-500/20 text-green-400" :
                              milestone.status === "IN_PROGRESS" ? "bg-yellow-500/20 text-yellow-400" :
                              "bg-white/10 text-water-200/50"
                            }`}>
                              {milestone.status === "COMPLETED" ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <span className="text-sm">{index + 1}</span>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{milestone.title}</h4>
                              <p className="text-sm text-water-200/50">{milestone.date}</p>
                            </div>
                          </div>
                          <span className="text-cyan-glow font-medium">
                            ${milestone.budget.toLocaleString()}
                          </span>
                        </div>
                        <div className="ml-11">
                          <p className="text-sm text-water-200/70 mb-2">Deliverables:</p>
                          <ul className="space-y-1">
                            {milestone.deliverables.map((d, i) => (
                              <li key={i} className="text-sm text-water-200/50 flex items-center gap-2">
                                <CheckCircle className="w-3 h-3" />
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "team" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Команда проекта</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {projectData.team.map((member, index) => (
                        <div key={index} className="p-4 bg-white/5 rounded-lg flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep font-bold">
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{member.name}</h4>
                            <p className="text-sm text-cyan-glow">{member.role}</p>
                            <p className="text-xs text-water-200/50">{member.org}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-white/5 rounded-lg">
                      <h4 className="font-medium text-white mb-2">Партнёры</h4>
                      <div className="flex flex-wrap gap-2">
                        {["Weizmann Institute", "Technion", "VODeco Labs", "LoopOrb", "Israel Water Authority"].map((partner) => (
                          <span key={partner} className="px-3 py-1 bg-white/5 rounded-full text-sm text-water-200/70">
                            {partner}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Documents */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Документы</h3>
                <div className="space-y-3">
                  {projectData.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-water-400" />
                        <div>
                          <p className="text-white text-sm">{doc.name}</p>
                          <p className="text-xs text-water-200/50">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      <Download className="w-4 h-4 text-water-200/50" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Funding Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6 sticky top-24"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Финансирование</h3>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-water-200/70">Собрано</span>
                    <span className="text-white">
                      ${projectData.raisedAmount.toLocaleString()} / ${projectData.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-water-400 to-cyan-glow rounded-full transition-all"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="text-right text-sm text-cyan-glow mt-1">{progress.toFixed(1)}%</div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-water-200/60">Минимальный стейк</span>
                    <span className="text-white">{projectData.minStake} UNITY</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-water-200/60">Ожидаемый APY</span>
                    <span className="text-green-400">{projectData.expectedApy}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-water-200/60">Длительность</span>
                    <span className="text-white">12 месяцев</span>
                  </div>
                </div>

                {/* Stake Form */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-water-200/70 mb-2">
                      Сумма стейкинга (UNITY)
                    </label>
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder={`Минимум ${projectData.minStake}`}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-water-500 transition"
                    />
                  </div>
                  <button className="w-full btn-primary flex items-center justify-center gap-2">
                    <Wallet className="w-4 h-4" />
                    Застейкать в проект
                  </button>
                </div>

                {/* Related DAO Proposal */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="text-sm font-medium text-water-200/50 mb-3">Связанное предложение DAO</h4>
                  <Link
                    href="/dao/prop-001"
                    className="block p-3 bg-water-500/10 rounded-lg hover:bg-water-500/20 transition"
                  >
                    <div className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-water-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-white font-medium line-clamp-2">
                          VOD-Lab Standard: Единый протокол IoT-анализаторов
                        </p>
                        <p className="text-xs text-water-400 mt-1 flex items-center gap-1">
                          Голосование активно
                          <ChevronRight className="w-3 h-3" />
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6"
              >
                <h4 className="text-sm font-medium text-water-200/50 mb-4">Быстрая статистика</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-water-400" />
                    <div>
                      <p className="text-white font-medium">245 инвесторов</p>
                      <p className="text-xs text-water-200/50">Уже поддержали проект</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-cyan-glow" />
                    <div>
                      <p className="text-white font-medium">1,000 станций</p>
                      <p className="text-xs text-water-200/50">Целевой показатель</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">ESG 92/100</p>
                      <p className="text-xs text-water-200/50">Высокий рейтинг</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
