import {
  achievements,
  rarityConfig,
  categories,
  levels,
  Rarity,
  Category,
  Achievement,
  getAchievementsByCategory as getAchievementsByCategoryEn,
  getAchievementsByRarity as getAchievementsByRarityEn,
  getUnlockedAchievements as getUnlockedAchievementsEn,
  getLockedAchievements as getLockedAchievementsEn,
  getLevelByXP as getLevelByXPEn,
  getNextLevel as getNextLevelEn,
  getXPToNextLevel as getXPToNextLevelEn,
} from './achievements';
import { achievementsRu, rarityConfigRu, categoriesRu, levelsRu } from './achievements.ru';

export function getAchievements(locale: string): Achievement[] {
  return locale === 'ru' ? achievementsRu : achievements;
}

export function getRarityConfig(locale: string): Record<Rarity, { label: string; color: string; bg: string; border: string }> {
  return locale === 'ru' ? rarityConfigRu : rarityConfig;
}

export function getCategories(locale: string): Record<Category, { label: string; icon: string; color: string }> {
  return locale === 'ru' ? categoriesRu : categories;
}

export function getLevels(locale: string): typeof levels {
  return locale === 'ru' ? levelsRu : levels;
}

export function getAchievementsByCategory(locale: string, category: Category): Achievement[] {
  const data = getAchievements(locale);
  return data.filter(a => a.category === category);
}

export function getAchievementsByRarity(locale: string, rarity: Rarity): Achievement[] {
  const data = getAchievements(locale);
  return data.filter(a => a.rarity === rarity);
}

export function getUnlockedAchievements(locale: string): Achievement[] {
  const data = getAchievements(locale);
  return data.filter(a => a.unlocked);
}

export function getLockedAchievements(locale: string): Achievement[] {
  const data = getAchievements(locale);
  return data.filter(a => !a.unlocked);
}

export function getLevelByXP(locale: string, xp: number): typeof levels[0] {
  const lvlData = getLevels(locale);
  for (let i = lvlData.length - 1; i >= 0; i--) {
    if (xp >= lvlData[i].minXP) {
      return lvlData[i];
    }
  }
  return lvlData[0];
}

export function getNextLevel(locale: string, currentLevel: number): typeof levels[0] | null {
  const lvlData = getLevels(locale);
  const next = lvlData.find(l => l.level === currentLevel + 1);
  return next || null;
}

export function getXPToNextLevel(locale: string, xp: number): { current: number; needed: number; percent: number } {
  const currentLevel = getLevelByXP(locale, xp);
  const nextLevel = getNextLevel(locale, currentLevel.level);
  const lvlData = getLevels(locale);

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
}
