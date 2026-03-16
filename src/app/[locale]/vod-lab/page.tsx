"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { 
  Microscope,
  Cpu,
  Wifi,
  Shield,
  CheckCircle2,
  Zap,
  Globe,
  ArrowRight,
  Download,
  ExternalLink,
  Beaker,
  Database,
  Lock,
  Award
} from "lucide-react";
import Link from "next/link";

const specifications = {
  pro: {
    name: "VOD-Lab Pro",
    price: "$13,400",
    description: "Профессиональная лаборатория для стационарного мониторинга с максимальной точностью",
    parameters: "100+",
    verification: "Edge AI + Blockchain",
    deployment: "Station-based",
    specs: [
      { label: "Параметры", value: "100+ показателей" },
      { label: "Точность", value: "±0.1% для pH, ±0.01 NTU" },
      { label: "Производительность", value: "60 образцов/час" },
      { label: "Автоматизация", value: "Полная (24/7)" },
      { label: "Связь", value: "5G, LoRaWAN, Satellite" },
      { label: "Защита", value: "IP68, -40°C до +60°C" },
      { label: "Калибровка", value: "Автоматическая (AI)" },
      { label: "Энергопотребление", value: "150W среднее" },
    ],
    sensors: [
      "Спектрофотометр (UV-VIS-NIR)",
      "Электрохимические сенсоры (pH, ORP, EC)",
      "Турбидиметр лазерный",
      "Флуориметр (algae, бактерии)",
      "Газовые сенсоры (CO2, H2S, CH4)",
      "Тяжелые металлы (ICP-MS подготовка)",
      "Микробиология (PCR-ready)",
    ],
    ai: [
      "Edge AI чип NVIDIA Jetson",
      "Верификация данных на месте",
      "Автоматическая диагностика",
      "Предиктивное обслуживание",
      "Анонимизация данных",
    ]
  },
  node: {
    name: "VOD-Lab Node",
    price: "$8,900",
    description: "Портативная нода для мобильного мониторинга и быстрого развертывания",
    parameters: "50",
    verification: "Automated + Cloud AI",
    deployment: "Portable/Mobile",
    specs: [
      { label: "Параметры", value: "50 ключевых показателей" },
      { label: "Точность", value: "±0.5% для pH, ±0.1 NTU" },
      { label: "Производительность", value: "20 образцов/час" },
      { label: "Автоматизация", value: "Полуавтоматическая" },
      { label: "Связь", value: "4G/5G, WiFi, Bluetooth" },
      { label: "Защита", value: "IP65, -20°C до +50°C" },
      { label: "Калибровка", value: "Картриджная система" },
      { label: "Энергопотребление", value: "50W среднее" },
    ],
    sensors: [
      "Мультиспектральный анализатор",
      "pH/EC/Temp комбинированный",
      "Турбидиметр оптический",
      "Растворенный кислород (DO)",
      "Органические соединения (TOC)",
      "Нитраты/фосфаты (фотометрия)",
    ],
    ai: [
      "ARM Cortex-A78 процессор",
      "Cloud AI верификация",
      "GPS/GLONASS тегирование",
      "Offline режим работы",
      "Мгновенные результаты",
    ]
  }
};

const comparisonData = [
  { feature: "Количество параметров", pro: "100+", node: "50" },
  { feature: "Точность pH", pro: "±0.01", node: "±0.05" },
  { feature: "Турбидиметр", pro: "Лазерный", node: "Оптический" },
  { feature: "Автоматизация", pro: "Полная 24/7", node: "Полуавтомат" },
  { feature: "Связь", pro: "5G + Satellite", node: "4G/5G + WiFi" },
  { feature: "Защита", pro: "IP68", node: "IP65" },
  { feature: "Температурный диапазон", pro: "-40°C..+60°C", node: "-20°C..+50°C" },
  { feature: "Edge AI", pro: "✅ NVIDIA Jetson", node: "☁️ Cloud" },
  { feature: "Вес", pro: "85 kg", node: "12 kg" },
  { feature: "Портативность", pro: "Стационарная", node: "Портативная" },
];

export default function VodLabPage() {
  const [activeTab, setActiveTab] = useState<"pro" | "node">("pro");
  const activeSpec = specifications[activeTab];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-water-500/10 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-water-500/10 text-water-400 mb-6">
                <Microscope className="w-4 h-4" />
                <span className="text-sm font-medium">VOD-Lab Hardware</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Лаборатория будущего
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-water-400 to-cyan-400">
                  для воды
                </span>
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                Edge AI + Blockchain верификация воды в реальном времени. 
                От 50 до 100+ параметров с автоматической калибровкой.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/tokenhub"
                  className="px-8 py-4 bg-water-500 hover:bg-water-600 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  Инвестировать в ноду
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Техническая спецификация
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => setActiveTab("pro")}
                className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                  activeTab === "pro"
                    ? "bg-water-500 text-white"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Microscope className="w-5 h-5" />
                  VOD-Lab Pro
                </div>
                <div className="text-sm opacity-80">$13,400</div>
              </button>
              <button
                onClick={() => setActiveTab("node")}
                className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                  activeTab === "node"
                    ? "bg-cyan-500 text-white"
                    : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Beaker className="w-5 h-5" />
                  VOD-Lab Node
                </div>
                <div className="text-sm opacity-80">$8,900</div>
              </button>
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-12 items-start"
            >
              {/* Product Image/Visualization */}
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-ocean-800 to-ocean-900 border border-white/10 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-water-500/20 to-cyan-500/20 border border-water-500/30 flex items-center justify-center">
                      <Microscope className="w-24 h-24 text-water-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{activeSpec.name}</h3>
                    <p className="text-slate-400 mb-4">{activeSpec.description}</p>
                    <div className="text-3xl font-bold text-water-400">{activeSpec.price}</div>
                  </div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 inline mr-1" />
                  В наличии
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-water-400" />
                    Технические характеристики
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {activeSpec.specs.map((spec, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white/5 rounded-xl border border-white/10"
                      >
                        <div className="text-sm text-slate-400 mb-1">{spec.label}</div>
                        <div className="font-semibold text-white">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Beaker className="w-5 h-5 text-water-400" />
                    Сенсоры и анализаторы
                  </h3>
                  <ul className="space-y-2">
                    {activeSpec.sensors.map((sensor, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-slate-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-water-400" />
                        {sensor}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-water-400" />
                    AI и автоматизация
                  </h3>
                  <ul className="space-y-2">
                    {activeSpec.ai.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-slate-300"
                      >
                        <Zap className="w-4 h-4 text-yellow-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-white/5">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Сравнение моделей
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-6 text-slate-400 font-medium">Характеристика</th>
                    <th className="text-center py-4 px-6 text-water-400 font-semibold">VOD-Lab Pro</th>
                    <th className="text-center py-4 px-6 text-cyan-400 font-semibold">VOD-Lab Node</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-6 text-slate-300">{row.feature}</td>
                      <td className="py-4 px-6 text-center text-white font-medium">{row.pro}</td>
                      <td className="py-4 px-6 text-center text-slate-300">{row.node}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Security & Blockchain */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Безопасность и верификация
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                6 уровней защиты данных от физического сенсора до блокчейна
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: Shield, title: "Physical", desc: "IP68, tamper-proof" },
                { icon: Cpu, title: "Edge", desc: "Local AI verification" },
                { icon: Database, title: "Lab", desc: "Multi-sensor fusion" },
                { icon: Wifi, title: "Network", desc: "Encrypted transmission" },
                { icon: Lock, title: "Consensus", desc: "Peer validation" },
                { icon: Globe, title: "Blockchain", desc: "TON anchoring" },
              ].map((level, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-water-500/10 flex items-center justify-center">
                    <level.icon className="w-6 h-6 text-water-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-1">{level.title}</h4>
                  <p className="text-xs text-slate-400">{level.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-r from-water-500/10 to-cyan-500/10 rounded-3xl p-12 border border-water-500/20">
              <Award className="w-16 h-16 text-water-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Станьте оператором VOD-Lab
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Установите ноду у себя в регионе, получайте доход от верификации данных 
                и участвуйте в глобальной сети мониторинга воды.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/tokenhub"
                  className="px-8 py-4 bg-water-500 hover:bg-water-600 text-white rounded-xl font-semibold transition-colors"
                >
                  Инвестировать сейчас
                </Link>
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Связаться с нами
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
