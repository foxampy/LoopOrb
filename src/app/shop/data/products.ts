export interface Product {
  id: string;
  name: string;
  price: number;
  paybackMonths: number;
  category: 'starter' | 'portable' | 'device' | 'premium';
  image: string;
  images?: string[];
  features: string[];
  specifications?: Record<string, string>;
  boxContents?: string[];
  forWhom: string;
  rating: number;
  reviews: number;
  savingsPerMonth?: number;
  description?: string;
}

export const products: Product[] = [
  {
    id: 'explorer-kit',
    name: 'Набор Юного Исследователя',
    price: 99,
    paybackMonths: 6,
    category: 'starter',
    image: '/products/explorer-kit.jpg',
    images: ['/products/explorer-kit.jpg', '/products/explorer-kit-2.jpg', '/products/explorer-kit-3.jpg'],
    features: ['Тестер качества воды', 'Буклет Водный мир', 'Дневник исследователя', '50 VODcredit бонус'],
    specifications: {
      'Вес': '0.5 кг',
      'Размеры': '25 x 20 x 8 см',
      'Материал': 'Экологичный пластик',
      'Возраст': '6-14 лет',
      'Гарантия': '1 год',
    },
    boxContents: [
      'Тестер качества воды VOD-Test',
      'Буклет "Водный мир" с заданиями',
      'Дневник исследователя',
      'Карта мировых водоёмов',
      'Наклейки с наградами',
      'USB-кабель для зарядки',
    ],
    forWhom: 'Для детей 6-14 лет и семей',
    rating: 4.8,
    reviews: 127,
    savingsPerMonth: 15,
    description: 'Идеальный набор для юных исследователей! Ребёнок научится анализировать качество воды, вести научный дневник и получит первые VODcredit за собранные данные.',
  },
  {
    id: 'portable-purifier',
    name: 'Портативный Очиститель VOD-Pure',
    price: 149,
    paybackMonths: 8,
    category: 'portable',
    image: '/products/portable-purifier.jpg',
    images: ['/products/portable-purifier.jpg', '/products/portable-purifier-2.jpg', '/products/portable-purifier-3.jpg'],
    features: ['Очистка 99.9% бактерий', '1000 литров фильтр', 'USB-зарядка', 'Приложение для iOS/Android'],
    specifications: {
      'Вес': '0.35 кг',
      'Размеры': '8 x 8 x 25 см',
      'Ёмкость': '500 мл',
      'Фильтр': '1000 литров',
      'Батарея': '2000 мАч',
      'Зарядка': 'USB-C',
    },
    boxContents: [
      'Очиститель VOD-Pure',
      'Сменный фильтр',
      'USB-C кабель',
      'Чехол для переноски',
      'Инструкция на 5 языках',
    ],
    forWhom: 'Для походов, путешествий, дачи',
    rating: 4.9,
    reviews: 89,
    savingsPerMonth: 20,
    description: 'Компактный очиститель воды для активного образа жизни. Превращает воду из любого источника в питьевую за 60 секунд. Подключается к приложению для отслеживания качества и экономии.',
  },
  {
    id: 'water-analyzer',
    name: 'Анализатор Воды VOD-Sense',
    price: 199,
    paybackMonths: 6,
    category: 'device',
    image: '/products/water-analyzer.jpg',
    images: ['/products/water-analyzer.jpg', '/products/water-analyzer-2.jpg', '/products/water-analyzer-3.jpg'],
    features: ['10 показателей качества', 'Bluetooth', 'История измерений', 'Награды за данные'],
    specifications: {
      'Вес': '0.12 кг',
      'Размеры': '15 x 3 x 2 см',
      'Показатели': 'pH, TDS, температура, жёсткость и др.',
      'Связь': 'Bluetooth 5.0',
      'Батарея': '6 месяцев',
      'Водонепроницаемость': 'IP67',
    },
    boxContents: [
      'Анализатор VOD-Sense',
      'Калибровочный раствор',
      'USB-кабель',
      'Крепление на сумку',
      'Инструкция',
    ],
    forWhom: 'Для дома и активных исследователей',
    rating: 4.7,
    reviews: 156,
    savingsPerMonth: 30,
    description: 'Профессиональный анализатор качества воды в карманном формате. Измеряет 10 ключевых показателей и синхронизируется с приложением LoopOrb для отслеживания и заработка токенов.',
  },
  {
    id: 'home-station',
    name: 'Домашняя Станция VOD-Home',
    price: 899,
    paybackMonths: 15,
    category: 'premium',
    image: '/products/home-station.jpg',
    images: ['/products/home-station.jpg', '/products/home-station-2.jpg', '/products/home-station-3.jpg'],
    features: ['5 ступеней очистки', '50+ показателей', 'Семейный доступ', 'Умный дом интеграция', '500 VODcredit бонус'],
    specifications: {
      'Вес': '4.5 кг',
      'Размеры': '35 x 20 x 45 см',
      'Производительность': '2 литра/мин',
      'Фильтры': '5 ступеней (12 мес)',
      'Показатели': '50+ параметров',
      'Подключение': 'Wi-Fi, Bluetooth',
    },
    boxContents: [
      'Станция VOD-Home',
      'Комплект фильтров (5 шт.)',
      'Кран для чистой воды',
      'Шланги подключения',
      'Блок питания',
      'Инструкция по установке',
      'VODcredit карта на 500 токенов',
    ],
    forWhom: 'Для дома, семьи 3-5 человек',
    rating: 4.9,
    reviews: 234,
    savingsPerMonth: 60,
    description: 'Премиальная система очистки воды для всей семьи. Пятиступенчатая очистка, мониторинг 50+ показателей в реальном времени, интеграция с умным домом и бонусы VODcredit за данные.',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
};

export const categoryLabels: Record<string, string> = {
  all: 'Все',
  starter: 'Для начинающих',
  portable: 'Портативные',
  device: 'Устройства',
  premium: 'Профессиональные',
};

export const categoryFilters = [
  { value: 'all', label: 'Все' },
  { value: 'starter', label: 'Для начинающих' },
  { value: 'premium', label: 'Для семьи' },
  { value: 'device', label: 'Профессиональные' },
  { value: 'portable', label: 'Портативные' },
];
