import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import IntlProvider from "@/components/IntlProvider";
import { I18nProvider } from "@/i18n/I18nContext";
import { AIChatWidget } from "@/components/AIChat/AIChatWidget";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LoopOrb - Global Water Resource Management Ecosystem",
  description:
    "LoopOrb is a decentralized platform for monitoring, investing, and managing water resources. Stake UNITY tokens, invest in water projects, and earn through verified water data.",
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
    description: "Transform water from a depleted resource into a sustainable digital economy",
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  return (
    <html lang={locale} className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-950 text-white min-h-screen`}
      >
        <IntlProvider>
          <I18nProvider>
            {children}
            <AIChatWidget />
          </I18nProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
