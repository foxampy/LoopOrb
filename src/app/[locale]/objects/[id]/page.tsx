"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  Droplets,
  MapPin,
  ArrowLeft,
  Plus,
  Calendar,
  User,
  CheckCircle,
  AlertTriangle,
  Thermometer,
  Beaker,
  Activity,
} from "lucide-react";

interface WaterObject {
  id: string;
  name: string;
  nameLocal?: string;
  type: string;
  country: string;
  region?: string;
  city?: string;
  coordinates: { lat: number; lng: number };
  description?: string;
  history?: string;
  threats: string[];
  status: string;
  qualityIndex?: number;
  createdAt: string;
  creator: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface WaterData {
  id: string;
  measuredAt: string;
  ph?: number;
  temperature?: number;
  turbidity?: number;
  tds?: number;
  dissolvedOxygen?: number;
  status: string;
  user: {
    id: string;
    name: string;
  };
}

const typeLabels: Record<string, string> = {
  RIVER: "Река",
  LAKE: "Озеро",
  POND: "Пруд",
  STREAM: "Ручей",
  SPRING: "Родник",
  WETLAND: "Влажные угодья",
  GLACIER: "Ледник",
  AQUIFER: "Водоносный горизонт",
  SEA: "Море",
  OCEAN: "Океан",
  WATER_TREATMENT_PLANT: "Очистные сооружения",
  PUMPING_STATION: "Насосная станция",
  RESERVOIR: "Водохранилище",
  DAM: "Плотина",
  PIPELINE: "Трубопровод",
  WELL: "Скважина",
  MONITORING_STATION: "Станция мониторинга",
  RESEARCH_SITE: "Исследовательский участок",
};

const statusColors: Record<string, string> = {
  ACTIVE: "text-green-400",
  MONITORING: "text-blue-400",
  RESTORATION: "text-yellow-400",
  CRITICAL: "text-red-400",
  INACTIVE: "text-gray-400",
};

export default function ObjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [obj, setObj] = useState<WaterObject | null>(null);
  const [data, setData] = useState<WaterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchObject();
  }, [params.id]);

  const fetchObject = async () => {
    try {
      const res = await fetch(`/api/objects/${params.id}`);
      const result = await res.json();
      if (result.success) {
        setObj(result.data.object);
        setData(result.data.recentData);
      }
    } catch (error) {
      console.error("Fetch object error:", error);
    } finally {
      setIsLoading(false);
    }
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

  if (!obj) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Объект не найден
            </h1>
            <Link href="/globe" className="btn-primary">
              К карте
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8">
        {/* Hero */}
        <div className="relative h-48 bg-gradient-to-br from-water-500/30 to-cyan-glow/30">
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
              <Link
                href="/globe"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                К карте
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {obj.name}
              </h1>
              {obj.nameLocal && (
                <p className="text-water-200/70 text-lg">{obj.nameLocal}</p>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="px-3 py-1 bg-water-500/20 rounded-full text-sm text-water-400">
                    {typeLabels[obj.type] || obj.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColors[obj.status] || "text-gray-400"} bg-white/10`}>
                    {obj.status === "ACTIVE" && "Активен"}
                    {obj.status === "MONITORING" && "На мониторинге"}
                    {obj.status === "RESTORATION" && "Восстановление"}
                    {obj.status === "CRITICAL" && "Критическое состояние"}
                    {obj.status === "INACTIVE" && "Неактивен"}
                  </span>
                  {obj.qualityIndex && (
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      obj.qualityIndex > 70 ? "bg-green-500/20 text-green-400" :
                      obj.qualityIndex > 40 ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      Качество: {obj.qualityIndex}/100
                    </span>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <MapPin className="w-5 h-5 text-water-400" />
                    <div>
                      <div className="text-sm text-water-200/50">Локация</div>
                      <div className="text-white">
                        {obj.country}
                        {obj.region && `, ${obj.region}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <Activity className="w-5 h-5 text-water-400" />
                    <div>
                      <div className="text-sm text-water-200/50">Координаты</div>
                      <div className="text-white text-sm">
                        {obj.coordinates.lat.toFixed(4)}, {obj.coordinates.lng.toFixed(4)}
                      </div>
                    </div>
                  </div>
                </div>

                {obj.description && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Описание
                    </h3>
                    <p className="text-water-200/80">{obj.description}</p>
                  </div>
                )}

                {obj.threats.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      Угрозы
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {obj.threats.map((threat, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm"
                        >
                          {threat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Data History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">
                    Данные мониторинга
                  </h2>
                  <Link
                    href={`/objects/${obj.id}/data/new`}
                    className="btn-secondary text-sm flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Добавить данные
                  </Link>
                </div>

                {data.length > 0 ? (
                  <div className="space-y-3">
                    {data.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-white/5 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-water-200/50" />
                            <span className="text-sm text-water-200/70">
                              {new Date(item.measuredAt).toLocaleDateString("ru-RU")}
                            </span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            item.status === "VALIDATED"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}>
                            {item.status === "VALIDATED" ? "Подтверждено" : "На проверке"}
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                          {item.ph !== undefined && (
                            <div className="text-center p-2 bg-white/5 rounded">
                              <div className="text-xs text-water-200/50">pH</div>
                              <div className="text-sm font-medium text-white">{item.ph}</div>
                            </div>
                          )}
                          {item.temperature !== undefined && (
                            <div className="text-center p-2 bg-white/5 rounded">
                              <div className="text-xs text-water-200/50">°C</div>
                              <div className="text-sm font-medium text-white">{item.temperature}</div>
                            </div>
                          )}
                          {item.tds !== undefined && (
                            <div className="text-center p-2 bg-white/5 rounded">
                              <div className="text-xs text-water-200/50">TDS</div>
                              <div className="text-sm font-medium text-white">{item.tds}</div>
                            </div>
                          )}
                          {item.dissolvedOxygen !== undefined && (
                            <div className="text-center p-2 bg-white/5 rounded">
                              <div className="text-xs text-water-200/50">O₂</div>
                              <div className="text-sm font-medium text-white">{item.dissolvedOxygen}</div>
                            </div>
                          )}
                        </div>

                        <div className="mt-2 text-xs text-water-200/50">
                          Добавлено: {item.user.name}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Beaker className="w-12 h-12 text-water-200/20 mx-auto mb-3" />
                    <p className="text-water-200/50 mb-4">Нет данных мониторинга</p>
                    <Link
                      href={`/objects/${obj.id}/data/new`}
                      className="btn-primary text-sm"
                    >
                      Добавить первые данные
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Creator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  Добавлен
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep font-bold">
                    {obj.creator.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-white">{obj.creator.name}</div>
                    <div className="text-sm text-water-200/60">
                      {new Date(obj.createdAt).toLocaleDateString("ru-RU")}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  Действия
                </h3>
                <div className="space-y-3">
                  <Link
                    href={`/objects/${obj.id}/data/new`}
                    className="block w-full btn-primary text-center text-sm"
                  >
                    <Beaker className="w-4 h-4 inline mr-2" />
                    Добавить данные
                  </Link>
                  <Link
                    href={`/projects/new?objectId=${obj.id}`}
                    className="block w-full btn-secondary text-center text-sm"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Создать проект
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
