"use client";

import * as React from "react";
import { Sparkles, Trophy, Flame } from "lucide-react";
import { getXpProgress } from "@/lib/gamification/levels";
import { UserStatsRecord } from "@/lib/storage/passport-store";

interface XpProgressBarProps {
  stats: UserStatsRecord;
  className?: string;
}

export function XpProgressBar({ stats, className = "" }: XpProgressBarProps) {
  const { currentLevel, nextLevel, progressPercent, xpNeeded } = getXpProgress(
    stats.totalXp
  );

  return (
    <div className={`p-4 rounded-2xl bg-forest-900/90 border border-forest-800/80 shadow-lg ${className}`}>
      {/* Top level & streak line */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-2xl p-1.5 rounded-xl bg-forest-800/80 border border-forest-750">
            {currentLevel.badge}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">
                {currentLevel.title}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-400 border border-emerald-800/60">
                Level {currentLevel.level}
              </span>
            </div>
            <p className="text-xs text-forest-300 mt-0.5">
              {stats.totalXp} Total Nature XP
            </p>
          </div>
        </div>

        {/* Outdoor streak */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs font-semibold">
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
          <span>{stats.currentStreak} Day Streak</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-forest-950/90 h-3 rounded-full overflow-hidden p-0.5 border border-forest-800 relative">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(52,211,153,0.4)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Bottom info */}
      <div className="flex items-center justify-between text-[11px] text-forest-300 mt-2">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          {progressPercent}% to next rank
        </span>
        {nextLevel ? (
          <span className="text-forest-400">
            {xpNeeded} XP to <strong className="text-forest-200">{nextLevel.title}</strong> {nextLevel.badge}
          </span>
        ) : (
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" /> Max Level Achieved!
          </span>
        )}
      </div>
    </div>
  );
}
