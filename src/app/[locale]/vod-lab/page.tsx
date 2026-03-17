"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Microscope,
  Cpu,
  Wifi,
  Shield,
  CheckCircle2,
  Zap,
  Globe,
  ArrowRight,
  Download,
  ExternalLink,
  Beaker,
  Database,
  Lock,
  Award,
  Smartphone,
  Activity,
  Droplets,
  Thermometer,
  TestTube,
  FlaskConical,
  Radio,
  Wind,
  Eye,
  Heart,
  Users,
  MessageCircle,
  Share2,
  Mail,
  Star,
  TrendingUp,
  Calculator,
  Settings,
  Video,
  BookOpen,
  HelpCircle,
  Wrench,
  ChevronRight,
  ChevronLeft,
  X,
  Plus,
  Minus,
  ShoppingCart,
  Heart as HeartIcon,
  Filter,
  Sliders,
  Info,
  Play,
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  Percent,
  BarChart3,
  PieChart,
  LineChart,
  Package,
  Truck,
  CreditCard,
  Phone,
  MessageSquare,
  Send,
  ThumbsUp,
  Flag,
  MoreHorizontal,
  Copy,
  Link as LinkIcon,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Menu,
} from "lucide-react";
import Link from "next/link";

// ============================================================================
// ДАННЫЕ УСТРОЙСТВ ИЗ LITEPAPER
// ============================================================================

interface DeviceSpec {
  label: string;
  value: string;
  category: "physical" | "chemical" | "micro" | "organic" | "radio" | "ai";
}

interface Device {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  description: string;
  parameters: string;
  samplesPerDay: string;
  accuracy: string;
  deployment: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  category: "lab" | "portable" | "sensor" | "app";
  specs: DeviceSpec[];
  sensors: string[];
  ai: string[];
  useCases: string[];
  dimensions: string;
  weight: string;
  power: string;
  connectivity: string[];
  protection: string;
  tempRange: string;
  warranty: string;
  delivery: string;
}

const devices: Device[] = [
  {
    id: "vod-lab-pro",
    name: "VOD-Lab Pro",
    price: 13400,
    priceFormatted: "$13,400",
    description: "Профессиональная распределённая лаборатория для стационарного мониторинга с максимальной точностью и Edge AI верификацией",
    parameters: "100+",
    samplesPerDay: "500 образцов/день",
    accuracy: "±0.1% для pH, ±0.01 NTU",
    deployment: "Station-based",
    image: "pro",
    rating: 4.9,
    reviews: 127,
    inStock: true,
    category: "lab",
    specs: [
      { label: "Параметры", value: "100+ показателей", category: "chemical" },
      { label: "Точность pH", value: "±0.01", category: "physical" },
      { label: "Точность турбидиметра", value: "±0.01 NTU", category: "physical" },
      { label: "Производительность", value: "500 образцов/день", category: "physical" },
      { label: "Автоматизация", value: "Полная (24/7)", category: "ai" },
      { label: "Спектрофотометр", value: "UV-Vis-NIR (190-2500 нм)", category: "chemical" },
      { label: "Флуориметр", value: "220-900 нм (Ex/Em)", category: "chemical" },
      { label: "Потоковый цитометр", value: "Для микробиологии", category: "micro" },
      { label: "Радиометр", value: "α, β, γ-излучение", category: "radio" },
      { label: "ИК-спектрометр", value: "2.5-14 мкм", category: "organic" },
      { label: "Связь", value: "5G, LoRaWAN, Satellite", category: "ai" },
      { label: "Защита", value: "IP68, -40°C до +60°C", category: "physical" },
      { label: "Калибровка", value: "Автоматическая (AI)", category: "ai" },
      { label: "Энергопотребление", value: "150W среднее", category: "physical" },
    ],
    sensors: [
      "Спектрофотометр (UV-Vis-NIR, 190-2500 нм)",
      "Электрохимические сенсоры (pH, ORP, EC, ISE)",
      "Турбидиметр лазерный (0-1000 NTU)",
      "Флуориметр (algae, бактерии, органика)",
      "Газовые сенсоры (CO2, H2S, CH4, O2)",
      "Тяжёлые металлы (ASV, ICP-MS подготовка)",
      "Микробиология (PCR-ready, потоковая цитометрия)",
      "Радиометр (α, β, γ-активность)",
      "ИК-спектрометр (нефтепродукты, органика)",
      "Потоковый цитометр (общее микробное число)",
    ],
    ai: [
      "Edge AI чип NVIDIA Jetson AGX Xavier (32 TOPS)",
      "Верификация данных на месте (HSM secp256k1)",
      "Автоматическая диагностика и предиктивное обслуживание",
      "AI-анализ аномалий (градиент, корреляция, спутник)",
      "Автоматическая калибровка по эталонным образцам NIST",
      "Анонимизация данных (MPC для чувствительных)",
      "Автономное обновление через мультиподпись DAO",
    ],
    useCases: [
      "Городские системы водоснабжения (непрерывный мониторинг)",
      "Промышленные стоки (автоматический контроль сбросов)",
      "Очистные сооружения (вход/выход контроль)",
      "Трансграничные реки (межгосударственный мониторинг)",
      "Водохранилища и резервуары (стратегические запасы)",
      "Научные исследования (эталонные данные)",
    ],
    dimensions: "60×40×30 см",
    weight: "25 кг",
    power: "Солнечная панель 200W + LiFePO4 4 кВт·ч (3 дня автономии)",
    connectivity: ["LoRaWAN", "Starlink", "4G/5G", "Оптоволокно", "Mesh WiFi"],
    protection: "IP68, IK10, нержавеющая сталь 316L",
    tempRange: "-40°C до +60°C",
    warranty: "5 лет гарантия, 10 лет срок службы",
    delivery: "4-6 недель",
  },
  {
    id: "vod-lab-node",
    name: "VOD-Lab Node",
    price: 8900,
    priceFormatted: "$8,900",
    description: "Портативная нода для мобильного мониторинга и быстрого развёртывания с Cloud AI верификацией",
    parameters: "50",
    samplesPerDay: "200 образцов/день",
    accuracy: "±0.5% для pH, ±0.1 NTU",
    deployment: "Portable/Mobile",
    image: "node",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    category: "portable",
    specs: [
      { label: "Параметры", value: "50 ключевых показателей", category: "chemical" },
      { label: "Точность pH", value: "±0.05", category: "physical" },
      { label: "Точность турбидиметра", value: "±0.1 NTU", category: "physical" },
      { label: "Производительность", value: "200 образцов/день", category: "physical" },
      { label: "Автоматизация", value: "Полуавтоматическая", category: "ai" },
      { label: "Спектрофотометр", value: "UV-Vis (190-1100 нм)", category: "chemical" },
      { label: "Мультиспектральный анализ", value: "12 каналов", category: "chemical" },
      { label: "Связь", value: "4G/5G, WiFi, Bluetooth", category: "ai" },
      { label: "Защита", value: "IP65, -20°C до +50°C", category: "physical" },
      { label: "Калибровка", value: "Картриджная система", category: "ai" },
      { label: "Энергопотребление", value: "50W среднее", category: "physical" },
    ],
    sensors: [
      "Мультиспектральный анализатор (UV-Vis, 12 каналов)",
      "pH/EC/Temp комбинированный сенсор",
      "Турбидиметр оптический (0-4000 NTU)",
      "Растворённый кислород (оптический, люминесцентный)",
      "Органические соединения (TOC, УФ-окисление)",
      "Нитраты/фосфаты (фотометрия, молибденовая реакция)",
      "Ион-селективные электроды (NH4+, NO3-, F-)",
      "Иммунофлуоресцентный детектор (E.coli, колиформы)",
    ],
    ai: [
      "ARM Cortex-A78 процессор (8 ядер)",
      "Cloud AI верификация (сравнение с сетью)",
      "GPS/GLONASS тегирование (точность 0.5 м)",
      "Offline режим работы (до 72 часов)",
      "Мгновенные результаты (1-5 минут)",
      "Автоматическая генерация отчётов",
    ],
    useCases: [
      "Экологические инспекции (выездные проверки)",
      "Мобильные лаборатории (экспедиции)",
      "Быстрое развёртывание в ЧС",
      "Образовательные учреждения (обучение)",
      "Фермерские хозяйства (контроль орошения)",
      "Горнодобывающие компании (мониторинг сбросов)",
    ],
    dimensions: "35×25×20 см",
    weight: "8 кг",
    power: "AC 220V + встроенный аккумулятор 24V/10Ah (8 часов)",
    connectivity: ["4G/5G", "WiFi 6", "Bluetooth 5.0", "USB-C"],
    protection: "IP65, ударопрочный корпус",
    tempRange: "-20°C до +50°C",
    warranty: "3 года гарантия, 7 лет срок службы",
    delivery: "2-4 недели",
  },
  {
    id: "vod-lab-mini",
    name: "VOD-Lab Mini",
    price: 4500,
    priceFormatted: "$4,500",
    description: "Компактная система для базового мониторинга с ключевыми параметрами и автоматической передачей данных",
    parameters: "25",
    samplesPerDay: "50 образцов/день",
    accuracy: "±1% для pH, ±0.5 NTU",
    deployment: "Compact Station",
    image: "mini",
    rating: 4.5,
    reviews: 156,
    inStock: true,
    category: "lab",
    specs: [
      { label: "Параметры", value: "25 базовых показателей", category: "chemical" },
      { label: "Точность pH", value: "±0.1", category: "physical" },
      { label: "Точность турбидиметра", value: "±0.5 NTU", category: "physical" },
      { label: "Производительность", value: "50 образцов/день", category: "physical" },
      { label: "Автоматизация", value: "Автоматическая", category: "ai" },
      { label: "Фотометр", value: "Vis (400-700 нм, 8 каналов)", category: "chemical" },
      { label: "Связь", value: "4G, WiFi, LoRaWAN", category: "ai" },
      { label: "Защита", value: "IP66, -10°C до +45°C", category: "physical" },
      { label: "Калибровка", value: "Автоматическая (раз в неделю)", category: "ai" },
      { label: "Энергопотребление", value: "25W среднее", category: "physical" },
    ],
    sensors: [
      "Многоканальный фотометр (8 длин волн)",
      "Комбинированный pH/EC/Temp сенсор",
      "Турбидиметр (0-1000 NTU)",
      "Растворённый кислород (гальванический)",
      "ОВП (окислительно-восстановительный потенциал)",
      "Хлор свободный/общий (амперометрический)",
      "Нитраты/нитриты/фосфаты (фотометрия)",
      "Аммоний (ион-селективный электрод)",
    ],
    ai: [
      "ESP32-S3 микроконтроллер (AI-ускоритель)",
      "Cloud верификация (сравнение с соседними узлами)",
      "Автоматическая калибровка (раз в неделю)",
      "Предиктивная диагностика (уведомления)",
      "Автоматическая передача данных в блокчейн",
    ],
    useCases: [
      "Малые населённые пункты (контроль водопровода)",
      "Бассейны и аквапарки (контроль качества)",
      "Рыбоводческие хозяйства (аквакультура)",
      "Школы и университеты (образование)",
      "Гостиницы и курорты (контроль воды)",
      "Пищевые производства (входной контроль)",
    ],
    dimensions: "25×20×15 см",
    weight: "4 кг",
    power: "AC 220V + солнечная панель 50W (опционально)",
    connectivity: ["4G", "WiFi", "LoRaWAN", "Ethernet"],
    protection: "IP66, поликарбонатный корпус",
    tempRange: "-10°C до +45°C",
    warranty: "2 года гарантия, 5 лет срок службы",
    delivery: "1-2 недели",
  },
  {
    id: "smart-sensor",
    name: "Smart Sensor",
    price: 299,
    priceFormatted: "$299",
    description: "Персональный сенсор для непрерывного мониторинга с передачей данных в реальном времени и интеграцией в сеть VODeco",
    parameters: "10",
    samplesPerDay: "Real-time (каждые 5 мин)",
    accuracy: "±2% для pH, ±1 NTU",
    deployment: "Personal/Consumer",
    image: "sensor",
    rating: 4.3,
    reviews: 423,
    inStock: true,
    category: "sensor",
    specs: [
      { label: "Параметры", value: "10 базовых показателей", category: "physical" },
      { label: "Точность pH", value: "±0.2", category: "physical" },
      { label: "Точность турбидиметра", value: "±1 NTU", category: "physical" },
      { label: "Частота замеров", value: "Каждые 5 минут", category: "ai" },
      { label: "Автономность", value: "До 6 месяцев", category: "physical" },
      { label: "Связь", value: "Bluetooth + LoRaWAN", category: "ai" },
      { label: "Защита", value: "IP68, погружение до 10 м", category: "physical" },
      { label: "Калибровка", value: "Раз в 3 месяца", category: "ai" },
    ],
    sensors: [
      "pH (стеклянный электрод ISFET)",
      "Температура (термистор PT1000, ±0.1°C)",
      "Электропроводность (0-100 мСм/см)",
      "Мутность (оптическое рассеяние 90°)",
      "Растворённый кислород (оптический)",
      "ОВП (платиновый электрод)",
      "Солёность (расчётная)",
      "TDS (общее солесодержание)",
      "Уровень воды (давление)",
      "GPS координаты (при синхронизации)",
    ],
    ai: [
      "Bluetooth 5.0 + LoRaWAN (дальность до 10 км)",
      "Интеграция с VOD Check (мобильное приложение)",
      "Автоматическая передача в сеть VODeco",
      "Уведомления при выходе за пределы нормы",
      "История данных в облаке (бесплатно 1 год)",
    ],
    useCases: [
      "Домашние колодцы и скважины",
      "Аквариумы и пруды",
      "Личные участки (полив, бассейн)",
      "Образовательные проекты (школы)",
      "Гражданская наука (волонтёрский мониторинг)",
      "Рыбалка и отдых (выбор мест)",
    ],
    dimensions: "8×8×15 см",
    weight: "0.5 кг",
    power: "Батарея CR2032 (6 месяцев) + солнечная панель (опционально)",
    connectivity: ["Bluetooth 5.0", "LoRaWAN", "NFC (для настройки)"],
    protection: "IP68, погружение до 10 м",
    tempRange: "0°C до +50°C",
    warranty: "1 год гарантия, 3 года срок службы",
    delivery: "В наличии",
  },
  {
    id: "water-expeditor",
    name: "Water Expeditor",
    price: 18000,
    priceFormatted: "$18,000",
    description: "Портативный полевой анализатор в защищённом кейсе — лаборатория в чемодане для экспедиций и инспекций",
    parameters: "50+",
    samplesPerDay: "100 образцов/день (полевых)",
    accuracy: "Лабораторная точность",
    deployment: "Field Expedition",
    image: "expeditor",
    rating: 4.8,
    reviews: 67,
    inStock: true,
    category: "portable",
    specs: [
      { label: "Параметры", value: "50+ показателей", category: "chemical" },
      { label: "Спектрофотометр", value: "UV-Vis-NIR (190-2500 нм)", category: "chemical" },
      { label: "Микробиология", value: "Автоматическая культивация (8 образцов)", category: "micro" },
      { label: "Быстрые тесты", value: "Результат за 5-15 минут", category: "chemical" },
      { label: "Автономность", value: "8 часов работы", category: "physical" },
      { label: "Вес комплекта", value: "12 кг", category: "physical" },
      { label: "Защита", value: "Pelican Case, IP67", category: "physical" },
    ],
    sensors: [
      "Портативный спектрофотометр (UV-Vis-NIR, 190-2500 нм, 3.2 кг)",
      "Автоматический микробиологический анализатор (флуоресценция, 4-18 часов)",
      "Набор быстрых тест-полосок (10 параметров, 5-15 минут)",
      "Цифровой фотометр для считывания (смартфон + адаптер)",
      "Химические тесты (pH, твёрдость, хлор, железо)",
      "Погружной насос (0-30 м)",
      "Пробоотборники стерильные (различные объёмы)",
      "Фильтры, реагенты, расходники на 100 анализов",
    ],
    ai: [
      "Защищённый планшет (IP67, -20°C до +60°C, 1.2 кг)",
      "GPS/ГЛОНАСС/BeiDou (точность 0.5 м)",
      "Связь: спутниковый терминал (Iridium), 4G, WiFi",
      "ПО: VOD Check Pro (офлайн-режим, синхронизация)",
      "HSM-модуль для подписи данных",
      "Опционально: дрон для пробоотбора (2 кг полезной нагрузки, 5 км)",
    ],
    useCases: [
      "Экологические инспекции (государственные)",
      "Научные экспедиции (полевые исследования)",
      "НКО (мониторинг рек, озёр)",
      "Страховые компании (оценка рисков)",
      "Горнодобывающие компании (контроль сбросов)",
      "ЧС и катастрофы (быстрая оценка)",
    ],
    dimensions: "50×40×25 см (кейс)",
    weight: "12 кг (полный комплект)",
    power: "Встроенный аккумулятор 24V/10Ah (8 часов) + автомобильный адаптер 12V",
    connectivity: ["Iridium (спутник)", "4G/5G", "WiFi", "Bluetooth", "USB-C"],
    protection: "Pelican Case, IP67, ударопрочный",
    tempRange: "-20°C до +60°C",
    warranty: "3 года гарантия",
    delivery: "4-6 недель",
  },
  {
    id: "vod-check",
    name: "VOD Check",
    price: 0,
    priceFormatted: "Free",
    description: "Мобильное приложение для граждан — проверяй воду, зарабатывай VODcredit, участвуй в голосованиях DAO",
    parameters: "15 (с тест-наборами)",
    samplesPerDay: "Неограниченно",
    accuracy: "Зависит от тест-наборов",
    deployment: "Mobile App",
    image: "app",
    rating: 4.6,
    reviews: 2847,
    inStock: true,
    category: "app",
    specs: [
      { label: "Параметры", value: "15 с тест-наборами", category: "chemical" },
      { label: "Платформы", value: "iOS, Android", category: "ai" },
      { label: "Языки", value: "20+ языков", category: "ai" },
      { label: "Награды", value: "VODcredit за данные", category: "ai" },
      { label: "Интеграция", value: "Smart Sensor, VOD-Lab", category: "ai" },
    ],
    sensors: [
      "Камера смартфона (анализ тест-полосок)",
      "GPS (геолокация замеров)",
      "Bluetooth (подключение Smart Sensor)",
      "Акселерометр (контроль качества фото)",
      "NFC (считывание тест-наборов)",
    ],
    ai: [
      "AI распознавание тест-полосок (точность 95%)",
      "AI анализ фото воды (мутность, цвет, запах)",
      "Автоматическая верификация данных (репутация)",
      "Геймификация (ачивки, рейтинги, NFT)",
      "Социальные функции (соседская сеть, петиции)",
      "Доступ к карте качества воды (все источники)",
      "Голосование в DAO (L4 решения)",
    ],
    useCases: [
      "Проверка воды из крана (ежедневно)",
      "Контроль колодцев и скважин",
      "Отдых на водоёмах (безопасность)",
      "Экологический активизм (петиции)",
      "Образование (курсы, квесты)",
      "Заработок VODcredit (продажа данных)",
    ],
    dimensions: "Мобильное приложение",
    weight: "Зависит от устройства",
    power: "Заряд устройства",
    connectivity: ["4G/5G", "WiFi", "Bluetooth", "GPS"],
    protection: "Зависит от устройства",
    tempRange: "Зависит от устройства",
    warranty: "Бесплатно",
    delivery: "Мгновенная загрузка",
  },
];

// ============================================================================
// ДАННЫЕ ДЛЯ СРАВНЕНИЯ
// ============================================================================

const comparisonFeatures = [
  { feature: "Параметры", pro: "100+", node: "50", mini: "25", sensor: "10" },
  { feature: "Точность pH", pro: "±0.01", node: "±0.05", mini: "±0.1", sensor: "±0.2" },
  { feature: "Турбидиметр", pro: "Лазерный ±0.01 NTU", node: "Оптический ±0.1 NTU", mini: "Оптический ±0.5 NTU", sensor: "Оптический ±1 NTU" },
  { feature: "Производительность", pro: "500/день", node: "200/день", mini: "50/день", sensor: "Real-time" },
  { feature: "Автоматизация", pro: "Полная 24/7", node: "Полуавтомат", mini: "Автомат", sensor: "Автономный" },
  { feature: "Спектрофотометр", pro: "UV-Vis-NIR", node: "UV-Vis", mini: "Vis 8 каналов", sensor: "—" },
  { feature: "Edge AI", pro: "NVIDIA Jetson 32 TOPS", node: "ARM Cortex-A78", mini: "ESP32-S3", sensor: "—" },
  { feature: "Связь", pro: "5G+Satellite", node: "4G/5G+WiFi", mini: "4G+LoRaWAN", sensor: "BT+LoRaWAN" },
  { feature: "Защита", pro: "IP68", node: "IP65", mini: "IP66", sensor: "IP68" },
  { feature: "Температура", pro: "-40°C..+60°C", node: "-20°C..+50°C", mini: "-10°C..+45°C", sensor: "0°C..+50°C" },
  { feature: "Вес", pro: "25 кг", node: "8 кг", mini: "4 кг", sensor: "0.5 кг" },
  { feature: "Питание", pro: "Солнце 200W", node: "AC+батарея", mini: "AC+солнце", sensor: "Батарея" },
  { feature: "Цена", pro: "$13,400", node: "$8,900", mini: "$4,500", sensor: "$299" },
];

// ============================================================================
// ОТЗЫВЫ
// ============================================================================

interface Review {
  id: number;
  author: string;
  role: string;
  device: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
  avatar: string;
}

const reviews: Review[] = [
  {
    id: 1,
    author: "Д-р Алексей Петров",
    role: "Гидрохимик, МГУ",
    device: "VOD-Lab Pro",
    rating: 5,
    date: "15 февраля 2025",
    text: "Используем VOD-Lab Pro для мониторинга Москвы-реки. Точность сопоставима с лабораторными анализами, но данные в реальном времени. Edge AI отлично справляется с верификацией. За 6 месяцев работы — ни одного ложного срабатывания.",
    helpful: 47,
    avatar: "АП",
  },
  {
    id: 2,
    author: "Мария Иванова",
    role: "Экологический инспектор",
    device: "VOD-Lab Node",
    rating: 5,
    date: "3 марта 2025",
    text: "Node — идеальный инструмент для выездных проверок. Разворачиваем за 15 минут, получаем результаты через 5 минут. GPS-тегирование и автоматическая выгрузка в блокчейн — незаменимо для официальных отчётов.",
    helpful: 32,
    avatar: "МИ",
  },
  {
    id: 3,
    author: "Фермерское хозяйство «Зелёная долина»",
    role: "Агропредприятие",
    device: "VOD-Lab Mini",
    rating: 4,
    date: "20 января 2025",
    text: "Mini контролирует воду для орошения 24/7. Автоматические уведомления о превышении нитратов спасли урожай дважды. Хотелось бы больше параметров для почвы, но для воды — отлично.",
    helpful: 28,
    avatar: "ФЗ",
  },
  {
    id: 4,
    author: "Дмитрий Соколов",
    role: "Владелец частного колодца",
    device: "Smart Sensor",
    rating: 5,
    date: "10 февраля 2025",
    text: "Установил Smart Sensor в колодец 3 месяца назад. Теперь вижу качество воды в приложении. Когда после дождей вода ухудшалась — получил уведомление. За свои $299 — лучшая инвестиция в здоровье семьи.",
    helpful: 89,
    avatar: "ДС",
  },
  {
    id: 5,
    author: "Экспедиция «Чистая Волга»",
    role: "Научно-исследовательская группа",
    device: "Water Expeditor",
    rating: 5,
    date: "5 марта 2025",
    text: "Прошли 3000 км по Волге с Water Expeditor. Лаборатория в чемодане — не метафора. Микробиологию определяли прямо на берегу, спектрофотометр работал без нареканий. Спутниковая связь — спасение в глуши.",
    helpful: 56,
    avatar: "ЭЧ",
  },
  {
    id: 6,
    author: "Елена Козлова",
    role: "Эко-активистка",
    device: "VOD Check",
    rating: 5,
    date: "28 февраля 2025",
    text: "VOD Check изменил моё понимание экологии. Загружаю замеры воды из парка — получаю VODcredit. Накопила уже 500 монет, обменяла на тест-наборы. Соседская сеть показала, что у 30% жителей района вода с превышением железа. Вместе добились проверки водоканала!",
    helpful: 124,
    avatar: "ЕК",
  },
];

// ============================================================================
// FAQ
// ============================================================================

const faqs = [
  {
    question: "Как часто нужна калибровка устройств?",
    answer: "VOD-Lab Pro калибруется автоматически раз в сутки по эталонным образцам NIST. VOD-Lab Node и Mini — раз в неделю (автоматически). Smart Sensor — раз в 3 месяца (ручная калибровка через приложение). Water Expeditor калибруется перед каждой экспедицией.",
  },
  {
    question: "Можно ли интегрировать устройства с существующими SCADA-системами?",
    answer: "Да, все устройства VOD-Lab поддерживают Modbus TCP/RTU, OPC UA, MQTT. Предоставляем REST API и WebSocket для интеграции с любыми системами. Готовые драйверы для Siemens, Schneider Electric, Rockwell Automation.",
  },
  {
    question: "Как работает гарантия и обслуживание?",
    answer: "Гарантия: Pro/Node/Expeditor — 3-5 лет, Mini — 2 года, Smart Sensor — 1 год. Обслуживание: автоматическая диагностика, уведомления о необходимости замены картриджей/реагентов. Выезд инженера в течение 72 часов (для Pro/Node).",
  },
  {
    question: "Можно ли купить устройства в лизинг?",
    answer: "Да, предлагаем лизинг от $800/мес для VOD-Lab Pro (включая обслуживание и картриджи). Для образовательных учреждений и НКО — специальные условия (скидка до 30%).",
  },
  {
    question: "Как данные попадают в блокчейн?",
    answer: "Каждое устройство подписывает данные через HSM-модуль (ECDSA secp256k1). Данные передаются в сеть валидаторов через LoRaWAN/спутник/4G. После верификации 2/3 валидаторов данные записываются в VOD Chain (≈30 секунд).",
  },
  {
    question: "Что если устройство выйдет из строя?",
    answer: "Автоматическая диагностика предупреждает о проблемах за 24-72 часа. При критической поломке — автоматическое переключение на резервный узел (если есть в сети). Замена устройства в течение 7 дней (для Pro/Node).",
  },
  {
    question: "Можно ли использовать устройства за пределами сети VODeco?",
    answer: "Да, устройства работают автономно. Но подключение к VODeco даёт: автоматическую верификацию данных, эмиссию VOD за качественные данные, доступ к карте качества воды, участие в DAO. Без подключения — только локальные данные.",
  },
  {
    question: "Есть ли образовательные программы по работе с устройствами?",
    answer: "Да, VOD-Academy предлагает курсы: «Оператор VOD-Lab» (120 часов, $500), «Данные в водном хозяйстве» (80 часов, $300). После обучения — NFT-сертификат + VODeco токены + доступ к B2B-функциям.",
  },
];

// ============================================================================
// КОМПОНЕНТ СТРАНИЦЫ
// ============================================================================

export default function VodLabPage() {
  const [activeTab, setActiveTab] = useState<"pro" | "node">("pro");
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [roiModalOpen, setRoiModalOpen] = useState(false);
  const [configuratorOpen, setConfiguratorOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentVideo, setCurrentVideo] = useState<number>(0);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  // ROI Calculator state
  const [roiDevice, setRoiDevice] = useState("vod-lab-pro");
  const [roiWaterVolume, setRoiWaterVolume] = useState(100000);
  const [roiCurrentCost, setRoiCurrentCost] = useState(50);
  const [roiLaborCost, setRoiLaborCost] = useState(30000);

  const activeSpec = devices.find(d => d.id === `vod-lab-${activeTab}`) || devices[0];

  const toggleDeviceCompare = (deviceId: string) => {
    if (selectedDevices.includes(deviceId)) {
      setSelectedDevices(selectedDevices.filter(id => id !== deviceId));
    } else if (selectedDevices.length < 3) {
      setSelectedDevices([...selectedDevices, deviceId]);
    }
  };

  const toggleCart = (deviceId: string) => {
    if (cart.includes(deviceId)) {
      setCart(cart.filter(id => id !== deviceId));
    } else {
      setCart([...cart, deviceId]);
    }
  };

  const toggleFavorite = (deviceId: string) => {
    if (favorites.includes(deviceId)) {
      setFavorites(favorites.filter(id => id !== deviceId));
    } else {
      setFavorites([...favorites, deviceId]);
    }
  };

  const filteredDevices = devices.filter(device => {
    const matchesCategory = activeCategory === "all" || device.category === activeCategory;
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const videos = [
    { title: "VOD-Lab Pro: Обзор возможностей", duration: "12:34", views: "15K" },
    { title: "Установка и настройка VOD-Lab Node", duration: "8:45", views: "8K" },
    { title: "Smart Sensor: Личный мониторинг воды", duration: "5:20", views: "23K" },
    { title: "Water Expeditor в экспедиции", duration: "15:10", views: "6K" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8">
        {/* ============================================================================
            HERO SECTION
        ============================================================================ */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-water-500/10 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-water-500/10 text-water-400 mb-6">
                <Microscope className="w-4 h-4" />
                <span className="text-sm font-medium">VOD-Lab Hardware</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Лаборатория будущего
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-water-400 to-cyan-400">
                  для мониторинга воды
                </span>
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                Edge AI + Blockchain верификация воды в реальном времени.
                От 10 до 100+ параметров с автоматической калибровкой.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="px-8 py-4 bg-water-500 hover:bg-water-600 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  Запросить демонстрацию
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setRoiModalOpen(true)}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Калькулятор ROI
                </button>
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Litepaper (PDF)
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { value: "6", label: "Устройств в каталоге" },
                  { value: "100+", label: "Параметров анализа" },
                  { value: "5000+", label: "Узлов в сети" },
                  { value: "99.9%", label: "Точность данных" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="text-3xl font-bold text-water-400 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================================
            КАТАЛОГ УСТРОЙСТВ
        ============================================================================ */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Каталог устройств</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                От персональных сенсоров до профессиональных лабораторий — выберите решение для ваших задач
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex-1 min-w-[250px] relative">
                <input
                  type="text"
                  placeholder="Поиск устройств..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-water-500"
                />
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
              {[
                { id: "all", label: "Все" },
                { id: "lab", label: "Лаборатории" },
                { id: "portable", label: "Портативные" },
                { id: "sensor", label: "Сенсоры" },
                { id: "app", label: "Приложения" },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-water-500 text-white"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Device Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDevices.map((device, index) => (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-ocean-800 to-ocean-900 rounded-2xl border border-white/10 overflow-hidden hover:border-water-500/50 transition-all"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] bg-gradient-to-br from-water-500/10 to-cyan-500/10 flex items-center justify-center relative">
                    <div className="text-center p-6">
                      {device.image === "pro" && <Microscope className="w-24 h-24 text-water-400 mx-auto mb-4" />}
                      {device.image === "node" && <Beaker className="w-24 h-24 text-cyan-400 mx-auto mb-4" />}
                      {device.image === "mini" && <Package className="w-24 h-24 text-emerald-400 mx-auto mb-4" />}
                      {device.image === "sensor" && <Activity className="w-24 h-24 text-yellow-400 mx-auto mb-4" />}
                      {device.image === "expeditor" && <Truck className="w-24 h-24 text-orange-400 mx-auto mb-4" />}
                      {device.image === "app" && <Smartphone className="w-24 h-24 text-purple-400 mx-auto mb-4" />}
                      <h3 className="text-xl font-bold text-white mb-2">{device.name}</h3>
                      <div className="text-2xl font-bold text-water-400">{device.priceFormatted}</div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {device.inStock && (
                        <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-medium">
                          <CheckCircle2 className="w-3 h-3 inline mr-1" />
                          В наличии
                        </div>
                      )}
                      {device.rating >= 4.8 && (
                        <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-xs font-medium">
                          <Star className="w-3 h-3 inline mr-1" />
                          Выбор покупателей
                        </div>
                      )}
                    </div>

                    {/* Quick actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedDevice(device)}
                        className="p-3 bg-white/10 hover:bg-water-500 rounded-xl transition-colors"
                        title="Изучить"
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => toggleCart(device.id)}
                        className="p-3 bg-white/10 hover:bg-water-500 rounded-xl transition-colors"
                        title={cart.includes(device.id) ? "Удалить из корзины" : "В корзину"}
                      >
                        <ShoppingCart className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => toggleFavorite(device.id)}
                        className="p-3 bg-white/10 hover:bg-water-500 rounded-xl transition-colors"
                        title={favorites.includes(device.id) ? "Удалить из избранного" : "В избранное"}
                      >
                        <HeartIcon className={`w-5 h-5 text-white ${favorites.includes(device.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </button>
                      <button
                        onClick={() => setShareModalOpen(true)}
                        className="p-3 bg-white/10 hover:bg-water-500 rounded-xl transition-colors"
                        title="Поделиться"
                      >
                        <Share2 className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{device.description}</p>

                    {/* Key specs */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-sm">
                        <div className="text-slate-500">Параметры</div>
                        <div className="font-semibold text-white">{device.parameters}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-slate-500">Производительность</div>
                        <div className="font-semibold text-white">{device.samplesPerDay}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-slate-500">Точность</div>
                        <div className="font-semibold text-white">{device.accuracy}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-slate-500">Доставка</div>
                        <div className="font-semibold text-white">{device.delivery}</div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-white">{device.rating}</span>
                        <span className="text-slate-400 text-sm">({device.reviews} отзывов)</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedDevice(device)}
                        className="flex-1 px-4 py-3 bg-water-500 hover:bg-water-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        Изучить
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleDeviceCompare(device.id)}
                        className={`px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                          selectedDevices.includes(device.id)
                            ? "bg-water-500 text-white"
                            : "bg-white/5 text-slate-400 hover:bg-white/10"
                        }`}
                      >
                        <BarChart3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setInviteModalOpen(true)}
                        className="px-4 py-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl font-medium transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Compare Bar */}
            {selectedDevices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
              >
                <div className="flex items-center gap-4 px-6 py-4 bg-ocean-900 border border-water-500/30 rounded-2xl shadow-2xl">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-water-400" />
                    <span className="text-white font-medium">
                      Сравнение: {selectedDevices.length}/3
                    </span>
                  </div>
                  <div className="flex -space-x-2">
                    {selectedDevices.map(id => {
                      const d = devices.find(dev => dev.id === id);
                      return (
                        <div
                          key={id}
                          className="w-8 h-8 rounded-full bg-water-500 flex items-center justify-center text-white text-xs font-bold border-2 border-ocean-900"
                        >
                          {d?.name.charAt(0)}
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setCompareModalOpen(true)}
                    className="px-4 py-2 bg-water-500 hover:bg-water-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Сравнить
                  </button>
                  <button
                    onClick={() => setSelectedDevices([])}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ============================================================================
            DETAIL SECTION (VOD-Lab Pro/Node)
        ============================================================================ */}
        <section className="py-20 bg-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Детальные спецификации</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Технические характеристики профессиональных лабораторий VOD-Lab
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-12">
              {devices.slice(0, 2).map(device => (
                <button
                  key={device.id}
                  onClick={() => setActiveTab(device.id.includes("pro") ? "pro" : "node")}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                    (activeTab === "pro" && device.id.includes("pro")) ||
                    (activeTab === "node" && device.id.includes("node"))
                      ? device.id.includes("pro")
                        ? "bg-water-500 text-white"
                        : "bg-cyan-500 text-white"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {device.id.includes("pro") ? <Microscope className="w-5 h-5" /> : <Beaker className="w-5 h-5" />}
                    {device.name}
                  </div>
                  <div className="text-sm opacity-80">{device.priceFormatted}</div>
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-12 items-start"
            >
              {/* Product Visualization */}
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-ocean-800 to-ocean-900 border border-white/10 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-water-500/20 to-cyan-500/20 border border-water-500/30 flex items-center justify-center">
                      {activeTab === "pro" ? (
                        <Microscope className="w-24 h-24 text-water-400" />
                      ) : (
                        <Beaker className="w-24 h-24 text-cyan-400" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{activeSpec.name}</h3>
                    <p className="text-slate-400 mb-4">{activeSpec.description}</p>
                    <div className="text-3xl font-bold text-water-400">{activeSpec.priceFormatted}</div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 inline mr-1" />
                  В наличии
                </div>
                <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-water-500/20 border border-water-500/30 rounded-full text-water-400 text-sm font-medium">
                  <Award className="w-4 h-4 inline mr-1" />
                  Выбор профессионалов
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-water-400" />
                    Технические характеристики
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {activeSpec.specs.slice(0, 8).map((spec, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white/5 rounded-xl border border-white/10"
                      >
                        <div className="text-sm text-slate-400 mb-1">{spec.label}</div>
                        <div className="font-semibold text-white">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Beaker className="w-5 h-5 text-water-400" />
                    Сенсоры и анализаторы
                  </h3>
                  <ul className="space-y-2">
                    {activeSpec.sensors.map((sensor, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-slate-300"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-water-400 mt-2 flex-shrink-0" />
                        {sensor}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-water-400" />
                    AI и автоматизация
                  </h3>
                  <ul className="space-y-2">
                    {activeSpec.ai.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-slate-300"
                      >
                        <Zap className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================================
            COMPARISON TABLE
        ============================================================================ */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Сравнение моделей
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-6 text-slate-400 font-medium">Характеристика</th>
                    <th className="text-center py-4 px-6 text-water-400 font-semibold">
                      <div className="flex flex-col items-center gap-1">
                        <Microscope className="w-6 h-6" />
                        Pro
                      </div>
                    </th>
                    <th className="text-center py-4 px-6 text-cyan-400 font-semibold">
                      <div className="flex flex-col items-center gap-1">
                        <Beaker className="w-6 h-6" />
                        Node
                      </div>
                    </th>
                    <th className="text-center py-4 px-6 text-emerald-400 font-semibold">
                      <div className="flex flex-col items-center gap-1">
                        <Package className="w-6 h-6" />
                        Mini
                      </div>
                    </th>
                    <th className="text-center py-4 px-6 text-yellow-400 font-semibold">
                      <div className="flex flex-col items-center gap-1">
                        <Activity className="w-6 h-6" />
                        Sensor
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-6 text-slate-300">{row.feature}</td>
                      <td className="py-4 px-6 text-center text-white font-medium">{row.pro}</td>
                      <td className="py-4 px-6 text-center text-slate-300">{row.node}</td>
                      <td className="py-4 px-6 text-center text-slate-300">{row.mini}</td>
                      <td className="py-4 px-6 text-center text-slate-300">{row.sensor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ============================================================================
            USE CASES
        ============================================================================ */}
        <section className="py-20 bg-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Сценарии использования</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Реальные применения устройств VOD-Lab по всему миру
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Droplets,
                  title: "Городские системы",
                  description: "Непрерывный мониторинг водопровода, обнаружение загрязнений в реальном времени",
                  devices: ["VOD-Lab Pro", "VOD-Lab Mini"],
                },
                {
                  icon: FlaskConical,
                  title: "Промышленность",
                  description: "Контроль промышленных стоков, автоматическая отчётность регуляторам",
                  devices: ["VOD-Lab Pro", "VOD-Lab Node"],
                },
                {
                  icon: Leaf,
                  title: "Сельское хозяйство",
                  description: "Мониторинг орошения, контроль нитратов, оптимизация полива",
                  devices: ["VOD-Lab Mini", "Smart Sensor"],
                },
                {
                  icon: Truck,
                  title: "Экспедиции",
                  description: "Полевые исследования, экологические инспекции, ЧС",
                  devices: ["Water Expeditor", "VOD-Lab Node"],
                },
                {
                  icon: Smartphone,
                  title: "Гражданская наука",
                  description: "Волонтёрский мониторинг, эко-активизм, образование",
                  devices: ["VOD Check", "Smart Sensor"],
                },
                {
                  icon: GraduationCap,
                  title: "Образование",
                  description: "Университеты, школы, курсы VOD-Academy",
                  devices: ["VOD-Lab Node", "VOD-Lab Mini"],
                },
              ].map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-gradient-to-br from-ocean-800 to-ocean-900 rounded-2xl border border-white/10 hover:border-water-500/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-water-500/20 flex items-center justify-center mb-4">
                    <useCase.icon className="w-6 h-6 text-water-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                  <p className="text-slate-400 mb-4">{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.devices.map(device => (
                      <span
                        key={device}
                        className="px-3 py-1 bg-white/5 rounded-full text-xs text-slate-300"
                      >
                        {device}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================================
            SECURITY & BLOCKCHAIN
        ============================================================================ */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Безопасность и верификация
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                6 уровней защиты данных от физического сенсора до блокчейна
              </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: Shield, title: "Physical", desc: "IP68, tamper-proof" },
                { icon: Cpu, title: "Edge", desc: "Local AI verification" },
                { icon: Database, title: "Lab", desc: "Multi-sensor fusion" },
                { icon: Wifi, title: "Network", desc: "Encrypted transmission" },
                { icon: Lock, title: "Consensus", desc: "Peer validation" },
                { icon: Globe, title: "Blockchain", desc: "TON anchoring" },
              ].map((level, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-water-500/10 flex items-center justify-center">
                    <level.icon className="w-6 h-6 text-water-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-1">{level.title}</h4>
                  <p className="text-xs text-slate-400">{level.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================================
            ОТЗЫВЫ И РЕЙТИНГИ
        ============================================================================ */}
        <section className="py-20 bg-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Отзывы владельцев</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Реальный опыт использования устройств VOD-Lab
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-gradient-to-br from-ocean-800 to-ocean-900 rounded-2xl border border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep font-bold">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{review.author}</div>
                      <div className="text-xs text-slate-400">{review.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-600"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-slate-400 ml-2">{review.date}</span>
                  </div>

                  <div className="px-3 py-1 bg-water-500/20 rounded-full text-xs text-water-400 inline-block mb-3">
                    {review.device}
                  </div>

                  <p className="text-slate-300 mb-4">{review.text}</p>

                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                      <ThumbsUp className="w-4 h-4" />
                      {review.helpful}
                    </button>
                    <button className="text-slate-400 hover:text-white transition-colors text-sm">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors flex items-center gap-2 mx-auto">
                <Users className="w-5 h-5" />
                Все отзывы ({reviews.reduce((acc, r) => acc + r.helpful, 0)}+)
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================================
            ОБРАЗОВАТЕЛЬНЫЙ КОНТЕНТ
        ============================================================================ */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Обучение и поддержка</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Видеообзоры, инструкции, FAQ и сервисная поддержка
              </p>
            </div>

            {/* Videos */}
            <div className="mb-16">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Video className="w-5 h-5 text-water-400" />
                Видеообзоры
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {videos.map((video, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-video bg-gradient-to-br from-ocean-800 to-ocean-900 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-water-500/50 transition-all">
                      <div className="w-16 h-16 rounded-full bg-water-500/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 rounded text-xs text-white">
                        {video.duration}
                      </div>
                    </div>
                    <h4 className="font-medium text-white mt-3 mb-1 group-hover:text-water-400 transition-colors">
                      {video.title}
                    </h4>
                    <div className="text-sm text-slate-400">{video.views} просмотров</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-water-400" />
                Часто задаваемые вопросы
              </h3>
              <div className="space-y-4 max-w-4xl mx-auto">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="font-medium text-white">{faq.question}</span>
                      {activeFaq === index ? (
                        <Minus className="w-5 h-5 text-water-400" />
                      ) : (
                        <Plus className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                    <AnimatePresence>
                      {activeFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-slate-300">{faq.answer}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Support */}
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: "Инструкции",
                  description: "Пошаговые руководства по установке и эксплуатации",
                },
                {
                  icon: Wrench,
                  title: "Сервис",
                  description: "Гарантийное и постгарантийное обслуживание",
                },
                {
                  icon: MessageSquare,
                  title: "Поддержка 24/7",
                  description: "Техническая поддержка через чат, email, телефон",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-gradient-to-br from-ocean-800 to-ocean-900 rounded-2xl border border-white/10 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-water-500/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-water-400" />
                  </div>
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-slate-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================================
            CTA
        ============================================================================ */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-r from-water-500/10 to-cyan-500/10 rounded-3xl p-12 border border-water-500/20">
              <Award className="w-16 h-16 text-water-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Станьте оператором VOD-Lab
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Установите ноду у себя в регионе, получайте доход от верификации данных
                и участвуйте в глобальной сети мониторинга воды.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/tokenhub"
                  className="px-8 py-4 bg-water-500 hover:bg-water-600 text-white rounded-xl font-semibold transition-colors"
                >
                  Инвестировать сейчас
                </Link>
                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Запросить демонстрацию
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================================
          МОДАЛЬНЫЕ ОКНА
      ============================================================================ */}

      {/* Compare Modal */}
      <AnimatePresence>
        {compareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setCompareModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ocean-900 rounded-3xl border border-white/10 max-w-6xl w-full max-h-[90vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-ocean-900">
                <h3 className="text-2xl font-bold text-white">Сравнение устройств</h3>
                <button
                  onClick={() => setCompareModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-4 px-6 text-slate-400 font-medium">Характеристика</th>
                        {selectedDevices.map(id => {
                          const d = devices.find(dev => dev.id === id);
                          return (
                            <th key={id} className="text-center py-4 px-6 text-white font-semibold">
                              <div className="flex flex-col items-center gap-2">
                                {d?.image === "pro" && <Microscope className="w-8 h-8 text-water-400" />}
                                {d?.image === "node" && <Beaker className="w-8 h-8 text-cyan-400" />}
                                {d?.image === "mini" && <Package className="w-8 h-8 text-emerald-400" />}
                                {d?.image === "sensor" && <Activity className="w-8 h-8 text-yellow-400" />}
                                {d?.image === "expeditor" && <Truck className="w-8 h-8 text-orange-400" />}
                                {d?.image === "app" && <Smartphone className="w-8 h-8 text-purple-400" />}
                                {d?.name}
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: "Цена", key: "priceFormatted" },
                        { label: "Параметры", key: "parameters" },
                        { label: "Производительность", key: "samplesPerDay" },
                        { label: "Точность", key: "accuracy" },
                        { label: "Вес", key: "weight" },
                        { label: "Защита", key: "protection" },
                        { label: "Температура", key: "tempRange" },
                        { label: "Питание", key: "power" },
                        { label: "Гарантия", key: "warranty" },
                        { label: "Рейтинг", key: "rating", format: (v: any) => `⭐ ${v}` },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-white/5">
                          <td className="py-4 px-6 text-slate-300">{row.label}</td>
                          {selectedDevices.map(id => {
                            const d = devices.find(dev => dev.id === id);
                            const value: any = d?.[row.key as keyof Device];
                            return (
                              <td key={id} className="py-4 px-6 text-center text-white">
                                {row.format ? row.format(value) : value}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ROI Calculator Modal */}
      <AnimatePresence>
        {roiModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setRoiModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ocean-900 rounded-3xl border border-white/10 max-w-2xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-water-400" />
                  Калькулятор ROI
                </h3>
                <button
                  onClick={() => setRoiModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Устройство</label>
                  <select
                    value={roiDevice}
                    onChange={e => setRoiDevice(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-water-500"
                  >
                    {devices.filter(d => d.category !== "app").map(d => (
                      <option key={d.id} value={d.id} className="bg-ocean-900">
                        {d.name} — {d.priceFormatted}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Объём анализов в год (образцов)
                  </label>
                  <input
                    type="number"
                    value={roiWaterVolume}
                    onChange={e => setRoiWaterVolume(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-water-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Текущая стоимость одного анализа ($)
                  </label>
                  <input
                    type="number"
                    value={roiCurrentCost}
                    onChange={e => setRoiCurrentCost(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-water-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Годовые затраты на персонал ($)
                  </label>
                  <input
                    type="number"
                    value={roiLaborCost}
                    onChange={e => setRoiLaborCost(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-water-500"
                  />
                </div>

                {/* ROI Results */}
                {(() => {
                  const device = devices.find(d => d.id === roiDevice);
                  if (!device) return null;
                  const currentAnnualCost = roiWaterVolume * roiCurrentCost + roiLaborCost;
                  const vodLabAnnualCost = roiWaterVolume * 5 + 800 * 12; // $5/анализ + обслуживание
                  const annualSavings = currentAnnualCost - vodLabAnnualCost;
                  const paybackMonths = Math.ceil(device.price / (annualSavings / 12));
                  const roi5Years = ((annualSavings * 5 - device.price) / device.price) * 100;

                  return (
                    <div className="p-6 bg-water-500/10 rounded-xl border border-water-500/30">
                      <h4 className="font-bold text-white mb-4">Результаты расчёта</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-slate-400">Текущие затраты/год</div>
                          <div className="text-2xl font-bold text-white">${currentAnnualCost.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">С VOD-Lab/год</div>
                          <div className="text-2xl font-bold text-white">${vodLabAnnualCost.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">Экономия/год</div>
                          <div className="text-2xl font-bold text-emerald-400">${annualSavings.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">Окупаемость</div>
                          <div className="text-2xl font-bold text-water-400">{paybackMonths} мес.</div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-water-500/30">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">ROI за 5 лет</span>
                          <span className="text-3xl font-bold text-emerald-400">{roi5Years.toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Request Modal */}
      <AnimatePresence>
        {demoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setDemoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ocean-900 rounded-3xl border border-white/10 max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white">Запрос демонстрации</h3>
                <button
                  onClick={() => setDemoModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-water-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-water-500"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-water-500"
                />
                <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-water-500">
                  <option value="" className="bg-ocean-900">Выберите устройство</option>
                  {devices.map(d => (
                    <option key={d.id} value={d.id} className="bg-ocean-900">{d.name}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Комментарий (необязательно)"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-water-500 resize-none"
                />
                <button className="w-full px-6 py-4 bg-water-500 hover:bg-water-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Отправить заявку
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {shareModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setShareModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ocean-900 rounded-3xl border border-white/10 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Поделиться устройством</h3>
                <button
                  onClick={() => setShareModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-3 bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-[#1877F2] rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                    <Facebook className="w-5 h-5" />
                    Facebook
                  </button>
                  <button className="flex-1 px-4 py-3 bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 text-[#1DA1F2] rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                    <Twitter className="w-5 h-5" />
                    Twitter
                  </button>
                </div>
                <button className="flex-1 w-full px-4 py-3 bg-[#0077B5]/20 hover:bg-[#0077B5]/30 text-[#0077B5] rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </button>
                <div className="pt-4 border-t border-white/10">
                  <label className="block text-sm text-slate-400 mb-2">Или скопируйте ссылку</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value="https://looporb.io/vod-lab"
                      readOnly
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none"
                    />
                    <button className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors">
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invite Modal */}
      <AnimatePresence>
        {inviteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setInviteModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-ocean-900 rounded-3xl border border-white/10 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Пригласить к покупке</h3>
                <button
                  onClick={() => setInviteModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <input
                  type="email"
                  placeholder="Email получателя"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-water-500"
                />
                <textarea
                  placeholder="Ваше сообщение (необязательно)"
                  rows={4}
                  defaultValue="Привет! Нашёл отличное устройство для мониторинга воды. Посмотри, думаю тебе будет интересно."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-water-500 resize-none"
                />
                <button className="w-full px-6 py-4 bg-water-500 hover:bg-water-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Отправить приглашение
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Missing icons
function Leaf(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
}

function GraduationCap(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/>
      <path d="M22 10v6"/>
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
    </svg>
  );
}
