/// <reference types="vitest" />

import Vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    Vue(),
    Dts({
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      formats: ['es'],
      name: 'kacperborowiec/ui',
      fileName: (_, name) => `${name}.mjs`,
      cssFileName: 'base',
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        resolver: resolve(__dirname, 'src/resolver.ts'),
        nuxt: resolve(__dirname, 'src/nuxt.ts'),
      },
    },
    rollupOptions: {
      external: ['vue', '@nuxt/kit', '@tailwindcss/vite'],
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
