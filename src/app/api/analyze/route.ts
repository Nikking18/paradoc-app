import { NextResponse } from "next/server";
import { hf } from "@/lib/huggingface";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    
    // Using a legal analysis model (you can replace with specific legal models)
    const result = await hf.textClassification({
      model: "nlptown/bert-base-multilingual-uncased-sentiment",
      inputs: text,
    });

    return NextResponse.json({
      success: true,
      analysis: result,
    });
  } catch (error) {
    console.error("Legal analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze legal content" },
      { status: 500 }
    );
  }
}
