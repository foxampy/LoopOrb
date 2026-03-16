"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  ArrowLeft,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Minus,
  AlertCircle,
  FileText,
  Building2,
  ExternalLink,
  Vote,
  Shield,
  AlertTriangle,
  Info,
  ChevronRight,
  Share2,
  MessageSquare,
  Wallet,
  Lock,
  Crown,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const defaultProposal = {
  id: "default",
  number: 1,
  title: "Финансирование проекта очистки реки",
  description: "Описание предложения...",
  fullDescription: "Полное описание предложения с деталями и обоснованием...",
  category: "PROJECT_FUNDING",
  status: "active",
  level: "L3_PROJECTS",
  votesFor: 150000,
  votesAgainst: 45000,
  votesAbstain: 12000,
  quorumRequired: 10,
  quorumCurrent: 20.7,
  startDate: "2026-02-10T00:00:00Z",
  endDate: "2026-02-24T00:00:00Z",
  createdAt: "2026-02-10T10:00:00Z",
  votesCount: 207000,
  author: { name: "Аноним", reputation: 100 },
  comments: 45,
  shares: 12,
  bookmarks: 89,
  tags: ["экология", "финансирование"],
  milestones: [],
};

const guestPreviewProposal = {
  id: "preview-1",
  number: 1,
  title: "Запуск программы грантов для водных проектов",
  description: "Создание фонда в размере 500,000 UNITY для поддержки начинающих эко-предпринимателей",
  fullDescription: `## О предложении

Предложение о создании специального грантового фонда для поддержки проектов на ранних стадиях. Фонд будет распределяться через DAO голосование.

## Цели

- Поддержка 50+ стартапов в течение первого года
- Фокус на инновационных решениях для мониторинга воды
- Приоритет проектам в регионах с водным кризисом

## Бюджет

| Категория | Сумма |
|-----------|-------|
| Гранты | 400,000 UNITY |
| Администрирование | 50,000 UNITY |
| Резерв | 50,000 UNITY |

## Ожидаемые результаты

- 10+ новых проектов запущено
- 1000+ рабочих мест создано
- Улучшение доступа к чистой воде для 100,000+ человек`,
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
  milestones: [
    { date: "Месяц 1-2", title: "Отбор заявок", status: "pending" },
    { date: "Месяц 3-4", title: "Голосование DAO", status: "pending" },
    { date: "Месяц 5-8", title: "Выплата грантов", status: "pending" },
    { date: "Месяц 9-12", title: "Мониторинг результатов", status: "pending" },
  ],
};

const levelLabels: Record<string, { label: string; color: string; bg: string; desc: string; quorum: number; approval: number }> = {
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

export default function ProposalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [proposal, setProposal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userVote, setUserVote] = useState<"for" | "against" | "abstain" | null>(null);
  const [votingPower, setVotingPower] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isGuest, setIsGuest] = useState(true);

  useEffect(() => {
    const loadProposal = async () => {
      try {
        // Check auth status
        const userRes = await fetch("/api/auth/me");
        const userData = await userRes.json();

        if (userData.success) {
          setIsGuest(false);
          setVotingPower(userData.data.user.stakedAmount || 0);
          
          // Try to fetch from API
          try {
            const res = await fetch(`/api/dao/${params.id}`);
            const data = await res.json();
            if (data.success) {
              setProposal(data.data.proposal);
              return;
            }
          } catch {
            // Use default if API fails
          }
        } else {
          setIsGuest(true);
        }

        // Use preview data for guests or fallback
        setProposal(guestPreviewProposal);
      } catch (error) {
        console.error("Failed to load proposal:", error);
        setProposal(guestPreviewProposal);
      } finally {
        setIsLoading(false);
      }
    };

    loadProposal();
  }, [params.id]);

  useEffect(() => {
    if (!proposal) return;

    // Calculate time left
    const end = new Date(proposal.endDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = end - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [proposal]);

  const handleVote = async (vote: "for" | "against" | "abstain") => {
    if (isGuest) return;
    
    try {
      const res = await fetch(`/api/dao/${proposal.id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vote }),
      });
      
      const data = await res.json();
      if (data.success) {
        setUserVote(vote);
      }
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  if (isLoading || !proposal) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin" />
        </main>
      </>
    );
  }

  const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
  const forPercent = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
  const againstPercent = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0;
  const abstainPercent = totalVotes > 0 ? (proposal.votesAbstain / totalVotes) * 100 : 0;
  const quorumPercent = (proposal.quorumCurrent / proposal.quorumRequired) * 100;
  const quorumReached = quorumPercent >= 100;
  const isActive = proposal.status === "active";

  const levelInfo = levelLabels[proposal.level] || levelLabels.L3_PROJECTS;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Guest Upsell Banner */}
          {isGuest && (
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
                      Участвуйте в голосовании
                    </h3>
                    <p className="text-sm text-water-200/70">
                      Зарегистрируйтесь и получите 100 UNITY бонус для участия в DAO
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/register" className="btn-primary text-center whitespace-nowrap">
                    Создать аккаунт
                  </Link>
                  <Link href="/login" className="btn-secondary text-center whitespace-nowrap">
                    Войти
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link
              href="/dao"
              className="inline-flex items-center gap-2 text-water-200/70 hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад к предложениям
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${levelInfo.bg} ${levelInfo.color}`}>
                    L{proposal.level.charAt(1)}: {levelInfo.label}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isActive ? "bg-cyan-500/20 text-cyan-400" : "bg-gray-500/20 text-gray-400"
                  }`}>
                    {isActive ? "Активно" : proposal.status === "passed" ? "Принято" : "Отклонено"}
                  </span>
                  {proposal.relatedProject && (
                    <Link
                      href={`/projects/${proposal.relatedProject.slug}`}
                      className="px-3 py-1 rounded-full bg-water-500/20 text-water-400 text-xs font-medium flex items-center gap-1 hover:bg-water-500/30 transition"
                    >
                      <Building2 className="w-3 h-3" />
                      {proposal.relatedProject.name}
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  #{proposal.number} — {proposal.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-water-200/60">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep font-bold text-xs">
                      {proposal.author.name.charAt(0)}
                    </div>
                    <span className="text-white">{proposal.author.name}</span>
                  </div>
                  <span>•</span>
                  <span>{new Date(proposal.createdAt).toLocaleDateString("ru-RU")}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {proposal.comments}
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Описание</h3>
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-water-200/80">
                    {proposal.fullDescription || proposal.description}
                  </div>
                </div>
              </motion.div>

              {/* Tags */}
              {proposal.tags && proposal.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="glass-card p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Теги</h3>
                  <div className="flex flex-wrap gap-2">
                    {proposal.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/5 text-water-200/70 text-sm rounded-full hover:bg-white/10 transition"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Milestones */}
              {proposal.milestones && proposal.milestones.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Майлстоуны</h3>
                  <div className="space-y-4">
                    {proposal.milestones.map((milestone: any, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm text-water-200/50">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-water-200/50">{milestone.date}</span>
                            {milestone.status === "completed" && (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            )}
                          </div>
                          <p className="text-white">{milestone.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Voting Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6 sticky top-24"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Голосование</h3>
                  {isActive && (
                    <div className="flex items-center gap-2 text-sm text-water-200/60">
                      <Clock className="w-4 h-4" />
                      {timeLeft.days}д {timeLeft.hours}ч {timeLeft.minutes}м
                    </div>
                  )}
                </div>

                {/* Quorum Status */}
                {isActive && (
                  <div className={`p-3 rounded-lg mb-4 ${quorumReached ? "bg-green-500/10" : "bg-yellow-500/10"}`}>
                    <div className="flex items-center gap-2 text-sm">
                      {quorumReached ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Кворум достигнут</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400">Кворум: {quorumPercent.toFixed(1)}%</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-water-200/50 mt-1">
                      Требуется: {levelInfo.quorum}% | Одобрение: {levelInfo.approval}%
                    </p>
                  </div>
                )}

                {/* Vote Progress */}
                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-400 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        За
                      </span>
                      <span className="text-white font-medium">{forPercent.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${forPercent}%` }} />
                    </div>
                    <p className="text-xs text-water-200/50 mt-1">
                      {(proposal.votesFor / 1000000).toFixed(2)}M голосов
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-red-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" />
                        Против
                      </span>
                      <span className="text-white font-medium">{againstPercent.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${againstPercent}%` }} />
                    </div>
                    <p className="text-xs text-water-200/50 mt-1">
                      {(proposal.votesAgainst / 1000000).toFixed(2)}M голосов
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Minus className="w-4 h-4" />
                        Воздержались
                      </span>
                      <span className="text-white font-medium">{abstainPercent.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-500 rounded-full"
                        style={{ width: `${abstainPercent}%` }}
                      />
                    </div>
                    <p className="text-xs text-water-200/50 mt-1">
                      {(proposal.votesAbstain / 1000000).toFixed(2)}M голосов
                    </p>
                  </div>
                </div>

                {/* Voting Power (only for authenticated users) */}
                {!isGuest && (
                  <div className="p-3 bg-white/5 rounded-lg mb-4">
                    <div className="flex items-center gap-2 text-sm text-water-200/70 mb-1">
                      <Wallet className="w-4 h-4" />
                      Ваша сила голоса
                    </div>
                    <p className="text-lg font-semibold text-white">{votingPower.toLocaleString()} VOD</p>
                    <p className="text-xs text-water-200/50">Пропорциональна застейканным токенам</p>
                  </div>
                )}

                {/* Vote Buttons */}
                {isActive ? (
                  isGuest ? (
                    <Link
                      href="/register"
                      className="block w-full btn-primary text-center py-3 flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      Войти для голосования
                    </Link>
                  ) : !userVote ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => handleVote("for")}
                        className="w-full py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg font-medium transition flex items-center justify-center gap-2"
                      >
                        <ThumbsUp className="w-5 h-5" />
                        Голосовать За
                      </button>
                      <button
                        onClick={() => handleVote("against")}
                        className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition flex items-center justify-center gap-2"
                      >
                        <ThumbsDown className="w-5 h-5" />
                        Голосовать Против
                      </button>
                      <button
                        onClick={() => handleVote("abstain")}
                        className="w-full py-3 bg-white/5 hover:bg-white/10 text-water-200/70 rounded-lg font-medium transition flex items-center justify-center gap-2"
                      >
                        <Minus className="w-5 h-5" />
                        Воздержаться
                      </button>
                    </div>
                  ) : (
                    <div className="text-center p-4 bg-water-500/10 rounded-lg">
                      <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <p className="text-white font-medium">Вы проголосовали</p>
                      <p className="text-sm text-water-200/60">
                        {userVote === "for" ? "За" : userVote === "against" ? "Против" : "Воздержались"}
                      </p>
                    </div>
                  )
                ) : (
                  <div className="text-center p-4 bg-white/5 rounded-lg">
                    <p className="text-white-200/60 text-sm">Голосование завершено</p>
                  </div>
                )}
              </motion.div>

              {/* Info Cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <div className="p-4 bg-purple-500/10 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-purple-200/80">
                        Уровень {levelInfo.label}. {levelInfo.desc}
                      </p>
                      <p className="text-xs text-purple-200/60 mt-1">
                        Кворум: {levelInfo.quorum}% | Одобрение: {levelInfo.approval}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-200/80">
                        Government SBT имеет право вето на решения, касающиеся критической инфраструктуры.
                      </p>
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
