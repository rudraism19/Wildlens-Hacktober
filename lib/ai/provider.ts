import { IAIProvider, AIProviderId, AIAnalysisContext } from "./types";
import { GemmaProvider } from "./gemma";
import { GeminiProvider } from "./gemini";
import {
  NatureIdentification,
  NatureChallenge,
  NatureCategory,
  NatureIdentificationSchema,
} from "../validation/schema";

const gemmaInstance = new GemmaProvider();
const geminiInstance = new GeminiProvider();

export function getAvailableProviders(): {
  id: AIProviderId;
  name: string;
  subtitle: string;
  isOpenWeight: boolean;
  isConfigured: boolean;
}[] {
  return [
    {
      id: "gemma",
      name: gemmaInstance.name,
      subtitle: gemmaInstance.subtitle,
      isOpenWeight: true,
      isConfigured: gemmaInstance.isConfigured(),
    },
    {
      id: "gemini",
      name: geminiInstance.name,
      subtitle: geminiInstance.subtitle,
      isOpenWeight: false,
      isConfigured: geminiInstance.isConfigured(),
    },
  ];
}

export function resolveAIProvider(preferred?: AIProviderId): IAIProvider {
  const defaultMode =
    (process.env.NEXT_PUBLIC_AI_MODE as AIProviderId) || "gemma";
  const target = preferred || defaultMode;

  if (target === "gemini" && geminiInstance.isConfigured()) {
    return geminiInstance;
  }

  // Default to open-weight Gemma
  return gemmaInstance;
}

export async function identifyNatureWithFallback(
  imageBase64: string,
  preferred?: AIProviderId,
  context?: AIAnalysisContext
): Promise<NatureIdentification> {
  const primary = resolveAIProvider(preferred);

  try {
    const result = await primary.identifyNature(imageBase64, context);
    return NatureIdentificationSchema.parse(result);
  } catch (primaryErr) {
    console.warn(`Primary provider (${primary.name}) failed, falling back to secondary:`, primaryErr);

    // If primary was Gemini, try Gemma; if primary was Gemma, try Gemini if configured
    const secondary =
      primary.id === "gemini"
        ? gemmaInstance
        : geminiInstance.isConfigured()
        ? geminiInstance
        : gemmaInstance;

    try {
      const fallbackResult = await secondary.identifyNature(imageBase64, context);
      return NatureIdentificationSchema.parse(fallbackResult);
    } catch (fallbackErr) {
      console.error("Both AI providers failed:", fallbackErr);
      throw new Error(
        `Unable to identify nature image. Please try another angle or check lighting.`
      );
    }
  }
}

export async function generateChallengeWithFallback(
  speciesName: string,
  category: NatureCategory,
  preferred?: AIProviderId
): Promise<NatureChallenge> {
  const provider = resolveAIProvider(preferred);
  try {
    return await provider.generateChallenge(speciesName, category);
  } catch (err) {
    console.warn("Challenge generation fallback to Gemma:", err);
    return await gemmaInstance.generateChallenge(speciesName, category);
  }
}
