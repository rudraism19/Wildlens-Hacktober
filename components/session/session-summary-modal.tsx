"use client";

import * as React from "react";
import confetti from "canvas-confetti";
import { Trophy, Clock, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { SessionRecord } from "@/lib/storage/db";
import { formatDuration } from "@/lib/utils";

interface SessionSummaryModalProps {
  session: SessionRecord | null;
  onClose: () => void;
}

export function SessionSummaryModal({
  session,
  onClose,
}: SessionSummaryModalProps) {
  React.useEffect(() => {
    if (session) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#10b981", "#34d399", "#f59e0b", "#a7f3d0", "#d97706"],
        });
      } catch {
        // Fallback
      }
    }
  }, [session]);

  if (!session) return null;

  const minutesOutside = Math.max(1, Math.round(session.durationSeconds / 60));

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-forest-900 border border-emerald-500/50 p-6 md:p-8 text-center shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg">
          🌲
        </div>

        <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800">
          NATURE SESSION COMPLETE
        </span>

        <h2 className="text-2xl font-bold text-white mt-3">
          Great Job Touching Grass!
        </h2>

        <div className="text-sm font-semibold text-emerald-300 mt-1 flex items-center justify-center gap-1.5 font-mono">
          <Clock className="w-4 h-4" />
          {formatDuration(session.durationSeconds)} outside
        </div>

        {/* Stats card */}
        <div className="my-5 p-5 rounded-2xl bg-forest-950/80 border border-forest-800 text-left space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-forest-300">Discoveries logged</span>
            <span className="font-bold text-white font-mono">
              {session.discoveriesCount} species
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-forest-300">Challenges completed</span>
            <span className="font-bold text-amber-300 font-mono">
              {session.challengesCompleted} quests
            </span>
          </div>

          {session.categoriesFound.length > 0 && (
            <div className="pt-2 border-t border-forest-850 flex flex-wrap gap-1.5">
              {session.categoriesFound.map((cat, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 rounded-full bg-forest-900 text-forest-200 border border-forest-800"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <div className="pt-3 border-t border-forest-800 flex items-center justify-between">
            <span className="font-bold text-forest-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Total XP Earned
            </span>
            <span className="text-lg font-extrabold text-emerald-400 font-mono">
              +{session.xpEarned} XP
            </span>
          </div>
        </div>

        <Button variant="emerald" size="lg" onClick={onClose} className="w-full">
          <span>Collect XP & Continue</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
