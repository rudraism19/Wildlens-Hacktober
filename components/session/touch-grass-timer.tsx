"use client";

import * as React from "react";
import { Play, Pause, Square, MapPin, Sparkles, Trophy, Footprints, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { formatDuration } from "@/lib/utils";
import { ActiveSessionState } from "@/lib/storage/session-store";

interface TouchGrassTimerProps {
  session: ActiveSessionState | null;
  onStart: () => void;
  onStop: () => void;
}

export function TouchGrassTimer({
  session,
  onStart,
  onStop,
}: TouchGrassTimerProps) {
  const [seconds, setSeconds] = React.useState(0);
  const [gpsEnabled, setGpsEnabled] = React.useState(false);

  React.useEffect(() => {
    if (!session) {
      setSeconds(0);
      return;
    }

    const start = new Date(session.startTime).getTime();
    const updateElapsed = () => {
      const now = Date.now();
      setSeconds(Math.max(0, Math.floor((now - start) / 1000)));
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [session]);

  const toggleGps = () => {
    if (!gpsEnabled) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => setGpsEnabled(true),
          () => alert("Location permission was not granted. Distance tracking will remain disabled.")
        );
      }
    } else {
      setGpsEnabled(false);
    }
  };

  const isRunning = Boolean(session);

  return (
    <div className="w-full rounded-3xl bg-forest-900 border border-forest-800 p-6 md:p-8 shadow-xl text-center relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Nature Pulse */}
        <div className="relative mb-4">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-xl transition-all duration-500 ${
              isRunning
                ? "bg-emerald-950 border-2 border-emerald-400 shadow-emerald-950/80 animate-pulse-slow"
                : "bg-forest-950 border border-forest-800"
            }`}
          >
            🌱
          </div>
          {isRunning && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
            </span>
          )}
        </div>

        <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800">
          {isRunning ? "TOUCH GRASS SESSION IN PROGRESS" : "OUTDOOR SESSION MODE"}
        </span>

        {/* Large Time Display */}
        <div className="my-4 font-mono text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          {formatDuration(seconds)}
        </div>

        <p className="text-xs text-forest-300 max-w-sm mb-6">
          {isRunning
            ? "Your outdoor walk is being recorded. Scan species or complete real-world challenges along the trail."
            : "Press Start, put your phone in your pocket, and let the real world inspire your senses."}
        </p>

        {/* Live Counters */}
        {session && (
          <div className="grid grid-cols-3 gap-3 w-full max-w-md mb-6">
            <div className="p-3 rounded-2xl bg-forest-950/80 border border-forest-800">
              <span className="text-lg font-bold text-white font-mono">
                {session.discoveriesCount}
              </span>
              <p className="text-[11px] text-forest-300 mt-0.5">Discoveries</p>
            </div>
            <div className="p-3 rounded-2xl bg-forest-950/80 border border-forest-800">
              <span className="text-lg font-bold text-amber-400 font-mono">
                {session.challengesCompleted}
              </span>
              <p className="text-[11px] text-forest-300 mt-0.5">Quests Done</p>
            </div>
            <div className="p-3 rounded-2xl bg-forest-950/80 border border-forest-800">
              <span className="text-lg font-bold text-emerald-300 font-mono">
                +{session.xpEarned}
              </span>
              <p className="text-[11px] text-forest-300 mt-0.5">Session XP</p>
            </div>
          </div>
        )}

        {/* GPS Privacy Note */}
        <div className="flex items-center gap-2 mb-6 text-xs text-forest-400">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Privacy first: Distance tracking is strictly optional & local.</span>
          <button
            onClick={toggleGps}
            className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors ${
              gpsEnabled
                ? "bg-emerald-950 border-emerald-600 text-emerald-300"
                : "bg-forest-950 border-forest-800 text-forest-400 hover:text-forest-200"
            }`}
          >
            {gpsEnabled ? "GPS ON" : "Enable GPS"}
          </button>
        </div>

        {/* Control Button */}
        <div className="w-full max-w-sm">
          {!isRunning ? (
            <Button
              variant="emerald"
              size="lg"
              onClick={onStart}
              className="w-full shadow-emerald-950/80 text-base"
            >
              <Play className="w-5 h-5 fill-white mr-1" />
              START NATURE SESSION
            </Button>
          ) : (
            <Button
              variant="danger"
              size="lg"
              onClick={onStop}
              className="w-full"
            >
              <Square className="w-4 h-4 fill-white mr-1.5" />
              FINISH SESSION & CLAIM XP
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
