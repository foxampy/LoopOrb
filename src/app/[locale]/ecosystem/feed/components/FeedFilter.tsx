"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface FeedFilterProps {
  options: FilterOption[];
  active: string;
  onChange: (id: string) => void;
}

export function FeedFilter({ options, active, onChange }: FeedFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {options.map((option) => {
        const Icon = option.icon;
        const isActive = active === option.id;
        
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              isActive
                ? "bg-water-500 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{option.label}</span>
            {isActive && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-water-500 rounded-full -z-10"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
