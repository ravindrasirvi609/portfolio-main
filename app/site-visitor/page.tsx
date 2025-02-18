"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Visitor {
  _id: string;
  ipAddress: string;
  userAgent: string;
  browser: string;
  operatingSystem: string;
  deviceType: string;
  screenResolution: string;
  referrer: string;
  language: string;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
}

const VisitorList: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchVisitors = async (): Promise<void> => {
      try {
        const response = await axios.post("/api/siteVisitorList");
        setVisitors(response.data.visitorList);
      } catch (err) {
        setError("Error fetching visitor data");
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, []);

  const filteredVisitors = visitors.filter((visitor) =>
    Object.values(visitor).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 backdrop-blur-md bg-opacity-80 p-4 rounded-lg shadow-lg">
          <p className="text-red-500 text-center">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="backdrop-blur-md bg-white/30 rounded-xl p-6 shadow-xl border border-white/20">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Visitor Analytics
          </h1>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search visitors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="overflow-x-auto rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="backdrop-blur-md bg-white/40 rounded-lg shadow-xl border border-white/30">
                <table className="min-w-full divide-y divide-gray-200/30">
                  <thead className="bg-gray-50/50">
                    <tr>
                      {Object.keys(visitors[0] || {}).map((key) => (
                        <th
                          key={key}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                        >
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/30 bg-white/20">
                    {filteredVisitors.map((visitor) => (
                      <tr
                        key={visitor._id}
                        className="hover:bg-white/40 transition-colors duration-200"
                      >
                        {Object.entries(visitor).map(([key, value]) => (
                          <td
                            key={key}
                            className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
                          >
                            {key.includes("At")
                              ? new Date(value).toLocaleString()
                              : value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredVisitors.length} of {visitors.length} visitors
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorList;
