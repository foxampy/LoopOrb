# LoopOrb Platform

Экосистема управления водными ресурсами - объединяет общество, науку, бизнес и государства для сохранения воды планеты.

## 🚀 Быстрый старт

### Локальная разработка

```bash
# Установка зависимостей
npm install

# Настройка переменных окружения
cp .env.example .env.local
# Отредактируйте .env.local с вашими настройками

# Генерация Prisma клиента
npx prisma generate

# Запуск миграций
npx prisma migrate dev

# Заполнение базы данных
npx prisma db seed

# Запуск development сервера
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

## 🏗️ Архитектура

### Технологический стек

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Auth**: JWT + Telegram WebApp
- **State**: Zustand
- **Animations**: Framer Motion

### Структура проекта

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API endpoints
│   ├── (pages)/        # Page components
│   └── layout.tsx      # Root layout
├── components/         # React components
├── lib/               # Utilities
│   ├── db.ts         # Prisma client
│   ├── auth.ts       # Auth utilities
│   └── api.ts        # API helpers
├── stores/            # Zustand stores
└── types/             # TypeScript types
```

## 💰 Токеномика VOD

### VOD Token (Water-Backed)

- **Тип**: Utility token, обеспеченный водой
- **Назначение**: 1 VOD = 1 м³ верифицированной воды
- **Total Supply**: 1,386,000,000 VOD
- **Эмиссия**: Только после полного цикла верификации

### Поток Эмиссии Токена

1. **Physical Water Digitization** — сбор данных с AquaCell/AquaHome/Industrial IoT
2. **Data Transmission** — шифрованная передача (Bluetooth/WiFi/LoRaWAN/4G)
3. **Data Validation** — проверка валидаторами (min 3 confirmations)
4. **Hashing & Anchoring** — SHA-256 хэширование и запись в блокчейн-ноду
5. **Token Emission** — выпуск VOD на кошелек владельца устройства

### Формула Эмиссии

```
VOD_emitted = 10 VOD/m³ × Quality_Multiplier (0.5-2.0) × Scarcity_Multiplier (1.0-3.0) × Continuity_Bonus (1.0-1.25) × (1 - Slashing)
```

### Распределение Токенов

| Category | Percentage | Amount | Purpose |
|----------|------------|--------|---------|
| Water Reserve | 35% | 485.1M | Физическое обеспечение водой |
| R&D Treasury | 25% | 346.5M | Финансирование ProjectHub |
| Community | 15% | 207.9M | Стимулы и награды |
| Team & Foundation | 12% | 166.3M | Команда и развитие |
| Early Investors | 8% | 110.9M | Pre-seed и Seed раунды |
| Liquidity | 3% | 41.6M | Ликвидность |
| DAO Treasury | 2% | 27.7M | Казна управления |

### Стейкинг

- **Explorer**: 1,000-9,999 VOD → APY 8-12%
- **Guardian**: 10,000-99,999 VOD → APY 12-18%
- **Validator**: 100,000+ VOD → APY 18-25%

### Water Index W_m³

Базовая цена 1 м³ воды = $1.20 USD

| Component | Value |
|-----------|-------|
| Base Energy | $0.30 |
| Treatment | $0.40 |
| Scarcity | $0.20 |
| Quality | $0.30 |
| Carbon | $0.05 |
| Efficiency | -$0.05 |

## 🚀 ProjectHub

Децентрализованная платформа для финансирования, разработки и коммерциализации инноваций в области водных технологий.

### Жизненный цикл проекта

1. **Proposal Submission** — подготовка предложения с бюджетом и milestones
2. **Community Review** — 7-14 дней публичного ревью и peer review
3. **DAO Voting** — квадратичное голосование, quorum 5%, порог 60%
4. **Development** — milestone-based funding через smart contract escrow
5. **Milestone Verification** — DAO verification vote для каждого этапа
6. **IP-NFT Creation** — токенизация интеллектуальной собственности

### Уровни финансирования

| Tier | Amount | Duration | Requirements |
|------|--------|----------|--------------|
| Micro Grant | $5K-$20K | 3 months | MVP, 1 milestone |
| Seed Grant | $20K-$100K | 6 months | Team, prototype |
| Growth Grant | $100K-$500K | 12 months | Traction, partners |
| Scale Grant | $500K-$2M | 24 months | Revenue, market fit |
| Moonshot | $2M+ | 36 months | Breakthrough tech |

### Revenue Distribution (IP-NFT)

- **40%** — инвесторам проекта
- **30%** — команде разработки
- **20%** — DAO Treasury
- **10%** — community rewards

## 🌍 Деплой

### Vercel (Frontend)

1. Подключите репозиторий к Vercel
2. Установите переменные окружения:
   - `NEXT_PUBLIC_API_URL`: URL вашего Render бэкенда
3. Деплой автоматический при push в main

### Render (Backend + DB)

1. Создайте PostgreSQL базу на Render
2. Создайте Web Service:
   - Build Command: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
   - Start Command: `npm start`
3. Установите переменные окружения из `.env.example`

## 📱 Telegram Mini App

### Настройка бота

1. Создайте бота через @BotFather
2. Получите токен
3. Установите Web App URL через `/setmenu` или API
4. Добавьте `TELEGRAM_BOT_TOKEN` в переменные окружения

### Использование

Отправьте пользователю ссылку: `https://t.me/YOUR_BOT_USERNAME?start=webapp`

## 🔐 Безопасность

- Все пароли хэшируются с bcrypt
- JWT токены с коротким сроком жизни
- HTTPS only cookies
- Rate limiting на API
- Input validation с Zod

## 📝 Лицензия

MIT License - см. [LICENSE](LICENSE)

## 🤝 Контрибуция

Приветствуются PR и issues!

## 📞 Контакты

- Website: https://looporb.io
- Telegram: @LoopOrb_Official
- Email: team@looporb.io
