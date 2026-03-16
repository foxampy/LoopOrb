import type { Metadata } from "next";
import { SimpleNav } from "./components/SimpleNav";
import "../globals.css";

export const metadata: Metadata = {
  title: "LoopOrb Simple - Простой интерфейс для всех",
  description:
    "Простой и понятный интерфейс для мониторинга воды, обучения экологии и участия в сохранении водных ресурсов. Для детей, взрослых и пожилых людей.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function SimpleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-cyan-50">
      {/* Main content with padding for bottom nav */}
      <main className="pb-24 max-w-lg mx-auto">
        {children}
      </main>
      
      {/* Simple bottom navigation */}
      <SimpleNav />
    </div>
  );
}
