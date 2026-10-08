import { NatureIdentification, NatureChallenge, NatureCategory } from "../validation/schema";

export type AIProviderId = "gemma" | "gemini" | "offline";

export interface AIAnalysisContext {
  latitude?: number;
  longitude?: number;
  timeOfDay?: string;
  season?: string;
}

export interface IAIProvider {
  id: AIProviderId;
  name: string;
  subtitle: string;
  isOpenWeight: boolean;
  isCloudOnly: boolean;

  isConfigured(): boolean;

  identifyNature(
    imageBase64: string,
    context?: AIAnalysisContext
  ): Promise<NatureIdentification>;

  generateChallenge(
    speciesName: string,
    category: NatureCategory
  ): Promise<NatureChallenge>;
}
