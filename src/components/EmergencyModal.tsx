"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  AlertTriangle,
  Droplets,
  Fish,
  Palette,
  Upload,
  MapPin,
  Navigation,
  Check,
  ChevronRight,
  ChevronLeft,
  Camera,
  Video,
  Loader2,
  Sparkles,
  Trophy,
  DollarSign,
} from "lucide-react";

/**
 * Типы происшествий
 */
export type IncidentType = "spill" | "fish_death" | "color_change" | "other";

/**
 * Данные отчёта о чрезвычайной ситуации
 */
export interface EmergencyReportData {
  incidentType: IncidentType;
  description: string;
  mediaFiles: File[];
  mediaPreviews: string[];
  location: {
    lat: number | null;
    lng: number | null;
    address?: string;
  };
  contactEmail?: string;
  contactPhone?: string;
}

/**
 * Шаги модального окна
 */
type Step = "type" | "media" | "confirm";

/**
 * Опции типов происшествий
 */
const INCIDENT_TYPES: {
  id: IncidentType;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  rewardRange: string;
}[] = [
  {
    id: "spill",
    label: "Разлив веществ",
    description: "Химический разлив, нефтепродукты, опасные вещества",
    icon: Droplets,
    color: "from-amber-500 to-orange-600",
    rewardRange: "$100-500",
  },
  {
    id: "fish_death",
    label: "Гибель рыбы",
    description: "Массовая гибель водных организмов",
    icon: Fish,
    color: "from-red-500 to-rose-600",
    rewardRange: "$50-300",
  },
  {
    id: "color_change",
    label: "Изменение цвета воды",
    description: "Неестественное изменение цвета, цветение водорослей",
    icon: Palette,
    color: "from-purple-500 to-violet-600",
    rewardRange: "$50-200",
  },
  {
    id: "other",
    label: "Другое",
    description: "Иные критические загрязнения",
    icon: AlertTriangle,
    color: "from-slate-500 to-gray-600",
    rewardRange: "$50-150",
  },
];

/**
 * EmergencyModal - Модальное окно для сообщения о критических загрязнениях
 * 
 * 3 шага:
 * 1. Выбор типа происшествия
 * 2. Загрузка фото/видео + геолокация
 * 3. Подтверждение и отправка
 * 
 * Дизайн: неоморфизм + ретрофутуризм
 * Мобильная адаптация: bottom sheet на мобильных устройствах
 */
export function EmergencyModal({
  onClose,
  onSubmit
}: {
  onClose: () => void;
  onSubmit: (data: EmergencyReportData) => Promise<void>;
}) {
  const [currentStep, setCurrentStep] = useState<Step>("type");
  const [selectedType, setSelectedType] = useState<IncidentType | null>(null);
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [location, setLocation] = useState<{ lat: number | null; lng: number | null; address?: string }>({
    lat: null,
    lng: null,
    address: undefined,
  });
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Блокировка прокрутки фона
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  /**
   * Получение геолокации
   */
  const handleGetLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Геолокация не поддерживается вашим браузером");
      return;
    }

    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsGettingLocation(false);
      },
      (error) => {
        console.error("Ошибка получения геолокации:", error);
        alert("Не удалось получить геолокацию. Убедитесь, что разрешили доступ.");
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  /**
   * Обработка выбора файлов
   */
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Валидация: максимум 5 файлов
    const totalFiles = Math.min(files.length, 5 - mediaFiles.length);
    const selectedFiles = files.slice(0, totalFiles);

    // Валидация типов
    const validTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm"];
    const validFiles = selectedFiles.filter(file => validTypes.includes(file.type));

    if (validFiles.length !== selectedFiles.length) {
      alert("Некоторые файлы не были загружены. Поддерживаются только JPG, PNG, WebP, MP4, WebM");
    }

    // Создание превью
    const previews = validFiles.map(file => URL.createObjectURL(file));

    setMediaFiles(prev => [...prev, ...validFiles]);
    setMediaPreviews(prev => [...prev, ...previews]);
  }, [mediaFiles.length]);

  /**
   * Удаление медиафайла
   */
  const handleRemoveMedia = useCallback((index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
    setMediaPreviews(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]);
      return newPreviews.filter((_, i) => i !== index);
    });
  }, []);

  /**
   * Переход к следующему шагу
   */
  const handleNext = useCallback(() => {
    if (currentStep === "type" && selectedType) {
      setCurrentStep("media");
    } else if (currentStep === "media") {
      setCurrentStep("confirm");
    }
  }, [currentStep, selectedType]);

  /**
   * Переход к предыдущему шагу
   */
  const handleBack = useCallback(() => {
    if (currentStep === "media") {
      setCurrentStep("type");
    } else if (currentStep === "confirm") {
      setCurrentStep("media");
    }
  }, [currentStep]);

  /**
   * Отправка отчёта
   */
  const handleSubmit = useCallback(async () => {
    if (!selectedType) return;

    setIsSubmitting(true);

    try {
      const reportData: EmergencyReportData = {
        incidentType: selectedType,
        description,
        mediaFiles,
        mediaPreviews,
        location,
        contactEmail: contactEmail || undefined,
        contactPhone: contactPhone || undefined,
      };

      await onSubmit(reportData);
    } catch (error) {
      console.error("Ошибка отправки отчёта:", error);
      alert("Произошла ошибка при отправке отчёта. Попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedType, description, mediaFiles, mediaPreviews, location, contactEmail, contactPhone, onSubmit]);

  /**
   * Проверка возможности перехода
   */
  const canProceed = () => {
    if (currentStep === "type") return !!selectedType;
    if (currentStep === "media") return mediaFiles.length > 0 || location.lat !== null;
    return true;
  };

  // Рендер шага выбора типа
  const renderTypeStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Тип происшествия</h3>
        <p className="text-slate-400 text-sm">Выберите категорию загрязнения</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {INCIDENT_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;

          return (
            <motion.button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`relative p-4 rounded-2xl border transition-all duration-300 text-left ${
                isSelected
                  ? "border-cyan-400/50 bg-cyan-500/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
              style={{
                boxShadow: isSelected
                  ? "0 0 30px rgba(34, 211, 238, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.1)"
                  : "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2.5 rounded-xl bg-gradient-to-br ${type.color} shrink-0`}
                  style={{
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white text-sm mb-1">{type.label}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{type.description}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Trophy className="w-3 h-3 text-amber-400" />
                    <span className="text-xs text-amber-400 font-medium">{type.rewardRange}</span>
                  </div>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Награда за репорт */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
        style={{
          boxShadow: "inset 0 2px 8px rgba(245, 158, 11, 0.1)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20">
            <DollarSign className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-200">Награда после верификации</p>
            <p className="text-xs text-amber-400/70">$50-500 VOD в зависимости от типа и подтверждённости</p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  // Рендер шага загрузки медиа
  const renderMediaStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-white mb-2">Фото/Видео и геолокация</h3>
        <p className="text-slate-400 text-sm">Добавьте доказательства и укажите место</p>
      </div>

      {/* Загрузка файлов */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-300">Медиафайлы</label>
        
        <motion.div
          onClick={() => fileInputRef.current?.click()}
          className="relative border-2 border-dashed border-white/20 rounded-2xl p-6 cursor-pointer hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all duration-300"
          style={{
            boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 mb-3">
              <Upload className="w-6 h-6 text-cyan-400" />
            </div>
            <p className="text-sm text-white font-medium">Нажмите для загрузки</p>
            <p className="text-xs text-slate-400 mt-1">JPG, PNG, WebP, MP4, WebM (макс. 5 файлов)</p>
          </div>
        </motion.div>

        {/* Превью загруженных файлов */}
        {mediaPreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {mediaPreviews.map((preview, index) => {
              const isVideo = mediaFiles[index]?.type.startsWith("video/");
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                  style={{
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {isVideo ? (
                    <video src={preview} className="w-full h-full object-cover" />
                  ) : (
                    <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleRemoveMedia(index)}
                      className="p-2 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  {isVideo && (
                    <div className="absolute top-1 right-1 p-1 rounded bg-black/60">
                      <Video className="w-3 h-3 text-white" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Геолокация */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-300">Геолокация</label>
        
        <motion.button
          onClick={handleGetLocation}
          disabled={isGettingLocation}
          className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
          whileHover={{ scale: isGettingLocation ? 1 : 1.01 }}
          whileTap={{ scale: isGettingLocation ? 1 : 0.99 }}
        >
          {isGettingLocation ? (
            <>
              <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
              <span className="text-white font-medium">Получение координат...</span>
            </>
          ) : location.lat !== null ? (
            <>
              <div className="p-2 rounded-xl bg-green-500/20">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium">Геолокация получена</p>
                <p className="text-xs text-slate-400">
                  {location.lat?.toFixed(6)}, {location.lng?.toFixed(6)}
                </p>
              </div>
              <Navigation className="w-5 h-5 text-green-400 ml-auto" />
            </>
          ) : (
            <>
              <div className="p-2 rounded-xl bg-cyan-500/20">
                <MapPin className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-white font-medium">Определить местоположение</span>
              <Navigation className="w-5 h-5 text-cyan-400 ml-auto" />
            </>
          )}
        </motion.button>

        {location.lat === null && (
          <p className="text-xs text-slate-500 text-center">
            Геолокация будет автоматически добавлена к отчёту
          </p>
        )}
      </div>

      {/* Описание */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Описание (опционально)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Опишите, что произошло..."
          rows={3}
          className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 transition-colors resize-none"
          style={{
            boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>
    </div>
  );

  // Рендер шага подтверждения
  const renderConfirmStep = () => {
    const selectedIncident = INCIDENT_TYPES.find(t => t.id === selectedType);

    return (
      <div className="space-y-4">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-white mb-2">Подтверждение</h3>
          <p className="text-slate-400 text-sm">Проверьте данные перед отправкой</p>
        </div>

        {/* Сводка */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
          {/* Тип происшествия */}
          {selectedIncident && (
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-gradient-to-br ${selectedIncident.color}`}>
                <selectedIncident.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Тип происшествия</p>
                <p className="text-sm font-semibold text-white">{selectedIncident.label}</p>
              </div>
            </div>
          )}

          {/* Геолокация */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20">
              <MapPin className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Геолокация</p>
              <p className="text-sm font-semibold text-white">
                {location.lat !== null
                  ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
                  : "Не указана"}
              </p>
            </div>
          </div>

          {/* Медиафайлы */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20">
              <Camera className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Медиафайлы</p>
              <p className="text-sm font-semibold text-white">{mediaFiles.length} файл(ов)</p>
            </div>
          </div>

          {/* Награда */}
          {selectedIncident && (
            <div className="flex items-center gap-3 pt-3 border-t border-white/10">
              <div className="p-2 rounded-xl bg-amber-500/20">
                <Trophy className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Возможная награда</p>
                <p className="text-sm font-bold text-amber-400">{selectedIncident.rewardRange} VOD</p>
              </div>
            </div>
          )}
        </div>

        {/* Контактные данные */}
        <div className="space-y-3">
          <p className="text-xs text-slate-400 text-center">
            Укажите контакты для связи (опционально)
          </p>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 transition-colors text-sm"
            style={{
              boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
          <input
            type="tel"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="Телефон"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 transition-colors text-sm"
            style={{
              boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>

        {/* Предупреждение */}
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <p className="text-xs text-amber-200 text-center">
            ⚠️ За заведомо ложное сообщение предусмотрена ответственность
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        style={{
          background: "radial-gradient(ellipse at center, rgba(10, 22, 40, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)",
        }}
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full sm:max-w-lg sm:mx-4 pointer-events-auto"
          style={{
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          {/* Content container with neomorphism + retrofuturism design */}
          <div
            className="relative rounded-t-3xl sm:rounded-3xl overflow-hidden"
            style={{
              background: `
                linear-gradient(
                  145deg,
                  rgba(30, 41, 59, 0.95) 0%,
                  rgba(15, 23, 42, 0.98) 100%
                )
              `,
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: `
                0 25px 80px rgba(0, 0, 0, 0.5),
                0 0 100px rgba(34, 211, 238, 0.1),
                inset 0 1px 2px rgba(255, 255, 255, 0.1)
              `,
            }}
          >
            {/* Retrofuturistic decorative elements */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
            
            <svg className="absolute top-4 right-4 w-24 h-24 pointer-events-none opacity-10" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="6 6" />
            </svg>

            {/* Header */}
            <div className="relative flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className="p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-orange-600"
                  style={{
                    boxShadow: "0 4px 15px rgba(239, 68, 68, 0.4)",
                  }}
                >
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Экстренный репорт</h2>
                  <p className="text-xs text-slate-400">Шаг {currentStep === "type" ? 1 : currentStep === "media" ? 2 : 3} из 3</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="relative px-5 py-3">
              <div className="flex gap-1">
                {(["type", "media", "confirm"] as Step[]).map((step, index) => {
                  const stepIndex = ["type", "media", "confirm"].indexOf(currentStep);
                  const isActive = index <= stepIndex;
                  const isCurrent = index === stepIndex;

                  return (
                    <div
                      key={step}
                      className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                        isActive
                          ? isCurrent
                            ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                            : "bg-cyan-500/50"
                          : "bg-white/10"
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Body */}
            <div className="relative p-5 pt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentStep === "type" && renderTypeStep()}
                  {currentStep === "media" && renderMediaStep()}
                  {currentStep === "confirm" && renderConfirmStep()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer with navigation buttons */}
            <div className="relative flex items-center justify-between gap-3 p-5 pt-0 border-t border-white/10">
              {currentStep !== "type" ? (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
                  style={{
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Назад
                </motion.button>
              ) : (
                <div />
              )}

              {currentStep !== "confirm" ? (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    boxShadow: "0 4px 15px rgba(34, 211, 238, 0.4)",
                  }}
                  whileHover={{ scale: canProceed() ? 1.02 : 1 }}
                  whileTap={{ scale: canProceed() ? 0.98 : 1 }}
                >
                  Далее
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting || !canProceed()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    boxShadow: "0 4px 15px rgba(34, 197, 94, 0.4)",
                  }}
                  whileHover={{ scale: !isSubmitting && canProceed() ? 1.02 : 1 }}
                  whileTap={{ scale: !isSubmitting && canProceed() ? 0.98 : 1 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Отправить репорт
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default EmergencyModal;
