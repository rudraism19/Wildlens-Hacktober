import { NextRequest, NextResponse } from "next/server";
import { AnalyzeRequestSchema } from "@/lib/validation/schema";
import { identifyNatureWithFallback } from "@/lib/ai/provider";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = AnalyzeRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Invalid request payload",
          details: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { image, provider, context } = parseResult.data;

    // Run nature identification via Gemma/Gemini provider abstraction
    const identification = await identifyNatureWithFallback(
      image,
      provider,
      context
    );

    return NextResponse.json(identification);
  } catch (error: any) {
    console.error("API /api/analyze error:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to analyze image",
      },
      { status: 500 }
    );
  }
}
