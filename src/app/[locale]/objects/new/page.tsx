"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ChevronLeft, Loader2, Droplets, MapPin, FileText, Lock } from "lucide-react";

const objectTypes = [
  { value: "RIVER", label: "Река", icon: "🌊" },
  { value: "LAKE", label: "Озеро", icon: "💧" },
  { value: "POND", label: "Пруд", icon: "🏞️" },
  { value: "STREAM", label: "Ручей", icon: "〰️" },
  { value: "SPRING", label: "Родник", icon: "⛲" },
  { value: "WETLAND", label: "Влажные угодья", icon: "🌿" },
  { value: "GLACIER", label: "Ледник", icon: "🏔️" },
  { value: "AQUIFER", label: "Водоносный горизонт", icon: "💎" },
  { value: "SEA", label: "Море", icon: "🌊" },
  { value: "WATER_TREATMENT_PLANT", label: "Очистные сооружения", icon: "🏭" },
  { value: "PUMPING_STATION", label: "Насосная станция", icon: "⚡" },
  { value: "RESERVOIR", label: "Водохранилище", icon: "🌊" },
  { value: "DAM", label: "Плотина", icon: "🚧" },
  { value: "WELL", label: "Скважина", icon: "🕳️" },
];

export default function NewObjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    nameLocal: "",
    type: "",
    country: "",
    region: "",
    city: "",
    lat: "",
    lng: "",
    description: "",
    threats: "",
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          nameLocal: formData.nameLocal || undefined,
          type: formData.type,
          country: formData.country,
          region: formData.region || undefined,
          city: formData.city || undefined,
          coordinates: {
            lat: parseFloat(formData.lat),
            lng: parseFloat(formData.lng),
          },
          description: formData.description || undefined,
          threats: formData.threats ? formData.threats.split(",").map((t) => t.trim()) : [],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/objects/${data.data.object.id}`);
      }
    } catch (error) {
      console.error("Create object error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.name && formData.type;
    if (step === 2) return formData.country && formData.lat && formData.lng;
    return true;
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
                Для добавления объекта необходимо войти в аккаунт.
              </p>
              <div className="space-y-3">
                <Link href="/login" className="block w-full btn-primary text-center">
                  Войти
                </Link>
                <Link href="/register" className="block w-full btn-outline text-center">
                  Создать аккаунт
                </Link>
                <Link href="/objects" className="block w-full text-water-200/50 hover:text-white text-center py-2 transition">
                  ← Назад к объектам
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
              Добавить водный объект
            </h1>
            <p className="text-water-200/70">
              Добавьте новый объект на карту и получите 50 UNITY
            </p>
          </motion.div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition ${
                  s <= step ? "bg-water-500" : "bg-white/10"
                }`}
              />
            ))}
          </div>

          {/* Form */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-water-400" />
                  Основная информация
                </h2>

                <div>
                  <label className="block text-sm font-medium text-water-200/80 mb-2">
                    Название объекта *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="Например: Аральское море"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-water-200/80 mb-2">
                    Локальное название
                  </label>
                  <input
                    type="text"
                    value={formData.nameLocal}
                    onChange={(e) =>
                      setFormData({ ...formData, nameLocal: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="На местном языке"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-water-200/80 mb-2">
                    Тип объекта *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {objectTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() =>
                          setFormData({ ...formData, type: type.value })
                        }
                        className={`p-3 rounded-lg border text-left transition ${
                          formData.type === type.value
                            ? "border-water-500 bg-water-500/20"
                            : "border-white/10 bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <span className="text-2xl mb-1 block">{type.icon}</span>
                        <span className="text-sm text-white">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-water-400" />
                  Локация
                </h2>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-3">
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-water-200/80 mb-2">
                      Широта *
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={formData.lat}
                      onChange={(e) =>
                        setFormData({ ...formData, lat: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                      placeholder="45.0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-water-200/80 mb-2">
                      Долгота *
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={formData.lng}
                      onChange={(e) =>
                        setFormData({ ...formData, lng: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                      placeholder="60.0000"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-water-400" />
                  Дополнительно
                </h2>

                <div>
                  <label className="block text-sm font-medium text-water-200/80 mb-2">
                    Описание
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition resize-none"
                    placeholder="История, особенности, текущее состояние..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-water-200/80 mb-2">
                    Угрозы (через запятую)
                  </label>
                  <input
                    type="text"
                    value={formData.threats}
                    onChange={(e) =>
                      setFormData({ ...formData, threats: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="Загрязнение, пересыхание, ..."
                  />
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="text-green-400 font-medium mb-1">
                    Награда за добавление
                  </div>
                  <div className="text-sm text-water-200/70">
                    Вы получите 50 UNITY после проверки модератором
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

              {step < 3 ? (
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
                      <Droplets className="w-4 h-4" />
                      Добавить объект
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
