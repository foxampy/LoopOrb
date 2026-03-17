# Компонент "Экстренная кнопка" (Emergency Button)

## Обзор

Компонент для быстрого сообщения о критических загрязнениях водных ресурсов. Предназначен для вовлечения граждан в мониторинг экологической обстановки с системой материального стимулирования.

## Файлы

```
src/components/
├── EmergencyButton.tsx      # FAB кнопка
├── EmergencyModal.tsx       # Модальное окно (3 шага)
└── ...

src/app/[locale]/api/emergency/
└── report/
    └── route.ts             # API endpoint
```

## Функциональность

### EmergencyButton

FAB (Floating Action Button) кнопка с характеристиками:

- **Позиция**: Фиксированная, правый нижний угол
- **Дизайн**: Неоморфизм + ретрофутуризм
- **Анимации**:
  - Пульсирующие кольца для привлечения внимания
  - Hover эффект с увеличением
  - Ретрофутуристические декоративные элементы (вращающиеся круги)
- **Адаптация**: 64px на мобильных, 80px на десктопе

### EmergencyModal

Модальное окно с 3 шагами:

#### Шаг 1: Тип происшествия

4 варианта с иконками и описанием:

| Тип | Иконка | Описание | Награда |
|-----|--------|----------|---------|
| Разлив веществ | 💧 Droplets | Химический разлив, нефтепродукты | $100-500 |
| Гибель рыбы | 🐟 Fish | Массовая гибель водных организмов | $50-300 |
| Изменение цвета | 🎨 Palette | Цветение водорослей, загрязнение | $50-200 |
| Другое | ⚠️ AlertTriangle | Иные критические загрязнения | $50-150 |

#### Шаг 2: Фото/Видео + Геолокация

- **Загрузка файлов**: До 5 файлов (JPG, PNG, WebP, MP4, WebM)
- **Превью**: Сетка загруженных медиа с возможностью удаления
- **Геолокация**: Автоматическое определение через Geolocation API
- **Описание**: Опциональное текстовое поле

#### Шаг 3: Подтверждение

- Сводка всех данных
- Контактные данные (опционально)
- Предупреждение об ответственности за ложные сообщения
- Кнопка отправки

## Дизайн-система

### Неоморфизм

```css
/* Тени для объёма */
box-shadow: 
  0 4px 12px rgba(0, 0, 0, 0.2),
  inset 0 2px 4px rgba(255, 255, 255, 0.1);

/* Градиенты */
background: linear-gradient(
  145deg,
  rgba(30, 41, 59, 0.95) 0%,
  rgba(15, 23, 42, 0.98) 100%
);
```

### Ретрофутуризм

```css
/* Декоративные элементы */
- Вращающиеся круги с dasharray
- Светящиеся акценты
- Технологичные градиенты (cyan, blue, purple)
```

### Цветовая палитра

```
Emergency Red: #ef4444 → #b91c1c
Cyan Glow: #22d3ee
Ocean Deep: #0a1628
```

## Мобильная адаптация

### Bottom Sheet поведение

На мобильных устройствах (ширина < 640px):

- Модальное окно прижато к низу экрана
- Закруглённые углы только сверху
- Максимальная высота 90vh с прокруткой
- Увеличенные области нажатия

### Touch оптимизация

- Минимальный размер кнопок: 44x44px
- Большие отступы между элементами
- Поддержка свайпов (в будущем)

## Интеграции

### API Endpoint

**POST /api/emergency/report**

```typescript
Request:
{
  incidentType: "spill" | "fish_death" | "color_change" | "other",
  description: string,
  location: { lat: number, lng: number, address?: string },
  contactEmail?: string,
  contactPhone?: string,
  mediaUrls?: string[]
}

Response (201):
{
  success: true,
  data: {
    reportId: string,
    status: "pending",
    estimatedReward: { min: number, max: number, currency: "VOD" }
  }
}
```

### WebSocket (планируется)

```typescript
// Сервер → Клиент
{
  type: "EMERGENCY_REPORT_VERIFIED",
  payload: {
    reportId: string,
    rewardAmount: number,
    verifiedAt: string
  }
}
```

### Globe Маркеры

После создания отчёта на глобусе появляется маркер:

```typescript
// Тип маркера
{
  type: "emergency",
  coordinates: { lat, lng },
  status: "pending" | "verified" | "rejected",
  incidentType: string,
  createdAt: string
}
```

## Награды

### Диапазоны

| Тип | Минимум | Максимум | Критерии |
|-----|---------|----------|----------|
| Разлив | $100 | $500 | Площадь, опасность веществ |
| Гибель рыбы | $50 | $300 | Количество, редкость вида |
| Цвет воды | $50 | $200 | Масштаб, токсичность |
| Другое | $50 | $150 | Серьёзность угрозы |

### Процесс верификации

1. **Автоматическая проверка** (AI анализ фото)
2. **Модерация** (команда экологов)
3. **Подтверждение** (локальные волонтёры)
4. **Выплата** (токены VOD на кошелёк)

## Использование

### Базовое

```tsx
import { EmergencyButton } from "@/components/EmergencyButton";

export default function Page() {
  const handleSubmit = async (data) => {
    console.log("Emergency report:", data);
  };

  return (
    <div>
      {/* Контент страницы */}
      <EmergencyButton onReportSubmit={handleSubmit} />
    </div>
  );
}
```

### С кастомными стилями

```tsx
<EmergencyButton 
  onReportSubmit={handleSubmit}
  className="bottom-8 right-8" // Переопределение позиции
/>
```

## Типы данных

```typescript
type IncidentType = "spill" | "fish_death" | "color_change" | "other";

interface EmergencyReportData {
  incidentType: IncidentType;
  description: string;
  mediaFiles: File[];
  mediaPreviews: string[];
  location: {
    lat: number | null;
    lng: number | null;
    address?: string;
  };
  contactEmail?: string;
  contactPhone?: string;
}
```

## Зависимости

```json
{
  "react": "^19.0.0",
  "framer-motion": "^12.0.0",
  "lucide-react": "^0.475.0",
  "next": "^15.0.0"
}
```

## Будущие улучшения

- [ ] AR режим для наложения информации на камеру
- [ ] Оффлайн режим с отложенной отправкой
- [ ] Групповые репорты (несколько пользователей)
- [ ] Интеграция с IoT сенсорами для автоверификации
- [ ] Рейтинг пользователей по качеству репортов
- [ ] Push уведомления о статусе проверки

## Безопасность

### Защита от злоупотреблений

- Rate limiting: 5 репортов в час
- Проверка уникальности фото (hash)
- Геолокация обязательна
- Модерация перед выплатой

### Конфиденциальность

- Контакты видны только модераторам
- Публичная анонимность (опционально)
- GDPR compliance для EU пользователей

---

**Версия:** 1.0  
**Дата:** 17.03.2026  
**Статус:** ✅ Готово к использованию
