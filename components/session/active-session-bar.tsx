"use client";

import * as React from "react";
import Link from "next/link";
import { getActiveSession, ActiveSessionState } from "@/lib/storage/session-store";
import { formatDuration } from "@/lib/utils";
import { Clock, ArrowRight } from "lucide-react";

export function ActiveSessionBar() {
  const [session, setSession] = React.useState<ActiveSessionState | null>(null);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    const check = () => {
      const active = getActiveSession();
      setSession(active);
      if (active) {
        const start = new Date(active.startTime).getTime();
        setSeconds(Math.max(0, Math.floor((Date.now() - start) / 1000)));
      }
    };

    check();
    const interval = setInterval(check, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!session) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-80 z-40 animate-in slide-in-from-bottom-5">
      <Link
        href="/session"
        className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-950/95 border border-emerald-500/60 shadow-2xl backdrop-blur-xl text-white group hover:border-emerald-400 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-800/80 flex items-center justify-center text-emerald-200">
            <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: "6s" }} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-400">
                ACTIVE SESSION
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-xs font-mono font-bold text-white">
              {formatDuration(seconds)} outside
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-emerald-400 font-medium group-hover:translate-x-1 transition-transform">
          <span>Manage</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </Link>
    </div>
  );
}
