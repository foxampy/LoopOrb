'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronLeft, 
  Check, 
  X, 
  Star, 
  TrendingDown,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { products } from '../data/products';

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['home-station', 'water-analyzer']);

  const compareProducts = products.filter(p => selectedProducts.includes(p.id));

  const toggleProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(p => p !== id));
    } else if (selectedProducts.length < 4) {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const features = [
    { key: 'price', label: 'Цена', format: (v: number) => `$${v}` },
    { key: 'paybackMonths', label: 'Окупаемость', format: (v: number) => `${v} мес` },
    { key: 'savingsPerMonth', label: 'Экономия/мес', format: (v: number | undefined) => v ? `$${v}` : '—' },
    { key: 'rating', label: 'Рейтинг', format: (v: number) => `⭐ ${v}` },
    { key: 'reviews', label: 'Отзывы', format: (v: number) => v.toString() },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-cyan-600 transition-colors"
          >
            <ChevronLeft size={18} />
            Назад в магазин
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Сравнение продуктов
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Выберите до 4 продуктов для сравнения характеристик, цен и сроков окупаемости
          </p>
        </motion.div>

        {/* Product Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Выберите продукты для сравнения ({selectedProducts.length}/4):
          </h2>
          <div className="flex flex-wrap gap-3">
            {products.map((product) => (
              <button
                key={product.id}
                onClick={() => toggleProduct(product.id)}
                className={`
                  px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2
                  ${selectedProducts.includes(product.id)
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }
                `}
              >
                {selectedProducts.includes(product.id) && (
                  <CheckCircle2 size={16} />
                )}
                {product.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        {compareProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="overflow-x-auto"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden min-w-[800px]">
              {/* Product Headers */}
              <div className="grid grid-cols-[200px_repeat(4,1fr)] border-b border-slate-200 dark:border-slate-700">
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 font-semibold text-slate-900 dark:text-white flex items-end">
                  Характеристика
                </div>
                {compareProducts.map((product) => (
                  <div key={product.id} className="p-4 text-center">
                    <div className="aspect-square rounded-xl bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 flex items-center justify-center mb-3 mx-auto w-24">
                      <span className="text-4xl">💧</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                      {product.name}
                    </h3>
                    <div className="text-xs text-slate-500 mb-3">{product.forWhom}</div>
                    <Link
                      href={`/shop/${product.id}`}
                      className="text-xs text-cyan-600 hover:underline"
                    >
                      Подробнее →
                    </Link>
                  </div>
                ))}
                {/* Empty placeholders */}
                {Array.from({ length: 4 - compareProducts.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="p-4 text-center text-slate-400">
                    <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-3 mx-auto w-24">
                      <span className="text-2xl">+</span>
                    </div>
                    <span className="text-sm">Выберите продукт</span>
                  </div>
                ))}
              </div>

              {/* Price Row */}
              <div className="grid grid-cols-[200px_repeat(4,1fr)] border-b border-slate-200 dark:border-slate-700">
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 font-medium text-slate-700 dark:text-slate-300 flex items-center">
                  Цена
                </div>
                {compareProducts.map((product) => (
                  <div key={product.id} className="p-4 text-center">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">${product.price}</span>
                  </div>
                ))}
                {Array.from({ length: 4 - compareProducts.length }).map((_, i) => (
                  <div key={`empty-price-${i}`} className="p-4" />
                ))}
              </div>

              {/* Payback Row */}
              <div className="grid grid-cols-[200px_repeat(4,1fr)] border-b border-slate-200 dark:border-slate-700">
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 font-medium text-slate-700 dark:text-slate-300 flex items-center">
                  <TrendingDown size={16} className="mr-2 text-emerald-500" />
                  Окупаемость
                </div>
                {compareProducts.map((product) => (
                  <div key={product.id} className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium">
                      {product.paybackMonths} мес
                    </span>
                  </div>
                ))}
                {Array.from({ length: 4 - compareProducts.length }).map((_, i) => (
                  <div key={`empty-payback-${i}`} className="p-4" />
                ))}
              </div>

              {/* Monthly Savings */}
              <div className="grid grid-cols-[200px_repeat(4,1fr)] border-b border-slate-200 dark:border-slate-700">
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 font-medium text-slate-700 dark:text-slate-300 flex items-center">
                  Экономия в месяц
                </div>
                {compareProducts.map((product) => (
                  <div key={product.id} className="p-4 text-center">
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      ${product.savingsPerMonth || '—'}
                    </span>
                  </div>
                ))}
                {Array.from({ length: 4 - compareProducts.length }).map((_, i) => (
                  <div key={`empty-savings-${i}`} className="p-4" />
                ))}
              </div>

              {/* Rating Row */}
              <div className="grid grid-cols-[200px_repeat(4,1fr)] border-b border-slate-200 dark:border-slate-700">
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 font-medium text-slate-700 dark:text-slate-300 flex items-center">
                  <Star size={16} className="mr-2 text-amber-400 fill-amber-400" />
                  Рейтинг
                </div>
                {compareProducts.map((product) => (
                  <div key={product.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-amber-400">⭐</span>
                      <span className="font-medium text-slate-900 dark:text-white">{product.rating}</span>
                    </div>
                    <span className="text-xs text-slate-500">({product.reviews} отзывов)</span>
                  </div>
                ))}
                {Array.from({ length: 4 - compareProducts.length }).map((_, i) => (
                  <div key={`empty-rating-${i}`} className="p-4" />
                ))}
              </div>

              {/* For Whom Row */}
              <div className="grid grid-cols-[200px_repeat(4,1fr)] border-b border-slate-200 dark:border-slate-700">
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 font-medium text-slate-700 dark:text-slate-300 flex items-center">
                  Для кого
                </div>
                {compareProducts.map((product) => (
                  <div key={product.id} className="p-4 text-center text-sm text-slate-600 dark:text-slate-400">
                    {product.forWhom}
                  </div>
                ))}
                {Array.from({ length: 4 - compareProducts.length }).map((_, i) => (
                  <div key={`empty-whom-${i}`} className="p-4" />
                ))}
              </div>

              {/* Features Row */}
              <div className="grid grid-cols-[200px_repeat(4,1fr)]">
                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 font-medium text-slate-700 dark:text-slate-300">
                  Особенности
                </div>
                {compareProducts.map((product) => (
                  <div key={product.id} className="p-4">
                    <ul className="space-y-2">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <Check size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {Array.from({ length: 4 - compareProducts.length }).map((_, i) => (
                  <div key={`empty-features-${i}`} className="p-4" />
                ))}
              </div>

              {/* Action Row */}
              <div className="grid grid-cols-[200px_repeat(4,1fr)] border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30">
                <div className="p-4" />
                {compareProducts.map((product) => (
                  <div key={product.id} className="p-4 text-center">
                    <Link
                      href={`/shop/${product.id}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium text-sm transition-colors"
                    >
                      Выбрать
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
                {Array.from({ length: 4 - compareProducts.length }).map((_, i) => (
                  <div key={`empty-action-${i}`} className="p-4" />
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingDown size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Выберите продукты для сравнения
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Нажмите на кнопки продуктов выше, чтобы добавить их в сравнение
            </p>
          </motion.div>
        )}

        {/* Recommendation Card */}
        {compareProducts.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 md:p-8 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">💡 Наше предложение</h3>
                <p className="text-emerald-100">
                  На основе анализа цена/качество, мы рекомендуем{' '}
                  <span className="font-semibold">
                    {compareProducts.reduce((best, p) => 
                      (p.rating / p.price) > (best.rating / best.price) ? p : best
                    ).name}
                  </span>
                  {' '}— лучший выбор для большинства пользователей.
                </p>
              </div>
              <Link
                href={`/shop/${compareProducts.reduce((best, p) => 
                  (p.rating / p.price) > (best.rating / best.price) ? p : best
                ).id}`}
                className="flex-shrink-0 px-6 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
              >
                Смотреть продукт
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
