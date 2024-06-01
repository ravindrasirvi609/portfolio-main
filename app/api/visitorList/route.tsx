import { connect } from "@/dbConfig/dbConfig";
import VisitorModel from "../../../model/visitorModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const visitorList = await VisitorModel.find();

    return NextResponse.json({ visitorList });
  } catch (error: any) {
    console.error("Error in generateContentFromPrompt:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
