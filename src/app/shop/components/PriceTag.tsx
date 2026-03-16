'use client';

import { motion } from 'framer-motion';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  showInstallment?: boolean;
  className?: string;
}

export function PriceTag({ 
  price, 
  originalPrice, 
  size = 'md', 
  showInstallment = false,
  className = '' 
}: PriceTagProps) {
  const sizeClasses = {
    sm: {
      price: 'text-xl',
      original: 'text-sm',
      currency: 'text-sm',
    },
    md: {
      price: 'text-2xl',
      original: 'text-base',
      currency: 'text-base',
    },
    lg: {
      price: 'text-4xl',
      original: 'text-xl',
      currency: 'text-xl',
    },
  };

  const classes = sizeClasses[size];
  const installment = Math.round(price / 12);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-baseline gap-2">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`font-bold text-slate-900 dark:text-white ${classes.price}`}
        >
          ${price}
        </motion.span>
        
        {originalPrice && (
          <span className={`text-slate-400 line-through ${classes.original}`}>
            ${originalPrice}
          </span>
        )}
        
        <span className={`text-slate-500 ${classes.currency}`}>USD</span>
      </div>
      
      {showInstallment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-emerald-600 dark:text-emerald-400 font-medium"
        >
          или ${installment}/мес в рассрочку
        </motion.div>
      )}
    </div>
  );
}

export function SavingsCalculator({ price, paybackMonths, savingsPerMonth = 25 }: {
  price: number;
  paybackMonths: number;
  savingsPerMonth?: number;
}) {
  const yearlySavings = savingsPerMonth * 12;
  const threeYearSavings = yearlySavings * 3 - price;

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 space-y-3">
      <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
        💰 Калькулятор экономии
      </h4>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Стоимость устройства</span>
          <span className="font-medium text-slate-900 dark:text-white">${price}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Экономия в месяц</span>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">${savingsPerMonth}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Окупаемость</span>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">{paybackMonths} мес</span>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Чистая экономия за 3 года</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">${threeYearSavings}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
