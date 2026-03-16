"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Tag,
  AlertCircle,
  CheckCircle,
  Loader2,
  Sparkles,
  Building2,
  Coins,
  Settings,
  Leaf,
  Users,
  Lock,
} from "lucide-react";

const categories = [
  { id: "TREASURY", label: "Казначейство", icon: Coins, color: "bg-yellow-500/20 text-yellow-400" },
  { id: "PROJECT_FUNDING", label: "Финансирование проектов", icon: Building2, color: "bg-blue-500/20 text-blue-400" },
  { id: "PLATFORM_UPGRADE", label: "Обновление платформы", icon: Settings, color: "bg-purple-500/20 text-purple-400" },
  { id: "PARAMETER_CHANGE", label: "Изменение параметров", icon: Settings, color: "bg-orange-500/20 text-orange-400" },
  { id: "ECOSYSTEM", label: "Экосистема", icon: Leaf, color: "bg-green-500/20 text-green-400" },
];

const templates = [
  {
    id: "funding",
    title: "Запрос финансирования проекта",
    description: "Шаблон для предложения о финансировании нового водного проекта",
    category: "PROJECT_FUNDING",
  },
  {
    id: "treasury",
    title: "Распределение казначейства",
    description: "Предложение по распределению средств из DAO казначейства",
    category: "TREASURY",
  },
  {
    id: "upgrade",
    title: "Обновление протокола",
    description: "Техническое обновление платформы или изменение параметров",
    category: "PLATFORM_UPGRADE",
  },
];

export default function CreateProposalPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    quorum: "10",
    threshold: "50",
    actions: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.title.trim()) newErrors.title = "Введите название предложения";
      if (formData.title.length < 10) newErrors.title = "Название должно быть не менее 10 символов";
      if (!formData.category) newErrors.category = "Выберите категорию";
    }
    
    if (currentStep === 2) {
      if (!formData.description.trim()) newErrors.description = "Введите описание";
      if (formData.description.length < 100) newErrors.description = "Описание должно быть не менее 100 символов";
    }
    
    if (currentStep === 3) {
      if (!formData.startDate) newErrors.startDate = "Выберите дату начала";
      if (!formData.endDate) newErrors.endDate = "Выберите дату окончания";
      if (formData.startDate && formData.endDate) {
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        if (end <= start) newErrors.endDate = "Дата окончания должна быть позже даты начала";
        const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
        if (diffDays < 3) newErrors.endDate = "Голосование должно длиться минимум 3 дня";
        if (diffDays > 30) newErrors.endDate = "Голосование не может длиться более 30 дней";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      router.push("/dao");
    }, 3000);
  };

  const applyTemplate = (template: typeof templates[0]) => {
    setFormData(prev => ({
      ...prev,
      title: template.title,
      category: template.category,
      description: template.description + "\n\n## Описание\n\nОпишите ваше предложение подробно...\n\n## Цели\n\n- Цель 1\n- Цель 2\n- Цель 3\n\n## Бюджет\n\nУкажите необходимый бюджет и распределение средств...",
    }));
    setStep(2);
  };

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
                Для создания предложения DAO необходимо войти в аккаунт.
              </p>
              <div className="space-y-3">
                <Link href="/login" className="block w-full btn-primary text-center">
                  Войти
                </Link>
                <Link href="/register" className="block w-full btn-outline text-center">
                  Создать аккаунт
                </Link>
                <Link href="/dao" className="block w-full text-water-200/50 hover:text-white text-center py-2 transition">
                  ← Назад к DAO
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
      </>
    );
  }

  if (showSuccess) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 max-w-md w-full text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Предложение создано!</h2>
            <p className="text-water-200/70 mb-6">
              Ваше предложение успешно отправлено и будет опубликовано после модерации.
            </p>
            <div className="flex gap-3">
              <Link href="/dao" className="flex-1 btn-primary">
                К предложениям
              </Link>
            </div>
          </motion.div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/dao"
              className="inline-flex items-center gap-2 text-water-200/70 hover:text-white mb-4 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Назад к предложениям
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Создание предложения</h1>
            <p className="text-water-200/70">
              Создайте предложение для голосования в DAO
            </p>
          </motion.div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {["Категория", "Описание", "Параметры", "Проверка"].map((label, index) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 ${
                    step > index + 1 ? "text-green-400" :
                    step === index + 1 ? "text-water-400" : "text-water-200/40"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step > index + 1 ? "bg-green-500/20" :
                    step === index + 1 ? "bg-water-500/20" : "bg-white/5"
                  }`}>
                    {step > index + 1 ? <CheckCircle className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className="hidden sm:block text-sm">{label}</span>
                </div>
              ))}
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-water-500 to-cyan-glow rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Step 1: Category & Title */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Templates */}
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">Шаблоны</h3>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => applyTemplate(template)}
                      className="p-4 bg-white/5 hover:bg-white/10 rounded-lg text-left transition text-sm"
                    >
                      <div className="font-medium text-white mb-1">{template.title}</div>
                      <div className="text-water-200/50 text-xs">{template.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Selection */}
              <div className="glass-card p-6">
                <label className="block text-sm font-medium text-white mb-4">
                  Категория предложения *
                </label>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                      className={`p-4 rounded-lg border-2 transition text-left ${
                        formData.category === cat.id
                          ? "border-water-500 bg-water-500/10"
                          : "border-transparent bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center mb-3`}>
                        <cat.icon className="w-5 h-5" />
                      </div>
                      <div className="font-medium text-white text-sm">{cat.label}</div>
                    </button>
                  ))}
                </div>
                {errors.category && (
                  <p className="mt-2 text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Title Input */}
              <div className="glass-card p-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Название предложения *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Краткое и понятное название вашего предложения"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-water-500 transition"
                />
                <div className="flex justify-between mt-2">
                  {errors.title ? (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.title}
                    </p>
                  ) : (
                    <span></span>
                  )}
                  <span className="text-water-200/40 text-sm">{formData.title.length}/200</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                  Далее
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Description */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="glass-card p-6">
                <label className="block text-sm font-medium text-white mb-2">
                  Описание предложения *
                </label>
                <p className="text-water-200/50 text-sm mb-4">
                  Опишите ваше предложение максимально подробно. Используйте markdown-разметку.
                </p>
                
                {/* Toolbar */}
                <div className="flex gap-2 mb-3 p-2 bg-white/5 rounded-lg">
                  {["B", "I", "H1", "H2", "•", "1.", "🔗", "🖼️"].map((tool) => (
                    <button
                      key={tool}
                      className="w-8 h-8 flex items-center justify-center text-water-200/70 hover:text-white hover:bg-white/10 rounded transition text-sm font-medium"
                    >
                      {tool}
                    </button>
                  ))}
                </div>
                
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="## Описание проблемы&#10;&#10;Опишите проблему или предложение...&#10;&#10;## Решение&#10;&#10;Предложите конкретное решение...&#10;&#10;## Ожидаемый результат&#10;&#10;Какой результат вы ожидаете получить..."
                  rows={15}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-water-500 transition font-mono text-sm"
                />
                <div className="flex justify-between mt-2">
                  {errors.description ? (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.description}
                    </p>
                  ) : (
                    <span></span>
                  )}
                  <span className="text-water-200/40 text-sm">{formData.description.length} символов</span>
                </div>
              </div>

              {/* Preview */}
              {formData.description.length > 50 && (
                <div className="glass-card p-6">
                  <h3 className="text-sm font-medium text-white mb-4">Предпросмотр</h3>
                  <div className="bg-white/5 rounded-lg p-4 prose prose-invert max-w-none">
                    <div className="text-water-200/80 whitespace-pre-wrap">
                      {formData.description.slice(0, 500)}
                      {formData.description.length > 500 && "..."}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="btn-secondary">
                  Назад
                </button>
                <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                  Далее
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Parameters */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Voting Period */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-water-400" />
                  Период голосования
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-water-200/70 mb-2">
                      Дата начала *
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                    />
                    {errors.startDate && (
                      <p className="mt-1 text-red-400 text-sm">{errors.startDate}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm text-water-200/70 mb-2">
                      Дата окончания *
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                    />
                    {errors.endDate && (
                      <p className="mt-1 text-red-400 text-sm">{errors.endDate}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-blue-500/10 rounded-lg flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-200/70">
                    Рекомендуемый период голосования: 7-14 дней. Минимум — 3 дня, максимум — 30 дней.
                  </p>
                </div>
              </div>

              {/* Voting Parameters */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-water-400" />
                  Параметры голосования
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-water-200/70 mb-2">
                      Кворум (%)
                    </label>
                    <input
                      type="number"
                      value={formData.quorum}
                      onChange={(e) => setFormData(prev => ({ ...prev, quorum: e.target.value }))}
                      min="1"
                      max="100"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                    />
                    <p className="mt-1 text-xs text-water-200/50">
                      Минимальный процент участников для валидности голосования
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-water-200/70 mb-2">
                      Порог принятия (%)
                    </label>
                    <input
                      type="number"
                      value={formData.threshold}
                      onChange={(e) => setFormData(prev => ({ ...prev, threshold: e.target.value }))}
                      min="1"
                      max="100"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                    />
                    <p className="mt-1 text-xs text-water-200/50">
                      Минимальный процент голосов "За" для принятия предложения
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="btn-secondary">
                  Назад
                </button>
                <button onClick={handleNext} className="btn-primary flex items-center gap-2">
                  Далее
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Проверка предложения</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                    <Tag className="w-5 h-5 text-water-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-water-200/50">Категория</div>
                      <div className="text-white">
                        {categories.find(c => c.id === formData.category)?.label}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                    <FileText className="w-5 h-5 text-water-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-water-200/50">Название</div>
                      <div className="text-white">{formData.title}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                    <Calendar className="w-5 h-5 text-water-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-water-200/50">Период голосования</div>
                      <div className="text-white">
                        {formData.startDate && new Date(formData.startDate).toLocaleString("ru-RU")} — {" "}
                        {formData.endDate && new Date(formData.endDate).toLocaleString("ru-RU")}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="text-sm text-water-200/50 mb-2">Описание</div>
                    <div className="text-white text-sm whitespace-pre-wrap max-h-40 overflow-y-auto">
                      {formData.description.slice(0, 500)}
                      {formData.description.length > 500 && "..."}
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-400 mb-1">Важно</div>
                  <p className="text-sm text-yellow-200/70">
                    После публикации предложение нельзя будет изменить. Убедитесь, что все данные верны. 
                    Предложение будет опубликовано после проверки модератором.
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(3)} className="btn-secondary">
                  Назад
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Создание...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Опубликовать предложение
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
