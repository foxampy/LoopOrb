"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import Navbar from "@/components/Navbar";
import {
  Award,
  Loader2,
  Droplets,
  Microscope,
  Users,
  TrendingUp,
  Star,
  Lock,
  CheckCircle2,
  Sparkles,
  Share2,
  Heart,
  Trophy,
  Crown,
  Zap,
  Target,
  BookOpen,
  FlaskConical,
  Globe,
  Medal,
  Gem,
  Flame,
  Clock,
  Calendar,
  ChevronRight,
  Filter,
  Grid3X3,
  List,
  Info,
  X
} from "lucide-react";

// ==========================================
// TYPES & INTERFACES
// ==========================================

type AchievementCategory = 
  | 'WATER_MONITORING'
  | 'SOCIAL'
  | 'PROJECT'
  | 'RESEARCH'
  | 'EDUCATION'
  | 'SPECIAL';

type AchievementRarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
type NFDMetal = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  nftMetal: NFDMetal;
  icon: string;
  color: string;
  xpReward: number;
  orbReward: number;
  hasNFTBadge: boolean;
  condition: {
    type: string;
    value: number;
    description: string;
  };
  isUnlocked?: boolean;
  unlockedAt?: string;
  progress: number;
  target: number;
  visualDescription: string;
  animationType: string;
  collectionValue: number;
}

interface CategoryInfo {
  id: AchievementCategory;
  label: string;
  labelEn: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
  glowColor: string;
}

// ==========================================
// CONSTANTS & DATA
// ==========================================

const CATEGORIES: CategoryInfo[] = [
  {
    id: 'WATER_MONITORING',
    label: 'Водный мониторинг',
    labelEn: 'Water Monitoring',
    description: 'Достижения за сбор и анализ данных о воде',
    icon: Droplets,
    color: 'text-blue-400',
    gradient: 'from-blue-500 to-cyan-400',
    glowColor: '#06b6d4',
  },
  {
    id: 'SOCIAL',
    label: 'Социальные',
    labelEn: 'Social',
    description: 'Достижения за активность в сообществе',
    icon: Users,
    color: 'text-orange-400',
    gradient: 'from-orange-500 to-amber-400',
    glowColor: '#f59e0b',
  },
  {
    id: 'PROJECT',
    label: 'Проектные',
    labelEn: 'Project',
    description: 'Достижения за участие в проектах',
    icon: Target,
    color: 'text-purple-400',
    gradient: 'from-purple-500 to-pink-400',
    glowColor: '#a855f7',
  },
  {
    id: 'RESEARCH',
    label: 'Исследования',
    labelEn: 'Research',
    description: 'Достижения за научную деятельность',
    icon: FlaskConical,
    color: 'text-emerald-400',
    gradient: 'from-emerald-500 to-teal-400',
    glowColor: '#10b981',
  },
  {
    id: 'EDUCATION',
    label: 'Образование',
    labelEn: 'Education',
    description: 'Достижения за обучение и развитие',
    icon: BookOpen,
    color: 'text-yellow-400',
    gradient: 'from-yellow-500 to-amber-400',
    glowColor: '#eab308',
  },
  {
    id: 'SPECIAL',
    label: 'Специальные',
    labelEn: 'Special',
    description: 'Уникальные и ограниченные достижения',
    icon: Crown,
    color: 'text-red-400',
    gradient: 'from-red-500 to-rose-400',
    glowColor: '#ef4444',
  },
];

const RARITY_CONFIG: Record<AchievementRarity, { color: string; multiplier: number; glow: string }> = {
  COMMON: { color: 'text-slate-400', multiplier: 1, glow: '#94a3b8' },
  RARE: { color: 'text-blue-400', multiplier: 1.5, glow: '#3b82f6' },
  EPIC: { color: 'text-purple-400', multiplier: 2.5, glow: '#a855f7' },
  LEGENDARY: { color: 'text-amber-400', multiplier: 5, glow: '#f59e0b' },
};

const METAL_CONFIG: Record<NFDMetal, { color: string; shine: string; value: number }> = {
  BRONZE: { color: '#cd7f32', shine: '#b87333', value: 1 },
  SILVER: { color: '#c0c0c0', shine: '#e8e8e8', value: 2.5 },
  GOLD: { color: '#ffd700', shine: '#ffec8b', value: 5 },
  PLATINUM: { color: '#e5e4e2', shine: '#ffffff', value: 10 },
};

// ==========================================
// ACHIEVEMENTS DATA - 70 TOTAL
// ==========================================

const ACHIEVEMENTS_DATA: Omit<Achievement, 'isUnlocked' | 'unlockedAt' | 'progress'>[] = [
  // WATER MONITORING (15 достижений)
  {
    id: 'water_first_sample',
    name: 'Первая проба',
    description: 'Взять первую пробу воды',
    category: 'WATER_MONITORING',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'droplet',
    color: 'from-blue-400 to-cyan-400',
    xpReward: 50,
    orbReward: 10,
    hasNFTBadge: true,
    condition: { type: 'data_count', value: 1, description: 'Добавьте 1 пробу воды' },
    target: 1,
    visualDescription: 'Бронзовая медаль с изображением капли воды',
    animationType: 'bubble',
    collectionValue: 1,
  },
  {
    id: 'water_10_samples',
    name: 'Начинающий исследователь',
    description: 'Взять 10 проб воды',
    category: 'WATER_MONITORING',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'droplet',
    color: 'from-blue-400 to-cyan-400',
    xpReward: 150,
    orbReward: 25,
    hasNFTBadge: true,
    condition: { type: 'data_count', value: 10, description: 'Добавьте 10 проб воды' },
    target: 10,
    visualDescription: 'Бронзовая медаль с 10 маленькими каплями',
    animationType: 'bubble',
    collectionValue: 2,
  },
  {
    id: 'water_50_samples',
    name: 'Water Guardian',
    description: 'Взять 50 проб воды',
    category: 'WATER_MONITORING',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'shield',
    color: 'from-blue-500 to-cyan-500',
    xpReward: 500,
    orbReward: 100,
    hasNFTBadge: true,
    condition: { type: 'data_count', value: 50, description: 'Добавьте 50 проб воды' },
    target: 50,
    visualDescription: 'Серебряный щит с голубой каплей в центре',
    animationType: 'shield',
    collectionValue: 5,
  },
  {
    id: 'water_100_samples',
    name: 'Мастер мониторинга',
    description: 'Взять 100 проб воды',
    category: 'WATER_MONITORING',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'droplets',
    color: 'from-cyan-500 to-blue-500',
    xpReward: 1000,
    orbReward: 200,
    hasNFTBadge: true,
    condition: { type: 'data_count', value: 100, description: 'Добавьте 100 проб воды' },
    target: 100,
    visualDescription: 'Серебряная медаль с множеством переплетающихся капель',
    animationType: 'waves',
    collectionValue: 8,
  },
  {
    id: 'water_500_samples',
    name: 'Легенда вод',
    description: 'Взять 500 проб воды',
    category: 'WATER_MONITORING',
    rarity: 'EPIC',
    nftMetal: 'GOLD',
    icon: 'crown',
    color: 'from-blue-600 to-cyan-600',
    xpReward: 5000,
    orbReward: 1000,
    hasNFTBadge: true,
    condition: { type: 'data_count', value: 500, description: 'Добавьте 500 проб воды' },
    target: 500,
    visualDescription: 'Золотая корона над волнами',
    animationType: 'crown',
    collectionValue: 20,
  },
  {
    id: 'water_1000_samples',
    name: 'Хранитель океана',
    description: 'Взять 1000 проб воды',
    category: 'WATER_MONITORING',
    rarity: 'LEGENDARY',
    nftMetal: 'PLATINUM',
    icon: 'globe',
    color: 'from-blue-700 to-cyan-700',
    xpReward: 15000,
    orbReward: 5000,
    hasNFTBadge: true,
    condition: { type: 'data_count', value: 1000, description: 'Добавьте 1000 проб воды' },
    target: 1000,
    visualDescription: 'Платиновый глобус с водной поверхностью',
    animationType: 'globe',
    collectionValue: 50,
  },
  {
    id: 'water_first_object',
    name: 'Первооткрыватель',
    description: 'Добавить первый водный объект на карту',
    category: 'WATER_MONITORING',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'map-pin',
    color: 'from-blue-400 to-cyan-400',
    xpReward: 100,
    orbReward: 20,
    hasNFTBadge: true,
    condition: { type: 'objects_count', value: 1, description: 'Добавьте 1 водный объект' },
    target: 1,
    visualDescription: 'Бронзовый маркер карты с каплей',
    animationType: 'pin',
    collectionValue: 2,
  },
  {
    id: 'water_25_objects',
    name: 'Картограф',
    description: 'Добавить 25 водных объектов',
    category: 'WATER_MONITORING',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'map',
    color: 'from-blue-500 to-cyan-500',
    xpReward: 750,
    orbReward: 150,
    hasNFTBadge: true,
    condition: { type: 'objects_count', value: 25, description: 'Добавьте 25 водных объектов' },
    target: 25,
    visualDescription: 'Серебряная карта с отмеченными точками',
    animationType: 'map',
    collectionValue: 6,
  },
  {
    id: 'water_quality_expert',
    name: 'Эксперт качества',
    description: 'Провести 100 проверок качества воды',
    category: 'WATER_MONITORING',
    rarity: 'EPIC',
    nftMetal: 'GOLD',
    icon: 'microscope',
    color: 'from-emerald-500 to-teal-500',
    xpReward: 3000,
    orbReward: 600,
    hasNFTBadge: true,
    condition: { type: 'quality_checks', value: 100, description: 'Проведите 100 проверок качества' },
    target: 100,
    visualDescription: 'Золотой микроскоп с пробиркой',
    animationType: 'scan',
    collectionValue: 15,
  },
  {
    id: 'water_ph_master',
    name: 'pH Мастер',
    description: 'Измерить pH 50 раз',
    category: 'WATER_MONITORING',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'flask',
    color: 'from-purple-500 to-pink-500',
    xpReward: 400,
    orbReward: 80,
    hasNFTBadge: true,
    condition: { type: 'ph_measurements', value: 50, description: 'Измерьте pH 50 раз' },
    target: 50,
    visualDescription: 'Серебряная колба с цветной жидкостью',
    animationType: 'bubble',
    collectionValue: 4,
  },
  {
    id: 'water_turbidity_pro',
    name: 'Специалист по мутности',
    description: 'Измерить мутность 25 раз',
    category: 'WATER_MONITORING',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'eye',
    color: 'from-slate-400 to-gray-400',
    xpReward: 200,
    orbReward: 40,
    hasNFTBadge: true,
    condition: { type: 'turbidity_measurements', value: 25, description: 'Измерьте мутность 25 раз' },
    target: 25,
    visualDescription: 'Бронзовый глаз с водяным эффектом',
    animationType: 'pulse',
    collectionValue: 3,
  },
  {
    id: 'water_oxygen_guardian',
    name: 'Защитник кислорода',
    description: 'Измерить растворённый кислород 30 раз',
    category: 'WATER_MONITORING',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'wind',
    color: 'from-sky-400 to-blue-400',
    xpReward: 450,
    orbReward: 90,
    hasNFTBadge: true,
    condition: { type: 'oxygen_measurements', value: 30, description: 'Измерьте кислород 30 раз' },
    target: 30,
    visualDescription: 'Серебряные волны с пузырьками',
    animationType: 'bubble',
    collectionValue: 5,
  },
  {
    id: 'water_nitrate_detector',
    name: 'Детектор нитратов',
    description: 'Измерить нитраты 20 раз',
    category: 'WATER_MONITORING',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'test-tube',
    color: 'from-red-400 to-pink-400',
    xpReward: 180,
    orbReward: 35,
    hasNFTBadge: true,
    condition: { type: 'nitrate_measurements', value: 20, description: 'Измерьте нитраты 20 раз' },
    target: 20,
    visualDescription: 'Бронзовая пробирка с красной жидкостью',
    animationType: 'bubble',
    collectionValue: 2,
  },
  {
    id: 'water_daily_streak_7',
    name: 'Недельный стрик',
    description: 'Добавлять данные 7 дней подряд',
    category: 'WATER_MONITORING',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'calendar',
    color: 'from-orange-400 to-amber-400',
    xpReward: 350,
    orbReward: 70,
    hasNFTBadge: true,
    condition: { type: 'daily_streak', value: 7, description: '7 дней подряд' },
    target: 7,
    visualDescription: 'Серебряный календарь с каплями',
    animationType: 'flip',
    collectionValue: 4,
  },
  {
    id: 'water_daily_streak_30',
    name: 'Месячный стрик',
    description: 'Добавлять данные 30 дней подряд',
    category: 'WATER_MONITORING',
    rarity: 'EPIC',
    nftMetal: 'GOLD',
    icon: 'flame',
    color: 'from-red-500 to-orange-500',
    xpReward: 2000,
    orbReward: 400,
    hasNFTBadge: true,
    condition: { type: 'daily_streak', value: 30, description: '30 дней подряд' },
    target: 30,
    visualDescription: 'Золотое пламя с водным эффектом',
    animationType: 'fire',
    collectionValue: 12,
  },

  // SOCIAL (10 достижений)
  {
    id: 'social_first_post',
    name: 'Первый пост',
    description: 'Опубликовать первый пост',
    category: 'SOCIAL',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'message',
    color: 'from-orange-400 to-amber-400',
    xpReward: 50,
    orbReward: 10,
    hasNFTBadge: true,
    condition: { type: 'posts_count', value: 1, description: 'Опубликуйте 1 пост' },
    target: 1,
    visualDescription: 'Бронзовый пузырь сообщения',
    animationType: 'pop',
    collectionValue: 1,
  },
  {
    id: 'social_10_posts',
    name: 'Активный автор',
    description: 'Опубликовать 10 постов',
    category: 'SOCIAL',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'edit',
    color: 'from-orange-400 to-amber-400',
    xpReward: 200,
    orbReward: 40,
    hasNFTBadge: true,
    condition: { type: 'posts_count', value: 10, description: 'Опубликуйте 10 постов' },
    target: 10,
    visualDescription: 'Бронзовое перо с искрами',
    animationType: 'write',
    collectionValue: 3,
  },
  {
    id: 'social_100_likes',
    name: 'Любимчик',
    description: 'Получить 100 лайков',
    category: 'SOCIAL',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'heart',
    color: 'from-pink-400 to-rose-400',
    xpReward: 150,
    orbReward: 30,
    hasNFTBadge: true,
    condition: { type: 'likes_received', value: 100, description: 'Получите 100 лайков' },
    target: 100,
    visualDescription: 'Бронзовое сердце с сиянием',
    animationType: 'heartbeat',
    collectionValue: 2,
  },
  {
    id: 'social_1000_likes',
    name: 'Social Star',
    description: 'Получить 1000 лайков',
    category: 'SOCIAL',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'star',
    color: 'from-yellow-400 to-amber-400',
    xpReward: 1000,
    orbReward: 200,
    hasNFTBadge: true,
    condition: { type: 'likes_received', value: 1000, description: 'Получите 1000 лайков' },
    target: 1000,
    visualDescription: 'Серебряная звезда с лучами',
    animationType: 'twinkle',
    collectionValue: 8,
  },
  {
    id: 'social_100_followers',
    name: 'Популярный',
    description: 'Набрать 100 подписчиков',
    category: 'SOCIAL',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'users',
    color: 'from-blue-400 to-purple-400',
    xpReward: 500,
    orbReward: 100,
    hasNFTBadge: true,
    condition: { type: 'followers_count', value: 100, description: 'Наберите 100 подписчиков' },
    target: 100,
    visualDescription: 'Серебряная группа силуэтов',
    animationType: 'gather',
    collectionValue: 6,
  },
  {
    id: 'social_500_followers',
    name: 'Лидер мнений',
    description: 'Набрать 500 подписчиков',
    category: 'SOCIAL',
    rarity: 'EPIC',
    nftMetal: 'GOLD',
    icon: 'megaphone',
    color: 'from-purple-500 to-pink-500',
    xpReward: 2500,
    orbReward: 500,
    hasNFTBadge: true,
    condition: { type: 'followers_count', value: 500, description: 'Наберите 500 подписчиков' },
    target: 500,
    visualDescription: 'Золотой мегафон с волнами',
    animationType: 'broadcast',
    collectionValue: 15,
  },
  {
    id: 'social_first_comment',
    name: 'Комментатор',
    description: 'Написать первый комментарий',
    category: 'SOCIAL',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'message-circle',
    color: 'from-green-400 to-emerald-400',
    xpReward: 30,
    orbReward: 5,
    hasNFTBadge: true,
    condition: { type: 'comments_count', value: 1, description: 'Напишите 1 комментарий' },
    target: 1,
    visualDescription: 'Бронзовый пузырь комментария',
    animationType: 'pop',
    collectionValue: 1,
  },
  {
    id: 'social_100_comments',
    name: 'Оратор',
    description: 'Написать 100 комментариев',
    category: 'SOCIAL',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'message-square',
    color: 'from-emerald-400 to-teal-400',
    xpReward: 400,
    orbReward: 80,
    hasNFTBadge: true,
    condition: { type: 'comments_count', value: 100, description: 'Напишите 100 комментариев' },
    target: 100,
    visualDescription: 'Серебряный свиток с текстом',
    animationType: 'scroll',
    collectionValue: 5,
  },
  {
    id: 'social_share_master',
    name: 'Шер-мастер',
    description: 'Поделиться 50 постами',
    category: 'SOCIAL',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'share',
    color: 'from-cyan-400 to-blue-400',
    xpReward: 120,
    orbReward: 25,
    hasNFTBadge: true,
    condition: { type: 'shares_count', value: 50, description: 'Поделитесь 50 постами' },
    target: 50,
    visualDescription: 'Бронзовая стрелка分享',
    animationType: 'fly',
    collectionValue: 2,
  },
  {
    id: 'social_community_hero',
    name: 'Герой сообщества',
    description: 'Получить 10000 лайков',
    category: 'SOCIAL',
    rarity: 'LEGENDARY',
    nftMetal: 'PLATINUM',
    icon: 'trophy',
    color: 'from-amber-400 to-yellow-400',
    xpReward: 10000,
    orbReward: 2000,
    hasNFTBadge: true,
    condition: { type: 'likes_received', value: 10000, description: 'Получите 10000 лайков' },
    target: 10000,
    visualDescription: 'Платиновый трофей с крыльями',
    animationType: 'ascend',
    collectionValue: 40,
  },

  // PROJECT (15 достижений)
  {
    id: 'project_first_contribution',
    name: 'Первый вклад',
    description: 'Внести первый вклад в проект',
    category: 'PROJECT',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'coins',
    color: 'from-purple-400 to-pink-400',
    xpReward: 100,
    orbReward: 20,
    hasNFTBadge: true,
    condition: { type: 'project_contributions', value: 1, description: 'Внесите вклад в 1 проект' },
    target: 1,
    visualDescription: 'Бронзовые монеты',
    animationType: 'coin',
    collectionValue: 2,
  },
  {
    id: 'project_investor_100',
    name: 'Инвестор',
    description: 'Инвестировать $100 в проекты',
    category: 'PROJECT',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'trending-up',
    color: 'from-green-400 to-emerald-400',
    xpReward: 200,
    orbReward: 40,
    hasNFTBadge: true,
    condition: { type: 'investment_amount', value: 100, description: 'Инвестируйте $100' },
    target: 100,
    visualDescription: 'Бронзовый график роста',
    animationType: 'rise',
    collectionValue: 3,
  },
  {
    id: 'project_investor_1000',
    name: 'Крупный инвестор',
    description: 'Инвестировать $1,000 в проекты',
    category: 'PROJECT',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'wallet',
    color: 'from-emerald-500 to-teal-500',
    xpReward: 1000,
    orbReward: 200,
    hasNFTBadge: true,
    condition: { type: 'investment_amount', value: 1000, description: 'Инвестируйте $1,000' },
    target: 1000,
    visualDescription: 'Серебряный кошелёк с монетами',
    animationType: 'fill',
    collectionValue: 8,
  },
  {
    id: 'project_investor_10000',
    name: 'Investor Pro',
    description: 'Инвестировать $10,000 в проекты',
    category: 'PROJECT',
    rarity: 'EPIC',
    nftMetal: 'GOLD',
    icon: 'crown',
    color: 'from-amber-500 to-yellow-500',
    xpReward: 5000,
    orbReward: 1000,
    hasNFTBadge: true,
    condition: { type: 'investment_amount', value: 10000, description: 'Инвестируйте $10,000' },
    target: 10000,
    visualDescription: 'Золотая корона инвестора',
    animationType: 'crown',
    collectionValue: 20,
  },
  {
    id: 'project_first_mission',
    name: 'Миссионер',
    description: 'Выполнить первую миссию',
    category: 'PROJECT',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'target',
    color: 'from-red-400 to-orange-400',
    xpReward: 80,
    orbReward: 15,
    hasNFTBadge: true,
    condition: { type: 'missions_completed', value: 1, description: 'Выполните 1 миссию' },
    target: 1,
    visualDescription: 'Бронзовая мишень',
    animationType: 'hit',
    collectionValue: 1,
  },
  {
    id: 'project_10_missions',
    name: 'Активный участник',
    description: 'Выполнить 10 миссий',
    category: 'PROJECT',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'check-circle',
    color: 'from-blue-400 to-cyan-400',
    xpReward: 300,
    orbReward: 60,
    hasNFTBadge: true,
    condition: { type: 'missions_completed', value: 10, description: 'Выполните 10 миссий' },
    target: 10,
    visualDescription: 'Бронзовый список с галочками',
    animationType: 'check',
    collectionValue: 4,
  },
  {
    id: 'project_100_missions',
    name: 'Mission Master',
    description: 'Выполнить 100 миссий',
    category: 'PROJECT',
    rarity: 'EPIC',
    nftMetal: 'GOLD',
    icon: 'award',
    color: 'from-purple-500 to-pink-500',
    xpReward: 5000,
    orbReward: 1000,
    hasNFTBadge: true,
    condition: { type: 'missions_completed', value: 100, description: 'Выполните 100 миссий' },
    target: 100,
    visualDescription: 'Золотая медаль с лавровым венком',
    animationType: 'rotate',
    collectionValue: 20,
  },
  {
    id: 'project_creator',
    name: 'Создатель',
    description: 'Создать первый проект',
    category: 'PROJECT',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'plus-circle',
    color: 'from-indigo-400 to-purple-400',
    xpReward: 500,
    orbReward: 100,
    hasNFTBadge: true,
    condition: { type: 'projects_created', value: 1, description: 'Создайте 1 проект' },
    target: 1,
    visualDescription: 'Серебряный круг с плюсом',
    animationType: 'expand',
    collectionValue: 6,
  },
  {
    id: 'project_5_projects',
    name: 'Предприниматель',
    description: 'Создать 5 проектов',
    category: 'PROJECT',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'briefcase',
    color: 'from-slate-400 to-gray-400',
    xpReward: 1500,
    orbReward: 300,
    hasNFTBadge: true,
    condition: { type: 'projects_created', value: 5, description: 'Создайте 5 проектов' },
    target: 5,
    visualDescription: 'Серебряный портфель',
    animationType: 'open',
    collectionValue: 10,
  },
  {
    id: 'project_funded',
    name: 'Успешный сбор',
    description: 'Полностью финансировать проект',
    category: 'PROJECT',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'rocket',
    color: 'from-orange-400 to-red-400',
    xpReward: 1000,
    orbReward: 200,
    hasNFTBadge: true,
    condition: { type: 'projects_funded', value: 1, description: 'Финансируйте 1 проект' },
    target: 1,
    visualDescription: 'Серебряная ракета',
    animationType: 'launch',
    collectionValue: 8,
  },
  {
    id: 'project_volunteer',
    name: 'Волонтёр',
    description: 'Участвовать в 10 проектах',
    category: 'PROJECT',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'hand',
    color: 'from-green-400 to-teal-400',
    xpReward: 250,
    orbReward: 50,
    hasNFTBadge: true,
    condition: { type: 'projects_joined', value: 10, description: 'Присоединитесь к 10 проектам' },
    target: 10,
    visualDescription: 'Бронзовая рука помощи',
    animationType: 'wave',
    collectionValue: 3,
  },
  {
    id: 'project_mentor',
    name: 'Ментор',
    description: 'Быть лидером в 5 проектах',
    category: 'PROJECT',
    rarity: 'EPIC',
    nftMetal: 'GOLD',
    icon: 'graduation-cap',
    color: 'from-indigo-500 to-purple-500',
    xpReward: 2000,
    orbReward: 400,
    hasNFTBadge: true,
    condition: { type: 'projects_as_lead', value: 5, description: 'Будьте лидером в 5 проектах' },
    target: 5,
    visualDescription: 'Золотая академическая шапочка',
    animationType: 'glow',
    collectionValue: 12,
  },
  {
    id: 'project_milestone',
    name: 'Достижение цели',
    description: 'Завершить 25 этапов проекта',
    category: 'PROJECT',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'flag',
    color: 'from-red-400 to-pink-400',
    xpReward: 750,
    orbReward: 150,
    hasNFTBadge: true,
    condition: { type: 'milestones_completed', value: 25, description: 'Завершите 25 этапов' },
    target: 25,
    visualDescription: 'Серебряный флаг на вершине',
    animationType: 'plant',
    collectionValue: 6,
  },
  {
    id: 'project_impact',
    name: 'Влияние',
    description: 'Повлиять на 1000 человек через проекты',
    category: 'PROJECT',
    rarity: 'EPIC',
    nftMetal: 'GOLD',
    icon: 'globe',
    color: 'from-blue-500 to-green-500',
    xpReward: 3000,
    orbReward: 600,
    hasNFTBadge: true,
    condition: { type: 'people_impacted', value: 1000, description: 'Повлияйте на 1000 человек' },
    target: 1000,
    visualDescription: 'Золотой глобус с лучами',
    animationType: 'pulse',
    collectionValue: 15,
  },
  {
    id: 'project_legend',
    name: 'Легенда проектов',
    description: 'Достичь общего влияния $100,000',
    category: 'PROJECT',
    rarity: 'LEGENDARY',
    nftMetal: 'PLATINUM',
    icon: 'star',
    color: 'from-amber-400 to-yellow-400',
    xpReward: 15000,
    orbReward: 5000,
    hasNFTBadge: true,
    condition: { type: 'total_impact', value: 100000, description: 'Влияние $100,000' },
    target: 100000,
    visualDescription: 'Платиновая звезда с ореолом',
    animationType: 'supernova',
    collectionValue: 50,
  },

  // RESEARCH (10 достижений)
  {
    id: 'research_first_validation',
    name: 'Первая валидация',
    description: 'Валидировать первую исследовательскую работу',
    category: 'RESEARCH',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'check',
    color: 'from-emerald-400 to-green-400',
    xpReward: 100,
    orbReward: 20,
    hasNFTBadge: true,
    condition: { type: 'validations_count', value: 1, description: 'Валидируйте 1 работу' },
    target: 1,
    visualDescription: 'Бронзовая галочка',
    animationType: 'check',
    collectionValue: 2,
  },
  {
    id: 'research_10_validations',
    name: 'Рецензент',
    description: 'Валидировать 10 исследований',
    category: 'RESEARCH',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'file-check',
    color: 'from-emerald-400 to-teal-400',
    xpReward: 300,
    orbReward: 60,
    hasNFTBadge: true,
    condition: { type: 'validations_count', value: 10, description: 'Валидируйте 10 исследований' },
    target: 10,
    visualDescription: 'Бронзовый документ с печатью',
    animationType: 'stamp',
    collectionValue: 4,
  },
  {
    id: 'research_100_validations',
    name: 'Scientist',
    description: 'Валидировать 100 исследований',
    category: 'RESEARCH',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'flask-conical',
    color: 'from-teal-400 to-cyan-400',
    xpReward: 1500,
    orbReward: 300,
    hasNFTBadge: true,
    condition: { type: 'validations_count', value: 100, description: 'Валидируйте 100 исследований' },
    target: 100,
    visualDescription: 'Серебряная колба с bubbling жидкостью',
    animationType: 'bubble',
    collectionValue: 10,
  },
  {
    id: 'research_first_paper',
    name: 'Автор',
    description: 'Опубликовать первую научную работу',
    category: 'RESEARCH',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'file-text',
    color: 'from-blue-400 to-indigo-400',
    xpReward: 500,
    orbReward: 100,
    hasNFTBadge: true,
    condition: { type: 'papers_published', value: 1, description: 'Опубликуйте 1 работу' },
    target: 1,
    visualDescription: 'Серебряный свиток',
    animationType: 'unroll',
    collectionValue: 6,
  },
  {
    id: 'research_10_papers',
    name: 'Плодовитый учёный',
    description: 'Опубликовать 10 научных работ',
    category: 'RESEARCH',
    rarity: 'EPIC',
    nftMetal: 'GOLD',
    icon: 'library',
    color: 'from-indigo-500 to-purple-500',
    xpReward: 3000,
    orbReward: 600,
    hasNFTBadge: true,
    condition: { type: 'papers_published', value: 10, description: 'Опубликуйте 10 работ' },
    target: 10,
    visualDescription: 'Золотая библиотека',
    animationType: 'stack',
    collectionValue: 15,
  },
  {
    id: 'research_citations_100',
    name: 'Цитируемый',
    description: 'Получить 100 цитирований',
    category: 'RESEARCH',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'quote',
    color: 'from-violet-400 to-purple-400',
    xpReward: 800,
    orbReward: 160,
    hasNFTBadge: true,
    condition: { type: 'citations_count', value: 100, description: 'Получите 100 цитирований' },
    target: 100,
    visualDescription: 'Серебряные кавычки',
    animationType: 'float',
    collectionValue: 7,
  },
  {
    id: 'research_citations_1000',
    name: 'Влиятельный учёный',
    description: 'Получить 1000 цитирований',
    category: 'RESEARCH',
    rarity: 'EPIC',
    nftMetal: 'GOLD',
    icon: 'trending-up',
    color: 'from-purple-500 to-pink-500',
    xpReward: 5000,
    orbReward: 1000,
    hasNFTBadge: true,
    condition: { type: 'citations_count', value: 1000, description: 'Получите 1000 цитирований' },
    target: 1000,
    visualDescription: 'Золотой график цитирований',
    animationType: 'rise',
    collectionValue: 20,
  },
  {
    id: 'research_grant',
    name: 'Грантополучатель',
    description: 'Получить первый грант',
    category: 'RESEARCH',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'award',
    color: 'from-amber-400 to-yellow-400',
    xpReward: 1000,
    orbReward: 200,
    hasNFTBadge: true,
    condition: { type: 'grants_received', value: 1, description: 'Получите 1 грант' },
    target: 1,
    visualDescription: 'Серебряная медаль гранта',
    animationType: 'shine',
    collectionValue: 8,
  },
  {
    id: 'research_collaboration',
    name: 'Коллаборатор',
    description: 'Участвовать в 10 совместных исследованиях',
    category: 'RESEARCH',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'users',
    color: 'from-cyan-400 to-blue-400',
    xpReward: 250,
    orbReward: 50,
    hasNFTBadge: true,
    condition: { type: 'collaborations_count', value: 10, description: '10 совместных исследований' },
    target: 10,
    visualDescription: 'Бронзовые соединённые фигуры',
    animationType: 'connect',
    collectionValue: 3,
  },
  {
    id: 'research_breakthrough',
    name: 'Прорыв',
    description: 'Опубликовать прорывное исследование',
    category: 'RESEARCH',
    rarity: 'LEGENDARY',
    nftMetal: 'PLATINUM',
    icon: 'lightbulb',
    color: 'from-yellow-400 to-amber-400',
    xpReward: 10000,
    orbReward: 2000,
    hasNFTBadge: true,
    condition: { type: 'breakthrough_papers', value: 1, description: '1 прорывная работа' },
    target: 1,
    visualDescription: 'Платиновая лампочка с лучами',
    animationType: 'flash',
    collectionValue: 40,
  },

  // EDUCATION (10 достижений)
  {
    id: 'education_first_course',
    name: 'Первый курс',
    description: 'Завершить первый образовательный курс',
    category: 'EDUCATION',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'book',
    color: 'from-yellow-400 to-amber-400',
    xpReward: 100,
    orbReward: 20,
    hasNFTBadge: true,
    condition: { type: 'courses_completed', value: 1, description: 'Завершите 1 курс' },
    target: 1,
    visualDescription: 'Бронзовая книга',
    animationType: 'open',
    collectionValue: 2,
  },
  {
    id: 'education_5_courses',
    name: 'Студент',
    description: 'Завершить 5 курсов',
    category: 'EDUCATION',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'books',
    color: 'from-amber-400 to-orange-400',
    xpReward: 300,
    orbReward: 60,
    hasNFTBadge: true,
    condition: { type: 'courses_completed', value: 5, description: 'Завершите 5 курсов' },
    target: 5,
    visualDescription: 'Бронзовая стопка книг',
    animationType: 'stack',
    collectionValue: 4,
  },
  {
    id: 'education_20_courses',
    name: 'Учёный',
    description: 'Завершить 20 курсов',
    category: 'EDUCATION',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'graduation-cap',
    color: 'from-indigo-400 to-purple-400',
    xpReward: 1000,
    orbReward: 200,
    hasNFTBadge: true,
    condition: { type: 'courses_completed', value: 20, description: 'Завершите 20 курсов' },
    target: 20,
    visualDescription: 'Серебряная академическая шапочка',
    animationType: 'toss',
    collectionValue: 8,
  },
  {
    id: 'education_perfect_score',
    name: 'Отличник',
    description: 'Получить 100% за курс',
    category: 'EDUCATION',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'star',
    color: 'from-yellow-400 to-amber-400',
    xpReward: 500,
    orbReward: 100,
    hasNFTBadge: true,
    condition: { type: 'perfect_scores', value: 1, description: '1 курс на 100%' },
    target: 1,
    visualDescription: 'Серебряная звезда с блеском',
    animationType: 'twinkle',
    collectionValue: 6,
  },
  {
    id: 'education_quiz_master',
    name: 'Мастер тестов',
    description: 'Правильно ответить на 100 вопросов',
    category: 'EDUCATION',
    rarity: 'COMMON',
    nftMetal: 'BRONZE',
    icon: 'circle-help',
    color: 'from-green-400 to-emerald-400',
    xpReward: 200,
    orbReward: 40,
    hasNFTBadge: true,
    condition: { type: 'quiz_correct', value: 100, description: '100 правильных ответов' },
    target: 100,
    visualDescription: 'Бронзовый график с галочкой',
    animationType: 'rise',
    collectionValue: 3,
  },
  {
    id: 'education_mentor',
    name: 'Наставник',
    description: 'Помочь 50 студентам',
    category: 'EDUCATION',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'heart-handshake',
    color: 'from-pink-400 to-rose-400',
    xpReward: 750,
    orbReward: 150,
    hasNFTBadge: true,
    condition: { type: 'students_helped', value: 50, description: 'Помогите 50 студентам' },
    target: 50,
    visualDescription: 'Серебряные рукопожатие',
    animationType: 'shake',
    collectionValue: 7,
  },
  {
    id: 'education_content_creator',
    name: 'Создатель контента',
    description: 'Создать 10 учебных материалов',
    category: 'EDUCATION',
    rarity: 'EPIC',
    nftMetal: 'GOLD',
    icon: 'pen-tool',
    color: 'from-blue-500 to-indigo-500',
    xpReward: 2000,
    orbReward: 400,
    hasNFTBadge: true,
    condition: { type: 'materials_created', value: 10, description: 'Создайте 10 материалов' },
    target: 10,
    visualDescription: 'Золотое перо',
    animationType: 'write',
    collectionValue: 12,
  },
  {
    id: 'education_teacher',
    name: 'Преподаватель',
    description: 'Провести 20 уроков',
    category: 'EDUCATION',
    rarity: 'EPIC',
    nftMetal: 'GOLD',
    icon: 'chalkboard',
    color: 'from-slate-500 to-gray-500',
    xpReward: 2500,
    orbReward: 500,
    hasNFTBadge: true,
    condition: { type: 'lessons_taught', value: 20, description: 'Проведите 20 уроков' },
    target: 20,
    visualDescription: 'Золотая доска',
    animationType: 'draw',
    collectionValue: 15,
  },
  {
    id: 'education_phd',
    name: 'Доктор наук',
    description: 'Завершить все курсы в категории',
    category: 'EDUCATION',
    rarity: 'LEGENDARY',
    nftMetal: 'PLATINUM',
    icon: 'scroll',
    color: 'from-purple-500 to-pink-500',
    xpReward: 10000,
    orbReward: 2000,
    hasNFTBadge: true,
    condition: { type: 'category_complete', value: 1, description: 'Завершите категорию' },
    target: 1,
    visualDescription: 'Платиновый диплом',
    animationType: 'unroll',
    collectionValue: 40,
  },
  {
    id: 'education_lifelong',
    name: 'Вечный студент',
    description: 'Учиться 365 дней подряд',
    category: 'EDUCATION',
    rarity: 'LEGENDARY',
    nftMetal: 'PLATINUM',
    icon: 'infinity',
    color: 'from-cyan-400 to-blue-400',
    xpReward: 15000,
    orbReward: 5000,
    hasNFTBadge: true,
    condition: { type: 'learning_streak', value: 365, description: '365 дней обучения' },
    target: 365,
    visualDescription: 'Платиновый знак бесконечности',
    animationType: 'loop',
    collectionValue: 50,
  },

  // SPECIAL (10 достижений)
  {
    id: 'special_early_adopter',
    name: 'Early Adopter',
    description: 'Войти в первые 1000 пользователей',
    category: 'SPECIAL',
    rarity: 'LEGENDARY',
    nftMetal: 'PLATINUM',
    icon: 'rocket',
    color: 'from-blue-400 to-purple-400',
    xpReward: 5000,
    orbReward: 1000,
    hasNFTBadge: true,
    condition: { type: 'early_user', value: 1000, description: 'Первые 1000 пользователей' },
    target: 1000,
    visualDescription: 'Платиновая ракета со звёздами',
    animationType: 'launch',
    collectionValue: 30,
  },
  {
    id: 'special_founder',
    name: 'Основатель',
    description: 'Быть среди первых 100 пользователей',
    category: 'SPECIAL',
    rarity: 'LEGENDARY',
    nftMetal: 'PLATINUM',
    icon: 'crown',
    color: 'from-amber-400 to-yellow-400',
    xpReward: 10000,
    orbReward: 2000,
    hasNFTBadge: true,
    condition: { type: 'founder_user', value: 100, description: 'Первые 100 пользователей' },
    target: 100,
    visualDescription: 'Платиновая корона основателя',
    animationType: 'crown',
    collectionValue: 50,
  },
  {
    id: 'special_referral_master',
    name: 'Реферальный мастер',
    description: 'Пригласить 50 друзей',
    category: 'SPECIAL',
    rarity: 'EPIC',
    nftMetal: 'GOLD',
    icon: 'users',
    color: 'from-green-400 to-emerald-400',
    xpReward: 2500,
    orbReward: 500,
    hasNFTBadge: true,
    condition: { type: 'referrals_count', value: 50, description: 'Пригласите 50 друзей' },
    target: 50,
    visualDescription: 'Золотое дерево рефералов',
    animationType: 'grow',
    collectionValue: 15,
  },
  {
    id: 'special_whale',
    name: 'Кит',
    description: 'Иметь баланс 100,000 ORB',
    category: 'SPECIAL',
    rarity: 'LEGENDARY',
    nftMetal: 'PLATINUM',
    icon: 'wallet',
    color: 'from-cyan-400 to-blue-400',
    xpReward: 10000,
    orbReward: 2000,
    hasNFTBadge: true,
    condition: { type: 'balance_threshold', value: 100000, description: 'Баланс 100,000 ORB' },
    target: 100000,
    visualDescription: 'Платиновый кошелёк с монетами',
    animationType: 'fill',
    collectionValue: 40,
  },
  {
    id: 'special_marathon',
    name: 'Марафонец',
    description: 'Быть активным 100 дней',
    category: 'SPECIAL',
    rarity: 'EPIC',
    nftMetal: 'GOLD',
    icon: 'calendar',
    color: 'from-orange-400 to-red-400',
    xpReward: 3000,
    orbReward: 600,
    hasNFTBadge: true,
    condition: { type: 'active_days', value: 100, description: '100 активных дней' },
    target: 100,
    visualDescription: 'Золотой календарь с отметками',
    animationType: 'flip',
    collectionValue: 15,
  },
  {
    id: 'special_bug_hunter',
    name: 'Охотник за багами',
    description: 'Найти и сообщить о 10 багах',
    category: 'SPECIAL',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'bug',
    color: 'from-red-400 to-pink-400',
    xpReward: 1000,
    orbReward: 200,
    hasNFTBadge: true,
    condition: { type: 'bugs_reported', value: 10, description: 'Сообщите о 10 багах' },
    target: 10,
    visualDescription: 'Серебряный жук с лупой',
    animationType: 'scan',
    collectionValue: 8,
  },
  {
    id: 'special_translator',
    name: 'Переводчик',
    description: 'Перевести 10000 слов',
    category: 'SPECIAL',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'languages',
    color: 'from-blue-400 to-indigo-400',
    xpReward: 800,
    orbReward: 160,
    hasNFTBadge: true,
    condition: { type: 'words_translated', value: 10000, description: 'Переведите 10000 слов' },
    target: 10000,
    visualDescription: 'Серебряный глобус с текстом',
    animationType: 'rotate',
    collectionValue: 7,
  },
  {
    id: 'special_event_winner',
    name: 'Победитель события',
    description: 'Выиграть специальное событие',
    category: 'SPECIAL',
    rarity: 'EPIC',
    nftMetal: 'GOLD',
    icon: 'trophy',
    color: 'from-amber-400 to-yellow-400',
    xpReward: 5000,
    orbReward: 1000,
    hasNFTBadge: true,
    condition: { type: 'events_won', value: 1, description: 'Выиграйте 1 событие' },
    target: 1,
    visualDescription: 'Золотой кубок',
    animationType: 'lift',
    collectionValue: 20,
  },
  {
    id: 'special_dao_participant',
    name: 'Участник DAO',
    description: 'Проголосовать в 50 голосованиях DAO',
    category: 'SPECIAL',
    rarity: 'RARE',
    nftMetal: 'SILVER',
    icon: 'vote',
    color: 'from-purple-400 to-pink-400',
    xpReward: 750,
    orbReward: 150,
    hasNFTBadge: true,
    condition: { type: 'dao_votes', value: 50, description: '50 голосований DAO' },
    target: 50,
    visualDescription: 'Серебрярный ballot box',
    animationType: 'check',
    collectionValue: 7,
  },
  {
    id: 'special_legend',
    name: 'Легенда LoopOrb',
    description: 'Получить все остальные достижения',
    category: 'SPECIAL',
    rarity: 'LEGENDARY',
    nftMetal: 'PLATINUM',
    icon: 'sparkles',
    color: 'from-pink-400 via-purple-400 to-cyan-400',
    xpReward: 50000,
    orbReward: 10000,
    hasNFTBadge: true,
    condition: { type: 'all_achievements', value: 1, description: 'Все достижения' },
    target: 1,
    visualDescription: 'Платиновая звезда со всеми символами',
    animationType: 'supernova',
    collectionValue: 100,
  },
];

// ==========================================
// 3D NFT BADGE COMPONENT
// ==========================================

interface NFTBadge3DProps {
  metal: NFDMetal;
  rarity: AchievementRarity;
  isUnlocked: boolean;
  animationType: string;
}

function NFTBadge3D({ metal, rarity, isUnlocked, animationType }: NFTBadge3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  const metalColors = METAL_CONFIG[metal];
  const rarityGlow = RARITY_CONFIG[rarity].glow;
  
  useFrame((state) => {
    if (!meshRef.current || !isUnlocked) return;
    
    const time = state.clock.getElapsedTime();
    
    // Animation based on type
    switch (animationType) {
      case 'rotate':
        meshRef.current.rotation.y = time * 0.5;
        break;
      case 'float':
        meshRef.current.position.y = Math.sin(time) * 0.1;
        break;
      case 'pulse':
        const scale = 1 + Math.sin(time * 2) * 0.05;
        meshRef.current.scale.set(scale, scale, scale);
        break;
      case 'spin':
        meshRef.current.rotation.z = time;
        break;
      default:
        meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    }
  });

  if (!isUnlocked) {
    return (
      <mesh ref={meshRef}>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshStandardMaterial color="#475569" opacity={0.5} transparent />
      </mesh>
    );
  }

  return (
    <group>
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial 
          color={rarityGlow} 
          transparent 
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Main badge */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
        <MeshDistortMaterial
          color={metalColors.color}
          emissive={metalColors.shine}
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.2}
          distort={0.2}
          speed={2}
        />
      </mesh>
      
      {/* Center emblem */}
      <mesh position={[0, 0, 0.03]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={metalColors.shine}
          metalness={1}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

// ==========================================
// HELPER COMPONENTS
// ==========================================

function IconFromName({ name, className }: { name: string; className?: string }) {
  const iconMap: Record<string, any> = {
    'droplet': Droplets,
    'shield': Award,
    'crown': Crown,
    'map-pin': Target,
    'map': Globe,
    'microscope': Microscope,
    'flask': FlaskConical,
    'eye': Star,
    'wind': Zap,
    'test-tube': FlaskConical,
    'calendar': Calendar,
    'flame': Flame,
    'message': Users,
    'edit': BookOpen,
    'heart': Heart,
    'star': Star,
    'users': Users,
    'megaphone': Award,
    'message-circle': Users,
    'message-square': BookOpen,
    'share': Share2,
    'trophy': Trophy,
    'coins': Gem,
    'trending-up': TrendingUp,
    'wallet': Gem,
    'target': Target,
    'check-circle': CheckCircle2,
    'award': Medal,
    'plus-circle': Target,
    'briefcase': Target,
    'rocket': Zap,
    'hand': Users,
    'graduation-cap': BookOpen,
    'flag': Target,
    'globe': Globe,
    'check': CheckCircle2,
    'file-check': BookOpen,
    'flask-conical': FlaskConical,
    'file-text': BookOpen,
    'library': BookOpen,
    'quote': BookOpen,
    'lightbulb': Sparkles,
    'book': BookOpen,
    'books': BookOpen,
    'circle-help': TrendingUp,
    'heart-handshake': Heart,
    'pen-tool': BookOpen,
    'chalkboard': BookOpen,
    'scroll': BookOpen,
    'infinity': Sparkles,
    'bug': Microscope,
    'languages': Globe,
    'vote': Target,
    'sparkles': Sparkles,
  };

  const IconComponent = iconMap[name] || Award;
  return <IconComponent className={className} />;
}

function RarityBadge({ rarity }: { rarity: AchievementRarity }) {
  const config = RARITY_CONFIG[rarity];
  const labels: Record<AchievementRarity, string> = {
    COMMON: 'Обычное',
    RARE: 'Редкое',
    EPIC: 'Эпическое',
    LEGENDARY: 'Легендарное',
  };

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full bg-white/10 ${config.color}`}>
      {labels[rarity]}
    </span>
  );
}

function MetalBadge({ metal }: { metal: NFDMetal }) {
  const config = METAL_CONFIG[metal];
  const labels: Record<NFDMetal, string> = {
    BRONZE: 'Бронза',
    SILVER: 'Серебро',
    GOLD: 'Золото',
    PLATINUM: 'Платина',
  };

  return (
    <div className="flex items-center gap-1">
      <div 
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: config.color }}
      />
      <span className="text-xs text-slate-400">{labels[metal]}</span>
    </div>
  );
}

function ProgressBar({ current, target, color }: { current: number; target: number; color: string }) {
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <div 
        className={`h-full bg-gradient-to-r ${color} transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeRarity, setActiveRarity] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    fetchAchievements();
    fetchLeaderboard();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await fetch('/api/achievements?user=true');
      const data = await res.json();
      if (data.success) {
        // Merge with our achievement data
        const mergedAchievements = ACHIEVEMENTS_DATA.map(achievement => {
          const userAchievement = data.data.achievements?.find(
            (ua: any) => ua.id === achievement.id
          );
          return {
            ...achievement,
            isUnlocked: userAchievement?.isUnlocked || false,
            unlockedAt: userAchievement?.unlockedAt,
            progress: userAchievement?.progress || 0,
          };
        });
        setAchievements(mergedAchievements);
      }
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
      // Fallback to static data
      setAchievements(ACHIEVEMENTS_DATA.map(a => ({ ...a, isUnlocked: false, progress: 0 })));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/achievements/leaderboard');
      const data = await res.json();
      if (data.success) {
        setLeaderboard(data.data.leaderboard);
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    }
  };

  const checkAchievements = async () => {
    try {
      const res = await fetch('/api/achievements', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.data.unlocked > 0) {
        fetchAchievements();
      }
    } catch (error) {
      console.error('Failed to check achievements:', error);
    }
  };

  const handleShare = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setShowShareModal(true);
  };

  const filteredAchievements = useMemo(() => {
    return achievements.filter(a => {
      if (activeCategory !== 'all' && a.category !== activeCategory) return false;
      if (activeRarity !== 'all' && a.rarity !== activeRarity) return false;
      return true;
    });
  }, [achievements, activeCategory, activeRarity]);

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalXP = achievements
    .filter(a => a.isUnlocked)
    .reduce((acc, a) => acc + a.xpReward, 0);
  const totalORB = achievements
    .filter(a => a.isUnlocked)
    .reduce((acc, a) => acc + a.orbReward, 0);

  const categoryStats = useMemo(() => {
    const stats: Record<string, { unlocked: number; total: number; xp: number }> = {};
    CATEGORIES.forEach(cat => {
      const catAchievements = achievements.filter(a => a.category === cat.id);
      stats[cat.id] = {
        unlocked: catAchievements.filter(a => a.isUnlocked).length,
        total: catAchievements.length,
        xp: catAchievements.filter(a => a.isUnlocked).reduce((acc, a) => acc + a.xpReward, 0),
      };
    });
    return stats;
  }, [achievements]);

  const categories = ['all', ...CATEGORIES.map(c => c.id)];
  const rarities = ['all', 'COMMON', 'RARE', 'EPIC', 'LEGENDARY'];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-400 mb-4 border border-amber-500/20"
            >
              <Trophy className="w-5 h-5" />
              <span className="text-sm font-medium">Достижения LoopOrb</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Коллекция достижений
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Зарабатывайте NFT бейджи за активность в экосистеме. 
              Каждое достижение приносит XP, ORB токены и уникальные награды.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{unlockedCount}/{achievements.length}</p>
                  <p className="text-slate-400 text-sm">Разблокировано</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-yellow-500/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-yellow-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{totalXP.toLocaleString()}</p>
                  <p className="text-slate-400 text-sm">XP получено</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <Gem className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{totalORB.toLocaleString()}</p>
                  <p className="text-slate-400 text-sm">ORB заработано</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Award className="w-7 h-7 text-purple-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">
                    {Math.round((unlockedCount / Math.max(achievements.length, 1)) * 100)}%
                  </p>
                  <p className="text-slate-400 text-sm">Прогресс</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Category Progress */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {CATEGORIES.map((category, index) => {
              const stats = categoryStats[category.id];
              const percentage = Math.round((stats.unlocked / Math.max(stats.total, 1)) * 100);
              const Icon = category.icon;
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setActiveCategory(activeCategory === category.id ? 'all' : category.id)}
                  className={`cursor-pointer bg-white/5 backdrop-blur-sm rounded-xl p-4 border transition-all ${
                    activeCategory === category.id 
                      ? 'border-water-500/50 bg-water-500/10' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-2`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white font-medium text-sm">{category.label}</p>
                  <p className="text-slate-400 text-xs">{stats.unlocked}/{stats.total}</p>
                  <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${category.gradient}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <button
              onClick={checkAchievements}
              className="px-6 py-3 bg-gradient-to-r from-water-500 to-cyan-500 hover:from-water-600 hover:to-cyan-600 text-white rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-water-500/25"
            >
              <Sparkles className="w-5 h-5" />
              Проверить достижения
            </button>
            
            <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-water-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-water-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            <div className="flex items-center gap-2 text-slate-400">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Категория:</span>
            </div>
            {categories.map((category) => {
              const catInfo = CATEGORIES.find(c => c.id === category);
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? catInfo 
                        ? `bg-gradient-to-r ${catInfo.gradient} text-white shadow-lg`
                        : 'bg-water-500 text-white'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category === 'all' ? 'Все' : catInfo?.label || category}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            <div className="flex items-center gap-2 text-slate-400">
              <Medal className="w-4 h-4" />
              <span className="text-sm">Редкость:</span>
            </div>
            {rarities.map((rarity) => {
              const rarityConfig = RARITY_CONFIG[rarity as AchievementRarity];
              const labels: Record<string, string> = {
                all: 'Все',
                COMMON: 'Обычные',
                RARE: 'Редкие',
                EPIC: 'Эпические',
                LEGENDARY: 'Легендарные',
              };
              return (
                <button
                  key={rarity}
                  onClick={() => setActiveRarity(rarity)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeRarity === rarity
                      ? rarityConfig 
                        ? `bg-${rarityConfig.glow.replace('#', '')}/20 ${rarityConfig.color} ring-1 ring-${rarityConfig.glow.replace('#', '')}/50`
                        : 'bg-water-500 text-white'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                  style={activeRarity === rarity && rarity !== 'all' ? {
                    backgroundColor: `${rarityConfig.glow}10`,
                    color: rarityConfig.color.includes('amber') ? '#fbbf24' :
                           rarityConfig.color.includes('purple') ? '#a855f7' :
                           rarityConfig.color.includes('blue') ? '#3b82f6' : '#94a3b8',
                  } : {}}
                >
                  {labels[rarity]}
                </button>
              );
            })}
          </div>

          {/* Achievements Grid/List */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-12 h-12 text-water-500 animate-spin" />
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAchievements.map((achievement, index) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      index={index}
                      onClick={() => setSelectedAchievement(achievement)}
                      onShare={() => handleShare(achievement)}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAchievements.map((achievement, index) => (
                    <AchievementListItem
                      key={achievement.id}
                      achievement={achievement}
                      index={index}
                      onClick={() => setSelectedAchievement(achievement)}
                      onShare={() => handleShare(achievement)}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Leaderboard */}
          {leaderboard.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Таблица лидеров
              </h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-slate-400 text-sm">
                  <div className="col-span-1">#</div>
                  <div className="col-span-6">Игрок</div>
                  <div className="col-span-3 text-right">Достижения</div>
                  <div className="col-span-2 text-right">XP</div>
                </div>
                {leaderboard.slice(0, 10).map((player, index) => (
                  <div 
                    key={player.id}
                    className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <div className="col-span-1 flex items-center">
                      {index === 0 && <Crown className="w-5 h-5 text-yellow-400" />}
                      {index === 1 && <Award className="w-5 h-5 text-slate-400" />}
                      {index === 2 && <Award className="w-5 h-5 text-amber-600" />}
                      {index > 2 && <span className="text-slate-400">{index + 1}</span>}
                    </div>
                    <div className="col-span-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep font-bold text-sm">
                        {player.name.charAt(0)}
                      </div>
                      <span className="text-white font-medium">{player.name}</span>
                    </div>
                    <div className="col-span-3 text-right text-white">
                      {player.achievementsCount}
                    </div>
                    <div className="col-span-2 text-right text-yellow-400 font-medium">
                      {player.xp.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <AchievementDetailModal
            achievement={selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
            onShare={() => handleShare(selectedAchievement)}
          />
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && selectedAchievement && (
          <ShareModal
            achievement={selectedAchievement}
            onClose={() => setShowShareModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ==========================================
// CARD COMPONENTS
// ==========================================

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
  onClick: () => void;
  onShare: () => void;
}

function AchievementCard({ achievement, index, onClick, onShare }: AchievementCardProps) {
  const categoryInfo = CATEGORIES.find(c => c.id === achievement.category);
  const rarityConfig = RARITY_CONFIG[achievement.rarity];
  const Icon = categoryInfo?.icon || Award;
  const progressPercentage = (achievement.progress / achievement.target) * 100;
  const isComplete = achievement.isUnlocked ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      onClick={onClick}
      className={`relative group cursor-pointer bg-white/5 backdrop-blur-sm rounded-2xl border overflow-hidden transition-all duration-300 ${
        isComplete
          ? 'border-white/20 hover:border-water-500/50 hover:shadow-lg hover:shadow-water-500/10'
          : 'border-white/5 opacity-70 hover:opacity-100'
      }`}
      style={isComplete ? {
        boxShadow: `0 0 30px ${rarityConfig.glow}15`,
        borderColor: `${rarityConfig.glow}30`,
      } : {}}
    >
      {/* 3D Badge Preview */}
      <div className="absolute top-4 right-4 w-16 h-16 opacity-20 group-hover:opacity-30 transition-opacity">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <NFTBadge3D 
            metal={achievement.nftMetal}
            rarity={achievement.rarity}
            isUnlocked={isComplete}
            animationType={achievement.animationType}
          />
        </Canvas>
      </div>

      {/* Unlocked Badge */}
      {isComplete && (
        <div className="absolute top-3 left-3">
          <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
        </div>
      )}

      <div className="p-5">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-4 ${
          !isComplete && 'grayscale opacity-50'
        } ${isComplete ? 'shadow-lg' : ''}`}
        style={isComplete ? { boxShadow: `0 0 20px ${rarityConfig.glow}40` } : {}}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Content */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <RarityBadge rarity={achievement.rarity} />
            <MetalBadge metal={achievement.nftMetal} />
          </div>
          <h3 className="font-bold text-white text-lg mb-1">{achievement.name}</h3>
          <p className="text-sm text-slate-400 line-clamp-2">{achievement.description}</p>
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Прогресс</span>
            <span className="text-white">{achievement.progress}/{achievement.target}</span>
          </div>
          <ProgressBar 
            current={achievement.progress} 
            target={achievement.target} 
            color={achievement.color}
          />
        </div>

        {/* Rewards */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-medium text-sm">+{achievement.xpReward}</span>
            </div>
            <div className="flex items-center gap-1">
              <Gem className="w-4 h-4 text-cyan-400" />
              <span className="text-white font-medium text-sm">+{achievement.orbReward}</span>
            </div>
          </div>
          {isComplete && achievement.hasNFTBadge && (
            <div className="flex items-center gap-1 text-xs text-amber-400">
              <Award className="w-3 h-3" />
              <span>NFT</span>
            </div>
          )}
        </div>

        {/* How to get hint (locked only) */}
        {!isComplete && (
          <div className="mt-3 pt-3 border-t border-white/5">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-500 mt-0.5" />
              <p className="text-xs text-slate-500">{achievement.condition.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-water-500/10 to-transparent" />
      </div>
    </motion.div>
  );
}

interface AchievementListItemProps {
  achievement: Achievement;
  index: number;
  onClick: () => void;
  onShare: () => void;
}

function AchievementListItem({ achievement, index, onClick, onShare }: AchievementListItemProps) {
  const categoryInfo = CATEGORIES.find(c => c.id === achievement.category);
  const rarityConfig = RARITY_CONFIG[achievement.rarity];
  const Icon = categoryInfo?.icon || Award;
  const isComplete = achievement.isUnlocked ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.02 }}
      onClick={onClick}
      className={`group cursor-pointer bg-white/5 backdrop-blur-sm rounded-xl border overflow-hidden transition-all ${
        isComplete
          ? 'border-white/20 hover:border-water-500/50'
          : 'border-white/5 opacity-60 hover:opacity-100'
      }`}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center flex-shrink-0 ${
          !isComplete && 'grayscale opacity-50'
        }`}>
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-white">{achievement.name}</h3>
            <RarityBadge rarity={achievement.rarity} />
            {isComplete && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            )}
          </div>
          <p className="text-sm text-slate-400 truncate">{achievement.description}</p>
          
          {/* Progress */}
          <div className="flex items-center gap-3 mt-2">
            <div className="flex-1 max-w-xs">
              <ProgressBar 
                current={achievement.progress} 
                target={achievement.target} 
                color={achievement.color}
              />
            </div>
            <span className="text-xs text-slate-400 whitespace-nowrap">
              {achievement.progress}/{achievement.target}
            </span>
          </div>
        </div>

        {/* Rewards */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-medium text-sm">+{achievement.xpReward}</span>
            </div>
            <div className="flex items-center gap-1 justify-end">
              <Gem className="w-4 h-4 text-cyan-400" />
              <span className="text-white font-medium text-sm">+{achievement.orbReward}</span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}

// ==========================================
// MODAL COMPONENTS
// ==========================================

interface AchievementDetailModalProps {
  achievement: Achievement;
  onClose: () => void;
  onShare: () => void;
}

function AchievementDetailModal({ achievement, onClose, onShare }: AchievementDetailModalProps) {
  const categoryInfo = CATEGORIES.find(c => c.id === achievement.category);
  const rarityConfig = RARITY_CONFIG[achievement.rarity];
  const Icon = categoryInfo?.icon || Award;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
        style={achievement.isUnlocked ? {
          boxShadow: `0 0 60px ${rarityConfig.glow}30`,
        } : {}}
      >
        {/* Header with 3D Badge */}
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-20`} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
          
          {/* 3D Badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32">
              <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  <NFTBadge3D 
                    metal={achievement.nftMetal}
                    rarity={achievement.rarity}
                    isUnlocked={achievement.isUnlocked}
                    animationType={achievement.animationType}
                  />
                </Float>
                <Environment preset="city" />
                <ContactShadows opacity={0.5} scale={10} blur={2} far={4} />
              </Canvas>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title & Badges */}
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-white">{achievement.name}</h2>
            <RarityBadge rarity={achievement.rarity} />
            <MetalBadge metal={achievement.nftMetal} />
          </div>

          {/* Description */}
          <p className="text-slate-300 mb-6">{achievement.description}</p>

          {/* Category */}
          <div className="flex items-center gap-2 mb-6">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${categoryInfo?.gradient} flex items-center justify-center`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-slate-400">{categoryInfo?.label}</span>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Прогресс</span>
              <span className="text-white font-medium">{achievement.progress}/{achievement.target}</span>
            </div>
            <ProgressBar 
              current={achievement.progress} 
              target={achievement.target} 
              color={achievement.color}
            />
          </div>

          {/* How to unlock */}
          {!achievement.isUnlocked && (
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <h3 className="text-white font-medium mb-2">Как получить:</h3>
              <p className="text-slate-400 text-sm">{achievement.condition.description}</p>
            </div>
          )}

          {/* Rewards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-slate-400 text-sm">XP</span>
              </div>
              <p className="text-xl font-bold text-white">+{achievement.xpReward}</p>
            </div>
            <div className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Gem className="w-5 h-5 text-cyan-400" />
                <span className="text-slate-400 text-sm">ORB</span>
              </div>
              <p className="text-xl font-bold text-white">+{achievement.orbReward}</p>
            </div>
            <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-slate-400 text-sm">NFT</span>
              </div>
              <p className="text-xl font-bold text-white">{achievement.nftMetal}</p>
            </div>
          </div>

          {/* Visual Description */}
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <h3 className="text-white font-medium mb-2">Визуал NFT бейджа:</h3>
            <p className="text-slate-400 text-sm">{achievement.visualDescription}</p>
          </div>

          {/* Collection Value */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div>
              <p className="text-slate-400 text-sm">Коллекционная ценность</p>
              <p className="text-2xl font-bold text-amber-400">{achievement.collectionValue} pts</p>
            </div>
            {achievement.isUnlocked && achievement.unlockedAt && (
              <div className="text-right">
                <p className="text-slate-400 text-sm">Получено</p>
                <p className="text-white font-medium">
                  {new Date(achievement.unlockedAt).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            {achievement.isUnlocked && (
              <button
                onClick={onShare}
                className="flex-1 px-4 py-3 bg-water-500 hover:bg-water-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Поделиться
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ShareModalProps {
  achievement: Achievement;
  onClose: () => void;
}

function ShareModal({ achievement, onClose }: ShareModalProps) {
  const shareText = `Я получил достижение "${achievement.name}" в LoopOrb! 🏆`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText}\nhttps://looporb.io/achievements`);
  };

  const handleShareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=https://looporb.io`, '_blank');
  };

  const handleShareTelegram = () => {
    window.open(`https://t.me/share/url?url=https://looporb.io&text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-slate-900 rounded-2xl border border-white/10 p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Поделиться достижением</h3>
        
        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <p className="text-slate-300">{shareText}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={handleCopy}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Копия
          </button>
          <button
            onClick={handleShareTwitter}
            className="px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Twitter
          </button>
          <button
            onClick={handleShareTelegram}
            className="px-4 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Telegram
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full px-4 py-3 bg-water-500 hover:bg-water-600 text-white rounded-xl font-medium transition-colors"
        >
          Закрыть
        </button>
      </motion.div>
    </motion.div>
  );
}
