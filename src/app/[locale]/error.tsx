'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();
  
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1f35] to-[#0a1628] flex items-center justify-center px-4">
      <div className="max-w-xl w-full text-center">
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="mb-6"
        >
          <div className="w-24 h-24 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          {t("common.error")}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 text-lg mb-8"
        >
          {t("errors.general")}
        </motion.p>

        {/* Error Details (in development) */}
        {process.env.NODE_ENV === 'development' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-left"
          >
            <p className="text-red-400 text-sm font-mono mb-2">Error: {error.message}</p>
            {error.digest && (
              <p className="text-red-400/60 text-xs font-mono">Digest: {error.digest}</p>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105"
          >
            <RefreshCw className="w-5 h-5" />
            {t("common.refresh")}
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-300 font-medium rounded-xl border border-white/10 transition-all duration-200"
          >
            <Home className="w-5 h-5" />
            {t("common.back")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
