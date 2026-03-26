export default defineNuxtPlugin((nuxtApp) => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  const getNavigationType = (): PerformanceNavigationTiming["type"] | "navigate" => {
    const entries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    const navigationEntry = entries[0];

    if (navigationEntry) {
      return navigationEntry.type;
    }

    return "navigate";
  };

  const resetScroll = () => {
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
  };

  const navigationType = getNavigationType();
  const currentPath = window.location.pathname;

  if (navigationType === "reload" && currentPath !== "/") {
    window.location.replace("/");
    return;
  }

  resetScroll();

  nuxtApp.hook("page:finish", () => {
    resetScroll();
  });
});