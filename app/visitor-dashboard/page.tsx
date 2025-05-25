"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  ChevronUp,
  Filter,
  RefreshCw,
  Search,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Clock,
  Users,
  Chrome,
} from "lucide-react";

interface Visitor {
  _id: string;
  ipAddress: string;
  userAgent: string;
  browser: string;
  operatingSystem: string;
  deviceType: string;
  country: string | null;
  city: string | null;
  createdAt: string;
  sessionId: string;
  pageViews: number;
  visitedPages: Array<{
    url: string;
    duration: number;
    timestamp: string;
  }>;
  [key: string]: any;
}

interface PaginationData {
  total: number;
  pages: number;
  currentPage: number;
  limit: number;
}

interface Stats {
  totalVisitors: number;
  uniqueDeviceTypes: string[];
  uniqueBrowsers: string[];
  recentVisitors: Visitor[];
}

const VisitorDashboard: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    pages: 0,
    currentPage: 1,
    limit: 10,
  });
  const [stats, setStats] = useState<Stats>({
    totalVisitors: 0,
    uniqueDeviceTypes: [],
    uniqueBrowsers: [],
    recentVisitors: [],
  });
  const [filters, setFilters] = useState({
    browser: "",
    deviceType: "",
    country: "",
    dateRange: {
      start: "",
      end: "",
    },
  });
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<number>(-1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchVisitors = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/visitorDashboard", {
        page,
        limit: pagination.limit,
        sortBy,
        sortOrder,
        filters,
      });

      if (response.data.success) {
        setVisitors(response.data.visitors);
        setPagination(response.data.pagination);
        setStats(response.data.stats);
      } else {
        setError("Failed to fetch visitor data");
      }
    } catch (err) {
      setError("Error connecting to the server");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, [sortBy, sortOrder, filters]);

  const handlePageChange = (page: number) => {
    fetchVisitors(page);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 1 ? -1 : 1);
    } else {
      setSortBy(column);
      setSortOrder(-1);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDateRangeChange = (key: "start" | "end", value: string) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [key]: value,
      },
    }));
  };

  const resetFilters = () => {
    setFilters({
      browser: "",
      deviceType: "",
      country: "",
      dateRange: {
        start: "",
        end: "",
      },
    });
    setSortBy("createdAt");
    setSortOrder(-1);
    setSearchTerm("");
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType.toLowerCase()) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "tablet":
        return <Tablet className="h-4 w-4" />;
      case "desktop":
        return <Monitor className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  const getBrowserIcon = (browser: string) => {
    const browserLower = browser.toLowerCase();
    if (browserLower.includes("chrome")) {
      return <Chrome className="h-4 w-4" />;
    } else if (browserLower.includes("firefox")) {
      return <Chrome className="h-4 w-4" />; // Using Chrome icon as fallback
    } else if (browserLower.includes("safari")) {
      return <Chrome className="h-4 w-4" />; // Using Chrome icon as fallback
    } else {
      return <Globe className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const filteredVisitors = visitors.filter((visitor) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      visitor.ipAddress?.toLowerCase().includes(searchLower) ||
      visitor.browser?.toLowerCase().includes(searchLower) ||
      visitor.operatingSystem?.toLowerCase().includes(searchLower) ||
      visitor.deviceType?.toLowerCase().includes(searchLower) ||
      visitor.country?.toLowerCase().includes(searchLower) ||
      visitor.city?.toLowerCase().includes(searchLower)
    );
  });

  if (loading && visitors.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading visitor data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Button className="mt-4 w-full" onClick={() => fetchVisitors()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h1>Visitor Dashboard</h1>
    </div>
  );
};

export default VisitorDashboard;
