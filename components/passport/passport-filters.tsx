"use client";

import * as React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { getCategoryEmoji } from "@/lib/utils";

const FILTER_CATEGORIES = [
  { id: "all", label: "All", emoji: "🌿" },
  { id: "Tree", label: "Trees", emoji: "🌳" },
  { id: "Plant", label: "Plants", emoji: "🌿" },
  { id: "Flower", label: "Flowers", emoji: "🌸" },
  { id: "Bird", label: "Birds", emoji: "🐦" },
  { id: "Insect", label: "Insects", emoji: "🦋" },
  { id: "Animal", label: "Animals", emoji: "🦊" },
  { id: "Mushroom", label: "Mushrooms", emoji: "🍄" },
  { id: "Rock", label: "Rocks", emoji: "🪨" },
];

interface PassportFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalEntriesCount: number;
}

export function PassportFilters({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalEntriesCount,
}: PassportFiltersProps) {
  return (
    <div className="w-full space-y-3">
      {/* Search Input */}
      <div className="relative w-full">
        <Search className="w-4 h-4 text-forest-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={`Search ${totalEntriesCount} nature discoveries...`}
          className="w-full h-11 pl-10 pr-4 rounded-xl bg-forest-900/90 border border-forest-800 text-sm text-forest-100 placeholder-forest-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-600 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-forest-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {FILTER_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isSelected
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/40 border border-emerald-400/40"
                  : "bg-forest-900/80 hover:bg-forest-850 text-forest-300 hover:text-white border border-forest-800"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
