"use client";

import { useState, useEffect } from "react";
import { Link } from "next-intl/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import {
  Menu,
  X,
  Droplets,
  Home,
  FolderOpen,
  Wallet,
  User,
  Bell,
  LogOut,
  Globe,
  Newspaper,
  Gavel,
  Trophy,
  Gem,
  Target,
  FileText,
  Users,
  Microscope,
  BarChart3,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  unityBalance: number;
  role: string;
}

// Navigation items - labels will be translated in component
// All pages are now accessible without authentication (guest mode)
const getNavItems = (t: (key: string) => string) => [
  { href: "/landing", label: t("nav.landing"), icon: Globe },
  { href: "/ecosystem/feed", label: t("nav.feed"), icon: Newspaper },
  { href: "/tokenhub", label: t("nav.tokenhub"), icon: Wallet },
  { href: "/projecthub", label: t("nav.projecthub"), icon: FolderOpen },
  { href: "/staking", label: t("nav.staking"), icon: Gem },
  { href: "/dao", label: t("nav.dao"), icon: Gavel },
  { href: "/analytics", label: t("nav.analytics"), icon: BarChart3 },
  { href: "/ecosystem/missions", label: t("nav.missions"), icon: Target },
  { href: "/ecosystem/achievements", label: t("nav.achievements"), icon: Trophy },
  { href: "/vod-lab", label: t("nav.vodlab"), icon: Microscope },
  { href: "/tokenomics", label: t("nav.tokenomics"), icon: Wallet },
  { href: "/litepaper", label: t("nav.litepaper"), icon: FileText },
  { href: "/litepaper2", label: t("nav.litepaper") + " 2.0", icon: FileText },
  { href: "/about", label: t("nav.about"), icon: Users },
  { href: "/globe", label: t("nav.globe"), icon: Globe },
  { href: "/profile", label: t("nav.profile"), icon: User },
];

export default function Navbar() {
  const t = useTranslations();
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();
  
  const navItems = getNavItems(t);

  useEffect(() => {
    // Fetch current user
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.data.user);
        }
      })
      .catch(() => {
        setUser(null);
      });

    // Fetch unread notifications count
    fetch("/api/notifications/count")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUnreadCount(data.data.count);
        }
      })
      .catch(() => {
        setUnreadCount(0);
      });
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10 rounded-none">
        <div className="h-16 px-4 flex items-center justify-between">
          {/* Left: Burger Menu */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-water-200/70 hover:text-white transition"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Center: Logo */}
          <Link href="/" locale={false} className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <Droplets className="w-7 h-7 text-water-400" />
            <span className="text-xl font-bold gradient-text">LoopOrb</span>
          </Link>

          {/* Right: Notifications + Language + User */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <LanguageSelector />

            {/* Notifications */}
            <Link
              href="/notifications"
              className="relative p-2 text-water-200/70 hover:text-white transition"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 min-w-[18px] h-[18px] px-1 bg-cyan-glow text-ocean-deep text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>

            {/* User Avatar (small, without name/balance) */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep font-bold text-sm hover:ring-2 hover:ring-water-400/50 transition"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-10 w-48 glass-card py-2"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-water-200/80 hover:bg-white/5 hover:text-white transition"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        {t("profile.title")}
                      </Link>
                      <Link
                        href="/buy"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-cyan-glow hover:bg-white/5 transition"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Gem className="w-4 h-4" />
                        {t("profile.buyUnity")}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        {t("profile.logout")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-water-200/70 hover:text-white hover:bg-white/20 transition"
              >
                <User className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-72 glass-card border-r border-white/10"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsSidebarOpen(false)}>
                  <Droplets className="w-7 h-7 text-water-400" />
                  <span className="text-xl font-bold gradient-text">LoopOrb</span>
                </Link>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 text-water-200/70 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Info (if logged in) */}
              {user && (
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep font-bold">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white truncate">{user.name}</div>
                      <div className="text-xs text-water-200/50">{user.role}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="p-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      isActive(item.href)
                        ? "bg-water-500/20 text-water-400"
                        : "text-water-200/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Auth Buttons (if not logged in) */}
              {!user && (
                <div className="p-4 mt-auto border-t border-white/10 space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block w-full btn-secondary text-center"
                  >
                    {t("profile.login")}
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsSidebarOpen(false)}
                    className="block w-full btn-primary text-center"
                  >
                    {t("profile.register")}
                  </Link>
                </div>
              )}

              {/* Logout (if logged in) */}
              {user && (
                <div className="p-4 mt-auto border-t border-white/10">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsSidebarOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("profile.logout")}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
