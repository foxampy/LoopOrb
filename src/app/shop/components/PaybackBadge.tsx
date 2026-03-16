'use client';

import { motion } from 'framer-motion';
import { TrendingDown } from 'lucide-react';

interface PaybackBadgeProps {
  months: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: {
    container: 'px-2 py-0.5 text-xs',
    icon: 12,
  },
  md: {
    container: 'px-3 py-1 text-sm',
    icon: 14,
  },
  lg: {
    container: 'px-4 py-1.5 text-base',
    icon: 16,
  },
};

export function PaybackBadge({ months, size = 'md', className = '' }: PaybackBadgeProps) {
  const classes = sizeClasses[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`
        inline-flex items-center gap-1.5 
        bg-gradient-to-r from-emerald-500 to-teal-500 
        text-white font-semibold rounded-full
        shadow-lg shadow-emerald-500/25
        ${classes.container}
        ${className}
      `}
    >
      <TrendingDown size={classes.icon} />
      <span>Окупается за {months} мес</span>
    </motion.div>
  );
}

export function PaybackBlock({ months, savingsPerMonth }: { months: number; savingsPerMonth?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
          <TrendingDown size={24} className="text-white" />
        </div>
        <div>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
            Окупается за {months} месяцев
          </div>
          <div className="text-sm text-emerald-600 dark:text-emerald-500">
            При ежедневном использовании
          </div>
        </div>
      </div>
      
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
        Экономия на покупной воде + заработок VODcredit за данные о качестве воды 
        в вашем регионе. {savingsPerMonth && (
          <span className="font-medium text-emerald-700 dark:text-emerald-400">
            Средняя экономия ${savingsPerMonth}/мес.
          </span>
        )}
      </p>
      
      <div className="mt-4 flex gap-2">
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-slate-900 dark:text-white">${months * (savingsPerMonth || 20)}</div>
          <div className="text-xs text-slate-500">Экономия в год</div>
        </div>
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-slate-900 dark:text-white">+120</div>
          <div className="text-xs text-slate-500">VODcredit/мес</div>
        </div>
      </div>
    </motion.div>
  );
}
