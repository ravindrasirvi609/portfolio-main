import { NextResponse } from "next/server";
import SiteVisitorModel from "@/model/siteVisitorModel";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: Request) {
  try {
    await connect();

    const data = await request.json();
    console.log("Tracking data received:", JSON.stringify(data, null, 2));

    const { sessionId, url, duration, scrollDepth, interactionCount, isExit } =
      data;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Update the visitor document with new page visit and interaction data
    const updateData: any = {
      $push: {
        visitedPages: {
          url,
          duration,
          scrollDepth,
          interactionCount,
          timestamp: new Date(),
        },
      },
      $inc: { pageViews: 1 },
      $set: {
        updatedAt: new Date(),
      },
    };

    // If this is an exit page, update the exitPage field
    if (isExit) {
      updateData.$set.exitPage = url;
    }

    // Calculate session duration if available
    if (duration) {
      updateData.$set.sessionDuration = duration;
    }

    const updatedVisitor = await SiteVisitorModel.findOneAndUpdate(
      { sessionId },
      updateData,
      { new: true }
    );

    if (!updatedVisitor) {
      console.error("Visitor session not found:", sessionId);
      return NextResponse.json(
        { error: "Visitor session not found" },
        { status: 404 }
      );
    }

    console.log(
      "Visitor tracking updated successfully for session:",
      sessionId
    );
    return NextResponse.json({
      success: true,
      message: "Visitor tracking data updated",
      visitor: updatedVisitor,
    });
  } catch (error: any) {
    console.error("Error tracking visitor:", error);
    return NextResponse.json(
      {
        error: "Failed to track visitor data",
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
