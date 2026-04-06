import { worldNews, NewsItem, getNewsByScope as getNewsByScopeEn, getTrendingTags as getTrendingTagsEn } from './news';
import { worldNewsRu } from './news.ru';

export function getNews(locale: string): NewsItem[] {
  return locale === 'ru' ? worldNewsRu : worldNews;
}

export function getNewsByScope(locale: string, scope: string): NewsItem[] {
  const news = getNews(locale);
  if (scope === 'all') return news;
  return news.filter(item => item.scope === scope || item.scope === 'global');
}

export function getTrendingTags(locale: string): { tag: string; count: number }[] {
  const news = getNews(locale);
  const tagCounts: Record<string, number> = {};
  news.forEach(item => {
    item.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag, count]) => ({ tag, count }));
}
