"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Import all locale files
import en from "./locales/en.json";
import ru from "./locales/ru.json";

// Define available languages
export const languages = [
  { code: "en", name: "English", dir: "ltr" },
  { code: "ru", name: "Русский", dir: "ltr" },
  { code: "ar", name: "العربية", dir: "rtl" },
  { code: "he", name: "עברית", dir: "rtl" },
  { code: "zh", name: "中文", dir: "ltr" },
  { code: "hi", name: "हिन्दी", dir: "ltr" },
  { code: "ja", name: "日本語", dir: "ltr" },
  { code: "ko", name: "한국어", dir: "ltr" },
  { code: "de", name: "Deutsch", dir: "ltr" },
  { code: "it", name: "Italiano", dir: "ltr" },
  { code: "es", name: "Español", dir: "ltr" },
  { code: "fr", name: "Français", dir: "ltr" },
] as const;

export type LanguageCode = typeof languages[number]["code"];

type TranslationKey = string;

interface I18nContextType {
  locale: LanguageCode;
  setLocale: (locale: LanguageCode) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  languages: typeof languages;
}

const locales: Record<string, typeof en> = {
  en,
  ru,
  // Fallback to English for other languages until translations are added
  ar: en,
  he: en,
  zh: en,
  hi: en,
  ja: en,
  ko: en,
  de: en,
  it: en,
  es: en,
  fr: en,
};

function getNestedValue(obj: any, path: string): string {
  const keys = path.split(".");
  let value = obj;
  
  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return path; // Return key as fallback
    }
  }
  
  return typeof value === "string" ? value : path;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LanguageCode>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Try to get saved locale from localStorage
    const savedLocale = localStorage.getItem("vod-locale") as LanguageCode;
    if (savedLocale && languages.some(l => l.code === savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0] as LanguageCode;
      if (languages.some(l => l.code === browserLang)) {
        setLocaleState(browserLang);
      }
    }
  }, []);

  const setLocale = (newLocale: LanguageCode) => {
    setLocaleState(newLocale);
    localStorage.setItem("vod-locale", newLocale);
    // Update document direction
    const lang = languages.find(l => l.code === newLocale);
    if (lang) {
      document.documentElement.dir = lang.dir;
      document.documentElement.lang = newLocale;
    }
  };

  const t = (key: string): string => {
    const translations = locales[locale] || locales.en;
    const value = getNestedValue(translations, key);
    return value;
  };

  const currentLang = languages.find(l => l.code === locale);
  const dir = currentLang?.dir || "ltr";

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir, languages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
