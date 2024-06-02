"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const VisitorData = () => {
  const [visitorList, setVisitorList] = useState<
    {
      latitude: number;
      longitude: number;
      location?: string;
      createdAt: string;
      _id: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/visitorList");

        const visitorsWithLocation = await Promise.all(
          response.data.visitorList.map(async (visitor: any) => {
            try {
              const locationResponse = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${visitor.latitude}+${visitor.longitude}&key=8a3f5e0784a942f0bfc8b2b2712261bc`
              );

              return {
                ...visitor,
                location:
                  locationResponse.data.results[0]?.formatted ||
                  "Unknown location",
              };
            } catch (locationError) {
              console.error("Error fetching location data:", locationError);
              return { ...visitor, location: "Error fetching location" };
            }
          })
        );

        setVisitorList(visitorsWithLocation);
      } catch (error) {
        console.error("Error fetching visitor list:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Visitor List
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-blue-500 text-black">
              <th className="p-4 text-left border-r border-gray-200">
                Latitude
              </th>
              <th className="p-4 text-left border-r border-gray-200">
                Longitude
              </th>
              <th className="p-4 text-left border-r border-gray-200">
                Location
              </th>
              <th className="p-4 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {visitorList.map((visitor) => (
              <tr
                key={visitor._id}
                className="odd:bg-gray-100 text-black even:bg-gray-50"
              >
                <td className="p-4 border-r border-gray-200">
                  {visitor.latitude}
                </td>
                <td className="p-4 border-r border-gray-200">
                  {visitor.longitude}
                </td>
                <td className="p-4 border-r border-gray-200">
                  {visitor.location ? visitor.location : "Loading location..."}
                </td>
                <td className="p-4">
                  {new Date(visitor.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisitorData;
