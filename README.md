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

## 💰 Токеномика

### UNITY Coin (Off-chain)

- **Тип**: Utility coin (off-chain)
- **Назначение**: Мера участия в экосистеме
- **Эмиссия**: Централизованная, за реальные действия

**Способы получения:**
- Регистрация: 10 UNITY
- Telegram регистрация: 15 UNITY
- Добавление объекта: 50-200 UNITY
- Добавление данных: 20-100 UNITY
- Стейкинг: APY 10-20%

**Использование:**
- Стейкинг в проекты
- Голосование в DAO
- Доступ к премиум-функциям

### Будущий токен

Эмиссия токена будет возможна только после:
1. Оцифровки реальных водных данных
2. Хэширования данных в ноды
3. Верификации данных

UNITY коины будут конвертированы в токены 1:1.

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
