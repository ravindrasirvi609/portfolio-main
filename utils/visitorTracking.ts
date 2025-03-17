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
let lastSentTime = Date.now();

export const startTracking = (sessionId: string) => {
  if (!sessionId) {
    console.error("Cannot start tracking: No session ID provided");
    return () => {};
  }

  console.log("Starting visitor tracking for session:", sessionId);
  currentPageUrl = window.location.href;
  sessionStartTime = Date.now();
  scrollDepth = 0;
  interactionCount = 0;
  lastSentTime = Date.now();

  const handleScroll = () => {
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrollPosition = window.scrollY;
      scrollDepth = Math.round((scrollPosition / docHeight) * 100);
    }
  };

  const handleInteraction = () => {
    interactionCount++;
  };

  const handleVisibilityChange = () => {
    if (document.hidden) {
      sendTrackingData(sessionId, true);
    } else {
      // Reset the timer when the page becomes visible again
      lastSentTime = Date.now();
    }
  };

  const handleBeforeUnload = () => {
    // Synchronous tracking on page unload
    try {
      const trackingData: TrackingData = {
        sessionId,
        url: currentPageUrl,
        duration: (Date.now() - sessionStartTime) / 1000,
        scrollDepth,
        interactionCount,
        isExit: true,
      };

      // Use sendBeacon for more reliable data sending on page unload
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(trackingData)], {
          type: "application/json",
        });
        navigator.sendBeacon("/api/trackVisitor", blob);
      } else {
        // Fallback to synchronous XHR
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/trackVisitor", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(trackingData));
      }
    } catch (error) {
      console.error("Failed to send final tracking data:", error);
    }
  };

  // Track scroll depth
  window.addEventListener("scroll", handleScroll);

  // Track user interactions
  window.addEventListener("click", handleInteraction);
  window.addEventListener("keydown", handleInteraction);
  window.addEventListener("touchstart", handleInteraction);

  // Track page visibility
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Track page unload
  window.addEventListener("beforeunload", handleBeforeUnload);

  // Send tracking data periodically
  trackingInterval = setInterval(() => {
    const now = Date.now();
    // Only send data if at least 5 seconds have passed since the last send
    if (now - lastSentTime >= 5000) {
      sendTrackingData(sessionId);
      lastSentTime = now;
    }
  }, 30000); // Every 30 seconds

  // Cleanup function
  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("click", handleInteraction);
    window.removeEventListener("keydown", handleInteraction);
    window.removeEventListener("touchstart", handleInteraction);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("beforeunload", handleBeforeUnload);
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

    console.log("Sending tracking data:", trackingData);
    const response = await axios.post("/api/trackVisitor", trackingData);

    if (response.data.success) {
      console.log("Tracking data sent successfully");
      // Reset interaction count after successful send
      interactionCount = 0;
    } else {
      console.error("Failed to send tracking data:", response.data.error);
      storeFailedRequest(sessionId, isExit);
    }
  } catch (error) {
    console.error("Failed to send tracking data:", error);
    // Store failed requests in localStorage for retry
    storeFailedRequest(sessionId, isExit);
  }
};

const storeFailedRequest = (sessionId: string, isExit: boolean) => {
  try {
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
  } catch (error) {
    console.error("Failed to store failed request:", error);
  }
};

// Function to retry sending failed requests
export const retryFailedRequests = async () => {
  try {
    const failedRequests = JSON.parse(
      localStorage.getItem("failedTrackingRequests") || "[]"
    );

    if (failedRequests.length === 0) return;

    const successfulRetries: number[] = [];

    for (let i = 0; i < failedRequests.length; i++) {
      try {
        const request = failedRequests[i];
        await axios.post("/api/trackVisitor", request);
        successfulRetries.push(i);
      } catch (error) {
        console.error("Failed to retry request:", error);
      }
    }

    // Remove successful retries from the failed requests
    const updatedFailedRequests = failedRequests.filter(
      (_: any, index: number) => !successfulRetries.includes(index)
    );

    localStorage.setItem(
      "failedTrackingRequests",
      JSON.stringify(updatedFailedRequests)
    );
  } catch (error) {
    console.error("Failed to retry failed requests:", error);
  }
};

// Export cleanup function for external use
export const stopTracking = () => {
  if (typeof trackingInterval !== "undefined") {
    clearInterval(trackingInterval as NodeJS.Timeout);
  }
};
