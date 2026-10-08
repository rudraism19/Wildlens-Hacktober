import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    Tree: "🌳",
    Plant: "🌿",
    Flower: "🌸",
    Bird: "🐦",
    Insect: "🦋",
    Animal: "🦊",
    Mushroom: "🍄",
    Rock: "🪨",
    Other: "🌱",
  };
  return map[category] || "🌱";
}
