export interface LevelConfig {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  badge: string;
  description: string;
  color: string;
}

export const NATURE_LEVELS: LevelConfig[] = [
  {
    level: 1,
    title: "Seedling",
    minXp: 0,
    maxXp: 99,
    badge: "🌱",
    description: "Taking your first steps to step away from screens and notice the green world.",
    color: "emerald",
  },
  {
    level: 2,
    title: "Explorer",
    minXp: 100,
    maxXp: 249,
    badge: "🌿",
    description: "Developing keen outdoor senses, seeking patterns in bark, blooms, and wings.",
    color: "green",
  },
  {
    level: 3,
    title: "Trail Seeker",
    minXp: 250,
    maxXp: 499,
    badge: "🌲",
    description: "Walking deeper into biodiversity, reading seasonal clues in the wild.",
    color: "teal",
  },
  {
    level: 4,
    title: "Naturalist",
    minXp: 500,
    maxXp: 999,
    badge: "🦅",
    description: "A seasoned observer of ecosystems who puts the phone away instinctively.",
    color: "amber",
  },
  {
    level: 5,
    title: "Wild Guardian",
    minXp: 1000,
    maxXp: Infinity,
    badge: "🦉",
    description: "A true steward of the wild who inspires others to touch grass and cherish life.",
    color: "emerald",
  },
];

export function getLevelForXp(xp: number): LevelConfig {
  for (let i = NATURE_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= NATURE_LEVELS[i].minXp) {
      return NATURE_LEVELS[i];
    }
  }
  return NATURE_LEVELS[0];
}

export function getNextLevel(xp: number): LevelConfig | null {
  const current = getLevelForXp(xp);
  const next = NATURE_LEVELS.find((lvl) => lvl.level === current.level + 1);
  return next || null;
}

export function getXpProgress(xp: number): {
  currentLevel: LevelConfig;
  nextLevel: LevelConfig | null;
  progressPercent: number;
  xpNeeded: number;
} {
  const currentLevel = getLevelForXp(xp);
  const nextLevel = getNextLevel(xp);

  if (!nextLevel) {
    return {
      currentLevel,
      nextLevel: null,
      progressPercent: 100,
      xpNeeded: 0,
    };
  }

  const range = nextLevel.minXp - currentLevel.minXp;
  const currentInTier = xp - currentLevel.minXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentInTier / range) * 100)));
  const xpNeeded = nextLevel.minXp - xp;

  return {
    currentLevel,
    nextLevel,
    progressPercent,
    xpNeeded,
  };
}
