'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Droplets, 
  DollarSign, 
  TrendingDown, 
  Calculator,
  ArrowRight,
  Info,
  CheckCircle2
} from 'lucide-react';
import { products } from '../data/products';

// Chart component using simple bars
function SavingsChart({ 
  monthlyCost, 
  deviceCost, 
  savingsPerMonth 
}: { 
  monthlyCost: number; 
  deviceCost: number; 
  savingsPerMonth: number;
}) {
  const months = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
  
  const data = months.map(month => {
    const withoutDevice = monthlyCost * month;
    const withDevice = deviceCost + Math.max(0, (monthlyCost - savingsPerMonth) * month);
    const savings = withoutDevice - withDevice;
    return { month, withoutDevice, withDevice, savings };
  });

  const maxValue = Math.max(...data.map(d => Math.max(d.withoutDevice, d.withDevice)));

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
        📈 График накопления экономии
      </h3>
      
      <div className="relative h-64 md:h-80">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-slate-500">
          <span>${Math.round(maxValue / 1000)}k</span>
          <span>${Math.round(maxValue / 2000)}k</span>
          <span>$0</span>
        </div>

        {/* Chart bars */}
        <div className="ml-14 h-full flex items-end justify-between gap-1 md:gap-2 pb-8">
          {data.map((item, i) => {
            const withoutHeight = (item.withoutDevice / maxValue) * 100;
            const withHeight = (item.withDevice / maxValue) * 100;
            const isPayback = item.savings > 0 && (data[i-1]?.savings || 0) <= 0;
            
            return (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5 md:gap-1 h-full items-end">
                  {/* Without device */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${withoutHeight}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="flex-1 bg-slate-300 dark:bg-slate-600 rounded-t"
                  />
                  {/* With device */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${withHeight}%` }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.5 }}
                    className={`flex-1 rounded-t ${
                      item.savings > 0 
                        ? 'bg-emerald-500' 
                        : 'bg-cyan-500'
                    }`}
                  />
                </div>
                
                {/* Month label */}
                <span className={`text-xs ${isPayback ? 'font-bold text-emerald-600' : 'text-slate-500'}`}>
                  {item.month}м
                </span>
                
                {/* Payback indicator */}
                {isPayback && (
                  <div className="absolute -top-2 transform -translate-x-1/2">
                    <div className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                      Окупаемость!
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-0 left-14 right-0 flex justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-slate-300 dark:bg-slate-600 rounded" />
            <span className="text-slate-600 dark:text-slate-400">Без устройства</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-cyan-500 rounded" />
            <span className="text-slate-600 dark:text-slate-400">С устройством</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-emerald-500 rounded" />
            <span className="text-slate-600 dark:text-slate-400">В плюсе</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  const [litersPerDay, setLitersPerDay] = useState(3);
  const [monthlyWaterCost, setMonthlyWaterCost] = useState(50);
  const [selectedProduct, setSelectedProduct] = useState('home-station');

  const product = products.find(p => p.id === selectedProduct) || products[3];

  // Calculations
  const calculations = useMemo(() => {
    const litersPerMonth = litersPerDay * 30;
    const costPerLiter = monthlyWaterCost / litersPerMonth;
    
    // Estimated savings: 70% of water cost + VODcredit earnings
    const waterSavings = Math.round(monthlyWaterCost * 0.7);
    const vodCreditValue = Math.round(litersPerDay * 10); // ~$0.10 per liter of data
    const totalMonthlySavings = waterSavings + vodCreditValue;
    
    const paybackMonths = Math.ceil(product.price / totalMonthlySavings);
    const yearlySavings = totalMonthlySavings * 12;
    const threeYearSavings = yearlySavings * 3 - product.price;
    
    return {
      waterSavings,
      vodCreditValue,
      totalMonthlySavings,
      paybackMonths,
      yearlySavings,
      threeYearSavings,
      litersPerMonth,
    };
  }, [litersPerDay, monthlyWaterCost, product.price]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-cyan-600 to-blue-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ChevronLeft size={18} />
            Назад в магазин
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Calculator size={24} className="text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Калькулятор окупаемости
              </h1>
            </div>
            <p className="text-cyan-100 max-w-2xl text-lg">
              Рассчитайте, сколько вы сэкономите с оборудованием LoopOrb и когда оно окупится
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                ⚙️ Ваши параметры
              </h2>

              {/* Product Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Устройство
                </label>
                <div className="space-y-2">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProduct(p.id)}
                      className={`w-full p-3 rounded-xl text-left transition-all ${
                        selectedProduct === p.id
                          ? 'bg-cyan-50 dark:bg-cyan-900/20 border-2 border-cyan-500'
                          : 'bg-slate-50 dark:bg-slate-700/50 border-2 border-transparent hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${
                          selectedProduct === p.id ? 'text-cyan-700 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {p.name}
                        </span>
                        <span className="text-sm text-slate-500">${p.price}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Окупается за {p.paybackMonths} мес
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Liters Slider */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  <span className="flex items-center gap-2">
                    <Droplets size={16} className="text-cyan-500" />
                    Потребление воды в день
                  </span>
                </label>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">{litersPerDay}</span>
                    <span className="text-slate-500">литров</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={litersPerDay}
                    onChange={(e) => setLitersPerDay(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>1 л</span>
                    <span>10 л</span>
                  </div>
                </div>
              </div>

              {/* Cost Slider */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  <span className="flex items-center gap-2">
                    <DollarSign size={16} className="text-emerald-500" />
                    Расходы на воду в месяц
                  </span>
                </label>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">${monthlyWaterCost}</span>
                    <span className="text-slate-500">USD</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={monthlyWaterCost}
                    onChange={(e) => setMonthlyWaterCost(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-300 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>$10</span>
                    <span>$200</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Main Result Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 md:p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <TrendingDown size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Ваш результат</h2>
                  <p className="text-emerald-100">Расчёт для {product.name}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold mb-1">
                    ${calculations.yearlySavings}
                  </div>
                  <div className="text-emerald-100 text-sm">Экономия в год</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold mb-1">
                    {calculations.paybackMonths} мес
                  </div>
                  <div className="text-emerald-100 text-sm">Срок окупаемости</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold mb-1">
                    ${calculations.threeYearSavings}
                  </div>
                  <div className="text-emerald-100 text-sm">Чистая выгода за 3 года</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold">
                      С {product.name} вы сэкономите ${calculations.yearlySavings} в год!
                    </div>
                    <div className="text-emerald-100 text-sm">
                      Окупится за {calculations.paybackMonths} месяцев при вашем потреблении
                    </div>
                  </div>
                  <Link
                    href={`/shop/${product.id}`}
                    className="flex-shrink-0 px-6 py-3 bg-white text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-colors flex items-center gap-2"
                  >
                    Купить сейчас
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Savings Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Info size={18} className="text-cyan-500" />
                  Детализация экономии
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                        <Droplets size={18} className="text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">Экономия на воде</div>
                        <div className="text-xs text-slate-500">~70% от текущих расходов</div>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">${calculations.waterSavings}/мес</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🪙</span>
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">VODcredit</div>
                        <div className="text-xs text-slate-500">За данные о качестве воды</div>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white">${calculations.vodCreditValue}/мес</span>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 dark:text-white">Итого в месяц</span>
                      <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                        ${calculations.totalMonthlySavings}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <SavingsChart 
                  monthlyCost={monthlyWaterCost}
                  deviceCost={product.price}
                  savingsPerMonth={calculations.totalMonthlySavings}
                />
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                Почему это выгодно?
              </h3>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '💰', title: 'Экономия', desc: `${calculations.yearlySavings}$/год` },
                  { icon: '🌍', title: 'Экология', desc: 'Меньше пластика' },
                  { icon: '🏥', title: 'Здоровье', desc: 'Чистая вода 24/7' },
                  { icon: '🪙', title: 'Доход', desc: 'VODcredit за данные' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                  >
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="font-medium text-slate-900 dark:text-white">{item.title}</div>
                    <div className="text-sm text-slate-500">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/shop/${product.id}`}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={20} />
                Оформить заказ
              </Link>
              <Link
                href="/shop/compare"
                className="w-full sm:w-auto px-8 py-4 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold text-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
              >
                Сравнить с другими
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
