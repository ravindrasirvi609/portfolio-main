import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import SiteVisitorModel from "@/model/siteVisitorModel";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = -1,
      filters = {},
    } = await req.json();

    // Build query based on filters
    const query: any = {};

    if (filters.browser) {
      query.browser = { $regex: filters.browser, $options: "i" };
    }

    if (filters.deviceType) {
      query.deviceType = { $regex: filters.deviceType, $options: "i" };
    }

    if (filters.country) {
      query.country = { $regex: filters.country, $options: "i" };
    }

    if (filters.dateRange && filters.dateRange.start && filters.dateRange.end) {
      query.createdAt = {
        $gte: new Date(filters.dateRange.start),
        $lte: new Date(filters.dateRange.end),
      };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await SiteVisitorModel.countDocuments(query);

    // Get visitors with pagination and sorting
    const visitors = await SiteVisitorModel.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    // Calculate summary statistics
    const uniqueDeviceTypes = await SiteVisitorModel.distinct("deviceType");
    const uniqueBrowsers = await SiteVisitorModel.distinct("browser");
    const totalVisitors = await SiteVisitorModel.countDocuments();

    // Get recent visitors
    const recentVisitors = await SiteVisitorModel.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json({
      success: true,
      visitors,
      pagination: {
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
        currentPage: page,
        limit,
      },
      stats: {
        totalVisitors,
        uniqueDeviceTypes,
        uniqueBrowsers,
        recentVisitors,
      },
    });
  } catch (error: any) {
    console.error("Error fetching visitor data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch visitor data",
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
