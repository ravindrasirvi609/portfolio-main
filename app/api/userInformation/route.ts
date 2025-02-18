import { NextResponse } from "next/server";
import SiteVisitorModel from "@/model/siteVisitorModel";
import { connect } from "@/dbConfig/dbConfig";

export async function POST(request: Request) {
  try {
    // Connect to database
    await connect();

    // Get visitor data from request
    const visitorData = await request.json();

    // Create new visitor document
    const visitor = await SiteVisitorModel.create({
      // Basic Information
      ipAddress:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip"),
      userAgent: visitorData.userAgent,
      browser: visitorData.browser,
      browserVersion: visitorData.browserVersion,
      operatingSystem: visitorData.operatingSystem,
      deviceType: visitorData.deviceType,
      deviceBrand: visitorData.deviceBrand,
      deviceModel: visitorData.deviceModel,
      screenResolution: visitorData.screenResolution,
      referrer: visitorData.referrer,
      language: visitorData.language,
      sessionId: visitorData.sessionId,

      // Enhanced Device Information
      colorDepth: visitorData.colorDepth,
      windowSize: visitorData.windowSize,
      touchSupport: visitorData.touchSupport,
      cookiesEnabled: visitorData.cookiesEnabled,
      doNotTrack: visitorData.doNotTrack,
      networkType: visitorData.networkType,
      connectionSpeed: visitorData.connectionSpeed,
      batteryLevel: visitorData.batteryLevel,
      memoryUsage: visitorData.memoryUsage,

      // Location & Time
      timezone: visitorData.timezone,

      // Performance Metrics
      pageLoadTime: visitorData.pageLoadTime,
      domLoadTime: visitorData.domLoadTime,
      firstContentfulPaint: visitorData.firstContentfulPaint,
      largestContentfulPaint: visitorData.largestContentfulPaint,

      // User Preferences
      colorScheme: visitorData.colorScheme,
      fontSize: visitorData.fontSize,
      accessibility: visitorData.accessibility,

      // Session Information
      firstVisit: visitorData.firstVisit,
      returningVisitor: visitorData.returningVisitor,

      // Initialize visit tracking
      pageViews: 1,
      visitedPages: [
        {
          url: visitorData.referrer || "/",
          timestamp: new Date(),
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Visitor data captured successfully",
      visitor,
    });
  } catch (error: any) {
    console.error("Error capturing visitor data:", error);
    return NextResponse.json(
      { error: "Failed to capture visitor data" },
      { status: 500 }
    );
  }
}
