"use client";

import * as React from "react";
import { Cpu, Cloud, Sparkles, Check, ChevronDown } from "lucide-react";

interface ModelBadgeProps {
  currentProvider: "gemma" | "gemini";
  onChangeProvider?: (provider: "gemma" | "gemini") => void;
  className?: string;
}

export function ModelBadge({
  currentProvider,
  onChangeProvider,
  className = "",
}: ModelBadgeProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isGemma = currentProvider === "gemma";

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-forest-900/90 hover:bg-forest-850 border border-forest-750 hover:border-emerald-600/70 text-left transition-all shadow-md group"
      >
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
            isGemma
              ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
              : "bg-teal-950 text-teal-300 border border-teal-800"
          }`}
        >
          {isGemma ? <Cpu className="w-4 h-4 animate-pulse" /> : <Cloud className="w-4 h-4" />}
        </div>

        <div className="flex flex-col pr-1">
          <span className="text-[9px] uppercase font-mono tracking-wider text-forest-400 leading-none">
            AI MODEL
          </span>
          <span className="text-xs font-semibold text-white flex items-center gap-1 mt-0.5">
            {isGemma ? "Gemma 2" : "Gemini 1.5"}
            <span
              className={`text-[9px] font-mono px-1 py-0.2 rounded ${
                isGemma
                  ? "bg-emerald-900/70 text-emerald-300"
                  : "bg-teal-900/70 text-teal-300"
              }`}
            >
              {isGemma ? "Open-Weight" : "Cloud"}
            </span>
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-forest-400 group-hover:text-forest-200 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-64 rounded-2xl bg-forest-950/95 border border-forest-800 shadow-2xl backdrop-blur-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="text-[10px] font-mono uppercase tracking-wider text-forest-400 px-3 py-1.5 border-b border-forest-850">
            Select AI Engine
          </div>

          <button
            onClick={() => {
              onChangeProvider?.("gemma");
              setIsOpen(false);
            }}
            className={`w-full mt-1 flex items-start gap-2.5 p-2.5 rounded-xl transition-all text-left ${
              isGemma
                ? "bg-emerald-950/60 border border-emerald-800/80"
                : "hover:bg-forest-900 border border-transparent"
            }`}
          >
            <div className="w-6 h-6 rounded-lg bg-emerald-900/80 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Gemma (Open-Weight)</span>
                {isGemma && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <p className="text-[10px] text-forest-300 mt-0.5">
                Privacy-first, open architecture. Works with local & offline models.
              </p>
            </div>
          </button>

          <button
            onClick={() => {
              onChangeProvider?.("gemini");
              setIsOpen(false);
            }}
            className={`w-full mt-1 flex items-start gap-2.5 p-2.5 rounded-xl transition-all text-left ${
              !isGemma
                ? "bg-teal-950/60 border border-teal-800/80"
                : "hover:bg-forest-900 border border-transparent"
            }`}
          >
            <div className="w-6 h-6 rounded-lg bg-teal-900/80 text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
              <Cloud className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Gemini (Cloud API)</span>
                {!isGemma && <Check className="w-3.5 h-3.5 text-teal-400" />}
              </div>
              <p className="text-[10px] text-forest-300 mt-0.5">
                Cloud multimodal fallback with Gemini 1.5 Flash.
              </p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
