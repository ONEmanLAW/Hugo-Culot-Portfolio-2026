import { apiEndpoint, repositoryName } from "./slicemachine.config.json";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ["@nuxtjs/prismic"],

  prismic: {
    endpoint: apiEndpoint || repositoryName
  },

  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap' }
      ]
    }
  }
})