"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import { useSocket } from "@/hooks/useSocket";
import { useTranslations } from "next-intl";
import {
  Droplets,
  ArrowRight,
  Plus,
  Globe,
  Target,
  Gavel,
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  ChevronDown,
  UserPlus,
  User,
  Trophy,
  Zap,
  TrendingUp,
  Users,
  Wallet,
  Award,
  Bell,
  Sparkles,
  Flame,
  Calendar,
  BarChart3,
  Microscope,
  FolderOpen,
  Mail,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  X,
  Menu,
  Home,
  Compass,
  Activity,
  Settings,
  RefreshCw,
  HandCoins,
  Lightbulb,
  PenSquare,
  Rocket,
  Waves,
  Thermometer,
  Wind,
  Droplet,
  Eye,
  Star,
  Gift,
  Crown,
  BadgeCheck,
  Shield,
  Lock,
  Unlock,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Code,
  UsersRound,
  Palette,
  Cpu,
  Megaphone,
  BrainCircuit,
} from "lucide-react";

// Dynamically import Globe3D to avoid SSR issues
const Globe3D = dynamic(() => import("@/components/Globe3D"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-ocean-deep/50 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-water-200/70 text-sm">Loading 3D globe...</p>
      </div>
    </div>
  ),
});

// ==================== TYPES ====================

interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  unityBalance: number;
  vodecoBalance: number;
  vodBalance: number;
  role: string;
  level: number;
  xp: number;
  reputation: number;
  stakedAmount: number;
  postsCount: number;
  dataCount: number;
  projectsCount: number;
  handle?: string;
  bio?: string;
  createdAt: string;
}

interface Project {
  id: string;
  slug: string;
  name: string;
  coverImage?: string;
  status: string;
  raisedAmount: number;
  targetAmount?: number;
  type?: string;
  country?: string;
  esgScore?: number;
  expectedApy?: number;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  type: "DAILY" | "WEEKLY" | "ONETIME";
  category: string;
  xpReward: number;
  unityReward: number;
  isActive: boolean;
  userProgress?: {
    status: string;
    progress: number;
    target: number;
  } | null;
}

interface FeedItem {
  id: string;
  type: string;
  title: string;
  summary?: string;
  author?: {
    id: string;
    name: string;
    avatar?: string;
    level: number;
  };
  project?: {
    id: string;
    name: string;
    slug: string;
    coverImage?: string;
  };
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  createdAt: string;
  content?: string;
}

interface SensorData {
  id: string;
  name: string;
  location: string;
  type: string;
  value: number;
  unit: string;
  status: "online" | "offline" | "warning";
  lastUpdate: string;
  trend: "up" | "down" | "stable";
}

interface RetroDrop {
  id: string;
  title: string;
  description: string;
  reward: number;
  token: string;
  progress: number;
  target: number;
  endsAt: string;
  isActive: boolean;
}

interface StatCard {
  label: string;
  value: string | number;
  change?: number;
  icon: any;
  color: string;
}

interface QuickAction {
  id: string;
  label: string;
  icon: any;
  href?: string;
  onClick?: () => void;
  color: string;
}

interface Recommendation {
  id: string;
  type: "project" | "mission" | "dao";
  title: string;
  description: string;
  matchScore: number;
  image?: string;
  href: string;
}

// ==================== NO MOCK DATA - PLATFORM IN DEVELOPMENT ====================

const typeIcons: Record<string, any> = {
  news: Globe,
  project: Droplets,
  alert: AlertTriangle,
  success: CheckCircle,
  update: Clock,
};

const typeColors: Record<string, string> = {
  news: "bg-blue-500/20 text-blue-400",
  project: "bg-green-500/20 text-green-400",
  alert: "bg-red-500/20 text-red-400",
  success: "bg-cyan-500/20 text-cyan-400",
  update: "bg-yellow-500/20 text-yellow-400",
};

// ==================== SUB-COMPONENTS ====================

// Stat Card with Animation
function AnimatedStatCard({ stat, index }: { stat: StatCard; index: number }) {
  const Icon = stat.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-4 relative overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-10 rounded-full blur-2xl -mr-12 -mt-12 transition group-hover:opacity-20`} />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 rounded-lg ${stat.color} bg-opacity-20 flex items-center justify-center`}>
            <Icon className="w-5 h-5" />
          </div>
          {stat.change !== undefined && (
            <span className={`text-xs font-medium ${stat.change >= 0 ? "text-green-400" : "text-red-400"}`}>
              {stat.change >= 0 ? "+" : ""}{stat.change}%
            </span>
          )}
        </div>
        
        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
        <div className="text-xs text-water-200/60">{stat.label}</div>
      </div>
    </motion.div>
  );
}

// News/Feed Card
function FeedCard({ item, index }: { item: FeedItem; index: number }) {
  const [liked, setLiked] = useState(item.isLiked);
  const [bookmarked, setBookmarked] = useState(false);
  const TypeIcon = typeIcons[item.type] || Globe;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card overflow-hidden group"
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${typeColors[item.type] || "bg-water-500/20 text-water-400"} flex items-center justify-center`}>
            <TypeIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white text-sm">{item.author?.name || "LoopOrb"}</span>
              {item.author?.level && item.author.level >= 5 && (
                <BadgeCheck className="w-3 h-3 text-water-400" />
              )}
            </div>
            <div className="text-xs text-water-200/50">{item.createdAt}</div>
          </div>
        </div>
        <button className="text-water-200/50 hover:text-white transition">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="px-4 pb-3">
        <h3 className="text-base font-semibold text-white mb-2 hover:text-water-400 transition cursor-pointer">
          {item.title}
        </h3>
        {item.summary && (
          <p className="text-water-200/70 text-sm line-clamp-2">{item.summary}</p>
        )}
      </div>

      {item.project?.coverImage && (
        <div className="relative h-40 overflow-hidden">
          <img 
            src={item.project.coverImage} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 to-transparent" />
        </div>
      )}

      <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 transition ${liked ? "text-red-400" : "text-water-200/50 hover:text-red-400"}`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            <span className="text-xs">{item.likesCount + (liked ? 1 : 0)}</span>
          </button>
          <button className="flex items-center gap-1.5 text-water-200/50 hover:text-water-400 transition">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs">{item.commentsCount}</span>
          </button>
          <button className="text-water-200/50 hover:text-water-400 transition">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`transition ${bookmarked ? "text-water-400" : "text-water-200/50 hover:text-water-400"}`}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
        </button>
      </div>
    </motion.article>
  );
}

// Quick Action Button
function QuickActionButton({ action, index }: { action: QuickAction; index: number }) {
  const Icon = action.icon;
  
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      onClick={action.onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl ${action.color} hover:bg-opacity-30 transition group`}
    >
      <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center group-hover:scale-110 transition`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-xs text-white font-medium text-center">{action.label}</span>
    </motion.button>
  );
}

// Mission Card
function MissionCard({ mission, index }: { mission: Mission; index: number }) {
  const progress = mission.userProgress 
    ? (mission.userProgress.progress / mission.userProgress.target) * 100 
    : 0;
  const isCompleted = mission.userProgress?.status === "COMPLETED";
  
  const typeColors = {
    DAILY: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    WEEKLY: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    ONETIME: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`glass-card p-4 border ${typeColors[mission.type as keyof typeof typeColors]} group hover:border-opacity-50 transition`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-1">{mission.title}</h4>
          <p className="text-xs text-water-200/60">{mission.description}</p>
        </div>
        <div className="flex items-center gap-1 text-yellow-400">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-bold">{mission.xpReward} XP</span>
        </div>
      </div>
      
      {mission.userProgress && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-water-200/60">Progress</span>
            <span className="text-white">{mission.userProgress.progress}/{mission.userProgress.target}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`h-full rounded-full ${isCompleted ? "bg-green-400" : "bg-water-400"}`}
            />
          </div>
          {isCompleted && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full py-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30 transition"
            >
              Claim Reward
            </motion.button>
          )}
        </div>
      )}
      
      {!mission.userProgress && (
        <button className="w-full py-2 bg-water-500/20 border border-water-500/30 text-water-400 rounded-lg text-sm font-medium hover:bg-water-500/30 transition">
          Start Mission
        </button>
      )}
    </motion.div>
  );
}

// Retro Drop Card
function RetroDropCard({ drop, index }: { drop: RetroDrop; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-4 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
      
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <Gift className="w-5 h-5 text-yellow-400" />
          <h4 className="font-semibold text-white">{drop.title}</h4>
        </div>
        
        <p className="text-xs text-water-200/60 mb-4">{drop.description}</p>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-ocean-deep font-bold text-xs">
              {drop.token.charAt(0)}
            </div>
            <span className="text-lg font-bold text-white">{drop.reward} {drop.token}</span>
          </div>
          <span className="text-xs text-water-200/50">until {new Date(drop.endsAt).toLocaleDateString("en-US")}</span>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-water-200/60">Progress</span>
            <span className="text-white">{drop.progress}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${drop.progress}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Sensor Widget
function SensorWidget({ sensor, index }: { sensor: SensorData; index: number }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "pH": return Droplet;
      case "turbidity": return Waves;
      case "oxygen": return Wind;
      case "temperature": return Thermometer;
      default: return Activity;
    }
  };
  
  const Icon = getIcon(sensor.type);
  const statusColors = {
    online: "bg-green-400",
    offline: "bg-gray-400",
    warning: "bg-yellow-400",
  };
  
  const trendColors = {
    up: "text-red-400",
    down: "text-green-400",
    stable: "text-water-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-3 flex items-center gap-3 group hover:bg-white/10 transition"
    >
      <div className="w-10 h-10 rounded-lg bg-water-500/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-water-400" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white truncate">{sensor.name}</span>
          <span className={`w-2 h-2 rounded-full ${statusColors[sensor.status]} ${sensor.status === "online" ? "animate-pulse" : ""}`} />
        </div>
        <div className="text-xs text-water-200/50 truncate">{sensor.location}</div>
      </div>
      
      <div className="text-right">
        <div className="text-sm font-bold text-white">
          {sensor.value} <span className="text-xs text-water-200/50">{sensor.unit}</span>
        </div>
        <div className={`text-xs ${trendColors[sensor.trend]}`}>
          {sensor.trend === "up" ? "↑" : sensor.trend === "down" ? "↓" : "→"} {sensor.lastUpdate}
        </div>
      </div>
    </motion.div>
  );
}

// Recommendation Card
function RecommendationCard({ rec, index }: { rec: Recommendation; index: number }) {
  const typeIcons = {
    project: FolderOpen,
    mission: Target,
    dao: Gavel,
  };
  
  const typeColors = {
    project: "bg-green-500/20 text-green-400",
    mission: "bg-orange-500/20 text-orange-400",
    dao: "bg-purple-500/20 text-purple-400",
  };
  
  const Icon = typeIcons[rec.type];

  return (
    <Link href={rec.href}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="glass-card p-4 flex items-center gap-4 group hover:bg-white/10 transition"
      >
        {rec.image && (
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img src={rec.image} alt={rec.title} className="w-full h-full object-cover" />
          </div>
        )}
        
        {!rec.image && (
          <div className={`w-12 h-12 rounded-lg ${typeColors[rec.type]} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-white truncate group-hover:text-water-400 transition">{rec.title}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[rec.type]}`}>
              {rec.matchScore}% match
            </span>
          </div>
          <p className="text-xs text-water-200/60 truncate">{rec.description}</p>
        </div>
        
        <ArrowRight className="w-5 h-5 text-water-200/30 group-hover:text-water-400 transition flex-shrink-0" />
      </motion.div>
    </Link>
  );
}

// Share Modal
function ShareModal({ isOpen, onClose, url, title }: { isOpen: boolean; onClose: () => void; url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="glass-card w-full max-w-md p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Share</h3>
            <button onClick={onClose} className="text-water-200/50 hover:text-white transition">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <Twitter className="w-8 h-8 text-blue-400" />
              <span className="text-xs text-water-200/60">X/Twitter</span>
            </a>
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <Facebook className="w-8 h-8 text-blue-600" />
              <span className="text-xs text-water-200/60">Facebook</span>
            </a>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <Linkedin className="w-8 h-8 text-blue-700" />
              <span className="text-xs text-water-200/60">LinkedIn</span>
            </a>
            <a
              href={shareLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
            >
              <MessageSquare className="w-8 h-8 text-cyan-400" />
              <span className="text-xs text-water-200/60">Telegram</span>
            </a>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 bg-transparent text-sm text-white outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                copied ? "bg-green-500/20 text-green-400" : "bg-water-500/20 text-water-400 hover:bg-water-500/30"
              }`}
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Invite Modal
function InviteModal({ isOpen, onClose, user }: { isOpen: boolean; onClose: () => void; user: User | null }) {
  const [copied, setCopied] = useState(false);
  const referralLink = user ? `https://looporb.com/register?ref=${user.id}` : "https://looporb.com/register";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="glass-card w-full max-w-md p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-ocean-deep" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Invite a Friend</h3>
                <p className="text-xs text-water-200/60">Earn bonuses for every friend</p>
              </div>
            </div>
            <button onClick={onClose} className="text-water-200/50 hover:text-white transition">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-water-500/10 to-cyan-500/10 rounded-xl border border-water-500/20">
              <div className="flex items-center gap-3 mb-3">
                <Gift className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium text-white">Your Rewards:</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-water-200/70">100 UNITY for signing up</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-water-200/70">5% of friend's first stakes</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-transparent text-sm text-white outline-none truncate"
              />
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  copied ? "bg-green-500/20 text-green-400" : "bg-water-500/20 text-water-400 hover:bg-water-500/30"
                }`}
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            
            <button className="w-full py-3 bg-gradient-to-r from-water-500 to-cyan-500 rounded-xl font-medium text-white hover:opacity-90 transition flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Send via Email
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Create Mission Modal
function CreateMissionModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [missionType, setMissionType] = useState<"DAILY" | "WEEKLY" | "ONETIME">("DAILY");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API to create mission
    console.log("Creating mission:", { missionType, title, description });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="glass-card w-full max-w-lg p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center">
                <Target className="w-6 h-6 text-ocean-deep" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Create Mission</h3>
                <p className="text-xs text-water-200/60">Propose a task to the community</p>
              </div>
            </div>
            <button onClick={onClose} className="text-water-200/50 hover:text-white transition">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Mission Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(["DAILY", "WEEKLY", "ONETIME"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setMissionType(type)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                      missionType === type
                        ? "bg-water-500 text-white"
                        : "bg-white/5 text-water-200/60 hover:bg-white/10"
                    }`}
                  >
                    {type === "DAILY" ? "Daily" : type === "WEEKLY" ? "Weekly" : "One-Time"}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Add 10 sensor readings"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-water-200/30 outline-none focus:border-water-500 transition"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what needs to be done..."
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-water-200/30 outline-none focus:border-water-500 transition resize-none"
                required
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-white/5 text-white rounded-lg font-medium hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-water-500 to-cyan-500 rounded-lg font-medium text-white hover:opacity-90 transition"
              >
                Create Mission
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Mission Info Card (Coming Soon)
function MissionInfoCard({ mission, index }: { mission: { id: string; title: string; description: string; badge: string; icon: any; color: string }; index: number }) {
  const t = useTranslations("missionsPage");
  const Icon = mission.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-5 relative overflow-hidden group hover:bg-white/10 transition"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${mission.color} rounded-full blur-3xl -mr-16 -mt-16 opacity-20 group-hover:opacity-30 transition`} />

      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl ${mission.color} bg-opacity-20 flex items-center justify-center`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">{mission.title}</h4>
              <span className="text-xs text-water-200/50">{mission.badge}</span>
            </div>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-water-500/20 text-water-400 border border-water-500/30">
            {t("comingSoon")}
          </span>
        </div>

        <p className="text-xs text-water-200/70 mb-4">{mission.description}</p>

        <Link
          href="/missions"
          className="w-full py-2 bg-water-500/20 border border-water-500/30 text-water-400 rounded-lg text-xs font-medium hover:bg-water-500/30 transition text-center block"
        >
          {t("learnMore")}
        </Link>
      </div>
    </motion.div>
  );
}

// Team Position Card
function TeamPositionCard({ position, index, t }: { position: { id: string; title: string; tech: string; icon: any; color: string }; index: number; t: any }) {
  const Icon = position.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass-card p-4 group hover:bg-white/10 transition"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${position.color} bg-opacity-20 flex items-center justify-center`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="font-medium text-white text-sm">{position.title}</div>
            <div className="text-xs text-water-200/50">{position.tech}</div>
          </div>
        </div>
        <a
          href="mailto:team@foxampylab.com"
          className="px-4 py-2 bg-water-500/20 border border-water-500/30 text-water-400 rounded-lg text-xs font-medium hover:bg-water-500/30 transition"
        >
          {t("apply")}
        </a>
      </div>
    </motion.div>
  );
}

// Mobile Bottom Navigation
function MobileBottomNav({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "explore", icon: Compass, label: "Explore" },
    { id: "activity", icon: Activity, label: "Activity" },
    { id: "messages", icon: MessageSquare, label: "Messages" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-white/10 md:hidden safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition ${
                isActive ? "text-water-400" : "text-water-200/50"
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "scale-110" : ""} transition`} />
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-water-400"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ==================== MAIN PAGE COMPONENT ====================

export default function HomePage() {
  // i18n
  const t = useTranslations("home");
  const tMissions = useTranslations("missionsPage");
  const tTeam = useTranslations("team");

  // State
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [sensors, setSensors] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Modal states
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [createMissionModalOpen, setCreateMissionModalOpen] = useState(false);
  
  // Mobile state
  const [activeTab, setActiveTab] = useState("home");
  
  // Socket connection for real-time data
  const { isConnected } = useSocket(user?.id, undefined);

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      const [userRes, projectsRes, missionsRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/projects?limit=5"),
        fetch("/api/missions?progress=true"),
      ]);

      const userData = await userRes.json();
      const projectsData = await projectsRes.json();
      const missionsData = await missionsRes.json();

      if (userData.success) setUser(userData.data.user);
      if (projectsData.success) setProjects(projectsData.data.data);
      if (missionsData.success) setMissions(missionsData.data.missions.slice(0, 3));
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Pull to refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Quick actions
  const quickActions: QuickAction[] = useMemo(() => [
    { id: "add-data", label: "Water Data", icon: Droplets, href: "/vod-lab", color: "bg-blue-500/20 text-blue-400" },
    { id: "invite", label: "Invite", icon: UserPlus, onClick: () => setInviteModalOpen(true), color: "bg-green-500/20 text-green-400" },
    { id: "share", label: "Share", icon: Share2, onClick: () => setShareModalOpen(true), color: "bg-purple-500/20 text-purple-400" },
    { id: "create-mission", label: "Mission", icon: Target, onClick: () => setCreateMissionModalOpen(true), color: "bg-orange-500/20 text-orange-400" },
  ], []);

  // Stats data - all zeros since platform is in development
  const stats: StatCard[] = useMemo(() => [
    { label: "Total Projects", value: "0", icon: FolderOpen, color: "bg-green-500/20 text-green-400" },
    { label: "Active Missions", value: "0", icon: Target, color: "bg-orange-500/20 text-orange-400" },
    { label: "DAO Proposals", value: "0", icon: Gavel, color: "bg-purple-500/20 text-purple-400" },
    { label: "Sensors Online", value: "0", icon: Activity, color: "bg-cyan-500/20 text-cyan-400" },
  ], []);

  // User level progress
  const xpForNextLevel = user?.level ? user.level * 1000 : 1000;
  const xpProgress = user ? ((user.xp % xpForNextLevel) / xpForNextLevel) * 100 : 0;

  // Loading state
  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-water-200/70">Loading ecosystem...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Pull to refresh indicator */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-18 left-0 right-0 z-40 flex justify-center pointer-events-none"
          >
            <div className="glass-card px-4 py-2 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-water-400 animate-spin" />
              <span className="text-sm text-white">Refreshing...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen pt-20 pb-24 md:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* ==================== HERO SECTION ==================== */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl glass-card p-6 md:p-8"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-water-500/10 via-cyan-500/10 to-purple-500/10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-water-500/20 rounded-full blur-3xl -mr-48 -mt-48" />
            
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Welcome & Stats */}
              <div className="space-y-6">
                {/* Welcome */}
                <div>
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                  >
                    {user ? (
                      <>
                        Welcome back, <span className="gradient-text">{user.name.split(" ")[0]}</span>!
                      </>
                    ) : (
                      <>
                        Welcome to <span className="gradient-text">VODeco</span>
                      </>
                    )}
                  </motion.h1>
                  <p className="text-water-200/70">
                    {user
                      ? `Level ${user.level} • ${user.xp} XP to next level`
                      : "Platform in Development — Seed Round Now Open. Developed by FoxampyLab"
                    }
                  </p>
                </div>

                {/* User Level Progress (if logged in) */}
                {user && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep font-bold">
                          {user.level}
                        </div>
                        <div>
                          <div className="font-medium text-white">Level {user.level}</div>
                          <div className="text-xs text-water-200/60">{user.xp} / {xpForNextLevel} XP</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-bold text-white">{user.reputation}</div>
                          <div className="text-xs text-water-200/60">Reputation</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-cyan-400">{user.unityBalance.toLocaleString()}</div>
                          <div className="text-xs text-water-200/60">UNITY</div>
                        </div>
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${xpProgress}%` }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-water-400 to-cyan-glow rounded-full"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-4 gap-2">
                  {quickActions.map((action, index) => (
                    <QuickActionButton key={action.id} action={action} index={index} />
                  ))}
                </div>

                {/* Ecosystem Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {stats.map((stat, index) => (
                    <AnimatedStatCard key={stat.label} stat={stat} index={index} />
                  ))}
                </div>
              </div>

              {/* Right: 3D Globe Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden"
              >
                {/* @ts-ignore - Globe3D with default props */}
                <div className="w-full h-full bg-gradient-to-br from-water-900/20 to-cyan-900/20 flex items-center justify-center">
                  <span className="text-water-400/50 text-6xl">🌍</span>
                </div>
                {/* Overlay CTA */}
                <div className="absolute bottom-4 left-4 right-4">
                  <Link
                    href="/globe"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white font-medium hover:bg-white/20 transition"
                  >
                    <Globe className="w-5 h-5" />
                    Open Full Globe
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* ==================== MAIN DASHBOARD GRID ==================== */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column (2/3) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* My Assets */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-water-400" />
                    My Assets
                  </h2>
                  <Link href="/profile" className="text-sm text-water-400 hover:text-water-300 transition">
                    All Assets →
                  </Link>
                </div>
                
                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Tokens */}
                  <Link href="/tokenhub" className="glass-card p-4 group hover:bg-white/10 transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                        <span className="text-ocean-deep font-bold text-sm">U</span>
                      </div>
                      <div>
                        <div className="font-medium text-white">UNITY</div>
                        <div className="text-xs text-water-200/60">Core Token</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {user?.unityBalance.toLocaleString() ?? "0"}
                    </div>
                  </Link>
                  
                  {/* Projects */}
                  <Link href="/projecthub" className="glass-card p-4 group hover:bg-white/10 transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <FolderOpen className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <div className="font-medium text-white">Projects</div>
                        <div className="text-xs text-water-200/60">Your Investments</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {user?.projectsCount ?? 0}
                    </div>
                  </Link>
                  
                  {/* Missions */}
                  <Link href="/missions" className="glass-card p-4 group hover:bg-white/10 transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <Target className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <div className="font-medium text-white">Missions</div>
                        <div className="text-xs text-water-200/60">Active Tasks</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {missions.filter(m => m.userProgress?.status === "ACTIVE").length}
                    </div>
                  </Link>
                </div>
              </motion.section>

              {/* Active Projects */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Active Projects</h2>
                  <Link href="/projecthub" className="text-sm text-water-400 hover:text-water-300 transition">
                    All Projects →
                  </Link>
                </div>

                <div className="space-y-3">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/projects/${project.slug}`}
                        className="glass-card p-4 flex items-center gap-4 group hover:bg-white/10 transition"
                      >
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-water-500/30 to-cyan-400/30 flex items-center justify-center flex-shrink-0">
                          <FolderOpen className="w-7 h-7 text-water-400" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="font-medium text-white truncate group-hover:text-water-400 transition">
                            {project.name}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-water-200/60">
                            <span className="capitalize">{project.status.toLowerCase()}</span>
                            {project.targetAmount && (
                              <span>
                                ${project.raisedAmount.toLocaleString()} / ${project.targetAmount.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-water-200/30 flex-shrink-0 group-hover:text-water-400 transition" />
                      </Link>
                    ))
                  ) : (
                    <div className="glass-card p-8 text-center">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Plus className="w-8 h-8 text-water-200/30" />
                      </div>
                      <p className="text-water-200/70 mb-4">No active projects yet</p>
                      <Link href="/projecthub" className="text-water-400 hover:text-water-300 text-sm font-medium">
                        Browse Projects →
                      </Link>
                    </div>
                  )}
                </div>
              </motion.section>

              {/* Missions - Coming Soon */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-400" />
                    <h2 className="text-lg font-semibold text-white">{tMissions("title")}</h2>
                  </div>
                  <Link href="/missions" className="text-sm text-water-400 hover:text-water-300 transition">
                    {tMissions("learnMore")} →
                  </Link>
                </div>

                <p className="text-water-200/70 text-sm mb-4">{tMissions("subtitle")}</p>

                <div className="grid sm:grid-cols-2 gap-3">
                  <MissionInfoCard
                    mission={{
                      id: "invite",
                      title: tMissions("missions.invite.title"),
                      description: tMissions("missions.invite.description"),
                      badge: tMissions("missions.invite.badge"),
                      icon: UserPlus,
                      color: "bg-green-500/20 text-green-400",
                    }}
                    index={0}
                  />
                  <MissionInfoCard
                    mission={{
                      id: "airdrop",
                      title: tMissions("missions.airdrop.title"),
                      description: tMissions("missions.airdrop.description"),
                      badge: tMissions("missions.airdrop.badge"),
                      icon: Gift,
                      color: "bg-blue-500/20 text-blue-400",
                    }}
                    index={1}
                  />
                  <MissionInfoCard
                    mission={{
                      id: "retrodrop",
                      title: tMissions("missions.retrodrop.title"),
                      description: tMissions("missions.retrodrop.description"),
                      badge: tMissions("missions.retrodrop.badge"),
                      icon: Crown,
                      color: "bg-yellow-500/20 text-yellow-400",
                    }}
                    index={2}
                  />
                  <MissionInfoCard
                    mission={{
                      id: "partner",
                      title: tMissions("missions.partner.title"),
                      description: tMissions("missions.partner.description"),
                      badge: tMissions("missions.partner.badge"),
                      icon: HandCoins,
                      color: "bg-purple-500/20 text-purple-400",
                    }}
                    index={3}
                  />
                  <MissionInfoCard
                    mission={{
                      id: "bounties",
                      title: tMissions("missions.bounties.title"),
                      description: tMissions("missions.bounties.description"),
                      badge: tMissions("missions.bounties.badge"),
                      icon: Code,
                      color: "bg-cyan-500/20 text-cyan-400",
                    }}
                    index={4}
                  />
                </div>
              </motion.section>

              {/* Recommendations */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h2 className="text-lg font-semibold text-white">Recommendations for You</h2>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="glass-card p-6 text-center">
                    <Sparkles className="w-12 h-12 text-water-200/30 mx-auto mb-3" />
                    <p className="text-water-200/70">Recommendations will appear as the platform develops</p>
                  </div>
                </div>
              </motion.section>

              {/* Management Tools */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="glass-card p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-water-400" />
                  Management Tools
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: Globe, title: "3D Globe", desc: "Explore water bodies", href: "/globe", color: "bg-blue-500/20 text-blue-400" },
                    { icon: FolderOpen, title: "Projects", desc: "Invest in ecology", href: "/projects", color: "bg-green-500/20 text-green-400" },
                    { icon: Gavel, title: "DAO", desc: "Ecosystem governance", href: "/dao", color: "bg-purple-500/20 text-purple-400" },
                    { icon: Microscope, title: "VOD-Lab", desc: "Sensor data", href: "/vod-lab", color: "bg-cyan-500/20 text-cyan-400" },
                  ].map((tool) => (
                    <Link
                      key={tool.title}
                      href={tool.href}
                      className="block glass-card-hover p-4 group text-center"
                    >
                      <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition`}>
                        <tool.icon className="w-6 h-6" />
                      </div>
                      <div className="font-medium text-white text-sm mb-1">{tool.title}</div>
                      <div className="text-xs text-water-200/60">{tool.desc}</div>
                    </Link>
                  ))}
                </div>
              </motion.section>

              {/* Team Recruitment */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="glass-card p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-water-500 via-cyan-400 to-green-400" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-water-500/10 to-green-500/10 rounded-full blur-3xl -mr-32 -mt-32" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center">
                      <UsersRound className="w-5 h-5 text-ocean-deep" />
                    </div>
                    <h2 className="text-xl font-bold text-white">{tTeam("title")}</h2>
                  </div>

                  <p className="text-water-200/70 text-sm mb-6">{tTeam("subtitle")}</p>

                  <div className="space-y-2 mb-6">
                    <TeamPositionCard
                      position={{
                        id: "frontend",
                        title: tTeam("positions.frontend.title"),
                        tech: tTeam("positions.frontend.tech"),
                        icon: Code,
                        color: "bg-blue-500/20 text-blue-400",
                      }}
                      index={0}
                      t={tTeam}
                    />
                    <TeamPositionCard
                      position={{
                        id: "backend",
                        title: tTeam("positions.backend.title"),
                        tech: tTeam("positions.backend.tech"),
                        icon: Code,
                        color: "bg-green-500/20 text-green-400",
                      }}
                      index={1}
                      t={tTeam}
                    />
                    <TeamPositionCard
                      position={{
                        id: "web3",
                        title: tTeam("positions.web3.title"),
                        tech: tTeam("positions.web3.tech"),
                        icon: Shield,
                        color: "bg-purple-500/20 text-purple-400",
                      }}
                      index={2}
                      t={tTeam}
                    />
                    <TeamPositionCard
                      position={{
                        id: "marketing",
                        title: tTeam("positions.marketing.title"),
                        tech: tTeam("positions.marketing.tech"),
                        icon: Megaphone,
                        color: "bg-orange-500/20 text-orange-400",
                      }}
                      index={3}
                      t={tTeam}
                    />
                    <TeamPositionCard
                      position={{
                        id: "designer",
                        title: tTeam("positions.designer.title"),
                        tech: tTeam("positions.designer.tech"),
                        icon: Palette,
                        color: "bg-pink-500/20 text-pink-400",
                      }}
                      index={4}
                      t={tTeam}
                    />
                    <TeamPositionCard
                      position={{
                        id: "rnd",
                        title: tTeam("positions.rnd.title"),
                        tech: tTeam("positions.rnd.tech"),
                        icon: Cpu,
                        color: "bg-cyan-500/20 text-cyan-400",
                      }}
                      index={5}
                      t={tTeam}
                    />
                    <TeamPositionCard
                      position={{
                        id: "community",
                        title: tTeam("positions.community.title"),
                        tech: tTeam("positions.community.tech"),
                        icon: Users,
                        color: "bg-yellow-500/20 text-yellow-400",
                      }}
                      index={6}
                      t={tTeam}
                    />
                    <TeamPositionCard
                      position={{
                        id: "datascientist",
                        title: tTeam("positions.datascientist.title"),
                        tech: tTeam("positions.datascientist.tech"),
                        icon: BrainCircuit,
                        color: "bg-indigo-500/20 text-indigo-400",
                      }}
                      index={7}
                      t={tTeam}
                    />
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                    <Mail className="w-4 h-4 text-water-400" />
                    <span className="text-sm text-water-200/70">{tTeam("emailNote")}</span>
                    <a
                      href="mailto:team@foxampylab.com"
                      className="text-water-400 hover:text-water-300 text-sm font-medium transition"
                    >
                      team@foxampylab.com
                    </a>
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Right Column (1/3) */}
            <div className="space-y-8">
              
              {/* Live Sensor Data */}
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-lg font-semibold text-white">Sensors</h2>
                  </div>
                  <span className={`flex items-center gap-2 text-xs ${isConnected ? "text-green-400" : "text-yellow-400"}`}>
                    <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400 animate-pulse" : "bg-yellow-400"}`} />
                    {isConnected ? "Online" : "Connecting..."}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="glass-card p-8 text-center">
                    <div className="w-16 h-16 bg-water-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Activity className="w-8 h-8 text-water-400/50" />
                    </div>
                    <p className="text-water-200/70 mb-2">Sensors Coming Soon</p>
                    <p className="text-water-200/50 text-sm">VOD-Lab devices in development</p>
                  </div>
                </div>

                <Link
                  href="/vod-lab"
                  className="block mt-3 text-center py-2 bg-water-500/20 border border-water-500/30 text-water-400 rounded-lg text-sm font-medium hover:bg-water-500/30 transition"
                >
                  Learn More About VOD-Lab →
                </Link>
              </motion.section>

              {/* Retro Drops */}
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-lg font-semibold text-white">Retro Drops</h2>
                  </div>
                  <Link href="/achievements" className="text-sm text-water-400 hover:text-water-300 transition">
                    Coming Soon →
                  </Link>
                </div>

                <div className="space-y-3">
                  <div className="glass-card p-6 text-center">
                    <Crown className="w-12 h-12 text-water-200/30 mx-auto mb-3" />
                    <p className="text-water-200/70">Retro Drops will be announced when the platform launches</p>
                  </div>
                </div>
              </motion.section>

              {/* News Feed */}
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-water-400" />
                    <h2 className="text-lg font-semibold text-white">News Feed</h2>
                  </div>
                  <Link href="/feed" className="text-sm text-water-400 hover:text-water-300 transition">
                    Coming Soon →
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="glass-card p-6 text-center">
                    <Clock className="w-12 h-12 text-water-200/30 mx-auto mb-3" />
                    <p className="text-water-200/70">News feed will appear as the platform develops</p>
                  </div>
                </div>

                <button className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-white font-medium transition flex items-center justify-center gap-2">
                  Load More
                  <ChevronDown className="w-4 h-4" />
                </button>
              </motion.section>

              {/* Quick Stats Widget */}
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-water-400" />
                  Ecosystem Today
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-water-200/70">New Features</span>
                    <span className="text-water-400 font-semibold">In Development</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-water-200/70">Active Missions</span>
                    <span className="text-green-400 font-semibold">0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-water-200/70">DAO Proposals</span>
                    <span className="text-purple-400 font-semibold">0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-water-200/70">Sensors Online</span>
                    <span className="text-cyan-400 font-semibold">0</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                  <Link href="/dao" className="flex items-center gap-2 text-sm text-water-400 hover:text-water-300 transition">
                    <Gavel className="w-4 h-4" />
                    Vote in DAO
                  </Link>
                  <Link href="/analytics" className="flex items-center gap-2 text-sm text-water-400 hover:text-water-300 transition">
                    <TrendingUp className="w-4 h-4" />
                    Full Analytics
                  </Link>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        url={typeof window !== "undefined" ? window.location.href : "https://looporb.com"}
        title="VODeco - Global Water Resource Management Ecosystem"
      />
      
      <InviteModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        user={user}
      />
      
      <CreateMissionModal
        isOpen={createMissionModalOpen}
        onClose={() => setCreateMissionModalOpen(false)}
      />
    </>
  );
}
