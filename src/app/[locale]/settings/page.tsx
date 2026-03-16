"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Globe,
  Save,
  Loader2,
  ChevronRight,
  Lock,
} from "lucide-react";

const settingsTabs = [
  { id: "profile", label: "Профиль", icon: User },
  { id: "notifications", label: "Уведомления", icon: Bell },
  { id: "security", label: "Безопасность", icon: Shield },
  { id: "preferences", label: "Предпочтения", icon: Globe },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

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
                Настройки доступны только авторизованным пользователям.
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Настройки</h1>
            <p className="text-water-200/70">
              Управление вашим аккаунтом и предпочтениями
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:w-64 flex-shrink-0"
            >
              <div className="glass-card p-2">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-left ${
                      activeTab === tab.id
                        ? "bg-water-500/20 text-water-400"
                        : "text-water-200/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1"
            >
              <div className="glass-card p-6">
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white">
                      Профиль
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-water-200/70 mb-2">
                          Имя
                        </label>
                        <input
                          type="text"
                          defaultValue={user.name}
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-water-500 transition"
                          placeholder="Ваше имя"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-water-200/70 mb-2">
                          О себе
                        </label>
                        <textarea
                          rows={4}
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-water-500 transition resize-none"
                          placeholder="Расскажите о себе..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-water-200/70 mb-2">
                          Аватар
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-water-400 to-cyan-glow flex items-center justify-center text-ocean-deep font-bold text-xl">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              user.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <button className="btn-secondary">
                            Изменить аватар
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white">
                      Уведомления
                    </h2>

                    <div className="space-y-4">
                      {[
                        { id: "email", label: "Email уведомления", desc: "Получать важные уведомления на email" },
                        { id: "projects", label: "Обновления проектов", desc: "Уведомления о новых проектах и инвестициях" },
                        { id: "rewards", label: "Награды", desc: "Уведомления о полученных наградах" },
                        { id: "dao", label: "DAO голосования", desc: "Уведомления о новых предложениях" },
                      ].map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
                        >
                          <div>
                            <div className="text-white font-medium">{item.label}</div>
                            <div className="text-sm text-water-200/50">{item.desc}</div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-water-500"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white">
                      Безопасность
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-water-200/70 mb-2">
                          Текущий пароль
                        </label>
                        <input
                          type="password"
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-water-500 transition"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-water-200/70 mb-2">
                          Новый пароль
                        </label>
                        <input
                          type="password"
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-water-500 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-water-200/70 mb-2">
                          Подтвердите пароль
                        </label>
                        <input
                          type="password"
                          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-water-500 transition"
                        />
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <h3 className="text-white font-medium mb-2">
                          Двухфакторная аутентификация
                        </h3>
                        <p className="text-sm text-water-200/50 mb-4">
                          Дополнительный уровень защиты вашего аккаунта
                        </p>
                        <button className="btn-secondary">
                          Настроить 2FA
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "preferences" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white">
                      Предпочтения
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-water-200/70 mb-2">
                          Язык
                        </label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-water-500 transition appearance-none">
                          <option value="ru">Русский</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/10">
                  <button className="px-4 py-2 text-water-200/70 hover:text-white transition">
                    Отмена
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Сохранение...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Сохранить
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
