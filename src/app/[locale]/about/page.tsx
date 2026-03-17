"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  Droplets, Globe, Award, TrendingUp, Users, Clock,
  ChevronRight, ArrowRight, History, Target, Zap,
  MapPin, Building2, HandHeart as Handshake, Calendar, DollarSign,
  Share2, Mail, Play, Download, FileText, ExternalLink,
  CheckCircle, Star, Factory, Landmark, Beaker,
  Playfair, ArrowUpRight, Video, Image as ImageIcon, X
} from "lucide-react";

// Timeline data from "objects of path.md"
const timelineData = [
  {
    year: "2003",
    title: "Начало пути с Culligan",
    description: "Оборудование Culligan установлено в Ташкентском аквапарке. Высокотехнологичные решения гарантируют долгий срок службы и высокое качество воды.",
    icon: Droplets,
    color: "cyan",
    projects: [
      { name: "Water Park Tashkent", location: "Ташкент, Узбекистан", type: "water-park" },
      { name: "Nemiroff", location: "Винница, Украина", type: "production" }
    ]
  },
  {
    year: "2004",
    title: "Расширение в СНГ",
    description: "Установки Culligan в Казахстане, Беларуси, Украине. Партнёрство с крупнейшими предприятиями региона.",
    icon: Globe,
    color: "blue",
    projects: [
      { name: "Химический завод", location: "Казахстан", type: "industrial" },
      { name: "Мир Фитнеса", location: "Минск, Беларусь", type: "sports" },
      { name: "Водка Хортица", location: "Запорожье, Украина", type: "production" },
      { name: "Аэропорт Борисполь", location: "Киев, Украина", type: "infrastructure" }
    ]
  },
  {
    year: "2005",
    title: "Работа с государственными структурами",
    description: "Culligan успешно работает на объектах Администрации Президента РФ, крупнейших промышленных предприятиях.",
    icon: Landmark,
    color: "purple",
    projects: [
      { name: "Администрация Президента РФ", location: "Москва, Россия", type: "government" },
      { name: "Напитки из Черноголовки", location: "Черноголовка, Россия", type: "production" },
      { name: "Газпром Headquarters", location: "Москва, Россия", type: "corporate" },
      { name: "АЛРОСА", location: "Якутия, Россия", type: "industrial" }
    ]
  },
  {
    year: "2006",
    title: "PPP проекты в Туркменистане",
    description: "Открытие станции водоподготовки в Ашхабаде. Контракт на сумму более $200 млн.",
    icon: DollarSign,
    color: "green",
    projects: [
      { name: "Станция водоподготовки", location: "Ашхабад, Туркменистан", type: "infrastructure", investment: "$200M+" }
    ]
  },
  {
    year: "2007-2010",
    title: "Пищевая промышленность и коммунальные проекты",
    description: "Оборудование Culligan на предприятиях пищевой промышленности, водоканалах Беларуси и России.",
    icon: Factory,
    color: "amber",
    projects: [
      { name: "Беловежские сыры", location: "Беларусь", type: "production" },
      { name: "Тирасполь", location: "Приднестровье", type: "infrastructure" },
      { name: "Кобрин", location: "Беларусь", type: "infrastructure" },
      { name: "Молодечно", location: "Беларусь", type: "infrastructure" },
      { name: "Лида", location: "Беларусь", type: "infrastructure" }
    ]
  },
  {
    year: "2011",
    title: "Модернизация водоканалов Украины",
    description: "Открытие фильтрационной станции в Петровском. Сотрудничество с государством.",
    icon: Building2,
    color: "red",
    projects: [
      { name: "Фильтрационная станция", location: "Луганская область, Украина", type: "infrastructure", capacity: "20 тыс. м³/день" }
    ]
  },
  {
    year: "2012",
    title: "Создание Culligan Bel",
    description: "Инвестиционный проект по организации производства оборудования для водоподготовки на территории Беларуси. Фабрика в Заславле.",
    icon: Award,
    color: "cyan",
    projects: [
      { name: "Culligan Bel Factory", location: "Заславль, Беларусь", type: "production", investment: "€60M" },
      { name: "Белорусско-американский форум", location: "Нью-Йорк, США", type: "partnership" }
    ]
  },
  {
    year: "2013",
    title: "Олимпийское партнёрство",
    description: "Culligan становится официальным партнёром Национального Олимпийского комитета Беларуси.",
    icon: Star,
    color: "yellow",
    projects: [
      { name: "НОК Беларуси", location: "Минск, Беларусь", type: "partnership" },
      { name: "Савушкин продукт", location: "Брест, Беларусь", type: "production" },
      { name: "Открытие в Санкт-Петербурге", location: "Санкт-Петербург, Россия", type: "infrastructure" }
    ]
  },
  {
    year: "2014",
    title: "Международное признание",
    description: "Белорусско-американский инвестиционный форум в Нью-Йорке. Culligan Eurasia выбирает Беларусь как центр производства.",
    icon: Globe,
    color: "blue",
    projects: [
      { name: "Слоним", location: "Беларусь", type: "infrastructure" },
      { name: "Форум в Нью-Йорке", location: "Нью-Йорк, США", type: "partnership" },
      { name: "Форум в Лондоне", location: "Лондон, Великобритания", type: "partnership" }
    ]
  },
  {
    year: "2015",
    title: "Расширение производства",
    description: "Строительство завода в Заславле. Culligan Eurasia регистрируется в Минске.",
    icon: Factory,
    color: "purple",
    projects: [
      { name: "Culligan Eurasia", location: "Минск, Беларусь", type: "corporate" },
      { name: "Берёзовский сыродельный завод", location: "Иваново, Беларусь", type: "production" }
    ]
  },
  {
    year: "2016",
    title: "Технологическое лидерство",
    description: "Запуск современных станций обезжелезивания. Сотрудничество с Tetra Pak.",
    icon: Zap,
    color: "cyan",
    projects: [
      { name: "Tetra Pak Partnership", location: "Международный", type: "partnership" },
      { name: "Кобринский маслосырзавод", location: "Кобрин, Беларусь", type: "production" },
      { name: "Бабушкина крынка", location: "Могилёв, Беларусь", type: "production" },
      { name: "Фристайл", location: "Минск, Беларусь", type: "sports" },
      { name: "Петровщина", location: "Минск, Беларусь", type: "infrastructure" },
      { name: "Минск-Арена", location: "Минск, Беларусь", type: "sports" }
    ]
  },
  {
    year: "2017-2021",
    title: "Разработка UNICAP Global",
    description: "Формирование видения помощи обществу и планете. Разработка концепции VODPROM — платформы для реализации совместных решений.",
    icon: Target,
    color: "green",
    projects: [
      { name: "UNICAP Global", location: "Международный", type: "platform" },
      { name: "VODPROM Concept", location: "Международный", type: "platform" }
    ]
  },
  {
    year: "2024-2026",
    title: "Запуск VODeco экосистемы",
    description: "Создание децентрализованной экосистемы мониторинга воды на базе блокчейна. Интеграция IoT, AI и автоматических лабораторий.",
    icon: Droplets,
    color: "cyan",
    projects: [
      { name: "VODeco Platform", location: "Глобальный", type: "platform" },
      { name: "VOD-Lab Network", location: "Глобальный", type: "infrastructure" },
      { name: "UNITY Token", location: "Глобальный", type: "blockchain" }
    ]
  }
];

// Partners data
const partnersData = [
  { name: "Nemiroff", type: "corporate", logo: "🥃", projects: 1, location: "Украина" },
  { name: "Gazprom", type: "corporate", logo: "🏢", projects: 1, location: "Россия" },
  { name: "ALROSA", type: "corporate", logo: "💎", projects: 1, location: "Россия" },
  { name: "Tetra Pak", type: "corporate", logo: "📦", projects: 1, location: "Международный" },
  { name: "Olympic Committee", type: "organization", logo: "🏅", projects: 1, location: "Беларусь" },
  { name: "Government of Turkmenistan", type: "government", logo: "🏛️", projects: 1, location: "Туркменистан" },
  { name: "Belarus Government", type: "government", logo: "🇧🇾", projects: 5, location: "Беларусь" },
  { name: "Minsk Arena", type: "sports", logo: "🏒", projects: 1, location: "Беларусь" },
];

// Team members
const teamData = [
  {
    name: "Tim Mackintosh",
    role: "Managing Director",
    bio: "Британский бизнесмен, управляющий директор инвестиционной компании Nova International Management. Олимпийский атташе сборной Беларуси на Олимпиаде в Лондоне 2012.",
    image: "👨‍💼"
  },
  {
    name: "Lawrence Bauer",
    role: "Senior Vice President, Culligan International",
    bio: "Вице-президент Culligan International, курирующий проекты в Восточной Европе и СНГ.",
    image: "👨‍💼"
  },
  {
    name: "Artem Kucherov",
    role: "Director, Culligan Bel",
    bio: "Директор Culligan Bel LLC, отвечающий за производство и развитие в странах Таможенного союза.",
    image: "👨‍💼"
  }
];

// Metrics
const metricsData = [
  { value: "50+", label: "Проектов реализовано", icon: CheckCircle },
  { value: "12+", label: "Стран присутствия", icon: Globe },
  { value: "$200M+", label: "Контракты PPP", icon: DollarSign },
  { value: "43+", label: "IoT сенсора", icon: Zap },
  { value: "20+", label: "Лет опыта", icon: Clock },
  { value: "1000+", label: "Объектов", icon: Building2 },
];

// Documents
const documentsData = [
  { title: "WhitePaper VODeco", type: "PDF", size: "2.4 MB", icon: FileText },
  { title: "Litepaper", type: "PDF", size: "850 KB", icon: FileText },
  { title: "Tokenomics Report", type: "PDF", size: "1.2 MB", icon: FileText },
  { title: "Ecosystem Overview", type: "PDF", size: "3.1 MB", icon: FileText },
];

// Offices
const officesData = [
  { city: "Ташкент", country: "Узбекистан", type: "Regional Hub" },
  { city: "Минск", country: "Беларусь", type: "Production Center" },
  { city: "Москва", country: "Россия", type: "Regional Office" },
  { city: "Киев", country: "Украина", type: "Regional Office" },
];

// Color variants for timeline
const colorVariants: Record<string, string> = {
  cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
  blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
  purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400",
  green: "from-green-500/20 to-green-500/5 border-green-500/30 text-green-400",
  amber: "from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400",
  red: "from-red-500/20 to-red-500/5 border-red-500/30 text-red-400",
  yellow: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 text-yellow-400",
};

// Gallery images (placeholder)
const galleryImages = [
  { src: "/images/gallery/tashkent-park.jpg", caption: "Ташкентский аквапарк, 2003" },
  { src: "/images/gallery/nemiroff.jpg", caption: "Завод Nemiroff, 2003" },
  { src: "/images/gallery/minsk-arena.jpg", caption: "Минск-Арена, 2016" },
  { src: "/images/gallery/culligan-factory.jpg", caption: "Завод Culligan Bel, 2015" },
  { src: "/images/gallery/ashgabat.jpg", caption: "Станция в Ашхабаде, 2006" },
  { src: "/images/gallery/vodeco-platform.jpg", caption: "Платформа VODeco, 2024" },
];

export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <>
      <Navbar />
      <main ref={containerRef} className="min-h-screen pt-20 pb-8">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 py-20 border-b border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
          <motion.div
            style={{ opacity, scale }}
            className="max-w-7xl mx-auto relative z-10"
          >
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6"
              >
                <History className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400 font-medium">Наша история</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                Путь к <span className="gradient-text">водной экономике</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-water-200/70 max-w-3xl mx-auto mb-8"
              >
                Более 20 лет опыта в водоподготовке от Culligan к глобальной
                децентрализованной экосистеме VODeco
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link href="/tokenhub" className="btn-primary inline-flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Инвестировать
                </Link>
                <Link href="/litepaper" className="btn-secondary inline-flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Читать Litepaper
                </Link>
                <button className="btn-secondary inline-flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Смотреть видео
                </button>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Mission Cards */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid md:grid-cols-3 gap-6"
              >
              <div className="glass-card p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Наша миссия</h3>
                <p className="text-water-200/60 text-sm">
                  Вода — один из ключевых ресурсов Земли. Мы посвятили жизнь изучению
                  взаимодействия водных ресурсов экосистемы Земли и человеческого организма.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Наше видение</h3>
                <p className="text-water-200/60 text-sm">
                  Создание глобальной децентрализованной экосистемы для мониторинга
                  и управления водными ресурсами на базе блокчейна и IoT.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Наши ценности</h3>
                <p className="text-water-200/60 text-sm">
                  Прозрачность, устойчивость, инновации и сотрудничество для сохранения
                  водных ресурсов планеты для будущих поколений.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-12 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {metricsData.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-6 text-center"
                >
                  <metric.icon className="w-6 h-6 text-cyan-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-cyan-400 mb-1">{metric.value}</div>
                  <div className="text-sm text-water-200/50">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Хронология развития
              </h2>
              <p className="text-water-200/70 max-w-2xl mx-auto">
                От первых проектов Culligan в 2003 году до запуска экосистемы VODeco
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-green-500/50" />

              {timelineData.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex gap-8 mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-ocean-deep z-10" />

                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} pl-20 md:pl-0`}>
                    <motion.div
                      className={`glass-card p-6 border ${colorVariants[item.color]}`}
                    >
                      <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colorVariants[item.color].split(" ")[0]} ${colorVariants[item.color].split(" ")[1]} flex items-center justify-center flex-shrink-0`}>
                          <item.icon className={`w-6 h-6 ${colorVariants[item.color].split(" ")[3]}`} />
                        </div>
                        <div>
                          <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-400 font-bold text-sm">
                            {item.year}
                          </span>
                          <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-water-200/70 mb-4">{item.description}</p>

                      {/* Projects list */}
                      {item.projects && item.projects.length > 0 && (
                        <div className={`space-y-2 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                          <div className="text-sm text-cyan-400 font-medium mb-2">Ключевые проекты:</div>
                          {item.projects.map((project, pIndex) => (
                            <div key={pIndex} className={`flex items-center gap-2 text-sm text-water-200/60 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                              <MapPin className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                              <span>{project.name} {project.investment && <span className="text-green-400">({project.investment})</span>}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ключевые партнёры
              </h2>
              <p className="text-water-200/70 max-w-2xl mx-auto">
                Нам доверяют крупнейшие компании и государственные организации
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {partnersData.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-6 text-center hover:border-cyan-500/30 transition-colors"
                >
                  <div className="text-4xl mb-3">{partner.logo}</div>
                  <h3 className="font-semibold text-white mb-1">{partner.name}</h3>
                  <p className="text-sm text-water-200/50 mb-2">{partner.location}</p>
                  <div className="text-xs text-cyan-400">{partner.projects} проект(ов)</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Link href="/partners" className="btn-secondary inline-flex items-center gap-2">
                Все партнёры
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Команда
              </h2>
              <p className="text-water-200/70 max-w-2xl mx-auto">
                Лидеры, которые ведут нас к цели
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {teamData.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-cyan-400 text-sm mb-4">{member.role}</p>
                  <p className="text-water-200/60 text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Галерея проектов
              </h2>
              <p className="text-water-200/70 max-w-2xl mx-auto">
                Визуальная история наших достижений
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-white/30" />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-sm">{image.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Документы
              </h2>
              <p className="text-water-200/70 max-w-2xl mx-auto">
                Официальные документы и отчёты экосистемы
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {documentsData.map((doc, index) => (
                <motion.div
                  key={doc.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 flex items-center justify-between hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                      <doc.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{doc.title}</h3>
                      <p className="text-sm text-water-200/50">{doc.type} • {doc.size}</p>
                    </div>
                  </div>
                  <button className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <Download className="w-5 h-5 text-cyan-400" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Offices / Contact Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Офисы и контакты
              </h2>
              <p className="text-water-200/70 max-w-2xl mx-auto">
                Мы присутствуем в ключевых регионах мира
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {officesData.map((office, index) => (
                <motion.div
                  key={office.city}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-6 text-center"
                >
                  <MapPin className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-1">{office.city}</h3>
                  <p className="text-sm text-water-200/50 mb-2">{office.country}</p>
                  <span className="text-xs px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-400">
                    {office.type}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="glass-card p-8">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Mail className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-1">Email</h3>
                  <a href="mailto:info@vodeco.io" className="text-cyan-400 hover:underline">info@vodeco.io</a>
                </div>
                <div className="text-center">
                  <Handshake className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-1">Партнёрство</h3>
                  <a href="mailto:partners@vodeco.io" className="text-cyan-400 hover:underline">partners@vodeco.io</a>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-1">Поддержка</h3>
                  <a href="mailto:support@vodeco.io" className="text-cyan-400 hover:underline">support@vodeco.io</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social & CTA Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Присоединяйтесь к нам
              </h2>
              <p className="text-water-200/70 mb-8 max-w-2xl mx-auto">
                Станьте частью глобального движения за прозрачность и устойчивость
                водных ресурсов. Инвестируйте в будущее планеты.
              </p>

              {/* Social Actions */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button className="btn-secondary inline-flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Поделиться историей
                </button>
                <button className="btn-secondary inline-flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Пригласить друга
                </button>
                <button className="btn-secondary inline-flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Подписаться на обновления
                </button>
              </div>

              {/* Main CTA */}
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/tokenhub" className="btn-primary inline-flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Инвестировать в проекты
                </Link>
                <Link href="/register" className="btn-secondary inline-flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Присоединиться к команде
                </Link>
                <Link href="/litepaper" className="btn-outline inline-flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Читать Litepaper
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Image Modal */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="max-w-4xl w-full">
              <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-24 h-24 text-white/30" />
              </div>
              <p className="text-center text-white mt-4">{galleryImages[selectedImage].caption}</p>
            </div>
          </motion.div>
        )}
      </main>
    </>
  );
}