"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  ArrowLeft, TrendingUp, Users, Clock, Shield, AlertTriangle,
  CheckCircle2, Wallet, Lock, Unlock, Gem, ChevronRight,
  Activity, BarChart3, PieChart, Zap, Globe, Cpu,
  Droplets, Radio, FileText, Award, ArrowUpRight
} from "lucide-react";
import { useState } from "react";

// --- PROJECT DATA ---
const projectDetails: Record<string, any> = {
  "vod-lab-node": {
    id: "vod-lab-node",
    name: "VOD-Lab Node",
    subtitle: "Автономный лабораторный узел",
    category: "R&D / Hardware",
    status: "active",
    description: `VOD-Lab Node — это полностью автономный лабораторный узел с интегрированным 
    спектрофотометром, системой подготовки проб и Edge AI для верификации данных. 
    Узел способен анализировать 100+ параметров воды без участия оператора.`,
    longDescription: `Каждый узел представляет собой шлюз VOD Chain с встроенной нодой блокчейна. 
    Данные с датчиков проходят автоматическую верификацию Edge AI перед записью в блокчейн. 
    Это обеспечивает неподкупность данных и прозрачность всей экосистемы.`,
    fundingGoal: 500000,
    funded: 320000,
    minStake: 1000,
    apy: "15-25%",
    lockPeriod: "12 месяцев",
    riskLevel: "medium",
    backers: 234,
    team: [
      { name: "Dr. Sarah Chen", role: "Lead Engineer", avatar: "SC" },
      { name: "Marcus Weber", role: "Hardware Lead", avatar: "MW" },
      { name: "Elena Kowalski", role: "AI Researcher", avatar: "EK" },
    ],
    milestones: [
      { title: "Прототип V1", date: "Q1 2025", completed: true, amount: 50000 },
      { title: "Пилотные испытания", date: "Q2 2025", completed: true, amount: 100000 },
      { title: "Серийное производство", date: "Q3 2025", completed: false, amount: 200000 },
      { title: "Масштабирование", date: "Q4 2025", completed: false, amount: 150000 },
    ],
    specs: {
      "Анализируемых параметров": "100+",
      "Точность": "±2%",
      "Автономность": "3 дня",
      "Срок службы": "10 лет",
      "Связь": "LoRaWAN / 4G / WiFi",
      "Блокчейн": "TON / VOD Chain",
      "Вес": "45 кг",
      "Питание": "Сеть + резерв 72ч"
    },
    features: [
      "UV-Vis-NIR спектрофотометр с диапазоном 190-1100нм",
      "Картриджная система для химических тестов (12 слотов)",
      "Edge AI на NVIDIA Jetson для верификации данных",
      "Автоматическая калибровка по 10-ти точкам",
      "HSM-шифрование на уровне железа",
      "Интеграция с VOD Chain для прямой записи в блокчейн",
      "IP68 защита для работы в полевых условиях",
      "Солнечная панель в комплекте"
    ],
    roi: {
      year1: 15,
      year2: 22,
      year3: 25,
      year4: 20,
      year5: 18
    },
    esg: {
      waterSaved: "50,000 м³/год",
      co2Avoided: "12 тонн/год",
      communities: 15
    },
    documents: [
      { name: "Whitepaper", type: "PDF", size: "2.4 MB" },
      { name: "Technical Specs", type: "PDF", size: "4.1 MB" },
      { name: "Audit Report", type: "PDF", size: "1.8 MB" },
    ]
  },
  "aquacell-pro": {
    id: "aquacell-pro",
    name: "AquaCell Pro",
    subtitle: "Промышленный IoT сенсор",
    category: "Hardware / IoT",
    status: "fundraising",
    description: `AquaCell Pro — это промышленный сенсор для операторов водоканалов. 
    Мониторинг 20+ параметров в реальном времени с промышленной надёжностью.`,
    longDescription: `Устройство разработано специально для суровых условий эксплуатации. 
    IP68 защита позволяет работать на глубине до 50м. Автономность 72 часа при отключении сети.`,
    fundingGoal: 350000,
    funded: 180000,
    minStake: 500,
    apy: "12-18%",
    lockPeriod: "6 месяцев",
    riskLevel: "low",
    backers: 156,
    team: [
      { name: "James Mitchell", role: "CEO", avatar: "JM" },
      { name: "Anna Petrova", role: "CTO", avatar: "AP" },
    ],
    milestones: [
      { title: "R&D Phase", date: "Q4 2024", completed: true, amount: 80000 },
      { title: "Beta Testing", date: "Q1 2025", completed: true, amount: 50000 },
      { title: "Production", date: "Q2 2025", completed: false, amount: 150000 },
      { title: "Scale-up", date: "Q3 2025", completed: false, amount: 70000 },
    ],
    specs: {
      "Анализируемых параметров": "20+",
      "Точность": "±1%",
      "Автономность": "72 часа",
      "Срок службы": "5 лет",
      "Связь": "LoRaWAN / 4G",
      "Защита": "IP68 (50м)",
      "Вес": "3.2 кг",
      "Питание": "12V DC / Солнечная"
    },
    features: [
      "IP68 защита для подводной работы",
      "LoRaWAN + 4G двойная связь",
      "Солнечная панель в комплекте",
      "HSM шифрование данных",
      "Автоматические OTA обновления",
      "Интеграция с SCADA системами"
    ],
    roi: {
      year1: 12,
      year2: 15,
      year3: 18,
      year4: 16,
      year5: 14
    },
    esg: {
      waterSaved: "20,000 м³/год",
      co2Avoided: "5 тонн/год",
      communities: 8
    },
    documents: [
      { name: "Product Datasheet", type: "PDF", size: "1.2 MB" },
      { name: "Technical Manual", type: "PDF", size: "3.5 MB" },
    ]
  },
  "ai-prediction-engine": {
    id: "ai-prediction-engine",
    name: "AI Prediction Engine",
    subtitle: "ML-модели прогнозирования",
    category: "Software / AI",
    status: "active",
    description: `ML-модели прогнозирования качества воды. Раннее обнаружение аномалий, 
    предсказание аварий за 72 часа до происшествия.`,
    longDescription: `Система использует более 50 моделей машинного обучения для анализа 
    временных рядов данных с датчиков. Ансамблевые прогнозы обеспечивают точность >85%.`,
    fundingGoal: 800000,
    funded: 520000,
    minStake: 2000,
    apy: "18-32%",
    lockPeriod: "18 месяцев",
    riskLevel: "high",
    backers: 89,
    team: [
      { name: "Dr. Alex Kumar", role: "Chief Scientist", avatar: "AK" },
      { name: "Lisa Zhang", role: "ML Engineer", avatar: "LZ" },
    ],
    milestones: [
      { title: "Research Phase", date: "Q1 2025", completed: true, amount: 150000 },
      { title: "Model Training", date: "Q2 2025", completed: true, amount: 200000 },
      { title: "Beta Deployment", date: "Q3 2025", completed: false, amount: 250000 },
      { title: "Commercial Launch", date: "Q4 2025", completed: false, amount: 200000 },
    ],
    specs: {
      "Точность прогнозов": ">85%",
      "Горизонт прогноза": "72 часа",
      "Количество моделей": "50+",
      "Latency": "<100ms",
      "API": "REST + GraphQL",
      "Интеграции": "IoT, SCADA, ERP"
    },
    features: [
      "Deep Learning модели на TensorFlow",
      "Real-time inference",
      "Ансамблевые прогнозы",
      "Интеграция с IoT устройствами",
      "API для разработчиков",
      "Автоматическое дообучение"
    ],
    roi: {
      year1: 18,
      year2: 28,
      year3: 32,
      year4: 30,
      year5: 25
    },
    esg: {
      waterSaved: "100,000 м³/год",
      co2Avoided: "25 тонн/год",
      communities: 20
    },
    documents: [
      { name: "AI Architecture", type: "PDF", size: "3.2 MB" },
      { name: "Research Paper", type: "PDF", size: "1.5 MB" },
    ]
  },
  "blockchain-registry": {
    id: "blockchain-registry",
    name: "Blockchain Water Registry",
    subtitle: "Неподкупный реестр водных ресурсов",
    category: "Infrastructure",
    status: "active",
    description: `Децентрализованный реестр водных ресурсов. NFT-паспорта источников, 
    смарт-контракты для верификации и учёта.`,
    longDescription: `Реестр построен на мультичейн архитектуре (TON + Ethereum). 
    Каждый источник воды получает NFT-паспорт с неизменяемой историей.`,
    fundingGoal: 750000,
    funded: 620000,
    minStake: 1000,
    apy: "10-15%",
    lockPeriod: "12 месяцев",
    riskLevel: "low",
    backers: 312,
    team: [
      { name: "Viktor Sokolov", role: "Blockchain Lead", avatar: "VS" },
      { name: "Maria Silva", role: "Smart Contract Dev", avatar: "MS" },
    ],
    milestones: [
      { title: "Protocol Design", date: "Q4 2024", completed: true, amount: 100000 },
      { title: "Smart Contracts", date: "Q1 2025", completed: true, amount: 150000 },
      { title: "Testnet", date: "Q2 2025", completed: false, amount: 200000 },
      { title: "Mainnet", date: "Q3 2025", completed: false, amount: 300000 },
    ],
    specs: {
      "TPS": "10,000",
      "Latency": "<1s",
      "Нод": "50+",
      "Источников": "1000+",
      "Blockchains": "TON, Ethereum",
      "Хранение": "IPFS"
    },
    features: [
      "Мультичейн архитектура (TON/Ethereum)",
      "IPFS для хранения метаданных",
      "SBT для репутации операторов",
      "DAO управление протоколом",
      "Открытый API для интеграций",
      "ZK-доказательства"
    ],
    roi: {
      year1: 10,
      year2: 12,
      year3: 15,
      year4: 14,
      year5: 13
    },
    esg: {
      waterSaved: "N/A",
      co2Avoided: "N/A",
      communities: 50
    },
    documents: [
      { name: "Protocol Spec", type: "PDF", size: "2.8 MB" },
      { name: "Smart Contract Audit", type: "PDF", size: "1.9 MB" },
    ]
  },
  "vod-expedition": {
    id: "vod-expedition",
    name: "VOD-Expedition Kit",
    subtitle: "Портативная лаборатория",
    category: "R&D / Mobile",
    status: "fundraising",
    description: `Портативная лаборатория для полевых исследований. 50+ параметров 
    в чемодане Pelican Case весом всего 12 кг.`,
    longDescription: `Компактное решение для учёных и инспекторов. Полный набор 
    оборудования в одном кейсе с автономным питанием.`,
    fundingGoal: 400000,
    funded: 280000,
    minStake: 800,
    apy: "14-22%",
    lockPeriod: "9 месяцев",
    riskLevel: "medium",
    backers: 178,
    team: [
      { name: "Dr. Tom Berger", role: "Field Engineer", avatar: "TB" },
      { name: "Yuki Tanaka", role: "Product Manager", avatar: "YT" },
    ],
    milestones: [
      { title: "Concept", date: "Q3 2024", completed: true, amount: 50000 },
      { title: "Design", date: "Q4 2024", completed: true, amount: 80000 },
      { title: "Prototype", date: "Q1 2025", completed: false, amount: 120000 },
      { title: "Production", date: "Q2 2025", completed: false, amount: 150000 },
    ],
    specs: {
      "Анализируемых параметров": "50+",
      "Вес": "12 кг",
      "Автономность": "8 часов",
      "Срок службы": "7 лет",
      "Кейс": "Pelican Case",
      "Питание": "Li-ion 500Wh"
    },
    features: [
      "UV-Vis спектрофотометр",
      "Микробиологический анализ",
      "GPS привязка всех данных",
      "Offline работа 7 дней",
      "Синхронизация с облаком",
      "Защита IP67"
    ],
    roi: {
      year1: 14,
      year2: 20,
      year3: 22,
      year4: 19,
      year5: 16
    },
    esg: {
      waterSaved: "15,000 м³/год",
      co2Avoided: "3 тонны/год",
      communities: 25
    },
    documents: [
      { name: "Product Overview", type: "PDF", size: "1.1 MB" },
    ]
  },
  "leak-detection-network": {
    id: "leak-detection-network",
    name: "Leak Detection Network",
    subtitle: "Сеть акустических датчиков",
    category: "IoT / Infrastructure",
    status: "active",
    description: `Сеть акустических датчиков для обнаружения утечек в трубопроводах. 
    Точность локализации до 10 метров.`,
    longDescription: `Mesh-сеть датчиков использует акустические сигнатуры для 
    обнаружения утечек. AI классифицирует тип утечки и предсказывает развитие.`,
    fundingGoal: 600000,
    funded: 290000,
    minStake: 600,
    apy: "13-20%",
    lockPeriod: "12 месяцев",
    riskLevel: "medium",
    backers: 67,
    team: [
      { name: "Roberto Silva", role: "Hardware Engineer", avatar: "RS" },
    ],
    milestones: [
      { title: "Sensor R&D", date: "Q4 2024", completed: true, amount: 100000 },
      { title: "Network Protocol", date: "Q1 2025", completed: true, amount: 90000 },
      { title: "Pilot Network", date: "Q2 2025", completed: false, amount: 200000 },
      { title: "Scale", date: "Q3 2025", completed: false, amount: 210000 },
    ],
    specs: {
      "Покрытие": "10 км",
      "Точность локализации": "±10 м",
      "Время реакции": "<1 мин",
      "Батарея": "5 лет",
      "Сеть": "LoRaWAN mesh",
      "AI": "Edge + Cloud"
    },
    features: [
      "Акустическое обнаружение утечек",
      "LoRaWAN mesh сеть",
      "AI классификация",
      "Интеграция SCADA",
      "Автоматические алерты",
      "Battery 5+ лет"
    ],
    roi: {
      year1: 13,
      year2: 18,
      year3: 20,
      year4: 18,
      year5: 15
    },
    esg: {
      waterSaved: "500,000 м³/год",
      co2Avoided: "100 тонн/год",
      communities: 10
    },
    documents: [
      { name: "Network Architecture", type: "PDF", size: "2.1 MB" },
    ]
  },
  "rural-water-pilot": {
    id: "rural-water-pilot",
    name: "Rural Water Access Pilot",
    subtitle: "Пилотный проект для сельских районов",
    category: "Community / Social",
    status: "fundraising",
    description: `Пилотный проект обеспечения водой сельских районов. 500 установок 
    в 12 странах, более 50,000 человек получат доступ к чистой воде.`,
    longDescription: `Децентрализованные установки очистки воды работают без 
    подключения к электросети благодаря солнечным панелям. Стоимость воды < $50/м³.`,
    fundingGoal: 500000,
    funded: 420000,
    minStake: 100,
    apy: "8-12%",
    lockPeriod: "24 месяца",
    riskLevel: "low",
    backers: 890,
    team: [
      { name: "Amara Okafor", role: "Community Lead", avatar: "AO" },
    ],
    milestones: [
      { title: "Site Selection", date: "Q4 2024", completed: true, amount: 50000 },
      { title: "Local Partnerships", date: "Q1 2025", completed: true, amount: 70000 },
      { title: "Deployment", date: "Q2-Q3 2025", completed: false, amount: 300000 },
      { title: "Monitoring", date: "Q4 2025", completed: false, amount: 80000 },
    ],
    specs: {
      "Установок": "500",
      "Стран": "12",
      "Людей": "50,000+",
      "Стоимость": "< $50/м³",
      "Технология": "Solar RO",
      "Энергия": "Солнечная 100%"
    },
    features: [
      "100% солнечная энергия",
      "Работа без электросети",
      "Локальное обслуживание",
      "Мониторинг качества IoT",
      "Женские кооперативы",
      "Обучение местных операторов"
    ],
    roi: {
      year1: 8,
      year2: 10,
      year3: 12,
      year4: 11,
      year5: 10
    },
    esg: {
      waterSaved: "1,000,000 м³/год",
      co2Avoided: "200 тонн/год",
      communities: 12
    },
    documents: [
      { name: "Impact Report", type: "PDF", size: "3.5 MB" },
      { name: "Deployment Plan", type: "PDF", size: "2.2 MB" },
    ]
  },
  "climate-impact-model": {
    id: "climate-impact-model",
    name: "Climate Impact Analysis",
    subtitle: "Моделирование изменения климата",
    category: "R&D / Science",
    status: "fundraising",
    description: `Моделирование влияния изменения климата на водные ресурсы. 
    Горизонт прогноза 50 лет.`,
    longDescription: `Комбинация IPCC моделей и ML для предсказания влияния 
    климатических изменений на доступность воды. Отчёты для ООН и правительств.`,
    fundingGoal: 1200000,
    funded: 380000,
    minStake: 1500,
    apy: "10-16%",
    lockPeriod: "36 месяцев",
    riskLevel: "high",
    backers: 45,
    team: [
      { name: "Dr. Emma Wilson", role: "Climate Scientist", avatar: "EW" },
    ],
    milestones: [
      { title: "Data Collection", date: "Q1-Q2 2025", completed: false, amount: 200000 },
      { title: "Model Development", date: "Q3-Q4 2025", completed: false, amount: 400000 },
      { title: "Validation", date: "Q1-Q2 2026", completed: false, amount: 300000 },
      { title: "Reports", date: "Q3 2026", completed: false, amount: 300000 },
    ],
    specs: {
      "Горизонт": "50 лет",
      "Точность": "±5%",
      "Модели": "IPCC + ML",
      "Регионы": "Глобально",
      "API": "Да",
      "Отчёты": "ООН, IPCC"
    },
    features: [
      "IPCC модели + ML",
      "ML-прогнозирование",
      "Риск-анализ",
      "Отчёты для ООН",
      "Научные публикации",
      "Открытые данные"
    ],
    roi: {
      year1: 10,
      year2: 12,
      year3: 16,
      year4: 14,
      year5: 12
    },
    esg: {
      waterSaved: "N/A",
      co2Avoided: "N/A",
      communities: 200
    },
    documents: [
      { name: "Research Proposal", type: "PDF", size: "4.2 MB" },
    ]
  },
};

// --- COMPONENTS ---
function MilestoneCard({ milestone, index }: { milestone: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex items-start gap-4 p-4 rounded-xl ${
        milestone.completed ? "bg-emerald-500/10" : "bg-white/5"
      }`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        milestone.completed ? "bg-emerald-500" : "bg-white/10"
      }`}>
        {milestone.completed ? (
          <CheckCircle2 className="w-5 h-5 text-white" />
        ) : (
          <Clock className="w-4 h-4 text-water-200/50" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className={`font-semibold ${milestone.completed ? "text-emerald-400" : "text-white"}`}>
            {milestone.title}
          </h4>
          <span className="text-sm text-water-200/50">{milestone.date}</span>
        </div>
        <div className="text-sm text-water-200/70">{milestone.amount.toLocaleString()} UNITY</div>
      </div>
    </motion.div>
  );
}

function ROIChart({ data }: { data: any }) {
  const years = Object.keys(data);
  const values = Object.values(data) as number[];
  const maxValue = Math.max(...values);

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-cyan-400" />
        Прогноз ROI
      </h3>
      <div className="flex items-end gap-2 h-32">
        {values.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(value / maxValue) * 100}%` }}
              transition={{ delay: index * 0.1 }}
              className="w-full bg-gradient-to-t from-cyan-500/50 to-cyan-500 rounded-t-lg relative group"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition">
                <span className="text-xs text-cyan-400 font-bold">{value}%</span>
              </div>
            </motion.div>
            <span className="text-xs text-water-200/50 mt-2">Год {index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- MAIN PAGE ---
export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const project = projectDetails[projectId];
  const [stakeAmount, setStakeAmount] = useState(1000);

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Проект не найден</h1>
            <Link href="/tokenhub" className="btn-primary">
              Вернуться к списку
            </Link>
          </div>
        </main>
      </>
    );
  }

  const progress = (project.funded / project.fundingGoal) * 100;
  const riskColors: Record<string, string> = {
    low: "text-emerald-400",
    medium: "text-amber-400",
    high: "text-red-400"
  };
  const riskLabels: Record<string, string> = {
    low: "Низкий",
    medium: "Средний",
    high: "Высокий"
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Link */}
          <Link href="/tokenhub" className="inline-flex items-center gap-2 text-water-200/50 hover:text-white transition mb-6">
            <ArrowLeft className="w-4 h-4" />
            Назад к проектам
          </Link>

          {/* Header */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-sm text-cyan-400 font-medium">{project.category}</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{project.name}</h1>
                    <p className="text-lg text-water-200/50">{project.subtitle}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full ${
                    project.status === "active" ? "bg-emerald-500/20 text-emerald-400" :
                    project.status === "fundraising" ? "bg-amber-500/20 text-amber-400" :
                    "bg-blue-500/20 text-blue-400"
                  }`}>
                    {project.status === "active" ? "Активен" : project.status === "fundraising" ? "Сбор средств" : "Завершён"}
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-water-200/80 leading-relaxed">{project.description}</p>
                  <p className="text-water-200/60">{project.longDescription}</p>
                </div>

                {/* Specs */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-white mb-4">Характеристики</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(project.specs).map(([key, value]) => (
                      <div key={key} className="p-4 bg-white/5 rounded-xl">
                        <div className="text-xs text-water-200/50 uppercase">{key}</div>
                        <div className="text-lg font-semibold text-white">{value as string}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-white mb-4">Возможности</h3>
                  <div className="grid gap-2">
                    {project.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-water-200/70">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Investment Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 h-fit sticky top-24"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Gem className="w-5 h-5 text-cyan-400" />
                Инвестировать
              </h3>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-water-200/50">Собрано</span>
                  <span className="text-white">{progress.toFixed(0)}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                  />
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-cyan-400 font-mono">${project.funded.toLocaleString()}</span>
                  <span className="text-water-200/50">${project.fundingGoal.toLocaleString()}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-400">{project.apy}</div>
                  <div className="text-xs text-water-200/50">APY</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className={`text-2xl font-bold ${riskColors[project.riskLevel]}`}>
                    {riskLabels[project.riskLevel]}
                  </div>
                  <div className="text-xs text-water-200/50">Риск</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-water-200/50">Мин. стейк</span>
                  <span className="text-white">{project.minStake.toLocaleString()} UNITY</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-water-200/50">Срок блокировки</span>
                  <span className="text-white">{project.lockPeriod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-water-200/50">Инвесторов</span>
                  <span className="text-white">{project.backers}</span>
                </div>
              </div>

              {/* Stake Input */}
              <div className="mb-6">
                <label className="block text-sm text-water-200/70 mb-2">Сумма стейкинга</label>
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number(e.target.value))}
                  min={project.minStake}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-mono mb-2"
                />
                <input
                  type="range"
                  min={project.minStake}
                  max={100000}
                  step={100}
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              <button className="w-full btn-primary py-4 text-lg font-semibold">
                Застейкать {stakeAmount.toLocaleString()} UNITY
              </button>

              <p className="text-xs text-water-200/50 text-center mt-4">
                Подключите кошелёк для инвестирования
              </p>
            </motion.div>
          </div>

          {/* Milestones & ROI */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Этапы проекта
              </h3>
              <div className="space-y-4">
                {project.milestones.map((milestone: any, index: number) => (
                  <MilestoneCard key={index} milestone={milestone} index={index} />
                ))}
              </div>
            </motion.div>

            <div className="space-y-6">
              <ROIChart data={project.roi} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  ESG-метрики
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-cyan-400">{project.esg.waterSaved}</div>
                    <div className="text-xs text-water-200/50">Воды сохранено</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-400">{project.esg.co2Avoided}</div>
                    <div className="text-xs text-water-200/50">CO₂ избежано</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-amber-400">{project.esg.communities}</div>
                    <div className="text-xs text-water-200/50">Сообществ</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Team & Documents */}
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                Команда
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.team.map((member: any, index: number) => (
                  <div key={index} className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center mb-2">
                      <span className="text-white font-bold">{member.avatar}</span>
                    </div>
                    <div className="font-medium text-white text-sm">{member.name}</div>
                    <div className="text-xs text-water-200/50">{member.role}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                Документы
              </h3>
              <div className="space-y-3">
                {project.documents.map((doc: any, index: number) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white group-hover:text-cyan-400 transition">{doc.name}</div>
                      <div className="text-xs text-water-200/50">{doc.type} • {doc.size}</div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-water-200/50 group-hover:text-cyan-400 transition" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
