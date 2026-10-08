import { z } from "zod";

export const NatureCategorySchema = z.enum([
  "Tree",
  "Plant",
  "Flower",
  "Bird",
  "Insect",
  "Animal",
  "Mushroom",
  "Rock",
  "Other",
]);

export type NatureCategory = z.infer<typeof NatureCategorySchema>;

export const NatureSafetySchema = z
  .object({
    level: z.enum(["safe", "caution", "danger"]),
    warning: z.string(),
    advice: z.string(),
  })
  .nullable();

export type NatureSafety = z.infer<typeof NatureSafetySchema>;

export const NatureChallengeSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  instruction: z.string(),
  category: NatureCategorySchema,
  rewardXp: z.number().default(50),
  durationMinutes: z.number().default(5),
  safetyReminder: z.string().default("Observe safely without disturbing wildlife."),
});

export type NatureChallenge = z.infer<typeof NatureChallengeSchema>;

export const NatureIdentificationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  scientificName: z.string().nullable().optional(),
  category: NatureCategorySchema,
  confidence: z.number().min(0).max(1),
  description: z.string().min(5, "Description must be informative"),
  interestingFact: z.string().min(5, "Interesting fact is required"),
  observationTip: z.string().min(5, "Observation tip is required"),
  safety: NatureSafetySchema.optional().default(null),
  challenge: NatureChallengeSchema.optional(),
  modelUsed: z.string().optional(),
  provider: z.enum(["gemma", "gemini", "offline"]).optional(),
  isDemo: z.boolean().optional().default(false),
});

export type NatureIdentification = z.infer<typeof NatureIdentificationSchema>;

export const AnalyzeRequestSchema = z.object({
  image: z.string().min(1, "Image base64 or URL is required"),
  provider: z.enum(["gemma", "gemini"]).optional().default("gemma"),
  context: z
    .object({
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      timeOfDay: z.string().optional(),
      season: z.string().optional(),
    })
    .optional(),
});

export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>;

export const ChallengeRequestSchema = z.object({
  speciesName: z.string(),
  category: NatureCategorySchema,
  provider: z.enum(["gemma", "gemini"]).optional().default("gemma"),
});

export type ChallengeRequest = z.infer<typeof ChallengeRequestSchema>;
