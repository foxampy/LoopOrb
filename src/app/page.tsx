"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import {
  FolderOpen,
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
} from "lucide-react";

// Dynamically import Globe3D to avoid SSR issues
const Globe3D = dynamic(() => import("@/components/Globe3D"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-ocean-deep/50 rounded-xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-water-200/70 text-sm">Загрузка 3D глобуса...</p>
      </div>
    </div>
  ),
});

// News feed data (connected to API in production)
const newsFeed = [
  {
    id: "1",
    type: "news",
    title: "ООН: К 2025 году половина мирового населения будет жить в условиях водного стресса",
    summary: "Новый доклад ООН по водным ресурсам предупреждает о растущем кризисе.",
    source: "UN Water",
    date: "2 часа назад",
    image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?w=800",
    likes: 1245,
    comments: 89,
    tags: ["ООН", "климат", "водный кризис"],
  },
  {
    id: "2",
    type: "project",
    title: "Запущен глобальный проект по очистке океанов от пластика",
    summary: "Ocean Cleanup начал новую фазу операции по удалению пластика из Тихого океана.",
    source: "The Ocean Cleanup",
    date: "5 часов назад",
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800",
    likes: 3421,
    comments: 256,
    tags: ["океан", "пластик", "экология"],
  },
  {
    id: "3",
    type: "alert",
    title: "Уровень воды в озере Балхаш достиг критической отметки",
    summary: "Экологи бьют тревогу: за последние 10 лет площадь озера сократилась на 15%.",
    source: "Казгидромет",
    date: "6 часов назад",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800",
    likes: 456,
    comments: 89,
    tags: ["Казахстан", "Балхаш", "экология"],
  },
];

interface Project {
  id: string;
  slug: string;
  name: string;
  coverImage?: string;
  status: string;
  raisedAmount: number;
  targetAmount?: number;
}

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

function NewsCard({ item, index }: { item: any; index: number }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const TypeIcon = typeIcons[item.type] || Globe;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card overflow-hidden"
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${typeColors[item.type]} flex items-center justify-center`}>
            <TypeIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white text-sm">{item.source}</span>
            </div>
            <div className="text-xs text-water-200/50">{item.date}</div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-3">
        <h3 className="text-base font-semibold text-white mb-2 hover:text-water-400 transition cursor-pointer">
          {item.title}
        </h3>
        <p className="text-water-200/70 text-sm line-clamp-2">{item.summary}</p>
      </div>

      {item.image && (
        <div className="relative h-40">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 to-transparent" />
        </div>
      )}

      {item.tags && (
        <div className="px-4 py-2 flex flex-wrap gap-2">
          {item.tags.map((tag: string) => (
            <span key={tag} className="px-2 py-0.5 bg-white/5 text-water-200/70 text-xs rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="px-4 py-2 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 transition ${liked ? "text-red-400" : "text-water-200/50 hover:text-red-400"}`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            <span className="text-xs">{item.likes + (liked ? 1 : 0)}</span>
          </button>
          <button className="flex items-center gap-1.5 text-water-200/50 hover:text-water-400 transition">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs">{item.comments}</span>
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

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                <span className="gradient-text">LoopOrb</span>
              </h1>
              <p className="text-water-200/70">
                Глобальная экосистема управления водными ресурсами
              </p>
            </div>
          </motion.div>

          {/* Main Dashboard Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Tools & Globe */}
            <div className="lg:col-span-2 space-y-8">
              {/* Management Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-water-400" />
                  Инструменты управления
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: Globe, title: "3D Глобус", desc: "Изучайте водные объекты", href: "/globe", color: "bg-blue-500/20 text-blue-400" },
                    { icon: FolderOpen, title: "Проекты", desc: "Инвестируйте в экологию", href: "/projects", color: "bg-green-500/20 text-green-400" },
                    { icon: Gavel, title: "DAO", desc: "Управление экосистемой", href: "/dao", color: "bg-purple-500/20 text-purple-400" },
                    { icon: Target, title: "Миссии", desc: "Задания и награды", href: "/missions", color: "bg-orange-500/20 text-orange-400" },
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
              </motion.div>

              {/* Globe Visualization */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card overflow-hidden"
              >
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-water-400" />
                    Глобальная визуализация
                  </h2>
                  <Link href="/globe" className="text-sm text-water-400 hover:text-water-300 transition flex items-center gap-1">
                    Полный экран <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="h-[400px]">
                  <Globe3D />
                </div>
              </motion.div>

              {/* Active Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Активные проекты</h2>
                  <Link href="/projects" className="text-sm text-water-400 hover:text-water-300 transition">
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
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-water-500/30 to-cyan-400/30 flex items-center justify-center flex-shrink-0">
                          <FolderOpen className="w-7 h-7 text-water-400" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="font-medium text-white truncate">{project.name}</div>
                          <div className="flex items-center gap-4 text-sm text-water-200/60">
                            <span className="capitalize">{project.status}</span>
                            {project.targetAmount && (
                              <span>
                                ${project.raisedAmount.toLocaleString()} / ${project.targetAmount.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-water-200/30 flex-shrink-0" />
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-8 text-water-200/50">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Plus className="w-8 h-8 text-water-200/30" />
                      </div>
                      <p>Пока нет активных проектов</p>
                      <Link href="/projects/new" className="text-water-400 hover:text-water-300 text-sm mt-2 inline-block">
                        Создать первый проект
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Column - News Feed */}
            <div className="space-y-8">
              {/* News Feed Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between"
              >
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-water-400" />
                  Новостная лента
                </h2>
                <Link href="/feed" className="text-sm text-water-400 hover:text-water-300 transition">
                  Все новости →
                </Link>
              </motion.div>

              {/* News Cards */}
              <div className="space-y-4">
                {newsFeed.map((item, index) => (
                  <NewsCard key={item.id} item={item} index={index} />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center">
                <button className="btn-secondary flex items-center gap-2 mx-auto text-sm">
                  Загрузить ещё
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Stats Widget - Data from API */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">Экосистема сегодня</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-water-200/70">Новых объектов</span>
                    <span className="text-water-400 font-semibold">—</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-water-200/70">Активных миссий</span>
                    <span className="text-green-400 font-semibold">—</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-water-200/70">Предложений DAO</span>
                    <span className="text-purple-400 font-semibold">—</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Link href="/dao" className="text-sm text-water-400 hover:text-water-300 transition flex items-center gap-1">
                    <Gavel className="w-4 h-4" />
                    Проголосовать в DAO
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
