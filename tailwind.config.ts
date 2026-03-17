import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ocean palette
        ocean: {
          deep: "#0a1628",
          mid: "#1a3a5c",
          shallow: "#2d5a7b",
          surface: "#162438",
          highlight: "#3b82f6",
        },
        water: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        cyan: {
          glow: "#22d3ee",
          light: "#67e8f9",
        },
        // Neumorphism palette
        neumorph: {
          base: "#1e293b",
          light: "#334155",
          dark: "#0f172a",
          accent: "#22d3ee",
        },
        // Retro palette
        retro: {
          sunset: "#ff6b6b",
          neon: "#f0f",
          cyan: "#0ff",
          purple: "#9d4edd",
          horizon: "#1a0a2e",
        },
        // Brutalist palette
        brutal: {
          black: "#000000",
          white: "#ffffff",
          yellow: "#fff000",
          red: "#ff0000",
          blue: "#0000ff",
          gray: "#808080",
        },
        // Status colors
        status: {
          good: "#10b981",
          warning: "#f59e0b",
          danger: "#ef4444",
          info: "#3b82f6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        hud: ["Orbitron", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "ocean-gradient": "linear-gradient(180deg, #0a1628 0%, #1a3a5c 100%)",
        "neumorph-surface": "linear-gradient(145deg, #334155 0%, #1e293b 100%)",
        "retro-sunset": "linear-gradient(180deg, #1a0a2e 0%, #4a1a5e 50%, #ff6b6b 100%)",
        "retro-neon": "linear-gradient(90deg, #f0f 0%, #0ff 50%, #f0f 100%)",
        "retro-cyber": "linear-gradient(135deg, #9d4edd 0%, #ff6b6b 50%, #0ff 100%)",
        "hud-scanline": "linear-gradient(180deg, rgba(34, 211, 238, 0.1) 0%, transparent 50%, rgba(34, 211, 238, 0.1) 100%)",
        "hud-energy": "linear-gradient(90deg, transparent 0%, rgba(34, 211, 238, 0.5) 50%, transparent 100%)",
      },
      boxShadow: {
        // Neumorphic outset
        "neumorph-outset-sm": "2px 2px 4px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.05)",
        "neumorph-outset-md": "4px 4px 8px rgba(0, 0, 0, 0.4), -2px -2px 4px rgba(255, 255, 255, 0.08)",
        "neumorph-outset-lg": "8px 8px 16px rgba(0, 0, 0, 0.5), -4px -4px 8px rgba(255, 255, 255, 0.1)",
        "neumorph-outset-xl": "12px 12px 24px rgba(0, 0, 0, 0.6), -6px -6px 12px rgba(255, 255, 255, 0.12)",
        // Neumorphic inset
        "neumorph-inset-sm": "inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -1px -1px 2px rgba(255, 255, 255, 0.05)",
        "neumorph-inset-md": "inset 4px 4px 8px rgba(0, 0, 0, 0.4), inset -2px -2px 4px rgba(255, 255, 255, 0.08)",
        "neumorph-inset-lg": "inset 8px 8px 16px rgba(0, 0, 0, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.1)",
        "neumorph-inset-xl": "inset 12px 12px 24px rgba(0, 0, 0, 0.6), inset -6px -6px 12px rgba(255, 255, 255, 0.12)",
        // Glow effects
        "glow-cyan": "0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.2)",
        "glow-purple": "0 0 20px rgba(157, 78, 221, 0.4), 0 0 40px rgba(157, 78, 221, 0.2)",
        "glow-pink": "0 0 20px rgba(255, 107, 107, 0.4), 0 0 40px rgba(255, 107, 107, 0.2)",
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2)",
        // Float
        "neumorph-float": "0 10px 30px rgba(0, 0, 0, 0.5), 0 -5px 20px rgba(255, 255, 255, 0.05)",
        // Brutalist
        "brutal": "4px 4px 0 #000000",
        "brutal-sm": "2px 2px 0 #000000",
        "brutal-lg": "6px 6px 0 #000000",
      },
      borderRadius: {
        retro: "2px 8px 2px 8px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "retro-grid": "retro-grid-move 3s linear infinite",
        "scanline-flicker": "scanline-flicker 8s linear infinite",
        "star-twinkle": "star-twinkle 30s ease-in-out infinite",
        "tech-pulse": "tech-pulse 2s ease-in-out infinite",
        "pulse-dot": "pulse-dot 1.5s ease-in-out infinite",
        "data-bar-shine": "data-bar-shine 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #22d3ee, 0 0 10px #22d3ee" },
          "100%": { boxShadow: "0 0 20px #22d3ee, 0 0 30px #22d3ee" },
        },
        "retro-grid-move": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 40px" },
        },
        "scanline-flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "star-twinkle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "tech-pulse": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 10px currentColor",
          },
          "50%": {
            opacity: "0.7",
            boxShadow: "0 0 20px currentColor",
          },
        },
        "pulse-dot": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.5",
            transform: "scale(1.2)",
          },
        },
        "data-bar-shine": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      spacing: {
        "touch-min": "44px",
        "touch-comfortable": "48px",
      },
      minWidth: {
        "touch-min": "44px",
        "touch-comfortable": "48px",
      },
      minHeight: {
        "touch-min": "44px",
        "touch-comfortable": "48px",
      },
    },
  },
  plugins: [],
};

export default config;
