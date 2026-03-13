"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Vote, Plus, Clock, CheckCircle, XCircle, Users, TrendingUp,
  Shield, ArrowRight, Loader2, Gavel, Target, BarChart3,
  Lock, AlertCircle, FileText, Sparkles
} from "lucide-react";

interface Proposal {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'draft' | 'active' | 'passed' | 'rejected' | 'executed';
  level: 'L1_CONSTITUTIONAL' | 'L2_ECONOMIC' | 'L3_PROJECTS';
  votesFor: number;
  votesAgainst: number;
  votesAbstain: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  votesCount: number;
  quorumRequired: number;
  quorumCurrent: number;
}

const categories = [
  { id: "all", label: "Все", icon: Vote },
  { id: "active", label: "Активные", icon: Clock },
  { id: "passed", label: "Принятые", icon: CheckCircle },
  { id: "rejected", label: "Отклоненные", icon: XCircle },
];

const levelLabels = {
  L1_CONSTITUTIONAL: { label: "Конституционный", color: "text-red-400", bg: "bg-red-500/20" },
  L2_ECONOMIC: { label: "Экономический", color: "text-yellow-400", bg: "bg-yellow-500/20" },
  L3_PROJECTS: { label: "Проектный", color: "text-green-400", bg: "bg-green-500/20" },
};

const statusLabels = {
  draft: { label: "Черновик", color: "text-slate-400" },
  active: { label: "Голосование", color: "text-cyan-400" },
  passed: { label: "Принят", color: "text-green-400" },
  rejected: { label: "Отклонен", color: "text-red-400" },
  executed: { label: "Исполнен", color: "text-purple-400" },
};

// Empty state - no proposals yet
const defaultProposals: Proposal[] = [];

function ProposalCard({ proposal, index }: { proposal: Proposal; index: number }) {
  const level = levelLabels[proposal.level];
  const status = statusLabels[proposal.status];
  const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
  const forPercent = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
  const quorumPercent = (proposal.quorumCurrent / proposal.quorumRequired) * 100;
  const isActive = proposal.status === 'active';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card overflow-hidden hover:border-water-500/30 transition-colors"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full ${level.bg} ${level.color}`}>
              {level.label}
            </span>
            <span className={`text-xs ${status.color}`}>
              {status.label}
            </span>
          </div>
          {isActive && (
            <div className="flex items-center gap-1 text-xs text-water-200/50">
              <Clock className="w-3 h-3" />
              {new Date(proposal.endDate) > new Date() ? (
                <span>До {new Date(proposal.endDate).toLocaleDateString('ru-RU')}</span>
              ) : (
                <span>Завершено</span>
              )}
            </div>
          )}
        </div>

        <Link href={`/dao/${proposal.id}`}>
          <h3 className="font-semibold text-white mb-2 hover:text-cyan-glow transition-colors line-clamp-2">
            {proposal.title}
          </h3>
        </Link>
        
        <p className="text-sm text-water-200/60 line-clamp-2 mb-4">
          {proposal.description}
        </p>

        {/* Voting Progress */}
        {isActive && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-water-200/50">За: {forPercent.toFixed(1)}%</span>
              <span className="text-water-200/50">{proposal.votesCount} голосов</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                style={{ width: `${forPercent}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs">
              <span className="text-water-200/40">Кворум: {quorumPercent.toFixed(1)}%</span>
              <span className="text-water-200/40">Требуется: {proposal.quorumRequired}%</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span>{(proposal.votesFor / 1000000).toFixed(2)}M</span>
            </div>
            <div className="flex items-center gap-1 text-red-400">
              <XCircle className="w-4 h-4" />
              <span>{(proposal.votesAgainst / 1000000).toFixed(2)}M</span>
            </div>
          </div>
          
          {isActive && (
            <Link 
              href={`/dao/${proposal.id}`}
              className="btn-primary text-sm px-4 py-1.5"
            >
              Голосовать
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Empty State
function EmptyDaoState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-4"
    >
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-water-500/20 to-cyan-glow/20 flex items-center justify-center">
        <Gavel className="w-12 h-12 text-water-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">DAO еще не активно</h2>
      <p className="text-water-200/60 max-w-md mx-auto mb-8">
        Децентрализованное управление будет запущено после распределения токенов. 
        Сейчас вы можете ознакомиться с принципами работы.
      </p>
      
      <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
        {[
          { icon: Shield, title: "L1 Конституционный", desc: "Изменения базовых правил" },
          { icon: TrendingUp, title: "L2 Экономический", desc: "Параметры токеномики" },
          { icon: Target, title: "L3 Проектный", desc: "Финансирование проектов" },
        ].map((item, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <item.icon className="w-8 h-8 text-cyan-glow mx-auto mb-2" />
            <div className="text-sm text-white mb-1">{item.title}</div>
            <div className="text-xs text-water-200/50">{item.desc}</div>
          </div>
        ))}
      </div>

      <button className="btn-primary inline-flex items-center gap-2">
        <FileText className="w-4 h-4" />
        Читать документацию
      </button>
    </motion.div>
  );
}

// Stats Component
function DaoStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <Vote className="w-5 h-5 text-cyan-glow" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">0</div>
            <div className="text-xs text-water-200/50">Предложений</div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">0</div>
            <div className="text-xs text-water-200/50">Принято</div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">0</div>
            <div className="text-xs text-water-200/50">Участников</div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <Lock className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">0</div>
            <div className="text-xs text-water-200/50">Застейкано</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DAOPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [proposals, setProposals] = useState<Proposal[]>(defaultProposals);
  const [isLoading, setIsLoading] = useState(false);
  const [userVotingPower, setUserVotingPower] = useState(0);

  useEffect(() => {
    loadProposals();
  }, [activeCategory]);

  const loadProposals = async () => {
    setIsLoading(true);
    try {
      // TODO: Fetch from API
      // const res = await fetch(`/api/dao?status=${activeCategory}`);
      // const data = await res.json();
      setProposals([]);
    } catch (error) {
      console.error("Failed to load proposals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProposals = proposals.filter(p => {
    if (activeCategory === "all") return true;
    if (activeCategory === "active") return p.status === 'active';
    return p.status === activeCategory;
  });

  return (
    <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">DAO Управление</h1>
          <p className="text-water-200/70">
            Децентрализованное управление экосистемой VODeco
          </p>
        </motion.div>

        {/* Stats */}
        <DaoStats />

        {/* User Voting Power */}
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
                  Застейкайте VOD для участия в управлении
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{userVotingPower.toLocaleString()}</div>
                <div className="text-xs text-water-200/50">VOD застейкано</div>
              </div>
              <Link 
                href="/staking"
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Застейкать
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
        >
          <div className="glass-card p-2 overflow-x-auto">
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
          
          <Link 
            href="/dao/new"
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Создать предложение
          </Link>
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-cyan-glow animate-spin" />
          </div>
        ) : filteredProposals.length === 0 ? (
          <EmptyDaoState />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredProposals.map((proposal, index) => (
              <ProposalCard key={proposal.id} proposal={proposal} index={index} />
            ))}
          </div>
        )}

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Как работает DAO?</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                step: "1", 
                title: "Создание", 
                desc: "Любой участник может создать предложение",
                icon: FileText
              },
              { 
                step: "2", 
                title: "Обсуждение", 
                desc: "7 дней на обсуждение сообществом",
                icon: Users
              },
              { 
                step: "3", 
                title: "Голосование", 
                desc: "Голоса пропорциональны застейканным токенам",
                icon: Vote
              },
              { 
                step: "4", 
                title: "Исполнение", 
                desc: "При кворуме 10%+ предложение принимается",
                icon: CheckCircle
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="w-10 h-10 rounded-lg bg-water-500/20 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-cyan-glow" />
                </div>
                <h4 className="font-medium text-white mb-1">{item.title}</h4>
                <p className="text-sm text-water-200/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
