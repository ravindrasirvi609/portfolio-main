import axios from "axios";

interface TrackingData {
  sessionId: string;
  url: string;
  duration: number;
  scrollDepth: number;
  interactionCount: number;
  isExit: boolean;
}

let scrollDepth = 0;
let interactionCount = 0;
let sessionStartTime = Date.now();
let currentPageUrl = "";
let trackingInterval: NodeJS.Timer;

export const startTracking = (sessionId: string) => {
  currentPageUrl = window.location.href;

  const handleScroll = () => {
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    scrollDepth = Math.round((scrollPosition / docHeight) * 100);
  };

  const handleInteraction = () => {
    interactionCount++;
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      sendTrackingData(sessionId, true);
    }
  };

  // Track scroll depth
  window.addEventListener("scroll", handleScroll);

  // Track user interactions
  window.addEventListener("click", handleInteraction);

  // Track page visibility
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Send tracking data periodically
  trackingInterval = setInterval(() => {
    sendTrackingData(sessionId);
  }, 30000); // Every 30 seconds

  // Cleanup function
  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("click", handleInteraction);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    clearInterval(trackingInterval as NodeJS.Timeout);
  };
};

const sendTrackingData = async (sessionId: string, isExit = false) => {
  try {
    const trackingData: TrackingData = {
      sessionId,
      url: currentPageUrl,
      duration: (Date.now() - sessionStartTime) / 1000,
      scrollDepth,
      interactionCount,
      isExit,
    };

    await axios.post("/api/trackVisitor", trackingData);
  } catch (error) {
    console.error("Failed to send tracking data:", error);
    // Optionally, store failed requests in localStorage for retry
    storeFailedRequest(sessionId, isExit);
  }
};

const storeFailedRequest = (sessionId: string, isExit: boolean) => {
  const failedRequests = JSON.parse(
    localStorage.getItem("failedTrackingRequests") || "[]"
  );
  failedRequests.push({
    sessionId,
    url: currentPageUrl,
    duration: (Date.now() - sessionStartTime) / 1000,
    scrollDepth,
    interactionCount,
    isExit,
    timestamp: Date.now(),
  });
  localStorage.setItem(
    "failedTrackingRequests",
    JSON.stringify(failedRequests)
  );
};

// Export cleanup function for external use
export const stopTracking = () => {
  if (typeof trackingInterval !== "undefined") {
    clearInterval(trackingInterval as NodeJS.Timeout);
  }
};
