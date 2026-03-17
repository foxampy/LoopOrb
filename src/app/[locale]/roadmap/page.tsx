'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import {
  Droplets, Globe, TrendingUp, Shield, Zap, Users, Leaf,
  Award, Rocket, Target, Clock, Calendar, DollarSign,
  ArrowRight, CheckCircle, Circle, Play, ExternalLink,
  Building2, Factory, Landmark, Beaker, Microscope,
  Satellite, Wifi, Cpu, Brain, Heart, Handshake,
  ChevronRight, ChevronDown, ChevronUp, Star, Flag,
  MapPin, Box, Layers, Network, Database, Server,
  Home, Ship, Wind, Sun, Waves, Fish, Baby,
  GraduationCap, ShoppingBag, Factory as FactoryIcon,
  LineChart, PieChart, Wallet, Coins, CreditCard,
  Lock, Key, Unlock, Scan, QrCode, Ruler, Weight,
  Gauge, Anchor, Trophy, Medal, Gem, Sparkles,
  Lightbulb, FlaskConical, TestTube, Pill, Stethoscope,
  Utensils, Trees, Mountain, Eye, Radio, Barcode
} from 'lucide-react';

// ============================================================================
// ДАННЫЕ ROADMAP - ПОЛНАЯ ИСТОРИЯ 2003-2028+
// ============================================================================

const roadmapPhases = [
  {
    id: 'foundation',
    name: 'Foundation',
    period: '2003-2020',
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    icon: Building2,
    description: '50+ проектов Culligan по всему миру. Формирование технологического фундамента и партнёрской сети.',
    totalInvestment: '$200M+',
    projectsCount: '50+',
    countries: '12+',
    milestones: [
      {
        year: '2003',
        title: 'Начало пути с Culligan',
        description: 'Оборудование установлено в Ташкентском аквапарке и заводе Nemiroff',
        icon: Droplets,
        projects: [
          { name: 'Water Park Tashkent', location: 'Узбекистан', investment: '7 бассейнов' },
          { name: 'Nemiroff Distillery', location: 'Украина', investment: '63 м³/час' },
        ]
      },
      {
        year: '2004',
        title: 'Расширение в СНГ',
        description: 'Установки в Казахстане, Беларуси, Украине',
        icon: Globe,
        projects: [
          { name: 'Химический завод', location: 'Казахстан', investment: '528 м³/день' },
          { name: 'Водка Хортица', location: 'Украина', investment: 'Top 3 бренда' },
          { name: 'Аэропорт Борисполь', location: 'Украина', investment: '1,500 м³/день' },
        ]
      },
      {
        year: '2005',
        title: 'Государственные объекты',
        description: 'Работа с Администрацией Президента РФ, Газпромом, АЛРОСА',
        icon: Landmark,
        projects: [
          { name: 'Администрация Президента РФ', location: 'Москва', investment: 'Multiple' },
          { name: 'Газпром Headquarters', location: 'Москва', investment: 'Комплекс' },
          { name: 'АЛРОСА', location: 'Якутия', investment: '800 м³/день' },
        ]
      },
      {
        year: '2006',
        title: 'PPP проекты',
        description: 'Станция водоподготовки в Ашхабаде на $200M+',
        icon: DollarSign,
        projects: [
          { name: 'Ashgabat Water Plant', location: 'Туркменистан', investment: '$200M+' },
        ]
      },
      {
        year: '2007-2010',
        title: 'Пищевая промышленность',
        description: 'Оборудование на предприятиях Беларуси и России',
        icon: Factory,
        projects: [
          { name: 'Беловежские сыры', location: 'Беларусь' },
          { name: 'Кобрин', location: 'Беларусь', investment: '25,000 м³/день' },
          { name: 'Молодечно', location: 'Беларусь', investment: '25 м³/день' },
        ]
      },
      {
        year: '2012',
        title: 'Culligan Bel Factory',
        description: 'Завод в Заславле на €60M - второй завод Culligan в Европе',
        icon: Award,
        projects: [
          { name: 'Culligan Bel Factory', location: 'Беларусь', investment: '€60M' },
        ]
      },
      {
        year: '2013',
        title: 'Олимпийское партнёрство',
        description: 'Официальный партнёр НОК Беларуси',
        icon: Star,
        projects: [
          { name: 'НОК Беларуси', location: 'Минск' },
          { name: 'Минск-Арена', location: 'Беларусь' },
        ]
      },
      {
        year: '2015-2016',
        title: 'Tetra Pak Partnership',
        description: 'Water Filtered Station с восстановлением 95-100%',
        icon: Handshake,
        projects: [
          { name: 'Tetra Pak Partnership', location: 'Глобально' },
          { name: 'Mosvodokanal', location: 'Россия', investment: '12 станций' },
        ]
      },
    ],
    metrics: {
      projects: '50+',
      countries: '12+',
      investment: '$200M+',
      capacity: '1M+ м³/день',
    }
  },
  {
    id: 'ecosystem',
    name: 'Ecosystem',
    period: '2021-2025',
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    icon: Network,
    description: 'Концепция VODeco, запуск блокчейна, IoT сенсоры, VOD-Lab прототипы',
    totalInvestment: '$2.8M',
    projectsCount: '16',
    countries: '12',
    milestones: [
      {
        year: '2021',
        title: 'VODeco Foundation',
        description: 'Учреждение фонда для развития экосистемы',
        icon: Flag,
        projects: []
      },
      {
        year: '2023',
        title: 'VOD-Lab Prototype',
        description: 'Первый прототип автоматической лаборатории',
        icon: Microscope,
        projects: [
          { name: 'VOD-Lab v0.1', location: 'Israel' },
        ]
      },
      {
        year: '2024',
        title: 'Polygon Mainnet',
        description: 'Запуск смарт-контрактов в основной сети',
        icon: Lock,
        projects: [
          { name: 'VOD Token', location: 'Blockchain' },
        ]
      },
      {
        year: '2025',
        title: '43 Sensors Online',
        description: 'Глобальная сеть мониторинга запущена',
        icon: Wifi,
        projects: [
          { name: 'IoT Network', location: 'Global' },
          { name: 'VOD-Lab Pro', location: '5 nodes' },
        ]
      },
    ],
    metrics: {
      sensors: '43+',
      projects: '16 R&D',
      labs: '5 nodes',
      countries: '12+',
    }
  },
  {
    id: 'alpha',
    name: 'Alpha',
    period: '2026 Q1-Q2',
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    textColor: 'text-violet-400',
    icon: Rocket,
    description: 'Запуск платформы LoopOrb, токен-сейл, DAO governance, социальные функции',
    totalInvestment: '$5M',
    projectsCount: '24',
    countries: '20',
    milestones: [
      {
        year: '2026 Q1',
        title: 'Platform Launch',
        description: 'Публичный запуск платформы LoopOrb',
        icon: Rocket,
        projects: [
          { name: 'LoopOrb Platform', location: 'Global' },
          { name: 'Token Sale', location: 'Live' },
        ]
      },
      {
        year: '2026 Q1',
        title: 'AquaCell Go/Pro',
        description: 'Старт продаж портативных анализаторов',
        icon: Box,
        projects: [
          { name: 'AquaCell Go', price: '$149' },
          { name: 'AquaCell Pro', price: '$449' },
        ]
      },
      {
        year: '2026 Q2',
        title: 'DAO Social Network',
        description: 'Лента, чаты, группы, геймификация',
        icon: Users,
        projects: [
          { name: 'Feed', status: 'Live' },
          { name: 'Chats', status: 'Live' },
          { name: 'Missions', status: 'Live' },
        ]
      },
      {
        year: '2026 Q2',
        title: 'AI Assistant',
        description: 'VOD AI с интеграцией GPT-4',
        icon: Brain,
        projects: [
          { name: 'VOD AI', status: 'Beta' },
        ]
      },
    ],
    metrics: {
      users: '10,000+',
      tvl: '$5M+',
      holders: '5,000+',
      nodes: '100+',
    }
  },
  {
    id: 'beta',
    name: 'Beta',
    period: '2026 Q3-Q4',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
    icon: Zap,
    description: 'Сеть AquaHome, мобильное приложение, расширения DeFi',
    totalInvestment: '$15M',
    projectsCount: '32',
    countries: '35',
    milestones: [
      {
        year: '2026 Q3',
        title: 'AquaHome Network',
        description: 'Умные фильтры для домов с пассивным доходом',
        icon: Home,
        projects: [
          { name: 'AquaHome Tap', price: '$299' },
          { name: 'AquaHome Pro', price: '$599' },
          { name: 'AquaHome Shower', price: '$499' },
        ]
      },
      {
        year: '2026 Q3',
        title: 'Mobile App',
        description: 'Native iOS/Android приложение',
        icon: Box,
        projects: [
          { name: 'VOD Check', status: 'Live' },
          { name: 'VOD Wallet', status: 'Live' },
        ]
      },
      {
        year: '2026 Q4',
        title: 'DeFi Expansion',
        description: 'Стейкинг, лендинг, кросс-чейн мост',
        icon: Coins,
        projects: [
          { name: 'Staking v2', apr: '15-45%' },
          { name: 'Lending Pool', status: 'Beta' },
          { name: 'Cross-chain Bridge', chains: 'ETH, BSC, ARB' },
        ]
      },
      {
        year: '2026 Q4',
        title: 'NFT Marketplace',
        description: 'Торговля achievement NFT и данными',
        icon: Gem,
        projects: [
          { name: 'NFT Market', status: 'Beta' },
        ]
      },
    ],
    metrics: {
      homes: '50,000+',
      mobile: '100,000+',
      tvl: '$25M+',
      revenue: '$10M/yr',
    }
  },
  {
    id: 'production',
    name: 'Production',
    period: '2027',
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
    textColor: 'text-pink-400',
    icon: TrendingUp,
    description: 'Global expansion, enterprise решения, карбоновые кредиты',
    totalInvestment: '$50M',
    projectsCount: '48',
    countries: '75',
    milestones: [
      {
        year: '2027 Q1',
        title: 'Enterprise Solutions',
        description: 'White-label для правительств и корпораций',
        icon: Building2,
        projects: [
          { name: 'Gov Dashboard', status: 'Live' },
          { name: 'Corporate API', status: 'Live' },
        ]
      },
      {
        year: '2027 Q2',
        title: 'Carbon Credits',
        description: 'Интеграция с Verra, Gold Standard',
        icon: Leaf,
        projects: [
          { name: 'Carbon Market', status: 'Live' },
          { name: 'Verra Integration', status: 'Live' },
        ]
      },
      {
        year: '2027 Q3',
        title: 'Satellite Data',
        description: 'Интеграция данных NASA, ESA спутников',
        icon: Satellite,
        projects: [
          { name: 'NASA API', status: 'Live' },
          { name: 'ESA Copernicus', status: 'Live' },
        ]
      },
      {
        year: '2027 Q4',
        title: 'Global Scale',
        description: '1M+ пользователей, 100K+ устройств',
        icon: Globe,
        projects: [
          { name: '1M Users', status: 'Achieved' },
          { name: '100K Devices', status: 'Achieved' },
        ]
      },
    ],
    metrics: {
      users: '1M+',
      devices: '100K+',
      tvl: '$100M+',
      revenue: '$50M/yr',
    }
  },
  {
    id: 'scale',
    name: 'Scale',
    period: '2028+',
    color: 'from-indigo-500 to-cyan-600',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    textColor: 'text-indigo-400',
    icon: Sparkles,
    description: 'Interplanetary water monitoring, AGI integration, full DAO autonomy',
    totalInvestment: '$200M+',
    projectsCount: '100+',
    countries: '150+',
    milestones: [
      {
        year: '2028',
        title: 'Interplanetary',
        description: 'Мониторинг воды на других планетах',
        icon: Satellite,
        projects: [
          { name: 'Mars Water', status: 'Research' },
          { name: 'Moon Base', status: 'Planning' },
        ]
      },
      {
        year: '2029',
        title: 'AGI Integration',
        description: 'Полная автономность управления через AGI',
        icon: Brain,
        projects: [
          { name: 'VOD AGI', status: 'Research' },
        ]
      },
      {
        year: '2030',
        title: 'Full DAO',
        description: 'Полная децентрализация без核心团队',
        icon: Users,
        projects: [
          { name: 'DAO Autonomy', status: 'Target' },
        ]
      },
    ],
    metrics: {
      users: '10M+',
      planets: '2+',
      tvl: '$1B+',
      revenue: '$500M/yr',
    }
  },
];

// ============================================================================
// PRODUCT DEPENDENCY GRAPH
// ============================================================================

const productDependencies = [
  {
    id: 'aquacell-go',
    name: 'AquaCell Go',
    category: 'B2C',
    deps: [],
    x: 10,
    y: 20,
  },
  {
    id: 'aquacell-pro',
    name: 'AquaCell Pro',
    category: 'B2C',
    deps: ['aquacell-go'],
    x: 30,
    y: 20,
  },
  {
    id: 'aquacell-lab',
    name: 'AquaCell Lab',
    category: 'B2C',
    deps: ['aquacell-pro'],
    x: 50,
    y: 20,
  },
  {
    id: 'aquapure',
    name: 'AquaPure Kit',
    category: 'B2C',
    deps: ['aquacell-go'],
    x: 20,
    y: 40,
  },
  {
    id: 'aquahome-tap',
    name: 'AquaHome Tap',
    category: 'B2C',
    deps: ['aquacell-pro'],
    x: 40,
    y: 40,
  },
  {
    id: 'aquahome-pro',
    name: 'AquaHome Pro',
    category: 'B2C',
    deps: ['aquahome-tap'],
    x: 60,
    y: 40,
  },
  {
    id: 'platform',
    name: 'LoopOrb Platform',
    category: 'Core',
    deps: [],
    x: 50,
    y: 60,
  },
  {
    id: 'dao',
    name: 'DAO Governance',
    category: 'Core',
    deps: ['platform'],
    x: 50,
    y: 80,
  },
  {
    id: 'token',
    name: 'VOD Token',
    category: 'Core',
    deps: ['platform'],
    x: 30,
    y: 80,
  },
  {
    id: 'defi',
    name: 'DeFi Protocol',
    category: 'Core',
    deps: ['token', 'dao'],
    x: 50,
    y: 95,
  },
];

// ============================================================================
// INVESTOR OFFER SECTION
// ============================================================================

const investorOffer = {
  tokenSale: {
    softCap: '$2M',
    hardCap: '$5M',
    tokenPrice: '$0.05',
    minInvestment: '$100',
    acceptedCurrencies: ['USDT', 'USDC', 'ETH', 'BTC'],
  },
  vesting: {
    cliff: '3 месяца',
    vesting: '12 месяцев',
    release: '20% TGE, затем квартально',
  },
  utilities: [
    { title: 'Governance', description: 'Голосование в DAO' },
    { title: 'Staking', description: 'До 45% APR' },
    { title: 'Data Access', description: 'Доступ к данным' },
    { title: 'Revenue Share', description: 'Доля от доходов' },
  ],
  roadmap: [
    { quarter: 'Q1 2026', event: 'Token Sale', status: 'upcoming' },
    { quarter: 'Q2 2026', event: 'TGE + Listings', status: 'upcoming' },
    { quarter: 'Q3 2026', event: 'Staking v2', status: 'upcoming' },
    { quarter: 'Q4 2026', event: 'DeFi Launch', status: 'upcoming' },
  ],
};

// ============================================================================
// КОМПОНЕНТЫ
// ============================================================================

function PhaseCard({ phase, index, isExpanded, onToggle }: {
  phase: typeof roadmapPhases[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative border rounded-2xl overflow-hidden transition-all duration-500 ${phase.borderColor} ${phase.bgColor}`}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center`}>
            <phase.icon className="w-7 h-7 text-white" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold text-white">{phase.name}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${phase.bgColor} ${phase.textColor} border ${phase.borderColor}`}>
                {phase.period}
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-1">{phase.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <div className="text-2xl font-bold text-white">{phase.totalInvestment}</div>
            <div className="text-slate-400 text-sm">Инвестиции</div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-slate-400" />
          ) : (
            <ChevronDown className="w-6 h-6 text-slate-400" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-white/10"
        >
          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/5">
            {Object.entries(phase.metrics).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className={`text-3xl font-bold ${phase.textColor}`}>{value}</div>
                <div className="text-slate-400 text-sm capitalize">{key}</div>
              </div>
            ))}
          </div>

          {/* Milestones */}
          <div className="p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Ключевые вехи</h4>
            <div className="space-y-4">
              {phase.milestones.map((milestone, mIndex) => (
                <div key={mIndex} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center flex-shrink-0`}>
                      <milestone.icon className="w-5 h-5 text-white" />
                    </div>
                    {mIndex < phase.milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-white/10 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-bold ${phase.textColor}`}>{milestone.year}</span>
                      <span className="text-white font-medium">{milestone.title}</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{milestone.description}</p>
                    {milestone.projects.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {milestone.projects.map((project, pIndex) => (
                          <span
                            key={pIndex}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-slate-300"
                          >
                            {project.name} {project.price && <span className={phase.textColor}>({project.price})</span>}
                            {project.investment && <span className={phase.textColor}>({project.investment})</span>}
                            {project.status && <span className={phase.textColor}>({project.status})</span>}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function DependencyGraph() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-b from-slate-900/50 to-slate-800/50 rounded-2xl border border-white/10 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {productDependencies.map((product) =>
          product.deps.map((depId) => {
            const dep = productDependencies.find((p) => p.id === depId);
            if (!dep) return null;
            return (
              <line
                key={`${product.id}-${depId}`}
                x1={`${dep.x}%`}
                y1={`${dep.y}%`}
                x2={`${product.x}%`}
                y2={`${product.y}%`}
                stroke="rgba(100,116,139,0.3)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            );
          })
        )}
      </svg>

      {/* Nodes */}
      {productDependencies.map((product) => (
        <motion.button
          key={product.id}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setSelectedNode(selectedNode === product.id ? null : product.id)}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-xl border transition-all ${
            selectedNode === product.id
              ? 'bg-cyan-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
              : 'bg-slate-800/80 border-white/10 hover:border-white/20'
          }`}
          style={{ left: `${product.x}%`, top: `${product.y}%` }}
        >
          <div className="text-white font-medium text-sm">{product.name}</div>
          <div className="text-slate-400 text-xs">{product.category}</div>
        </motion.button>
      ))}

      {/* Selected Node Info */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur border border-white/10 rounded-xl p-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-white font-semibold">
                {productDependencies.find((p) => p.id === selectedNode)?.name}
              </h4>
              <p className="text-slate-400 text-sm mt-1">
                Зависит от:{' '}
                {productDependencies.find((p) => p.id === selectedNode)?.deps.length === 0
                  ? 'Нет (базовый продукт)'
                  : productDependencies.find((p) => p.id === selectedNode)?.deps.join(', ')}
              </p>
            </div>
            <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white">
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function InvestorOfferSection() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Token Sale Info */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Coins className="w-7 h-7 text-cyan-400" />
          Token Sale Details
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-slate-400">Soft Cap</span>
            <span className="text-white font-bold">{investorOffer.tokenSale.softCap}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-slate-400">Hard Cap</span>
            <span className="text-white font-bold">{investorOffer.tokenSale.hardCap}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-slate-400">Token Price</span>
            <span className="text-cyan-400 font-bold">{investorOffer.tokenSale.tokenPrice}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/10">
            <span className="text-slate-400">Min Investment</span>
            <span className="text-white font-bold">{investorOffer.tokenSale.minInvestment}</span>
          </div>
          <div className="py-3">
            <span className="text-slate-400 block mb-2">Accepted Currencies</span>
            <div className="flex gap-2">
              {investorOffer.tokenSale.acceptedCurrencies.map((currency) => (
                <span key={currency} className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium">
                  {currency}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Link
          href="/token-sale"
          className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl transition-all hover:scale-105"
        >
          Invest Now
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Vesting & Utilities */}
      <div className="space-y-6">
        {/* Vesting */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-violet-400" />
            Vesting Schedule
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Cliff Period</span>
              <span className="text-white font-medium">{investorOffer.vesting.cliff}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Vesting Period</span>
              <span className="text-white font-medium">{investorOffer.vesting.vesting}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Release Schedule</span>
              <span className="text-white font-medium">{investorOffer.vesting.release}</span>
            </div>
          </div>
        </div>

        {/* Utilities */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-emerald-400" />
            Token Utilities
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {investorOffer.utilities.map((utility) => (
              <div key={utility.title} className="p-3 bg-slate-800/50 rounded-xl">
                <div className="text-white font-medium text-sm">{utility.title}</div>
                <div className="text-slate-400 text-xs">{utility.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-400" />
          Investor Roadmap
        </h4>
        <div className="grid md:grid-cols-4 gap-4">
          {investorOffer.roadmap.map((item, index) => (
            <div key={index} className="text-center p-4 bg-slate-800/50 rounded-xl">
              <div className="text-amber-400 font-bold text-sm mb-1">{item.quarter}</div>
              <div className="text-white font-medium">{item.event}</div>
              <div className={`text-xs mt-2 px-2 py-1 rounded-full inline-block ${
                item.status === 'upcoming' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {item.status === 'upcoming' ? 'Upcoming' : 'Completed'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function RoadmapPage() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>('foundation');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <>
      <Navbar />
      <main ref={containerRef} className="min-h-screen pt-20 pb-8 bg-gradient-to-b from-[#0a1628] via-[#0d1f35] to-[#0a1628]">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <motion.div
            style={{ opacity, scale }}
            className="max-w-7xl mx-auto relative z-10"
          >
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6"
              >
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400 font-medium">2003 - 2028+</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                Полная <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Дорожная Карта</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-400 max-w-3xl mx-auto mb-8"
              >
                От 50+ проектов Culligan до межпланетного мониторинга воды.
                25 лет опыта, трансформирующегося в глобальную экосистему.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link href="/token-sale" className="btn-primary inline-flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Инвестировать
                </Link>
                <Link href="/offer" className="btn-secondary inline-flex items-center gap-2">
                  <Handshake className="w-5 h-5" />
                  Offer для инвесторов
                </Link>
                <Link href="/whitepaper" className="btn-secondary inline-flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Whitepaper
                </Link>
              </motion.div>
            </div>

            {/* Stats Overview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
            >
              {[
                { value: '25+', label: 'Лет опыта', icon: Clock },
                { value: '50+', label: 'Проектов Culligan', icon: Building2 },
                { value: '$200M+', label: 'Реализовано', icon: DollarSign },
                { value: '2028+', label: 'План развития', icon: Rocket },
              ].map((stat, index) => (
                <div key={index} className="glass-card p-6 text-center">
                  <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Timeline Phases */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Фазы Развития
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Шесть ключевых фаз от фундамента до межпланетного масштаба
              </p>
            </motion.div>

            <div className="space-y-4">
              {roadmapPhases.map((phase, index) => (
                <PhaseCard
                  key={phase.id}
                  phase={phase}
                  index={index}
                  isExpanded={expandedPhase === phase.id}
                  onToggle={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Product Dependency Graph */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Граф Зависимостей Продуктов
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Интерактивная визуализация взаимосвязей между продуктами экосистемы
              </p>
            </motion.div>

            <DependencyGraph />

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {[
                { title: 'B2C Products', count: '8', desc: 'AquaCell, AquaPure, AquaHome' },
                { title: 'B2B Products', count: '4', desc: 'AquaFarm, AquaPool, AquaIndustrial' },
                { title: 'Core Platform', count: '4', desc: 'LoopOrb, DAO, Token, DeFi' },
              ].map((item) => (
                <div key={item.title} className="glass-card p-6 text-center">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">{item.count}</div>
                  <div className="text-white font-semibold mb-1">{item.title}</div>
                  <div className="text-slate-400 text-sm">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Investor Offer Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Предложение для Инвесторов
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Прозрачные условия инвестирования с четким графиком разблокировки токенов
              </p>
            </motion.div>

            <InvestorOfferSection />
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/30 rounded-3xl p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                Готовы стать частью будущего?
              </h2>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                Присоединяйтесь к 1,247+ инвесторам, которые уже верят в экосистему VODeco.
                Токен-сейл завершается скоро.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/token-sale"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl transition-all hover:scale-105"
                >
                  <Target className="w-5 h-5" />
                  Участвовать в Token Sale
                </Link>
                <Link
                  href="/offer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-all"
                >
                  <Handshake className="w-5 h-5" />
                  Investor Offer
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
