"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Award, TrendingUp, Droplets, FolderOpen, Settings, Edit,
  Shield, Star, MapPin, Calendar, Lock, Camera, Wallet, Trophy,
  Medal, Target, Activity, Globe, Zap, CheckCircle, Plus, Image as ImageIcon,
  Link as LinkIcon, Briefcase, MapPinned, ChevronDown, Menu, X
} from "lucide-react";

// --- UNIVERSAL NAVBAR COMPONENT ---
function UniversalNavbar({ variant = "default" }: { variant?: "default" | "landing" | "ecosystem" | "projecthub" | "tokenomics" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pageLinks = [
    { href: "/landing", label: "Staking", color: "cyan" },
    { href: "/ecosystem", label: "Ecosystem", color: "emerald" },
    { href: "/projecthub", label: "ProjectHub", color: "mint" },
    { href: "/tokenomics", label: "Tokenomics", color: "chrome" },
    { href: "/dao", label: "DAO", color: "violet" },
    { href: "/profile", label: "Account", color: "water", active: true },
  ];

  // Style variants
  const styles = {
    default: {
      nav: isScrolled ? "bg-ocean-deep/95 backdrop-blur-xl border-b border-white/10" : "bg-transparent",
      logo: "text-white",
      link: "text-water-200/70 hover:text-white",
      button: "btn-primary",
      mobileBg: "bg-ocean-deep/98",
      accent: "#0ea5e9"
    },
    landing: {
      nav: isScrolled ? "bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50" : "bg-transparent",
      logo: "text-white",
      link: "text-slate-300 hover:text-cyan-400",
      button: "bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold",
      mobileBg: "bg-slate-950/98",
      accent: "#06b6d4"
    },
    ecosystem: {
      nav: isScrolled ? "bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50" : "bg-transparent",
      logo: "text-white",
      link: "text-slate-300 hover:text-emerald-400",
      button: "bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold",
      mobileBg: "bg-slate-950/98",
      accent: "#10b981"
    },
    projecthub: {
      nav: isScrolled ? "bg-[#d4ede4]/95 backdrop-blur-xl border-b border-[#1e3a5f]/20" : "bg-[#d4ede4]",
      logo: "text-[#1e3a5f]",
      link: "text-[#1e3a5f]/70 hover:text-[#2d6a4f]",
      button: "bg-[#2d6a4f] hover:bg-[#1b4332] text-[#e8f5f0] font-semibold",
      mobileBg: "bg-[#d4ede4]",
      accent: "#2d6a4f"
    },
    tokenomics: {
      nav: isScrolled ? "bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50" : "bg-slate-950",
      logo: "text-white",
      link: "text-slate-300 hover:text-cyan-400",
      button: "bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-900 font-semibold",
      mobileBg: "bg-slate-950/98",
      accent: "#06b6d4"
    }
  };

  const s = styles[variant];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${s.nav}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${s.accent}, ${variant === 'projecthub' ? '#1e3a5f' : '#10b981'})` }}>
                <Droplets className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <span className={`text-lg lg:text-xl font-bold ${s.logo}`}>VODeco</span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {pageLinks.map((link) => (
                <Link key={link.href} href={link.href} 
                  className={`text-sm transition-colors ${link.active ? `text-[${s.accent}] font-medium` : s.link}`}
                  style={link.active ? { color: s.accent } : {}}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/wallet" className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${s.button}`}>
                <Wallet className="w-4 h-4" />
                <span>Wallet</span>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className={`lg:hidden p-2 ${variant === 'projecthub' ? 'text-[#1e3a5f]' : 'text-white'}`}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-x-0 top-16 z-40 lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto border-b ${s.mobileBg} ${variant === 'projecthub' ? 'border-[#1e3a5f]/20' : 'border-slate-800'}`}
          >
            <div className="px-4 py-4">
              <div className="mb-4">
                <div className={`text-xs font-semibold uppercase tracking-wider mb-2 px-2 ${variant === 'projecthub' ? 'text-[#1e3a5f]/60' : 'text-slate-500'}`}>Pages</div>
                <div className="grid grid-cols-2 gap-2">
                  {pageLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} 
                       className={`flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                         link.active 
                           ? variant === 'projecthub' ? 'bg-[#2d6a4f]/10 text-[#2d6a4f]' : 'text-cyan-400 bg-cyan-500/10'
                           : variant === 'projecthub' ? 'text-[#1e3a5f] hover:bg-[#1e3a5f]/10' : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
                       }`}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- MOCK DATA FOR PUBLIC PROFILE ---
const mockUser = {
  id: "user-001",
  name: "", // Empty for new user
  handle: "", // Empty for new user
  bio: "", // Empty for new user
  location: "", // Empty for new user
  website: "", // Empty for new user
  occupation: "", // Empty for new user
  email: "",
  avatar: null,
  coverImage: null,
  role: "EXPLORER",
  level: 1,
  xp: 0,
  reputation: 0,
  joinedAt: new Date().toISOString(),
  stats: {
    projectsCreated: 0,
    objectsAdded: 0,
    dataEntries: 0,
    missionsCompleted: 0,
    followers: 0,
    following: 0
  },
  wallet: {
    balance: 0,
    stakedAmount: 0,
    totalEarned: 0
  }
};

const mockAchievements = [
  { id: 1, name: "First Drop", desc: "Created your account", icon: Droplets, unlocked: true, color: "#0ea5e9" },
  { id: 2, name: "Water Guardian", desc: "Stake 1000 VOD", icon: Shield, unlocked: false, color: "#10b981" },
  { id: 3, name: "Data Pioneer", desc: "Submit first water sample", icon: Activity, unlocked: false, color: "#8b5cf6" },
  { id: 4, name: "Project Creator", desc: "Launch first project", icon: FolderOpen, unlocked: false, color: "#f59e0b" },
  { id: 5, name: "Community Leader", desc: "Get 100 followers", icon: Star, unlocked: false, color: "#ec4899" },
  { id: 6, name: "Master Validator", desc: "Validate 1000 data points", icon: CheckCircle, unlocked: false, color: "#06b6d4" },
];

const mockPosts = [
  // Empty for new user - they'll create their own
];

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(true); // Start in edit mode for new user
  const [activeTab, setActiveTab] = useState<"posts" | "achievements" | "about">("about");
  const [editForm, setEditForm] = useState({
    name: "",
    handle: "",
    bio: "",
    location: "",
    website: "",
    occupation: ""
  });

  const handleSaveProfile = () => {
    setUser({ ...user, ...editForm });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-ocean-deep">
      <UniversalNavbar variant="default" />
      
      <main className="pt-20 pb-8">
        {/* Cover Photo */}
        <div className="relative h-48 md:h-64 lg:h-80 w-full bg-gradient-to-br from-ocean-mid via-water-600 to-ocean-deep overflow-hidden">
          {user.coverImage ? (
            <img src={user.coverImage} alt="Cover" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHpNMjAgMjBoNHY0aC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
          )}
          <button className="absolute bottom-4 right-4 px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-lg text-sm flex items-center gap-2 transition">
            <Camera className="w-4 h-4" />
            Change Cover
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          {/* Profile Header Card */}
          <div className="relative -mt-20 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="relative -mt-24 md:-mt-24 mx-auto md:mx-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-ocean-deep bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep text-5xl font-bold overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-white" />
                    )}
                  </div>
                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-water-500 hover:bg-water-600 rounded-full flex items-center justify-center text-white transition">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left pt-4 md:pt-8">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full md:w-64 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                      />
                      <input
                        type="text"
                        placeholder="@username"
                        value={editForm.handle}
                        onChange={(e) => setEditForm({...editForm, handle: e.target.value})}
                        className="w-full md:w-64 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl md:text-3xl font-bold text-white">
                        {user.name || "New Explorer"}
                      </h1>
                      <p className="text-water-200/70">{user.handle || "@username"}</p>
                    </>
                  )}

                  {/* Stats Row */}
                  <div className="flex items-center justify-center md:justify-start gap-6 mt-4 text-sm">
                    <div className="text-center">
                      <span className="font-bold text-white">{user.stats.following}</span>
                      <span className="text-water-200/60 ml-1">Following</span>
                    </div>
                    <div className="text-center">
                      <span className="font-bold text-white">{user.stats.followers}</span>
                      <span className="text-water-200/60 ml-1">Followers</span>
                    </div>
                    <div className="text-center">
                      <span className="font-bold text-cyan-glow">{user.wallet.balance.toFixed(2)}</span>
                      <span className="text-water-200/60 ml-1">VOD</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 pt-4">
                  {isEditing ? (
                    <button onClick={handleSaveProfile} className="btn-primary flex items-center gap-2 justify-center">
                      <CheckCircle className="w-4 h-4" />
                      Save Profile
                    </button>
                  ) : (
                    <>
                      <button onClick={() => setIsEditing(true)} className="btn-primary flex items-center gap-2 justify-center">
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </button>
                      <div className="flex gap-2">
                        <Link href="/settings" className="flex-1 btn-secondary flex items-center justify-center gap-2">
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        <Link href="/wallet" className="flex-1 btn-secondary flex items-center justify-center gap-2">
                          <Wallet className="w-4 h-4" />
                          Wallet
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Bio Section */}
              <div className="mt-6 pt-6 border-t border-white/10">
                {isEditing ? (
                  <textarea
                    placeholder="Tell us about yourself..."
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 min-h-[100px]"
                  />
                ) : (
                  <p className="text-water-200/80">{user.bio || "No bio yet. Click Edit Profile to add one!"}</p>
                )}

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-3 mt-4">
                  {isEditing ? (
                    <>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-water-400" />
                        <input
                          type="text"
                          placeholder="Occupation"
                          value={editForm.occupation}
                          onChange={(e) => setEditForm({...editForm, occupation: e.target.value})}
                          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPinned className="w-4 h-4 text-water-400" />
                        <input
                          type="text"
                          placeholder="Location"
                          value={editForm.location}
                          onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-water-400" />
                        <input
                          type="text"
                          placeholder="Website"
                          value={editForm.website}
                          onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-water-400" />
                        <span className="text-water-200/60 text-sm">Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {user.occupation && (
                        <div className="flex items-center gap-2 text-sm">
                          <Briefcase className="w-4 h-4 text-water-400" />
                          <span className="text-water-200/80">{user.occupation}</span>
                        </div>
                      )}
                      {user.location && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPinned className="w-4 h-4 text-water-400" />
                          <span className="text-water-200/80">{user.location}</span>
                        </div>
                      )}
                      {user.website && (
                        <div className="flex items-center gap-2 text-sm">
                          <LinkIcon className="w-4 h-4 text-water-400" />
                          <a href={user.website} className="text-cyan-glow hover:underline">{user.website}</a>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-water-400" />
                        <span className="text-water-200/60">Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-1 mb-6 border-b border-white/10">
            {[
              { id: "posts", label: "Posts", icon: FolderOpen },
              { id: "achievements", label: "Achievements", icon: Trophy },
              { id: "about", label: "About", icon: User },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "text-white border-cyan-glow"
                    : "text-water-200/60 border-transparent hover:text-white"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Sidebar - Stats */}
            <div className="space-y-4">
              {/* Level Card */}
              <div className="glass-card p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-medium">Level {user.level}</span>
                  <span className="text-water-200/60 text-sm">{user.xp} XP</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-water-400 to-cyan-glow rounded-full" style={{ width: `${(user.xp % 100)}%` }} />
                </div>
                <p className="text-xs text-water-200/50 mt-2">{100 - (user.xp % 100)} XP to next level</p>
              </div>

              {/* Wallet Card */}
              <div className="glass-card p-4">
                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-cyan-glow" />
                  Wallet
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-water-200/60">Balance</span>
                    <span className="text-white font-medium">{user.wallet.balance.toFixed(2)} VOD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-water-200/60">Staked</span>
                    <span className="text-white">{user.wallet.stakedAmount.toFixed(2)} VOD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-water-200/60">Earned</span>
                    <span className="text-emerald-400">{user.wallet.totalEarned.toFixed(2)} VOD</span>
                  </div>
                </div>
                <Link href="/wallet" className="btn-secondary w-full mt-3 text-center block text-sm">
                  Open Wallet
                </Link>
              </div>

              {/* Activity Stats */}
              <div className="glass-card p-4">
                <h3 className="text-white font-medium mb-3">Activity</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-xl font-bold text-white">{user.stats.projectsCreated}</div>
                    <div className="text-xs text-water-200/60">Projects</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-xl font-bold text-white">{user.stats.objectsAdded}</div>
                    <div className="text-xs text-water-200/60">Objects</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-xl font-bold text-white">{user.stats.dataEntries}</div>
                    <div className="text-xs text-water-200/60">Data</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-xl font-bold text-white">{user.stats.missionsCompleted}</div>
                    <div className="text-xs text-water-200/60">Missions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {activeTab === "posts" && (
                  <motion.div
                    key="posts"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {/* Create Post */}
                    <div className="glass-card p-4">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-white font-bold">
                          {user.name ? user.name.charAt(0) : <User className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Share an update about water research..."
                            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                          />
                          <div className="flex justify-between items-center mt-3">
                            <button className="flex items-center gap-2 text-water-200/60 hover:text-white text-sm">
                              <ImageIcon className="w-4 h-4" />
                              Add Photo
                            </button>
                            <button className="btn-primary text-sm">Post</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Empty State */}
                    <div className="glass-card p-12 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                        <FolderOpen className="w-8 h-8 text-water-200/30" />
                      </div>
                      <h3 className="text-white font-medium mb-2">No posts yet</h3>
                      <p className="text-water-200/60 text-sm mb-4">Share your water research, achievements, or updates with the community.</p>
                      <button className="btn-secondary text-sm">Create First Post</button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "achievements" && (
                  <motion.div
                    key="achievements"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {/* Achievement Gallery */}
                    <div className="glass-card p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white">Achievements Gallery</h3>
                        <div className="text-sm text-water-200/60">
                          {mockAchievements.filter(a => a.unlocked).length} / {mockAchievements.length} Unlocked
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {mockAchievements.map((achievement) => (
                          <motion.div
                            key={achievement.id}
                            whileHover={{ scale: 1.02 }}
                            className={`p-4 rounded-xl border transition-all ${
                              achievement.unlocked
                                ? "bg-gradient-to-br from-white/10 to-white/5 border-white/20"
                                : "bg-white/5 border-white/10 opacity-60"
                            }`}
                          >
                            <div
                              className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                              style={{ backgroundColor: `${achievement.color}20` }}
                            >
                              <achievement.icon className="w-6 h-6" style={{ color: achievement.color }} />
                            </div>
                            <h4 className="text-white font-medium text-sm mb-1">{achievement.name}</h4>
                            <p className="text-water-200/60 text-xs">{achievement.desc}</p>
                            {achievement.unlocked && (
                              <div className="flex items-center gap-1 mt-2 text-emerald-400 text-xs">
                                <CheckCircle className="w-3 h-3" />
                                Unlocked
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Stats Highlights */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="glass-card p-4 text-center">
                        <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{mockAchievements.filter(a => a.unlocked).length}</div>
                        <div className="text-xs text-water-200/60">Achievements</div>
                      </div>
                      <div className="glass-card p-4 text-center">
                        <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{user.xp}</div>
                        <div className="text-xs text-water-200/60">Total XP</div>
                      </div>
                      <div className="glass-card p-4 text-center">
                        <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white">{user.reputation}</div>
                        <div className="text-xs text-water-200/60">Reputation</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "about" && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="glass-card p-6">
                      <h3 className="text-xl font-bold text-white mb-4">About</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-water-400 mt-0.5" />
                          <div>
                            <div className="text-white font-medium">Role</div>
                            <div className="text-water-200/70">Water Explorer</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Globe className="w-5 h-5 text-water-400 mt-0.5" />
                          <div>
                            <div className="text-white font-medium">Network</div>
                            <div className="text-water-200/70">VODeco Ecosystem</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Award className="w-5 h-5 text-water-400 mt-0.5" />
                          <div>
                            <div className="text-white font-medium">Badges</div>
                            <div className="flex gap-2 mt-1">
                              {mockAchievements.filter(a => a.unlocked).map(badge => (
                                <div key={badge.id} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${badge.color}30` }}>
                                  <badge.icon className="w-4 h-4" style={{ color: badge.color }} />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="glass-card p-6">
                      <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <Link href="/wallet" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg transition text-center">
                          <Wallet className="w-6 h-6 text-cyan-glow mx-auto mb-2" />
                          <div className="text-white text-sm font-medium">Wallet</div>
                        </Link>
                        <Link href="/settings" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg transition text-center">
                          <Settings className="w-6 h-6 text-water-400 mx-auto mb-2" />
                          <div className="text-white text-sm font-medium">Settings</div>
                        </Link>
                        <Link href="/missions" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg transition text-center">
                          <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                          <div className="text-white text-sm font-medium">Missions</div>
                        </Link>
                        <Link href="/achievements" className="p-4 bg-white/5 hover:bg-white/10 rounded-lg transition text-center">
                          <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                          <div className="text-white text-sm font-medium">Rewards</div>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
