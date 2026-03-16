export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'story' | 'family';
  xpReward: number;
  badgeReward?: string;
  itemReward?: string;
  completed: boolean;
  progress: number;
  target: number;
  icon: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  xp: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
}

export interface Level {
  level: number;
  name: string;
  minXP: number;
  badge: string;
  color: string;
}

export const levels: Level[] = [
  { level: 1, name: 'Новичок', minXP: 0, badge: '🌱', color: 'from-green-400 to-green-600' },
  { level: 2, name: 'Исследователь', minXP: 100, badge: '🔍', color: 'from-blue-400 to-blue-600' },
  { level: 3, name: 'Страж воды', minXP: 300, badge: '🛡️', color: 'from-cyan-400 to-cyan-600' },
  { level: 4, name: 'Эксперт', minXP: 600, badge: '🔬', color: 'from-violet-400 to-violet-600' },
  { level: 5, name: 'Герой', minXP: 1000, badge: '🏆', color: 'from-amber-400 to-amber-600' },
  { level: 6, name: 'Легенда', minXP: 2000, badge: '👑', color: 'from-pink-400 to-pink-600' },
];

export const achievements: Achievement[] = [
  { id: 'first_check', name: 'Первый шаг', description: 'Сделай первое измерение', xp: 50, rarity: 'common', icon: 'Droplets', unlocked: false },
  { id: 'water_saver', name: 'Спаситель', description: 'Сохрани 100 литров воды', xp: 100, rarity: 'common', icon: 'Heart', unlocked: false, progress: 0, target: 100 },
  { id: 'social_butterfly', name: 'Общительный', description: 'Пригласи 5 друзей', xp: 200, rarity: 'rare', icon: 'Users', unlocked: false, progress: 0, target: 5 },
  { id: 'data_master', name: 'Аналитик', description: 'Сделай 50 измерений', xp: 300, rarity: 'rare', icon: 'BarChart', unlocked: false, progress: 0, target: 50 },
  { id: 'family_hero', name: 'Семейный герой', description: 'Заверши 10 семейных квестов', xp: 500, rarity: 'epic', icon: 'Home', unlocked: false, progress: 0, target: 10 },
  { id: 'water_legend', name: 'Легенда воды', description: 'Достигни 2000 XP', xp: 1000, rarity: 'legendary', icon: 'Crown', unlocked: false },
  { id: 'eco_warrior', name: 'Эко-воин', description: 'Пройди все курсы', xp: 400, rarity: 'epic', icon: 'Leaf', unlocked: false },
  { id: 'daily_streak', name: 'Непрерывный', description: '7 дней подряд заходи в приложение', xp: 150, rarity: 'rare', icon: 'Zap', unlocked: false, progress: 0, target: 7 },
];

export const quests: Quest[] = [
  // Daily quests
  { id: 'd1', title: 'Проверь качество воды', description: 'Сделай измерение сегодня', type: 'daily', xpReward: 20, progress: 0, target: 1, icon: '💧', completed: false },
  { id: 'd2', title: 'Узнай что-то новое', description: 'Прочитай факт о воде', type: 'daily', xpReward: 10, progress: 0, target: 1, icon: '📚', completed: false },
  { id: 'd3', title: 'Поделись знаниями', description: 'Поделись фактом с другом', type: 'daily', xpReward: 30, progress: 0, target: 1, icon: '📤', completed: false },
  
  // Weekly quests
  { id: 'w1', title: 'Мастер измерений', description: 'Сделай 5 измерений за неделю', type: 'weekly', xpReward: 100, progress: 0, target: 5, icon: '📊', completed: false },
  { id: 'w2', title: 'Ученик', description: 'Пройди 3 урока', type: 'weekly', xpReward: 150, progress: 0, target: 3, icon: '🎓', completed: false },
  { id: 'w3', title: 'Социальный герой', description: 'Пригласи 2 друзей', type: 'weekly', xpReward: 200, badgeReward: 'Друг воды', progress: 0, target: 2, icon: '👥', completed: false },
  
  // Story quests
  { id: 's1', title: 'Спаси реку', description: 'Найди источник загрязнения в реке', type: 'story', xpReward: 500, badgeReward: 'Спаситель рек', itemReward: '🔱 Трезубец защитника', progress: 0, target: 1, icon: '🌊', completed: false },
  { id: 's2', title: 'Тайна озера', description: 'Исследуй загадочное озеро', type: 'story', xpReward: 400, itemReward: '🔍 Лупа исследователя', progress: 0, target: 1, icon: '🏞️', completed: false },
  
  // Family quests
  { id: 'f1', title: 'Семейный выходной', description: 'Вся семья делает измерения', type: 'family', xpReward: 300, badgeReward: 'Семейная команда', progress: 0, target: 3, icon: '👨‍👩‍👧', completed: false },
  { id: 'f2', title: 'Эко-челлендж', description: 'Неделя без пластика', type: 'family', xpReward: 500, progress: 0, target: 7, icon: '♻️', completed: false },
];

export const getQuestsByType = (type: Quest['type']) => quests.filter(q => q.type === type);
export const getAchievementsByRarity = (rarity: Achievement['rarity']) => achievements.filter(a => a.rarity === rarity);
