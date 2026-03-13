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
} from "lucide-react";

// Proposal data with sensor standard voting
const proposalDetails: Record<string, any> = {
  "prop-001": {
    id: "prop-001",
    title: "VOD-Lab Standard: Единый протокол IoT-анализаторов воды",
    description: `## Проблема

В настоящее время отсутствует единый международный стандарт для IoT-сенсоров и автоматических анализаторов качества воды. Каждый производитель использует свои протоколы, что приводит к:

- **Несовместимости данных** — невозможно сравнивать показания разных систем
- **Манипуляциям** — операторы могут выбирать "удобные" сенсоры
- **Потере доверия** — граждане не понимают, можно ли верить данным

### Критический кейс: Израиль

Израиль официально отказался от проведения регулярного химического анализа питьевой воды для населения, ссылаясь на "высокие стандарты очистки". Однако данные IoT-систем не верифицируются независимо, а показания разных поставщиков расходятся на 15-30%.

## Предложение

Разработать и внедрить **VOD-Lab Standard** — открытый протокол для автоматических анализаторов воды со следующими требованиями:

### Технические спецификации

| Компонент | Требование |
|-----------|------------|
| **Корпус** | IP68, -40°C до +60°C, солнечная панель |
| **Анализатор** | Спектрофотометр UV-Vis-NIR, 190-1100 нм |
| **Параметры** | Минимум 20 показателей (pH, тяжелые металлы, бактерии, ПАВ) |
| **Картриджи** | Стандартизированные 12-слотовые с RFID-маркировкой |
| **Связь** | LoRaWAN + спутник + 4G backup |
| **Блокчейн** | Лёгкая нода VOD Chain для прямой эмиссии |

### Картриджная матрица (обязательная)

- **Базовый**: pH, температура, проводимость, мутность (непрерывно)
- **Металлы-1**: Pb, Cd, Hg, As (1 раз/день)
- **Металлы-2**: Fe, Mn, Cu, Zn (1 раз/день)
- **Органика**: ПАВ, фенолы, нефтепродукты (1 раз/6 часов)
- **Микробиология**: E.coli, колиформы (1 раз/день)
- **Нитраты/фосфаты**: NO3, NO2, PO4, NH4 (непрерывно)

### Экономическая модель

- **Стоимость узла**: ~$13,400 (CAPEX)
- **Обслуживание**: ~$800/мес (OPEX)
- **Гранты DAO**: Покрытие 70% costs для первых 100 установок

## Пилотный проект

**Локация**: Израиль (начало), далее Калифорния, Сингапур, Самарканд
**Цель**: 1000 установленных анализаторов в течение 12 месяцев
**Партнёры**: VODeco Labs, Weizmann Institute, Technion

## Голосование

Это конституционное предложение (L1) — требуется 66% кворум + 51% валидаторов.

**Последствия принятия:**
- Обязательная сертификация VOD-Lab для всех новых сенсоров
- Финансирование разработки из казны DAO
- Приоритетный доступ к грантам для регионов без контроля воды`,
    category: "PLATFORM_UPGRADE",
    status: "ACTIVE",
    level: "L1_CONSTITUTIONAL",
    votesFor: 2450000,
    votesAgainst: 180000,
    votesAbstain: 45000,
    quorum: 66,
    threshold: 51,
    startDate: "2026-02-15T00:00:00Z",
    endDate: "2026-03-17T00:00:00Z",
    author: {
      name: "Dr. Elena Rosenberg",
      role: "Scientist SBT",
      avatar: "ER",
    },
    relatedProject: {
      slug: "vod-lab-israel",
      name: "VOD-Lab: Пилот в Израиле",
    },
    milestones: [
      { date: "Месяц 1-3", title: "Разработка протокола", status: "pending" },
      { date: "Месяц 4-6", title: "Производство первых 50 узлов", status: "pending" },
      { date: "Месяц 7-9", title: "Установка в Израиле и тестирование", status: "pending" },
      { date: "Месяц 10-12", title: "Масштабирование на 1000 узлов", status: "pending" },
    ],
    comments: 234,
    views: 12500,
  },
};

const defaultProposal = {
  id: "default",
  title: "Финансирование проекта очистки реки",
  description: "Описание предложения...",
  category: "PROJECT_FUNDING",
  status: "ACTIVE",
  level: "L3_PROJECTS",
  votesFor: 150000,
  votesAgainst: 45000,
  votesAbstain: 12000,
  quorum: 40,
  threshold: 51,
  startDate: "2026-02-10T00:00:00Z",
  endDate: "2026-02-24T00:00:00Z",
  author: { name: "Аноним", role: "Citizen", avatar: "??" },
  milestones: [],
  comments: 45,
  views: 890,
};

export default function ProposalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [proposal, setProposal] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userVote, setUserVote] = useState<"for" | "against" | "abstain" | null>(null);
  const [votingPower, setVotingPower] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    // In real app, fetch from API
    const data = proposalDetails[params.id as string] || defaultProposal;
    setProposal(data);
    setIsLoading(false);

    // Calculate time left
    const end = new Date(data.endDate).getTime();
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
  }, [params.id]);

  const handleVote = (vote: "for" | "against" | "abstain") => {
    setUserVote(vote);
    // In real app, send to API
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
  const quorumReached = totalVotes >= (proposal.quorum * 100000); // Simplified

  const levelLabels: Record<string, { label: string; color: string; desc: string }> = {
    L1_CONSTITUTIONAL: { 
      label: "L1: Конституционный", 
      color: "bg-purple-500/20 text-purple-400",
      desc: "Требуется 66% кворум + 51% валидаторов"
    },
    L2_ECONOMIC: { 
      label: "L2: Экономический", 
      color: "bg-blue-500/20 text-blue-400",
      desc: "Требуется 51% VODeco"
    },
    L3_PROJECTS: { 
      label: "L3: Проектный", 
      color: "bg-green-500/20 text-green-400",
      desc: "40% VODeco + репутация"
    },
    L4_OPERATIONAL: { 
      label: "L4: Операционный", 
      color: "bg-yellow-500/20 text-yellow-400",
      desc: "Делегаты сообщества"
    },
  };

  const levelInfo = levelLabels[proposal.level] || levelLabels.L3_PROJECTS;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${levelInfo.color}`}>
                    {levelInfo.label}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                    Активно
                  </span>
                  {proposal.relatedProject && (
                    <Link
                      href={`/projects/${proposal.relatedProject.slug}`}
                      className="px-3 py-1 rounded-full bg-water-500/20 text-water-400 text-xs font-medium flex items-center gap-1 hover:bg-water-500/30 transition"
                    >
                      <Building2 className="w-3 h-3" />
                      Проект: {proposal.relatedProject.name}
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {proposal.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-water-200/60">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep font-bold text-xs">
                      {proposal.author.avatar}
                    </div>
                    <span className="text-white">{proposal.author.name}</span>
                    <span className="px-2 py-0.5 bg-white/5 rounded text-xs">
                      {proposal.author.role}
                    </span>
                  </div>
                  <span>•</span>
                  <span>{new Date(proposal.startDate).toLocaleDateString("ru-RU")}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {proposal.comments} комментариев
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-4 h-4" />
                    {proposal.views} просмотров
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
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-water-200/80">
                    {proposal.description}
                  </div>
                </div>
              </motion.div>

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
                  <div className="flex items-center gap-2 text-sm text-water-200/60">
                    <Clock className="w-4 h-4" />
                    {timeLeft.days}д {timeLeft.hours}ч {timeLeft.minutes}м
                  </div>
                </div>

                {/* Quorum Status */}
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
                        <span className="text-yellow-400">Кворум: {Math.round((totalVotes / (proposal.quorum * 100000)) * 100)}%</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-water-200/50 mt-1">{levelInfo.desc}</p>
                </div>

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
                      {(proposal.votesFor / 1000000).toFixed(2)}M VODeco
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
                      {(proposal.votesAgainst / 1000000).toFixed(2)}M VODeco
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-water-200/60 flex items-center gap-1">
                        <Minus className="w-4 h-4" />
                        Воздержались
                      </span>
                      <span className="text-white font-medium">
                        {totalVotes > 0 ? ((proposal.votesAbstain / totalVotes) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-water-200/40 rounded-full" 
                        style={{ width: `${totalVotes > 0 ? (proposal.votesAbstain / totalVotes) * 100 : 0}%` }} 
                      />
                    </div>
                  </div>
                </div>

                {/* Voting Power */}
                <div className="p-3 bg-white/5 rounded-lg mb-4">
                  <div className="flex items-center gap-2 text-sm text-water-200/70 mb-1">
                    <Wallet className="w-4 h-4" />
                    Ваш баланс
                  </div>
                  <p className="text-lg font-semibold text-white">2,450 UNITY</p>
                  <p className="text-xs text-water-200/50">Сила голоса = стейк + репутация</p>
                </div>

                {/* Vote Buttons */}
                {!userVote ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleVote("for")}
                      className="w-full py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Голосовать За
                    </button>
                    <button
                      onClick={() => handleVote("against")}
                      className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
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
                )}
              </motion.div>

              {/* Related Project Card */}
              {proposal.relatedProject && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-card p-6"
                >
                  <h3 className="text-sm font-medium text-water-200/50 mb-3">Связанный проект</h3>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-ocean-deep" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-1">{proposal.relatedProject.name}</h4>
                      <Link
                        href={`/projects/${proposal.relatedProject.slug}`}
                        className="text-sm text-water-400 hover:text-water-300 flex items-center gap-1"
                      >
                        Подробнее о проекте
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

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
                        Это {levelInfo.label} предложение. {levelInfo.desc}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-200/80">
                        Government SBT имеет право вето на решения, касающиеся критической инфраструктуры питьевой воды.
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
