import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Cpu,
  WifiOff,
  Coins,
  Settings2,
  Layers,
  ArrowRight,
  Sparkles,
  Camera,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function WhyOpenAIPage() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "1. Privacy-First Exploration",
      summary: "Your outdoor photos remain your own.",
      detail:
        "When exploring outdoors, location metadata and personal photography should never be harvested for proprietary model training. Open-weight Gemma models allow vision and taxonomy inference to execute on-device or on self-hosted infrastructure with zero external telemetry.",
    },
    {
      icon: WifiOff,
      title: "2. Offline Resilience in Remote Wilds",
      summary: "“The best outdoor AI is one that still works when the internet doesn't.”",
      detail:
        "True nature exploration happens on forested mountain ridges, remote coastlines, and national parks where cellular towers don't reach. Closed cloud APIs become useless paperweights the moment you lose signal. Gemma's open weights ensure nature explorers always have a functioning field naturalist in their pocket.",
    },
    {
      icon: Layers,
      title: "3. Open Architecture & No Vendor Lock-in",
      summary: "Swap providers freely with clean interfaces.",
      detail:
        "WildLens implements a modular AI provider abstraction (`IAIProvider`). Whether you run Google's Gemma 2B/9B weights locally, test PaliGemma vision checkpoints, or plug into Google Gemini Flash APIs for cloud backup, you remain in complete control of your computational stack.",
    },
    {
      icon: Coins,
      title: "4. Zero Per-Token Tax on Curiosity",
      summary: "Curiosity shouldn't come with an API bill.",
      detail:
        "Commercial vision APIs charge per-query token fees, which discourages frequent, spontaneous nature scanning. Running open-weight Gemma models eliminates recurring API bills, allowing users, schools, and nature parks to explore nature without metering.",
    },
    {
      icon: Settings2,
      title: "5. Fine-Tuning for Local Bioregions",
      summary: "Adaptable to local ecosystems around the globe.",
      detail:
        "A proprietary black-box API treats the entire world with generic classifications. Gemma's open weights can be fine-tuned on regional botanical datasets (such as Western Ghats flora, Appalachian lichens, or Scandinavian mosses), yielding localized taxonomic precision that closed models overlook.",
    },
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto py-4">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="model" className="px-3 py-1">
          OPEN-WEIGHT AI PHILOSOPHY
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Why Open-Weight AI Powers WildLens
        </h1>
        <p className="text-base sm:text-lg text-emerald-300 font-serif italic">
          &ldquo;The best outdoor AI is one that still works when the internet doesn&apos;t.&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-forest-300 leading-relaxed">
          How Google&apos;s open-weight Gemma family delivers a truly private, offline-capable, and community-owned nature exploration companion.
        </p>
      </div>

      {/* 5 Pillars */}
      <div className="space-y-5">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="p-6 md:p-8 rounded-3xl bg-forest-900/80 border border-forest-800 shadow-xl space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-300 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white">
                    {pillar.title}
                  </h2>
                  <p className="text-xs font-mono text-emerald-400 mt-0.5">
                    {pillar.summary}
                  </p>
                </div>
              </div>

              <p className="text-sm text-forest-200 leading-relaxed pl-0 md:pl-13">
                {pillar.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* Gemma vs Gemini Comparison Table */}
      <div className="rounded-3xl bg-forest-900 border border-forest-800 p-6 md:p-8 shadow-xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-400" />
          The Dual-Model Synergy in WildLens
        </h3>
        <p className="text-xs text-forest-300">
          WildLens combines the best of both worlds: open weights for local autonomy, and cloud APIs as a configurable alternative.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-forest-800 text-forest-400 font-mono">
                <th className="py-2.5 px-3">Capability</th>
                <th className="py-2.5 px-3 text-emerald-300">Gemma (Open-Weight)</th>
                <th className="py-2.5 px-3 text-teal-300">Gemini (Cloud API)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest-850 text-forest-200">
              <tr>
                <td className="py-3 px-3 font-semibold text-white">Weight Availability</td>
                <td className="py-3 px-3 text-emerald-300">Open Weights (Downloadable)</td>
                <td className="py-3 px-3 text-forest-400">Proprietary Hosted</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">Works in Deep Wilderness</td>
                <td className="py-3 px-3 text-emerald-300 font-bold">Yes (Offline & Local)</td>
                <td className="py-3 px-3 text-forest-400">Requires Cellular Data</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">Photo Privacy</td>
                <td className="py-3 px-3 text-emerald-300">Zero Cloud Ingestion</td>
                <td className="py-3 px-3 text-forest-400">Encrypted Cloud Transmission</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-white">Customization</td>
                <td className="py-3 px-3 text-emerald-300">Full Fine-Tuning Capability</td>
                <td className="py-3 px-3 text-forest-400">Prompting / System Instructions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <Link href="/scanner">
          <Button variant="emerald" size="lg" className="px-8">
            <Camera className="w-5 h-5 mr-1" />
            Try the Gemma Nature Scanner
          </Button>
        </Link>
      </div>
    </div>
  );
}
