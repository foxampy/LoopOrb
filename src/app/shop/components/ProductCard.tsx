'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { Product } from '../data/products';
import { PaybackBadge } from './PaybackBadge';
import { PriceTag } from './PriceTag';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
    >
      {/* Image Container */}
      <Link href={`/shop/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg">
            <span className="text-4xl">💧</span>
          </div>
        </div>
        
        {/* Payback Badge */}
        <div className="absolute top-3 left-3">
          <PaybackBadge months={product.paybackMonths} size="sm" />
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-600 dark:text-slate-400">
            {product.category === 'starter' && '🔰 Начинающим'}
            {product.category === 'portable' && '🎒 В дорогу'}
            {product.category === 'device' && '📱 Устройство'}
            {product.category === 'premium' && '⭐ Премиум'}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="px-4 py-2 bg-white text-slate-900 rounded-full font-medium text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Подробнее <ArrowRight size={16} />
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{product.rating}</span>
          </div>
          <span className="text-slate-400">•</span>
          <span className="text-sm text-slate-500 dark:text-slate-400">{product.reviews} отзывов</span>
        </div>

        {/* Title */}
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* For Whom */}
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-1">
          {product.forWhom}
        </p>

        {/* Features Preview */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.features.slice(0, 2).map((feature, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs text-slate-600 dark:text-slate-300"
            >
              {feature}
            </span>
          ))}
          {product.features.length > 2 && (
            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs text-slate-500">
              +{product.features.length - 2}
            </span>
          )}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
          <PriceTag price={product.price} size="sm" />
          
          <Link
            href={`/shop/${product.id}`}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-medium text-sm transition-colors flex items-center gap-2"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="aspect-square bg-slate-200 dark:bg-slate-700 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20 animate-pulse" />
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse" />
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 animate-pulse" />
        <div className="flex gap-2">
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-16 animate-pulse" />
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-16 animate-pulse" />
        </div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-full animate-pulse" />
      </div>
    </div>
  );
}
