# Обновление страницы достижений (Achievements)

## Обзор изменений

Страница достижений была полностью переработана с добавлением 70 достижений в 6 категориях, NFT бейджей, 3D визуализации, социальных функций и улучшенного UX.

## Новые файлы

### 1. Страница достижений
**Путь:** `w:\1 VODeco\looporb\looporb-platform\src\app\[locale]\ecosystem\achievements\page.tsx`

**Основные возможности:**
- 70 достижений в 6 категориях
- 3D NFT бейджи с Three.js
- Фильтрация по категориям и редкости
- Просмотр в режиме сетки/списка
- Детальные модальные окна
- Социальные функции (поделиться, таблица лидеров)
- Прогресс по категориям
- Анимации получения достижений

### 2. API Leaderboard
**Путь:** `w:\1 VODeco\looporb\looporb-platform\src\app\[locale]\api\achievements\leaderboard\route.ts`

**Функционал:**
- GET `/api/achievements/leaderboard` - получение таблицы лидеров
- Сортировка по XP и количеству достижений
- Пагинация (параметр `limit`)

### 3. Seed данных достижений
**Путь:** `w:\1 VODeco\looporb\looporb-platform\prisma\seeds\achievements.seed.ts`

**Содержимое:**
- 70 достижений со всеми метаданными
- Категории, редкость, металлы NFT
- Условия получения и награды

## Обновлённые файлы

### 1. Схема Prisma
**Путь:** `w:\1 VODeco\looporb\looporb-platform\prisma\schema.prisma`

**Изменения в модели Achievement:**
```prisma
model Achievement {
  id            String   @id @default(uuid())
  name          String   @unique
  description   String   @db.Text
  category      AchievementCategory
  rarity        AchievementRarity @default(COMMON)        // NEW
  nftMetal      NFDMetal @default(BRONZE)                 // NEW
  icon          String
  color         String
  xpReward      Int
  orbReward     Decimal  @default(0)                      // RENAMED from unityReward
  hasNFTBadge   Boolean  @default(true)                   // NEW
  condition     Json
  visualDescription String? @db.Text                      // NEW
  animationType String   @default("float")                // NEW
  collectionValue Int    @default(1)                      // NEW
  users         UserAchievement[]
  createdAt     DateTime @default(now())
}
```

**Новые enum:**
```prisma
enum AchievementCategory {
  WATER_MONITORING   // Водный мониторинг
  SOCIAL             // Социальные
  PROJECT            // Проектные
  RESEARCH           // Исследования
  EDUCATION          // Образование
  SPECIAL            // Специальные
  EXPLORER           // (legacy)
  SCIENTIST          // (legacy)
  ACTIVIST           // (legacy)
  INVESTOR           // (legacy)
  INFLUENCER         // (legacy)
}

enum AchievementRarity {
  COMMON
  RARE
  EPIC
  LEGENDARY
}

enum NFDMetal {
  BRONZE
  SILVER
  GOLD
  PLATINUM
}
```

**Изменения в модели UserAchievement:**
```prisma
model UserAchievement {
  id            String      @id @default(uuid())
  userId        String
  user          User        @relation(...)
  achievementId String
  achievement   Achievement @relation(...)
  progress      Int         @default(0)              // NEW
  unlockedAt    DateTime    @default(now())
}
```

### 2. API достижений
**Путь:** `w:\1 VODeco\looporb\looporb-platform\src\app\[locale]\api\achievements\route.ts`

**Изменения:**
- Обновлён GET для поддержки новых полей (progress, rarity, nftMetal)
- Обновлён POST для использования `orbReward` вместо `unityReward`
- Добавлена поддержка `objects_count` в проверке условий
- Улучшена структура ответа API

### 3. Seed скрипт
**Путь:** `w:\1 VODeco\looporb\looporb-platform\prisma\seed.ts`

**Изменения:**
- Вынесен seed достижений в отдельный файл
- Добавлен вызов `achievements.seed.ts`

## Категории достижений (70 total)

### 1. Water Monitoring (15 достижений)
- Первая проба → Хранитель океана
- От 1 до 1000 проб воды
- Специализированные: pH, мутность, кислород, нитраты
- Стрики: 7 дней, 30 дней

### 2. Social (10 достижений)
- Первый пост → Герой сообщества
- Лайки: 100 → 10000
- Подписчики: 100 → 500
- Комментарии, шеры

### 3. Project (15 достижений)
- Первый вклад → Легенда проектов
- Инвестиции: $100 → $10,000
- Миссии: 1 → 100
- Создание проектов, волонтёрство

### 4. Research (10 достижений)
- Первая валидация → Прорыв
- Валидации: 1 → 100
- Публикации: 1 → 10
- Цитирования: 100 → 1000
- Гранты, коллаборации

### 5. Education (10 достижений)
- Первый курс → Вечный студент
- Курсы: 1 → 20
- Тесты, менторство
- Создание контента, преподавание

### 6. Special (10 достижений)
- Early Adopter (первые 1000)
- Основатель (первые 100)
- Реферальный мастер
- Кит (100,000 ORB)
- Марафонец (100 дней)
- Охотник за багами
- Переводчик
- Победитель события
- Участник DAO
- Легенда LoopOrb (все достижения)

## Система редкости

| Редкость | Множитель XP | Цвет | Glow эффект |
|----------|-------------|------|-------------|
| COMMON   | 1x          | Серый | #94a3b8 |
| RARE     | 1.5x        | Синий | #3b82f6 |
| EPIC     | 2.5x        | Фиолетовый | #a855f7 |
| LEGENDARY| 5x          | Золотой | #f59e0b |

## NFT Бейджи

### Металлы
| Металл | Цвет | Блеск | Множитель ценности |
|--------|------|-------|-------------------|
| BRONZE | #cd7f32 | #b87333 | 1x |
| SILVER | #c0c0c0 | #e8e8e8 | 2.5x |
| GOLD | #ffd700 | #ffec8b | 5x |
| PLATINUM | #e5e4e2 | #ffffff | 10x |

### Анимации
- `bubble` - пузыри
- `shield` - вращение щита
- `waves` - волны
- `crown` - коронация
- `globe` - вращение глобуса
- `pulse` - пульсация
- `fire` - пламя
- `twinkle` - мерцание звезды
- `launch` - запуск ракеты
- `supernova` - сверхновая
- И другие...

## Интерактивные элементы

### Фильтры
- По категориям (6 категорий + "Все")
- По редкости (4 уровня + "Все")
- Переключение вида: сетка / список

### Прогресс
- Общий прогресс (разблокировано/всего)
- Прогресс по категориям (мини-карточки)
- Индивидуальный прогресс для каждого достижения
- XP и ORB статистика

### Модальные окна
1. **Детали достижения**
   - 3D预览 NFT бейджа
   - Полное описание
   - Награды (XP, ORB, NFT)
   - Прогресс
   - Как получить
   - Коллекционная ценность

2. **Поделиться**
   - Копировать ссылку
   - Twitter
   - Telegram

### Таблица лидеров
- Топ-10 игроков
- Сортировка по XP
- Отображение достижений
- Аватарки и имена

## Технические детали

### Стек
- **React 19** + **Next.js 16**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (аникции)
- **Three.js** + **React Three Fiber** (3D)
- **@react-three/drei** (3D утилиты)
- **Lucide Icons** (иконки)

### API Endpoints
```
GET  /api/achievements?category=WATER_MONITORING&user=true
POST /api/achievements (check & award)
GET  /api/achievements/leaderboard?limit=10
```

### Оптимизация
- Мемоизация фильтров (`useMemo`)
- Ленивая загрузка 3D компонентов
- CSS анимации вместо JS где возможно
- Виртуализация для больших списков (при необходимости)

## Миграция базы данных

После обновления схемы выполните:

```bash
# Генерация Prisma Client
npx prisma generate

# Создание миграции
npx prisma migrate dev --name add_achievement_rarity_and_nft

# Применение миграции
npx prisma migrate deploy

# Заполнение достижениями
npx prisma db seed
```

## Награды

### XP (Experience Points)
- COMMON: 30-500 XP
- RARE: 350-1500 XP
- EPIC: 2000-5000 XP
- LEGENDARY: 5000-50000 XP

### ORB Tokens
- COMMON: 5-100 ORB
- RARE: 70-300 ORB
- EPIC: 400-1000 ORB
- LEGENDARY: 1000-10000 ORB

### NFT Бейджи
- Уникальный визуал для каждого достижения
- Металл зависит от редкости
- Анимация при получении
- Коллекционная ценность (1-100 pts)

## Социальные функции

### Поделиться достижением
- Генерация текста с названием достижения
- Копирование в буфер
- Шаринг в Twitter/Telegram

### Таблица лидеров
- Глобальный рейтинг
- Топ-10 игроков
- XP и количество достижений

### Сравнение с друзьями
- (Будущая функция)
- Требуется интеграция с системой друзей

## Будущие улучшения

1. **P2E механики**
   - Конвертация коллекции в токены
   - Стиaking NFT бейджей

2. **Коллекционные наборы**
   - Бонусы за полные коллекции
   - Специальные достижения за сеты

3. **Сезонные достижения**
   - Ограниченные по времени
   - Сезонные награды

4. **Гильдии/Кланы**
   - Командные достижения
   - Рейтинги гильдий

5. **3D展示室**
   - Виртуальная галерея достижений
   - Кастомизация пространства

## Заключение

Обновлённая страница достижений предоставляет:
- ✅ 70 достижений в 6 категориях
- ✅ NFT бейджи с 3D визуализацией
- ✅ Система редкости и металлов
- ✅ Социальные функции
- ✅ Таблица лидеров
- ✅ Интерактивный UI с анимациями
- ✅ Полная интеграция с API

Все требования из задачи выполнены.
