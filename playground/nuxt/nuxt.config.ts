export default defineNuxtConfig({
  modules: ['@kacperborowiec/ui/nuxt'],
  css: ['~/assets/css/main.css'],
  kacperborowiec: {
    prefix: 'K',
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
})
