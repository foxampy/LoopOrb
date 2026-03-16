"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Wallet,
  FolderOpen,
  Droplets,
  TrendingUp,
  Award,
  Users,
  ArrowRight,
  Plus,
  Lock,
  Globe,
  Target,
  Gavel,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  unityBalance: number;
  stakedAmount: number;
  level: number;
  xp: number;
  reputation: number;
  role: string;
}

interface Project {
  id: string;
  slug: string;
  name: string;
  coverImage?: string;
  status: string;
  raisedAmount: number;
  targetAmount?: number;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user (may be null if not authenticated)
        const userRes = await fetch("/api/auth/me");
        const userData = await userRes.json();

        if (userData.success) {
          setUser(userData.data.user);
        }

        // Fetch projects (public)
        const projectsRes = await fetch("/api/projects?limit=3");
        const projectsData = await projectsRes.json();
        if (projectsData.success) {
          setProjects(projectsData.data.data);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin" />
        </main>
      </>
    );
  }

  // Guest view - show overview of platform
  if (!user) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero for guests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12 py-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Добро пожаловать в <span className="gradient-text">LoopOrb</span>
              </h1>
              <p className="text-xl text-water-200/70 max-w-2xl mx-auto mb-8">
                Глобальная экосистема управления водными ресурсами. 
                Присоединяйтесь к сообществу и вносите свой вклад в сохранение воды планеты.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register" className="btn-primary text-center">
                  Присоединиться
                </Link>
                <Link href="/projects" className="btn-secondary text-center">
                  Исследовать проекты
                </Link>
              </div>
            </motion.div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Globe, title: "3D Глобус", desc: "Изучайте водные объекты мира", href: "/globe" },
                { icon: FolderOpen, title: "Проекты", desc: "Инвестируйте в экологические инициативы", href: "/projects" },
                { icon: Gavel, title: "DAO", desc: "Участвуйте в управлении экосистемой", href: "/dao" },
                { icon: Target, title: "Миссии", desc: "Выполняйте задания и получайте награды", href: "/missions" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={feature.href} className="block glass-card-hover p-6 h-full">
                    <feature.icon className="w-10 h-10 text-water-400 mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-water-200/60">{feature.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Featured Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Популярные проекты</h2>
                <Link href="/projects" className="text-sm text-water-400 hover:text-water-300 transition">
                  Все проекты →
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.slice(0, 3).map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="block glass-card-hover p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <FolderOpen className="w-6 h-6 text-water-400" />
                      <span className="text-xs text-water-200/50 capitalize">{project.status}</span>
                    </div>
                    <h3 className="font-medium text-white mb-1">{project.name}</h3>
                    {project.targetAmount && (
                      <div className="text-sm text-water-200/60">
                        Собрано: ${project.raisedAmount.toLocaleString()} / ${project.targetAmount.toLocaleString()}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { value: "10,000+", label: "Водных объектов" },
                { value: "4", label: "Активных проекта" },
                { value: "$3.2M", label: "Инвестировано" },
                { value: "500+", label: "Участников" },
              ].map((stat, index) => (
                <div key={stat.label} className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-water-200/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </main>
      </>
    );
  }

  // Authenticated user view
  const stats = [
    {
      title: "Баланс UNITY",
      value: user.unityBalance.toFixed(2),
      icon: Wallet,
      color: "text-cyan-glow",
      href: "/wallet",
    },
    {
      title: "В стейкинге",
      value: user.stakedAmount.toFixed(2),
      icon: TrendingUp,
      color: "text-green-400",
      href: "/wallet",
    },
    {
      title: "Уровень",
      value: user.level.toString(),
      icon: Award,
      color: "text-yellow-400",
      href: "/profile",
    },
    {
      title: "Репутация",
      value: user.reputation.toString(),
      icon: Users,
      color: "text-purple-400",
      href: "/profile",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              Привет, {user.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-water-200/70">
              Добро пожаловать в экосистему LoopOrb
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={stat.href}
                  className="block glass-card-hover p-4 h-full"
                >
                  <div className="flex items-start justify-between mb-2">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    <ArrowRight className="w-4 h-4 text-water-200/30" />
                  </div>
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-water-200/60">{stat.title}</div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-4">
                  Быстрые действия
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link
                    href="/projects/new"
                    className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-water-500/20 flex items-center justify-center group-hover:scale-110 transition">
                      <Plus className="w-6 h-6 text-water-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Создать проект</div>
                      <div className="text-sm text-water-200/60">
                        Запустите свой проект
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/objects/new"
                    className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-cyan-glow/20 flex items-center justify-center group-hover:scale-110 transition">
                      <Droplets className="w-6 h-6 text-cyan-glow" />
                    </div>
                    <div>
                      <div className="font-medium text-white">Добавить объект</div>
                      <div className="text-sm text-water-200/60">
                        Водный объект на карту
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>

              {/* Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">
                    Активные проекты
                  </h2>
                  <Link
                    href="/projects"
                    className="text-sm text-water-400 hover:text-water-300 transition"
                  >
                    Все проекты →
                  </Link>
                </div>

                <div className="space-y-4">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <Link
                        key={project.id}
                        href={`/projects/${project.slug}`}
                        className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition"
                      >
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-water-500/30 to-cyan-glow/30 flex items-center justify-center flex-shrink-0">
                          <FolderOpen className="w-8 h-8 text-water-400" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="font-medium text-white truncate">
                            {project.name}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-water-200/60">
                            <span className="capitalize">{project.status}</span>
                            {project.targetAmount && (
                              <span>
                                ${project.raisedAmount.toLocaleString()} / ${
                                  project.targetAmount.toLocaleString()
                                }
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-water-200/30 flex-shrink-0" />
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-8 text-water-200/50">
                      Пока нет активных проектов
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* XP Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-4">
                  Прогресс
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-water-200/70">Уровень {user.level}</span>
                      <span className="text-water-200/50">{user.xp} XP</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-water-400 to-cyan-glow rounded-full"
                        style={{ width: `${(user.xp % 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-water-200/40 mt-2">
                      {100 - (user.xp % 100)} XP до следующего уровня
                    </p>
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
