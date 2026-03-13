"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2, Handshake, Globe, Beaker, Landmark, Factory,
  Search, Plus, Mail, ExternalLink, CheckCircle, Star,
  Users, BarChart3, Droplets, FileText, ArrowRight, Loader2,
  Shield, Award, Zap
} from "lucide-react";

// Types
interface Partner {
  id: string;
  name: string;
  type: 'government' | 'ngo' | 'corporate' | 'research';
  logo?: string;
  description: string;
  website: string;
  contact_email: string;
  location: string;
  status: 'pending' | 'active' | 'inactive';
  projects_count: number;
  verified: boolean;
  joined_at: string;
}

const partnerTypes = [
  { id: "all", label: "Все партнеры", icon: Handshake },
  { id: "government", label: "Правительства", icon: Landmark },
  { id: "corporate", label: "Корпорации", icon: Factory },
  { id: "ngo", label: "НGO", icon: Globe },
  { id: "research", label: "Исследования", icon: Beaker },
];

const typeColors = {
  government: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  corporate: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  ngo: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
  research: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
};

const typeLabels = {
  government: "Правительство",
  corporate: "Корпорация",
  ngo: "NGO",
  research: "Исследование",
};

// Empty state - no demo data
const defaultPartners: Partner[] = [];

function PartnerCard({ partner, index }: { partner: Partner; index: number }) {
  const colors = typeColors[partner.type];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card overflow-hidden hover:border-water-500/30 transition-colors"
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
            {partner.logo ? (
              <img src={partner.logo} alt={partner.name} className="w-10 h-10 object-contain" />
            ) : (
              <Building2 className={`w-7 h-7 ${colors.text}`} />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full border ${colors.border} ${colors.text}`}>
                {typeLabels[partner.type]}
              </span>
              {partner.verified && (
                <span className="flex items-center gap-1 text-xs text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  Верифицирован
                </span>
              )}
            </div>
            
            <Link href={`/partners/${partner.id}`}>
              <h3 className="font-semibold text-white hover:text-cyan-glow transition-colors">
                {partner.name}
              </h3>
            </Link>
            
            <p className="text-sm text-water-200/60 line-clamp-2 mt-1 mb-3">
              {partner.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-water-200/50">
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {partner.location}
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                {partner.projects_count} проектов
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-cyan-glow hover:underline flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            Веб-сайт
          </a>
          
          <Link 
            href={`/partners/${partner.id}`}
            className="btn-secondary text-sm px-3 py-1.5"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// Empty State
function EmptyPartnersState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-4"
    >
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-water-500/20 to-cyan-glow/20 flex items-center justify-center">
        <Handshake className="w-12 h-12 text-water-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">Станьте первым партнером</h2>
      <p className="text-water-200/60 max-w-md mx-auto mb-8">
        Присоединяйтесь к глобальной сети организаций, работающих над 
        улучшением качества воды по всему миру.
      </p>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
        {[
          { icon: BarChart3, text: "Мониторинг данных", type: "Для всех" },
          { icon: Droplets, text: "IoT интеграция", type: "Корпорациям" },
          { icon: FileText, text: "Отчетность", type: "Правительствам" },
          { icon: Award, text: "Исследования", type: "НИО" },
        ].map((item, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <item.icon className="w-8 h-8 text-cyan-glow mx-auto mb-2" />
            <div className="text-sm text-white mb-1">{item.text}</div>
            <div className="text-xs text-water-200/50">{item.type}</div>
          </div>
        ))}
      </div>

      <button className="btn-primary inline-flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Стать партнером
      </button>
    </motion.div>
  );
}

// Stats
function PartnersStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Landmark className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">0</div>
            <div className="text-xs text-water-200/50">Правительств</div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Factory className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">0</div>
            <div className="text-xs text-water-200/50">Корпораций</div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <Globe className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">0</div>
            <div className="text-xs text-water-200/50">NGO</div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <Beaker className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">0</div>
            <div className="text-xs text-water-200/50">Исследований</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// B2B Features
function B2BFeatures() {
  const features = [
    {
      icon: BarChart3,
      title: "Корпоративный дашборд",
      description: "Аналитика и отчеты для вашей организации",
    },
    {
      icon: Droplets,
      title: "Управление устройствами",
      description: "Централизованный контроль IoT сенсоров",
    },
    {
      icon: FileText,
      title: "API доступ",
      description: "Интеграция с вашими системами",
    },
    {
      icon: Shield,
      title: "Верификация данных",
      description: "Криптографическая проверка измерений",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">B2B Портал</h3>
          <p className="text-sm text-water-200/60">Решения для бизнеса и организаций</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
            <feature.icon className="w-5 h-5 text-cyan-glow flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-white text-sm">{feature.title}</h4>
              <p className="text-xs text-water-200/50 mt-1">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-water-200/60">
          Получите доступ к корпоративным инструментам
        </p>
        <button className="btn-primary flex items-center gap-2">
          Запросить демо
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export default function PartnersPage() {
  const [activeType, setActiveType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [partners, setPartners] = useState<Partner[]>(defaultPartners);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPartners();
  }, [activeType, searchQuery]);

  const loadPartners = async () => {
    setIsLoading(true);
    try {
      // TODO: Fetch from API
      // const res = await fetch(`/api/partners?type=${activeType}&q=${searchQuery}`);
      // const data = await res.json();
      setPartners([]);
    } catch (error) {
      console.error("Failed to load partners:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPartners = partners.filter(p => {
    if (activeType !== "all" && p.type !== activeType) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query)
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
          <h1 className="text-3xl font-bold text-white mb-2">Партнерства & B2B</h1>
          <p className="text-water-200/70">
            Присоединяйтесь к глобальной сети организаций для решения водных проблем
          </p>
        </motion.div>

        {/* Stats */}
        <PartnersStats />

        {/* B2B Features */}
        <B2BFeatures />

        {/* Search & Filter */}
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
              placeholder="Поиск партнеров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-water-200/30 focus:outline-none focus:border-water-500"
            />
          </div>
          
          <button className="btn-primary flex items-center gap-2 whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Стать партнером
          </button>
        </motion.div>

        {/* Type Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-2 mb-6 overflow-x-auto"
        >
          <div className="flex gap-2 min-w-max">
            {partnerTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                  activeType === type.id
                    ? "bg-water-500/20 text-water-400"
                    : "text-water-200/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <type.icon className="w-4 h-4" />
                {type.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-cyan-glow animate-spin" />
          </div>
        ) : filteredPartners.length === 0 ? (
          <EmptyPartnersState />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredPartners.map((partner, index) => (
              <PartnerCard key={partner.id} partner={partner} index={index} />
            ))}
          </div>
        )}

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 glass-card p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-6 text-center">
            Преимущества партнерства
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Сеть экспертов", desc: "Доступ к глобальному сообществу" },
              { icon: BarChart3, title: "Данные", desc: "Агрегированные данные о воде" },
              { icon: Shield, title: "Верификация", desc: "Блокчейн-подтверждение" },
              { icon: Award, title: "Признание", desc: "ESG рейтинг и сертификация" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-water-500/20 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-cyan-glow" />
                </div>
                <h4 className="font-medium text-white mb-1">{item.title}</h4>
                <p className="text-xs text-water-200/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
