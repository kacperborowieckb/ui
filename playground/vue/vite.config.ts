import UiResolver from '@kacperborowiec/ui/resolver'
import TailwindCss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    Vue(),
    TailwindCss(),
    Components({
      dts: true,
      resolvers: [
        UiResolver({
          prefix: 'K',
        }),
      ],
    }),
  ],
})
