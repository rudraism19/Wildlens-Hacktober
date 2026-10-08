"use client";

import * as React from "react";
import Image from "next/image";
import { DEMO_DISCOVERIES, DemoItem } from "@/lib/demo-data";
import { Badge } from "../ui/badge";
import { Sparkles, ArrowRight, Eye } from "lucide-react";
import { getCategoryEmoji } from "@/lib/utils";

interface DemoDiscoveriesProps {
  onSelectDemo?: (demo: DemoItem) => void;
}

export function DemoDiscoveries({ onSelectDemo }: DemoDiscoveriesProps) {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-white">
              Instant Demo Discoveries
            </h3>
            <Badge variant="model" className="text-[10px]">
              Demo Mode
            </Badge>
          </div>
          <p className="text-xs text-forest-300 mt-0.5">
            Test the AI identification and outdoor challenge pipeline without needing a live camera or API key.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {DEMO_DISCOVERIES.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => onSelectDemo?.(item)}
              className="group relative cursor-pointer rounded-2xl bg-forest-900/70 border border-forest-800 hover:border-emerald-500/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/30 flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative aspect-[4/3] w-full bg-forest-950 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.data.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <Badge variant="default" className="text-[10px] bg-forest-950/80 backdrop-blur-md">
                    {getCategoryEmoji(item.data.category)} {item.data.category}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-900/80 text-emerald-300 font-mono border border-emerald-700/60">
                    {Math.round(item.data.confidence * 100)}%
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {item.data.name}
                  </h4>
                  {item.data.scientificName && (
                    <p className="text-[11px] italic text-forest-400 line-clamp-1">
                      {item.data.scientificName}
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-forest-800/60 flex items-center justify-between text-xs text-emerald-400 group-hover:text-emerald-300">
                  <span className="text-[11px] font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Inspect Challenge
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
