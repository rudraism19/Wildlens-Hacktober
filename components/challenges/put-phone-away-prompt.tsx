"use client";

import * as React from "react";
import confetti from "canvas-confetti";
import { Sparkles, Trophy, CheckCircle2, RotateCcw, Pocket, BellOff } from "lucide-react";
import { Button } from "../ui/button";
import { NatureChallenge } from "@/lib/validation/schema";
import { formatDuration } from "@/lib/utils";

interface PutPhoneAwayPromptProps {
  challenge: NatureChallenge;
  onComplete: () => void;
  onCancel: () => void;
}

export function PutPhoneAwayPrompt({
  challenge,
  onComplete,
  onCancel,
}: PutPhoneAwayPromptProps) {
  const [secondsElapsed, setSecondsElapsed] = React.useState(0);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const targetSeconds = (challenge.durationMinutes || 5) * 60;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFinish = () => {
    setIsCompleted(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#10b981", "#34d399", "#f59e0b", "#a7f3d0"],
      });
    } catch {
      // Confetti fallback
    }
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  const progressPercent = Math.min(100, Math.round((secondsElapsed / targetSeconds) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-forest-950/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-3xl bg-forest-900 border border-emerald-500/40 p-6 md:p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Subtle glowing aura */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Animated Pocket / Nature Icon */}
          <div className="w-20 h-20 rounded-3xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-3xl mb-4 shadow-xl shadow-emerald-950/50 animate-bounce">
            🍃
          </div>

          <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800">
            TOUCH GRASS CHALLENGE
          </span>

          <h2 className="text-2xl font-bold text-white mt-3">
            Put Your Phone in Your Pocket!
          </h2>

          <p className="text-sm text-forest-200 mt-2 max-w-sm">
            WildLens wants your curiosity, not your screen time. Step outside and complete this quest in the real world:
          </p>

          {/* Challenge Box */}
          <div className="my-5 p-4 rounded-2xl bg-forest-950/80 border border-forest-800 text-left w-full">
            <h3 className="text-sm font-semibold text-emerald-300 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {challenge.title}
            </h3>
            <p className="text-sm text-white font-medium">
              &ldquo;{challenge.instruction}&rdquo;
            </p>
            {challenge.safetyReminder && (
              <p className="text-[11px] text-forest-400 mt-2 pt-2 border-t border-forest-850">
                ⚠️ {challenge.safetyReminder}
              </p>
            )}
          </div>

          {/* Outside Timer */}
          <div className="w-full mb-6">
            <div className="flex items-center justify-between text-xs text-forest-300 mb-1.5">
              <span className="flex items-center gap-1">
                <BellOff className="w-3.5 h-3.5 text-forest-400" />
                Time Spent Exploring
              </span>
              <span className="font-mono text-emerald-300 font-bold">
                {formatDuration(secondsElapsed)}
              </span>
            </div>
            <div className="w-full bg-forest-950 h-2 rounded-full overflow-hidden border border-forest-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5 w-full">
            <Button
              variant="emerald"
              size="lg"
              onClick={handleFinish}
              disabled={isCompleted}
              className="w-full"
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 animate-spin" />
                  Claiming +{challenge.rewardXp || 50} XP...
                </>
              ) : (
                <>
                  <Trophy className="w-5 h-5 text-amber-400" />
                  I Did It! Claim +{challenge.rewardXp || 50} XP
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="text-forest-400 hover:text-forest-200"
            >
              Resume Later / Return to Scanner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
