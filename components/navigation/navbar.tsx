"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Camera, BookOpen, Clock, ShieldCheck, Sparkles, Cpu } from "lucide-react";
import { getUserStats, UserStatsRecord, saveUserStats } from "@/lib/storage/passport-store";
import { getLevelForXp } from "@/lib/gamification/levels";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [stats, setStats] = React.useState<UserStatsRecord | null>(null);

  React.useEffect(() => {
    getUserStats().then(setStats);
    const interval = setInterval(() => {
      getUserStats().then(setStats);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const level = stats ? getLevelForXp(stats.totalXp) : null;
  const isGemma = stats?.aiProviderPreference !== "gemini";

  const toggleModel = async () => {
    const nextMode = isGemma ? "gemini" : "gemma";
    const updated = await saveUserStats({ aiProviderPreference: nextMode });
    setStats(updated);
  };

  const navLinks = [
    { href: "/", label: "Explore", icon: Compass },
    { href: "/scanner", label: "Scanner", icon: Camera },
    { href: "/passport", label: "Passport", icon: BookOpen },
    { href: "/session", label: "Session", icon: Clock },
    { href: "/why-open-ai", label: "Why Open AI?", icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-forest-800/80 bg-forest-950/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-950/40 group-hover:scale-105 transition-transform">
              <span className="text-xl">🌿</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                WildLens
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                  Touch Grass
                </span>
              </span>
              <span className="text-[11px] text-forest-300 hidden md:block">
                See nature. Understand it. Then put your phone away.
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                  isActive
                    ? "bg-forest-800 text-white border border-forest-700/60 shadow-sm"
                    : "text-forest-300 hover:text-forest-100 hover:bg-forest-900"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-emerald-400" : "text-forest-400")} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Stats & Model Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Active Model Pill */}
          <button
            onClick={toggleModel}
            title={`Active: ${isGemma ? "Gemma (Open-Weight)" : "Gemini (Cloud)"}. Click to toggle model preference.`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-forest-900/90 border border-forest-700/70 hover:border-emerald-600/70 text-forest-200 transition-colors shadow-inner"
          >
            <Cpu className={cn("w-3.5 h-3.5", isGemma ? "text-emerald-400 animate-pulse" : "text-amber-400")} />
            <span className="font-semibold text-emerald-300">
              {isGemma ? "Gemma" : "Gemini"}
            </span>
            <span className="text-[10px] text-forest-400 hidden sm:inline">
              ({isGemma ? "Open-Weight" : "Cloud"})
            </span>
          </button>

          {/* XP & Level Badge */}
          {stats && level && (
            <Link
              href="/passport"
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 hover:border-emerald-700 transition-colors shadow-sm"
            >
              <span className="text-sm">{level.badge}</span>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold leading-tight flex items-center gap-1 text-emerald-200">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  {stats.totalXp} XP
                </span>
                <span className="text-[9px] text-emerald-400/80 leading-none">
                  {level.title}
                </span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
