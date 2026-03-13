"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  Beaker,
  ChevronLeft,
  Loader2,
  Thermometer,
  Droplets,
  Activity,
  Wind,
} from "lucide-react";

export default function AddDataPage() {
  const params = useParams();
  const router = useRouter();
  const objectId = params.id as string;
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    ph: "",
    temperature: "",
    turbidity: "",
    tds: "",
    conductivity: "",
    dissolvedOxygen: "",
    nitrates: "",
    phosphates: "",
    clarity: "",
    color: "",
    odor: "",
    notes: "",
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const data: any = {};
      
      // Only include non-empty values
      if (formData.ph) data.ph = parseFloat(formData.ph);
      if (formData.temperature) data.temperature = parseFloat(formData.temperature);
      if (formData.turbidity) data.turbidity = parseFloat(formData.turbidity);
      if (formData.tds) data.tds = parseFloat(formData.tds);
      if (formData.conductivity) data.conductivity = parseFloat(formData.conductivity);
      if (formData.dissolvedOxygen) data.dissolvedOxygen = parseFloat(formData.dissolvedOxygen);
      if (formData.nitrates) data.nitrates = parseFloat(formData.nitrates);
      if (formData.phosphates) data.phosphates = parseFloat(formData.phosphates);
      if (formData.clarity) data.clarity = parseInt(formData.clarity);
      if (formData.color) data.color = formData.color;
      if (formData.odor) data.odor = formData.odor;
      if (formData.notes) data.notes = formData.notes;

      const res = await fetch(`/api/objects/${objectId}/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push(`/objects/${objectId}`);
      }
    } catch (error) {
      console.error("Add data error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasData = Object.values(formData).some((v) => v !== "");

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
            <Link
              href={`/objects/${objectId}`}
              className="flex items-center gap-2 text-water-200/70 hover:text-white mb-4 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Назад к объекту
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">
              Добавить данные
            </h1>
            <p className="text-water-200/70">
              Внесите показатели качества воды и получите награду
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            {/* Physical Parameters */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-water-400" />
                Физические параметры
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-water-200/70 mb-1">
                    Температура (°C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) =>
                      setFormData({ ...formData, temperature: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="20.5"
                  />
                </div>
                <div>
                  <label className="block text-sm text-water-200/70 mb-1">
                    Мутность (NTU)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.turbidity}
                    onChange={(e) =>
                      setFormData({ ...formData, turbidity: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="2.5"
                  />
                </div>
                <div>
                  <label className="block text-sm text-water-200/70 mb-1">
                    Прозрачность (0-10)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={formData.clarity}
                    onChange={(e) =>
                      setFormData({ ...formData, clarity: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="7"
                  />
                </div>
              </div>
            </div>

            {/* Chemical Parameters */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Beaker className="w-5 h-5 text-water-400" />
                Химические параметры
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-water-200/70 mb-1">
                    pH (0-14)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={formData.ph}
                    onChange={(e) =>
                      setFormData({ ...formData, ph: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="7.5"
                  />
                </div>
                <div>
                  <label className="block text-sm text-water-200/70 mb-1">
                    TDS (ppm)
                  </label>
                  <input
                    type="number"
                    value={formData.tds}
                    onChange={(e) =>
                      setFormData({ ...formData, tds: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="250"
                  />
                </div>
                <div>
                  <label className="block text-sm text-water-200/70 mb-1">
                    Кондуктивность (µS/cm)
                  </label>
                  <input
                    type="number"
                    value={formData.conductivity}
                    onChange={(e) =>
                      setFormData({ ...formData, conductivity: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-water-200/70 mb-1">
                    Растворенный кислород (mg/L)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.dissolvedOxygen}
                    onChange={(e) =>
                      setFormData({ ...formData, dissolvedOxygen: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="8.5"
                  />
                </div>
                <div>
                  <label className="block text-sm text-water-200/70 mb-1">
                    Нитраты (mg/L)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.nitrates}
                    onChange={(e) =>
                      setFormData({ ...formData, nitrates: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="5.0"
                  />
                </div>
                <div>
                  <label className="block text-sm text-water-200/70 mb-1">
                    Фосфаты (mg/L)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.phosphates}
                    onChange={(e) =>
                      setFormData({ ...formData, phosphates: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-water-500 transition"
                    placeholder="0.5"
                  />
                </div>
              </div>
            </div>

            {/* Visual Assessment */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-water-400" />
                Визуальная оценка
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-water-200/70 mb-1">
                    Цвет воды
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-water-500 transition appearance-none"
                  >
                    <option value="" className="bg-ocean-deep">Не указано</option>
                    <option value="clear" className="bg-ocean-deep">Прозрачная</option>
                    <option value="blue" className="bg-ocean-deep">Синяя</option>
                    <option value="green" className="bg-ocean-deep">Зеленая</option>
                    <option value="brown" className="bg-ocean-deep">Коричневая</option>
                    <option value="yellow" className="bg-ocean-deep">Желтая</option>
                    <option value="other" className="bg-ocean-deep">Другое</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-water-200/70 mb-1">
                    Запах
                  </label>
                  <select
                    value={formData.odor}
                    onChange={(e) =>
                      setFormData({ ...formData, odor: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-water-500 transition appearance-none"
                  >
                    <option value="" className="bg-ocean-deep">Не указано</option>
                    <option value="none" className="bg-ocean-deep">Отсутствует</option>
                    <option value="chlorine" className="bg-ocean-deep">Хлор</option>
                    <option value="sulfur" className="bg-ocean-deep">Сероводород</option>
                    <option value="organic" className="bg-ocean-deep">Органический</option>
                    <option value="chemical" className="bg-ocean-deep">Химический</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-water-400" />
                Примечания
              </h2>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition resize-none"
                placeholder="Дополнительная информация об измерении..."
              />
            </div>

            {/* Reward Info */}
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Beaker className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-green-400 font-medium">
                    Награда за данные
                  </div>
                  <div className="text-sm text-water-200/70">
                    Базовая награда: 20 UNITY + 5 UNITY за каждый показатель
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-3">
              <Link
                href={`/objects/${objectId}`}
                className="px-6 py-2 text-water-200/70 hover:text-white transition"
              >
                Отмена
              </Link>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !hasData}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Beaker className="w-4 h-4" />
                    Добавить данные
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
