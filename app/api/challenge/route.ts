import { NextRequest, NextResponse } from "next/server";
import { ChallengeRequestSchema } from "@/lib/validation/schema";
import { generateChallengeWithFallback } from "@/lib/ai/provider";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = ChallengeRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          details: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { speciesName, category, provider } = parseResult.data;

    const challenge = await generateChallengeWithFallback(
      speciesName,
      category,
      provider
    );

    return NextResponse.json(challenge);
  } catch (error: any) {
    console.error("API /api/challenge error:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to generate nature challenge",
      },
      { status: 500 }
    );
  }
}
