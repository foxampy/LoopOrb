"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { NewsCard } from "./components/NewsCard";
import { worldNews, getNewsByScope, getTrendingTags, NewsItem } from "./data/news";
import { 
  Loader2, 
  RefreshCw, 
  TrendingUp, 
  Globe, 
  MapPin,
  Building2,
  Flag,
  Flame,
  Droplets,
  Hash,
  Newspaper
} from "lucide-react";

type FeedScope = 'all' | 'uzbekistan' | 'china' | 'india' | 'israel' | 'central-asia' | 'middle-east' | 'africa';

const scopeOptions = [
  { id: 'all', label: 'Все', icon: Globe },
  { id: 'uzbekistan', label: 'Узбекистан', icon: Flag },
  { id: 'central-asia', label: 'Центральная Азия', icon: MapPin },
  { id: 'china', label: 'Китай', icon: Building2 },
  { id: 'india', label: 'Индия', icon: Flag },
  { id: 'israel', label: 'Израиль', icon: Flag },
  { id: 'middle-east', label: 'Ближний Восток', icon: Flame },
  { id: 'africa', label: 'Африка', icon: MapPin },
];

export default function FeedPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeScope, setActiveScope] = useState<FeedScope>('all');
  const [trendingTags, setTrendingTags] = useState<{ tag: string; count: number }[]>([]);

  useEffect(() => {
    loadNews();
    setTrendingTags(getTrendingTags());
  }, [activeScope]);

  const loadNews = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const filteredNews = getNewsByScope(activeScope);
      setNews(filteredNews);
      setIsLoading(false);
    }, 500);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadNews();
    setIsRefreshing(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-3">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Newspaper className="w-6 h-6 text-water-400" />
                    Новости водного мира
                  </h1>
                  <p className="text-slate-400 text-sm">
                    Актуальные новости из Узбекистана, Китая, Индии, Израиля и всего мира
                  </p>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <RefreshCw className={`w-5 h-5 text-slate-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Scope Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {scopeOptions.map((scope) => {
                  const Icon = scope.icon;
                  return (
                    <button
                      key={scope.id}
                      onClick={() => setActiveScope(scope.id as FeedScope)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeScope === scope.id
                          ? 'bg-water-500 text-white'
                          : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {scope.label}
                    </button>
                  );
                })}
              </div>

              {/* News Grid */}
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 text-water-500 animate-spin" />
                </div>
              ) : (
                <div className="grid gap-4">
                  <AnimatePresence mode="popLayout">
                    {news.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <NewsCard news={item} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {!isLoading && news.length === 0 && (
                <div className="text-center py-12">
                  <Globe className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Нет новостей</h3>
                  <p className="text-slate-400">Попробуйте выбрать другой регион</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Tags */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-water-400" />
                  Тренды
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map(({ tag, count }) => (
                    <button
                      key={tag}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full text-xs text-slate-300 transition-colors flex items-center gap-1"
                    >
                      <Hash className="w-3 h-3 text-slate-500" />
                      {tag}
                      <span className="text-slate-500">{count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <h3 className="font-semibold text-white mb-4">Статистика</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Всего новостей</span>
                    <span className="text-white font-medium">{worldNews.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Алерты</span>
                    <span className="text-red-400 font-medium">
                      {worldNews.filter(n => n.type === 'alert').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Проекты</span>
                    <span className="text-cyan-400 font-medium">
                      {worldNews.filter(n => n.type === 'project').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Исследования</span>
                    <span className="text-emerald-400 font-medium">
                      {worldNews.filter(n => n.type === 'research').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Regions */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <h3 className="font-semibold text-white mb-4">Регионы</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Узбекистан', count: worldNews.filter(n => n.scope === 'uzbekistan').length },
                    { name: 'Китай', count: worldNews.filter(n => n.scope === 'china').length },
                    { name: 'Индия', count: worldNews.filter(n => n.scope === 'india').length },
                    { name: 'Израиль', count: worldNews.filter(n => n.scope === 'israel').length },
                    { name: 'Ближний Восток', count: worldNews.filter(n => n.scope === 'middle-east').length },
                    { name: 'Центральная Азия', count: worldNews.filter(n => n.scope === 'central-asia').length },
                    { name: 'Африка', count: worldNews.filter(n => n.scope === 'africa').length },
                    { name: 'Глобальные', count: worldNews.filter(n => n.scope === 'global').length },
                  ].map((region) => (
                    <button
                      key={region.name}
                      className="w-full flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <span className="text-slate-300 text-sm">{region.name}</span>
                      <span className="text-slate-500 text-xs">{region.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subscribe */}
              <div className="bg-gradient-to-br from-water-500/10 to-cyan-500/10 rounded-xl border border-water-500/20 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-water-400" />
                  <h3 className="font-semibold text-white">LoopOrb Daily</h3>
                </div>
                <p className="text-slate-400 text-sm mb-4">
                  Получайте главные новости о воде каждое утро
                </p>
                <button className="w-full py-2 bg-water-500 hover:bg-water-600 text-white rounded-lg text-sm font-medium transition-colors">
                  Подписаться
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
