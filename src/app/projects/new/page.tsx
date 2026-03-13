"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  FolderOpen,
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  Check,
  ChevronLeft,
  Loader2,
  Lock,
} from "lucide-react";

const projectTypes = [
  { value: "INFRASTRUCTURE", label: "Инфраструктура", desc: "Модернизация и строительство" },
  { value: "RESTORATION", label: "Восстановление", desc: "Восстановление экосистем" },
  { value: "RESEARCH", label: "Исследования", desc: "Научные изыскания" },
  { value: "MONITORING", label: "Мониторинг", desc: "Сбор и анализ данных" },
  { value: "EDUCATION", label: "Образование", desc: "Обучающие программы" },
  { value: "TECHNOLOGY", label: "Технологии", desc: "Разработка решений" },
];

const categories = [
  { value: "WATER_TREATMENT", label: "Очистка воды" },
  { value: "INFRASTRUCTURE", label: "Инфраструктура" },
  { value: "CONSERVATION", label: "Сохранение" },
  { value: "RESEARCH", label: "Исследования" },
  { value: "COMMUNITY", label: "Сообщество" },
];

const sdgGoals = [
  { id: 6, label: "Чистая вода и санитария" },
  { id: 9, label: "Инновации и инфраструктура" },
  { id: 11, label: "Устойчивые города" },
  { id: 13, label: "Климат" },
  { id: 15, label: "Жизнь на суше" },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    type: "",
    category: "",
    country: "",
    region: "",
    city: "",
    targetAmount: "",
    minStake: "100",
    expectedApy: "15",
    esgScore: "",
    sdgGoals: [] as number[],
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.data.user);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          targetAmount: formData.targetAmount ? parseFloat(formData.targetAmount) : undefined,
          minStake: parseFloat(formData.minStake),
          expectedApy: formData.expectedApy ? parseFloat(formData.expectedApy) : undefined,
          esgScore: formData.esgScore ? parseInt(formData.esgScore) : undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/projects/${data.data.project.slug}`);
      }
    } catch (error) {
      console.error("Create project error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSDG = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      sdgGoals: prev.sdgGoals.includes(id)
        ? prev.sdgGoals.filter((g) => g !== id)
        : [...prev.sdgGoals, id],
    }));
  };

  const canProceed = () => {
    if (step === 1) return formData.name && formData.shortDescription && formData.description;
    if (step === 2) return formData.type && formData.category && formData.country;
    if (step === 3) return formData.targetAmount && formData.expectedApy;
    return true;
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin" />
        </main>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-water-500/20 flex items-center justify-center">
                <Lock className="w-10 h-10 text-water-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">
                Требуется авторизация
              </h1>
              <p className="text-water-200/70 mb-8">
                Для создания проекта необходимо войти в аккаунт.
              </p>
              <div className="space-y-3">
                <Link href="/login" className="block w-full btn-primary text-center">
                  Войти
                </Link>
                <Link href="/register" className="block w-full btn-outline text-center">
                  Создать аккаунт
                </Link>
                <Link href="/projects" className="block w-full text-water-200/50 hover:text-white text-center py-2 transition">
                  ← Назад к проектам
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-water-200/70 hover:text-white mb-4 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Назад
            </button>
            <h1 className="text-3xl font-bold text-white mb-2">
              Создание проекта
            </h1>
            <p className="text-water-200/70">
              Создайте новый проект для экосистемы LoopOrb
            </p>
          </motion.div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition ${
                  s <= step ? "bg-water-500" : "bg-white/10"
                }`}
              />
            ))}
          </div>

          {/* Form Steps */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-water-400" />
                  Основная информация
                </h2>

                <div>
                  <label className="block text-sm font-medium text-water-200/80 mb-2">
                    Название проекта *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="Например: Восстановление Аральского моря"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-water-200/80 mb-2">
                    Краткое описание *
                  </label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, shortDescription: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="Краткое описание проекта (10-200 символов)"
                    maxLength={200}
                  />
                  <div className="text-right text-xs text-water-200/40 mt-1">
                    {formData.shortDescription.length}/200
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-water-200/80 mb-2">
                    Полное описание *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition resize-none"
                    placeholder="Подробное описание проекта, цели, задачи, ожидаемые результаты..."
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-water-400" />
                  Категоризация
                </h2>

                <div>
                  <label className="block text-sm font-medium text-water-200/80 mb-2">
                    Тип проекта *
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {projectTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setFormData({ ...formData, type: type.value })}
                        className={`p-4 rounded-lg border text-left transition ${
                          formData.type === type.value
                            ? "border-water-500 bg-water-500/20"
                            : "border-white/10 bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <div className="font-medium text-white">{type.label}</div>
                        <div className="text-sm text-water-200/60">{type.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-water-200/80 mb-2">
                    Категория *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition appearance-none"
                  >
                    <option value="" className="bg-ocean-deep">
                      Выберите категорию
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value} className="bg-ocean-deep">
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-water-200/80 mb-2">
                      Страна *
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                      placeholder="Узбекистан"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-water-200/80 mb-2">
                      Регион
                    </label>
                    <input
                      type="text"
                      value={formData.region}
                      onChange={(e) =>
                        setFormData({ ...formData, region: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                      placeholder="Каракалпакстан"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-water-200/80 mb-2">
                      Город
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                      placeholder="Нукус"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-water-400" />
                  Финансирование
                </h2>

                <div>
                  <label className="block text-sm font-medium text-water-200/80 mb-2">
                    Целевая сумма (USD) *
                  </label>
                  <input
                    type="number"
                    value={formData.targetAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, targetAmount: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="500000"
                    min="0"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-water-200/80 mb-2">
                      Минимальный стейк (UNITY) *
                    </label>
                    <input
                      type="number"
                      value={formData.minStake}
                      onChange={(e) =>
                        setFormData({ ...formData, minStake: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                      placeholder="100"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-water-200/80 mb-2">
                      Ожидаемый APY (%)
                    </label>
                    <input
                      type="number"
                      value={formData.expectedApy}
                      onChange={(e) =>
                        setFormData({ ...formData, expectedApy: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                      placeholder="15"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-water-200/80 mb-2">
                    ESG Score (0-100)
                  </label>
                  <input
                    type="number"
                    value={formData.esgScore}
                    onChange={(e) =>
                      setFormData({ ...formData, esgScore: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="85"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-water-200/80 mb-2">
                    Цели SDG
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sdgGoals.map((goal) => (
                      <button
                        key={goal.id}
                        onClick={() => toggleSDG(goal.id)}
                        className={`px-3 py-2 rounded-lg text-sm transition ${
                          formData.sdgGoals.includes(goal.id)
                            ? "bg-green-500/20 text-green-400 border border-green-500/50"
                            : "bg-white/5 text-water-200/70 border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {goal.id}. {goal.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-water-400" />
                  Таймлайн
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-water-200/80 mb-2">
                      Дата начала
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        setFormData({ ...formData, startDate: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-water-200/80 mb-2">
                      Дата окончания
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        setFormData({ ...formData, endDate: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="p-4 bg-white/5 rounded-lg space-y-2">
                  <h3 className="font-medium text-white">Проверьте данные:</h3>
                  <div className="text-sm text-water-200/70">
                    <p><span className="text-water-200/50">Название:</span> {formData.name}</p>
                    <p><span className="text-water-200/50">Тип:</span> {projectTypes.find(t => t.value === formData.type)?.label}</p>
                    <p><span className="text-water-200/50">Локация:</span> {formData.country}{formData.region ? `, ${formData.region}` : ""}</p>
                    <p><span className="text-water-200/50">Целевая сумма:</span> ${formData.targetAmount || "0"}</p>
                    <p><span className="text-water-200/50">APY:</span> {formData.expectedApy}%</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
              <button
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className="px-6 py-2 text-water-200/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Назад
              </button>

              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Далее
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Создание...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Создать проект
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
