"use client";

import * as React from "react";
import { WifiOff, ShieldCheck, Cpu } from "lucide-react";

export function OfflineBanner() {
  const [isOffline, setIsOffline] = React.useState(false);

  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="w-full bg-amber-950/90 border-b border-amber-800/80 px-4 py-2.5 text-amber-200 text-xs backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded bg-amber-900/80 text-amber-300">
            <WifiOff className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold uppercase font-mono tracking-wider mr-2 text-white">
              OFFLINE MODE
            </span>
            <span className="text-amber-200">
              Your discoveries and challenges will continue to work locally. AI identification may be limited depending on the installed model.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 font-mono text-[11px] px-2 py-0.5 rounded bg-amber-900/60 border border-amber-700/60 text-amber-300">
          <Cpu className="w-3 h-3 text-emerald-400" />
          <span>LOCAL AI ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
