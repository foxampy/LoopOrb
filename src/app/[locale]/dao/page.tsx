"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Vote,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  TrendingUp,
  Shield,
  ArrowRight,
  Loader2,
  Gavel,
  Target,
  BarChart3,
  Lock,
  AlertCircle,
  FileText,
  Sparkles,
  Crown,
  Info,
  MessageSquare,
  Share2,
  Bookmark,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Wallet,
  Award,
  Calendar,
  User,
  Zap,
  FolderOpen,
  Search,
  Filter,
  PieChart,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  HandCoins,
  History,
  Send,
  X,
  Copy,
  Twitter,
  Telegram,
  Link as LinkIcon,
  UserCheck,
  Scale,
  Building,
  GitBranch,
} from "lucide-react";

// ==================== INTERFACES ====================

interface Proposal {
  id: string;
  number: number;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  status: "active" | "voting" | "passed" | "rejected" | "executed" | "draft";
  level: "L1_CONSTITUTIONAL" | "L2_ECONOMIC" | "L3_PROJECTS" | "L4_OPERATIONAL";
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  votesCount: number;
  quorumRequired: number;
  quorumCurrent: number;
  author: {
    name: string;
    avatar?: string;
    reputation: number;
    role: string;
  };
  comments: number;
  shares: number;
  bookmarks: number;
  tags: string[];
  relatedProject?: {
    name: string;
    slug: string;
  };
  executionPlan?: string;
  votingPowerRequired?: number;
  deposit?: number;
  actions?: ProposalAction[];
}

interface ProposalAction {
  id: string;
  type: "transfer" | "parameter_change" | "grant" | "partnership";
  description: string;
  target?: string;
  amount?: number;
  data?: string;
}

interface VoteRecord {
  id: string;
  voter: string;
  vote: "for" | "against" | "abstain";
  votingPower: number;
  timestamp: string;
  weight: {
    balance: number;
    reputation: number;
    role: number;
  };
}

interface TreasuryData {
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  totalRevenue: number;
  totalSpent: number;
  transactions: TreasuryTransaction[];
  allocation: TreasuryAllocation[];
}

interface TreasuryTransaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
  relatedProposal?: string;
}

interface TreasuryAllocation {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

interface DaoStats {
  totalProposals: number;
  activeProposals: number;
  passedProposals: number;
  rejectedProposals: number;
  totalParticipants: number;
  totalVotingPower: number;
  userVotingPower: number;
  userStaked: number;
  userReputation: number;
  userRole: string;
  delegatedVotes: number;
}

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
}

// ==================== CONSTANTS ====================

const LEVEL_CONFIG = {
  L1_CONSTITUTIONAL: {
    label: "Конституционный",
    shortLabel: "L1",
    color: "text-red-400",
    bg: "bg-red-500/20",
    border: "border-red-500/30",
    gradient: "from-red-500 to-rose-500",
    desc: "Изменения базовых правил DAO, конституции",
    quorum: 66,
    approval: 66,
    duration: 30,
    minTokens: 10000,
    deposit: 5000,
    icon: Scale,
  },
  L2_ECONOMIC: {
    label: "Экономический",
    shortLabel: "L2",
    color: "text-yellow-400",
    bg: "bg-yellow-500/20",
    border: "border-yellow-500/30",
    gradient: "from-yellow-500 to-amber-500",
    desc: "Параметры токеномики, эмиссия, ставки",
    quorum: 51,
    approval: 51,
    duration: 7,
    minTokens: 5000,
    deposit: 2000,
    icon: DollarSign,
  },
  L3_PROJECTS: {
    label: "Проектный",
    shortLabel: "L3",
    color: "text-green-400",
    bg: "bg-green-500/20",
    border: "border-green-500/30",
    gradient: "from-green-500 to-emerald-500",
    desc: "Финансирование проектов, инвестиции",
    quorum: 40,
    approval: 51,
    duration: 14,
    minTokens: 2000,
    deposit: 1000,
    icon: Target,
  },
  L4_OPERATIONAL: {
    label: "Операционный",
    shortLabel: "L4",
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    border: "border-blue-500/30",
    gradient: "from-blue-500 to-cyan-500",
    desc: "Гранты, делегаты, операционные вопросы",
    quorum: 30,
    approval: 51,
    duration: 3,
    minTokens: 1000,
    deposit: 500,
    icon: HandCoins,
  },
};

const STATUS_CONFIG = {
  draft: { label: "Черновик", color: "text-slate-400", bg: "bg-slate-500/20", icon: FileText },
  active: { label: "Активно", color: "text-cyan-400", bg: "bg-cyan-500/20", icon: Clock },
  voting: { label: "Голосование", color: "text-purple-400", bg: "bg-purple-500/20", icon: Vote },
  passed: { label: "Принят", color: "text-green-400", bg: "bg-green-500/20", icon: CheckCircle },
  rejected: { label: "Отклонен", color: "text-red-400", bg: "bg-red-500/20", icon: XCircle },
  executed: { label: "Исполнен", color: "text-emerald-400", bg: "bg-emerald-500/20", icon: CheckCircle },
};

const CATEGORIES = [
  { id: "all", label: "Все", icon: Vote },
  { id: "active", label: "Активные", icon: Clock },
  { id: "voting", label: "Голосование", icon: Vote },
  { id: "passed", label: "Принятые", icon: CheckCircle },
  { id: "rejected", label: "Отклоненные", icon: XCircle },
];

const ACTION_TYPES = {
  transfer: { label: "Трансфер средств", icon: ArrowRight },
  parameter_change: { label: "Изменение параметров", icon: Scale },
  grant: { label: "Грант", icon: HandCoins },
  partnership: { label: "Партнёрство", icon: Building },
};

// ==================== MOCK DATA ====================

const mockProposals: Proposal[] = [
  {
    id: "dao-1",
    number: 1,
    title: "Изменение конституции DAO: введение совета старейшин",
    description: "Предлагается создать совет старейшин из 7 наиболее активных участников для ускорения принятия решений",
    fullDescription: "Совет старейшин будет состоять из 7 участников с наибольшей репутацией. Совет получит право вето на предложения L3 и L4 уровня, а также сможет инициировать срочные голосования. Срок полномочий — 6 месяцев с возможностью переизбрания.",
    category: "governance",
    status: "voting",
    level: "L1_CONSTITUTIONAL",
    votesFor: 1850000,
    votesAgainst: 420000,
    votesAbstain: 130000,
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    votesCount: 2400000,
    quorumRequired: 66,
    quorumCurrent: 72,
    author: {
      name: "Alexey_VOD",
      reputation: 25000,
      role: "Founder",
    },
    comments: 156,
    shares: 89,
    bookmarks: 342,
    tags: ["управление", "совет", "конституция"],
    deposit: 5000,
    actions: [
      {
        id: "a1",
        type: "parameter_change",
        description: "Создание совета старейшин в конституции DAO",
        data: "council_size=7,term_months=6,veto_power=true",
      },
    ],
  },
  {
    id: "dao-2",
    number: 2,
    title: "Корректировка эмиссии токенов: снижение инфляции до 8%",
    description: "Предлагается снизить годовую инфляцию UNITY с 12% до 8% для повышения устойчивости экономики",
    fullDescription: "Текущая модель эмиссии предусматривает 12% годовых. Снижение до 8% уменьшит давление на цену токена и повысит привлекательность для долгосрочных держателей. Экономия составит около 2M UNITY ежегодно, которые будут направлены в казначейство.",
    category: "economics",
    status: "active",
    level: "L2_ECONOMIC",
    votesFor: 980000,
    votesAgainst: 350000,
    votesAbstain: 70000,
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    votesCount: 1400000,
    quorumRequired: 51,
    quorumCurrent: 56,
    author: {
      name: "EcoEconomist",
      reputation: 12000,
      role: "Economist",
    },
    comments: 78,
    shares: 45,
    bookmarks: 189,
    tags: ["токеномика", "эмиссия", "инфляция"],
    deposit: 2000,
    actions: [
      {
        id: "a2",
        type: "parameter_change",
        description: "Изменение параметра annual_inflation_rate с 12% на 8%",
        data: "annual_inflation_rate=0.08",
      },
    ],
  },
  {
    id: "dao-3",
    number: 3,
    title: "Финансирование проекта очистки реки Амударья",
    description: "Выделение 500,000 UNITY на проект по очистке верховьев реки Амударья от промышленных отходов",
    fullDescription: "Проект включает установку 15 фильтрационных станций вдоль промышленной зоны, мониторинг качества воды в реальном времени и восстановление прибрежной экосистемы. Ожидаемое улучшение качества воды — 40% в течение 2 лет. Проект реализуется совместно с Министерством экологии Узбекистана.",
    category: "funding",
    status: "active",
    level: "L3_PROJECTS",
    votesFor: 1250000,
    votesAgainst: 180000,
    votesAbstain: 95000,
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    votesCount: 1525000,
    quorumRequired: 40,
    quorumCurrent: 61,
    author: {
      name: "EcoFoundation_UZ",
      reputation: 18000,
      role: "Partner",
    },
    comments: 92,
    shares: 67,
    bookmarks: 278,
    tags: ["экология", "финансирование", "реки", "Узбекистан"],
    relatedProject: {
      name: "Amu Darya Cleanup",
      slug: "amu-darya-cleanup",
    },
    deposit: 1000,
    actions: [
      {
        id: "a3",
        type: "transfer",
        description: "Трансфер 500,000 UNITY на счёт проекта",
        target: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        amount: 500000,
      },
    ],
  },
  {
    id: "dao-4",
    number: 4,
    title: "Грант для VOD-Lab Israel на исследование опреснения",
    description: "Предоставление гранта в размере 150,000 UNITY для лаборатории VOD-Lab Israel",
    fullDescription: "Грант будет направлен на исследование новых мембранных технологий опреснения воды с использованием наноматериалов. Ожидаемые результаты: прототип установки, патенты, публикация исследований в открытом доступе для сообщества LoopOrb.",
    category: "grants",
    status: "passed",
    level: "L4_OPERATIONAL",
    votesFor: 890000,
    votesAgainst: 450000,
    votesAbstain: 65000,
    startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
    votesCount: 1400000,
    quorumRequired: 30,
    quorumCurrent: 56,
    author: {
      name: "VOD_Lab_Team",
      reputation: 9500,
      role: "Researcher",
    },
    comments: 45,
    shares: 34,
    bookmarks: 156,
    tags: ["грант", "исследования", "опреснение", "Israel"],
    deposit: 500,
    actions: [
      {
        id: "a4",
        type: "grant",
        description: "Грант 150,000 UNITY для VOD-Lab Israel",
        target: "0x8ba1f109551bD432803012645Hac136c22C501e",
        amount: 150000,
      },
    ],
  },
  {
    id: "dao-5",
    number: 5,
    title: "Партнёрство с UN Water для глобального масштабирования",
    description: "Официальное партнёрство с программой ООН по водным ресурсам",
    fullDescription: "Партнёрство откроет доступ к международному финансированию, экспертизе и сети контактов ООН. LoopOrb получит статус официального технологического партнёра UN Water, что позволит масштабировать проекты на 20+ стран. Взамен мы предоставляем доступ к данным мониторинга водных ресурсов.",
    category: "partnership",
    status: "executed",
    level: "L1_CONSTITUTIONAL",
    votesFor: 2100000,
    votesAgainst: 120000,
    votesAbstain: 80000,
    startDate: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    votesCount: 2300000,
    quorumRequired: 66,
    quorumCurrent: 92,
    author: {
      name: "DAO_Council",
      reputation: 35000,
      role: "Council",
    },
    comments: 234,
    shares: 189,
    bookmarks: 567,
    tags: ["партнёрство", "ООН", "масштабирование"],
    deposit: 5000,
    actions: [
      {
        id: "a5",
        type: "partnership",
        description: "Подписание меморандума с UN Water",
        data: "partnership_id=UNW-2026-001,data_sharing=true",
      },
    ],
  },
];

const mockTreasury: TreasuryData = {
  balance: 12450000,
  monthlyIncome: 850000,
  monthlyExpenses: 420000,
  totalRevenue: 25600000,
  totalSpent: 13150000,
  transactions: [
    {
      id: "t1",
      type: "income",
      amount: 250000,
      description: "Ежемесячная эмиссия токенов",
      category: "emission",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "t2",
      type: "expense",
      amount: 150000,
      description: "Грант VOD-Lab Israel",
      category: "grants",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      relatedProposal: "dao-4",
    },
    {
      id: "t3",
      type: "income",
      amount: 450000,
      description: "Доход от стейкинга",
      category: "staking",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "t4",
      type: "expense",
      amount: 80000,
      description: "Операционные расходы",
      category: "operations",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "t5",
      type: "income",
      amount: 120000,
      description: "Партнёрские взносы",
      category: "partnerships",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  allocation: [
    { category: "Гранты", amount: 4500000, percentage: 36, color: "#22c55e" },
    { category: "Разработка", amount: 3200000, percentage: 26, color: "#3b82f6" },
    { category: "Маркетинг", amount: 2100000, percentage: 17, color: "#eab308" },
    { category: "Операции", amount: 1500000, percentage: 12, color: "#f97316" },
    { category: "Резерв", amount: 1150000, percentage: 9, color: "#8b5cf6" },
  ],
};

const mockVoteHistory: VoteRecord[] = [
  {
    id: "v1",
    voter: "0x1234...5678",
    vote: "for",
    votingPower: 15000,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    weight: { balance: 10000, reputation: 3000, role: 2000 },
  },
  {
    id: "v2",
    voter: "0x2345...6789",
    vote: "for",
    votingPower: 8500,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    weight: { balance: 6000, reputation: 2000, role: 500 },
  },
  {
    id: "v3",
    voter: "0x3456...7890",
    vote: "against",
    votingPower: 5200,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    weight: { balance: 4000, reputation: 1000, role: 200 },
  },
];

const mockComments: Comment[] = [
  {
    id: "c1",
    author: "Maria_K",
    content: "Полностью поддерживаю это предложение! Совет старейшин поможет ускорить принятие важных решений. Важно только обеспечить прозрачность выбора членов совета.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 45,
    replies: 12,
  },
  {
    id: "c2",
    author: "CryptoWater",
    content: "Есть опасения насчёт концентрации власти. 7 человек могут получить слишком большое влияние. Предлагаю добавить механизм отзыва членов совета.",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 32,
    replies: 8,
  },
  {
    id: "c3",
    author: "EcoActivist",
    content: "Отличная инициатива! Готов помочь с организацией выборов в совет. Нужна ли техническая поддержка для голосования?",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    likes: 28,
    replies: 5,
  },
];

const defaultStats: DaoStats = {
  totalProposals: 0,
  activeProposals: 0,
  passedProposals: 0,
  rejectedProposals: 0,
  totalParticipants: 0,
  totalVotingPower: 0,
  userVotingPower: 0,
  userStaked: 0,
  userReputation: 0,
  userRole: "guest",
  delegatedVotes: 0,
};

// ==================== HELPER FUNCTIONS ====================

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getTimeLeft(endDate: string): { days: number; hours: number; text: string } {
  const end = new Date(endDate).getTime();
  const now = Date.now();
  const diff = end - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, text: "Завершено" };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return {
    days,
    hours,
    text: days > 0 ? `${days} дн. ${hours} ч.` : `${hours} ч.`,
  };
}

// ==================== SUB-COMPONENTS ====================

function LevelBadge({ level }: { level: Proposal["level"] }) {
  const config = LEVEL_CONFIG[level];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}>
      <Icon className="w-3 h-3" />
      {config.shortLabel}: {config.label}
    </span>
  );
}

function StatusBadge({ status }: { status: Proposal["status"] }) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}

function VotingProgressBar({
  votesFor,
  votesAgainst,
  votesAbstain,
  quorumCurrent,
  quorumRequired,
}: {
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  quorumCurrent: number;
  quorumRequired: number;
}) {
  const total = votesFor + votesAgainst + votesAbstain;
  const forPercent = total > 0 ? (votesFor / total) * 100 : 0;
  const againstPercent = total > 0 ? (votesAgainst / total) * 100 : 0;
  const abstainPercent = total > 0 ? (votesAbstain / total) * 100 : 0;
  const quorumPercent = Math.min((quorumCurrent / quorumRequired) * 100, 100);

  return (
    <div className="space-y-3">
      {/* Quorum Bar */}
      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-water-200/60 flex items-center gap-1">
            <Target className="w-3 h-3" />
            Кворум
          </span>
          <span className={quorumPercent >= 100 ? "text-green-400 font-medium" : "text-water-200/60"}>
            {quorumCurrent.toFixed(1)}% / {quorumRequired}%
          </span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${quorumPercent}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`h-full rounded-full ${
              quorumPercent >= 100
                ? "bg-gradient-to-r from-green-500 to-emerald-400"
                : "bg-gradient-to-r from-purple-500 to-pink-400"
            }`}
          />
        </div>
      </div>

      {/* Vote Distribution Bar */}
      <div className="h-4 bg-white/5 rounded-full overflow-hidden flex">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${forPercent}%` }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${againstPercent}%` }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="h-full bg-gradient-to-r from-red-500 to-rose-400"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${abstainPercent}%` }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="h-full bg-gradient-to-r from-gray-500 to-slate-400"
        />
      </div>

      {/* Vote Counts */}
      <div className="flex justify-between text-xs">
        <div className="flex items-center gap-4">
          <span className="text-green-400 flex items-center gap-1">
            <ThumbsUp className="w-3 h-3" />
            За: {formatNumber(votesFor)}
          </span>
          <span className="text-red-400 flex items-center gap-1">
            <ThumbsDown className="w-3 h-3" />
            Против: {formatNumber(votesAgainst)}
          </span>
          <span className="text-gray-400 flex items-center gap-1">
            <Minus className="w-3 h-3" />
            Воздерж: {formatNumber(votesAbstain)}
          </span>
        </div>
        <span className="text-water-200/50">
          Всего: {formatNumber(total)}
        </span>
      </div>
    </div>
  );
}

function ProposalCard({
  proposal,
  index,
  isGuest,
  onVote,
  onSelect,
}: {
  proposal: Proposal;
  index: number;
  isGuest: boolean;
  onVote: (id: string, vote: "for" | "against" | "abstain") => void;
  onSelect: (proposal: Proposal) => void;
}) {
  const [userVote, setUserVote] = useState<"for" | "against" | "abstain" | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  const level = LEVEL_CONFIG[proposal.level];
  const status = STATUS_CONFIG[proposal.status];
  const timeLeft = getTimeLeft(proposal.endDate);
  const isActive = proposal.status === "active" || proposal.status === "voting";

  const handleVoteClick = (vote: "for" | "against" | "abstain") => {
    if (isGuest) return;
    setUserVote(vote);
    onVote(proposal.id, vote);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card overflow-hidden hover:border-water-500/30 transition-colors group"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <LevelBadge level={proposal.level} />
            <StatusBadge status={proposal.status} />
            {isActive && (
              <span className="text-xs px-2.5 py-1 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {timeLeft.text}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-1.5 rounded-lg transition ${
                bookmarked ? "text-water-400 bg-water-500/20" : "text-water-200/40 hover:text-water-400"
              }`}
              title="Сохранить"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={() => onSelect(proposal)}
              className="p-1.5 rounded-lg text-water-200/40 hover:text-water-400 transition"
              title="Подробнее"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <button
          onClick={() => onSelect(proposal)}
          className="text-left w-full"
        >
          <h3 className="font-semibold text-white mb-2 hover:text-cyan-glow transition-colors line-clamp-2">
            #{proposal.number} — {proposal.title}
          </h3>
        </button>

        {/* Author */}
        <div className="flex items-center gap-2 mb-3 text-sm">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-water-400 to-cyan-400 flex items-center justify-center text-ocean-deep text-xs font-bold">
            {proposal.author.avatar ? (
              <img src={proposal.author.avatar} alt={proposal.author.name} className="w-full h-full rounded-full" />
            ) : (
              proposal.author.name.charAt(0)
            )}
          </div>
          <span className="text-water-200/70">{proposal.author.name}</span>
          <span className="text-xs text-water-200/40">•</span>
          <span className="text-xs text-water-200/50">{proposal.author.role}</span>
          <span className="text-xs text-water-200/40">•</span>
          <span className="text-xs text-water-200/50">{formatDate(proposal.createdAt)}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-water-200/60 line-clamp-2 mb-4">{proposal.description}</p>

        {/* Tags */}
        {proposal.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {proposal.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-white/5 text-water-200/60 text-xs rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Voting Progress */}
        {isActive && (
          <div className="mb-4">
            <VotingProgressBar
              votesFor={proposal.votesFor}
              votesAgainst={proposal.votesAgainst}
              votesAbstain={proposal.votesAbstain}
              quorumCurrent={proposal.quorumCurrent}
              quorumRequired={proposal.quorumRequired}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-3 text-sm">
            <button className="flex items-center gap-1 text-water-200/50 hover:text-water-400 transition">
              <MessageSquare className="w-4 h-4" />
              <span>{proposal.comments}</span>
            </button>
            <button className="flex items-center gap-1 text-water-200/50 hover:text-water-400 transition">
              <Share2 className="w-4 h-4" />
              <span>{proposal.shares}</span>
            </button>
            <button className="flex items-center gap-1 text-water-200/50 hover:text-water-400 transition">
              <FolderOpen className="w-4 h-4" />
              <span>{proposal.bookmarks}</span>
            </button>
          </div>

          {isActive ? (
            isGuest ? (
              <Link
                href="/register"
                className="btn-primary text-sm px-4 py-1.5 flex items-center gap-2"
              >
                <Lock className="w-3 h-3" />
                Войти
              </Link>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleVoteClick("for")}
                  className={`p-2 rounded-lg transition ${
                    userVote === "for"
                      ? "bg-green-500/20 text-green-400 border border-green-500/50"
                      : "bg-white/5 text-water-200/70 hover:bg-green-500/10 hover:text-green-400"
                  }`}
                  title="За"
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleVoteClick("against")}
                  className={`p-2 rounded-lg transition ${
                    userVote === "against"
                      ? "bg-red-500/20 text-red-400 border border-red-500/50"
                      : "bg-white/5 text-water-200/70 hover:bg-red-500/10 hover:text-red-400"
                  }`}
                  title="Против"
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleVoteClick("abstain")}
                  className={`p-2 rounded-lg transition ${
                    userVote === "abstain"
                      ? "bg-gray-500/20 text-gray-400 border border-gray-500/50"
                      : "bg-white/5 text-water-200/70 hover:bg-gray-500/10 hover:text-gray-400"
                  }`}
                  title="Воздержаться"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            )
          ) : (
            <button
              onClick={() => onSelect(proposal)}
              className="btn-secondary text-sm px-4 py-1.5"
            >
              Подробнее
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function DaoStatsCards({ stats }: { stats: DaoStats }) {
  const statCards = [
    {
      icon: Vote,
      value: stats.totalProposals,
      label: "Предложений",
      color: "bg-cyan-500/20",
      iconColor: "text-cyan-400",
    },
    {
      icon: Clock,
      value: stats.activeProposals,
      label: "Активных",
      color: "bg-purple-500/20",
      iconColor: "text-purple-400",
    },
    {
      icon: CheckCircle,
      value: stats.passedProposals,
      label: "Принято",
      color: "bg-green-500/20",
      iconColor: "text-green-400",
    },
    {
      icon: Users,
      value: stats.totalParticipants.toLocaleString(),
      label: "Участников",
      color: "bg-amber-500/20",
      iconColor: "text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
              <card.icon className={`w-5 h-5 ${card.iconColor}`} />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{card.value}</div>
              <div className="text-xs text-water-200/50">{card.label}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function TreasuryCard({ treasury }: { treasury: TreasuryData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Wallet className="w-5 h-5 text-water-400" />
          Казначейство DAO
        </h3>
        <Link href="/dao/treasury" className="text-sm text-water-400 hover:text-water-300 flex items-center gap-1">
          Подробнее
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Balance */}
      <div className="mb-4 p-4 bg-gradient-to-r from-water-500/20 to-cyan-500/20 rounded-xl border border-water-500/30">
        <div className="text-sm text-water-200/60 mb-1">Общий баланс</div>
        <div className="text-2xl font-bold text-white">{formatNumber(treasury.balance)} UNITY</div>
      </div>

      {/* Income/Expenses */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
          <div className="flex items-center gap-2 text-sm text-green-400 mb-1">
            <ArrowUpRight className="w-4 h-4" />
            Доход (мес)
          </div>
          <div className="text-lg font-bold text-white">{formatNumber(treasury.monthlyIncome)}K</div>
        </div>
        <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
          <div className="flex items-center gap-2 text-sm text-red-400 mb-1">
            <ArrowDownRight className="w-4 h-4" />
            Расход (мес)
          </div>
          <div className="text-lg font-bold text-white">{formatNumber(treasury.monthlyExpenses)}K</div>
        </div>
      </div>

      {/* Allocation */}
      <div>
        <div className="text-sm text-water-200/60 mb-2">Распределение средств</div>
        <div className="space-y-2">
          {treasury.allocation.slice(0, 4).map((item) => (
            <div key={item.category} className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-water-200/70 flex-1">{item.category}</span>
              <span className="text-sm text-white font-medium">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CreateProposalModal({
  isOpen,
  onClose,
  onSubmit,
  userStats,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (proposal: Partial<Proposal>) => void;
  userStats: DaoStats;
}) {
  const [step, setStep] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState<Proposal["level"]>("L4_OPERATIONAL");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fullDescription: "",
    category: "",
    tags: "",
    actions: [] as ProposalAction[],
  });

  const levelConfig = LEVEL_CONFIG[selectedLevel];
  const canCreate = userStats.userVotingPower >= levelConfig.minTokens;

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      level: selectedLevel,
      deposit: levelConfig.deposit,
    });
    onClose();
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-5 border-b border-white/10 bg-ocean-deep/95 backdrop-blur">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-water-400" />
            Создать предложение
          </h2>
          <button onClick={onClose} className="p-2 text-water-200/50 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 p-5 border-b border-white/10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= s ? "bg-water-500/20 text-water-400 border border-water-500/50" : "bg-white/5 text-water-200/40"
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-water-500/50" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="p-5">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white mb-4">Выберите уровень предложения</h3>
              {(Object.keys(LEVEL_CONFIG) as Array<keyof typeof LEVEL_CONFIG>).map((levelKey) => {
                const level = levelKey as Proposal["level"];
                const config = LEVEL_CONFIG[level];
                const Icon = config.icon;
                const canAfford = userStats.userVotingPower >= config.minTokens;

                return (
                  <button
                    key={level}
                    onClick={() => canAfford && setSelectedLevel(level)}
                    className={`w-full p-4 rounded-xl border text-left transition ${
                      selectedLevel === level
                        ? `${config.bg} ${config.border}`
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    } ${!canAfford && "opacity-50 cursor-not-allowed"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <div>
                          <div className={`font-medium ${config.color}`}>{config.label}</div>
                          <div className="text-sm text-water-200/60">{config.desc}</div>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="text-water-200/50">Требования</div>
                        <div className="text-white font-medium">{formatNumber(config.minTokens)} VP</div>
                        <div className="text-water-200/50">Депозит: {formatNumber(config.deposit)}</div>
                      </div>
                    </div>
                    {!canAfford && (
                      <div className="mt-2 text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Недостаточно voting power
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-water-200/70 mb-2">Название *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-water-200/30 focus:outline-none focus:border-water-500/50 transition"
                  placeholder="Краткое название предложения"
                />
              </div>
              <div>
                <label className="block text-sm text-water-200/70 mb-2">Описание *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-water-200/30 focus:outline-none focus:border-water-500/50 transition resize-none"
                  rows={3}
                  placeholder="Краткое описание сути предложения"
                />
              </div>
              <div>
                <label className="block text-sm text-water-200/70 mb-2">Полное описание *</label>
                <textarea
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-water-200/30 focus:outline-none focus:border-water-500/50 transition resize-none"
                  rows={5}
                  placeholder="Подробное описание с обоснованием, планом исполнения и ожидаемыми результатами"
                />
              </div>
              <div>
                <label className="block text-sm text-water-200/70 mb-2">Теги (через запятую)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-water-200/30 focus:outline-none focus:border-water-500/50 transition"
                  placeholder="управление, финансирование, экология"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 bg-water-500/10 rounded-xl border border-water-500/20">
                <h4 className="font-medium text-white mb-3">Параметры предложения</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-water-200/60">Уровень</span>
                    <span className="text-white">{levelConfig.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-water-200/60">Длительность голосования</span>
                    <span className="text-white">{levelConfig.duration} дней</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-water-200/60">Требуемый кворум</span>
                    <span className="text-white">{levelConfig.quorum}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-water-200/60">Депозит</span>
                    <span className="text-white">{formatNumber(levelConfig.deposit)} UNITY</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <div className="flex items-start gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5" />
                  <div className="text-amber-200/80">
                    Депозит будет возвращён после успешного прохождения голосования. 
                    При отклонении предложения депозит сжигается.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center justify-between p-5 border-t border-white/10 bg-ocean-deep/95 backdrop-blur">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            className="btn-secondary"
            disabled={step === 1}
          >
            Назад
          </button>
          {step < 3 ? (
            <button
              onClick={() => setStep(Math.min(3, step + 1))}
              className="btn-primary"
              disabled={step === 1 && !selectedLevel}
            >
              Далее
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary">
              Создать предложение
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ProposalDetailModal({
  proposal,
  onClose,
  isGuest,
  onVote,
}: {
  proposal: Proposal | null;
  onClose: () => void;
  isGuest: boolean;
  onVote: (id: string, vote: "for" | "against" | "abstain") => void;
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "votes" | "comments">("overview");
  const [userVote, setUserVote] = useState<"for" | "against" | "abstain" | null>(null);

  if (!proposal) return null;

  const level = LEVEL_CONFIG[proposal.level];
  const status = STATUS_CONFIG[proposal.status];
  const timeLeft = getTimeLeft(proposal.endDate);
  const isActive = proposal.status === "active" || proposal.status === "voting";

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.origin + "/dao/" + proposal.id);
    const text = encodeURIComponent(`Голосование в DAO LoopOrb: ${proposal.title}`);

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
        break;
      case "telegram":
        window.open(`https://t.me/share/url?url=${url}&text=${text}`, "_blank");
        break;
      case "copy":
        navigator.clipboard.writeText(window.location.origin + "/dao/" + proposal.id);
        break;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-start justify-between p-5 border-b border-white/10 bg-ocean-deep/95 backdrop-blur">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <LevelBadge level={proposal.level} />
              <StatusBadge status={proposal.status} />
              {isActive && (
                <span className="text-xs px-2.5 py-1 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {timeLeft.text}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white">#{proposal.number} — {proposal.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-water-200/50 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-2 border-b border-white/10">
          {[
            { id: "overview", label: "Обзор", icon: FileText },
            { id: "votes", label: "Голоса", icon: BarChart3 },
            { id: "comments", label: "Обсуждение", icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-water-500/20 text-water-400"
                  : "text-water-200/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-5">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Author */}
              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-water-400 to-cyan-400 flex items-center justify-center text-ocean-deep font-bold">
                  {proposal.author.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-white">{proposal.author.name}</div>
                  <div className="text-sm text-water-200/50">{proposal.author.role} • Репутация: {proposal.author.reputation.toLocaleString()}</div>
                </div>
                <div className="text-right text-sm text-water-200/50">
                  <div>{formatDate(proposal.createdAt)}</div>
                  <div>Депозит: {formatNumber(proposal.deposit || 0)}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-medium text-white mb-2">Описание</h3>
                <p className="text-water-200/70 whitespace-pre-wrap">{proposal.fullDescription}</p>
              </div>

              {/* Actions */}
              {proposal.actions && proposal.actions.length > 0 && (
                <div>
                  <h3 className="font-medium text-white mb-3">Действия</h3>
                  <div className="space-y-2">
                    {proposal.actions.map((action) => {
                      const actionType = ACTION_TYPES[action.type];
                      const Icon = actionType.icon;
                      return (
                        <div key={action.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-water-500/20 flex items-center justify-center">
                              <Icon className="w-5 h-5 text-water-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm text-water-200/60">{actionType.label}</div>
                              <div className="text-white">{action.description}</div>
                              {action.amount && (
                                <div className="text-sm text-cyan-400 mt-1">{formatNumber(action.amount)} UNITY</div>
                              )}
                              {action.data && (
                                <div className="text-xs text-water-200/40 mt-1 font-mono">{action.data}</div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Voting */}
              {isActive && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="font-medium text-white mb-4">Голосование</h3>
                  <VotingProgressBar
                    votesFor={proposal.votesFor}
                    votesAgainst={proposal.votesAgainst}
                    votesAbstain={proposal.votesAbstain}
                    quorumCurrent={proposal.quorumCurrent}
                    quorumRequired={proposal.quorumRequired}
                  />

                  {!isGuest && !userVote && (
                    <div className="mt-4 flex items-center gap-2">
                      <button onClick={() => { setUserVote("for"); onVote(proposal.id, "for"); }} className="btn-primary flex-1 flex items-center justify-center gap-2">
                        <ThumbsUp className="w-4 h-4" />
                        За
                      </button>
                      <button onClick={() => { setUserVote("against"); onVote(proposal.id, "against"); }} className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50 px-4 py-2 rounded-lg transition flex items-center gap-2">
                        <ThumbsDown className="w-4 h-4" />
                        Против
                      </button>
                      <button onClick={() => { setUserVote("abstain"); onVote(proposal.id, "abstain"); }} className="bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border border-gray-500/50 px-4 py-2 rounded-lg transition">
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {userVote && (
                    <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center text-green-400">
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      Ваш голос учтён: {userVote === "for" ? "За" : userVote === "against" ? "Против" : "Воздержался"}
                    </div>
                  )}
                </div>
              )}

              {/* Share */}
              <div>
                <h3 className="font-medium text-white mb-3">Поделиться</h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleShare("twitter")} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition text-water-200/70 hover:text-white">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleShare("telegram")} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition text-water-200/70 hover:text-white">
                    <Telegram className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleShare("copy")} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition text-water-200/70 hover:text-white">
                    <LinkIcon className="w-5 h-5" />
                  </button>
                  <button className="flex-1 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition text-water-200/70 hover:text-white flex items-center justify-center gap-2">
                    <UserCheck className="w-5 h-5" />
                    Пригласить к голосованию
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "votes" && (
            <div className="space-y-4">
              <h3 className="font-medium text-white">История голосований</h3>
              <div className="space-y-2">
                {mockVoteHistory.map((vote) => (
                  <div key={vote.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      vote.vote === "for" ? "bg-green-500/20 text-green-400" :
                      vote.vote === "against" ? "bg-red-500/20 text-red-400" :
                      "bg-gray-500/20 text-gray-400"
                    }`}>
                      {vote.vote === "for" ? <ThumbsUp className="w-4 h-4" /> :
                       vote.vote === "against" ? <ThumbsDown className="w-4 h-4" /> :
                       <Minus className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-white">{vote.voter}</div>
                      <div className="text-xs text-water-200/50">{new Date(vote.timestamp).toLocaleString("ru-RU")}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white font-medium">{formatNumber(vote.votingPower)} VP</div>
                      <div className="text-xs text-water-200/40">
                        Б: {vote.weight.balance} • Р: {vote.weight.reputation} • Рл: {vote.weight.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "comments" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Написать комментарий..."
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-water-200/30 focus:outline-none focus:border-water-500/50 transition"
                />
                <button className="btn-primary p-2.5">
                  <Send className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-white/5 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-water-400 to-cyan-400 flex items-center justify-center text-ocean-deep text-sm font-bold">
                        {comment.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white">{comment.author}</span>
                          <span className="text-xs text-water-200/40">{new Date(comment.timestamp).toLocaleString("ru-RU")}</span>
                        </div>
                        <p className="text-sm text-water-200/70">{comment.content}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <button className="text-xs text-water-200/50 hover:text-water-400 flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {comment.likes}
                          </button>
                          <button className="text-xs text-water-200/50 hover:text-water-400 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {comment.replies} ответов
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function GovernanceLevelsInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 mb-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Scale className="w-5 h-5 text-water-400" />
        Уровни управления DAO
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(LEVEL_CONFIG) as Array<keyof typeof LEVEL_CONFIG>).map((levelKey) => {
          const level = levelKey as Proposal["level"];
          const config = LEVEL_CONFIG[level];
          const Icon = config.icon;

          return (
            <div key={level} className={`p-4 rounded-xl ${config.bg} border ${config.border}`}>
              <div className={`text-sm font-medium ${config.color} mb-2 flex items-center gap-2`}>
                <Icon className="w-4 h-4" />
                {config.shortLabel}: {config.label}
              </div>
              <div className="text-xs text-water-200/60 mb-3">{config.desc}</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-water-200/50">Кворум</span>
                  <span className="text-white">{config.quorum}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-water-200/50">Голосование</span>
                  <span className="text-white">{config.duration} дн.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-water-200/50">Депозит</span>
                  <span className="text-white">{formatNumber(config.deposit)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function GuestUpsellBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <Crown className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Участвуйте в управлении экосистемой
            </h3>
            <p className="text-sm text-water-200/70">
              Зарегистрируйтесь и получите 100 UNITY бонус для участия в голосованиях
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/register" className="btn-primary text-center whitespace-nowrap">
            Создать аккаунт
          </Link>
          <Link href="/staking" className="btn-secondary text-center whitespace-nowrap flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Стейкинг
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ==================== MAIN PAGE COMPONENT ====================

export default function DAOPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [stats, setStats] = useState<DaoStats>(defaultStats);
  const [treasury, setTreasury] = useState<TreasuryData>(mockTreasury);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userRes = await fetch("/api/auth/me");
        const userData = await userRes.json();

        if (userData.success) {
          setIsGuest(false);
          const userStats: DaoStats = {
            ...defaultStats,
            userVotingPower: userData.data.user.stakedAmount || 0,
            userStaked: userData.data.user.stakedAmount || 0,
            userReputation: userData.data.user.reputation || 0,
            userRole: userData.data.user.role || "member",
          };

          const [proposalsRes, statsRes] = await Promise.all([
            fetch(`/api/dao?status=${activeCategory}`),
            fetch("/api/dao/stats"),
          ]);

          const proposalsData = await proposalsRes.json();
          const statsData = await statsRes.json();

          if (proposalsData.success) {
            setProposals(proposalsData.data.data || mockProposals);
          }
          if (statsData.success) {
            setStats({ ...userStats, ...statsData.data });
          }
        } else {
          setIsGuest(true);
          setProposals(mockProposals);
          setStats({
            totalProposals: 12,
            activeProposals: 3,
            passedProposals: 7,
            rejectedProposals: 2,
            totalParticipants: 1247,
            totalVotingPower: 2500000,
            userVotingPower: 0,
            userStaked: 0,
            userReputation: 0,
            userRole: "guest",
            delegatedVotes: 0,
          });
        }
      } catch (error) {
        console.error("Failed to load DAO data:", error);
        setProposals(mockProposals);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [activeCategory]);

  const handleVote = async (proposalId: string, vote: "for" | "against" | "abstain") => {
    try {
      const res = await fetch(`/api/dao/${proposalId}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vote }),
      });

      const data = await res.json();
      if (data.success) {
        setProposals((prev) =>
          prev.map((p) =>
            p.id === proposalId
              ? {
                  ...p,
                  votesFor: vote === "for" ? p.votesFor + 1000 : p.votesFor,
                  votesAgainst: vote === "against" ? p.votesAgainst + 1000 : p.votesAgainst,
                  votesAbstain: vote === "abstain" ? p.votesAbstain + 1000 : p.votesAbstain,
                  votesCount: p.votesCount + 1000,
                }
              : p
          )
        );
      }
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  const handleCreateProposal = async (proposalData: Partial<Proposal>) => {
    try {
      const res = await fetch("/api/dao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proposalData),
      });

      const data = await res.json();
      if (data.success) {
        setProposals([data.data.proposal, ...proposals]);
      }
    } catch (error) {
      console.error("Failed to create proposal:", error);
    }
  };

  const filteredProposals = useMemo(() => {
    return proposals.filter((p) => {
      const matchesCategory =
        activeCategory === "all" ||
        p.status === activeCategory;

      const matchesLevel =
        levelFilter === "all" ||
        p.level === levelFilter;

      const matchesSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesLevel && matchesSearch;
    });
  }, [proposals, activeCategory, levelFilter, searchQuery]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin" />
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <Gavel className="w-8 h-8 text-water-400" />
                  DAO Управление
                </h1>
                <p className="text-water-200/70">
                  Децентрализованное управление экосистемой LoopOrb
                </p>
              </div>
              {!isGuest && (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Создать предложение
                </button>
              )}
            </div>
          </motion.div>

          {/* Guest Upsell */}
          {isGuest && <GuestUpsellBanner />}

          {/* Stats */}
          <DaoStatsCards stats={stats} />

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Proposals */}
            <div className="lg:col-span-2 space-y-6">
              {/* User Voting Power */}
              {!isGuest && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-5"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Shield className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Ваша сила голоса</h3>
                        <p className="text-sm text-water-200/60">
                          Баланс: {formatNumber(stats.userStaked)} • Репутация: {formatNumber(stats.userReputation)} • Роль: {stats.userRole}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          {formatNumber(stats.userVotingPower)}
                        </div>
                        <div className="text-xs text-water-200/50">Voting Power</div>
                      </div>
                      <Link href="/staking" className="btn-primary flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Стейкать
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Category Filter */}
                  <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                          activeCategory === cat.id
                            ? "bg-water-500/20 text-water-400"
                            : "text-water-200/70 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <cat.icon className="w-4 h-4" />
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-water-200/40" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Поиск предложений..."
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-water-200/30 focus:outline-none focus:border-water-500/50 transition"
                    />
                  </div>

                  {/* Level Filter */}
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-water-500/50 transition cursor-pointer"
                  >
                    <option value="all" className="bg-ocean-deep">Все уровни</option>
                    <option value="L1_CONSTITUTIONAL" className="bg-ocean-deep">L1 Конституционный</option>
                    <option value="L2_ECONOMIC" className="bg-ocean-deep">L2 Экономический</option>
                    <option value="L3_PROJECTS" className="bg-ocean-deep">L3 Проектный</option>
                    <option value="L4_OPERATIONAL" className="bg-ocean-deep">L4 Операционный</option>
                  </select>
                </div>
              </motion.div>

              {/* Proposals List */}
              {filteredProposals.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 px-4 glass-card"
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-water-500/20 to-cyan-glow/20 flex items-center justify-center">
                    <Gavel className="w-12 h-12 text-water-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">
                    Нет предложений
                  </h2>
                  <p className="text-water-200/60 max-w-md mx-auto mb-8">
                    {isGuest
                      ? "Зарегистрируйтесь, чтобы увидеть все предложения"
                      : "Будьте первым, кто создаст предложение"}
                  </p>
                  <Link
                    href={isGuest ? "/register" : "#"}
                    onClick={(e) => {
                      if (!isGuest) {
                        e.preventDefault();
                        setIsCreateModalOpen(true);
                      }
                    }}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    {isGuest ? "Создать аккаунт" : "Создать предложение"}
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {filteredProposals.map((proposal, index) => (
                    <ProposalCard
                      key={proposal.id}
                      proposal={proposal}
                      index={index}
                      isGuest={isGuest}
                      onVote={handleVote}
                      onSelect={setSelectedProposal}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Treasury */}
              <TreasuryCard treasury={treasury} />

              {/* Governance Levels */}
              <GovernanceLevelsInfo />

              {/* Quick Actions */}
              {!isGuest && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-5"
                >
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-water-400" />
                    Быстрые действия
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/dao/delegate"
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition text-water-200/70 hover:text-white"
                    >
                      <GitBranch className="w-5 h-5" />
                      <div>
                        <div className="text-sm font-medium">Делегирование</div>
                        <div className="text-xs text-water-200/50">Передайте голоса доверенному лицу</div>
                      </div>
                    </Link>
                    <Link
                      href="/dao/history"
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition text-water-200/70 hover:text-white"
                    >
                      <History className="w-5 h-5" />
                      <div>
                        <div className="text-sm font-medium">История голосов</div>
                        <div className="text-xs text-water-200/50">Ваши участия в голосованиях</div>
                      </div>
                    </Link>
                    <Link
                      href="/dao/analytics"
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition text-water-200/70 hover:text-white"
                    >
                      <PieChart className="w-5 h-5" />
                      <div>
                        <div className="text-sm font-medium">Аналитика</div>
                        <div className="text-xs text-water-200/50">Статистика и тренды DAO</div>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreateProposalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProposal}
        userStats={stats}
      />

      <ProposalDetailModal
        proposal={selectedProposal}
        onClose={() => setSelectedProposal(null)}
        isGuest={isGuest}
        onVote={handleVote}
      />
    </>
  );
}
