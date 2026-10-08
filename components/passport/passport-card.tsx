"use client";

import * as React from "react";
import { PassportRecord } from "@/lib/storage/db";
import { Badge } from "../ui/badge";
import { getCategoryEmoji, formatDate } from "@/lib/utils";
import { Sparkles, CheckCircle2, Trophy, Clock } from "lucide-react";

interface PassportCardProps {
  entry: PassportRecord;
  onClick?: () => void;
}

export function PassportCard({ entry, onClick }: PassportCardProps) {
  const categoryEmoji = getCategoryEmoji(entry.category);
  const confidencePercent = Math.round(entry.confidence * 100);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl bg-forest-900/80 border border-forest-800 hover:border-emerald-500/70 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Photo Frame */}
      <div className="relative aspect-[4/3] w-full bg-forest-950 overflow-hidden">
        <img
          src={entry.thumbnail || entry.image}
          alt={entry.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-black/20" />

        {/* Category Pill */}
        <div className="absolute top-2.5 left-2.5">
          <Badge variant="default" className="text-[11px] bg-forest-950/85 backdrop-blur-md">
            {categoryEmoji} {entry.category}
          </Badge>
        </div>

        {/* Confidence */}
        <div className="absolute top-2.5 right-2.5">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-forest-950/85 text-emerald-300 border border-emerald-700/60 backdrop-blur-md">
            ⭐ {confidencePercent}%
          </span>
        </div>

        {/* Challenge badge on bottom of image */}
        {entry.challengeCompleted ? (
          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-emerald-950/90 text-emerald-300 text-[10px] font-semibold border border-emerald-700/60 flex items-center gap-1 backdrop-blur-md">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Challenge Done (+{entry.challenge?.rewardXp || 50} XP)
          </div>
        ) : entry.challenge ? (
          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-amber-950/90 text-amber-300 text-[10px] font-semibold border border-amber-700/60 flex items-center gap-1 backdrop-blur-md">
            <Trophy className="w-3 h-3 text-amber-400" />
            Quest Ready
          </div>
        ) : null}
      </div>

      {/* Info Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
            {entry.name}
          </h3>
          {entry.scientificName && (
            <p className="text-xs italic text-forest-300 font-serif line-clamp-1 mt-0.5">
              {entry.scientificName}
            </p>
          )}
          <p className="text-xs text-forest-300 mt-2 line-clamp-2 leading-relaxed">
            {entry.description}
          </p>
        </div>

        <div className="mt-4 pt-2.5 border-t border-forest-800/60 flex items-center justify-between text-[11px] text-forest-400 font-mono">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-forest-500" />
            {formatDate(entry.createdAt)}
          </span>
          <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform font-sans font-medium">
            View details &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
