"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

// Extend window to include Telegram
interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
    };
    auth_date?: number;
    hash?: string;
  };
  ready: () => void;
  expand: () => void;
  close: () => void;
  MainButton: {
    text: string;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  BackButton: {
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: string) => void;
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export default function TelegramPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [debug, setDebug] = useState<string>("");

  useEffect(() => {
    const initTelegram = async () => {
      try {
        const tg = window.Telegram?.WebApp;
        
        if (!tg) {
          setError("Please open this app in Telegram");
          setIsLoading(false);
          return;
        }

        tg.ready();
        tg.expand();

        setDebug(JSON.stringify(tg.initDataUnsafe, null, 2));

        if (tg.initDataUnsafe?.user) {
          const user = tg.initDataUnsafe.user;
          
          // Authenticate with backend
          const response = await fetch("/api/auth/telegram", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id.toString(),
              first_name: user.first_name,
              last_name: user.last_name,
              username: user.username,
              photo_url: user.photo_url,
              auth_date: tg.initDataUnsafe.auth_date,
              hash: tg.initDataUnsafe.hash,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            
            if (tg.HapticFeedback) {
              tg.HapticFeedback.impactOccurred("light");
            }

            // Redirect to dashboard
            window.location.href = "/dashboard";
          } else {
            setError("Authentication failed");
          }
        } else {
          setError("No user data from Telegram");
        }
      } catch (err) {
        console.error("Telegram auth error:", err);
        setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    // Wait a bit for script to load
    const timer = setTimeout(initTelegram, 500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />
      <main className="min-h-screen flex items-center justify-center p-4 bg-ocean-deep">
        <div className="text-center">
          {isLoading ? (
            <div className="space-y-4">
              <div className="w-16 h-16 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin mx-auto" />
              <p className="text-water-200">Подключение к Telegram...</p>
            </div>
          ) : error ? (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-red-300">{error}</p>
              <a
                href="/"
                className="inline-block btn-primary px-6 py-2"
              >
                Открыть в браузере
              </a>
              {debug && (
                <pre className="mt-4 p-4 bg-black/30 rounded text-xs text-left overflow-auto max-w-md max-h-48">
                  {debug}
                </pre>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-green-300">Успешно! Перенаправляем...</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
