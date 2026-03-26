export default defineNuxtPlugin((nuxtApp) => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  const resetScroll = () => {
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    });
  };

  resetScroll();

  nuxtApp.hook("page:finish", () => {
    resetScroll();
  });
});