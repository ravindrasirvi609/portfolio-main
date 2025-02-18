// CaptureVisitor.tsx
"use client";

import { useEffect } from "react";
import axios from "axios";

import { getPerformanceMetrics } from "./performanceMetrics";
import { startTracking, stopTracking } from "@/utils/visitorTracking";
import {
  getBatteryInfo,
  getDeviceInfo,
  getNetworkInfo,
  getScreenInfo,
} from "@/utils/deviceInfo";

interface VisitorData {
  // Basic Information
  userAgent: string;
  browser: string;
  browserVersion: string;
  operatingSystem: string;
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  screenResolution: string;
  windowSize: string;
  colorDepth: number;
  referrer: string;
  language: string;
  sessionId: string;

  // Device Capabilities
  touchSupport: boolean;
  cookiesEnabled: boolean;
  doNotTrack: boolean;
  networkType: string;
  connectionSpeed: string;
  batteryLevel: number | null;
  batteryCharging: boolean | null;
  memoryUsage: number | null;

  // Location & Time
  timezone: string;

  // Performance Metrics
  pageLoadTime: number | null;
  domLoadTime: number | null;
  firstContentfulPaint: number | null;
  largestContentfulPaint: number | null;

  // User Preferences
  colorScheme: string;
  fontSize: string;
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
  };

  // Session Info
  firstVisit: boolean;
  returningVisitor: boolean;
}

const getAccessibilityInfo = () => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const highContrastQuery = window.matchMedia("(forced-colors: active)");

  return {
    colorScheme: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
    fontSize: window.getComputedStyle(document.documentElement).fontSize,
    accessibility: {
      reducedMotion: mediaQuery.matches,
      highContrast: highContrastQuery.matches,
    },
  };
};

const getSessionInfo = async (): Promise<{
  firstVisit: boolean;
  returningVisitor: boolean;
}> => {
  const visitHistory = localStorage.getItem("visitHistory");
  const isFirstVisit = !visitHistory;

  if (isFirstVisit) {
    localStorage.setItem(
      "visitHistory",
      JSON.stringify({
        firstVisit: new Date().toISOString(),
        visits: 1,
      })
    );
  } else {
    const history = JSON.parse(visitHistory!);
    localStorage.setItem(
      "visitHistory",
      JSON.stringify({
        ...history,
        visits: history.visits + 1,
        lastVisit: new Date().toISOString(),
      })
    );
  }

  return {
    firstVisit: isFirstVisit,
    returningVisitor: !isFirstVisit,
  };
};

const generateSessionId = (): string => {
  const timestamp = Date.now();
  const randomNum = Math.random().toString(36).substring(2, 10);
  return `sess_${timestamp}_${randomNum}`;
};

const CaptureVisitor = () => {
  useEffect(() => {
    const collectVisitorData = async (): Promise<VisitorData> => {
      const userAgent = navigator.userAgent;

      // Basic device info
      const deviceInfo = getDeviceInfo(userAgent);
      const screenInfo = getScreenInfo();
      const networkInfo = await getNetworkInfo();
      const performanceInfo = await getPerformanceMetrics();
      const batteryInfo = await getBatteryInfo();
      const accessibilityInfo = getAccessibilityInfo();
      const sessionInfo = await getSessionInfo();

      const visitorData: VisitorData = {
        ...deviceInfo,
        ...screenInfo,
        ...networkInfo,
        ...performanceInfo,
        batteryLevel: batteryInfo.batteryLevel,
        batteryCharging: batteryInfo.charging,
        memoryUsage: (performance as any).memory?.usedJSHeapSize || null,
        cookiesEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack === "1",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...accessibilityInfo,
        ...sessionInfo,
        sessionId: generateSessionId(),
        referrer: document.referrer,
        language: navigator.language || navigator.languages[0],
      };

      return visitorData;
    };

    const sendVisitorData = async () => {
      try {
        const visitorData = await collectVisitorData();
        await axios.post("/api/userInformation", visitorData);
        startTracking(visitorData.sessionId);
      } catch (err) {
        console.error("Failed to send visitor data:", err);
      }
    };

    sendVisitorData(); // Called here when component mounts

    return () => {
      stopTracking();
    };
  }, []); // Empty dependency array means it runs once on mount

  return null;
};

export default CaptureVisitor;
