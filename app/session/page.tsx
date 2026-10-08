"use client";

import * as React from "react";
import Link from "next/link";
import {
  getActiveSession,
  startSession,
  stopSession,
  getAllSessions,
  ActiveSessionState,
} from "@/lib/storage/session-store";
import { SessionRecord } from "@/lib/storage/db";
import { TouchGrassTimer } from "@/components/session/touch-grass-timer";
import { SessionSummaryModal } from "@/components/session/session-summary-modal";
import { Button } from "@/components/ui/button";
import { Camera, Clock, Trophy, MapPin, Sparkles, History, ShieldCheck } from "lucide-react";
import { formatDuration, formatDate } from "@/lib/utils";

export default function SessionPage() {
  const [activeSession, setActiveSession] = React.useState<ActiveSessionState | null>(null);
  const [finishedSession, setFinishedSession] = React.useState<SessionRecord | null>(null);
  const [pastSessions, setPastSessions] = React.useState<SessionRecord[]>([]);

  React.useEffect(() => {
    setActiveSession(getActiveSession());
    getAllSessions().then(setPastSessions);
  }, []);

  const handleStart = () => {
    const created = startSession();
    setActiveSession(created);
  };

  const handleStop = async () => {
    const recorded = await stopSession();
    setActiveSession(null);
    if (recorded) {
      setFinishedSession(recorded);
      const all = await getAllSessions();
      setPastSessions(all);
    }
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-forest-850">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Nature Session Mode
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-forest-300 mt-0.5">
            Log intentional outdoor time, track trail discoveries, and earn bonus Nature XP.
          </p>
        </div>

        {activeSession && (
          <Link href="/scanner">
            <Button variant="emerald" size="md">
              <Camera className="w-4 h-4 mr-1.5" />
              Scan on Trail
            </Button>
          </Link>
        )}
      </div>

      {/* Main Stopwatch Timer */}
      <TouchGrassTimer
        session={activeSession}
        onStart={handleStart}
        onStop={handleStop}
      />

      {/* XP Bonus Rules info */}
      <div className="p-5 rounded-2xl bg-forest-900/60 border border-forest-800 text-xs text-forest-300 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-start gap-2.5">
          <div className="p-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0">
            🌱
          </div>
          <div>
            <span className="font-semibold text-white block">10 Min Outside</span>
            <span>+25 Nature XP automatic session bonus</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="p-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0">
            🌲
          </div>
          <div>
            <span className="font-semibold text-white block">30 Min Outside</span>
            <span>+100 Nature XP major outdoor milestone bonus</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <div className="p-1 rounded bg-amber-950 text-amber-400 border border-amber-800 shrink-0">
            <Trophy className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold text-white block">Trail Quests</span>
            <span>+50 XP per completed real-world physical challenge</span>
          </div>
        </div>
      </div>

      {/* Past Sessions History */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-forest-400" />
          <h2 className="text-lg font-bold text-white">Past Nature Walks</h2>
        </div>

        {pastSessions.length > 0 ? (
          <div className="space-y-3">
            {pastSessions.map((s) => (
              <div
                key={s.id}
                className="p-4 rounded-2xl bg-forest-900/80 border border-forest-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm font-mono">
                      {formatDuration(s.durationSeconds)} outside
                    </span>
                    <span className="text-[11px] text-forest-400 font-mono">
                      • {formatDate(s.startTime)}
                    </span>
                  </div>
                  <p className="text-xs text-forest-300 mt-1">
                    {s.discoveriesCount} species identified • {s.challengesCompleted} challenges completed
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-400 font-mono px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800">
                    +{s.xpEarned} XP
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-forest-900/30 border border-forest-800/60 text-center text-xs text-forest-400">
            No completed sessions recorded yet. Tap Start Nature Session above to start your first walk!
          </div>
        )}
      </div>

      {/* Finished Summary Modal */}
      {finishedSession && (
        <SessionSummaryModal
          session={finishedSession}
          onClose={() => setFinishedSession(null)}
        />
      )}
    </div>
  );
}
