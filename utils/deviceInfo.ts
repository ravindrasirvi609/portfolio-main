// deviceInfo.ts
import UAParser from "ua-parser-js";

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

export const getDeviceInfo = (userAgent: string): DeviceInfo => {
  // Create a new UAParser instance the correct way
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

  return {
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    windowSize: `${window.innerWidth}x${window.innerHeight}`,
    colorDepth: window.screen.colorDepth,
    pixelRatio: window.devicePixelRatio,
    touchSupport: "ontouchstart" in window || navigator.maxTouchPoints > 0,
  };
};

export const getNetworkInfo = async (): Promise<NetworkInfo> => {
  if (typeof navigator === "undefined") {
    return {
      networkType: "Unknown",
      connectionSpeed: "Unknown",
    };
  }

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
      batteryLevel: battery.level * 100,
      charging: battery.charging,
      chargingTime: battery.chargingTime,
      dischargingTime: battery.dischargingTime,
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
