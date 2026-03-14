import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import IntlProvider from "@/components/IntlProvider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LoopOrb - Глобальная экосистема управления водными ресурсами",
  description:
    "LoopOrb — децентрализованная платформа для мониторинга, инвестирования и управления водными ресурсами. Стейкинг токенов UNITY, инвестирование в водные проекты и заработок через верифицированные данные о воде.",
  keywords: [
    "water",
    "blockchain",
    "DePIN",
    "DAO",
    "staking",
    "tokenomics",
    "water crisis",
    "sustainability",
    "IoT",
    "environment",
  ],
  authors: [{ name: "LoopOrb DAO" }],
  openGraph: {
    title: "LoopOrb - Water-Backed Digital Economy",
    description: "Превратите воду из истощаемого ресурса в устойчивую цифровую экономику",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-950 text-white min-h-screen`}
      >
        <IntlProvider>
          {children}
        </IntlProvider>
      </body>
    </html>
  );
}
