export const getPerformanceMetrics = async () => {
  try {
    const navigationEntries = performance.getEntriesByType("navigation");
    if (!navigationEntries || navigationEntries.length === 0) {
      return {
        pageLoadTime: null,
        domLoadTime: null,
        firstContentfulPaint: null,
        largestContentfulPaint: null,
      };
    }

    const navigation = navigationEntries[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType("paint");
    const fcpEntry = paint.find(
      (entry) => entry.name === "first-contentful-paint"
    );

    return {
      pageLoadTime: navigation.loadEventEnd - navigation.startTime,
      domLoadTime: navigation.domContentLoadedEventEnd - navigation.startTime,
      firstContentfulPaint: fcpEntry?.startTime || null,
      largestContentfulPaint: await getLCP(),
    };
  } catch (error) {
    console.error("Error getting performance metrics:", error);
    return {
      pageLoadTime: null,
      domLoadTime: null,
      firstContentfulPaint: null,
      largestContentfulPaint: null,
    };
  }
};

const getLCP = async () => {
  try {
    return new Promise<number | null>((resolve) => {
      // Set a timeout to resolve with null after 3 seconds
      const timeout = setTimeout(() => resolve(null), 3000);

      if (!PerformanceObserver) {
        clearTimeout(timeout);
        resolve(null);
        return;
      }

      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          const lastEntry = entries[entries.length - 1];
          clearTimeout(timeout);
          resolve(lastEntry.startTime);
        }
      }).observe({ entryTypes: ["largest-contentful-paint"] });
    });
  } catch (error) {
    console.error("Error measuring LCP:", error);
    return null;
  }
};
