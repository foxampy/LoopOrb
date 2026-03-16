"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Info, Droplets, X } from "lucide-react";
import { SimpleHeader } from "../components/SimpleNav";
import { WaterMascot, SpeechBubble } from "../components/WaterMascot";

// Mock water quality data points
const waterPoints = [
  { id: 1, lat: 55.7558, lng: 37.6173, quality: "good", name: "Москва-река" },
  { id: 2, lat: 55.76, lng: 37.64, quality: "medium", name: "Парк Горького" },
  { id: 3, lat: 55.75, lng: 37.6, quality: "bad", name: "Промзона" },
  { id: 4, lat: 55.765, lng: 37.63, quality: "good", name: "Воробьёвы горы" },
  { id: 5, lat: 55.745, lng: 37.62, quality: "medium", name: "Кремль" },
  { id: 6, lat: 55.77, lng: 37.61, quality: "good", name: "Ботанический сад" },
];

const qualityInfo = {
  good: {
    color: "bg-green-500",
    emoji: "🟢",
    text: "Можно пить!",
    description: "Вода чистая и безопасная",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  medium: {
    color: "bg-yellow-500",
    emoji: "🟡",
    text: "Не очень",
    description: "Нужна фильтрация",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  bad: {
    color: "bg-red-500",
    emoji: "🔴",
    text: "Опасно!",
    description: "Вода загрязнена",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
};

export default function SimpleMapPage() {
  const [selectedPoint, setSelectedPoint] = useState<typeof waterPoints[0] | null>(null);
  const [showLegend, setShowLegend] = useState(true);

  const handleLocateMe = () => {
    // Mock geolocation
    alert("Ищем тебя на карте... 📍 (в демо-режиме показываем Москву)");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <SimpleHeader title="Карта воды" />

      {/* Map Container */}
      <div className="relative h-[60vh] bg-gradient-to-b from-sky-200 to-blue-300 overflow-hidden">
        {/* Stylized map background */}
        <div className="absolute inset-0">
          {/* Water areas */}
          <div className="absolute top-1/4 left-1/4 w-64 h-32 bg-blue-400/40 rounded-full blur-xl" />
          <div className="absolute top-1/2 right-1/4 w-48 h-24 bg-blue-400/30 rounded-full blur-xl" />
          <div className="absolute bottom-1/3 left-1/3 w-56 h-28 bg-cyan-400/30 rounded-full blur-xl" />
          
          {/* Land areas */}
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="w-full h-full opacity-20" viewBox="0 0 400 400">
              <path
                d="M0 100 Q100 50 200 100 T400 100 L400 400 L0 400 Z"
                fill="#10b981"
              />
              <path
                d="M0 250 Q150 200 300 250 T400 300 L400 400 L0 400 Z"
                fill="#059669"
              />
            </svg>
          </div>
        </div>

        {/* Water quality points */}
        {waterPoints.map((point, index) => {
          const info = qualityInfo[point.quality as keyof typeof qualityInfo];
          // Position points on map (mock positioning)
          const top = 20 + (index * 12) % 60;
          const left = 15 + (index * 15) % 70;

          return (
            <motion.button
              key={point.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedPoint(point)}
              className={`absolute w-10 h-10 ${info.color} rounded-full shadow-lg flex items-center justify-center border-4 border-white`}
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              <Droplets size={18} className="text-white" />
              <motion.div
                className={`absolute w-full h-full ${info.color} rounded-full`}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.button>
          );
        })}

        {/* User location button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLocateMe}
          className="absolute bottom-4 right-4 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center"
        >
          <Navigation size={24} className="text-blue-500" />
        </motion.button>

        {/* Legend toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowLegend(!showLegend)}
          className="absolute top-4 left-4 px-4 py-2 bg-white rounded-full shadow-lg flex items-center gap-2"
        >
          <Info size={18} className="text-blue-500" />
          <span className="font-medium text-slate-700">Легенда</span>
        </motion.button>

        {/* Legend panel */}
        {showLegend && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute top-16 left-4 bg-white rounded-2xl p-4 shadow-lg"
          >
            <h3 className="font-bold text-slate-800 mb-3">Качество воды:</h3>
            <div className="space-y-2">
              {Object.entries(qualityInfo).map(([key, info]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-xl">{info.emoji}</span>
                  <span className="text-slate-700">{info.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Selected point info */}
      {selectedPoint ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4"
        >
          <div
            className={`rounded-2xl p-5 ${
              qualityInfo[selectedPoint.quality as keyof typeof qualityInfo].bgColor
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    qualityInfo[selectedPoint.quality as keyof typeof qualityInfo].color
                  }`}
                >
                  💧
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    {selectedPoint.name}
                  </h3>
                  <p
                    className={`font-medium ${
                      qualityInfo[selectedPoint.quality as keyof typeof qualityInfo]
                        .textColor
                    }`}
                  >
                    {qualityInfo[selectedPoint.quality as keyof typeof qualityInfo].text}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPoint(null)}
                className="p-2 hover:bg-black/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <p className="mt-3 text-slate-600">
              {qualityInfo[selectedPoint.quality as keyof typeof qualityInfo].description}
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 flex items-start gap-3"
        >
          <WaterMascot size="small" emotion="happy" />
          <SpeechBubble>
            Нажми на точку на карте, чтобы узнать качество воды! 🗺️
          </SpeechBubble>
        </motion.div>
      )}

      {/* Quick stats */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            count={waterPoints.filter((p) => p.quality === "good").length}
            label="Чистые"
            color="text-green-500"
            icon="✅"
          />
          <StatCard
            count={waterPoints.filter((p) => p.quality === "medium").length}
            label="Средние"
            color="text-yellow-500"
            icon="⚠️"
          />
          <StatCard
            count={waterPoints.filter((p) => p.quality === "bad").length}
            label="Загрязнённые"
            color="text-red-500"
            icon="🚨"
          />
        </div>
      </div>

      {/* Spacer */}
      <div className="h-8" />
    </div>
  );
}

function StatCard({
  count,
  label,
  color,
  icon,
}: {
  count: number;
  label: string;
  color: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-xl p-3 text-center shadow-sm">
      <div className="text-2xl mb-1">{icon}</div>
      <div className={`text-2xl font-bold ${color}`}>{count}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}
