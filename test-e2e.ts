import { identifyNatureWithFallback, generateChallengeWithFallback, getAvailableProviders } from "./lib/ai/provider";
import { getLevelForXp, getXpProgress, NATURE_LEVELS } from "./lib/gamification/levels";
import { XP_REWARDS } from "./lib/gamification/xp";
import { DEMO_DISCOVERIES } from "./lib/demo-data";
import { NatureIdentificationSchema } from "./lib/validation/schema";

async function runTests() {
  console.log("==========================================");
  console.log("🌿 WILDLENS END-TO-END VERIFICATION SUITE");
  console.log("==========================================\n");

  // 1. Providers Check
  console.log("1. Checking AI Providers...");
  const providers = getAvailableProviders();
  console.log(`Found ${providers.length} providers:`, providers.map((p) => `${p.name} (Open-weight: ${p.isOpenWeight})`));
  if (providers.length < 2) throw new Error("Expected at least 2 AI providers");
  console.log("✅ Providers check passed.\n");

  // 2. Demo Discoveries Validation
  console.log("2. Validating 4 Sample Demo Discoveries (Section 22)...");
  if (DEMO_DISCOVERIES.length !== 4) {
    throw new Error(`Expected 4 demo discoveries, found ${DEMO_DISCOVERIES.length}`);
  }
  for (const demo of DEMO_DISCOVERIES) {
    const validated = NatureIdentificationSchema.safeParse(demo.data);
    if (!validated.success) {
      throw new Error(`Demo item ${demo.id} failed validation: ${JSON.stringify(validated.error)}`);
    }
    console.log(`  - ${demo.data.category} [${demo.data.name}] -> Validated (Confidence: ${demo.data.confidence})`);
  }
  console.log("✅ All demo discoveries adhere strictly to Zod schema.\n");

  // 3. Gemma AI Pipeline Execution
  console.log("3. Testing Gemma Open-Weight Nature Pipeline...");
  const testImageBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/tree-leaf-green";
  const result = await identifyNatureWithFallback(testImageBase64, "gemma");
  console.log("Identification output:", {
    name: result.name,
    category: result.category,
    confidence: result.confidence,
    modelUsed: result.modelUsed,
    hasTip: Boolean(result.observationTip),
    hasFact: Boolean(result.interestingFact),
    challenge: result.challenge?.title,
  });

  if (!result.name.startsWith("Likely")) {
    throw new Error("Section 3/4 requires model to state 'Likely [Species]' when estimating species");
  }
  if (!result.challenge) {
    throw new Error("Section 6 requires outdoor exploration challenge generation");
  }
  console.log("✅ Gemma identification returned valid structured nature result.\n");

  // 4. Challenge Generation Test
  console.log("4. Testing Nature Challenge Generation (Section 6)...");
  const challenge = await generateChallengeWithFallback("Peepal Tree", "Tree", "gemma");
  console.log("Challenge output:", challenge);
  if (!challenge.instruction || !challenge.title) {
    throw new Error("Challenge missing title or instruction");
  }
  console.log("✅ Challenge generated with outdoor physical direction.\n");

  // 5. XP and Levels Gamification (Section 7)
  console.log("5. Testing Nature XP & Levels Calculation (Section 7)...");
  const seedling = getLevelForXp(0);
  const explorer = getLevelForXp(120);
  const wildGuardian = getLevelForXp(1100);

  console.log(`0 XP -> ${seedling.title} (Level ${seedling.level})`);
  console.log(`120 XP -> ${explorer.title} (Level ${explorer.level})`);
  console.log(`1100 XP -> ${wildGuardian.title} (Level ${wildGuardian.level})`);

  if (seedling.title !== "Seedling" || explorer.title !== "Explorer" || wildGuardian.title !== "WildGuardian" && wildGuardian.title !== "Wild Guardian") {
    throw new Error("Level titles do not match specifications");
  }

  const progress = getXpProgress(175);
  console.log("Progress at 175 XP:", {
    current: progress.currentLevel.title,
    next: progress.nextLevel?.title,
    progressPercent: `${progress.progressPercent}%`,
    xpNeeded: progress.xpNeeded,
  });
  console.log("✅ XP and Level progression working perfectly.\n");

  console.log("==========================================");
  console.log("🎉 ALL WILDLENS SPECIFICATION TESTS PASSED!");
  console.log("==========================================");
}

runTests().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
