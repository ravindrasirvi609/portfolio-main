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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisitors = async () => {
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

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Visitor List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">IP Address</th>
              <th className="py-3 px-6 text-left">User Agent</th>
              <th className="py-3 px-6 text-left">Browser</th>
              <th className="py-3 px-6 text-left">Operating System</th>
              <th className="py-3 px-6 text-left">Device Type</th>
              <th className="py-3 px-6 text-left">Screen Resolution</th>
              <th className="py-3 px-6 text-left">Referrer</th>
              <th className="py-3 px-6 text-left">Language</th>
              <th className="py-3 px-6 text-left">Session ID</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-left">Updated At</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {visitors.map((visitor) => (
              <tr
                key={visitor._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{visitor._id}</td>
                <td className="py-3 px-6">{visitor.ipAddress}</td>
                <td className="py-3 px-6">{visitor.userAgent}</td>
                <td className="py-3 px-6">{visitor.browser}</td>
                <td className="py-3 px-6">{visitor.operatingSystem}</td>
                <td className="py-3 px-6">{visitor.deviceType}</td>
                <td className="py-3 px-6">{visitor.screenResolution}</td>
                <td className="py-3 px-6">{visitor.referrer}</td>
                <td className="py-3 px-6">{visitor.language}</td>
                <td className="py-3 px-6">{visitor.sessionId}</td>
                <td className="py-3 px-6">
                  {new Date(visitor.createdAt).toLocaleString()}
                </td>
                <td className="py-3 px-6">
                  {new Date(visitor.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorList;
