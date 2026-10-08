"use client";

import * as React from "react";
import Link from "next/link";
import {
  initSeedDataIfEmpty,
  getAllPassportEntries,
  completeChallengeInPassport,
  getUserStats,
  UserStatsRecord,
} from "@/lib/storage/passport-store";
import { PassportRecord } from "@/lib/storage/db";
import { PassportCard } from "@/components/passport/passport-card";
import { PassportFilters } from "@/components/passport/passport-filters";
import { PassportDetailModal } from "@/components/passport/passport-detail-modal";
import { XpProgressBar } from "@/components/nature/xp-progress-bar";
import { Button } from "@/components/ui/button";
import { Camera, BookOpen, Sparkles, FolderDown } from "lucide-react";

export default function PassportPage() {
  const [entries, setEntries] = React.useState<PassportRecord[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [selectedEntry, setSelectedEntry] = React.useState<PassportRecord | null>(null);
  const [stats, setStats] = React.useState<UserStatsRecord | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load passport entries and user stats from IndexedDB
  const refreshData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const records = await initSeedDataIfEmpty();
      setEntries(records);
      const userStats = await getUserStats();
      setStats(userStats);
    } catch (err) {
      console.warn("Failed to load passport records:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Handle challenge completion
  const handleCompleteChallenge = async (id: string) => {
    const updated = await completeChallengeInPassport(id);
    if (updated) {
      setEntries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, challengeCompleted: true } : item))
      );
      if (selectedEntry?.id === id) {
        setSelectedEntry({ ...selectedEntry, challengeCompleted: true });
      }
      const userStats = await getUserStats();
      setStats(userStats);
    }
  };

  // Filter entries
  const filteredEntries = entries.filter((entry) => {
    const matchesCategory =
      selectedCategory === "all" ||
      entry.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === "" ||
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.scientificName &&
        entry.scientificName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-forest-850">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Nature Passport
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-forest-300 mt-0.5">
            Your personal field journal of species encountered, verified, and explored.
          </p>
        </div>

        <Link href="/scanner">
          <Button variant="emerald" size="md">
            <Camera className="w-4 h-4 mr-1.5" />
            Scan New Discovery
          </Button>
        </Link>
      </div>

      {/* Stats Summary & Level Progress */}
      {stats && <XpProgressBar stats={stats} />}

      {/* Filter and Search Controls */}
      <PassportFilters
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalEntriesCount={entries.length}
      />

      {/* Grid of Passport Cards */}
      {isLoading ? (
        <div className="py-20 text-center text-forest-400 font-mono text-sm animate-pulse">
          Opening Nature Passport & reading local field memory...
        </div>
      ) : filteredEntries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEntries.map((entry) => (
            <PassportCard
              key={entry.id}
              entry={entry}
              onClick={() => setSelectedEntry(entry)}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-3xl bg-forest-900/40 border border-forest-800 text-center flex flex-col items-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-forest-900 border border-forest-800 flex items-center justify-center text-3xl mb-4">
            🔍
          </div>
          <h3 className="text-base font-bold text-white mb-1">
            No Discoveries Found
          </h3>
          <p className="text-xs text-forest-300 leading-relaxed mb-6">
            {searchQuery
              ? `No species matching "${searchQuery}" in your journal.`
              : "You haven't logged any discoveries in this category yet."}
          </p>
          <Link href="/scanner">
            <Button variant="emerald" size="md">
              <Camera className="w-4 h-4 mr-1.5" />
              Scan Now
            </Button>
          </Link>
        </div>
      )}

      {/* Detail Modal */}
      {selectedEntry && (
        <PassportDetailModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
          onCompleteChallenge={handleCompleteChallenge}
        />
      )}
    </div>
  );
}
