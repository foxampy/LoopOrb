'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export type AvatarBase = 'boy' | 'girl' | 'creature';
export type AvatarSkin = 'light' | 'medium' | 'dark' | 'blue' | 'green';
export type AvatarHair = 'short' | 'long' | 'spiky' | 'curly' | 'none';

export interface AvatarConfig {
  base: AvatarBase;
  skin: AvatarSkin;
  hair: AvatarHair;
  hairColor: string;
  outfit: string;
  accessory?: string;
  background: string;
}

interface AvatarProps {
  config: AvatarConfig;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  showLevel?: boolean;
  level?: number;
}

const baseEmojis: Record<AvatarBase, string> = {
  boy: '👦',
  girl: '👧',
  creature: '🧜',
};

const skinModifiers: Record<AvatarSkin, string> = {
  light: '',
  medium: '🏽',
  dark: '🏿',
  blue: '🔵',
  green: '🟢',
};

const hairEmojis: Record<AvatarHair, Record<AvatarBase, string>> = {
  short: { boy: '', girl: '', creature: '' },
  long: { boy: '', girl: '👩', creature: '🧜‍♀️' },
  spiky: { boy: '👨‍🎤', girl: '👩‍🎤', creature: '🐙' },
  curly: { boy: '👨‍🦱', girl: '👩‍🦱', creature: '🦑' },
  none: { boy: '👨‍🦲', girl: '👩‍🦲', creature: '🐟' },
};

const outfitEmojis: Record<string, string> = {
  default: '👕',
  warrior: '🛡️',
  scientist: '👨‍🔬',
  explorer: '🧭',
  casual: '👚',
  formal: '👔',
  swimmer: '🩱',
  diver: '🤿',
};

const accessoryEmojis: Record<string, string> = {
  none: '',
  hat: '🎩',
  cap: '🧢',
  glasses: '👓',
  sunglasses: '🕶️',
  crown: '👑',
  flower: '🌸',
  tool: '🔧',
  net: '🕸️',
  staff: '🪄',
};

const backgroundGradients: Record<string, string> = {
  ocean: 'from-blue-500 to-cyan-500',
  sunset: 'from-orange-500 to-pink-500',
  forest: 'from-green-500 to-emerald-500',
  space: 'from-purple-500 to-indigo-500',
  beach: 'from-yellow-400 to-orange-400',
  arctic: 'from-cyan-300 to-blue-300',
  default: 'from-gray-700 to-gray-800',
};

export default function Avatar({ 
  config, 
  size = 'md', 
  animated = true,
  showLevel = false,
  level = 1 
}: AvatarProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-20 h-20 text-4xl',
    lg: 'w-32 h-32 text-6xl',
    xl: 'w-48 h-48 text-8xl',
  };

  const getAvatarEmoji = () => {
    if (config.hair !== 'short' && hairEmojis[config.hair]) {
      return hairEmojis[config.hair][config.base] || baseEmojis[config.base];
    }
    return baseEmojis[config.base];
  };

  const MotionComponent = animated ? motion.div : 'div';
  const motionProps = animated ? {
    whileHover: { scale: 1.1, rotate: [0, -5, 5, 0] },
    whileTap: { scale: 0.95 },
    animate: isHovered ? { y: [0, -5, 0] } : {},
    transition: { duration: 0.5 },
  } : {};

  return (
    <div className="relative inline-block">
      <MotionComponent
        {...motionProps}
        className={`${sizeClasses[size]} rounded-2xl bg-gradient-to-br ${
          backgroundGradients[config.background] || backgroundGradients.default
        } flex items-center justify-center shadow-lg cursor-pointer relative overflow-hidden`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full" />
          <div className="absolute bottom-3 right-3 w-3 h-3 bg-white rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full" />
        </div>

        {/* Avatar layers */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Accessory on top */}
          {config.accessory && config.accessory !== 'none' && (
            <span className="absolute -top-1 z-20 text-xs">
              {accessoryEmojis[config.accessory]}
            </span>
          )}
          
          {/* Base avatar */}
          <span className="filter drop-shadow-lg">
            {getAvatarEmoji()}
          </span>
          
          {/* Outfit indicator */}
          {config.outfit && config.outfit !== 'default' && (
            <span className="absolute -bottom-1 text-xs opacity-80">
              {outfitEmojis[config.outfit]}
            </span>
          )}
        </div>

        {/* Shine effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        )}
      </MotionComponent>

      {/* Level badge */}
      {showLevel && (
        <motion.div
          className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 
            rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
        >
          {level}
        </motion.div>
      )}

      {/* Status indicator */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800" />
    </div>
  );
}

export const defaultAvatarConfig: AvatarConfig = {
  base: 'boy',
  skin: 'light',
  hair: 'short',
  hairColor: '#8B4513',
  outfit: 'default',
  accessory: 'none',
  background: 'ocean',
};

export const avatarPresets: { name: string; config: AvatarConfig }[] = [
  {
    name: 'Юный исследователь',
    config: {
      base: 'boy',
      skin: 'light',
      hair: 'short',
      hairColor: '#8B4513',
      outfit: 'explorer',
      accessory: 'none',
      background: 'ocean',
    },
  },
  {
    name: 'Водная фея',
    config: {
      base: 'girl',
      skin: 'light',
      hair: 'long',
      hairColor: '#FFD700',
      outfit: 'swimmer',
      accessory: 'flower',
      background: 'beach',
    },
  },
  {
    name: 'Морское существо',
    config: {
      base: 'creature',
      skin: 'blue',
      hair: 'spiky',
      hairColor: '#00CED1',
      outfit: 'diver',
      accessory: 'crown',
      background: 'ocean',
    },
  },
  {
    name: 'Учёный',
    config: {
      base: 'boy',
      skin: 'medium',
      hair: 'short',
      hairColor: '#000000',
      outfit: 'scientist',
      accessory: 'glasses',
      background: 'default',
    },
  },
];

export const unlockedOutfits = [
  { id: 'default', name: 'Обычная', level: 1, emoji: '👕' },
  { id: 'explorer', name: 'Исследователь', level: 2, emoji: '🧭' },
  { id: 'scientist', name: 'Учёный', level: 3, emoji: '👨‍🔬' },
  { id: 'warrior', name: 'Воин воды', level: 4, emoji: '🛡️' },
  { id: 'diver', name: 'Ныряльщик', level: 5, emoji: '🤿' },
];

export const unlockedAccessories = [
  { id: 'none', name: 'Нет', level: 1, emoji: '' },
  { id: 'hat', name: 'Шляпа', level: 1, emoji: '🎩' },
  { id: 'cap', name: 'Кепка', level: 2, emoji: '🧢' },
  { id: 'glasses', name: 'Очки', level: 2, emoji: '👓' },
  { id: 'sunglasses', name: 'Солнцезащитные', level: 3, emoji: '🕶️' },
  { id: 'flower', name: 'Цветок', level: 3, emoji: '🌸' },
  { id: 'tool', name: 'Инструмент', level: 4, emoji: '🔧' },
  { id: 'crown', name: 'Корона', level: 5, emoji: '👑' },
  { id: 'staff', name: 'Посох', level: 6, emoji: '🪄' },
];
