# Looporb Design System

Дизайн-система для Looporb Platform, сочетающая **неоморфизм**, **ретрофутуризм** и **брутализм**.

## 📁 Структура файлов

```
src/
├── lib/
│   ├── design-tokens.ts      # Токены дизайна (цвета, тени, градиенты)
│   └── utils.ts              # Утилиты (cn для классов)
├── components/ui/
│   ├── index.ts              # Экспорт всех компонентов
│   ├── NeumorphicCard.tsx    # Неоморфные карточки и кнопки
│   ├── RetroGrid.tsx         # Ретро-сетка и эффекты
│   ├── BrutalistButton.tsx   # Бруталистские кнопки и карточки
│   ├── TechBadge.tsx         # HUD элементы и бейджи
│   └── design-system-examples.tsx  # Примеры использования
└── app/[locale]/
    └── globals.css           # CSS утилиты и переменные
```

## 🎨 Цветовые палитры

### Ocean (базовая)
```typescript
ocean: {
  deep: '#0a1628',      // Глубокий океан
  mid: '#1a3a5c',       // Средняя глубина
  shallow: '#2d5a7b',   // Мелководье
  surface: '#162438',   // Поверхность
  highlight: '#3b82f6', // Подсветка
}
```

### Neumorphism (объёмные)
```typescript
neumorph: {
  base: '#1e293b',
  light: '#334155',
  dark: '#0f172a',
  accent: '#22d3ee',
}
```

### Retro (синтвейв)
```typescript
retro: {
  sunset: '#ff6b6b',
  neon: '#f0f',
  cyan: '#0ff',
  purple: '#9d4edd',
  horizon: '#1a0a2e',
}
```

### Brutalist (контрастные)
```typescript
brutal: {
  black: '#000000',
  white: '#ffffff',
  yellow: '#fff000',
  red: '#ff0000',
  blue: '#0000ff',
}
```

## 🧩 Компоненты

### NeumorphicCard

```tsx
import { NeumorphicCard, NeumorphicButton } from '@/components/ui';

<NeumorphicCard variant="outset" size="md" glow="cyan">
  <h3>Заголовок</h3>
  <p>Содержимое карточки</p>
</NeumorphicCard>

<NeumorphicButton size="lg" glow="purple">
  Нажми меня
</NeumorphicButton>
```

**Props:**
- `variant`: `'outset' | 'inset'` - выпуклый или вдавленный
- `size`: `'sm' | 'md' | 'lg' | 'xl'`
- `glow`: `'cyan' | 'purple' | 'pink' | 'blue' | false`
- `hoverable`: `boolean` - анимация при наведении

### RetroGrid

```tsx
import { RetroGrid, Scanlines, RetroSun, Starfield } from '@/components/ui';

<div className="relative h-96">
  <RetroGrid color="cyan" perspective animated opacity={0.3} />
  <Scanlines opacity={0.1} animated />
</div>
```

**Props:**
- `color`: `'cyan' | 'purple' | 'pink' | 'white'`
- `gridSize`: `number` - размер ячеек в пикселях
- `perspective`: `boolean` - 3D перспектива
- `animated`: `boolean` - анимация движения

### BrutalistButton

```tsx
import { BrutalistButton, BrutalistCard, BrutalistBadge } from '@/components/ui';

<BrutalistButton variant="yellow" hoverAnimation="lift">
  ACTION
</BrutalistButton>

<BrutalistCard variant="mono" borderSize="lg">
  <BrutalistBadge variant="green">ONLINE</BrutalistBadge>
</BrutalistCard>
```

**Props:**
- `variant`: `'default' | 'yellow' | 'red' | 'blue' | 'mono'`
- `size`: `'sm' | 'md' | 'lg'`
- `borderSize`: `'sm' | 'md' | 'lg'`
- `hoverAnimation`: `'lift' | 'press' | 'skew' | 'none'`

### TechBadge (HUD стиль)

```tsx
import { TechBadge, HUDPanel, DataBar } from '@/components/ui';

<TechBadge status="online" pulse glow>
  System Active
</TechBadge>

<HUDPanel title="System Monitor" scanlines corners>
  <DataBar label="CPU" value={75} variant="cyan" animated />
</HUDPanel>
```

**Props TechBadge:**
- `status`: `'online' | 'offline' | 'warning' | 'error' | 'neutral'`
- `size`: `'sm' | 'md' | 'lg'`
- `glow`: `boolean` - свечение
- `pulse`: `boolean` - пульсация

## 🎯 CSS Утилиты

### Неоморфизм
```css
.neumorph-base           /* Базовый фон */
.neumorph-outset-md      /* Выпуклая тень */
.neumorph-inset-md       /* Вдавленная тень */
.neumorph-glow-cyan      /* Свечение */
.neumorph-hover-lift     /* Подъём при наведении */
```

### Ретро-сетка
```css
.retro-grid              /* Сетка */
.retro-grid-perspective  /* 3D перспектива */
.retro-grid-animated     /* Анимация */
.scanlines-overlay       /* CRT эффект */
```

### Брутализм
```css
.brutal-border           /* Толстая рамка */
.brutal-shadow           /* Жёсткая тень */
.brutal-hover-lift       /* Подъём при наведении */
```

### HUD элементы
```css
.tech-badge              /* Техно-бейдж */
.hud-panel               /* HUD панель */
.hud-corner              /* Угловые элементы */
.data-bar                /* Полоса данных */
.tech-divider            /* Разделитель */
```

### Мобильная адаптация
```css
.compact-padding         /* Компактные отступы */
.compact-gap             /* Компактные промежутки */
.touch-target            /* Мин. 44px */
.touch-target-comfortable /* Мин. 48px */
```

## 📱 Мобильная оптимизация

Все компоненты адаптированы для мобильных устройств:

- **Минимальный размер касания**: 44px (WCAG)
- **Комфортный размер**: 48px
- **Уменьшенные тени** на мобильных для производительности
- **Compact режим** через классы `.compact-padding`, `.compact-gap`

```tsx
// Автоматическая адаптация
<button className="min-h-touch-comfortable">
  Touch-friendly button
</button>

<div className="compact-padding compact-gap">
  {/* Контент с уменьшенными отступами на мобильных */}
</div>
```

## 🎭 Градиенты

```typescript
// Ocean
--gradient-ocean-vertical
--gradient-ocean-horizontal

// Retro
--gradient-retro-sunset
--gradient-retro-neon
--gradient-retro-cyber

// Neumorphic
--gradient-neumorph-surface

// HUD
--gradient-hud-scanline
--gradient-hud-energy
```

## ⚡ Анимации

Доступные анимации в Tailwind:

```typescript
animate-float          // Плавное парение
animate-glow           // Пульсирующее свечение
animate-retro-grid     // Движение сетки
animate-scanline-flicker // CRT мерцание
animate-star-twinkle   // Мерцание звёзд
animate-tech-pulse     // Техно-пульсация
animate-data-bar-shine // Блеск полосы данных
```

## ♿ Доступность

- **Reduced Motion**: Уважает `prefers-reduced-motion`
- **High Contrast**: Поддержка `prefers-contrast: high`
- **Focus Visible**: Контрастная обводка для фокуса
- **Touch Targets**: Минимум 44px для интерактивных элементов

## 🚀 Быстрый старт

```tsx
import {
  NeumorphicCard,
  RetroGrid,
  BrutalistButton,
  TechBadge,
} from '@/components/ui';

export default function Page() {
  return (
    <div className="relative min-h-screen bg-ocean-deep">
      <RetroGrid color="cyan" perspective animated />
      
      <NeumorphicCard variant="outset" glow="cyan">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <TechBadge status="online" className="mt-2">
          System Ready
        </TechBadge>
        <BrutalistButton variant="yellow" className="mt-4">
          Get Started
        </BrutalistButton>
      </NeumorphicCard>
    </div>
  );
}
```

## 📄 Лицензия

В рамках проекта Looporb Platform
