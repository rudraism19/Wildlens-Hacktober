import { GoogleGenerativeAI } from "@google/generative-ai";
import { IAIProvider, AIAnalysisContext } from "./types";
import {
  NatureIdentification,
  NatureIdentificationSchema,
  NatureChallenge,
  NatureChallengeSchema,
  NatureCategory,
} from "../validation/schema";

const GEMINI_CANDIDATE_MODELS = [
  "gemini-3.5-flash",
  "gemini-3.8-flash",
  "gemini-flash-latest",
  "gemini-2.5-pro",
];

export class GeminiProvider implements IAIProvider {
  id: "gemini" = "gemini";
  name = "Gemini 3.5 Flash";
  subtitle = "Multimodal Cloud Vision";
  isOpenWeight = false;
  isCloudOnly = true;

  get apiKey(): string | undefined {
    return process.env.GEMINI_API_KEY;
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  async identifyNature(
    imageBase64: string,
    context?: AIAnalysisContext
  ): Promise<NatureIdentification> {
    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY is not configured on the server");
    }

    const genAI = new GoogleGenerativeAI(this.apiKey);

    // Strip data URL header if present to get pure base64 and mime type
    let mimeType = "image/jpeg";
    let pureBase64 = imageBase64;

    const dataUrlMatch = imageBase64.match(/^data:([^;]+);base64,(.+)$/);
    if (dataUrlMatch) {
      mimeType = dataUrlMatch[1];
      pureBase64 = dataUrlMatch[2];
    }

    const prompt = `You are WildLens Nature AI, an expert botanical, mycological, entomological, and ecological taxonomist built for the "Touch Grass" outdoor exploration challenge.
Analyze the main organism/subject shown in the image carefully and accurately.
If it is a specific or rare plant (such as Rafflesia arnoldii / Corpse Flower, Pitcher plant, specific orchid, etc.), identify it accurately by its true common and scientific name.

Rules:
1. Return strictly formatted JSON adhering to this exact schema:
{
  "name": "string (Likely Common Name)",
  "scientificName": "string (e.g. Binomial Latin) or null",
  "category": "Tree" | "Plant" | "Flower" | "Bird" | "Insect" | "Animal" | "Mushroom" | "Rock" | "Other",
  "confidence": number between 0.50 and 0.99,
  "description": "Short vivid explanation (2 sentences)",
  "interestingFact": "Fascinating biological or ecological fact",
  "observationTip": "A physical detail the user can verify outdoors right now",
  "safety": null or {"level": "safe" | "caution" | "danger", "warning": "string", "advice": "string"},
  "challenge": {
    "title": "Short catchy title",
    "instruction": "A safe real-world outdoor challenge encouraging the user to explore and put their phone away",
    "category": "same category as above",
    "rewardXp": 50,
    "durationMinutes": 5,
    "safetyReminder": "Safety guideline"
  }
}

Safety rule:
- If this is a wild mushroom, toxic berry, stinging insect, or endangered plant, provide an appropriate safety object.
- Never encourage consuming unknown plants or touching venomous/dangerous wildlife.
`;

    const imagePart = {
      inlineData: {
        data: pureBase64,
        mimeType,
      },
    };

    let lastError: any = null;

    for (const modelName of GEMINI_CANDIDATE_MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        });

        const response = await model.generateContent([prompt, imagePart]);
        const text = response.response.text();
        const parsed = JSON.parse(text);

        // Normalize safety field if the model returned a string
        let safetyObj = null;
        if (parsed.safety) {
          if (typeof parsed.safety === "string") {
            safetyObj = {
              level: "caution" as const,
              warning: "Observe from a distance",
              advice: parsed.safety,
            };
          } else if (typeof parsed.safety === "object" && parsed.safety.level) {
            safetyObj = parsed.safety;
          }
        }

        // Format name with "Likely" prefix if not already present
        const rawName = String(parsed.name || "Unknown Species");
        const formattedName = rawName.startsWith("Likely") ? rawName : `Likely ${rawName}`;

        const validated = NatureIdentificationSchema.parse({
          name: formattedName,
          scientificName: parsed.scientificName || null,
          category: parsed.category || "Plant",
          confidence: typeof parsed.confidence === "number" ? parsed.confidence : 0.92,
          description: parsed.description || "A notable organism in the local ecosystem.",
          interestingFact: parsed.interestingFact || "Plays an essential role in its native habitat.",
          observationTip: parsed.observationTip || "Observe its structural adaptations closely.",
          safety: safetyObj,
          challenge: parsed.challenge || {
            title: "Outdoor Observation Quest",
            instruction: "Put your phone in your pocket and observe surrounding biodiversity for 3 minutes.",
            category: parsed.category || "Plant",
            rewardXp: 50,
            durationMinutes: 5,
            safetyReminder: "Stay on marked trails.",
          },
          modelUsed: `Gemini (${modelName})`,
          provider: "gemini",
          isDemo: false,
        });

        return validated;
      } catch (err: any) {
        console.warn(`Gemini model ${modelName} failed:`, err.message);
        lastError = err;
      }
    }

    throw lastError || new Error("All Gemini vision models failed to process the image");
  }

  async generateChallenge(
    speciesName: string,
    category: NatureCategory
  ): Promise<NatureChallenge> {
    if (!this.apiKey) {
      throw new Error("GEMINI_API_KEY is not configured on the server");
    }

    const genAI = new GoogleGenerativeAI(this.apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const prompt = `Generate a safe, physical real-world outdoor challenge for someone who just discovered a ${category} (${speciesName}).
The user must be able to complete this challenge outdoors without looking at their phone screen.
Return ONLY valid JSON matching this schema:
{
  "title": "Short title",
  "instruction": "Step-by-step physical exploration challenge",
  "category": "${category}",
  "rewardXp": 50,
  "durationMinutes": 5,
  "safetyReminder": "Keep a respectful distance and stay safe"
}`;

    const response = await model.generateContent(prompt);
    const text = response.response.text();
    const parsed = JSON.parse(text);

    return NatureChallengeSchema.parse(parsed);
  }
}
