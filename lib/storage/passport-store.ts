import { getDB, PassportRecord, UserStatsRecord } from "./db";
import { DEMO_DISCOVERIES } from "../demo-data";
import { XP_REWARDS, XpEvent } from "../gamification/xp";

export type { UserStatsRecord };

const STATS_STORAGE_KEY = "wildlens_user_stats_v1";

const DEFAULT_STATS: UserStatsRecord = {
  id: "current",
  totalXp: 125, // Starting with initial Explorer seedling score
  currentStreak: 2,
  lastActiveDate: new Date().toISOString(),
  totalTimeOutdoorsSeconds: 2520, // ~42 mins
  totalDiscoveries: 4,
  totalChallengesCompleted: 1,
  discoveredCategories: ["Tree", "Bird", "Insect", "Flower"],
  aiProviderPreference: "gemma",
};

export async function getUserStats(): Promise<UserStatsRecord> {
  if (typeof window === "undefined") return DEFAULT_STATS;

  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_STATS, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.warn("Error reading stats from localStorage:", err);
  }

  return DEFAULT_STATS;
}

export async function saveUserStats(stats: Partial<UserStatsRecord>): Promise<UserStatsRecord> {
  const current = await getUserStats();
  const updated: UserStatsRecord = { ...current, ...stats };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn("Error saving stats to localStorage:", err);
    }
  }

  return updated;
}

export async function addXp(
  amount: number,
  label: string,
  type: XpEvent["type"] = "BONUS"
): Promise<{ totalXp: number; event: XpEvent }> {
  const current = await getUserStats();
  const newXp = current.totalXp + amount;

  const event: XpEvent = {
    id: `xp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    type,
    amount,
    label,
    timestamp: new Date().toISOString(),
  };

  try {
    const db = await getDB();
    if (db) {
      await db.put("xpEvents", event);
    }
  } catch (err) {
    console.warn("Failed to log XP event in IndexedDB:", err);
  }

  await saveUserStats({ totalXp: newXp });

  return { totalXp: newXp, event };
}

export async function initSeedDataIfEmpty(): Promise<PassportRecord[]> {
  if (typeof window === "undefined") return [];

  try {
    const db = await getDB();
    if (!db) return [];

    const existingCount = await db.count("passport");
    if (existingCount === 0) {
      // Seed with initial demo discoveries so user can immediately experience Passport
      const initialRecords: PassportRecord[] = DEMO_DISCOVERIES.map((demo, idx) => ({
        id: demo.id,
        name: demo.data.name,
        scientificName: demo.data.scientificName,
        category: demo.data.category,
        confidence: demo.data.confidence,
        description: demo.data.description,
        interestingFact: demo.data.interestingFact,
        observationTip: demo.data.observationTip,
        safety: demo.data.safety,
        challenge: demo.data.challenge,
        challengeCompleted: idx === 0, // Mark first one as completed for demonstration
        challengeCompletedAt: idx === 0 ? new Date(Date.now() - 3600000).toISOString() : undefined,
        image: demo.image,
        thumbnail: demo.thumbnail,
        createdAt: new Date(Date.now() - idx * 86400000).toISOString(),
        modelUsed: demo.data.modelUsed,
        provider: demo.data.provider,
        isDemo: true,
      }));

      const tx = db.transaction("passport", "readwrite");
      for (const record of initialRecords) {
        await tx.store.put(record);
      }
      await tx.done;
      return initialRecords;
    }

    return await getAllPassportEntries();
  } catch (err) {
    console.warn("IndexedDB initSeedDataIfEmpty error:", err);
    return [];
  }
}

export async function getAllPassportEntries(): Promise<PassportRecord[]> {
  if (typeof window === "undefined") return [];

  try {
    const db = await getDB();
    if (!db) return [];

    const records = await db.getAllFromIndex("passport", "by-date");
    // Sort descending by date
    return records.reverse();
  } catch (err) {
    console.warn("Failed to get passport entries:", err);
    return [];
  }
}

export async function savePassportDiscovery(
  entry: Omit<PassportRecord, "id" | "createdAt" | "challengeCompleted">
): Promise<PassportRecord> {
  const id = `disc_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  const record: PassportRecord = {
    ...entry,
    id,
    createdAt: new Date().toISOString(),
    challengeCompleted: false,
  };

  try {
    const db = await getDB();
    if (db) {
      await db.put("passport", record);
    }
  } catch (err) {
    console.warn("Failed to save discovery to IndexedDB:", err);
  }

  // Update user stats
  const stats = await getUserStats();
  const isNewCategory = !stats.discoveredCategories.includes(entry.category);
  const updatedCategories = isNewCategory
    ? [...stats.discoveredCategories, entry.category]
    : stats.discoveredCategories;

  await saveUserStats({
    totalDiscoveries: stats.totalDiscoveries + 1,
    discoveredCategories: updatedCategories,
  });

  // Award XP for identification
  await addXp(XP_REWARDS.IDENTIFY_SPECIES, `Identified ${entry.name}`, "IDENTIFY_SPECIES");

  if (isNewCategory) {
    await addXp(
      XP_REWARDS.DISCOVER_NEW_CATEGORY,
      `Discovered new category: ${entry.category}`,
      "DISCOVER_NEW_CATEGORY"
    );
  }

  return record;
}

export async function completeChallengeInPassport(id: string): Promise<PassportRecord | null> {
  try {
    const db = await getDB();
    if (!db) return null;

    const record = await db.get("passport", id);
    if (!record || record.challengeCompleted) {
      return record || null;
    }

    record.challengeCompleted = true;
    record.challengeCompletedAt = new Date().toISOString();

    await db.put("passport", record);

    // Update stats
    const stats = await getUserStats();
    await saveUserStats({
      totalChallengesCompleted: stats.totalChallengesCompleted + 1,
    });

    const reward = record.challenge?.rewardXp || XP_REWARDS.COMPLETE_CHALLENGE;
    await addXp(reward, `Completed challenge: ${record.challenge?.title || record.name}`, "COMPLETE_CHALLENGE");

    return record;
  } catch (err) {
    console.warn("Failed to complete challenge:", err);
    return null;
  }
}
