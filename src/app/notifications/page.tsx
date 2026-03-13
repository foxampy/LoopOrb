"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  TrendingUp,
  Droplets,
  Award,
  Check,
  Loader2,
  Trash2,
  Lock,
} from "lucide-react";

interface Notification {
  id: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "REWARD" | "PROJECT" | "DATA";
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check auth first
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.data.user);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (data.success) {
        setNotifications(data.data.notifications || []);
      }
    } catch (error) {
      console.error("Fetch notifications error:", error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}/read`, {
        method: "PATCH",
      });
      if (res.ok) {
        setNotifications(notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        ));
      }
    } catch (error) {
      console.error("Mark read error:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch("/api/notifications/read-all", {
        method: "PATCH",
      });
      if (res.ok) {
        setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
      }
    } catch (error) {
      console.error("Mark all read error:", error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNotifications(notifications.filter((n) => n.id !== id));
      }
    } catch (error) {
      console.error("Delete notification error:", error);
    }
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "SUCCESS":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case "WARNING":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case "REWARD":
        return <Award className="w-5 h-5 text-cyan-glow" />;
      case "PROJECT":
        return <TrendingUp className="w-5 h-5 text-water-400" />;
      case "DATA":
        return <Droplets className="w-5 h-5 text-green-400" />;
      default:
        return <Info className="w-5 h-5 text-water-200/70" />;
    }
  };

  const filteredNotifications = notifications.filter((n) =>
    filter === "unread" ? !n.isRead : true
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin" />
        </main>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-water-500/20 flex items-center justify-center">
                <Lock className="w-10 h-10 text-water-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">
                Требуется авторизация
              </h1>
              <p className="text-water-200/70 mb-8">
                Уведомления доступны только авторизованным пользователям.
              </p>
              <div className="space-y-3">
                <Link href="/login" className="block w-full btn-primary text-center">
                  Войти
                </Link>
                <Link href="/register" className="block w-full btn-outline text-center">
                  Создать аккаунт
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                Уведомления
                {unreadCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-glow/20 text-cyan-glow text-sm">
                    {unreadCount}
                  </span>
                )}
              </h1>
              <p className="text-water-200/70">
                Будьте в курсе важных событий
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="btn-secondary flex items-center gap-2 self-start"
              >
                <Check className="w-4 h-4" />
                Отметить все прочитанным
              </button>
            )}
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2 mb-6"
          >
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "all"
                  ? "bg-water-500/20 text-water-400"
                  : "text-water-200/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Все
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "unread"
                  ? "bg-water-500/20 text-water-400"
                  : "text-water-200/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Непрочитанные
            </button>
          </motion.div>

          {/* Notifications List */}
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Bell className="w-8 h-8 text-water-200/40" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {filter === "unread" ? "Нет непрочитанных" : "Нет уведомлений"}
              </h3>
              <p className="text-water-200/50">
                {filter === "unread"
                  ? "Все уведомления прочитаны"
                  : "Здесь будут появляться важные уведомления"}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`glass-card p-4 flex gap-4 group ${
                      !notification.isRead ? "border-l-4 border-l-water-400" : ""
                    }`}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-white">
                          {notification.title}
                        </h3>
                        <span className="text-xs text-water-200/50 flex-shrink-0">
                          {new Date(notification.createdAt).toLocaleDateString("ru-RU", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-water-200/70 mt-1">
                        {notification.message}
                      </p>
                      {notification.link && (
                        <Link
                          href={notification.link}
                          className="text-sm text-water-400 hover:text-cyan-glow mt-2 inline-block"
                        >
                          Подробнее →
                        </Link>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-water-200/50 hover:text-white transition"
                          title="Отметить прочитанным"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-water-200/50 hover:text-red-400 transition"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
