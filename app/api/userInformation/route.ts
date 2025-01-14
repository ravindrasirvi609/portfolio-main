import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import SiteVisitorModel from "../../../model/siteVisitorModel"; // Import the site visitor model

connect();

export async function POST(req: NextRequest) {
  try {
    const visitorDataFromBody = await req.json();

    // Extract the IP address
    const ipAddress = req.headers.get("x-forwarded-for") || req.ip || "Unknown";

    // Combine the extracted IP with the provided data
    const newVisitor = new SiteVisitorModel({
      ...visitorDataFromBody,
      ipAddress,
    });

    await newVisitor.save();

    await newVisitor.save(); // Save the visitor data to the database

    return NextResponse.json({
      message: "Visitor added successfully",
      visitor: newVisitor, // Return the saved visitor data
    });
  } catch (error: any) {
    console.error("Error adding visitor:", error);
    return NextResponse.error(); // Return an error response
  }
}
