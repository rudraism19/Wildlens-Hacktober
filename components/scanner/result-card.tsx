"use client";

import * as React from "react";
import {
  Sparkles,
  AlertTriangle,
  Info,
  CheckCircle,
  Trophy,
  Camera,
  Share2,
  BookmarkCheck,
  Eye,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { NatureIdentification } from "@/lib/validation/schema";
import { getCategoryEmoji } from "@/lib/utils";
import { PutPhoneAwayPrompt } from "../challenges/put-phone-away-prompt";

interface ResultCardProps {
  data: NatureIdentification;
  imageUrl: string;
  onScanAnother: () => void;
  onChallengeCompleted?: () => void;
  onSaveToPassport?: () => void;
  isSaved?: boolean;
}

export function ResultCard({
  data,
  imageUrl,
  onScanAnother,
  onChallengeCompleted,
  onSaveToPassport,
  isSaved = false,
}: ResultCardProps) {
  const [showChallengeModal, setShowChallengeModal] = React.useState(false);
  const [challengeDone, setChallengeDone] = React.useState(false);

  const confidencePercent = Math.round(data.confidence * 100);
  const categoryEmoji = getCategoryEmoji(data.category);

  const handleCompleteChallenge = () => {
    setChallengeDone(true);
    setShowChallengeModal(false);
    onChallengeCompleted?.();
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl bg-forest-900 border border-forest-800 shadow-2xl overflow-hidden text-forest-100 animate-in fade-in zoom-in-95 duration-200">
      {/* Top Image Preview */}
      <div className="relative aspect-[16/10] w-full bg-forest-950 overflow-hidden">
        <img
          src={imageUrl}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-transparent to-black/30" />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <Badge variant="default" className="text-xs bg-forest-950/80 backdrop-blur-md">
            {categoryEmoji} {data.category}
          </Badge>
          {data.isDemo && (
            <Badge variant="model" className="text-[10px]">
              Demo Discovery
            </Badge>
          )}
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-forest-950/80 text-emerald-400 border border-emerald-700/60 backdrop-blur-md">
            ⭐ {confidencePercent}% confidence
          </span>
        </div>

        {/* Model Attribution in bottom-right of photo */}
        <div className="absolute bottom-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-forest-300 backdrop-blur-sm border border-forest-800">
          Engine: {data.modelUsed || "Gemma 2 Open-Weight"}
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        {/* Likely Identification */}
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold block mb-1">
            LIKELY IDENTIFICATION
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <span>{categoryEmoji}</span>
            <span>{data.name}</span>
          </h2>
          {data.scientificName && (
            <p className="text-sm italic text-emerald-300 font-serif mt-0.5">
              {data.scientificName}
            </p>
          )}
          <p className="text-sm text-forest-200 mt-3 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Safety Warning if caution or danger */}
        {data.safety ? (
          <div
            className={`p-4 rounded-2xl border ${
              data.safety.level === "danger"
                ? "bg-red-950/60 border-red-700/60 text-red-200"
                : "bg-amber-950/60 border-amber-700/60 text-amber-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-1">
                  ⚠️ {data.safety.warning || "Observe From A Safe Distance"}
                </h4>
                <p className="text-xs leading-relaxed">{data.safety.advice}</p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Look Closer (Observation Tip) */}
        <div className="p-4 rounded-2xl bg-forest-950/70 border border-forest-800/80">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-forest-300 mb-1">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>LOOK CLOSER</span>
          </div>
          <p className="text-sm text-forest-100 font-medium leading-relaxed">
            &ldquo;{data.observationTip}&rdquo;
          </p>
        </div>

        {/* Did You Know? */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
            <Info className="w-4 h-4 text-emerald-400" />
            <span>DID YOU KNOW?</span>
          </div>
          <p className="text-sm text-forest-200 leading-relaxed">
            {data.interestingFact}
          </p>
        </div>

        {/* Real-World Nature Challenge */}
        {data.challenge && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-forest-850 to-forest-950 border border-emerald-500/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-15 pointer-events-none">
              <Sparkles className="w-20 h-20 text-emerald-400" />
            </div>

            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-800">
                YOUR NEXT CHALLENGE
              </span>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1 font-mono">
                <Trophy className="w-3.5 h-3.5" />
                +{data.challenge.rewardXp || 50} XP
              </span>
            </div>

            <h3 className="text-base font-bold text-white mb-1">
              {data.challenge.title}
            </h3>
            <p className="text-sm text-forest-200 leading-relaxed mb-4">
              &ldquo;{data.challenge.instruction}&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5">
              {!challengeDone ? (
                <Button
                  variant="emerald"
                  size="md"
                  onClick={() => setShowChallengeModal(true)}
                  className="flex-1"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Start Outdoor Challenge
                </Button>
              ) : (
                <div className="flex-1 p-2 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Challenge Completed (+{data.challenge.rewardXp || 50} XP)
                </div>
              )}

              {onSaveToPassport && (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={onSaveToPassport}
                  disabled={isSaved}
                >
                  <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                  {isSaved ? "Saved in Passport" : "Save to Passport"}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Global Safety Disclaimer */}
        <p className="text-[11px] text-forest-400 leading-normal text-center px-2">
          WildLens provides AI-assisted identification, not professional biological advice. Do not eat, touch, approach, or handle unknown plants, mushrooms, insects, or animals based solely on an AI identification.
        </p>

        {/* Bottom Actions */}
        <div className="pt-2 flex items-center gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={onScanAnother}
            className="w-full"
          >
            <Camera className="w-4 h-4 mr-1 text-emerald-400" />
            Scan Something Else
          </Button>
        </div>
      </div>

      {/* Put phone away modal */}
      {showChallengeModal && data.challenge && (
        <PutPhoneAwayPrompt
          challenge={data.challenge}
          onComplete={handleCompleteChallenge}
          onCancel={() => setShowChallengeModal(false)}
        />
      )}
    </div>
  );
}
