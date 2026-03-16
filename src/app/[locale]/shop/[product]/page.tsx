'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Star, 
  Check, 
  Users, 
  ShoppingCart, 
  CreditCard, 
  BarChart3,
  Share2,
  Heart,
  Zap,
  Package,
  FileText,
  MessageSquare,
  Info
} from 'lucide-react';
import { products, getProductById } from '../data/products';
import { PaybackBlock } from '../components/PaybackBadge';
import { PriceTag, SavingsCalculator } from '../components/PriceTag';

const tabs = [
  { id: 'description', label: 'Описание', icon: Info },
  { id: 'specs', label: 'Характеристики', icon: FileText },
  { id: 'box', label: 'Что в коробке', icon: Package },
  { id: 'reviews', label: 'Отзывы', icon: MessageSquare },
];

// Mock reviews data
const reviews = [
  { id: 1, name: 'Анна К.', rating: 5, date: '2 недели назад', text: 'Отличное устройство! Окупилось за 5 месяцев. Дети в восторге от исследований.', avatar: '👩' },
  { id: 2, name: 'Михаил Д.', rating: 5, date: '1 месяц назад', text: 'Качество воды стало заметно лучше. Приложение удобное, VODcredit начисляются регулярно.', avatar: '👨' },
  { id: 3, name: 'Семья Петровых', rating: 4, date: '2 месяца назад', text: 'Хорошая инвестиция. Установили за 20 минут, работает без нареканий.', avatar: '👨‍👩‍👧' },
];

// Mock family photos
const familyPhotos = [
  { id: 1, name: 'Семья Ивановых', location: 'Москва', avatar: '🏠' },
  { id: 2, name: 'Анна и дети', location: 'СПб', avatar: '👩‍👧‍👦' },
  { id: 3, name: 'Дмитрий', location: 'Казань', avatar: '👨‍💼' },
  { id: 4, name: 'Семья Соколовых', location: 'Новосибирск', avatar: '🏡' },
  { id: 5, name: 'Елена', location: 'Краснодар', avatar: '👩‍🌾' },
];

export default function ProductPage() {
  const params = useParams();
  const productId = params.product as string;
  const product = getProductById(productId);
  
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Продукт не найден</h1>
          <Link href="/shop" className="text-cyan-600 hover:underline">
            Вернуться в магазин
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      {/* Breadcrumb */}
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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 flex items-center justify-center relative">
              <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl">
                <span className="text-6xl">💧</span>
              </div>
              
              {/* Like Button */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <Heart size={20} className={isLiked ? 'text-red-500 fill-red-500' : 'text-slate-400'} />
              </button>

              {/* Share Button */}
              <button className="absolute top-4 right-16 w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Share2 size={18} className="text-slate-600" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                    selectedImage === i 
                      ? 'ring-2 ring-cyan-500 ring-offset-2' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-800 dark:to-blue-800 flex items-center justify-center">
                    <span className="text-2xl">💧</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 rounded-full text-sm font-medium">
                  {product.category === 'starter' && '🔰 Для начинающих'}
                  {product.category === 'portable' && '🎒 Портативный'}
                  {product.category === 'device' && '📱 Устройство'}
                  {product.category === 'premium' && '⭐ Премиум'}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="font-medium text-slate-700 dark:text-slate-300">{product.rating}</span>
                  <span className="text-slate-400">({product.reviews} отзывов)</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                {product.name}
              </h1>
              
              <p className="text-slate-600 dark:text-slate-400">
                {product.forWhom}
              </p>
            </div>

            {/* Price */}
            <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
              <PriceTag price={product.price} size="lg" showInstallment />
            </div>

            {/* Payback Block */}
            <PaybackBlock 
              months={product.paybackMonths} 
              savingsPerMonth={product.savingsPerMonth} 
            />

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-cyan-500/25 transition-all">
                <ShoppingCart size={22} />
                Купить сейчас
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors">
                  <CreditCard size={18} />
                  В рассрочку 0%
                </button>
                <Link
                  href="/shop/compare"
                  className="py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <BarChart3 size={18} />
                  Сравнить
                </Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {['✓ Гарантия 2 года', '✓ Быстрая доставка', '✓ 30 дней на возврат'].map((badge) => (
                <span key={badge} className="text-sm text-slate-600 dark:text-slate-400">
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-cyan-600 dark:text-cyan-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Ключевые возможности</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Технические характеристики</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                        <span className="text-slate-600 dark:text-slate-400">{key}</span>
                        <span className="font-medium text-slate-900 dark:text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'box' && (
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Комплектация</h3>
                  <div className="space-y-3">
                    {product.boxContents?.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 py-2">
                        <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                          <Package size={14} className="text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Отзывы покупателей</h3>
                    <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm font-medium hover:bg-cyan-600 transition-colors">
                      Написать отзыв
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{review.avatar}</span>
                            <div>
                              <div className="font-medium text-slate-900 dark:text-white">{review.name}</div>
                              <div className="text-sm text-slate-500">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Families Using */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              👨‍👩‍👧‍👦 Семьи уже используют {product.name}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Присоединяйтесь к тысячам семей, которые доверяют LoopOrb
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {familyPhotos.map((family) => (
              <motion.div
                key={family.id}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <span className="text-3xl">{family.avatar}</span>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white text-sm">{family.name}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Users size={10} />
                    {family.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Calculator Section */}
        <section className="mt-16">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Рассчитайте свою экономию
                </h2>
                <p className="text-cyan-100 mb-6">
                  Узнайте, сколько вы сэкономите с {product.name} за год и когда оборудование окупится.
                </p>
                <Link
                  href="/shop/calculator"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-cyan-700 rounded-xl font-semibold hover:bg-cyan-50 transition-colors"
                >
                  <Zap size={20} />
                  Открыть калькулятор
                </Link>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <SavingsCalculator 
                  price={product.price} 
                  paybackMonths={product.paybackMonths}
                  savingsPerMonth={product.savingsPerMonth || 25}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
