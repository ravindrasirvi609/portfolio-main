"use client";

import { useEffect } from "react";
import axios from "axios";

interface VisitorData {
  userAgent?: string;
  browser?: string;
  operatingSystem?: string;
  deviceType?: string;
  screenResolution?: string;
  referrer?: string;
  language?: string;
  sessionId?: string;
}

const CaptureVisitor = () => {
  useEffect(() => {
    const collectVisitorData = () => {
      const userAgent = navigator.userAgent;
      const browser = getBrowserName(userAgent);
      const operatingSystem = getOperatingSystem(userAgent);
      const deviceType = getDeviceType(userAgent);
      const screenResolution = `${window.screen.width}x${window.screen.height}`;
      const referrer = document.referrer;
      const language = navigator.language || navigator.languages[0];
      const sessionId = generateSessionId();

      return {
        userAgent,
        browser,
        operatingSystem,
        deviceType,
        screenResolution,
        referrer,
        language,
        sessionId,
      };
    };

    const sendVisitorData = async () => {
      const visitorData: VisitorData = collectVisitorData();

      try {
        await axios.post("/api/userInformation", visitorData);
        console.log("Visitor data successfully sent.");
      } catch (err) {
        console.error("Failed to send visitor data:", err);
      }
    };

    sendVisitorData();
  }, []);

  const generateSessionId = () => {
    return `sess-${Math.random().toString(36).substr(2, 9)}`;
  };

  const getBrowserName = (userAgent: string): string => {
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Edge")) return "Edge";
    if (userAgent.includes("Opera") || userAgent.includes("OPR"))
      return "Opera";
    return "Unknown";
  };

  const getOperatingSystem = (userAgent: string): string => {
    if (userAgent.includes("Win")) return "Windows";
    if (userAgent.includes("Mac")) return "MacOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iOS")) return "iOS";
    return "Unknown";
  };

  const getDeviceType = (userAgent: string): string => {
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry/.test(userAgent)) {
      return "Mobile";
    }
    if (/Tablet|iPad/.test(userAgent)) {
      return "Tablet";
    }
    return "Desktop";
  };

  return null; // No UI needed for this component
};

export default CaptureVisitor;
