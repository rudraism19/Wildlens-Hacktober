import { getDB, SessionRecord } from "./db";
import { addXp, saveUserStats, getUserStats } from "./passport-store";
import { XP_REWARDS } from "../gamification/xp";

const ACTIVE_SESSION_KEY = "wildlens_active_nature_session_v1";

export interface ActiveSessionState {
  id: string;
  startTime: string;
  discoveriesCount: number;
  challengesCompleted: number;
  categoriesFound: string[];
  distanceMeters: number;
  xpEarned: number;
  discoveryIds: string[];
  isActive: boolean;
}

export function getActiveSession(): ActiveSessionState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Failed to get active session:", err);
  }
  return null;
}

export function startSession(): ActiveSessionState {
  const session: ActiveSessionState = {
    id: `sess_${Date.now()}`,
    startTime: new Date().toISOString(),
    discoveriesCount: 0,
    challengesCompleted: 0,
    categoriesFound: [],
    distanceMeters: 0,
    xpEarned: 0,
    discoveryIds: [],
    isActive: true,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
  }

  return session;
}

export function updateActiveSession(
  updates: Partial<ActiveSessionState>
): ActiveSessionState | null {
  const current = getActiveSession();
  if (!current) return null;

  const updated = { ...current, ...updates };
  if (typeof window !== "undefined") {
    localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(updated));
  }
  return updated;
}

export async function stopSession(): Promise<SessionRecord | null> {
  const active = getActiveSession();
  if (!active) return null;

  const now = new Date();
  const startTime = new Date(active.startTime);
  const durationSeconds = Math.max(0, Math.floor((now.getTime() - startTime.getTime()) / 1000));

  // Calculate session duration bonus XP:
  let durationBonusXp = 0;
  if (durationSeconds >= 1800) {
    // 30 mins
    durationBonusXp = XP_REWARDS.SESSION_30_MIN;
    await addXp(durationBonusXp, "Outdoor Session 30m Bonus", "SESSION_30_MIN");
  } else if (durationSeconds >= 600) {
    // 10 mins
    durationBonusXp = XP_REWARDS.SESSION_10_MIN;
    await addXp(durationBonusXp, "Outdoor Session 10m Bonus", "SESSION_10_MIN");
  }

  const finalRecord: SessionRecord = {
    id: active.id,
    startTime: active.startTime,
    endTime: now.toISOString(),
    durationSeconds,
    discoveriesCount: active.discoveriesCount,
    challengesCompleted: active.challengesCompleted,
    categoriesFound: active.categoriesFound,
    distanceMeters: active.distanceMeters,
    xpEarned: active.xpEarned + durationBonusXp,
    discoveryIds: active.discoveryIds,
  };

  try {
    const db = await getDB();
    if (db) {
      await db.put("sessions", finalRecord);
    }
  } catch (err) {
    console.warn("Failed to save session to IndexedDB:", err);
  }

  // Update total outdoor time
  const stats = await getUserStats();
  await saveUserStats({
    totalTimeOutdoorsSeconds: stats.totalTimeOutdoorsSeconds + durationSeconds,
  });

  if (typeof window !== "undefined") {
    localStorage.removeItem(ACTIVE_SESSION_KEY);
  }

  return finalRecord;
}

export async function getAllSessions(): Promise<SessionRecord[]> {
  try {
    const db = await getDB();
    if (!db) return [];
    const sessions = await db.getAllFromIndex("sessions", "by-start");
    return sessions.reverse();
  } catch (err) {
    console.warn("Failed to load sessions:", err);
    return [];
  }
}
