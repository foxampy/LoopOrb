import React from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Info,
  Lock,
  RefreshCw,
  Inbox,
  FileText,
  Users,
  TrendingUp,
  Droplets,
  FolderOpen,
  Activity,
  Shield,
  Zap,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react";

export type EmptyStateType =
  | "empty"
  | "loading"
  | "auth-required"
  | "no-data"
  | "error"
  | "success"
  | "info"
  | "locked"
  | "search-empty";

export interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const iconMap: Record<EmptyStateType, React.ElementType> = {
  empty: Inbox,
  loading: RefreshCw,
  "auth-required": Lock,
  "no-data": FileText,
  error: XCircle,
  success: CheckCircle,
  info: Info,
  locked: Shield,
  "search-empty": AlertCircle,
};

const colorMap: Record<EmptyStateType, string> = {
  empty: "from-slate-400 to-gray-400",
  loading: "from-blue-400 to-cyan-400",
  "auth-required": "from-amber-400 to-orange-400",
  "no-data": "from-slate-400 to-gray-400",
  error: "from-red-400 to-rose-400",
  success: "from-green-400 to-emerald-400",
  info: "from-blue-400 to-indigo-400",
  locked: "from-purple-400 to-pink-400",
  "search-empty": "from-orange-400 to-amber-400",
};

const titleMap: Record<EmptyStateType, string> = {
  empty: "Пусто",
  loading: "Загрузка...",
  "auth-required": "Требуется авторизация",
  "no-data": "Нет данных",
  error: "Произошла ошибка",
  success: "Успешно",
  info: "Информация",
  locked: "Доступ ограничен",
  "search-empty": "Ничего не найдено",
};

const descriptionMap: Record<EmptyStateType, string> = {
  empty: "Здесь пока ничего нет",
  loading: "Пожалуйста, подождите...",
  "auth-required": "Войдите в аккаунт для доступа к этой информации",
  "no-data": "Данные отсутствуют или ещё не загружены",
  error: "Что-то пошло не так. Попробуйте снова",
  success: "Операция успешно выполнена",
  info: "Обратите внимание на эту информацию",
  locked: "Этот контент доступен только авторизованным пользователям",
  "search-empty": "По вашему запросу ничего не найдено",
};

/**
 * Универсальный компонент Empty State
 * Используется для отображения пустых состояний, загрузки, ошибок и других статусов
 */
export function EmptyState({
  type = "empty",
  title,
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  const IconComponent = iconMap[type];
  const colorClass = colorMap[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      {/* Icon */}
      <div className={`w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center ${type === "loading" ? "animate-spin" : ""}`}>
        {icon || React.createElement(IconComponent as React.ComponentType<{ className?: string }>, { className: "w-8 h-8 text-white" })}
      </div>

      {/* Title */}
      {title && (
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      )}
      {!title && (
        <h3 className="text-lg font-semibold text-white mb-2">
          {titleMap[type]}
        </h3>
      )}

      {/* Description */}
      {description && (
        <p className="text-sm text-slate-400 max-w-md mb-4">{description}</p>
      )}
      {!description && (
        <p className="text-sm text-slate-400 max-w-md mb-4">
          {descriptionMap[type]}
        </p>
      )}

      {/* Action */}
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  );
}

/**
 * Компонент для отображения скелетона загрузки
 */
export function SkeletonLoader({
  className = "",
  variant = "rect",
  width = "100%",
  height = "20px",
}: {
  className?: string;
  variant?: "rect" | "circle" | "text";
  width?: string;
  height?: string;
}) {
  const baseClasses = "animate-pulse bg-slate-700/50";
  const variantClasses =
    variant === "circle"
      ? "rounded-full"
      : variant === "text"
      ? "h-4 rounded"
      : "rounded-lg";

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={{ width, height }}
    />
  );
}

/**
 * Компонент карточки-скелетона для списков
 */
export function SkeletonCard({
  lines = 3,
  className = "",
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`p-4 space-y-3 ${className}`}>
      <div className="flex items-center gap-3">
        <SkeletonLoader variant="circle" width="40px" height="40px" />
        <div className="flex-1 space-y-2">
          <SkeletonLoader variant="text" width="60%" />
          <SkeletonLoader variant="text" width="40%" />
        </div>
      </div>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLoader key={i} variant="text" />
      ))}
    </div>
  );
}

/**
 * Компонент для отображения состояния "Требуется авторизация"
 */
export function AuthRequired({
  title,
  description,
  loginLink = "/login",
  registerLink = "/register",
  className = "",
}: {
  title?: string;
  description?: string;
  loginLink?: string;
  registerLink?: string;
  className?: string;
}) {
  return (
    <EmptyState
      type="auth-required"
      title={title}
      description={
        description ||
        "Для доступа к этой информации необходимо войти в аккаунт или зарегистрироваться"
      }
      className={className}
      action={
        <div className="flex gap-3">
          <a
            href={loginLink}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium rounded-lg transition"
          >
            Войти
          </a>
          <a
            href={registerLink}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition"
          >
            Регистрация
          </a>
        </div>
      }
    />
  );
}

/**
 * Компонент для отображения состояния "Нет данных"
 */
export function NoDataAvailable({
  title,
  description,
  action,
  className = "",
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <EmptyState
      type="no-data"
      title={title}
      description={description || "Данные загружаются... Попробуйте обновить страницу"}
      className={className}
      action={
        action || (
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Обновить
          </button>
        )
      }
    />
  );
}

/**
 * Компонент для отображения состояния загрузки
 */
export function LoadingState({
  title,
  description,
  className = "",
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <EmptyState
      type="loading"
      title={title}
      description={description}
      className={className}
    />
  );
}

/**
 * Компонент для отображения ошибки
 */
export function ErrorState({
  title,
  description,
  retryAction,
  className = "",
}: {
  title?: string;
  description?: string;
  retryAction?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      type="error"
      title={title}
      description={description || "Произошла непредвиденная ошибка"}
      className={className}
      action={
        retryAction ? (
          <button
            onClick={retryAction}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium rounded-lg transition flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Попробовать снова
          </button>
        ) : undefined
      }
    />
  );
}

/**
 * Компонент для контекстно-зависимых empty states
 */
export function ContextualEmptyState({
  context,
  className = "",
}: {
  context:
    | "projects"
    | "notifications"
    | "messages"
    | "achievements"
    | "missions"
    | "sensors"
    | "friends"
    | "wallet";
  className?: string;
}) {
  const configs: Record<string, { icon: React.ElementType; title: string; description: string; action?: string }> =
    {
      projects: {
        icon: FolderOpen,
        title: "Нет проектов",
        description: "Вы ещё не участвуете ни в одном проекте",
        action: "Начать инвестировать",
      },
      notifications: {
        icon: Bell,
        title: "Нет уведомлений",
        description: "У вас нет новых уведомлений",
      },
      messages: {
        icon: MessageSquare,
        title: "Нет сообщений",
        description: "Начните общение или выберите чат",
      },
      achievements: {
        icon: Award,
        title: "Нет достижений",
        description: "Выполняйте миссии и получайте награды",
      },
      missions: {
        icon: Target,
        title: "Нет активных миссий",
        description: "Все доступные миссии выполнены",
      },
      sensors: {
        icon: Activity,
        title: "Нет данных сенсоров",
        description: "Данные с датчиков ещё не загружены",
      },
      friends: {
        icon: Users,
        title: "Нет друзей",
        description: "Пригласите друзей или найдите новых",
      },
      wallet: {
        icon: Wallet,
        title: "Пустой кошелёк",
        description: "Совершите первую транзакцию",
      },
    };

  const config = configs[context] || configs.projects;
  const Icon = config.icon;

  return (
    <EmptyState
      type="empty"
      icon={React.createElement(Icon as React.ComponentType<{ className?: string }>, { className: "w-8 h-8" })}
      title={config.title}
      description={config.description}
      className={className}
    />
  );
}

// Иконки для ContextualEmptyState
function Bell({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;
}
function MessageSquare({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
}
function Award({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}
function Target({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
}
function Wallet({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
}
