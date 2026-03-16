'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  Palette, 
  Shirt, 
  Glasses, 
  Image as ImageIcon,
  Check,
  Lock,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import Avatar, { 
  AvatarConfig, 
  AvatarBase, 
  AvatarSkin, 
  AvatarHair,
  defaultAvatarConfig,
  avatarPresets,
  unlockedOutfits,
  unlockedAccessories
} from '../components/Avatar';
import { getLevelByXP } from '../data/achievements';

// Mock player data
const playerData = {
  xp: 450,
  unlockedOutfits: ['default', 'explorer', 'scientist'],
  unlockedAccessories: ['none', 'hat', 'cap', 'glasses'],
  unlockedBackgrounds: ['ocean', 'sunset', 'default'],
};

const baseOptions: { id: AvatarBase; emoji: string; label: string }[] = [
  { id: 'boy', emoji: '👦', label: 'Мальчик' },
  { id: 'girl', emoji: '👧', label: 'Девочка' },
  { id: 'creature', emoji: '🧜', label: 'Существо' },
];

const skinOptions: { id: AvatarSkin; emoji: string; label: string }[] = [
  { id: 'light', emoji: '🏻', label: 'Светлая' },
  { id: 'medium', emoji: '🏽', label: 'Средняя' },
  { id: 'dark', emoji: '🏿', label: 'Тёмная' },
  { id: 'blue', emoji: '🔵', label: 'Синяя' },
  { id: 'green', emoji: '🟢', label: 'Зелёная' },
];

const hairOptions: { id: AvatarHair; emoji: string; label: string }[] = [
  { id: 'short', emoji: '👦', label: 'Короткие' },
  { id: 'long', emoji: '👩', label: 'Длинные' },
  { id: 'spiky', emoji: '🎸', label: 'Ирокез' },
  { id: 'curly', emoji: '🌀', label: 'Кудрявые' },
  { id: 'none', emoji: '👨‍🦲', label: 'Нет' },
];

const hairColors = [
  '#000000', '#8B4513', '#FFD700', '#FF6B6B', '#4ECDC4', 
  '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF69B4'
];

const backgroundOptions: { id: string; gradient: string; label: string; level: number }[] = [
  { id: 'ocean', gradient: 'from-blue-500 to-cyan-500', label: 'Океан', level: 1 },
  { id: 'sunset', gradient: 'from-orange-500 to-pink-500', label: 'Закат', level: 1 },
  { id: 'forest', gradient: 'from-green-500 to-emerald-500', label: 'Лес', level: 2 },
  { id: 'space', gradient: 'from-purple-500 to-indigo-500', label: 'Космос', level: 3 },
  { id: 'beach', gradient: 'from-yellow-400 to-orange-400', label: 'Пляж', level: 4 },
  { id: 'arctic', gradient: 'from-cyan-300 to-blue-300', label: 'Арктика', level: 5 },
  { id: 'default', gradient: 'from-gray-700 to-gray-800', label: 'Классика', level: 1 },
];

type TabType = 'base' | 'appearance' | 'outfit' | 'accessories' | 'background';

export default function AvatarPage() {
  const [config, setConfig] = useState<AvatarConfig>(defaultAvatarConfig);
  const [activeTab, setActiveTab] = useState<TabType>('base');
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const playerLevel = getLevelByXP(playerData.xp).level;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }, 1000);
  };

  const tabs: { id: TabType; label: string; icon: typeof ArrowLeft }[] = [
    { id: 'base', label: 'База', icon: Palette },
    { id: 'appearance', label: 'Внешность', icon: Palette },
    { id: 'outfit', label: 'Одежда', icon: Shirt },
    { id: 'accessories', label: 'Аксессуары', icon: Glasses },
    { id: 'background', label: 'Фон', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link 
                href="/play"
                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center
                  hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </Link>
              <div>
                <h1 className="font-bold text-white">Аватар</h1>
                <p className="text-xs text-gray-400">Создай уникального персонажа</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setConfig(defaultAvatarConfig)}
                className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center
                  hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Сбросить"
              >
                <RotateCcw className="w-4 h-4 text-gray-400" />
              </motion.button>
              
              <motion.button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r 
                  from-blue-500 to-cyan-500 text-white font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSaving ? (
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : showSaved ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                  {isSaving ? 'Сохранение...' : showSaved ? 'Сохранено!' : 'Сохранить'}
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Avatar Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 space-y-4">
              {/* Large Preview */}
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl p-8 
                border border-gray-700 flex flex-col items-center">
                <Avatar config={config} size="xl" animated showLevel level={playerLevel} />
                
                <div className="mt-6 text-center">
                  <h2 className="font-bold text-white text-lg">Твой аватар</h2>
                  <p className="text-sm text-gray-400 mt-1">Уровень {playerLevel}</p>
                </div>

                {/* Quick Presets */}
                <div className="w-full mt-6 pt-6 border-t border-gray-700">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Быстрые пресеты</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {avatarPresets.map((preset) => (
                      <motion.button
                        key={preset.name}
                        onClick={() => setConfig(preset.config)}
                        className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors text-left"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 
                            flex items-center justify-center text-lg">
                            {baseEmojis[preset.config.base]}
                          </div>
                          <span className="text-xs text-gray-300">{preset.name}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Unlock Progress */}
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-4 
                border border-gray-700">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Разблокировано</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Одежда</span>
                    <span className="text-white">
                      {playerData.unlockedOutfits.length} / {unlockedOutfits.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Аксессуары</span>
                    <span className="text-white">
                      {playerData.unlockedAccessories.length} / {unlockedAccessories.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Фоны</span>
                    <span className="text-white">
                      {playerData.unlockedBackgrounds.length} / {backgroundOptions.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Customization Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl 
              border border-gray-700 overflow-hidden">
              {/* Tabs */}
              <div className="flex overflow-x-auto border-b border-gray-700 scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap
                      transition-colors relative ${
                      activeTab === tab.id ? 'text-white' : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r 
                          from-blue-500 to-cyan-500"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Base Character */}
                {activeTab === 'base' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-3">Базовый персонаж</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {baseOptions.map((option) => (
                          <motion.button
                            key={option.id}
                            onClick={() => setConfig({ ...config, base: option.id })}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              config.base === option.id
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="text-3xl">{option.emoji}</span>
                            <span className="block text-sm text-gray-300 mt-2">{option.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Appearance */}
                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    {/* Skin */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-3">Цвет кожи</h3>
                      <div className="grid grid-cols-5 gap-3">
                        {skinOptions.map((option) => (
                          <motion.button
                            key={option.id}
                            onClick={() => setConfig({ ...config, skin: option.id })}
                            className={`p-3 rounded-xl border-2 transition-all ${
                              config.skin === option.id
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="text-2xl">{option.emoji}</span>
                            <span className="block text-xs text-gray-400 mt-1">{option.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Hair */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-3">Причёска</h3>
                      <div className="grid grid-cols-5 gap-3">
                        {hairOptions.map((option) => (
                          <motion.button
                            key={option.id}
                            onClick={() => setConfig({ ...config, hair: option.id })}
                            className={`p-3 rounded-xl border-2 transition-all ${
                              config.hair === option.id
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="text-2xl">{option.emoji}</span>
                            <span className="block text-xs text-gray-400 mt-1">{option.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Hair Color */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-3">Цвет волос</h3>
                      <div className="flex flex-wrap gap-2">
                        {hairColors.map((color) => (
                          <motion.button
                            key={color}
                            onClick={() => setConfig({ ...config, hairColor: color })}
                            className={`w-10 h-10 rounded-xl border-2 transition-all ${
                              config.hairColor === color
                                ? 'border-white scale-110'
                                : 'border-transparent hover:scale-105'
                            }`}
                            style={{ backgroundColor: color }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Outfit */}
                {activeTab === 'outfit' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-3">Одежда</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {unlockedOutfits.map((outfit) => {
                          const isUnlocked = playerData.unlockedOutfits.includes(outfit.id);
                          const isSelected = config.outfit === outfit.id;
                          
                          return (
                            <motion.button
                              key={outfit.id}
                              onClick={() => isUnlocked && setConfig({ ...config, outfit: outfit.id })}
                              disabled={!isUnlocked}
                              className={`p-4 rounded-xl border-2 transition-all relative ${
                                isSelected
                                  ? 'border-blue-500 bg-blue-500/10'
                                  : isUnlocked
                                  ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                                  : 'border-gray-800 bg-gray-800/50 opacity-50 cursor-not-allowed'
                              }`}
                              whileHover={isUnlocked ? { scale: 1.02 } : {}}
                              whileTap={isUnlocked ? { scale: 0.98 } : {}}
                            >
                              <span className="text-3xl">{outfit.emoji}</span>
                              <span className="block text-sm text-gray-300 mt-2">{outfit.name}</span>
                              
                              {!isUnlocked && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 rounded-xl">
                                  <div className="text-center">
                                    <Lock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                                    <span className="text-xs text-gray-400">Ур. {outfit.level}</span>
                                  </div>
                                </div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Accessories */}
                {activeTab === 'accessories' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-3">Аксессуары</h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {unlockedAccessories.map((acc) => {
                          const isUnlocked = playerData.unlockedAccessories.includes(acc.id);
                          const isSelected = config.accessory === acc.id;
                          
                          return (
                            <motion.button
                              key={acc.id}
                              onClick={() => isUnlocked && setConfig({ ...config, accessory: acc.id })}
                              disabled={!isUnlocked}
                              className={`p-4 rounded-xl border-2 transition-all relative ${
                                isSelected
                                  ? 'border-blue-500 bg-blue-500/10'
                                  : isUnlocked
                                  ? 'border-gray-700 bg-gray-800 hover:border-gray-600'
                                  : 'border-gray-800 bg-gray-800/50 opacity-50 cursor-not-allowed'
                              }`}
                              whileHover={isUnlocked ? { scale: 1.02 } : {}}
                              whileTap={isUnlocked ? { scale: 0.98 } : {}}
                            >
                              <span className="text-2xl">{acc.emoji || '❌'}</span>
                              <span className="block text-xs text-gray-300 mt-2">{acc.name}</span>
                              
                              {!isUnlocked && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 rounded-xl">
                                  <div className="text-center">
                                    <Lock className="w-3 h-3 text-gray-400 mx-auto mb-1" />
                                    <span className="text-xs text-gray-400">Ур. {acc.level}</span>
                                  </div>
                                </div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Background */}
                {activeTab === 'background' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-3">Фон профиля</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {backgroundOptions.map((bg) => {
                          const isUnlocked = playerData.unlockedBackgrounds.includes(bg.id);
                          const isSelected = config.background === bg.id;
                          
                          return (
                            <motion.button
                              key={bg.id}
                              onClick={() => isUnlocked && setConfig({ ...config, background: bg.id })}
                              disabled={!isUnlocked}
                              className={`p-4 rounded-xl border-2 transition-all relative ${
                                isSelected
                                  ? 'border-white'
                                  : isUnlocked
                                  ? 'border-gray-700 hover:border-gray-600'
                                  : 'border-gray-800 opacity-50 cursor-not-allowed'
                              }`}
                              whileHover={isUnlocked ? { scale: 1.02 } : {}}
                              whileTap={isUnlocked ? { scale: 0.98 } : {}}
                            >
                              <div className={`h-16 rounded-lg bg-gradient-to-br ${bg.gradient}`} />
                              <span className="block text-sm text-gray-300 mt-2">{bg.label}</span>
                              
                              {!isUnlocked && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60 rounded-xl">
                                  <div className="text-center">
                                    <Lock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                                    <span className="text-xs text-gray-400">Ур. {bg.level}</span>
                                  </div>
                                </div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

const baseEmojis: Record<AvatarBase, string> = {
  boy: '👦',
  girl: '👧',
  creature: '🧜',
};
