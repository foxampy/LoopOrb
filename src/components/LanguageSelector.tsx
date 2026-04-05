"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { useI18n, languages, LanguageCode } from "@/i18n/I18nContext";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSelector() {
  const { locale, setLocale, t } = useI18n();
  const nextIntlLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find((l) => l.code === locale);

  const handleLanguageChange = (newLocale: LanguageCode) => {
    // Update custom I18n context
    setLocale(newLocale);
    
    // Update next-intl locale via routing
    // Replace locale prefix in pathname
    const newPathname = pathname.replace(`/${nextIntlLocale}`, `/${newLocale}`);
    router.push(newPathname);
    
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors text-sm"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline uppercase">{locale}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50"
            >
              <div className="max-h-64 overflow-y-auto py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang.code as LanguageCode);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-slate-800 transition-colors ${
                      locale === lang.code ? "text-cyan-400" : "text-slate-300"
                    }`}
                  >
                    <span className="text-sm">{t(`languages.${lang.code}`)}</span>
                    {locale === lang.code && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
