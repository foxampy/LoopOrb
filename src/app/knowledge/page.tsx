"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, Search, Filter, Plus, FileText, ExternalLink,
  CheckCircle, XCircle, Clock, ChevronRight, Star, User,
  Calendar, Tag, Award, Loader2, Droplets, Beaker, Globe,
  BarChart3, Shield, Zap
} from "lucide-react";

// Types
interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  doi: string | null;
  url: string;
  published_date: string;
  category: string;
  tags: string[];
  verified: boolean;
  submitted_by: {
    name: string;
    avatar?: string;
  };
  votes_up: number;
  votes_down: number;
  created_at: string;
}

const categories = [
  { id: "all", label: "Все", icon: BookOpen },
  { id: "research", label: "Исследования", icon: Beaker },
  { id: "reports", label: "Отчеты", icon: BarChart3 },
  { id: "guides", label: "Руководства", icon: FileText },
  { id: "standards", label: "Стандарты", icon: Shield },
  { id: "news", label: "Новости", icon: Globe },
];

const sortOptions = [
  { id: "newest", label: "Новые" },
  { id: "popular", label: "Популярные" },
  { id: "verified", label: "Верифицированные" },
];

// Empty state - no demo data
const defaultPapers: ResearchPaper[] = [];

function PaperCard({ paper, index }: { paper: ResearchPaper; index: number }) {
  const voteScore = paper.votes_up - paper.votes_down;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card overflow-hidden hover:border-water-500/30 transition-colors"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-water-500/20 text-water-400">
                {paper.category}
              </span>
              {paper.verified && (
                <span className="flex items-center gap-1 text-xs text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  Верифицировано
                </span>
              )}
            </div>
            
            <Link href={`/knowledge/${paper.id}`}>
              <h3 className="font-semibold text-white mb-2 hover:text-cyan-glow transition-colors line-clamp-2">
                {paper.title}
              </h3>
            </Link>
            
            <p className="text-sm text-water-200/60 line-clamp-2 mb-3">
              {paper.abstract}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-water-200/50">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {paper.authors.slice(0, 2).join(", ")}
                {paper.authors.length > 2 && ` +${paper.authors.length - 2}`}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(paper.published_date).toLocaleDateString("ru-RU")}
              </div>
              {paper.doi && (
                <span className="text-cyan-glow">DOI: {paper.doi}</span>
              )}
            </div>

            {paper.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {paper.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-water-200/50">
                    #{tag}
                  </span>
                ))}
                {paper.tags.length > 3 && (
                  <span className="text-xs text-water-200/30">+{paper.tags.length - 3}</span>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
              voteScore >= 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
            }`}>
              <Star className="w-3 h-3" />
              <span className="text-xs font-medium">{voteScore > 0 ? `+${voteScore}` : voteScore}</span>
            </div>
            
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-water-200/50 hover:text-cyan-glow transition-colors"
              title="Открыть источник"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Empty State
function EmptyKnowledgeState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-4"
    >
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-water-500/20 to-cyan-glow/20 flex items-center justify-center">
        <BookOpen className="w-12 h-12 text-water-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">Библиотека пуста</h2>
      <p className="text-water-200/60 max-w-md mx-auto mb-8">
        Станьте первым, кто добавит исследование или документ. 
        Получите XP и помогите сообществу.
      </p>
      
      <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
        {[
          { icon: FileText, text: "Загрузите PDF", reward: "+100 XP" },
          { icon: CheckCircle, text: "Пройдите верификацию", reward: "+50 XP" },
          { icon: Award, text: "Получите статус эксперта", reward: "Бейдж" },
        ].map((item, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <item.icon className="w-8 h-8 text-cyan-glow mx-auto mb-2" />
            <div className="text-sm text-white mb-1">{item.text}</div>
            <div className="text-xs text-cyan-glow">{item.reward}</div>
          </div>
        ))}
      </div>

      <button className="btn-primary inline-flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Добавить исследование
      </button>
    </motion.div>
  );
}

// Stats Section
function KnowledgeStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-water-500/20 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-water-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">0</div>
            <div className="text-xs text-water-200/50">Документов</div>
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
            <div className="text-xs text-water-200/50">Верифицировано</div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <User className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">0</div>
            <div className="text-xs text-water-200/50">Авторов</div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">0</div>
            <div className="text-xs text-water-200/50">Проверок</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function KnowledgePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [papers, setPapers] = useState<ResearchPaper[]>(defaultPapers);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: Fetch from API
    loadPapers();
  }, [activeCategory, sortBy, searchQuery]);

  const loadPapers = async () => {
    setIsLoading(true);
    try {
      // const res = await fetch(`/api/knowledge?category=${activeCategory}&sort=${sortBy}&q=${searchQuery}`);
      // const data = await res.json();
      // setPapers(data.papers);
      setPapers([]); // Empty for now
    } catch (error) {
      console.error("Failed to load papers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPapers = papers.filter(paper => {
    if (activeCategory !== "all" && paper.category !== activeCategory) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        paper.title.toLowerCase().includes(query) ||
        paper.abstract.toLowerCase().includes(query) ||
        paper.authors.some(a => a.toLowerCase().includes(query))
      );
    }
    return true;
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
          <h1 className="text-3xl font-bold text-white mb-2">Библиотека знаний</h1>
          <p className="text-water-200/70">
            Научные исследования, отчеты и стандарты о водных ресурсах
          </p>
        </motion.div>

        {/* Stats */}
        <KnowledgeStats />

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-water-200/50" />
            <input
              type="text"
              placeholder="Поиск по названию, автору, DOI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-water-200/30 focus:outline-none focus:border-water-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-water-500"
            >
              {sortOptions.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
            
            <button className="btn-primary flex items-center gap-2 whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Добавить
            </button>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-2 mb-6 overflow-x-auto"
        >
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
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-cyan-glow animate-spin" />
          </div>
        ) : filteredPapers.length === 0 ? (
          <EmptyKnowledgeState />
        ) : (
          <div className="space-y-4">
            {filteredPapers.map((paper, index) => (
              <PaperCard key={paper.id} paper={paper} index={index} />
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
          <h3 className="text-lg font-semibold text-white mb-4">Как работает библиотека?</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <div className="w-10 h-10 rounded-lg bg-water-500/20 flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-water-400">1</span>
              </div>
              <h4 className="font-medium text-white mb-1">Загрузите</h4>
              <p className="text-sm text-water-200/60">
                Добавьте исследование в формате PDF или укажите ссылку
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-water-500/20 flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-water-400">2</span>
              </div>
              <h4 className="font-medium text-white mb-1">Верификация</h4>
              <p className="text-sm text-water-200/60">
                Сообщество проверяет качество и достоверность материала
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-water-500/20 flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-water-400">3</span>
              </div>
              <h4 className="font-medium text-white mb-1">Награды</h4>
              <p className="text-sm text-water-200/60">
                Получите XP и статус эксперта за вклад в науку
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
