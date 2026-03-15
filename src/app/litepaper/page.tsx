"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Droplets, Shield, Database, Globe, Cpu, Award,
  FileText, ArrowRight, ChevronRight, Layers, Lock,
  Users, TrendingUp, Beaker, Radio, Target
} from "lucide-react";

const sections = [
  { id: "overview", title: "Обзор", icon: Globe },
  { id: "architecture", title: "4 уровня архитектуры", icon: Layers },
  { id: "tokens", title: "Токеномика", icon: TrendingUp },
  { id: "vod-lab", title: "VOD-Lab Pro", icon: Beaker },
  { id: "security", title: "Безопасность", icon: Lock },
  { id: "roadmap", title: "Роадмап", icon: Target },
];

export default function LitepaperPage() {
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
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400 font-medium">Litepaper</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                VODeco: <span className="gradient-text">Вода как экономика</span>
              </h1>
              <p className="text-xl text-water-200/70 max-w-3xl mx-auto mb-8">
                Многоуровневая экосистема мониторинга воды, объединяющая IoT, блокчейн 
                и автоматические лаборатории для создания устойчивой водной экономики.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/tokenhub" className="btn-primary flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Инвестировать
                </Link>
                <a href="/docs/litepaper.pdf" className="btn-secondary flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Скачать PDF
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 glass-card p-4">
                <h3 className="font-bold text-white mb-4">Содержание</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-2 p-2 rounded-lg text-water-200/70 hover:text-cyan-400 hover:bg-white/5 transition"
                    >
                      <section.icon className="w-4 h-4" />
                      <span className="text-sm">{section.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-16">
              {/* Overview */}
              <section id="overview">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Globe className="w-8 h-8 text-cyan-400" />
                  Принцип: «Прозрачность через взаимодействие»
                </h2>
                <p className="text-water-200/80 text-lg leading-relaxed mb-6">
                  Каждый участник видит только то, что нужно для его роли, но все данные связаны 
                  в единую цепочку доверия. Гражданин проверяет воду → Оператор видит данные → 
                  Государство контролирует → Инвестор финансирует → Учёный исследует → 
                  Все вместе голосуют в DAO.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="glass-card p-6">
                    <h4 className="font-bold text-white mb-2">Проблема</h4>
                    <ul className="space-y-2 text-water-200/70">
                      <li>• 2 млрд человек без доступа к чистой воде</li>
                      <li>• 40% мирового населения страдает от дефицита воды</li>
                      <li>• Непрозрачность управления водными ресурсами</li>
                      <li>• Устаревшая инфраструктура водоканалов</li>
                    </ul>
                  </div>
                  <div className="glass-card p-6">
                    <h4 className="font-bold text-white mb-2">Решение</h4>
                    <ul className="space-y-2 text-water-200/70">
                      <li>• Автоматические лаборатории VOD-Lab</li>
                      <li>• Блокчейн-верификация всех данных</li>
                      <li>• Токенизация водных ресурсов (VOD)</li>
                      <li>• DAO-управление инфраструктурой</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Architecture */}
              <section id="architecture">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Layers className="w-8 h-8 text-cyan-400" />
                  4 уровня экосистемы
                </h2>
                
                <div className="space-y-6">
                  {/* Level 1 */}
                  <div className="glass-card p-6 border-l-4 border-cyan-500">
                    <h3 className="text-xl font-bold text-white mb-3">Уровень 1: Физика</h3>
                    <p className="text-water-200/70 mb-4">
                      Реальные активы — без этого уровня нет эмиссии токенов, нет доверия, нет экосистемы.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["Water Objects (реки, озёра)", "Infrastructure (очистные)", "Storage Facilities", "Legal Contracts"].map((item) => (
                        <div key={item} className="p-3 bg-white/5 rounded-lg text-sm text-water-200/80">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Level 2 */}
                  <div className="glass-card p-6 border-l-4 border-emerald-500">
                    <h3 className="text-xl font-bold text-white mb-3">Уровень 2: Данные</h3>
                    <p className="text-water-200/70 mb-4">
                      Единый источник истины — все аудитории работают с одними и теми же верифицированными данными.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["IoT Network", "Satellite Data", "Citizen Reports", "Lab Results"].map((item) => (
                        <div key={item} className="p-3 bg-white/5 rounded-lg text-sm text-water-200/80">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Level 3 */}
                  <div className="glass-card p-6 border-l-4 border-amber-500">
                    <h3 className="text-xl font-bold text-white mb-3">Уровень 3: Протоколы</h3>
                    <p className="text-water-200/70 mb-4">
                      Общие механики, обеспечивающие доверие между уровнями.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["Data Anchoring", "Identity (DID/SBT)", "Economic Engine", "DAO Core"].map((item) => (
                        <div key={item} className="p-3 bg-white/5 rounded-lg text-sm text-water-200/80">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Level 4 */}
                  <div className="glass-card p-6 border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold text-white mb-3">Уровень 4: Приложения</h3>
                    <p className="text-water-200/70 mb-4">
                      Каждая аудитория имеет свой вход, но работает с общими данными.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["VOD Citizen", "VOD Operator", "VOD Government", "VOD Investor"].map((item) => (
                        <div key={item} className="p-3 bg-white/5 rounded-lg text-sm text-water-200/80">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Tokenomics */}
              <section id="tokens">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-cyan-400" />
                  Токеномика
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="glass-card p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <Droplets className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">VOD</h3>
                    <p className="text-sm text-cyan-400 mb-2">Commodity Token</p>
                    <p className="text-sm text-water-200/70">
                      1 VOD = 1 м³ верифицированной воды. Эмиссия только при верификации физического объёма.
                    </p>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">VODeco</h3>
                    <p className="text-sm text-emerald-400 mb-2">Governance Token</p>
                    <p className="text-sm text-water-200/70">
                      Управление DAO. Фиксированная эмиссия 1 млрд. Право голоса и валидации.
                    </p>
                  </div>
                  <div className="glass-card p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Award className="w-8 h-8 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">VODcredit</h3>
                    <p className="text-sm text-amber-400 mb-2">Reputation SBT</p>
                    <p className="text-sm text-water-200/70">
                      Нетрансферабельный токен репутации. Начисляется за вклад в экосистему.
                    </p>
                  </div>
                </div>
              </section>

              {/* VOD-Lab */}
              <section id="vod-lab">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Beaker className="w-8 h-8 text-cyan-400" />
                  VOD-Lab Pro
                </h2>
                <div className="glass-card p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">Техническая спецификация</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-cyan-400 mb-2">Компоненты</h4>
                      <ul className="space-y-2 text-water-200/70 text-sm">
                        <li>• Корпус IP68, -40°C до +60°C — $3,000</li>
                        <li>• Спектрофотометр UV-Vis-NIR — $5,000</li>
                        <li>• Картриджная система (12 слотов) — $2,000</li>
                        <li>• Edge AI (NVIDIA Jetson) — $1,500</li>
                        <li>• Блокчейн-нода VOD Chain — $500</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-cyan-400 mb-2">Параметры анализа</h4>
                      <ul className="space-y-2 text-water-200/70 text-sm">
                        <li>• Физические: pH, температура, мутность (100+)</li>
                        <li>• Металлы: Pb, Cd, Hg, As, Fe, Mn, Cu, Zn</li>
                        <li>• Органика: ПАВ, фенолы, нефтепродукты</li>
                        <li>• Микробиология: E.coli, колиформы, легионелла</li>
                        <li>• Радиология: α, β, γ-активность</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-cyan-500/10 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Общая стоимость узла:</span>
                      <span className="text-2xl font-bold text-cyan-400">$13,400</span>
                    </div>
                    <p className="text-sm text-water-200/50 mt-1">OPEX: ~$800/мес (реагенты, связь, обслуживание)</p>
                  </div>
                </div>
              </section>

              {/* Security */}
              <section id="security">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Lock className="w-8 h-8 text-cyan-400" />
                  Безопасность
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "Физическая", desc: "IP68, антивандальный корпус, видеонаблюдение 360°" },
                    { title: "Сенсорная", desc: "Edge Security Module, AI-проверка аномалий, HSM-подпись" },
                    { title: "Лабораторная", desc: "Изолированная среда выполнения, Trusted Execution" },
                    { title: "Сетевая", desc: "Mesh-сеть, WireGuard VPN, LoRaWAN с шифрованием" },
                    { title: "Блокчейн", desc: "PoA + PoS + PoH гибрид, 2/3 подписи валидаторов" },
                    { title: "Криптографическая", desc: "AES-256-GCM, ECDSA secp256k1, SHA-3-256" },
                  ].map((item) => (
                    <div key={item.title} className="glass-card p-4">
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-water-200/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Roadmap */}
              <section id="roadmap">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Target className="w-8 h-8 text-cyan-400" />
                  Роадмап
                </h2>
                <div className="space-y-6">
                  {[
                    { phase: "Фаза 0", title: "Фундамент", time: "Месяцы 1-6", items: ["1 регион (Узбекистан)", "1 город (Самарканд)", "3-5 объектов", "VOD Citizen MVP"] },
                    { phase: "Фаза 1", title: "Прототип", time: "6 месяцев", items: ["5 лабораторных узлов", "B2C + B2B + B2G интеграция", "Тестовая эмиссия VOD"] },
                    { phase: "Фаза 2", title: "Мультиаудиторность", time: "12 месяцев", items: ["50 узлов", "TokenHub для инвесторов", "Межгосударственный пилот"] },
                    { phase: "Фаза 3", title: "Зрелая экосистема", time: "24 месяца", items: ["500+ узлов", "Все 6 аудиторий", "Международные стандарты"] },
                  ].map((phase) => (
                    <div key={phase.phase} className="glass-card p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-400 text-sm font-semibold">
                          {phase.phase}
                        </div>
                        <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                        <span className="text-water-200/50 text-sm ml-auto">{phase.time}</span>
                      </div>
                      <ul className="grid md:grid-cols-3 gap-3">
                        {phase.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-water-200/70">
                            <ChevronRight className="w-4 h-4 text-cyan-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <section className="glass-card p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Присоединяйтесь к экосистеме</h3>
                <p className="text-water-200/70 mb-6">
                  Станьте частью глобального решения проблемы водных ресурсов
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/tokenhub" className="btn-primary">
                    Инвестировать
                  </Link>
                  <Link href="/projecthub" className="btn-secondary">
                    Исследовать проекты
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
