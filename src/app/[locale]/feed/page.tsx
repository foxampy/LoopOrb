"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  MoreHorizontal,
  Image as ImageIcon,
  MapPin,
  Globe,
  Filter,
  TrendingUp,
  Clock,
  Droplets,
  AlertTriangle,
  CheckCircle,
  Users,
  ExternalLink,
  ChevronDown,
  Zap,
  Award,
  Leaf,
} from "lucide-react";

// 🌍 Актуальные новости на февраль 2026 (обновлено 20.02.2026)
const worldNews = [
  {
    id: "wn1",
    type: "alert",
    scope: "global",
    title: "Эль-Ниньо 2026: 85% вероятность экстремальной засухи в Африке и Азии",
    summary: "Всемирная метеорологическая организация предупреждает о катастрофическом засухе. Ожидается гибель урожаев для 400+ млн человек. LoopOrb активирует экстренный протокол мониторинга.",
    source: "WMO / ООН",
    date: "2 часа назад",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800",
    likes: 3245,
    comments: 412,
    tags: ["ЭльНиньо", "засуха", "кризис", "ООН"],
  },
  {
    id: "wn2",
    type: "project",
    scope: "global",
    title: "LoopOrb + World Bank: Запущен фонд восстановления водных объектов на $500M",
    summary: "Историческое партнёрство с Всемирным банком. Финансирование проектов по очистке рек, восстановлению озёр и модернизации инфраструктуры в 40+ странах. Первые проекты стартуют в марте.",
    source: "LoopOrb Official",
    date: "5 часов назад",
    image: "https://images.unsplash.com/photo-1538300342682-cf57afb97285?w=800",
    likes: 5678,
    comments: 623,
    tags: ["WorldBank", "фонд", "партнерство", "инвестиции"],
  },
  {
    id: "wn3",
    type: "research",
    scope: "global",
    title: "Прорыв в опреснении: графеновые мембраны снизили энергопотребление на 75%",
    summary: "Исследователи из MIT и Сингапура представили революционную технологию. Стоимость опреснения морской воды падает до $0.30/м³ — конкурентоспособно с пресной водой в дефицитных регионах.",
    source: "Nature Water Journal",
    date: "Вчера",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    likes: 2156,
    comments: 198,
    tags: ["технологии", "опреснение", "графен", "MIT"],
  },
  {
    id: "wn4",
    type: "alert",
    scope: "global",
    title: "Таяние Гималайских ледников ускорилось в 2.5 раза за последние 5 лет",
    summary: "Спутниковые данные ICIMOD: потеря ледяного покрова критична для водоснабжения 1.9 млрд человек. Реки Инд, Ганг, Брахмапутра могут пересохнуть в летний период уже к 2028.",
    source: "ICIMOD / NASA",
    date: "Вчера",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    likes: 1892,
    comments: 445,
    tags: ["Гималаи", "ледники", "изменение климата", "Азия"],
  },
  {
    id: "wn5",
    type: "success",
    scope: "global",
    title: "Амазония: Верховный суд Бразилии расширил права реки как юридического лица",
    summary: "Прецедентное решение: Амазонка теперь имеет право на 'здоровое существование'. Создан специальный совет охраны с представителями коренных народов и учёных. 15 крупных загрязнителей оштрафованы.",
    source: "Supremo Tribunal Federal",
    date: "2 дня назад",
    image: "https://images.unsplash.com/photo-1516934024742-b461fba47600?w=800",
    likes: 4567,
    comments: 678,
    tags: ["Бразилия", "Амазонка", "право", "природа"],
  },
  {
    id: "wn6",
    type: "project",
    scope: "global",
    title: "Ocean Cleanup System 03: уже собрано 15,000 тонн пластика из Тихого океана",
    summary: "Новое поколение системы очистки океана работает автономно 24/7. AI-навигация позволяет находить скопления пластика с точностью 94%. Следующая цель — 100,000 тонн к концу 2026.",
    source: "The Ocean Cleanup",
    date: "3 дня назад",
    image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800",
    likes: 3892,
    comments: 312,
    tags: ["океан", "пластик", "AI", "экология"],
  },
  {
    id: "wn7",
    type: "research",
    scope: "global",
    title: "Водный след биткоина: исследование показало 1 транзакция = 2,000 литров воды",
    summary: "Учёные из Кембриджа рассчитали скрытое водопотребление криптовалют. Доказательство работы (PoW) требует огромных объёмов воды для охлаждения. Призыв к переходу на Proof-of-Water механизмы.",
    source: "Cambridge Water Research",
    date: "4 дня назад",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800",
    likes: 1456,
    comments: 567,
    tags: ["криптовалюта", "водный след", "PoW", "исследование"],
  },
];

// 🌏 Региональные новости - февраль 2026
const regionalNews = [
  {
    id: "rn1",
    type: "project",
    scope: "central-asia",
    region: "Центральная Азия",
    country: "Узбекистан",
    title: "Модернизация насосных станций Бухарского региона: стартовал Phase 2",
    summary: "$45M инвестиций в 12 станций. Новое оборудование снизит потери воды на 35% и обеспечит стабильное давление для 500,000 жителей. LoopOrb мониторит прогресс в реальном времени через IoT-датчики.",
    author: "Минводхоз РУз + LoopOrb",
    date: "3 часа назад",
    image: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800",
    likes: 892,
    comments: 145,
    tags: ["Узбекистан", "Бухара", "инфраструктура", "модернизация"],
  },
  {
    id: "rn2",
    type: "alert",
    scope: "central-asia",
    region: "Центральная Азия",
    country: "Казахстан",
    title: "Критический уровень: озеро Балхаш потеряло ещё 8% площади за зиму",
    summary: "Спутниковый мониторинг показывает ускоренное высыхание. Экосистема на грани коллапса. Срочно требуется международное вмешательство. LoopOrb инициирует emergency DAO-голосование по спасению.",
    author: "Казгидромет / LoopOrb",
    date: "6 часов назад",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800",
    likes: 1234,
    comments: 456,
    tags: ["Казахстан", "Балхаш", "кризис", "экология"],
  },
  {
    id: "rn3",
    type: "success",
    scope: "central-asia",
    region: "Центральная Азия",
    country: "Кыргызстан",
    title: "Иссык-Куль: рекордная чистота воды за 20 лет",
    summary: "Международная экспертиза GWC (Global Water Certification) подтвердила: качество воды достигло категории GWC-1 (питьевая без обработки). Успех — результат 5-летней программы защиты водосборного бассейна.",
    author: "Госэкотехинспекция КР",
    date: "Вчера",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
    likes: 2156,
    comments: 234,
    tags: ["Кыргызстан", "Иссык-Куль", "GWC", "успех"],
  },
  {
    id: "rn4",
    type: "project",
    scope: "europe",
    region: "Европа",
    country: "Нидерланды",
    title: "Амстердам Smart Water 2.0: AI предсказал и предотвратил 12 утечек",
    summary: "Нейросеть анализирует 50,000+ IoT-датчиков в реальном времени. Система предсказывает прорывы труб за 48 часов до происшествия. Экономия: €2.3M в первый месяц работы.",
    author: "Amsterdam Smart City",
    date: "5 часов назад",
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a2?w=800",
    likes: 1567,
    comments: 189,
    tags: ["Нидерланды", "умный город", "AI", "IoT"],
  },
  {
    id: "rn5",
    type: "project",
    scope: "africa",
    region: "Африка",
    country: "Кения",
    title: "Solar Water Kenya: 100,000 человек получили доступ к чистой воде",
    summary: "Проект солнечных насосов Всемирного банка достиг цели за 8 месяцев вместо 2 лет. Средства собраны через LoopOrb ProjectHub. Новая цель: 500,000 человек к концу 2026.",
    author: "World Bank Africa / LoopOrb",
    date: "1 день назад",
    image: "https://images.unsplash.com/photo-1537655780520-1e392ef81e87?w=800",
    likes: 2892,
    comments: 345,
    tags: ["Кения", "Всемирный банк", "солнечная энергия", "вода"],
  },
  {
    id: "rn6",
    type: "alert",
    scope: "americas",
    region: "Северная Америка",
    country: "США",
    title: "Калифорния объявляет чрезвычайное положение: водохранилища на 23%",
    summary: "Третий год рекордной засухи. Запрещён полив газонов в 15 округах. Штрафы до $10,000 за превышение лимитов. Проект 'Water from Air' получил ускоренное финансирование.",
    author: "CA Water Resources",
    date: "12 часов назад",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    likes: 2123,
    comments: 567,
    tags: ["США", "Калифорния", "засуха", "кризис"],
  },
  {
    id: "rn7",
    type: "success",
    scope: "asia",
    region: "Азия",
    country: "Сингапур",
    title: "NEWater 4.0: 60% воды Сингапура — переработанная",
    summary: "Национальный проект достиг рекордных показателей. Технология мембранной фильтрации позволяет перерабатывать сточные воды в питьевые за 4 часа. Модель для засушливых стран мира.",
    author: "PUB Singapore",
    date: "2 дня назад",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
    likes: 1876,
    comments: 234,
    tags: ["Сингапур", "переработка", "инновации", "модель"],
  },
  {
    id: "rn8",
    type: "project",
    scope: "asia",
    region: "Азия",
    country: "Индия",
    title: "Проект 'Чистый Ганг' достиг 75% очистки участка Варанаси-Канпур",
    summary: "$3.2B инвестиций, 15 новых очистных сооружений. Уровень загрязнения снизился на 68%. Река снова пригодна для ритуального купания. Следующий этап — расширение до всего бассейна.",
    author: "National Mission for Clean Ganga",
    date: "3 дня назад",
    image: "https://images.unsplash.com/photo-1561361058-4b0475f4f42c?w=800",
    likes: 3456,
    comments: 456,
    tags: ["Индия", "Ганг", "очистка", "успех"],
  },
  {
    id: "rn9",
    type: "research",
    scope: "europe",
    region: "Европа",
    country: "Швейцария",
    title: "Женевское озеро: микропластик обнаружен в 100% проб воды",
    summary: "Исследование EPFL шокировало: даже в 'чистых' альпийских озёрах невозможно избежать загрязнения. Концентрация ниже опасного уровня, но тренд тревожный. Призыв к запрету одноразового пластика.",
    author: "EPFL Switzerland",
    date: "4 дня назад",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    likes: 2234,
    comments: 567,
    tags: ["Швейцария", "микропластик", "исследование", "экология"],
  },
  {
    id: "rn10",
    type: "alert",
    scope: "africa",
    region: "Африка",
    country: "Египет",
    title: "Нил: угроза водных войн между Египтом, Эфиопией и Суданом",
    summary: "Дамба GER на Голубом Ниле достигла критической фазы заполнения. Египет угрожает военными действиями. ООН призывает к срочным переговорам. LoopOrb предлагает нейтральную платформу мониторинга.",
    author: "UN Water / Reuters",
    date: "5 часов назад",
    image: "https://images.unsplash.com/photo-1539650116455-25167a0f8730?w=800",
    likes: 4567,
    comments: 1234,
    tags: ["Нил", "Египет", "конфликт", "геополитика"],
  },
];

// 📢 Обновления платформы LoopOrb - февраль 2026
const platformUpdates = [
  {
    id: "pu1",
    type: "milestone",
    title: "🎉 50,000 пользователей! LoopOrb растёт экспоненциально",
    summary: "За месяц с 15K до 50K участников из 78 стран. Средний рост +2,500 пользователей в день. Спасибо каждому, кто присоединился к экосистеме!",
    date: "2 часа назад",
    likes: 5678,
    comments: 892,
    icon: Award,
  },
  {
    id: "pu2",
    type: "update",
    title: "Новая фича: Water Scout AI — анализ качества воды по фото",
    summary: "Загрузите фото водоёма — нейросеть оценит прозрачность, цвет, наличие водорослей и даст предварительную оценку качества. Точность 87%. Доступно в мобильном приложении.",
    date: "Вчера",
    likes: 3456,
    comments: 456,
    icon: Zap,
  },
  {
    id: "pu3",
    type: "project",
    title: "Спасение Аральского моря: запущено голосование DAO",
    summary: "Крупнейший проект в истории LoopOrb. $120M на комплексное восстановление северной части Арала. Включает: лесопосадки, каналы, биополигоны. Ваш голос решает!",
    date: "2 дня назад",
    likes: 8902,
    comments: 1234,
    icon: Droplets,
  },
  {
    id: "pu4",
    type: "update",
    title: "Программа Ambassador: уже 200 представителей в 50+ странах",
    summary: "Станьте лидером в вашем регионе! Амбассадоры получают эксклюзивный доступ, награды ORB и возможность организовывать локальные проекты. Приём заявок открыт.",
    date: "3 дня назад",
    likes: 2234,
    comments: 345,
    icon: Users,
  },
  {
    id: "pu5",
    type: "milestone",
    title: "Proof-of-Water: эмитировано 2,000,000 ORB за реальные действия",
    summary: "Наши участники верифицировали 500,000 м³ воды, добавили 12,000 объектов, выполнили 45,000 миссий. Каждый ORB подкреплён реальным вкладом в сохранение воды!",
    date: "5 дней назад",
    likes: 4567,
    comments: 678,
    icon: Leaf,
  },
  {
    id: "pu6",
    type: "update",
    title: "ProjectHub v2.0: новый интерфейс и ESG-скоринг",
    summary: "Полностью переработанная платформа инвестиций. Новые фильтры, расширенная аналитика проектов, автоматический расчёт ESG-рейтинга. Уже 8 проектов собрали $2.3M через LoopOrb.",
    date: "1 неделю назад",
    likes: 3123,
    comments: 234,
    icon: TrendingUp,
  },
];

const filterOptions = [
  { id: "all", label: "Всё", icon: Globe },
  { id: "global", label: "Мировые новости", icon: Globe },
  { id: "regional", label: "Региональные", icon: MapPin },
  { id: "platform", label: "Платформа", icon: TrendingUp },
];

const regionFilters = [
  { id: "all", label: "Все регионы" },
  { id: "central-asia", label: "Центральная Азия" },
  { id: "europe", label: "Европа" },
  { id: "asia", label: "Азия" },
  { id: "africa", label: "Африка" },
  { id: "americas", label: "Америка" },
];

const typeIcons: Record<string, any> = {
  news: Globe,
  project: TrendingUp,
  research: Droplets,
  alert: AlertTriangle,
  success: CheckCircle,
  update: Clock,
  milestone: Award,
};

const typeColors: Record<string, string> = {
  news: "bg-blue-500/20 text-blue-400",
  project: "bg-green-500/20 text-green-400",
  research: "bg-purple-500/20 text-purple-400",
  alert: "bg-red-500/20 text-red-400",
  success: "bg-cyan-500/20 text-cyan-400",
  update: "bg-yellow-500/20 text-yellow-400",
  milestone: "bg-orange-500/20 text-orange-400",
};

function NewsCard({ item, index }: { item: any; index: number }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const ItemIcon = item.icon || typeIcons[item.type] || Globe;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${typeColors[item.type]} flex items-center justify-center`}>
            <ItemIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{item.source || item.author || "LoopOrb"}</span>
              {item.scope === "global" && (
                <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                  Global
                </span>
              )}
              {item.region && (
                <span className="px-2 py-0.5 bg-white/10 text-water-200/70 text-xs rounded-full">
                  {item.region}
                </span>
              )}
            </div>
            <div className="text-sm text-water-200/50">{item.date}</div>
          </div>
        </div>
        <button className="text-water-200/50 hover:text-white">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <h3 className="text-lg font-semibold text-white mb-2 hover:text-water-400 transition cursor-pointer">
          {item.title}
        </h3>
        <p className="text-water-200/70 text-sm line-clamp-3">{item.summary}</p>
      </div>

      {/* Image */}
      {item.image && (
        <div className="relative h-48 sm:h-64">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 to-transparent" />
        </div>
      )}

      {/* Tags */}
      {item.tags && (
        <div className="px-4 py-3 flex flex-wrap gap-2">
          {item.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/5 hover:bg-white/10 text-water-200/70 text-xs rounded-full cursor-pointer transition"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 transition ${
              liked ? "text-red-400" : "text-water-200/50 hover:text-red-400"
            }`}
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
            <span className="text-sm">{item.likes + (liked ? 1 : 0)}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-water-200/50 hover:text-water-400 transition"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm">{item.comments}</span>
          </button>
          <button className="flex items-center gap-1.5 text-water-200/50 hover:text-water-400 transition">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`transition ${bookmarked ? "text-water-400" : "text-water-200/50 hover:text-water-400"}`}
        >
          <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10 overflow-hidden"
          >
            <div className="p-4 space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-water-500/20 flex items-center justify-center text-water-400 text-sm font-medium">
                  АК
                </div>
                <div className="flex-1">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white text-sm">Алексей К.</span>
                      <span className="text-xs text-water-200/50">2 часа назад</span>
                    </div>
                    <p className="text-sm text-water-200/70">Отличная новость! Надеюсь, это поможет решить проблему.</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm font-medium">
                  МР
                </div>
                <div className="flex-1">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white text-sm">Мария Р.</span>
                      <span className="text-xs text-water-200/50">1 час назад</span>
                    </div>
                    <p className="text-sm text-water-200/70">Нужно больше таких проектов!</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-water-500/20 flex items-center justify-center text-water-400 text-sm font-medium">
                  You
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Написать комментарий..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-water-500 transition"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeRegion, setActiveRegion] = useState("all");
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Combine all news
  const allNews = [...worldNews, ...regionalNews, ...platformUpdates];
  
  // Filter logic
  let filteredNews = allNews;
  if (activeFilter === "global") {
    filteredNews = worldNews;
  } else if (activeFilter === "regional") {
    filteredNews = regionalNews;
  } else if (activeFilter === "platform") {
    filteredNews = platformUpdates;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Новости</h1>
                <p className="text-water-200/70">
                  Актуальные новости о водных ресурсах мира и платформы
                </p>
              </div>
              <button
                onClick={() => setShowCreatePost(true)}
                className="btn-primary hidden sm:flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                Создать пост
              </button>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-2 mb-6 overflow-x-auto"
          >
            <div className="flex gap-2 min-w-max">
              {filterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                    activeFilter === filter.id
                      ? "bg-water-500/20 text-water-400"
                      : "text-water-200/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <filter.icon className="w-4 h-4" />
                  {filter.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Region Filter (for regional tab) */}
          {activeFilter === "regional" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6"
            >
              <div className="flex flex-wrap gap-2">
                {regionFilters.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setActiveRegion(region.id)}
                    className={`px-3 py-1.5 rounded-full text-sm transition ${
                      activeRegion === region.id
                        ? "bg-water-500 text-white"
                        : "bg-white/5 text-water-200/70 hover:bg-white/10"
                    }`}
                  >
                    {region.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Mobile Create Post Button */}
          <div className="sm:hidden mb-4">
            <button
              onClick={() => setShowCreatePost(true)}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              Создать пост
            </button>
          </div>

          {/* Create Post Modal */}
          <AnimatePresence>
            {showCreatePost && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setShowCreatePost(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="glass-card w-full max-w-lg p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-semibold text-white mb-4">Создать пост</h3>
                  <textarea
                    placeholder="Что нового в мире водных ресурсов?"
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-water-500 transition mb-4"
                  />
                  <div className="flex items-center gap-3 mb-4">
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-water-200/70 transition">
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-water-200/70 transition">
                      <MapPin className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-water-200/70 transition">
                      <Globe className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowCreatePost(false)}
                      className="btn-secondary"
                    >
                      Отмена
                    </button>
                    <button className="btn-primary">Опубликовать</button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* News Feed */}
          <div className="space-y-4">
            {filteredNews.map((item, index) => (
              <NewsCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-8 text-center">
            <button className="btn-secondary flex items-center gap-2 mx-auto">
              Загрузить ещё
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
