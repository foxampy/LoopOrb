"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

interface Proposal {
  id: string;
  number: number;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  status: "draft" | "active" | "passed" | "rejected" | "executed";
  level: "L1_CONSTITUTIONAL" | "L2_ECONOMIC" | "L3_PROJECTS";
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
}

interface DaoStats {
  totalProposals: number;
  activeProposals: number;
  passedProposals: number;
  totalParticipants: number;
  totalVotingPower: number;
  userVotingPower: number;
  userStaked: number;
}

const categories = [
  { id: "all", label: "Все", icon: Vote },
  { id: "active", label: "Активные", icon: Clock },
  { id: "passed", label: "Принятые", icon: CheckCircle },
  { id: "rejected", label: "Отклоненные", icon: XCircle },
];

const levelLabels = {
  L1_CONSTITUTIONAL: {
    label: "Конституционный",
    color: "text-red-400",
    bg: "bg-red-500/20",
    desc: "Изменения базовых правил DAO",
    quorum: 15,
    approval: 67,
  },
  L2_ECONOMIC: {
    label: "Экономический",
    color: "text-yellow-400",
    bg: "bg-yellow-500/20",
    desc: "Параметры токеномики, эмиссия",
    quorum: 10,
    approval: 51,
  },
  L3_PROJECTS: {
    label: "Проектный",
    color: "text-green-400",
    bg: "bg-green-500/20",
    desc: "Финансирование проектов",
    quorum: 5,
    approval: 51,
  },
};

const statusLabels = {
  draft: { label: "Черновик", color: "text-slate-400", icon: FileText },
  active: { label: "Голосование", color: "text-cyan-400", icon: Clock },
  passed: { label: "Принят", color: "text-green-400", icon: CheckCircle },
  rejected: { label: "Отклонен", color: "text-red-400", icon: XCircle },
  executed: { label: "Исполнен", color: "text-purple-400", icon: CheckCircle },
};

// Guest preview data - shows platform activity
const guestPreviewProposals: Proposal[] = [
  {
    id: "preview-1",
    number: 1,
    title: "Запуск программы грантов для водных проектов",
    description: "Создание фонда в размере 500,000 UNITY для поддержки начинающих эко-предпринимателей",
    fullDescription: "Предложение о создании специального грантового фонда для поддержки проектов на ранних стадиях. Фонд будет распределяться через DAO голосование.",
    category: "funding",
    status: "active",
    level: "L2_ECONOMIC",
    votesFor: 2450000,
    votesAgainst: 320000,
    votesAbstain: 85000,
    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    votesCount: 2855000,
    quorumRequired: 10,
    quorumCurrent: 28.5,
    author: {
      name: "EcoFoundation",
      reputation: 9500,
    },
    comments: 47,
    shares: 23,
    bookmarks: 156,
    tags: ["гранты", "финансирование", "стартапы"],
    relatedProject: {
      name: "VOD-Lab Israel",
      slug: "vod-lab-israel",
    },
  },
  {
    id: "preview-2",
    number: 2,
    title: "Партнерство с UN Water",
    description: "Официальное партнерство с программой ООН по водным ресурсам для глобального масштабирования",
    fullDescription: "Стратегическое партнерство откроет доступ к международному финансированию и экспертизе.",
    category: "partnership",
    status: "passed",
    level: "L1_CONSTITUTIONAL",
    votesFor: 5200000,
    votesAgainst: 180000,
    votesAbstain: 120000,
    startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    votesCount: 5500000,
    quorumRequired: 15,
    quorumCurrent: 55,
    author: {
      name: "DAO Council",
      reputation: 15000,
    },
    comments: 89,
    shares: 67,
    bookmarks: 234,
    tags: ["партнерство", "ООН", "масштабирование"],
  },
];

const defaultStats: DaoStats = {
  totalProposals: 0,
  activeProposals: 0,
  passedProposals: 0,
  totalParticipants: 0,
  totalVotingPower: 0,
  userVotingPower: 0,
  userStaked: 0,
};

const guestStats: DaoStats = {
  totalProposals: 12,
  activeProposals: 3,
  passedProposals: 7,
  totalParticipants: 1247,
  totalVotingPower: 2500000,
  userVotingPower: 0,
  userStaked: 0,
};

function ProposalCard({
  proposal,
  index,
  isGuest,
  onVote,
}: {
  proposal: Proposal;
  index: number;
  isGuest: boolean;
  onVote: (id: string, vote: "for" | "against" | "abstain") => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [userVote, setUserVote] = useState<"for" | "against" | "abstain" | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  
  const level = levelLabels[proposal.level];
  const status = statusLabels[proposal.status];
  const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
  const forPercent = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
  const againstPercent = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0;
  const abstainPercent = totalVotes > 0 ? (proposal.votesAbstain / totalVotes) * 100 : 0;
  const quorumPercent = (proposal.quorumCurrent / proposal.quorumRequired) * 100;
  const isActive = proposal.status === "active";
  const daysLeft = isActive
    ? Math.ceil((new Date(proposal.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  const handleVoteClick = (vote: "for" | "against" | "abstain") => {
    if (isGuest) {
      return;
    }
    setUserVote(vote);
    onVote(proposal.id, vote);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card overflow-hidden hover:border-water-500/30 transition-colors"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full ${level.bg} ${level.color}`}>
              {level.label}
            </span>
            <span className={`text-xs ${status.color} flex items-center gap-1`}>
              <status.icon className="w-3 h-3" />
              {status.label}
            </span>
            {isActive && (
              <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {daysLeft > 0 ? `${daysLeft} дн.` : "Завершается сегодня"}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-1.5 rounded-lg transition ${
                bookmarked ? "text-water-400 bg-water-500/20" : "text-water-200/50 hover:text-water-400"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1.5 rounded-lg text-water-200/50 hover:text-water-400 transition"
            >
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Title */}
        <Link href={`/dao/${proposal.id}`}>
          <h3 className="font-semibold text-white mb-2 hover:text-cyan-glow transition-colors line-clamp-2">
            #{proposal.number} — {proposal.title}
          </h3>
        </Link>

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
          <span className="text-water-200/40">•</span>
          <span className="text-water-200/50 text-xs">{new Date(proposal.createdAt).toLocaleDateString("ru-RU")}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-water-200/60 line-clamp-2 mb-4">{proposal.description}</p>

        {/* Tags */}
        {proposal.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {proposal.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-white/5 text-water-200/60 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Voting Progress */}
        {isActive && (
          <div className="mb-4">
            {/* Quorum */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-water-200/50">Кворум</span>
                <span className={`${quorumPercent >= 100 ? "text-green-400" : "text-water-200/50"}`}>
                  {quorumPercent.toFixed(1)}% / {proposal.quorumRequired}%
                </span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full"
                  style={{ width: `${Math.min(quorumPercent, 100)}%` }}
                />
              </div>
            </div>

            {/* Votes Distribution */}
            <div className="h-3 bg-white/5 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                style={{ width: `${forPercent}%` }}
              />
              <div
                className="h-full bg-gradient-to-r from-red-500 to-rose-400"
                style={{ width: `${againstPercent}%` }}
              />
              <div
                className="h-full bg-gradient-to-r from-gray-500 to-slate-400"
                style={{ width: `${abstainPercent}%` }}
              />
            </div>

            {/* Vote Counts */}
            <div className="flex justify-between text-xs mt-2">
              <div className="flex items-center gap-4">
                <span className="text-green-400">
                  За: {((proposal.votesFor / 1000000) * 100).toFixed(1)}K
                </span>
                <span className="text-red-400">
                  Против: {((proposal.votesAgainst / 1000000) * 100).toFixed(1)}K
                </span>
                <span className="text-gray-400">
                  Воздерж: {((proposal.votesAbstain / 1000000) * 100).toFixed(1)}K
                </span>
              </div>
              <span className="text-water-200/50">
                {proposal.votesCount.toLocaleString()} голосов
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-sm">
            <button className="flex items-center gap-1 text-water-200/50 hover:text-water-400 transition">
              <MessageSquare className="w-4 h-4" />
              <span>{proposal.comments}</span>
            </button>
            <button className="flex items-center gap-1 text-water-200/50 hover:text-water-400 transition">
              <Share2 className="w-4 h-4" />
              <span>{proposal.shares}</span>
            </button>
          </div>

          {isActive ? (
            isGuest ? (
              <Link
                href="/register"
                className="btn-primary text-sm px-4 py-1.5 flex items-center gap-2"
              >
                <Lock className="w-3 h-3" />
                Войти для голосования
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVoteClick("for")}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition ${
                    userVote === "for"
                      ? "bg-green-500/20 text-green-400 border border-green-500/50"
                      : "bg-white/5 text-water-200/70 hover:bg-green-500/10"
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  За
                </button>
                <button
                  onClick={() => handleVoteClick("against")}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition ${
                    userVote === "against"
                      ? "bg-red-500/20 text-red-400 border border-red-500/50"
                      : "bg-white/5 text-water-200/70 hover:bg-red-500/10"
                  }`}
                >
                  <ThumbsDown className="w-3 h-3" />
                  Против
                </button>
                <button
                  onClick={() => handleVoteClick("abstain")}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition ${
                    userVote === "abstain"
                      ? "bg-gray-500/20 text-gray-400 border border-gray-500/50"
                      : "bg-white/5 text-water-200/70 hover:bg-gray-500/10"
                  }`}
                >
                  <Minus className="w-3 h-3" />
                </button>
              </div>
            )
          ) : (
            <Link
              href={`/dao/${proposal.id}`}
              className="btn-secondary text-sm px-4 py-1.5"
            >
              Подробнее
            </Link>
          )}
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-white/10"
            >
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Описание</h4>
                  <p className="text-sm text-water-200/60">{proposal.fullDescription}</p>
                </div>
                {proposal.relatedProject && (
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Связанный проект</h4>
                    <Link
                      href={`/projects/${proposal.relatedProject.slug}`}
                      className="flex items-center gap-2 text-sm text-water-400 hover:text-water-300"
                    >
                      <FolderOpen className="w-4 h-4" />
                      {proposal.relatedProject.name}
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                )}
                {proposal.executionPlan && (
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">План исполнения</h4>
                    <p className="text-sm text-water-200/60">{proposal.executionPlan}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function DaoStatsCards({ stats }: { stats: DaoStats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <Vote className="w-5 h-5 text-cyan-glow" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{stats.totalProposals}</div>
            <div className="text-xs text-water-200/50">Предложений</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{stats.passedProposals}</div>
            <div className="text-xs text-water-200/50">Принято</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{stats.totalParticipants.toLocaleString()}</div>
            <div className="text-xs text-water-200/50">Участников</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{(stats.totalVotingPower / 1000000).toFixed(1)}M</div>
            <div className="text-xs text-water-200/50">Voting Power</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function GuestUpsellBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30"
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
          <Link href="/dao/new" className="btn-secondary text-center whitespace-nowrap">
            Создать предложение
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function HowDaoWorks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-12 glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <Info className="w-5 h-5 text-water-400" />
        Как работает DAO
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            step: "1",
            title: "Создание",
            desc: "Любой участник может создать предложение с обоснованием",
            icon: FileText,
            color: "from-blue-500 to-cyan-500",
          },
          {
            step: "2",
            title: "Обсуждение",
            desc: "7 дней на обсуждение сообществом в комментариях",
            icon: MessageSquare,
            color: "from-green-500 to-emerald-500",
          },
          {
            step: "3",
            title: "Голосование",
            desc: "Голоса пропорциональны застейканным токенам VOD",
            icon: Vote,
            color: "from-purple-500 to-pink-500",
          },
          {
            step: "4",
            title: "Исполнение",
            desc: "При кворуме предложение автоматически исполняется",
            icon: CheckCircle,
            color: "from-amber-500 to-orange-500",
          },
        ].map((item, i) => (
          <div key={i} className="relative">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
              <span className="text-white font-bold">{item.step}</span>
            </div>
            <h4 className="font-medium text-white mb-1">{item.title}</h4>
            <p className="text-sm text-water-200/60">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Governance Levels */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <h4 className="font-medium text-white mb-4">Уровни голосования</h4>
        <div className="grid sm:grid-cols-3 gap-4">
          {Object.entries(levelLabels).map(([key, value]) => (
            <div key={key} className={`p-4 rounded-xl ${value.bg}`}>
              <div className={`text-sm font-medium ${value.color} mb-2`}>{value.label}</div>
              <div className="text-xs text-water-200/60 mb-3">{value.desc}</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-water-200/50">Кворум: {value.quorum}%</span>
                <span className="text-water-200/50">Одобрение: {value.approval}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function DAOPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [stats, setStats] = useState<DaoStats>(defaultStats);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(true);
  const [userVotingPower, setUserVotingPower] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Check auth status
        const userRes = await fetch("/api/auth/me");
        const userData = await userRes.json();

        if (userData.success) {
          setIsGuest(false);
          setUserVotingPower(userData.data.user.stakedAmount || 0);
          
          // Load real data
          const [proposalsRes, statsRes] = await Promise.all([
            fetch(`/api/dao?status=${activeCategory}`),
            fetch("/api/dao/stats"),
          ]);
          
          const proposalsData = await proposalsRes.json();
          const statsData = await statsRes.json();
          
          if (proposalsData.success) {
            setProposals(proposalsData.data.data);
          }
          if (statsData.success) {
            setStats(statsData.data);
          }
        } else {
          setIsGuest(true);
          setProposals(guestPreviewProposals);
          setStats(guestStats);
        }
      } catch (error) {
        console.error("Failed to load DAO data:", error);
        // Use guest data on error
        setProposals(guestPreviewProposals);
        setStats(guestStats);
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
        // Update local state
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

  const filteredProposals = proposals.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "active") return p.status === "active";
    return p.status === activeCategory;
  });

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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
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
                <Link href="/dao/new" className="btn-primary inline-flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Создать предложение
                </Link>
              )}
            </div>
          </motion.div>

          {/* Guest Upsell */}
          {isGuest && <GuestUpsellBanner />}

          {/* Stats */}
          <DaoStatsCards stats={stats} />

          {/* User Voting Power */}
          {!isGuest && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Ваша сила голоса</h3>
                    <p className="text-sm text-water-200/60">
                      Пропорциональна застейканным токенам VOD
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {userVotingPower.toLocaleString()}
                    </div>
                    <div className="text-xs text-water-200/50">VOD застейкано</div>
                  </div>
                  <Link href="/staking" className="btn-primary flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Застейкать ещё
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Filters & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
          >
            <div className="glass-card p-2 overflow-x-auto w-full sm:w-auto">
              <div className="flex gap-2 min-w-max">
                {categories.map((cat) => (
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
            </div>

            {isGuest && (
              <Link
                href="/register"
                className="btn-primary flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Создать предложение
              </Link>
            )}
          </motion.div>

          {/* Proposals List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-cyan-glow animate-spin" />
            </div>
          ) : filteredProposals.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 px-4"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-water-500/20 to-cyan-glow/20 flex items-center justify-center">
                <Gavel className="w-12 h-12 text-water-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Нет предложений в этой категории
              </h2>
              <p className="text-water-200/60 max-w-md mx-auto mb-8">
                {isGuest
                  ? "Зарегистрируйтесь, чтобы увидеть все предложения и участвовать в голосованиях"
                  : "Будьте первым, кто создаст предложение в этой категории"}
              </p>
              <Link
                href={isGuest ? "/register" : "/dao/new"}
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
                />
              ))}
            </div>
          )}

          {/* How DAO Works */}
          <HowDaoWorks />
        </div>
      </main>
    </>
  );
}
