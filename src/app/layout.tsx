import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import IntlProvider from "@/components/IntlProvider";
import { AIChatWidget } from "@/components/AIChat/AIChatWidget";

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
  manifest: "/manifest.json",
  themeColor: "#0ea5e9",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LoopOrb"
  },
  openGraph: {
    title: "LoopOrb - Water-Backed Digital Economy",
    description: "Превратите воду из истощаемого ресурса в устойчивую цифровую экономику",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192" }
    ]
  }
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
          <AIChatWidget />
        </IntlProvider>
      </body>
    </html>
  );
}
