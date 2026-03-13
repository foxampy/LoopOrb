"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";

// Dynamically import Globe3D to avoid SSR issues with Three.js
const Globe3D = dynamic(() => import("@/components/Globe3D"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-ocean-deep flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-water-200/70">Загрузка 3D глобуса...</p>
      </div>
    </div>
  ),
});

export default function GlobePage() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Suspense fallback={
          <div className="min-h-screen bg-ocean-deep flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-water-500/30 border-t-water-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-water-200/70">Загрузка 3D глобуса...</p>
            </div>
          </div>
        }>
          <Globe3D />
        </Suspense>
      </div>
    </>
  );
}
