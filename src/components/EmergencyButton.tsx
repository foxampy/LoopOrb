"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { EmergencyModal, EmergencyReportData } from "./EmergencyModal";

/**
 * EmergencyButton - FAB кнопка для сообщения о критических загрязнениях
 * 
 * Особенности:
 * - Фиксированное положение в правом нижнем углу
 * - Неоморфизм + ретрофутуризм дизайн
 * - Анимация пульсации для привлечения внимания
 * - Мобильная адаптация
 */
export function EmergencyButton({
  onReportSubmit,
  className = ""
}: {
  onReportSubmit?: (data: EmergencyReportData) => Promise<void>;
  className?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSubmit = useCallback(async (data: EmergencyReportData) => {
    if (onReportSubmit) {
      await onReportSubmit(data);
    }
    setIsModalOpen(false);
  }, [onReportSubmit]);

  return (
    <>
      {/* FAB Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl outline-none focus:ring-4 focus:ring-red-500/50 ${className}`}
        style={{
          background: `
            linear-gradient(
              145deg,
              rgba(239, 68, 68, 0.95) 0%,
              rgba(185, 28, 28, 0.9) 100%
            )
          `,
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: `
            0 10px 40px rgba(239, 68, 68, 0.4),
            0 0 60px rgba(239, 68, 68, 0.2),
            inset 0 2px 4px rgba(255, 255, 255, 0.2),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2)
          `,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Сообщить о чрезвычайной ситуации"
      >
        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "transparent",
            border: "2px solid rgba(239, 68, 68, 0.6)",
          }}
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.8, 0.4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "transparent",
            border: "2px solid rgba(239, 68, 68, 0.4)",
          }}
          animate={{
            scale: [1, 1.8, 2.5],
            opacity: [0.6, 0.2, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5,
          }}
        />

        {/* Icon with glow */}
        <div className="relative z-10">
          <motion.div
            animate={{
              rotate: isHovered ? [0, -10, 10, -10, 10, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-white" style={{
              filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))",
            }} />
          </motion.div>
          
          {/* Inner glow */}
          <div
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
              filter: "blur(4px)",
            }}
          />
        </div>

        {/* Retrofuturistic accent lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 80 80"
          style={{ zIndex: 5 }}
        >
          <motion.circle
            cx="40"
            cy="40"
            r="38"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.5"
            strokeDasharray="6 6"
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <EmergencyModal
            onClose={handleClose}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default EmergencyButton;
