"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  AlertTriangle,
  TrendingUp,
  Microscope,
  CheckCircle2,
  FileText,
  Globe,
  MapPin,
  ExternalLink
} from "lucide-react";
import { NewsItem } from "../data/news";

const typeIcons = {
  alert: AlertTriangle,
  project: TrendingUp,
  research: Microscope,
  success: CheckCircle2,
  policy: FileText
};

const typeColors = {
  alert: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30", label: "Алерт" },
  project: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30", label: "Проект" },
  research: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30", label: "Исследование" },
  success: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30", label: "Успех" },
  policy: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30", label: "Политика" }
};

const scopeLabels: Record<string, string> = {
  'global': 'Глобальное',
  'uzbekistan': 'Узбекистан',
  'china': 'Китай',
  'india': 'Индия',
  'israel': 'Израиль',
  'central-asia': 'Центральная Азия',
  'middle-east': 'Ближний Восток',
  'africa': 'Африка'
};

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  const TypeIcon = typeIcons[news.type];
  const colors = typeColors[news.type];

  return (
    <article className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all group">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-72 lg:w-80 h-48 md:h-auto relative overflow-hidden">
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r" />
          
          {/* Type Badge */}
          <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full ${colors.bg} border ${colors.border} flex items-center gap-1.5`}>
            <TypeIcon className={`w-3.5 h-3.5 ${colors.text}`} />
            <span className={`text-xs font-medium ${colors.text}`}>{colors.label}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Globe className="w-3.5 h-3.5" />
              <span>{scopeLabels[news.scope] || news.scope}</span>
              <span>•</span>
              <span>{news.source}</span>
              <span>•</span>
              <span>{news.date}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-water-400 transition-colors line-clamp-2">
            {news.title}
          </h3>

          {/* Summary */}
          <p className="text-slate-400 text-sm mb-4 line-clamp-3">
            {news.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {news.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-white/5 rounded text-xs text-slate-400 hover:bg-white/10 hover:text-slate-300 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 transition-colors">
                <Heart className="w-4 h-4" />
                <span className="text-xs">{news.likes.toLocaleString()}</span>
              </button>
              <button className="flex items-center gap-1.5 text-slate-400 hover:text-water-400 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">{news.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 text-slate-400 hover:text-water-400 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-1.5 text-slate-400 hover:text-white transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-slate-300 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                Читать
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
