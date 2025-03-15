import { HstVue } from '@histoire/plugin-vue'
import Tailwind from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'histoire'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [HstVue()],

  storyMatch: [
    resolve(__dirname, '../packages/ui/src/**/*.story.vue'),
  ],

  setupFile: resolve(__dirname, 'setup.ts'),

  theme: {
    title: 'Kacper Borowiec - ui',
    // favicon: './public/favicon.ico',
    logo: {
      square: './assets/icon.svg',
      dark: './assets/icon.svg',
      light: './assets/icon.svg',
    },
    colors: {
      gray: {
        700: '#020817',
        750: '#020817',
      },
    },
  },

  vite: {
    plugins: [
      Vue(),
      Tailwind(),
    ],
    server: {
      fs: {
        allow: ['..'],
      },
    },
  },
})
