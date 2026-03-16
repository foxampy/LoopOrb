'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowLeft,
  Chrome,
  Send
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth
    window.location.href = '/api/auth/google';
  };

  const handleTelegramLogin = () => {
    // Redirect to Telegram OAuth
    window.location.href = '/api/auth/telegram';
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-[#0a1628] via-[#0d1f35] to-[#0a1628]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              Вход
            </h1>
            <p className="text-slate-400">
              Войдите в свою учетную запись LoopOrb
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white hover:bg-gray-100 text-gray-900 font-medium rounded-xl transition-all"
            >
              <Chrome className="w-5 h-5" />
              Войти через Google
            </button>
            <button
              onClick={handleTelegramLogin}
              className="w-full flex items-center justify-center gap-3 py-3 bg-[#0088cc] hover:bg-[#0099dd] text-white font-medium rounded-xl transition-all"
            >
              <Send className="w-5 h-5" />
              Войти через Telegram
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0d1f35] text-slate-500">или</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-10 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20 bg-slate-900/50" />
                Запомнить меня
              </label>
              <Link
                href="/forgot-password"
                className="text-cyan-400 hover:text-cyan-300"
              >
                Забыли пароль?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          <p className="text-center text-slate-400 mt-6">
            Нет аккаунта?{' '}
            <Link href="/register" className="text-cyan-400 hover:text-cyan-300">
              Зарегистрироваться
            </Link>
          </p>

          {/* Public Access Note */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-slate-500 text-sm mb-2">Хотите посмотреть без регистрации?</p>
            <Link 
              href="/token-sale" 
              className="text-cyan-400 hover:text-cyan-300 text-sm"
            >
              Открыть Token Sale →
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
