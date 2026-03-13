# VODeco Platform - Полный План Разработки

## 📋 ОБЗОР
Платформа децентрализованной экономики воды - мобильное-first веб-приложение (PWA-ready) с оффчейн токеномикой и DAO.

## 🎯 ФАЗЫ РАЗРАБОТКИ

---

## PHASE 1: Backend & Database Setup (Supabase)

### 1.1 Supabase Project Setup
- [ ] Создать проект Supabase
- [ ] Настроить аутентификацию (Email, OAuth)
- [ ] Настроить Row Level Security (RLS)
- [ ] Создать ENV переменные

### 1.2 Database Schema
```sql
-- Пользователи
- profiles (id, email, name, avatar, bio, location, website, occupation)
- user_stats (user_id, level, xp, reputation, projects_created, etc.)
- user_wallets (user_id, balance, staked, total_earned)

-- Проекты
- projects (id, slug, name, description, status, budget, timeline, team_size)
- project_milestones (id, project_id, title, date, completed)
- project_preorders (id, project_id, user_id, amount, status)

-- DAO
- proposals (id, title, description, category, status, votes_for, votes_against)
- votes (id, proposal_id, user_id, vote_type, weight)

-- Миссии/Аирдропы
- missions (id, title, description, type, reward, requirements)
- user_missions (id, user_id, mission_id, status, completed_at)
- referrals (id, referrer_id, referred_id, status, reward_claimed)

-- Данные о воде
- water_data_sources (id, name, api_endpoint, region)
- water_quality_cache (id, source_id, location, params, value, timestamp)

-- Библиотека знаний
- research_papers (id, title, author, abstract, url, verified, submitted_by)
- knowledge_base (id, category, title, content, verified, votes)

-- B2B/Партнерства
- partners (id, name, type, logo, description, contact_email, status)
- partner_users (id, partner_id, user_id, role)

-- Посты/Социал
- posts (id, user_id, content, image, likes, created_at)
- comments (id, post_id, user_id, content)
```

### 1.3 API Routes (Offline-ready)
- [ ] `/api/auth/*` - Аутентификация через Supabase
- [ ] `/api/wallet/*` - Оффчейн баланс и транзакции
- [ ] `/api/projects/*` - CRUD проектов
- [ ] `/api/dao/*` - Голосование (offline, записывать в БД)
- [ ] `/api/missions/*` - Задания и награды
- [ ] `/api/water-data/*` - Проксирование внешних API
- [ ] `/api/partners/*` - B2B функционал
- [ ] `/api/knowledge/*` - Библиотека знаний

---

## PHASE 2: Real Water Data APIs Integration

### 2.1 Доступные API
| API | Данные | URL |
|-----|--------|-----|
| USGS Water Data | Реальное время (США) | https://api.waterdata.usgs.gov |
| Water Quality Portal | Качество воды (USGS+EPA) | https://www.waterqualitydata.us |
| UNESCO IIWQ | Глобальное качество | https://waterquality.eomap.com |
| Open-Meteo | Погода/осадки | https://open-meteo.com |
| World Bank Water | Статистика | https://data.worldbank.org/topic/water |

### 2.2 Интеграция
- [ ] Сервис для fetch USGS данных
- [ ] Кэширование в Supabase (обновление каждые 6 часов)
- [ ] Карта с точками мониторинга
- [ ] Графики качества воды
- [ ] Дашборд "Состояние воды в мире"

### 2.3 Новости воды
- [ ] RSS агрегатор (World Water Council, UN Water)
- [ ] Новостная лента на главной

---

## PHASE 3: Mobile-First Responsive Design

### 3.1 PWA Setup
- [ ] `manifest.json`
- [ ] Service Worker для оффлайн работы
- [ ] Иконки для всех платформ
- [ ] Splash screens

### 3.2 Mobile UX/UI
- [ ] Bottom Navigation (5 табов)
- [ ] Swipe gestures
- [ ] Pull-to-refresh
- [ ] Touch-friendly buttons (min 44px)
- [ ] Оптимизация шрифтов
- [ ] Dark mode support

### 3.3 Адаптивные страницы
- [ ] Profile - карточный вид
- [ ] ProjectHub - список → деталь
- [ ] DAO - компактные карточки
- [ ] Wallet - mobile-first дизайн

---

## PHASE 4: ProjectHub Detailed Pages

### 4.1 Страница проекта (`/projects/[slug]`)
- [ ] Hero с изображением проекта
- [ ] Описание + видео (YouTube embed)
- [ ] Текущий статус (timeline)
- [ ] Команда проекта
- [ ] Финансирование (собрано / цель)
- [ ] Документы (PDF whitepaper)
- [ ] FAQ проекта

### 4.2 Pre-order / Crowdfunding
- [ ] Тiers (уровни поддержки)
- [ ] Форма предзаказа (без оплаты пока)
- [ ] "Notify me when available"
- [ ] Счетчик предзаказов
- [ ] Сроки доставки

### 4.3 QR / Bluetooth (обозначение)
- [ ] Кнопка "Connect Device" → модалка
- [ ] Инфо: "Будет доступно в приложении"
- [ ] Инструкция по подключению
- [ ] Стейкинг в проект (кнопка → страница стейкинга)

### 4.4 Проекты для реализации
| Проект | Статус | Pre-order |
|--------|--------|-----------|
| AquaCell Genesis | Production | ✅ Доступен |
| AquaHome Pro | Beta testing | ✅ Доступен |
| VOD Chain Core | Development | 🔜 Скоро |
| AI Analytics Engine | Development | 🔜 Скоро |
| AquaDrone Fleet | Concept | 📋 Waitlist |
| DeSci Verification | Testing | 🔜 Скоро |

---

## PHASE 5: B2B & Partnerships Portal

### 5.1 Страница партнерств (`/partners`)
- [ ] Категории: Government, NGOs, Research, Corporate
- [ ] Карточки партнеров
- [ ] Форма "Стать партнером"

### 5.2 Профиль партнера (`/partners/[id]`)
- [ ] Описание компании
- [ ] Контакты
- [ ] Совместные проекты
- [ ] B2B Dashboard (для авторизованных)

### 5.3 B2B Dashboard
- [ ] Управление устройствами
- [ ] Отчеты по качеству воды
- [ ] API доступ
- [ ] Инвойсы и платежи

---

## PHASE 6: Missions & Airdrops System

### 6.1 Страница миссий (`/missions`)
Категории заданий:

#### 🎯 Onboarding
- [ ] Заполнить профиль (+50 XP)
- [ ] Подтвердить email (+20 XP)
- [ ] Присоединиться к Telegram (+30 XP)

#### 🤝 Referral Program
- [ ] Пригласи 1 друга (+100 XP)
- [ ] Пригласи 5 друзей (+500 XP + badge)
- [ ] Пригласи 10 друзей (+1000 XP + NFT)

#### 💰 Investment
- [ ] Купи токенов на $100 (+200 XP)
- [ ] Купи токенов на $500 (+500 XP + bonus)
- [ ] Купи токенов на $1000 (+1000 XP + VIP статус)
- [ ] Застейкай токены на 30 дней (+300 XP)

#### 📝 Content
- [ ] Оставь отзыв о проекте (+50 XP)
- [ ] Напиши статью (+200 XP)
- [ ] Создай видео (+500 XP)
- [ ] Поделись в Twitter (+30 XP)
- [ ] Поделись в LinkedIn (+30 XP)

#### 📊 Data Contribution
- [ ] Зарегистрируй объект воды (+100 XP)
- [ ] Добавь 5 измерений (+150 XP)
- [ ] Подтверди данные другого пользователя (+20 XP)
- [ ] Добавь исследование в библиотеку (+200 XP)
- [ ] Верифицируй исследование (+50 XP)

### 6.2 Система наград
- [ ] XP за каждое задание
- [ ] Badges (NFT-ready)
- [ ] Лидерборд
- [ ] Ежедневные бонусы

### 6.3 Ретродроп
- [ ] Подсчет активности пользователя
- [ ] Распределение токенов по уровням
- [ ] Claim интерфейс

---

## PHASE 7: Remove All Demo Data

### 7.1 Список страниц для очистки
- [ ] `/profile` - ✅ Уже сделано (пустой профиль)
- [ ] `/achievements` - Убрать mock данные
- [ ] `/dao` - Убрать mock proposals
- [ ] `/projects` - Убрать mock projects
- [ ] `/missions` - Убрать mock missions
- [ ] `/feed` - Убрать mock posts
- [ ] `/wallet` - Убрать demo transactions
- [ ] `/globe` - Реальные API данные

### 7.2 Пустые состояния (Empty States)
- [ ] Иллюстрации для пустых списков
- [ ] CTA кнопки ("Создать первый проект", "Присоединиться к DAO")
- [ ] Onboarding подсказки

---

## PHASE 8: DAO Offline Implementation

### 8.1 Архитектура (Supabase)
```
Предложение создается → Сохраняется в БД
Голосование → Записывается votes таблицу
Кворум считается → SUM(votes) в реальном времени
Результат → Обновляется proposal статус
```

### 8.2 Страницы
- [ ] `/dao` - Список предложений
- [ ] `/dao/[id]` - Детальная страница голосования
- [ ] `/dao/new` - Создание предложения
- [ ] `/dao/analytics` - Статистика голосований

### 8.3 Логика голосования
- [ ] Weight = staked_tokens
- [ ] Минимум 100 VOD для голоса
- [ ] Период голосования: 7-14 дней
- [ ] Кворум: 10% от circulating supply

---

## PHASE 9: Tokenomics Offline Implementation

### 9.1 Off-chain Wallet
- [ ] Баланс в Supabase
- [ ] История транзакций
- [ ] Staking/Unstaking (записи в БД)
- [ ] Rewards calculation (cron job)

### 9.2 Token Metrics
- [ ] Эмуляция цены (алгоритм от Water Index)
- [ ] Эмиссия на основе данных
- [ ] Price stabilization bands (DAO управляет)

### 9.3 VODCoin → VOD Conversion
- [ ] Формула: work_value / water_index
- [ ] Time bonus: 1 + (months/100)
- [ ] Verification bonus: +50% за validated work

---

## PHASE 10: Knowledge Base & Research Library

### 10.1 Библиотека знаний (`/knowledge`)
- [ ] Категории: Research, Reports, Guides, Standards
- [ ] Поиск по документам
- [ ] Фильтры: дата, автор, теги

### 10.2 Страница документа (`/knowledge/[id]`)
- [ ] PDF viewer
- [ ] Аннотации и комментарии
- [ ] Система верификации
- [ ] Voting (полезно/неполезно)

### 10.3 Добавление исследования
- [ ] Форма загрузки
- [ ] DOI verification
- [ ] Peer review система
- [ ] Rewards за вклад

### 10.4 Интеграция
- [ ] Google Scholar API
- [ ] CrossRef API
- [ ] ResearchGate embed

---

## 📱 МОБИЛЬНОЕ ПРИЛОЖЕНИЕ (Future Capstone)

### Roadmap to Mobile App
1. **Phase 1-10** → Завершить веб-версию
2. **Capacitor/Ionic** → Wrap веб в нативное приложение
3. **Native features**:
   - Bluetooth LE для устройств
   - QR scanner
   - Push notifications
   - GPS для объектов
   - Камера для фото

---

## 🚀 ПРИОРИТЕТЫ ЗАПУСКА

### MVP (2-3 недели)
1. Supabase setup + Auth
2. Очистка demo данных
3. Mobile-first UI
4. ProjectHub + pre-orders
5. Missions базовые

### Beta (4-6 недель)
6. DAO offline
7. Tokenomics offline
8. Real water APIs
9. B2B portal
10. Knowledge base

### Production (8+ недель)
11. Capacitor mobile app
12. Bluetooth/QR integration
13. Blockchain migration
14. Advanced analytics

---

## 📁 НОВЫЕ ФАЙЛЫ И СТРУКТУРА

```
looporb-platform/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (main)/
│   │   │   ├── profile/
│   │   │   ├── projects/
│   │   │   │   └── [slug]/
│   │   │   ├── dao/
│   │   │   ├── missions/
│   │   │   ├── partners/
│   │   │   └── knowledge/
│   │   └── api/
│   ├── components/
│   │   ├── mobile/
│   │   ├── charts/
│   │   └── forms/
│   ├── lib/
│   │   ├── supabase/
│   │   ├── water-apis/
│   │   └── hooks/
│   └── types/
├── supabase/
│   ├── migrations/
│   └── seed.sql
└── public/
    └── pwa/
```

---

## ✅ ЧТО УЖЕ СДЕЛАНО
- [x] Базовая архитектура Next.js 16
- [x] Tailwind + Framer Motion
- [x] i18n (12 языков)
- [x] Landing page
- [x] Ecosystem page
- [x] Tokenomics page (UI)
- [x] ProjectHub page (UI)
- [x] Profile page (UI, empty state)
- [x] Навбары на всех страницах
- [x] Build passing

---

## 📊 ТЕКУЩИЙ СТАТУС
**Готово:** ~35%
**В работе:** Следующая фаза
