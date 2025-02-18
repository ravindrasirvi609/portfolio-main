export const getPerformanceMetrics = async () => {
  const navigation = performance.getEntriesByType(
    "navigation"
  )[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType("paint");

  return {
    pageLoadTime: navigation.loadEventEnd - navigation.startTime,
    domLoadTime: navigation.domContentLoadedEventEnd - navigation.startTime,
    firstContentfulPaint:
      paint.find((entry) => entry.name === "first-contentful-paint")
        ?.startTime || 0,
    largestContentfulPaint: await getLCP(),
  };
};

const getLCP = async () => {
  return new Promise<number>((resolve) => {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      resolve(lastEntry.startTime);
    }).observe({ entryTypes: ["largest-contentful-paint"] });
  });
};
