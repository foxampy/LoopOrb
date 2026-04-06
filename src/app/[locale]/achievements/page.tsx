"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Trophy, Medal, Star, Target, Droplets, MapPin, Users, Zap,
  Shield, Crown, Gem, Flame, Droplet, Waves, Anchor, Compass,
  Lock, CheckCircle, ChevronRight, Loader2, Sparkles
} from "lucide-react";

// Types
interface Achievement {
  id: string;
  category: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  title: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
  reward: number;
  unlocked: boolean;
  unlockedAt?: string;
}

interface UserStats {
  unlockedCount: number;
  totalRewards: number;
  progressPercent: number;
  diamondCount: number;
}

const categories = [
  { id: "all", label: "All", icon: Trophy },
  { id: "explorer", label: "Explorer", icon: Compass },
  { id: "scientist", label: "Scientist", icon: Droplets },
  { id: "activist", label: "Activist", icon: Flame },
  { id: "investor", label: "Investor", icon: Gem },
  { id: "influencer", label: "Leader", icon: Crown },
];

const tiers = {
  bronze: { label: "Bronze", color: "from-amber-700 to-amber-600", textColor: "text-amber-600", bgColor: "bg-amber-500/10" },
  silver: { label: "Silver", color: "from-slate-400 to-slate-300", textColor: "text-slate-300", bgColor: "bg-slate-500/10" },
  gold: { label: "Gold", color: "from-yellow-500 to-yellow-400", textColor: "text-yellow-400", bgColor: "bg-yellow-500/10" },
  platinum: { label: "Platinum", color: "from-cyan-400 to-cyan-300", textColor: "text-cyan-300", bgColor: "bg-cyan-500/10" },
  diamond: { label: "Diamond", color: "from-purple-500 to-pink-400", textColor: "text-purple-400", bgColor: "bg-purple-500/10" },
};

const iconMap: Record<string, any> = {
  MapPin, Compass, Anchor, Waves, Crown, Droplet, Droplets, Target,
  Shield, Star, Flame, Zap, Users, Gem, Trophy
};

// Empty state for new users
const defaultAchievements: Achievement[] = [
  {
    id: "first-steps",
    category: "explorer",
    tier: "bronze",
    title: "First Steps",
    description: "Complete your profile and join the community",
    icon: "MapPin",
    progress: 0,
    target: 1,
    reward: 50,
    unlocked: false,
  },
  {
    id: "data-collector",
    category: "scientist",
    tier: "bronze",
    title: "Data Collector",
    description: "Add your first water quality measurement",
    icon: "Droplets",
    progress: 0,
    target: 1,
    reward: 100,
    unlocked: false,
  },
  {
    id: "first-stake",
    category: "investor",
    tier: "bronze",
    title: "First Contribution",
    description: "Stake UNITY in any project",
    icon: "Gem",
    progress: 0,
    target: 1,
    reward: 200,
    unlocked: false,
  },
  {
    id: "community-member",
    category: "influencer",
    tier: "bronze",
    title: "Community Member",
    description: "Invite 1 friend to the platform",
    icon: "Users",
    progress: 0,
    target: 1,
    reward: 100,
    unlocked: false,
  },
];

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  const tier = tiers[achievement.tier];
  const progressPercent = Math.min(100, (achievement.progress / achievement.target) * 100);
  const Icon = iconMap[achievement.icon] || Star;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`relative glass-card overflow-hidden ${
        achievement.unlocked ? "border-water-500/30" : "opacity-70"
      }`}
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${tier.color} opacity-10 rounded-bl-full`} />
      
      <div className="p-5 relative">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center flex-shrink-0 ${
            achievement.unlocked ? "" : "grayscale"
          }`}>
            <Icon className="w-7 h-7 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tier.bgColor} ${tier.textColor}`}>
                {tier.label}
              </span>
            </div>
            
            <h3 className={`font-semibold mb-1 ${achievement.unlocked ? "text-white" : "text-water-200/50"}`}>
              {achievement.title}
            </h3>
            <p className="text-sm text-water-200/60 mb-3">{achievement.description}</p>

            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-water-200/50">Progress</span>
                <span className={achievement.unlocked ? "text-green-400" : "text-water-200/70"}>
                  {achievement.progress} / {achievement.target}
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    achievement.unlocked 
                      ? "bg-gradient-to-r from-green-500 to-green-400" 
                      : "bg-gradient-to-r from-water-500 to-cyan-glow"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-cyan-glow">
                <Gem className="w-4 h-4" />
                <span className="text-sm font-medium">+{achievement.reward} XP</span>
              </div>
              
              {achievement.unlocked ? (
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Unlocked</span>
                </div>
              ) : (
                <Lock className="w-4 h-4 text-water-200/30" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Empty State Component
function EmptyAchievementsState({ onExplore }: { onExplore: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-4"
    >
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-water-500/20 to-cyan-glow/20 flex items-center justify-center">
        <Trophy className="w-12 h-12 text-water-400" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">Start Your Journey!</h2>
      <p className="text-water-200/60 max-w-md mx-auto mb-8">
        Achievements unlock as you use the platform.
        Complete your profile, add data, or invest in projects.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
        {[
          { icon: MapPin, text: "Complete your profile", reward: "+50 XP" },
          { icon: Droplets, text: "Add data", reward: "+100 XP" },
          { icon: Gem, text: "Stake tokens", reward: "+200 XP" },
          { icon: Users, text: "Invite a friend", reward: "+100 XP" },
        ].map((item, i) => (
          <div key={i} className="glass-card p-4 text-center">
            <item.icon className="w-8 h-8 text-cyan-glow mx-auto mb-2" />
            <div className="text-sm text-white mb-1">{item.text}</div>
            <div className="text-xs text-cyan-glow">{item.reward}</div>
          </div>
        ))}
      </div>

      <button onClick={onExplore} className="btn-primary inline-flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        Start Earning XP
      </button>
    </motion.div>
  );
}

export default function AchievementsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showLocked, setShowLocked] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    unlockedCount: 0,
    totalRewards: 0,
    progressPercent: 0,
    diamondCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      // TODO: Fetch from API when backend is ready
      // const res = await fetch('/api/achievements');
      // const data = await res.json();
      
      // For now, show default empty state
      setAchievements(defaultAchievements);
      setUserStats({
        unlockedCount: 0,
        totalRewards: 0,
        progressPercent: 0,
        diamondCount: 0,
      });
    } catch (error) {
      console.error("Failed to load achievements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAchievements = achievements.filter(a => {
    if (activeCategory !== "all" && a.category !== activeCategory) return false;
    if (!showLocked && !a.unlocked) return false;
    return true;
  });

  const hasAchievements = achievements.some(a => a.unlocked);

  if (isLoading) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-glow animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Achievements</h1>
          <p className="text-water-200/70">
            Complete tasks to earn XP and rewards
          </p>
        </motion.div>

        {/* Stats Cards - Only show if has achievements */}
        {hasAchievements && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <div className="glass-card p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{userStats.unlockedCount}</div>
                <div className="text-sm text-water-200/70">Unlocked</div>
              </div>
            </div>

            <div className="glass-card p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-glow to-teal-glow flex items-center justify-center text-ocean-deep">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{userStats.progressPercent}%</div>
                <div className="text-sm text-water-200/70">Progress</div>
              </div>
            </div>

            <div className="glass-card p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-glow to-water-400 flex items-center justify-center text-ocean-deep">
                <Gem className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{userStats.totalRewards}</div>
                <div className="text-sm text-water-200/70">XP earned</div>
              </div>
            </div>

            <div className="glass-card p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-ocean-deep">
                <Medal className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{userStats.diamondCount}</div>
                <div className="text-sm text-water-200/70">Diamond</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!hasAchievements ? (
          <EmptyAchievementsState onExplore={() => setActiveCategory("all")} />
        ) : (
          <>
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

            {/* Show Locked Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex items-center justify-between mb-6"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showLocked}
                  onChange={(e) => setShowLocked(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-water-500"
                />
                <span className="text-sm text-water-200/70">Show locked</span>
              </label>
              <div className="text-sm text-water-200/50">
                Showing: {filteredAchievements.length}
              </div>
            </motion.div>

            {/* Achievements Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredAchievements.map((achievement, index) => (
                <AchievementCard key={achievement.id} achievement={achievement} index={index} />
              ))}
            </div>

            {filteredAchievements.length === 0 && (
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-water-200/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No achievements</h3>
                <p className="text-water-200/50">Change filters to see more</p>
              </div>
            )}
          </>
        )}

        {/* CTA to Missions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 glass-card p-6 text-center"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Want more rewards?</h3>
          <p className="text-water-200/70 mb-4">
            Complete missions to earn XP, tokens, and exclusive NFTs
          </p>
          <Link href="/missions" className="btn-secondary inline-flex items-center gap-2">
            Go to missions
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
