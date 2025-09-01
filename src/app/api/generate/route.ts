import { NextResponse } from "next/server";
import { openrouter } from "@/lib/openrouter";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    const completion = await openrouter.chat.completions.create({
      model: "anthropic/claude-3-haiku",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });

    return NextResponse.json({
      success: true,
      content: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
