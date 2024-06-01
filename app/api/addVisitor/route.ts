import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import VisitorModel from "../../../model/visitorModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const { latitude, longitude } = await req.json();
    const visitor = new VisitorModel({ latitude, longitude });
    await visitor.save();
    return NextResponse.json("Visitor added successfully");
  } catch (error: any) {
    console.error(error);
  }
}
