import { openDB, DBSchema, IDBPDatabase } from "idb";
import { NatureIdentification, NatureCategory } from "../validation/schema";
import { XpEvent } from "../gamification/xp";

export interface PassportRecord {
  id: string;
  name: string;
  scientificName?: string | null;
  category: NatureCategory;
  confidence: number;
  description: string;
  interestingFact: string;
  observationTip: string;
  safety?: {
    level: "safe" | "caution" | "danger";
    warning: string;
    advice: string;
  } | null;
  challenge?: {
    id?: string;
    title: string;
    instruction: string;
    category: NatureCategory;
    rewardXp: number;
    durationMinutes: number;
    safetyReminder: string;
  };
  challengeCompleted: boolean;
  challengeCompletedAt?: string;
  image: string; // Base64 data URI or remote/demo URL
  thumbnail?: string;
  createdAt: string;
  modelUsed?: string;
  provider?: "gemma" | "gemini" | "offline";
  isDemo?: boolean;
}

export interface SessionRecord {
  id: string;
  startTime: string;
  endTime?: string;
  durationSeconds: number;
  discoveriesCount: number;
  challengesCompleted: number;
  categoriesFound: string[];
  distanceMeters?: number;
  xpEarned: number;
  discoveryIds: string[];
}

export interface UserStatsRecord {
  id: string; // "current"
  totalXp: number;
  currentStreak: number;
  lastActiveDate: string;
  totalTimeOutdoorsSeconds: number;
  totalDiscoveries: number;
  totalChallengesCompleted: number;
  discoveredCategories: string[];
  aiProviderPreference: "gemma" | "gemini";
}

interface WildLensDB extends DBSchema {
  passport: {
    key: string;
    value: PassportRecord;
    indexes: {
      "by-category": string;
      "by-date": string;
    };
  };
  sessions: {
    key: string;
    value: SessionRecord;
    indexes: {
      "by-start": string;
    };
  };
  xpEvents: {
    key: string;
    value: XpEvent;
    indexes: {
      "by-timestamp": string;
    };
  };
  settings: {
    key: string;
    value: any;
  };
}

const DB_NAME = "wildlens-field-db";
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<WildLensDB>> | null = null;

export async function getDB(): Promise<IDBPDatabase<WildLensDB> | null> {
  if (typeof window === "undefined") return null;

  if (!dbPromise) {
    dbPromise = openDB<WildLensDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("passport")) {
          const passportStore = db.createObjectStore("passport", {
            keyPath: "id",
          });
          passportStore.createIndex("by-category", "category");
          passportStore.createIndex("by-date", "createdAt");
        }

        if (!db.objectStoreNames.contains("sessions")) {
          const sessionStore = db.createObjectStore("sessions", {
            keyPath: "id",
          });
          sessionStore.createIndex("by-start", "startTime");
        }

        if (!db.objectStoreNames.contains("xpEvents")) {
          const xpStore = db.createObjectStore("xpEvents", {
            keyPath: "id",
          });
          xpStore.createIndex("by-timestamp", "timestamp");
        }

        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings");
        }
      },
    });
  }

  return dbPromise;
}
