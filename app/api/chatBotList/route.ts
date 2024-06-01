import { connect } from "@/dbConfig/dbConfig";
import Prompt from "@/model/promtModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const promptList = await Prompt.find();

    console.log("promptList:", promptList);

    return NextResponse.json({ promptList });
  } catch (error: any) {
    console.error("Error in generateContentFromPrompt:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
