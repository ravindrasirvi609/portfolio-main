import { connect } from "@/dbConfig/dbConfig";
import SiteVisitorModel from "../../../model/siteVisitorModel"; // Import the site visitor model
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const visitorList = await SiteVisitorModel.find(); // Fetch all visitors from the database

    return NextResponse.json({ visitorList }); // Return the list of visitors
  } catch (error: any) {
    console.error("Error fetching visitor list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    ); // Return an error response
  }
}
