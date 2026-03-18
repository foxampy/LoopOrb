# 🚀 LoopOrb Platform — Полная инструкция по развертыванию

**Дата обновления:** 18 марта 2026 г.  
**Версия:** 1.0.1 (с исправлениями JSX ошибок)

---

## ✅ Исправленные ошибки перед деплоем

### Файлы с исправлениями:

| Файл | Ошибка | Статус |
|------|--------|--------|
| `src/app/[locale]/about/page.tsx` | Лишний `</div>`, недостающий импорт `Bell`, лишние символы `""` в конце файла | ✅ Исправлено |
| `src/app/[locale]/projects/page.tsx` | Unicode символ `✕` вместо компонента `X` | ✅ Исправлено |
| `src/app/[locale]/layout.tsx` | Статический `lang="ru"` вместо динамического | ✅ Исправлено |

---

## 📋 Шаг 1: Подготовка GitHub репозитория

### 1.1 Проверка локальных изменений

```bash
cd w:\1 VODeco\looporb\looporb-platform

# Проверка статуса
git status

# Добавление изменений
git add .

# Коммит изменений
git commit -m "fix: JSX syntax errors in about/page.tsx, projects/page.tsx, layout.tsx"
```

### 1.2 Создание/обновление репозитория

```bash
# Если репозиторий ещё не создан
git branch -M main
git remote add origin https://github.com/foxampy/LoopOrb.git
git push -u origin main

# Если репозиторий существует
git push origin main
```

---

## 📋 Шаг 2: Настройка базы данных (PostgreSQL)

### Вариант A: Render.com (рекомендуется)

1. Перейдите на [render.com](https://render.com)
2. Нажмите **New → PostgreSQL**
3. Заполните параметры:

   | Параметр | Значение |
   |----------|----------|
   | Name | `looporb-db` |
   | Database | `looporb` |
   | User | `looporb` |
   | Plan | `Free` (750 часов/мес) |

4. После создания скопируйте **Internal Database URL**:
   ```
   postgresql://looporb:PASSWORD@HOST:5432/looporb
   ```

### Вариант B: Локальная PostgreSQL (для тестирования)

```bash
# Установка PostgreSQL (Windows)
# Скачайте с https://www.postgresql.org/download/windows/

# Создание БД
createdb -U postgres looporb_db

# Проверка подключения
psql -U postgres -d looporb_db -c "SELECT version();"
```

### Вариант C: Supabase (бесплатно)

1. Перейдите на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Скопируйте **Connection String** из Settings → Database

---

## 📋 Шаг 3: Настройка переменных окружения

### 3.1 Создание файла .env.local

```bash
cd w:\1 VODeco\looporb\looporb-platform
copy .env.example .env.local
```

### 3.2 Заполнение .env.local

```env
# ==========================================
# ОБЯЗАТЕЛЬНЫЕ ПЕРЕМЕННЫЕ
# ==========================================

# Database (получите из Render/Supabase)
DATABASE_URL="postgresql://looporb:PASSWORD@HOST:5432/looporb"

# JWT Secret (сгенерируйте случайную строку 32+ символа)
JWT_SECRET="super-secret-key-min-32-characters-long-random-string"
JWT_EXPIRES_IN="7d"

# App URLs
NEXT_PUBLIC_APP_URL="https://looporb.vercel.app"
NEXT_PUBLIC_API_URL="/api"

# ==========================================
# ОПЦИОНАЛЬНЫЕ ПЕРЕМЕННЫЕ
# ==========================================

# Telegram Mini App (если используется)
TELEGRAM_BOT_TOKEN=""
TELEGRAM_BOT_USERNAME=""
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=""

# OAuth - Google (если используется)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email (если используется)
EMAIL_PROVIDER="smtp"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""

# Analytics (если используется)
NEXT_PUBLIC_GA_ID=""
```

### 3.3 Генерация секретных ключей

```bash
# Генерация JWT_SECRET (Node.js)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Генерация NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📋 Шаг 4: Настройка Vercel

### 4.1 Создание проекта

1. Перейдите на [vercel.com](https://vercel.com)
2. Нажмите **Add New → Project**
3. Импортируйте GitHub репозиторий: `foxampy/LoopOrb`
4. Укажите корневую директорию: `looporb-platform`

### 4.2 Настройка Environment Variables

В Vercel Dashboard → Settings → Environment Variables добавьте:

```env
# Production
DATABASE_URL=postgresql://looporb:PASSWORD@HOST:5432/looporb
JWT_SECRET=your-32-char-secret-key
NEXT_PUBLIC_APP_URL=https://looporb.vercel.app
NEXT_PUBLIC_API_URL=/api

# Preview (те же значения)
# Preview использует те же переменные что и Production
```

### 4.3 Настройка Build Settings

В Vercel Dashboard → Settings → Build:

```
Framework Preset: Next.js
Root Directory: ./looporb-platform
Build Command: npm run build
Install Command: npm install && npx prisma generate
Output Directory: .next
```

### 4.4 Первый деплой

```bash
# Установите Vercel CLI
npm install -g vercel

# Логин в Vercel
vercel login

# Деплой
cd w:\1 VODeco\looporb\looporb-platform
vercel --prod
```

---

## 📋 Шаг 5: Настройка Prisma и миграции

### 5.1 Генерация Prisma Client

```bash
cd w:\1 VODeco\looporb\looporb-platform
npx prisma generate
```

### 5.2 Применение миграций

```bash
# Для production (на Vercel/Render)
npx prisma migrate deploy

# Для разработки (локально)
npx prisma migrate dev --name init
```

### 5.3 Заполнение базы данных (seed)

```bash
npx prisma db seed
```

### 5.4 Проверка БД

```bash
# Запуск Prisma Studio
npx prisma studio
```

---

## 📋 Шаг 6: Настройка API endpoints

### 6.1 Проверка health endpoint

После деплоя проверьте:

```bash
curl https://looporb.vercel.app/api/health
```

Ожидаемый ответ:
```json
{
  "status": "healthy",
  "timestamp": "2026-03-18T19:00:00.000Z"
}
```

### 6.2 Тестирование API

```bash
# Регистрация нового пользователя
curl -X POST https://looporb.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'

# Логин
curl -X POST https://looporb.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Получение списка проектов
curl https://looporb.vercel.app/api/projects
```

---

## 📋 Шаг 7: Проверка деплоя

### 7.1 Чек-лист проверки

Откройте в браузере и проверьте:

| Страница | URL | Статус |
|----------|-----|--------|
| Главная | `https://looporb.vercel.app/` | ⬜ |
| О проекте | `https://looporb.vercel.app/about` | ⬜ |
| Логин | `https://looporb.vercel.app/login` | ⬜ |
| Регистрация | `https://looporb.vercel.app/register` | ⬜ |
| Dashboard | `https://looporb.vercel.app/dashboard` | ⬜ |
| Projects | `https://looporb.vercel.app/projects` | ⬜ |
| TokenHub | `https://looporb.vercel.app/tokenhub` | ⬜ |
| DAO | `https://looporb.vercel.app/dao` | ⬜ |
| 3D Globe | `https://looporb.vercel.app/globe` | ⬜ |

### 7.2 Проверка консоли браузера

1. Откройте DevTools (F12)
2. Перейдите на вкладку Console
3. Проверьте отсутствие ошибок

### 7.3 Проверка Vercel Logs

1. Vercel Dashboard → Deployments
2. Кликните на последний деплой
3. Проверьте логи на наличие ошибок

---

## 🔧 Troubleshooting

### Ошибка сборки: "Parsing ecmascript source code failed"

**Причина:** Синтаксическая ошибка JSX/TSX

**Решение:**
```bash
# Проверка локальной сборки
npm run build

# Проверка типов
npm run type-check

# Исправление ошибок в указанных файлах
```

### Ошибка: "Prisma Client could not locate the Query Engine"

**Решение:**
```bash
# В vercel.json убедитесь что installCommand включает prisma generate
"installCommand": "npm install && npx prisma generate"
```

### Ошибка: "DATABASE_URL is required"

**Решение:**
1. Проверьте что `DATABASE_URL` установлен в Vercel Environment Variables
2. Проверьте что переменная доступна в production

### Ошибка CORS

**Решение:**
Убедитесь что `NEXT_PUBLIC_API_URL` установлен правильно:
- Для Vercel: `/api` (relative path)
- Для локальной разработки: `http://localhost:3000/api`

### Ошибка: "JWT malformed"

**Решение:**
1. Проверьте что `JWT_SECRET` установлен
2. Длина секрета >= 32 символа
3. Нет специальных символов без кавычек

---

## 📊 Мониторинг

### Vercel Analytics

1. Vercel Dashboard → Analytics
2. Включите Web Vitals
3. Отслеживайте:
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Cumulative Layout Shift (CLS)

### Uptime Monitoring

Зарегистрируйтесь на [uptimerobot.com](https://uptimerobot.com):

1. Добавьте мониторинг:
   - URL: `https://looporb.vercel.app/api/health`
   - Interval: 5 minutes
   - Alert on: Down

2. Настройте алерты на email/Telegram

---

## 🔄 CI/CD Автоматический деплой

### Настройка автоматического деплоя

1. Vercel автоматически деплоит при push в ветку `main`
2. Preview деплой при создании Pull Request

### GitHub Actions (опционально)

Создайте `.github/workflows/ci.yml`:

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Generate Prisma Client
        run: npx prisma generate
      
      - name: Type check
        run: npm run type-check
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## 📱 Настройка Telegram Mini App (опционально)

### 1. Создание бота

1. Откройте [@BotFather](https://t.me/BotFather)
2. Отправьте `/newbot`
3. Следуйте инструкциям
4. Скопируйте токен

### 2. Настройка Web App

```bash
curl -X POST \
  https://api.telegram.org/bot<TOKEN>/setChatMenuButton \
  -H 'Content-Type: application/json' \
  -d '{
    "menu_button": {
      "type": "web_app",
      "text": "🚀 Launch LoopOrb",
      "web_app": {
        "url": "https://looporb.vercel.app/telegram"
      }
    }
  }'
```

### 3. Обновление переменных окружения

Добавьте в Vercel:
```env
TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME="your_bot_username"
```

---

## ✅ Финальный чек-лист

Перед запуском проверьте:

- [ ] Все JSX ошибки исправлены
- [ ] GitHub репозиторий обновлён
- [ ] PostgreSQL база создана
- [ ] `DATABASE_URL` установлен в Vercel
- [ ] `JWT_SECRET` сгенерирован и установлен
- [ ] Prisma Client сгенерирован
- [ ] Миграции применены
- [ ] Health endpoint возвращает 200
- [ ] Все страницы загружаются без ошибок
- [ ] Консоль браузера чистая
- [ ] Vercel Analytics включены
- [ ] Мониторинг настроен

---

## 📞 Поддержка

При возникновении проблем:

1. Проверьте Vercel Logs
2. Проверьте Prisma ошибки в консоли
3. Создайте Issue в GitHub
4. Проверьте документацию: `DEPLOY.md`

---

**Ссылки:**

- GitHub: https://github.com/foxampy/LoopOrb
- Vercel Dashboard: https://vercel.com/dashboard
- Prisma Docs: https://www.prisma.io/docs
- Next.js Docs: https://nextjs.org/docs
