import {
  courses,
  leaderboard,
  dailyFacts,
  quizQuestions,
  badges,
  Course,
} from './courses';
import { coursesRu, dailyFactsRu, quizQuestionsRu, badgesRu } from './courses.ru';

export function getCourses(locale: string): Course[] {
  return locale === 'ru' ? coursesRu : courses;
}

export function getDailyFacts(locale: string): typeof dailyFacts {
  return locale === 'ru' ? dailyFactsRu : dailyFacts;
}

export function getQuizQuestions(locale: string): typeof quizQuestions {
  return locale === 'ru' ? quizQuestionsRu : quizQuestions;
}

export function getBadges(locale: string): typeof badges {
  return locale === 'ru' ? badgesRu : badges;
}

// Leaderboard is empty by default, no translation needed
export function getLeaderboard(locale: string): typeof leaderboard {
  return leaderboard;
}
