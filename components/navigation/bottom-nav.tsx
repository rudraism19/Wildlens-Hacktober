"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Camera, BookOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  const items = [
    { href: "/", label: "Explore", icon: Compass },
    { href: "/scanner", label: "Scan", icon: Camera, isPrimary: true },
    { href: "/passport", label: "Passport", icon: BookOpen },
    { href: "/session", label: "Session", icon: Clock },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe">
      <div className="bg-forest-950/95 backdrop-blur-xl border-t border-forest-800/80 px-4 py-2 flex items-center justify-around shadow-2xl">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isPrimary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center -mt-6 group focus:outline-none"
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-transform active:scale-95 border-2",
                    isActive
                      ? "bg-emerald-500 border-emerald-300 shadow-emerald-900/60 scale-105"
                      : "bg-emerald-600 hover:bg-emerald-500 border-emerald-400 shadow-forest-950/80"
                  )}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 mt-1">
                  Scan
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-1 px-3 rounded-lg transition-colors",
                isActive
                  ? "text-emerald-400 font-medium"
                  : "text-forest-400 hover:text-forest-200"
              )}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[11px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
