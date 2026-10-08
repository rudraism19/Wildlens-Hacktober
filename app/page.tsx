"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Compass,
  Camera,
  BookOpen,
  Clock,
  Sparkles,
  Flame,
  TreePine,
  ShieldCheck,
  Cpu,
  Layers,
  Zap,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { XpProgressBar } from "@/components/nature/xp-progress-bar";
import { DemoDiscoveries } from "@/components/nature/demo-discoveries";
import { getUserStats, UserStatsRecord } from "@/lib/storage/passport-store";
import { DemoItem } from "@/lib/demo-data";
import { formatDuration } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const [stats, setStats] = React.useState<UserStatsRecord | null>(null);

  React.useEffect(() => {
    getUserStats().then(setStats);
  }, []);

  const handleSelectDemo = (demo: DemoItem) => {
    // Navigate to scanner with demo item loaded in query/state
    sessionStorage.setItem("wildlens_selected_demo", JSON.stringify(demo));
    router.push("/scanner?demo=" + demo.id);
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* 1. Hero Section matching Section 10 */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-forest-900 via-forest-900/90 to-forest-950 border border-forest-800 p-8 sm:p-12 text-center shadow-2xl">
        {/* Subtle background glow & floating nature particles */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-8 right-8 text-forest-700/30 text-8xl font-serif select-none pointer-events-none hidden md:block">
          🌿
        </div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <Badge variant="default" className="mb-4 py-1 px-3 text-xs bg-emerald-950/80 border-emerald-700/60 text-emerald-300">
            🌱 Touch Grass Hackathon Project
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase leading-none font-sans">
            SEE MORE. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-200 bg-clip-text text-transparent">
              TOUCH GRASS.
            </span>
          </h1>

          <p className="text-xl sm:text-2xl font-serif text-forest-100 mt-4 italic">
            Meet WildLens — your AI-powered nature companion.
          </p>

          <p className="text-sm sm:text-base text-forest-300 mt-3 max-w-lg leading-relaxed">
            &ldquo;Identify the world around you, discover something new, and get back outside.&rdquo;
          </p>

          {/* Core Philosophy Callout */}
          <div className="my-6 p-4 rounded-2xl bg-forest-950/80 border border-forest-800/90 text-xs text-forest-300 max-w-md shadow-inner">
            <span className="text-emerald-400 font-semibold block mb-0.5">
              The WildLens Philosophy:
            </span>
            &ldquo;AI should make you curious about the real world, not keep you staring at a screen.&rdquo;
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link href="/scanner" className="w-full sm:w-auto">
              <Button variant="emerald" size="lg" className="w-full text-base sm:px-8">
                <Camera className="w-5 h-5 mr-1" />
                Start Exploring
              </Button>
            </Link>
            <Link href="/session" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full text-base">
                <Clock className="w-5 h-5 text-emerald-400 mr-1" />
                Start Nature Session
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. User Stats Ribbon according to Section 10 */}
      {stats && (
        <section className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {/* XP */}
            <div className="p-4 rounded-2xl bg-forest-900/80 border border-forest-800 flex items-center gap-3.5 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-emerald-950 border border-emerald-800/70 flex items-center justify-center text-emerald-400 shrink-0">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white font-mono block leading-tight">
                  {stats.totalXp}
                </span>
                <span className="text-xs text-forest-400">Nature XP</span>
              </div>
            </div>

            {/* Streak */}
            <div className="p-4 rounded-2xl bg-forest-900/80 border border-forest-800 flex items-center gap-3.5 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-amber-950 border border-amber-800/70 flex items-center justify-center text-amber-400 shrink-0">
                <Flame className="w-5 h-5 fill-amber-400 animate-pulse" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white font-mono block leading-tight">
                  {stats.currentStreak} Days
                </span>
                <span className="text-xs text-forest-400">Outdoor Streak</span>
              </div>
            </div>

            {/* Species Discovered */}
            <div className="p-4 rounded-2xl bg-forest-900/80 border border-forest-800 flex items-center gap-3.5 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-forest-800 border border-forest-750 flex items-center justify-center text-emerald-300 shrink-0">
                <TreePine className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white font-mono block leading-tight">
                  {stats.totalDiscoveries}
                </span>
                <span className="text-xs text-forest-400">Species Discovered</span>
              </div>
            </div>

            {/* Time Spent Outdoors */}
            <div className="p-4 rounded-2xl bg-forest-900/80 border border-forest-800 flex items-center gap-3.5 shadow-md">
              <div className="w-11 h-11 rounded-xl bg-teal-950 border border-teal-800/70 flex items-center justify-center text-teal-300 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white font-mono block leading-tight">
                  {Math.round(stats.totalTimeOutdoorsSeconds / 60)} min
                </span>
                <span className="text-xs text-forest-400">Time Outdoors</span>
              </div>
            </div>
          </div>

          {/* Level Progress Bar */}
          <XpProgressBar stats={stats} />
        </section>
      )}

      {/* 3. Demo Mode Section according to Section 22 */}
      <section className="p-6 rounded-3xl bg-forest-900/60 border border-forest-800 shadow-lg">
        <DemoDiscoveries onSelectDemo={handleSelectDemo} />
      </section>

      {/* 4. The 5-Step Exploration Loop */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white">
            The Outdoor Exploration Loop
          </h2>
          <p className="text-xs sm:text-sm text-forest-300 mt-1">
            WildLens is engineered specifically to get you off the screen and into nature.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            {
              step: "01",
              title: "Step Outside",
              desc: "Take a walk in a park, backyard, forest trail, or balcony garden.",
              icon: "🌲",
            },
            {
              step: "02",
              title: "Point & Scan",
              desc: "Gemma AI identifies the species with scientific taxonomy & safety checks.",
              icon: "📸",
            },
            {
              step: "03",
              title: "Look Closer",
              desc: "Get an observation tip and fascinating ecological fact in seconds.",
              icon: "🔍",
            },
            {
              step: "04",
              title: "Pocket Phone",
              desc: "Take on a real-world physical challenge without staring at glass.",
              icon: "📴",
            },
            {
              step: "05",
              title: "Earn Nature XP",
              desc: "Log your discovery into your offline Nature Passport & level up.",
              icon: "⭐",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-forest-900/80 border border-forest-800/80 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {item.step}
                </span>
                <div className="text-3xl my-2">{item.icon}</div>
                <h3 className="font-semibold text-sm text-white">{item.title}</h3>
                <p className="text-xs text-forest-300 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Why Open-Weight AI? (Section 15) */}
      <section className="rounded-3xl bg-gradient-to-br from-forest-900 to-forest-950 border border-forest-800 p-8 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-forest-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Why Open-Weight AI?
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-forest-300 mt-1">
              &ldquo;The best outdoor AI is one that still works when the internet doesn&apos;t.&rdquo;
            </p>
          </div>

          <Link href="/why-open-ai">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <span>Read Full Architectural Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-forest-950/70 border border-forest-800">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-300 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm text-white">Privacy First</h3>
            <p className="text-xs text-forest-300 mt-1.5 leading-relaxed">
              Your nature photos stay on your device when local inference is available. No corporate profiling of where you explore outdoors.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-forest-950/70 border border-forest-800">
            <div className="w-9 h-9 rounded-xl bg-teal-950 text-teal-300 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm text-white">Zero Cellular Deadzones</h3>
            <p className="text-xs text-forest-300 mt-1.5 leading-relaxed">
              Real forests don&apos;t have 5G towers. With open-weight Gemma and local offline storage, WildLens never leaves you stranded.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-forest-950/70 border border-forest-800">
            <div className="w-9 h-9 rounded-xl bg-forest-800 text-forest-200 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm text-white">Provider Swappable</h3>
            <p className="text-xs text-forest-300 mt-1.5 leading-relaxed">
              Never locked into a single proprietary cloud API. Seamlessly toggle between Gemma Open-Weight and Gemini Cloud API.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
