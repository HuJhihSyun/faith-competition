import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  modules: ['nuxt-svgo-loader'],
  vite: {
    plugins: [tailwindcss()]
  },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/evangelism777/' : '/',
    buildAssetsDir: '/static/',

    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'https://www.loveandword.tw/resource/images/favicon.ico' }]
    }
  }
})
