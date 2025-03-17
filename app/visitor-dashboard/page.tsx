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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Visitor Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Track and analyze your website visitors
            </p>
          </div>
          <Button
            onClick={() => fetchVisitors()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-primary mr-2" />
                <div className="text-2xl font-bold">{stats.totalVisitors}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Device Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {stats.uniqueDeviceTypes.map((type) => (
                  <Badge
                    key={type}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    {getDeviceIcon(type)}
                    {type}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Browsers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {stats.uniqueBrowsers.slice(0, 3).map((browser) => (
                  <Badge
                    key={browser}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    {getBrowserIcon(browser)}
                    {browser}
                  </Badge>
                ))}
                {stats.uniqueBrowsers.length > 3 && (
                  <Badge variant="outline">
                    +{stats.uniqueBrowsers.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="space-y-1">
                {stats.recentVisitors.slice(0, 3).map((visitor) => (
                  <div key={visitor._id} className="flex items-center gap-2">
                    {getDeviceIcon(visitor.deviceType)}
                    <span className="truncate">
                      {visitor.browser} / {visitor.deviceType}
                    </span>
                    <span className="text-gray-400 text-xs ml-auto">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {new Date(visitor.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Browser
                </label>
                <Select
                  value={filters.browser}
                  onValueChange={(value) =>
                    handleFilterChange("browser", value === "all" ? "" : value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Browsers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Browsers</SelectItem>
                    {stats.uniqueBrowsers.map((browser) => (
                      <SelectItem key={browser} value={browser}>
                        {browser}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Device Type
                </label>
                <Select
                  value={filters.deviceType}
                  onValueChange={(value) =>
                    handleFilterChange(
                      "deviceType",
                      value === "all" ? "" : value
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Devices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Devices</SelectItem>
                    {stats.uniqueDeviceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  From Date
                </label>
                <Input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) =>
                    handleDateRangeChange("start", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  To Date
                </label>
                <Input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleDateRangeChange("end", e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search visitors..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Visitors Table */}
        <Card>
          <CardHeader>
            <CardTitle>Visitor Data</CardTitle>
            <CardDescription>
              Showing {filteredVisitors.length} of {pagination.total} visitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("createdAt")}
                      >
                        <div className="flex items-center gap-1">
                          Date/Time
                          {sortBy === "createdAt" &&
                            (sortOrder === -1 ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronUp className="h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("browser")}
                      >
                        <div className="flex items-center gap-1">
                          Browser
                          {sortBy === "browser" &&
                            (sortOrder === -1 ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronUp className="h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("deviceType")}
                      >
                        <div className="flex items-center gap-1">
                          Device
                          {sortBy === "deviceType" &&
                            (sortOrder === -1 ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronUp className="h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("operatingSystem")}
                      >
                        <div className="flex items-center gap-1">
                          OS
                          {sortBy === "operatingSystem" &&
                            (sortOrder === -1 ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronUp className="h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => handleSort("pageViews")}
                      >
                        <div className="flex items-center gap-1">
                          Page Views
                          {sortBy === "pageViews" &&
                            (sortOrder === -1 ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronUp className="h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVisitors.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-8 text-gray-500"
                        >
                          No visitors found matching your criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredVisitors.map((visitor) => (
                        <TableRow key={visitor._id}>
                          <TableCell className="font-medium">
                            {formatDate(visitor.createdAt)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getBrowserIcon(visitor.browser)}
                              <span>{visitor.browser}</span>
                              {visitor.browserVersion && (
                                <span className="text-xs text-gray-500">
                                  {visitor.browserVersion}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getDeviceIcon(visitor.deviceType)}
                              <span>{visitor.deviceType}</span>
                            </div>
                          </TableCell>
                          <TableCell>{visitor.operatingSystem}</TableCell>
                          <TableCell>
                            {visitor.country || visitor.city ? (
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                <span>
                                  {[visitor.city, visitor.country]
                                    .filter(Boolean)
                                    .join(", ")}
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-500">Unknown</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge>{visitor.pageViews || 0}</Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Details
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="w-[300px]"
                              >
                                <div className="p-2">
                                  <h3 className="font-medium mb-2">
                                    Visitor Details
                                  </h3>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">
                                        Session ID:
                                      </span>
                                      <span className="font-mono text-xs truncate max-w-[180px]">
                                        {visitor.sessionId}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">
                                        IP Address:
                                      </span>
                                      <span>
                                        {visitor.ipAddress || "Unknown"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">
                                        Screen:
                                      </span>
                                      <span>
                                        {visitor.screenResolution || "Unknown"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">
                                        Language:
                                      </span>
                                      <span>
                                        {visitor.language || "Unknown"}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">
                                        Referrer:
                                      </span>
                                      <span className="truncate max-w-[180px]">
                                        {visitor.referrer || "Direct"}
                                      </span>
                                    </div>
                                  </div>

                                  {visitor.visitedPages &&
                                    visitor.visitedPages.length > 0 && (
                                      <div className="mt-4">
                                        <h4 className="font-medium mb-1">
                                          Pages Visited
                                        </h4>
                                        <div className="max-h-[150px] overflow-y-auto space-y-1 text-sm">
                                          {visitor.visitedPages.map(
                                            (page, index) => (
                                              <div
                                                key={index}
                                                className="flex justify-between"
                                              >
                                                <span className="truncate max-w-[180px]">
                                                  {page.url}
                                                </span>
                                                <span className="text-gray-500">
                                                  {formatDate(page.timestamp)}
                                                </span>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          handlePageChange(
                            Math.max(1, pagination.currentPage - 1)
                          )
                        }
                        className={
                          pagination.currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {Array.from(
                      { length: Math.min(5, pagination.pages) },
                      (_, i) => {
                        // Show pages around current page
                        let pageNum;
                        if (pagination.pages <= 5) {
                          pageNum = i + 1;
                        } else if (pagination.currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (
                          pagination.currentPage >=
                          pagination.pages - 2
                        ) {
                          pageNum = pagination.pages - 4 + i;
                        } else {
                          pageNum = pagination.currentPage - 2 + i;
                        }

                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              onClick={() => handlePageChange(pageNum)}
                              isActive={pagination.currentPage === pageNum}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          handlePageChange(
                            Math.min(
                              pagination.pages,
                              pagination.currentPage + 1
                            )
                          )
                        }
                        className={
                          pagination.currentPage === pagination.pages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VisitorDashboard;
