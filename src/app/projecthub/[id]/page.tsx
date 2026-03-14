"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Droplets, ArrowLeft, Zap, Box, Activity, TrendingUp,
  Users, Clock, CheckCircle2, FileText, Globe, Shield,
  ChevronRight, Wallet, Award, Gem, Target,
  FlaskConical, Waves, Satellite, Beaker, Brain,
  Database, Leaf, Sun, Filter, Radio, Wifi,
  Lightbulb, Heart, AlertTriangle, Droplet, Cpu, Server, Hash
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";

// --- ALL 16 PROJECTS DATA ---
const projectsData: Record<string, any> = {
  // HARDWARE INNOVATION (4 проекта)
  aquacell: {
    id: "aquacell",
    title: "AquaCell",
    category: "Hardware Innovation",
    subtitle: "Бытовой сенсор для квартир и домов",
    description: "Портативная лаборатория для анализа воды с лабораторной точностью ±2%. Lab-on-chip технология с NFC-верификацией картриджей.",
    longDescription: `AquaCell — это компактное устройство для бытового мониторинга качества воды. Пользователь получает данные о pH, температуре, турбидности, проводимости и ОВП (окислительно-восстановительный потенциал) в реальном времени.

Устройство использует инновационную Lab-on-chip технологию, которая позволяет проводить лабораторно-точные измерения в компактном формфакторе. NFC-верификация картриджей гарантирует подлинность расходных материалов.

Данные синхронизируются с мобильным приложением, где пользователь может отслеживать историю измерений, получать рекомендации и участвовать в глобальной сети мониторинга воды.`,
    price: "$199",
    status: "production",
    progress: 85,
    color: "from-cyan-500 to-blue-500",
    icon: "Droplet",
    emissionRate: "10 VOD/m³",
    specs: [
      { label: "Точность измерений", value: "±2%", desc: "Лабораторная точность" },
      { label: "Параметры", value: "5 показателей", desc: "pH, T, турбидность, проводимость, ОВП" },
      { label: "Связь", value: "Bluetooth 5.0, WiFi", desc: "Мгновенная синхронизация" },
      { label: "Питание", value: "USB-C", desc: "3 месяца автономности" },
      { label: "Время анализа", value: "30 секунд", desc: "Мгновенные результаты" },
      { label: "Вес", value: "150 грамм", desc: "Компактный и портативный" },
    ],
    features: [
      { title: "Lab-on-chip технология", desc: "Инновационная миниатюризация лабораторного оборудования" },
      { title: "NFC-верификация", desc: "Защита от поддельных картриджей" },
      { title: "Облачная аналитика", desc: "История измерений и тренды в мобильном приложении" },
      { title: "Глобальная сеть", desc: "Ваши данные улучшают карту качества воды" },
    ],
    milestones: [
      { title: "Прототип MEMS-спектрометра", date: "2025-01", completed: true },
      { title: "Калибровка ±2% точности", date: "2025-03", completed: true },
      { title: "NFC-защита картриджей", date: "2025-05", completed: true },
      { title: "Сертификация ISO", date: "2025-07", completed: false },
      { title: "Массовое производство", date: "2025-09", completed: false },
    ],
    team: [
      { name: "Алексей Соколов", role: "Lead Engineer", avatar: "AS" },
      { name: "Мария Козлова", role: "Product Manager", avatar: "МК" },
      { name: "Иван Петров", role: "Hardware Architect", avatar: "ИП" },
    ],
    funding: { raised: 450000, goal: 500000, backers: 234 },
  },
  
  aquahome: {
    id: "aquahome",
    title: "AquaHome",
    category: "Hardware Innovation",
    subtitle: "Расширенная станция мониторинга",
    description: "Стационарная система мониторинга с автосэмплером TimeCapsule. 12 проб/квартал + real-time Guardian на выходе фильтра.",
    longDescription: `AquaHome — профессиональная станция для дома или небольшого офиса. Автоматический отбор проб, расширенный набор датчиков, интеграция с системами умного дома.

TimeCapsule технология позволяет хранить до 12 проб в квартал для последующего детального анализа в лаборатории. Система работает 24/7 и предупреждает о любых отклонениях качества воды.

Интеграция с Alexa, Google Home и Apple HomeKit позволяет получать голосовые уведомления о качестве воды.`,
    price: "$499",
    status: "testing",
    progress: 62,
    color: "from-teal-500 to-emerald-500",
    icon: "Waves",
    emissionRate: "12 VOD/m³",
    specs: [
      { label: "Проб/квартал", value: "12", desc: "TimeCapsule хранение" },
      { label: "Параметры", value: "12+", desc: "Расширенный набор датчиков" },
      { label: "Связь", value: "WiFi, Ethernet", desc: "Стабильное подключение" },
      { label: "Хранение", value: "1 год", desc: "Локальная история данных" },
      { label: "API", value: "REST", desc: "Для разработчиков" },
      { label: "Smart Home", value: "Alexa, Google", desc: "Голосовое управление" },
    ],
    features: [
      { title: "Автосэмплер TimeCapsule", desc: "Автоматический отбор и хранение проб" },
      { title: "Real-time Guardian", desc: "Непрерывный мониторинг качества воды" },
      { title: "Smart Home интеграция", desc: "Поддержка Alexa, Google Home, HomeKit" },
      { title: "Расширенная аналитика", desc: "Прогнозирование и тренды" },
    ],
    milestones: [
      { title: "Прототип системы", date: "2024-11", completed: true },
      { title: "Интеграция TimeCapsule", date: "2025-01", completed: true },
      { title: "Beta-тестирование", date: "2025-04", completed: false, progress: 70 },
      { title: "Запуск производства", date: "2025-08", completed: false },
    ],
    team: [
      { name: "Дмитрий Волков", role: "System Architect", avatar: "ДВ" },
      { name: "Анна Лебедева", role: "UX Designer", avatar: "АЛ" },
      { name: "Кирилл Смирнов", role: "IoT Developer", avatar: "КС" },
    ],
    funding: { raised: 280000, goal: 350000, backers: 156 },
  },

  aquadrone: {
    id: "aquadrone",
    title: "AquaDrones",
    category: "Hardware Innovation",
    subtitle: "Промышленные датчики для водоемов",
    description: "Автономные катамараны для удалённого сэмплирования. 4-6 часов автономности, доставка проб между буями.",
    longDescription: `AquaDrones — автономные беспилотные катамараны для мониторинга крупных водоемов. Способны работать в сложных погодных условиях, автоматически собирать пробы с различных точек водоема и доставлять их на берег.

Идеальны для мониторинга озер, водохранилищ, заливов и промышленных водоемов. Геофенсинг и автономная навигация позволяют проводить регулярные обследования без участия оператора.

Система создает 3D-карты качества воды с привязкой к GPS-координатам.`,
    price: "$2,999",
    status: "concept",
    progress: 15,
    color: "from-amber-500 to-orange-500",
    icon: "Satellite",
    emissionRate: "15 VOD/m³",
    specs: [
      { label: "Автономность", value: "4-6 часов", desc: "Полетное время" },
      { label: "Радиус", value: "5 км", desc: "Дальность действия" },
      { label: "Связь", value: "4G/5G, LoRaWAN", desc: "Надежная передача данных" },
      { label: "Грузоподъемность", value: "2 кг", desc: "Проб и оборудования" },
      { label: "Защита", value: "IP67", desc: "Всепогодный корпус" },
      { label: "GPS", value: "RTK", desc: "Сантиметровая точность позиционирования" },
    ],
    features: [
      { title: "Автономная навигация", desc: "Планирование маршрутов и автоматическое управление" },
      { title: "Многоточечное сэмплирование", desc: "До 20 точек сбора проб за один рейс" },
      { title: "Облачная аналитика", desc: "3D-карты качества воды в реальном времени" },
      { title: "Fail-safe система", desc: "Автоматический возврат при проблемах" },
    ],
    milestones: [
      { title: "Концепт-дизайн", date: "2025-01", completed: true },
      { title: "Прототип корпуса", date: "2025-06", completed: false },
      { title: "Испытания на воде", date: "2025-12", completed: false },
      { title: "Серийное производство", date: "2026-06", completed: false },
    ],
    team: [
      { name: "Сергей Морозов", role: "Robotics Lead", avatar: "СМ" },
      { name: "Алина Волкова", role: "Navigation Systems", avatar: "АВ" },
    ],
    funding: { raised: 180000, goal: 1200000, backers: 45 },
  },

  "smart-filters": {
    id: "smart-filters",
    title: "Smart Filters",
    category: "Hardware Innovation",
    subtitle: "Интеллектуальные системы очистки",
    description: "Системы очистки воды с AI-управлением и интегрированным мониторингом качества на входе и выходе.",
    longDescription: `Smart Filters объединяют физическую очистку воды с цифровым мониторингом. AI оптимизирует расход ресурсов и предсказывает необходимость замены фильтров.

Система анализирует качество воды на входе и выходе, автоматически подстраивая параметры очистки. Интеграция с облаком позволяет отслеживать расход картриджей и заказывать замену заранее.

Энергоэффективный дизайн снижает потребление электроэнергии до 40% по сравнению с традиционными системами.`,
    price: "$899",
    status: "development",
    progress: 40,
    color: "from-violet-500 to-purple-500",
    icon: "Filter",
    emissionRate: "8 VOD/m³",
    specs: [
      { label: "Производительность", value: "1000 л/час", desc: "Максимальная пропускная способность" },
      { label: "Стадии очистки", value: "6", desc: "Многоуровневая фильтрация" },
      { label: "AI-модуль", value: "Edge computing", desc: "Локальная обработка данных" },
      { label: "Срок службы", value: "10 лет", desc: "При регулярном обслуживании" },
      { label: "Экономия энергии", value: "40%", desc: "По сравнению с аналогами" },
      { label: "Мониторинг", value: "Вход/выход", desc: "Постоянный контроль качества" },
    ],
    features: [
      { title: "AI-оптимизация", desc: "Интеллектуальное управление процессом очистки" },
      { title: "Предиктивное обслуживание", desc: "Автозаказ картриджей до истечения ресурса" },
      { title: "Мониторинг вход/выход", desc: "Полный контроль качества воды" },
      { title: "Энергоэффективность", desc: "Снижение потребления до 40%" },
    ],
    milestones: [
      { title: "Разработка AI-алгоритмов", date: "2024-12", completed: true },
      { title: "Интеграция датчиков", date: "2025-03", completed: false, progress: 60 },
      { title: "Прототип системы", date: "2025-07", completed: false },
      { title: "Полевые испытания", date: "2025-11", completed: false },
    ],
    team: [
      { name: "Павел Иванов", role: "AI Engineer", avatar: "ПИ" },
      { name: "Ольга Соколова", role: "Water Treatment Expert", avatar: "ОС" },
    ],
    funding: { raised: 320000, goal: 800000, backers: 78 },
  },

  // WATER TREATMENT (4 проекта)
  desalination: {
    id: "desalination",
    title: "Desalination Tech",
    category: "Water Treatment",
    subtitle: "Опреснение морской воды",
    description: "Инновационные технологии опреснения с минимальным энергопотреблением и утилизацией солей.",
    longDescription: `Проект разработки энергоэффективных систем опреснения морской воды для прибрежных регионов. Использование возобновляемых источников энергии снижает стоимость опреснения на 60%.

Модульная конструкция позволяет масштабировать установки от бытовых (100 л/день) до промышленных (1,000,000 л/день). Уникальная технология утилизации солей превращает отходы в ценные химические продукты.

Система может работать полностью на солнечной энергии, что делает её идеальной для развивающихся стран.`,
    price: "Enterprise",
    status: "research",
    progress: 25,
    color: "from-blue-600 to-cyan-600",
    icon: "Droplets",
    emissionRate: "20 VOD/m³",
    specs: [
      { label: "Эффективность", value: "99.2%", desc: "Удаление солей" },
      { label: "Энергопотребление", value: "2.5 кВт·ч/м³", desc: "В 3 раза меньше традиционных методов" },
      { label: "Производительность", value: "1000 м³/день", desc: "Модульная масштабируемость" },
      { label: "Утилизация солей", value: "95%", desc: "Переработка в химические продукты" },
      { label: "Источник энергии", value: "Солнечная", desc: "Возобновляемая энергия" },
      { label: "Стоимость воды", value: "$0.40/м³", desc: "В 5 раз дешевле традиционных методов" },
    ],
    features: [
      { title: "Солнечная энергия", desc: "Полная автономность от электросети" },
      { title: "Утилизация солей", desc: "Отходы превращаются в ценные продукты" },
      { title: "Модульная конструкция", desc: "Легкое масштабирование под задачи" },
      { title: "Удаленный мониторинг", desc: "IoT-контроль всех параметров" },
    ],
    milestones: [
      { title: "Лабораторные испытания", date: "2024-10", completed: true },
      { title: "Пилотная установка", date: "2025-06", completed: false },
      { title: "Модуль 1000 м³/день", date: "2026-03", completed: false },
      { title: "Коммерческий запуск", date: "2027-01", completed: false },
    ],
    team: [
      { name: "Dr. Sarah Chen", role: "Chief Scientist", avatar: "SC" },
      { name: "Михаил Романов", role: "Engineering Lead", avatar: "МР" },
      { name: "Fatima Al-Rashid", role: "Sustainability Expert", avatar: "FA" },
    ],
    funding: { raised: 1200000, goal: 5000000, backers: 234 },
  },

  "bio-filtration": {
    id: "bio-filtration",
    title: "Bio-filtration",
    category: "Water Treatment",
    subtitle: "Биологическая фильтрация",
    description: "Природные системы очистки с использованием микроорганизмов и растений для устойчивой обработки воды.",
    longDescription: `Экологичная система очистки воды без химикатов. Использует природные процессы с участием бактерий, водных растений и биопленок.

Система состоит из нескольких зон: механической фильтрации, биологической очистки с использованием бактериальных культур, и фитоочистки с водными растениями. Никаких химических добавок — только природные процессы.

Идеальна для экологических поселений, загородных домов и регионов с ограниченным доступом к химическим реагентам.`,
    price: "$299",
    status: "testing",
    progress: 70,
    color: "from-emerald-600 to-green-600",
    icon: "Leaf",
    emissionRate: "15 VOD/m³",
    specs: [
      { label: "Эффективность", value: "98%", desc: "Удаление загрязнений" },
      { label: "Без химикатов", value: "100%", desc: "Только природные процессы" },
      { label: "Обслуживание", value: "минимальное", desc: "Самовосстанавливающаяся система" },
      { label: "Срок службы", value: "20+ лет", desc: "При правильной эксплуатации" },
      { label: "Внешний вид", value: "Эстетичный", desc: "Интеграция в ландшафт" },
      { label: "Образование", value: "Демо-режим", desc: "Для школ и университетов" },
    ],
    features: [
      { title: "Природные процессы", desc: "Без химикатов и электроэнергии" },
      { title: "Нулевые выбросы", desc: "Экологически чистая технология" },
      { title: "Самовосстановление", desc: "Экосистема регенерирует сама" },
      { title: "Образовательная ценность", desc: "Наглядная демонстрация природных процессов" },
    ],
    milestones: [
      { title: "Прототип системы", date: "2024-08", completed: true },
      { title: "6 месяцев тестирования", date: "2024-12", completed: true },
      { title: "Сертификация качества", date: "2025-04", completed: false, progress: 80 },
      { title: "Массовое производство", date: "2025-08", completed: false },
    ],
    team: [
      { name: "Елена Березина", role: "Biologist", avatar: "ЕБ" },
      { name: "Tom Wilson", role: "Ecological Designer", avatar: "TW" },
    ],
    funding: { raised: 180000, goal: 350000, backers: 156 },
  },

  "nano-filtration": {
    id: "nano-filtration",
    title: "Nano-filtration",
    category: "Water Treatment",
    subtitle: "Нанофильтрационные мембраны",
    description: "Передовые мембранные технологии для удаления микропластика, тяжелых металлов и патогенов.",
    longDescription: `Нанотехнологические мембраны с контролируемым размером пор для селективной фильтрации. Удаляют загрязнители размером до 0.001 микрона.

Технология позволяет избирательно удалять вредные вещества, сохраняя полезные минералы в воде. Самоочищающиеся мембраны с CIP-системой значительно снижают затраты на обслуживание.

IoT-мониторинг отслеживает состояние мембран и автоматически запускает процесс очистки при необходимости.`,
    price: "$599",
    status: "development",
    progress: 55,
    color: "from-indigo-500 to-blue-500",
    icon: "Beaker",
    emissionRate: "18 VOD/m³",
    specs: [
      { label: "Размер пор", value: "0.001 мкм", desc: "Нанофильтрация" },
      { label: "Пропускная способность", value: "500 л/час", desc: "При низком давлении" },
      { label: "Срок службы мембран", value: "5 лет", desc: "При правильной эксплуатации" },
      { label: "Самоочистка", value: "CIP-система", desc: "Автоматическая промывка" },
      { label: "Удаление микропластика", value: "99.9%", desc: "Частицы от 0.001 мкм" },
      { label: "Сохранение минералов", value: "Избирательно", desc: "Удаляет только вредные" },
    ],
    features: [
      { title: "Удаление микропластика", desc: "99.9% эффективность" },
      { title: "Селективная фильтрация", desc: "Сохраняет полезные минералы" },
      { title: "Самоочищающиеся мембраны", desc: "Автоматическая промывка" },
      { title: "IoT-мониторинг", desc: "Контроль состояния в реальном времени" },
    ],
    milestones: [
      { title: "Разработка мембран", date: "2024-11", completed: true },
      { title: "Тестирование прототипа", date: "2025-03", completed: true },
      { title: "Оптимизация CIP", date: "2025-07", completed: false, progress: 65 },
      { title: "Сертификация", date: "2025-11", completed: false },
    ],
    team: [
      { name: "Андрей Новиков", role: "Nanotech Engineer", avatar: "АН" },
      { name: "Dr. Lisa Park", role: "Materials Scientist", avatar: "LP" },
    ],
    funding: { raised: 450000, goal: 900000, backers: 123 },
  },

  "solar-purification": {
    id: "solar-purification",
    title: "Solar Purification",
    category: "Water Treatment",
    subtitle: "Солнечная дезинфекция",
    description: "Автономные системы очистки воды на солнечной энергии для регионов без электричества.",
    longDescription: `Компактная система очистки воды, работающая исключительно на солнечной энергии. UV-дезинфекция и фильтрация без подключения к сети.

Идеальна для сельских районов развивающихся стран, аварийных ситуаций и походов. Система производит до 50 литров питьевой воды в день, используя только энергию солнца.

Портативный дизайн позволяет легко транспортировать систему в труднодоступные районы.`,
    price: "$149",
    status: "production",
    progress: 90,
    color: "from-yellow-500 to-amber-500",
    icon: "Sun",
    emissionRate: "12 VOD/m³",
    specs: [
      { label: "Мощность", value: "50 Вт", desc: "Солнечная панель" },
      { label: "Производительность", value: "50 л/день", desc: "В солнечную погоду" },
      { label: "Эффективность", value: "99.9%", desc: "Удаление бактерий и вирусов" },
      { label: "Автономность", value: "100%", desc: "Без подключения к сети" },
      { label: "Вес", value: "5 кг", desc: "Портативный" },
      { label: "Срок службы", value: "10 лет", desc: "При правильном уходе" },
    ],
    features: [
      { title: "100% солнечная энергия", desc: "Полная автономность" },
      { title: "UV-дезинфекция", desc: "Уничтожает 99.9% патогенов" },
      { title: "Без электросети", desc: "Работает везде, где есть солнце" },
      { title: "Аварийное использование", desc: "Идеально для ЧС" },
    ],
    milestones: [
      { title: "Прототип", date: "2024-06", completed: true },
      { title: "Полевые испытания", date: "2024-10", completed: true },
      { title: "Сертификация WHO", date: "2025-02", completed: true },
      { title: "Массовое производство", date: "2025-05", completed: false, progress: 85 },
    ],
    team: [
      { name: "Амар Пател", role: "Solar Engineer", avatar: "АП" },
      { name: "Мария Гарсия", role: "Humanitarian Coordinator", avatar: "МГ" },
    ],
    funding: { raised: 280000, goal: 300000, backers: 456 },
  },

  // DATA & ANALYTICS (4 проекта)
  "ai-prediction": {
    id: "ai-prediction",
    title: "AI Prediction Engine",
    category: "Data & Analytics",
    subtitle: "Прогнозирование качества воды",
    description: "ML-модели прогнозирования качества воды. Edge computing + централизованное обучение. Точность прогнозов >85%.",
    longDescription: `Искусственный интеллект анализирует исторические данные и предсказывает изменения качества воды. Помогает предотвращать кризисы и оптимизировать ресурсы.

Система использует edge computing для локальной обработки данных и централизованное обучение на агрегированных данных всей сети. Точность прогнозов превышает 85% на горизонте до 30 дней.

Интеграция с любыми датчиками и API для разработчиков позволяют встраивать прогнозы в сторонние приложения.`,
    price: "Subscription",
    status: "development",
    progress: 45,
    color: "from-pink-500 to-rose-500",
    icon: "Brain",
    emissionRate: "Бонус за точность",
    specs: [
      { label: "Точность", value: ">85%", desc: "На горизонте 7-30 дней" },
      { label: "Горизонт прогноза", value: "7-30 дней", desc: "С нарастающей погрешностью" },
      { label: "Обновление", value: "Real-time", desc: "Непрерывное обучение" },
      { label: "API", value: "REST + GraphQL", desc: "Для интеграции" },
      { label: "Edge Computing", value: "Локально", desc: "Обработка на устройстве" },
      { label: "Обучающие данные", value: "1M+ образцов", desc: "Постоянно растет" },
    ],
    features: [
      { title: "Предиктивная аналитика", desc: "Раннее предупреждение о проблемах" },
      { title: "Edge Computing", desc: "Локальная обработка данных" },
      { title: "Коллективное обучение", desc: "Улучшение на данных сети" },
      { title: "Интеграция", desc: "С любыми датчиками" },
    ],
    milestones: [
      { title: "MVP модели", date: "2024-12", completed: true },
      { title: "Обучение на 100K+ образцах", date: "2025-03", completed: false, progress: 70 },
      { title: "Beta API", date: "2025-06", completed: false },
      { title: "Production", date: "2025-09", completed: false },
    ],
    team: [
      { name: "Елена Васильева", role: "ML Engineer", avatar: "ЕВ" },
      { name: "Артем Кузнецов", role: "Data Scientist", avatar: "АК" },
      { name: "Dr. James Liu", role: "AI Research Lead", avatar: "JL" },
    ],
    funding: { raised: 520000, goal: 800000, backers: 89 },
  },

  "blockchain-registry": {
    id: "blockchain-registry",
    title: "Blockchain Water Registry",
    category: "Data & Analytics",
    subtitle: "Реестр водных ресурсов",
    description: "Неподкупный реестр всех водных источников с историей использования и правами собственности.",
    longDescription: `Децентрализованный реестр на блокчейне для учета водных ресурсов. Прозрачная история использования, права собственности, лицензии.

Каждый источник воды получает уникальный цифровой паспорт. Все изменения фиксируются в блокчейне и доступны для публичной проверки. Смарт-контракты автоматизируют процессы лицензирования и контроля.

Мультичейн-архитектура (TON/Ethereum) обеспечивает доступность и отказоустойчивость системы.`,
    price: "Free",
    status: "production",
    progress: 80,
    color: "from-cyan-600 to-blue-600",
    icon: "Database",
    emissionRate: "5 VOD/запись",
    specs: [
      { label: "Блокчейн", value: "TON/Ethereum", desc: "Мультичейн архитектура" },
      { label: "TPS", value: "10,000", desc: "Пропускная способность" },
      { label: "Хранение", value: "IPFS", desc: "Децентрализованное" },
      { label: "API", value: "Public", desc: "Открытый доступ" },
      { label: "Источников", value: "1,000+", desc: "Зарегистрировано" },
      { label: "Смарт-контракты", value: "Аудированы", desc: "Безопасность подтверждена" },
    ],
    features: [
      { title: "Неподкупность", desc: "Никто не может изменить историю" },
      { title: "Прозрачность", desc: "Все данные публичны" },
      { title: "Смарт-контракты", desc: "Автоматическое исполнение правил" },
      { title: "Глобальный доступ", desc: "Данные доступны из любой точки мира" },
    ],
    milestones: [
      { title: "Запуск testnet", date: "2024-10", completed: true },
      { title: "Интеграция 1000+ источников", date: "2025-01", completed: true },
      { title: "Mainnet релиз", date: "2025-04", completed: false, progress: 85 },
      { title: "Governance launch", date: "2025-06", completed: false },
    ],
    team: [
      { name: "Максим Новиков", role: "Blockchain Lead", avatar: "МН" },
      { name: "Sophie Weber", role: "Smart Contract Developer", avatar: "SW" },
    ],
    funding: { raised: 620000, goal: 750000, backers: 312 },
  },

  "climate-analysis": {
    id: "climate-analysis",
    title: "Climate Impact Analysis",
    category: "Data & Analytics",
    subtitle: "Анализ влияния климата",
    description: "Моделирование влияния изменения климата на водные ресурсы региона с рекомендациями по адаптации.",
    longDescription: `Комплексный анализ климатических изменений и их влияния на водные ресурсы. Прогнозирование дефицита, наводнений, изменения качества воды.

Система использует модели IPCC в сочетании с ML-алгоритмами для повышения точности прогнозов. Горизонт планирования — до 50 лет.

Отчеты формируются для правительств, водохозяйственных организаций и международных институтов.`,
    price: "Enterprise",
    status: "research",
    progress: 30,
    color: "from-green-600 to-emerald-600",
    icon: "Globe",
    emissionRate: "По запросу",
    specs: [
      { label: "Модели", value: "IPCC + ML", desc: "Комбинированный подход" },
      { label: "Горизонт", value: "50 лет", desc: "Долгосрочное прогнозирование" },
      { label: "Точность", value: "±5%", desc: "На 10-летнем горизонте" },
      { label: "Обновление", value: "Ежеквартально", desc: "Актуализация данных" },
      { label: "Параметры", value: "50+", desc: "Климатические индикаторы" },
      { label: "Регионы", value: "Глобально", desc: "Любая точка мира" },
    ],
    features: [
      { title: "Климатическое моделирование", desc: "На основе IPCC данных" },
      { title: "Риск-анализ", desc: "Оценка угроз водным ресурсам" },
      { title: "Рекомендации", desc: "Стратегии адаптации" },
      { title: "Научные публикации", desc: "Публикации в рецензируемых журналах" },
    ],
    milestones: [
      { title: "Базовая модель", date: "2024-12", completed: true },
      { title: "Валидация", date: "2025-06", completed: false },
      { title: "Пилотные отчеты", date: "2025-12", completed: false },
      { title: "Коммерческий запуск", date: "2026-06", completed: false },
    ],
    team: [
      { name: "Dr. Emma Thompson", role: "Climate Scientist", avatar: "ET" },
      { name: "Роман Козлов", role: "Data Engineer", avatar: "РК" },
    ],
    funding: { raised: 380000, goal: 1200000, backers: 45 },
  },

  "leak-detection": {
    id: "leak-detection",
    title: "Leak Detection Systems",
    category: "Data & Analytics",
    subtitle: "Системы обнаружения утечек",
    description: "IoT-сеть датчиков для обнаружения утечек в водопроводных сетях с точностью до 10 метров.",
    longDescription: `Акустические и pressure-based датчики выявляют утечки в трубопроводах. Мгновенное оповещение и точная локализация проблемы.

Сеть датчиков покрывает до 10 км трубопроводов, передавая данные по LoRaWAN. AI анализирует паттерны и выявляет аномалии до появления видимых признаков утечки.

Интеграция с SCADA-системами водоканалов позволяет автоматизировать реагирование.`,
    price: "$49/месяц",
    status: "testing",
    progress: 65,
    color: "from-red-500 to-rose-500",
    icon: "Activity",
    emissionRate: "Бонус за экономию",
    specs: [
      { label: "Точность локализации", value: "±10 м", desc: "По всей сети" },
      { label: "Время реакции", value: "<1 мин", desc: "От обнаружения до алерта" },
      { label: "Покрытие", value: "10 км", desc: "Сеть на один шлюз" },
      { label: "Связь", value: "LoRaWAN", desc: "Дальнобойная передача" },
      { label: "Экономия воды", value: "20-30%", desc: "Снижение потерь" },
      { label: "Батарея", value: "5 лет", desc: "Автономная работа" },
    ],
    features: [
      { title: "Акустическое обнаружение", desc: "Слушает звуки течи" },
      { title: "Real-time мониторинг", desc: "Непрерывный контроль давления" },
      { title: "Точная локализация", desc: "До 10 метров" },
      { title: "SCADA интеграция", desc: "Подключение к системам водоканалов" },
    ],
    milestones: [
      { title: "Прототип датчика", date: "2024-10", completed: true },
      { title: "Пилот в Москве", date: "2025-02", completed: true },
      { title: "Масштабирование", date: "2025-08", completed: false, progress: 70 },
      { title: "Коммерческий запуск", date: "2026-01", completed: false },
    ],
    team: [
      { name: "Игорь Давыдов", role: "IoT Engineer", avatar: "ИД" },
      { name: "Anna Schmidt", role: "Acoustics Expert", avatar: "AS" },
    ],
    funding: { raised: 290000, goal: 600000, backers: 67 },
  },

  // COMMUNITY SOLUTIONS (4 проекта)
  "rural-water": {
    id: "rural-water",
    title: "Rural Water Access",
    category: "Community Solutions",
    subtitle: "Доступ к воде в сельских районах",
    description: "Недорогие решения для обеспечения чистой питьевой водой в удаленных сельских районах развивающихся стран.",
    longDescription: `Проект направлен на обеспечение базового доступа к чистой воде в сельской местности. Простые технологии, местные материалы, обучение сообществ.

Системы рассчитаны на работу без электроэнергии и сложного обслуживания. Местные механики проходят обучение ремонту и обслуживанию.

Каждая установка обеспечивает водой 100+ человек. Микрофинансирование через женские кооперативы делает проект устойчивым.`,
    price: "Donation",
    status: "production",
    progress: 95,
    color: "from-amber-600 to-yellow-600",
    icon: "Heart",
    emissionRate: "20 VOD/установка",
    specs: [
      { label: "Стоимость", value: "< $50", desc: "Доступная цена" },
      { label: "Срок службы", value: "5 лет", desc: "При минимальном обслуживании" },
      { label: "Обслуживание", value: "Местное", desc: "Обучение местных механиков" },
      { label: "Охват", value: "100+", desc: "Человек на установку" },
      { label: "Энергия", value: "Ручная/Солнечная", desc: "Без электросети" },
      { label: "Установлено", value: "500+", desc: "В 12 странах" },
    ],
    features: [
      { title: "Доступная цена", desc: "Менее $50 за установку" },
      { title: "Локальное производство", desc: "Сборка на месте" },
      { title: "Обучение сообществ", desc: "Передача знаний" },
      { title: "Мониторинг качества", desc: "Простые тесты воды" },
    ],
    milestones: [
      { title: "Прототип", date: "2024-03", completed: true },
      { title: "Пилот в Кении", date: "2024-08", completed: true },
      { title: "Масштабирование", date: "2025-01", completed: true },
      { title: "Цель: 1000 установок", date: "2026-01", completed: false, progress: 50 },
    ],
    team: [
      { name: "Grace Mwangi", role: "Field Coordinator", avatar: "GM" },
      { name: "Петр Семенов", role: "Engineering Lead", avatar: "ПС" },
    ],
    funding: { raised: 420000, goal: 500000, backers: 890 },
  },

  education: {
    id: "education",
    title: "Educational Programs",
    category: "Community Solutions",
    subtitle: "Образовательные программы",
    description: "Образовательные инициативы по сохранению воды для школ, университетов и местных сообществ.",
    longDescription: `Программы обучения экологической грамотности, бережному использованию воды, основам мониторинга качества. Для всех возрастов.

Интерактивные курсы, практические занятия, сертификация DeSci. Менторство для молодых исследователей и стартаперов в области водных технологий.

Сообщество alumni создает сеть профессионалов, работающих над решением водных проблем по всему миру.`,
    price: "Free",
    status: "active",
    progress: 88,
    color: "from-purple-600 to-violet-600",
    icon: "Lightbulb",
    emissionRate: "5 VOD/курс",
    specs: [
      { label: "Курсов", value: "50+", desc: "Различных тематик" },
      { label: "Учащихся", value: "10,000+", desc: "По всему миру" },
      { label: "Языков", value: "20", desc: "Локализация" },
      { label: "Сертификация", value: "DeSci", desc: "NFT-сертификаты" },
      { label: "Менторов", value: "200+", desc: "Экспертов в сети" },
      { label: "Университетов", value: "35", desc: "Партнеров" },
    ],
    features: [
      { title: "Интерактивные курсы", desc: "Видео, квизы, проекты" },
      { title: "Практические занятия", desc: "Лабораторные работы" },
      { title: "NFT-сертификация", desc: "Подтверждение знаний в блокчейне" },
      { title: "Менторство", desc: "Личное сопровождение" },
    ],
    milestones: [
      { title: "Запуск платформы", date: "2024-06", completed: true },
      { title: "10,000 студентов", date: "2025-01", completed: true },
      { title: "DeSci сертификация", date: "2025-06", completed: false, progress: 80 },
      { title: "100,000 студентов", date: "2026-06", completed: false },
    ],
    team: [
      { name: "Dr. Maria Gonzalez", role: "Education Director", avatar: "MG" },
      { name: "Антон Попов", role: "Content Lead", avatar: "АП" },
    ],
    funding: { raised: 180000, goal: 400000, backers: 234 },
  },

  emergency: {
    id: "emergency",
    title: "Emergency Response",
    category: "Community Solutions",
    subtitle: "Системы реагирования на ЧС",
    description: "Быстро разворачиваемые системы очистки воды при стихийных бедствиях и чрезвычайных ситуациях.",
    longDescription: `Мобильные очистные установки для экстренной помощи при наводнениях, землетрясениях, загрязнении. Разворачиваются за 24 часа.

Система умещается в 3 чемодана и обеспечивает 10,000 литров чистой воды в день. Работает от солнечной энергии, не требует топлива.

GPS-трекинг позволяет координировать усилия гуманитарных организаций в реальном времени.`,
    price: "NGO",
    status: "testing",
    progress: 72,
    color: "from-red-600 to-orange-600",
    icon: "AlertTriangle",
    emissionRate: "Бонус за спасение",
    specs: [
      { label: "Развертывание", value: "24 часа", desc: "От звонка до работы" },
      { label: "Производительность", value: "10,000 л/день", desc: "Чистой воды" },
      { label: "Портативность", value: "3 чемодана", desc: "Вес 45 кг" },
      { label: "Энергия", value: "Солнечная", desc: "Автономность" },
      { label: "Контейнеры", value: "NATO", desc: "Военная надежность" },
      { label: "GPS", value: "Трекинг", desc: "Координация спасателей" },
    ],
    features: [
      { title: "Быстрое развертывание", desc: "24 часа с момента вызова" },
      { title: "Военная надежность", desc: "Усиленный корпус NATO стандарт" },
      { title: "Полная автономность", desc: "Солнечная энергия" },
      { title: "Мульти-загрязнения", desc: "Очистка от любых загрязнений" },
    ],
    milestones: [
      { title: "Прототип", date: "2024-08", completed: true },
      { title: "Тест Red Cross", date: "2025-01", completed: true },
      { title: "Производство 50 единиц", date: "2025-07", completed: false, progress: 70 },
      { title: "Глобальное покрытие", date: "2026-01", completed: false },
    ],
    team: [
      { name: "John Anderson", role: "Emergency Coordinator", avatar: "JA" },
      { name: "Елена Ковалева", role: "Logistics Lead", avatar: "ЕК" },
    ],
    funding: { raised: 380000, goal: 750000, backers: 156 },
  },

  indigenous: {
    id: "indigenous",
    title: "Indigenous Rights",
    category: "Community Solutions",
    subtitle: "Права коренных народов на воду",
    description: "Поддержка прав коренных народов на доступ к водным ресурсам и сохранение традиционных практик управления.",
    longDescription: `Проект защиты прав коренных народов на воду. Документирование традиционных знаний, юридическая поддержка, технологические решения.

Создание цифрового архива традиционных практик управления водными ресурсами на блокчейне. Это защищает знания от утраты и подтверждает права на воду.

Юридическая поддержка включает pro bono помощь в судах и международных инстанциях.`,
    price: "Grant-funded",
    status: "active",
    progress: 60,
    color: "from-teal-600 to-cyan-600",
    icon: "Users",
    emissionRate: "По договоренности",
    specs: [
      { label: "Народов", value: "50+", desc: "В программе" },
      { label: "Регионов", value: "20", desc: "По всему миру" },
      { label: "Юристов", value: "Pro bono", desc: "Бесплатная помощь" },
      { label: "Документация", value: "Blockchain", desc: "Неподкупный архив" },
      { label: "Языков", value: "30+", desc: "В архиве" },
      { label: "Выиграно дел", value: "12", desc: "В судах" },
    ],
    features: [
      { title: "Защита прав", desc: "Юридическая поддержка в судах" },
      { title: "Документирование знаний", desc: "Цифровой архив на блокчейне" },
      { title: "Технологии", desc: "Доступ к системам мониторинга" },
      { title: "Лоббирование", desc: "Международная защита прав" },
    ],
    milestones: [
      { title: "Архив запущен", date: "2024-09", completed: true },
      { title: "50 народов", date: "2025-03", completed: true },
      { title: "Первые суды", date: "2025-09", completed: false, progress: 65 },
      { title: "Резолюция ООН", date: "2026-06", completed: false },
    ],
    team: [
      { name: "Tanya Whitehorse", role: "Indigenous Rights Advocate", avatar: "TW" },
      { name: "Dr. Michael Torres", role: "Legal Advisor", avatar: "MT" },
    ],
    funding: { raised: 290000, goal: 600000, backers: 345 },
  },
};

// --- ICON MAP ---
const iconMap: Record<string, any> = {
  Droplet, Waves, Satellite, Brain, Database, FlaskConical, 
  Filter, Droplets, Leaf, Sun, Beaker, Activity, 
  Globe, Heart, Lightbulb, AlertTriangle, Users, 
  Zap, Box, Cpu, Radio, Wifi, Server, Hash
};

// --- PAGE COMPONENT ---
export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const project = projectsData[id];
  const [activeTab, setActiveTab] = useState("overview");

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Проект не найден</h1>
            <p className="text-water-200/50 mb-4">Проект с ID &quot;{id}&quot; не существует</p>
            <Link href="/projecthub" className="text-cyan-400 hover:underline">
              Вернуться к списку проектов
            </Link>
          </div>
        </div>
      </>
    );
  }

  const IconComponent = iconMap[project.icon] || Droplets;
  const progress = project.funding ? (project.funding.raised / project.funding.goal) * 100 : 0;

  const statusLabels: Record<string, { text: string; color: string; bg: string }> = {
    production: { text: "В производстве", color: "text-emerald-400", bg: "bg-emerald-500/20" },
    testing: { text: "Тестирование", color: "text-amber-400", bg: "bg-amber-500/20" },
    development: { text: "Разработка", color: "text-blue-400", bg: "bg-blue-500/20" },
    research: { text: "Исследования", color: "text-purple-400", bg: "bg-purple-500/20" },
    concept: { text: "Концепт", color: "text-slate-400", bg: "bg-slate-500/20" },
    active: { text: "Активен", color: "text-cyan-400", bg: "bg-cyan-500/20" },
  };
  const status = statusLabels[project.status] || statusLabels.concept;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <Link 
              href="/projecthub" 
              className="inline-flex items-center gap-2 text-water-200/50 hover:text-cyan-400 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад к проектам
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 mb-8"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                    {status.text}
                  </span>
                  <span className="text-water-200/50 text-sm">{project.category}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-cyan-400 mb-4">{project.subtitle}</p>
                <p className="text-water-200/70 mb-6">{project.description}</p>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="glass-card px-4 py-2">
                    <span className="text-sm text-water-200/50">Цена</span>
                    <div className="text-xl font-bold text-white">{project.price}</div>
                  </div>
                  <div className="glass-card px-4 py-2">
                    <span className="text-sm text-water-200/50">Эмиссия</span>
                    <div className="text-xl font-bold text-emerald-400">{project.emissionRate}</div>
                  </div>
                  <div className="glass-card px-4 py-2">
                    <span className="text-sm text-water-200/50">Прогресс</span>
                    <div className="text-xl font-bold text-cyan-400">{project.progress}%</div>
                  </div>
                </div>
              </div>

              <div className={`relative aspect-square max-w-sm mx-auto rounded-2xl bg-gradient-to-br ${project.color} p-1`}>
                <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                  <IconComponent className="w-32 h-32 text-white opacity-80" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Funding Progress */}
          {project.funding && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Финансирование</h3>
                <span className="text-cyan-400">{progress.toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                <div 
                  className={`h-full bg-gradient-to-r ${project.color} rounded-full transition-all`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">${project.funding.raised.toLocaleString()}</div>
                  <div className="text-sm text-water-200/50">Собрано</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-water-200/70">${project.funding.goal.toLocaleString()}</div>
                  <div className="text-sm text-water-200/50">Цель</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">{project.funding.backers}</div>
                  <div className="text-sm text-water-200/50">Бэкеров</div>
                </div>
              </div>
              <button className="w-full mt-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-900 font-bold rounded-xl transition-all">
                Инвестировать в проект
              </button>
            </motion.div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 border-b border-white/10 mb-8">
            {[
              { id: "overview", label: "Обзор" },
              { id: "specs", label: "Характеристики" },
              { id: "milestones", label: "Этапы" },
              { id: "team", label: "Команда" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-cyan-500 text-cyan-400"
                    : "border-transparent text-water-200/50 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8"
          >
            {activeTab === "overview" && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-white mb-4">О проекте</h3>
                  <div className="text-water-200/70 whitespace-pre-line leading-relaxed">
                    {project.longDescription}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mt-8 mb-4">Ключевые особенности</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.features.map((feature: any, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">{feature.title}</h4>
                          <p className="text-sm text-water-200/50">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Быстрые действия</h3>
                  <div className="space-y-3">
                    <button className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-cyan-400" />
                      <div>
                        <div className="font-medium text-white">Инвестировать</div>
                        <div className="text-sm text-water-200/50">Поддержать проект токенами</div>
                      </div>
                    </button>
                    <button className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition flex items-center gap-3">
                      <FileText className="w-5 h-5 text-emerald-400" />
                      <div>
                        <div className="font-medium text-white">Whitepaper</div>
                        <div className="text-sm text-water-200/50">Подробная документация</div>
                      </div>
                    </button>
                    <button className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-left transition flex items-center gap-3">
                      <Users className="w-5 h-5 text-amber-400" />
                      <div>
                        <div className="font-medium text-white">Сообщество</div>
                        <div className="text-sm text-water-200/50">Присоединиться к обсуждению</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.specs.map((spec: any, i: number) => (
                  <div key={i} className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition">
                    <div className="text-sm text-water-200/50 mb-1">{spec.label}</div>
                    <div className="text-2xl font-bold text-white mb-1">{spec.value}</div>
                    <div className="text-sm text-water-200/50">{spec.desc}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "milestones" && (
              <div className="max-w-2xl">
                <div className="relative">
                  <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-white/10" />
                  {project.milestones.map((milestone: any, i: number) => (
                    <div key={i} className="relative flex items-start gap-4 pb-8 last:pb-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        milestone.completed 
                          ? "bg-emerald-500 text-white" 
                          : "bg-white/10 text-water-200/50 border border-white/20"
                      }`}>
                        {milestone.completed ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Clock className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 p-4 bg-white/5 rounded-xl">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-medium ${milestone.completed ? "text-white" : "text-water-200/70"}`}>
                            {milestone.title}
                          </span>
                          <span className="text-xs text-water-200/50">{milestone.date}</span>
                        </div>
                        {milestone.progress !== undefined && !milestone.completed && (
                          <>
                            <div className="h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                              <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${milestone.progress}%` }} />
                            </div>
                            <span className="text-xs text-cyan-400 mt-1">{milestone.progress}%</span>
                          </>
                        )}
                        {milestone.completed && (
                          <span className="text-xs text-emerald-400">✓ Завершено</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "team" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.team.map((member: any, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                      {member.avatar}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{member.name}</h4>
                      <p className="text-sm text-water-200/50">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
}
