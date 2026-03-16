'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import LessonPlayer from '../../../components/LessonPlayer';
import { courses, Course, Lesson } from '../../../data/courses';

interface LessonPageProps {
  params: Promise<{ course: string; lesson: string }>;
}

export default function LessonPage({ params }: LessonPageProps) {
  // Моковые данные для демонстрации
  const courseId = 'water-basics';
  const lessonId = 1;
  
  const course = courses.find((c: Course) => c.id === courseId);
  
  if (!course) {
    notFound();
  }

  const lesson = course.lessons.find((l: Lesson) => l.id === lessonId);
  
  if (!lesson) {
    notFound();
  }

  const currentLessonIndex = course.lessons.findIndex((l: Lesson) => l.id === lessonId);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [totalXp, setTotalXp] = useState(0);

  const handleComplete = (xp: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      setTotalXp(totalXp + xp);
    }
  };

  const handleNext = () => {
    const nextLessonId = lessonId + 1;
    if (nextLessonId <= course.lessons.length) {
      window.location.href = `/learn/courses/${courseId}/lesson-${nextLessonId}`;
    }
  };

  const handlePrev = () => {
    const prevLessonId = lessonId - 1;
    if (prevLessonId >= 1) {
      window.location.href = `/learn/courses/${courseId}/lesson-${prevLessonId}`;
    }
  };

  const isCompleted = completedLessons.includes(lessonId);

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 text-sm">
            <Link href="/learn" className="text-slate-400 hover:text-white transition-colors">
              Портал
            </Link>
            <span className="text-slate-600">/</span>
            <Link href="/learn/courses" className="text-slate-400 hover:text-white transition-colors">
              Курсы
            </Link>
            <span className="text-slate-600">/</span>
            <Link href={`/learn/courses/${courseId}`} className="text-slate-400 hover:text-white transition-colors">
              {course.title}
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-400">Урок {lessonId}</span>
          </div>
        </motion.div>

        {/* Lesson Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <LessonPlayer
            lesson={lesson}
            courseId={courseId}
            courseTitle={course.title}
            totalLessons={course.lessons.length}
            currentLessonIndex={currentLessonIndex}
            onComplete={handleComplete}
            onNext={handleNext}
            onPrev={handlePrev}
            isCompleted={isCompleted}
          />
        </motion.div>

        {/* Next lessons preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h3 className="text-xl font-bold text-white mb-4">Следующие уроки</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {course.lessons.slice(currentLessonIndex + 1, currentLessonIndex + 4).map((nextLesson: Lesson, index: number) => (
              <Link key={nextLesson.id} href={`/learn/courses/${courseId}/lesson-${nextLesson.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-400 text-sm font-bold">
                      {nextLesson.id}
                    </div>
                    <span className="text-slate-400 text-xs">{nextLesson.duration}</span>
                  </div>
                  <p className="text-white font-medium text-sm line-clamp-2">{nextLesson.title}</p>
                  <div className="flex items-center gap-1 mt-2 text-amber-400 text-xs">
                    <Star className="w-3 h-3" />
                    <span>+{nextLesson.xp} XP</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
