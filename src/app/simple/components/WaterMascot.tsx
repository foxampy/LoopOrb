"use client";

import { motion, Variants } from "framer-motion";

interface WaterMascotProps {
  size?: "small" | "medium" | "large";
  emotion?: "happy" | "excited" | "thinking" | "waving";
  className?: string;
}

export function WaterMascot({
  size = "medium",
  emotion = "happy",
  className = "",
}: WaterMascotProps) {
  const sizeClasses = {
    small: "w-16 h-20",
    medium: "w-24 h-32",
    large: "w-32 h-40",
  };

  const animations: Record<string, Variants> = {
    happy: {
      y: [0, -5, 0],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" as const },
    },
    excited: {
      y: [0, -10, 0],
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 0.8, ease: "easeInOut" as const },
    },
    thinking: {
      rotate: [-5, 5, -5],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" as const },
    },
    waving: {
      rotate: [-10, 10, -10],
      transition: { repeat: Infinity, duration: 1, ease: "easeInOut" as const },
    },
  };

  const eyeAnimations: Record<string, Variants> = {
    happy: { scaleY: [1, 0.3, 1], transition: { repeat: Infinity, duration: 3 } },
    excited: { scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 0.5 } },
    thinking: {},
    waving: {},
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      animate={animations[emotion]}
    >
      {/* Water Drop Body */}
      <svg
        viewBox="0 0 100 120"
        className="w-full h-full drop-shadow-lg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main drop shape */}
        <path
          d="M50 5C50 5 10 45 10 75C10 95 28 110 50 110C72 110 90 95 90 75C90 45 50 5 50 5Z"
          fill="url(#dropGradient)"
        />
        
        {/* Shine highlight */}
        <ellipse cx="35" cy="45" rx="12" ry="8" fill="white" fillOpacity="0.6" />
        <circle cx="30" cy="40" r="4" fill="white" fillOpacity="0.9" />
        
        {/* Eyes */}
        <motion.g animate={eyeAnimations[emotion]}>
          <ellipse cx="35" cy="70" rx="8" ry="10" fill="#1a3a5c" />
          <ellipse cx="65" cy="70" rx="8" ry="10" fill="#1a3a5c" />
          <circle cx="37" cy="68" r="3" fill="white" />
          <circle cx="67" cy="68" r="3" fill="white" />
        </motion.g>
        
        {/* Mouth */}
        {emotion === "happy" && (
          <path
            d="M35 85Q50 95 65 85"
            stroke="#1a3a5c"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        )}
        {emotion === "excited" && (
          <ellipse cx="50" cy="88" rx="10" ry="8" fill="#1a3a5c" />
        )}
        {emotion === "thinking" && (
          <circle cx="50" cy="88" r="4" fill="#1a3a5c" />
        )}
        {emotion === "waving" && (
          <path
            d="M35 85Q50 92 65 85"
            stroke="#1a3a5c"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        )}
        
        {/* Blush */}
        <ellipse cx="25" cy="80" rx="6" ry="4" fill="#f472b6" fillOpacity="0.4" />
        <ellipse cx="75" cy="80" rx="6" ry="4" fill="#f472b6" fillOpacity="0.4" />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="dropGradient" x1="0" y1="0" x2="0" y2="120">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Little bubbles around */}
      <motion.div
        className="absolute -top-1 right-0 w-3 h-3 rounded-full bg-cyan-300"
        animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
      />
      <motion.div
        className="absolute top-4 -left-1 w-2 h-2 rounded-full bg-cyan-200"
        animate={{ y: [0, -3, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}
      />
    </motion.div>
  );
}

// Speech bubble component
interface SpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
}

export function SpeechBubble({ children, className = "" }: SpeechBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative bg-white rounded-2xl p-4 shadow-lg ${className}`}
    >
      <p className="text-slate-800 text-lg font-medium">{children}</p>
      {/* Triangle pointer */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-white" />
    </motion.div>
  );
}
