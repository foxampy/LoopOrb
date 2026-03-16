"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Map, BookOpen, Gamepad2, Users, Home } from "lucide-react";

const navItems = [
  { href: "/simple", icon: Home, label: "Главная" },
  { href: "/simple/map", icon: Map, label: "Карта" },
  { href: "/simple/learn", icon: BookOpen, label: "Учиться" },
  { href: "/simple/play", icon: Gamepad2, label: "Играть" },
  { href: "/simple/family", icon: Users, label: "Семья" },
];

export function SimpleNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
      <div className="max-w-lg mx-auto">
        <ul className="flex justify-around items-center py-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link href={item.href} className="relative block">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
                      isActive
                        ? "text-cyan-600"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <div
                      className={`relative p-2 rounded-xl ${
                        isActive ? "bg-cyan-100" : ""
                      }`}
                    >
                      <Icon
                        size={28}
                        strokeWidth={isActive ? 2.5 : 2}
                        className={isActive ? "text-cyan-600" : ""}
                      />
                      {isActive && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-500 rounded-full"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </div>
                    <span className="text-xs font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Safe area padding for mobile */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </nav>
  );
}

// Simple header for simple pages
export function SimpleHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <span className="text-3xl">💧</span>
          </motion.div>
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
      </div>
    </header>
  );
}
