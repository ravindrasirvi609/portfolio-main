import { NextResponse } from "next/server";
import SiteVisitorModel from "@/model/siteVisitorModel";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: Request) {
  try {
    await connect();

    const data = await request.json();
    const { sessionId, url, duration, scrollDepth, interactionCount, isExit } =
      data;

    // Update the visitor document with new page visit and interaction data
    const updatedVisitor = await SiteVisitorModel.findOneAndUpdate(
      { sessionId },
      {
        $push: {
          visitedPages: {
            url,
            duration,
            scrollDepth,
            interactionCount,
            timestamp: new Date(),
          },
        },
        ...(isExit && { exitPage: url }),
        $inc: { pageViews: 1 },
        $set: {
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updatedVisitor) {
      return NextResponse.json(
        { error: "Visitor session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Visitor tracking data updated",
      visitor: updatedVisitor,
    });
  } catch (error) {
    console.error("Error tracking visitor:", error);
    return NextResponse.json(
      { error: "Failed to track visitor data" },
      { status: 500 }
    );
  }
}
