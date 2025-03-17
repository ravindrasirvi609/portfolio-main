import { UAParser } from "ua-parser-js";

interface DeviceInfo {
  userAgent: string;
  browser: string;
  browserVersion: string;
  operatingSystem: string;
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
}

interface ScreenInfo {
  screenResolution: string;
  windowSize: string;
  colorDepth: number;
  pixelRatio: number;
  touchSupport: boolean;
}

interface NetworkInfo {
  networkType: string;
  connectionSpeed: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

interface BatteryInfo {
  batteryLevel: number | null;
  charging: boolean | null;
  chargingTime: number | null;
  dischargingTime: number | null;
}

const getDeviceType = (userAgent: string): string => {
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
    return "Tablet";
  }
  if (
    /mobile|iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(
      userAgent
    )
  ) {
    return "Mobile";
  }
  return "Desktop";
};

// Create a new UAParser instance the correct way
export const getDeviceInfo = (userAgent: string): DeviceInfo => {
  try {
    // Create a new UAParser instance with the new keyword
    const parser = new UAParser(userAgent);

    // Get the parsed results
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();

    return {
      userAgent,
      browser: browser.name || "Unknown",
      browserVersion: browser.version || "Unknown",
      operatingSystem: os.name || "Unknown",
      deviceType: getDeviceType(userAgent),
      deviceBrand: device.vendor || "Unknown",
      deviceModel: device.model || "Unknown",
    };
  } catch (error) {
    console.error("Error parsing user agent:", error);
    return {
      userAgent,
      browser: "Unknown",
      browserVersion: "Unknown",
      operatingSystem: "Unknown",
      deviceType: "Unknown",
      deviceBrand: "Unknown",
      deviceModel: "Unknown",
    };
  }
};

export const getScreenInfo = (): ScreenInfo => {
  if (typeof window === "undefined") {
    return {
      screenResolution: "Unknown",
      windowSize: "Unknown",
      colorDepth: 0,
      pixelRatio: 1,
      touchSupport: false,
    };
  }

  try {
    return {
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      windowSize: `${window.innerWidth}x${window.innerHeight}`,
      colorDepth: window.screen.colorDepth || 0,
      pixelRatio: window.devicePixelRatio || 1,
      touchSupport: "ontouchstart" in window || navigator.maxTouchPoints > 0,
    };
  } catch (error) {
    console.error("Error getting screen info:", error);
    return {
      screenResolution: "Unknown",
      windowSize: "Unknown",
      colorDepth: 0,
      pixelRatio: 1,
      touchSupport: false,
    };
  }
};

export const getNetworkInfo = async (): Promise<NetworkInfo> => {
  if (typeof navigator === "undefined") {
    return {
      networkType: "Unknown",
      connectionSpeed: "Unknown",
    };
  }

  try {
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    return {
      networkType: connection?.type || "Unknown",
      connectionSpeed: connection?.effectiveType || "Unknown",
      downlink: connection?.downlink,
      rtt: connection?.rtt,
      saveData: connection?.saveData,
    };
  } catch (error) {
    console.error("Error getting network info:", error);
    return {
      networkType: "Unknown",
      connectionSpeed: "Unknown",
    };
  }
};

export const getBatteryInfo = async (): Promise<BatteryInfo> => {
  if (typeof navigator === "undefined" || !("getBattery" in navigator)) {
    return {
      batteryLevel: null,
      charging: null,
      chargingTime: null,
      dischargingTime: null,
    };
  }

  try {
    const battery = await (navigator as any).getBattery();

    return {
      batteryLevel: battery?.level ? battery.level * 100 : null,
      charging: battery?.charging || null,
      chargingTime: battery?.chargingTime || null,
      dischargingTime: battery?.dischargingTime || null,
    };
  } catch (error) {
    console.error("Battery API error:", error);
    return {
      batteryLevel: null,
      charging: null,
      chargingTime: null,
      dischargingTime: null,
    };
  }
};
