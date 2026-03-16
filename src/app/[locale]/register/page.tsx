"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";

const roles = [
  { value: "CITIZEN", label: "Гражданин / Активист" },
  { value: "SCIENTIST", label: "Ученый / Исследователь" },
  { value: "INVESTOR", label: "Инвестор" },
  { value: "GOVERNMENT", label: "Представитель гос-ва" },
  { value: "OPERATOR", label: "Оператор инфраструктуры" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "CITIZEN",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/login?registered=true");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep via-ocean-mid to-ocean-deep" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-water-200/80 hover:text-water-400 mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>

        <div className="glass-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">Регистрация</h1>
            <p className="text-water-200/70">
              Создайте аккаунт и получите 10 UNITY коинов
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-water-200/80 mb-1">
                Имя
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-water-200/50" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-water-500 transition"
                  placeholder="Ваше имя"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-water-200/80 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-water-200/50" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-water-500 transition"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-water-200/80 mb-1">
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-water-200/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:border-water-500 transition"
                  placeholder="Минимум 8 символов"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-water-200/50 hover:text-water-400 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-water-200/80 mb-1">
                Ваша роль
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-water-500 transition appearance-none"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value} className="bg-ocean-deep">
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Создание..." : "Создать аккаунт"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-water-200/70">
              Уже есть аккаунт?{" "}
              <Link
                href="/login"
                className="text-water-400 hover:text-water-300 transition"
              >
                Войти
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
