"use client";

import * as React from "react";
import { PassportRecord } from "@/lib/storage/db";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  X,
  Sparkles,
  Trophy,
  CheckCircle2,
  Share2,
  Calendar,
  AlertTriangle,
  Eye,
  Info,
} from "lucide-react";
import { getCategoryEmoji, formatDate } from "@/lib/utils";
import { PutPhoneAwayPrompt } from "../challenges/put-phone-away-prompt";

interface PassportDetailModalProps {
  entry: PassportRecord | null;
  onClose: () => void;
  onCompleteChallenge: (id: string) => void;
}

export function PassportDetailModal({
  entry,
  onClose,
  onCompleteChallenge,
}: PassportDetailModalProps) {
  const [showChallengePrompt, setShowChallengePrompt] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  if (!entry) return null;

  const categoryEmoji = getCategoryEmoji(entry.category);
  const confidencePercent = Math.round(entry.confidence * 100);

  const handleShare = async () => {
    const text = `🌿 I discovered ${entry.name} (${entry.scientificName || ""}) using WildLens! AI-powered outdoor explorer built for the Touch Grass challenge.`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `WildLens Discovery: ${entry.name}`,
          text,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard error
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl bg-forest-900 border border-forest-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-forest-950/80 hover:bg-forest-950 text-forest-300 hover:text-white border border-forest-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Top Image */}
          <div className="relative aspect-[16/10] w-full bg-forest-950">
            <img
              src={entry.image}
              alt={entry.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-transparent to-black/30" />

            <div className="absolute top-4 left-4 flex items-center gap-2">
              <Badge variant="default" className="text-xs bg-forest-950/85 backdrop-blur-md">
                {categoryEmoji} {entry.category}
              </Badge>
              {entry.isDemo && (
                <Badge variant="model" className="text-[10px]">
                  Demo Discovery
                </Badge>
              )}
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-forest-300">
              <span className="flex items-center gap-1.5 font-mono">
                <Calendar className="w-3.5 h-3.5 text-forest-400" />
                Discovered {formatDate(entry.createdAt)}
              </span>
              <span className="font-mono px-2 py-0.5 rounded bg-forest-950/80 text-emerald-400 border border-emerald-700/50">
                ⭐ {confidencePercent}% confidence
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            {/* Title & Description */}
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>{categoryEmoji}</span>
                <span>{entry.name}</span>
              </h2>
              {entry.scientificName && (
                <p className="text-sm italic text-emerald-300 font-serif mt-0.5">
                  {entry.scientificName}
                </p>
              )}
              <p className="text-sm text-forest-200 mt-3 leading-relaxed">
                {entry.description}
              </p>
            </div>

            {/* Safety Alert if applicable */}
            {entry.safety && (
              <div
                className={`p-4 rounded-2xl border ${
                  entry.safety.level === "danger"
                    ? "bg-red-950/60 border-red-700/60 text-red-200"
                    : "bg-amber-950/60 border-amber-700/60 text-amber-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider mb-1">
                      ⚠️ {entry.safety.warning}
                    </h4>
                    <p className="text-xs leading-relaxed">{entry.safety.advice}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Look Closer Observation Tip */}
            <div className="p-4 rounded-2xl bg-forest-950/70 border border-forest-800">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-forest-300 mb-1">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>LOOK CLOSER</span>
              </div>
              <p className="text-sm text-forest-100 font-medium leading-relaxed">
                &ldquo;{entry.observationTip}&rdquo;
              </p>
            </div>

            {/* Did You Know? */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/50">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
                <Info className="w-4 h-4 text-emerald-400" />
                <span>DID YOU KNOW?</span>
              </div>
              <p className="text-sm text-forest-200 leading-relaxed">
                {entry.interestingFact}
              </p>
            </div>

            {/* Challenge Card */}
            {entry.challenge && (
              <div className="p-5 rounded-2xl bg-forest-950 border border-emerald-500/40">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                    REAL-WORLD NATURE CHALLENGE
                  </span>
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1 font-mono">
                    <Trophy className="w-3.5 h-3.5" />
                    +{entry.challenge.rewardXp || 50} XP
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {entry.challenge.title}
                </h3>
                <p className="text-sm text-forest-200 leading-relaxed mb-4">
                  &ldquo;{entry.challenge.instruction}&rdquo;
                </p>

                {entry.challengeCompleted ? (
                  <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Challenge Completed! (+{entry.challenge.rewardXp || 50} XP earned)
                  </div>
                ) : (
                  <Button
                    variant="emerald"
                    size="md"
                    onClick={() => setShowChallengePrompt(true)}
                    className="w-full"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 mr-1" />
                    Start Outdoor Challenge (+50 XP)
                  </Button>
                )}
              </div>
            )}

            {/* Share / Model attribution */}
            <div className="flex items-center justify-between pt-2 border-t border-forest-800/60 text-xs text-forest-400">
              <span>Model: {entry.modelUsed || "Gemma 2 Open-Weight"}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                {copied ? "Copied Link!" : "Share Discovery"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge put-phone-away modal */}
      {showChallengePrompt && entry.challenge && (
        <PutPhoneAwayPrompt
          challenge={entry.challenge}
          onComplete={() => {
            onCompleteChallenge(entry.id);
            setShowChallengePrompt(false);
          }}
          onCancel={() => setShowChallengePrompt(false)}
        />
      )}
    </div>
  );
}
