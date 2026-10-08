export const XP_REWARDS = {
  IDENTIFY_SPECIES: 25,
  COMPLETE_CHALLENGE: 50,
  SESSION_10_MIN: 25,
  SESSION_30_MIN: 100,
  DISCOVER_NEW_CATEGORY: 40,
} as const;

export type XpActionType = keyof typeof XP_REWARDS;

export interface XpEvent {
  id: string;
  type: XpActionType | "BONUS";
  amount: number;
  label: string;
  timestamp: string;
}
