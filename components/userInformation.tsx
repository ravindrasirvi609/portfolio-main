// CaptureVisitor.tsx
"use client";

import { useEffect } from "react";
import axios from "axios";

import { getPerformanceMetrics } from "./performanceMetrics";
import {
  startTracking,
  stopTracking,
  retryFailedRequests,
} from "@/utils/visitorTracking";
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
  country: string | null;
  city: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  isp: string | null;

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

  // Marketing Data
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;

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

const getUTMParameters = (): {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
} => {
  if (typeof window === "undefined") {
    return {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmTerm: null,
      utmContent: null,
    };
  }

  const urlParams = new URLSearchParams(window.location.search);

  return {
    utmSource: urlParams.get("utm_source"),
    utmMedium: urlParams.get("utm_medium"),
    utmCampaign: urlParams.get("utm_campaign"),
    utmTerm: urlParams.get("utm_term"),
    utmContent: urlParams.get("utm_content"),
  };
};

const getLocationData = async (): Promise<{
  country: string | null;
  city: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  isp: string | null;
}> => {
  try {
    // Try to get location from browser geolocation API
    if (navigator.geolocation) {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            maximumAge: 0,
          });
        }
      );

      return {
        country: null, // We don't get country from geolocation API
        city: null,
        region: null,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        isp: null,
      };
    }
  } catch (error) {
    console.error("Error getting geolocation:", error);
  }

  return {
    country: null,
    city: null,
    region: null,
    latitude: null,
    longitude: null,
    isp: null,
  };
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
      const utmParams = getUTMParameters();
      const locationData = await getLocationData();

      const visitorData: VisitorData = {
        ...deviceInfo,
        ...screenInfo,
        ...networkInfo,
        ...performanceInfo,
        ...locationData,
        ...utmParams,
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
        language:
          navigator.language || (navigator.languages && navigator.languages[0]),
      };

      return visitorData;
    };

    const sendVisitorData = async () => {
      try {
        // Try to retry any failed tracking requests from previous sessions
        await retryFailedRequests();

        const visitorData = await collectVisitorData();
        console.log("Sending visitor data:", visitorData);
        const response = await axios.post("/api/userInformation", visitorData);
        console.log("Visitor data response:", response.data);

        if (response.data.success && visitorData.sessionId) {
          startTracking(visitorData.sessionId);
        } else {
          console.error(
            "Failed to start tracking: Invalid response or missing sessionId"
          );
        }
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
