export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
export type Category = 'explorer' | 'saver' | 'scientist' | 'social' | 'family';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  rarity: Rarity;
  icon: string;
  category: Category;
  requirement: {
    type: string;
    value: number;
  };
  unlocked: boolean;
  unlockedAt?: string;
  progress?: {
    current: number;
    total: number;
  };
}

export const rarityConfig: Record<Rarity, { label: string; color: string; bg: string; border: string }> = {
  common: {
    label: 'Обычная',
    color: 'text-gray-300',
    bg: 'bg-gray-500/20',
    border: 'border-gray-400',
  },
  rare: {
    label: 'Редкая',
    color: 'text-blue-300',
    bg: 'bg-blue-500/20',
    border: 'border-blue-400',
  },
  epic: {
    label: 'Эпическая',
    color: 'text-purple-300',
    bg: 'bg-purple-500/20',
    border: 'border-purple-400',
  },
  legendary: {
    label: 'Легендарная',
    color: 'text-yellow-300',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-400',
  },
};

export const categories: Record<Category, { label: string; icon: string; color: string }> = {
  explorer: { label: 'Исследователь', icon: '🔍', color: 'text-emerald-400' },
  saver: { label: 'Спаситель', icon: '💧', color: 'text-cyan-400' },
  scientist: { label: 'Учёный', icon: '🔬', color: 'text-purple-400' },
  social: { label: 'Социальный', icon: '🌐', color: 'text-pink-400' },
  family: { label: 'Семейный', icon: '👨‍👩‍👧‍👦', color: 'text-orange-400' },
};

export const levels = [
  { level: 1, name: 'Новичок', minXP: 0, badge: '🌱', color: 'from-green-400 to-green-600' },
  { level: 2, name: 'Исследователь', minXP: 100, badge: '🔍', color: 'from-blue-400 to-blue-600' },
  { level: 3, name: 'Страж воды', minXP: 300, badge: '🛡️', color: 'from-cyan-400 to-cyan-600' },
  { level: 4, name: 'Эксперт', minXP: 600, badge: '🔬', color: 'from-purple-400 to-purple-600' },
  { level: 5, name: 'Герой', minXP: 1000, badge: '🏆', color: 'from-orange-400 to-orange-600' },
  { level: 6, name: 'Легенда', minXP: 2000, badge: '👑', color: 'from-yellow-400 to-yellow-600' },
];

export const achievements: Achievement[] = [
  // Explorer - Исследователь
  {
    id: 'first_check',
    name: 'Первый шаг',
    description: 'Сделай первое измерение',
    xpReward: 50,
    rarity: 'common',
    icon: 'Droplets',
    category: 'explorer',
    requirement: { type: 'measurements', value: 1 },
    unlocked: true,
    unlockedAt: '2026-03-01',
  },
  {
    id: 'explorer_zones',
    name: 'Исследователь зон',
    description: 'Открой все 6 зон игрового мира',
    xpReward: 200,
    rarity: 'rare',
    icon: 'Map',
    category: 'explorer',
    requirement: { type: 'zones', value: 6 },
    unlocked: false,
    progress: { current: 3, total: 6 },
  },
  {
    id: 'world_traveler',
    name: 'Путешественник',
    description: 'Посети все зоны по 10 раз',
    xpReward: 500,
    rarity: 'epic',
    icon: 'Globe',
    category: 'explorer',
    requirement: { type: 'zone_visits', value: 60 },
    unlocked: false,
    progress: { current: 15, total: 60 },
  },

  // Saver - Спаситель
  {
    id: 'water_saver',
    name: 'Спаситель',
    description: 'Сохрани 100 литров воды',
    xpReward: 100,
    rarity: 'common',
    icon: 'Heart',
    category: 'saver',
    requirement: { type: 'water_saved', value: 100 },
    unlocked: true,
    unlockedAt: '2026-03-05',
  },
  {
    id: 'water_warrior',
    name: 'Воин воды',
    description: 'Сохрани 1000 литров воды',
    xpReward: 300,
    rarity: 'rare',
    icon: 'Shield',
    category: 'saver',
    requirement: { type: 'water_saved', value: 1000 },
    unlocked: false,
    progress: { current: 450, total: 1000 },
  },
  {
    id: 'ocean_guardian',
    name: 'Страж океана',
    description: 'Сохрани 10000 литров воды',
    xpReward: 1000,
    rarity: 'legendary',
    icon: 'Anchor',
    category: 'saver',
    requirement: { type: 'water_saved', value: 10000 },
    unlocked: false,
    progress: { current: 450, total: 10000 },
  },

  // Scientist - Учёный
  {
    id: 'data_master',
    name: 'Аналитик',
    description: 'Сделай 50 измерений',
    xpReward: 300,
    rarity: 'rare',
    icon: 'BarChart',
    category: 'scientist',
    requirement: { type: 'measurements', value: 50 },
    unlocked: false,
    progress: { current: 23, total: 50 },
  },
  {
    id: 'researcher',
    name: 'Исследователь',
    description: 'Пройди 5 курсов обучения',
    xpReward: 200,
    rarity: 'common',
    icon: 'BookOpen',
    category: 'scientist',
    requirement: { type: 'courses', value: 5 },
    unlocked: false,
    progress: { current: 2, total: 5 },
  },
  {
    id: 'data_scientist',
    name: 'Дата-сайентист',
    description: 'Сделай 200 измерений',
    xpReward: 800,
    rarity: 'epic',
    icon: 'Database',
    category: 'scientist',
    requirement: { type: 'measurements', value: 200 },
    unlocked: false,
    progress: { current: 23, total: 200 },
  },

  // Social - Социальный
  {
    id: 'social_butterfly',
    name: 'Общительный',
    description: 'Пригласи 5 друзей',
    xpReward: 200,
    rarity: 'rare',
    icon: 'Users',
    category: 'social',
    requirement: { type: 'friends', value: 5 },
    unlocked: false,
    progress: { current: 2, total: 5 },
  },
  {
    id: 'influencer',
    name: 'Влиятельный',
    description: 'Поделись результатами 20 раз',
    xpReward: 300,
    rarity: 'rare',
    icon: 'Share2',
    category: 'social',
    requirement: { type: 'shares', value: 20 },
    unlocked: false,
    progress: { current: 8, total: 20 },
  },
  {
    id: 'community_leader',
    name: 'Лидер сообщества',
    description: 'Пригласи 20 друзей',
    xpReward: 800,
    rarity: 'epic',
    icon: 'Award',
    category: 'social',
    requirement: { type: 'friends', value: 20 },
    unlocked: false,
    progress: { current: 2, total: 20 },
  },

  // Family - Семейный
  {
    id: 'family_hero',
    name: 'Семейный герой',
    description: 'Заверши 10 семейных квестов',
    xpReward: 500,
    rarity: 'epic',
    icon: 'Home',
    category: 'family',
    requirement: { type: 'family_quests', value: 10 },
    unlocked: false,
    progress: { current: 4, total: 10 },
  },
  {
    id: 'family_creator',
    name: 'Основатель клана',
    description: 'Создай семейный клан',
    xpReward: 200,
    rarity: 'common',
    icon: 'UserPlus',
    category: 'family',
    requirement: { type: 'clan_created', value: 1 },
    unlocked: true,
    unlockedAt: '2026-03-10',
  },
  {
    id: 'clan_champion',
    name: 'Чемпион клана',
    description: 'Приведи свой клан в топ-10',
    xpReward: 1000,
    rarity: 'legendary',
    icon: 'Trophy',
    category: 'family',
    requirement: { type: 'clan_rank', value: 10 },
    unlocked: false,
  },

  // Legendary
  {
    id: 'water_legend',
    name: 'Легенда воды',
    description: 'Достигни 2000 XP',
    xpReward: 1000,
    rarity: 'legendary',
    icon: 'Crown',
    category: 'explorer',
    requirement: { type: 'xp', value: 2000 },
    unlocked: false,
    progress: { current: 450, total: 2000 },
  },
];

export const getAchievementsByCategory = (category: Category): Achievement[] => {
  return achievements.filter(a => a.category === category);
};

export const getAchievementsByRarity = (rarity: Rarity): Achievement[] => {
  return achievements.filter(a => a.rarity === rarity);
};

export const getUnlockedAchievements = (): Achievement[] => {
  return achievements.filter(a => a.unlocked);
};

export const getLockedAchievements = (): Achievement[] => {
  return achievements.filter(a => !a.unlocked);
};

export const getLevelByXP = (xp: number): typeof levels[0] => {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].minXP) {
      return levels[i];
    }
  }
  return levels[0];
};

export const getNextLevel = (currentLevel: number): typeof levels[0] | null => {
  const next = levels.find(l => l.level === currentLevel + 1);
  return next || null;
};

export const getXPToNextLevel = (xp: number): { current: number; needed: number; percent: number } => {
  const currentLevel = getLevelByXP(xp);
  const nextLevel = getNextLevel(currentLevel.level);
  
  if (!nextLevel) {
    return { current: xp, needed: xp, percent: 100 };
  }
  
  const xpInCurrentLevel = xp - currentLevel.minXP;
  const xpNeededForNext = nextLevel.minXP - currentLevel.minXP;
  const percent = Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNext) * 100));
  
  return {
    current: xpInCurrentLevel,
    needed: xpNeededForNext,
    percent,
  };
};
