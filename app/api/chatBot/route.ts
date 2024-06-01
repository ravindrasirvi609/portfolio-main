import { connect } from "@/dbConfig/dbConfig";
import Prompt from "@/model/promtModel";
import { NextRequest, NextResponse } from "next/server";

connect();

async function savedToDb(input: string, text: string) {
  try {
    await Prompt.create({ prompt: input, output: text });
  } catch (error) {
    console.error("Error saving to database:", error);
    throw new Error("Error saving to database");
  }
}

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in the environment variables");
    }

    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = input;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    await savedToDb(input, text);

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("Error in generateContentFromPrompt:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
