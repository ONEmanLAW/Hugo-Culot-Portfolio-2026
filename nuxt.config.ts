import { repositoryName } from "./slicemachine.config.json";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  css: [
    "~/assets/variables.css",
    "lenis/dist/lenis.css"
  ],

  devtools: { enabled: true },
  modules: ["@nuxtjs/prismic"],

  prismic: {
    endpoint: repositoryName
  },

  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        }
      ]
    }
  }
});