import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n/I18nContext";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VODeco - Decentralized Water Infrastructure",
  description:
    "VODeco is a decentralized cyber-physical ecosystem for water resource management. Stake VOD tokens, fund water infrastructure, and earn yield through verified water data.",
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
  authors: [{ name: "VODeco DAO" }],
  openGraph: {
    title: "VODeco - Water-Backed Digital Economy",
    description: "Transform water from depleting resource into sustainable digital economy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-950 text-white min-h-screen`}
      >
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
