# LoopOrb Platform - Deployment Guide
## Полное руководство по деплою ALPHA версии

---

## 📋 Требования к инфраструктуре

| Сервис | Назначение | Бесплатный лимит |
|--------|------------|------------------|
| **GitHub** | Репозиторий кода | Безлимитно |
| **Vercel** | Frontend + API Routes | 100GB/мес |
| **Render** | PostgreSQL + Backup | 750 часов/мес |
| **Redis Cloud** | Кеширование | 30MB |
| **Cloudflare** | CDN + DNS | Безлимитно |

---

## 🚀 Быстрый деплой (5 минут)

### Шаг 1: GitHub репозиторий

```bash
# Создайте новый репозиторий на GitHub
git init
git add .
git commit -m "Initial commit: LoopOrb Alpha"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/looporb-platform.git
git push -u origin main
```

### Шаг 2: Render (База данных + Backend)

1. Перейдите на [render.com](https://render.com)
2. Нажмите **"New" → "PostgreSQL"**
3. Настройки:
   - **Name**: `looporb-db`
   - **Database**: `looporb`
   - **User**: `looporb`
   - **Plan**: `Free`
4. Скопируйте **Internal Database URL**

5. Нажмите **"New" → "Web Service"**
6. Подключите GitHub репозиторий
7. Настройки:
   ```
   Name: looporb-api
   Runtime: Node
   Build Command: npm install && npx prisma generate && npx prisma migrate deploy && npm run build
   Start Command: npm start
   ```
8. Environment Variables:
   ```env
   DATABASE_URL=postgresql://looporb:PASSWORD@HOST:5432/looporb
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   NEXTAUTH_SECRET=your-nextauth-secret-key
   NEXTAUTH_URL=https://looporb.vercel.app
   NEXT_PUBLIC_APP_URL=https://looporb.vercel.app
   ```

### Шаг 3: Vercel (Frontend)

1. Перейдите на [vercel.com](https://vercel.com)
2. **"Add New Project"** → Импортируйте GitHub репозиторий
3. Настройки:
   ```
   Framework Preset: Next.js
   Root Directory: ./ (или looporb-platform если в подпапке)
   ```
4. Environment Variables:
   ```env
   NEXT_PUBLIC_API_URL=https://looporb-api.onrender.com/api
   NEXT_PUBLIC_APP_URL=https://looporb.vercel.app
   ```
5. Нажмите **"Deploy"**

### Шаг 4: Настройка домена (опционально)

1. В Vercel: **Settings → Domains**
2. Добавьте свой домен
3. Настройте DNS через Cloudflare:
   ```
   CNAME: www → cname.vercel-dns.com
   A: @ → 76.76.21.21
   ```

---

## 🔧 Детальная настройка

### Переменные окружения (полный список)

#### Обязательные

```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Auth
JWT_SECRET=minimum-32-characters-secret-key
NEXTAUTH_SECRET=another-32-char-secret
NEXTAUTH_URL=https://your-domain.com

# App URLs
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

#### Опциональные (для расширенных функций)

```env
# Telegram Mini App
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=your_bot_username

# OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Redis (кеширование)
UPSTASH_REDIS_REST_URL=https://your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🧪 Проверка деплоя

### Health Check

```bash
curl https://your-api-domain.com/api/health
```

Ожидаемый ответ:
```json
{
  "status": "healthy",
  "timestamp": "2026-02-18T20:00:00.000Z",
  "version": "1.0.0-alpha",
  "services": {
    "database": "connected",
    "redis": "connected"
  }
}
```

### Тест API

```bash
# Регистрация
curl -X POST https://your-api.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123","name":"Test"}'

# Логин
curl -X POST https://your-api.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# Список проектов
curl https://your-api.com/api/projects
```

### Проверка страниц

Откройте в браузере:
- `/` - Landing page ✓
- `/login` - Авторизация ✓
- `/register` - Регистрация ✓
- `/dashboard` - Личный кабинет ✓
- `/projects` - ПроектХАБ ✓
- `/projects/vod-lab-israel` - Детали проекта ✓
- `/globe` - 3D Глобус ✓
- `/dao` - DAO Governance ✓
- `/dao/prop-001` - Голосование ✓
- `/dao/new` - Создание предложения ✓
- `/feed` - Социальная лента ✓
- `/missions` - Миссии ✓
- `/achievements` - Достижения ✓
- `/wallet` - Кошелёк ✓
- `/buy` - Покупка токенов ✓

---

## 📱 Настройка Telegram Mini App

### 1. Создание бота

1. Откройте [@BotFather](https://t.me/BotFather)
2. Отправьте `/newbot`
3. Следуйте инструкциям, получите токен

### 2. Настройка Web App

Отправьте BotFather:
```
/mybots → Выберите бота → Bot Settings → Menu Button → Configure menu button
```

Или через API:
```bash
curl -X POST \
  https://api.telegram.org/bot<TOKEN>/setChatMenuButton \
  -H 'Content-Type: application/json' \
  -d '{
    "menu_button": {
      "type": "web_app",
      "text": "🚀 Launch",
      "web_app": {
        "url": "https://your-domain.com/telegram"
      }
    }
  }'
```

### 3. Настройка домена

Отправьте BotFather:
```
/setdomain
```
И укажите: `your-domain.com`

---

## 📊 Мониторинг и логи

### Render Logs

```bash
# Установите CLI
npm i -g @render/cli

# Просмотр логов
render logs --tail
```

### Vercel Analytics

Включите в дашборде Vercel:
- **Analytics** → Enable
- **Speed Insights** → Enable

### Health Monitoring (UptimeRobot)

1. Зарегистрируйтесь на [uptimerobot.com](https://uptimerobot.com)
2. Добавьте мониторинг:
   - URL: `https://your-api.com/api/health`
   - Interval: 5 minutes
   - Alert on: Down

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Создайте `.github/workflows/deploy.yml`:

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
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
      
      - name: Run linter
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Build
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Render
        run: |
          curl -X POST \
            -H "Authorization: Bearer ${{ secrets.RENDER_API_KEY }}" \
            https://api.render.com/v1/services/${{ secrets.RENDER_SERVICE_ID }}/deploys
```

---

## 🛠️ Troubleshooting

### Ошибка: "Cannot find module '@react-three/fiber'"

```bash
npm install @react-three/fiber @react-three/drei three
```

### Ошибка: "Prisma Client could not locate the Query Engine"

В Render добавьте в build command:
```bash
npm install && npx prisma generate --schema=./prisma/schema.prisma && npx prisma migrate deploy && npm run build
```

### Ошибка CORS

Убедитесь что `NEXT_PUBLIC_API_URL` включает полный путь с `/api`.

### Ошибка: "JWT malformed"

Проверьте что:
1. `JWT_SECRET` установлен
2. Длина >= 32 символов
3. Нет спецсимволов без кавычек

---

## 📈 Масштабирование (для BETA)

### База данных

При переходе на платный план Render:
```
Standard → 2GB RAM, 10GB SSD ($15/мес)
Pro → 4GB RAM, 50GB SSD ($50/мес)
```

### CDN

Настройте Cloudflare:
1. Добавьте сайт
2. Установите SSL: Full (strict)
3. Включите caching для статики
4. Настройте Page Rules для API

### Мониторинг

Добавьте Sentry:
```bash
npm install @sentry/nextjs
```

---

## 📞 Поддержка

При проблемах с деплоем:
1. Проверьте логи Render: Dashboard → Logs
2. Проверьте логи Vercel: Dashboard → Deployments
3. Проверьте health endpoint
4. Создайте Issue в GitHub репозитории

---

## ✅ Чек-лист перед запуском

- [ ] Репозиторий на GitHub
- [ ] PostgreSQL на Render создана
- [ ] Web Service на Render настроен
- [ ] Проект на Vercel деплоен
- [ ] Переменные окружения установлены
- [ ] Миграции выполнены
- [ ] Health check проходит
- [ ] Telegram Mini App настроен
- [ ] SSL сертификат активен
- [ ] Тестовая регистрация работает
- [ ] 3D Глобус загружается
- [ ] DAO голосование доступно

---

**Последнее обновление:** 18.02.2026
**Версия:** Alpha 1.0
