import type { } from '@nuxt/schema' // Mandatory to avoid a bug when building
import { addComponent, addVitePlugin, defineNuxtModule } from '@nuxt/kit'

import { components } from './components'

export interface ModuleOptions {
  prefix: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@kacperborowiec/ui',
    configKey: 'kacperborowiec',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    prefix: '',
  },
  async setup(options, nuxt) {
    if (nuxt.options.builder === '@nuxt/vite-builder') {
      const Tailwind = await import('@tailwindcss/vite').then(r => r.default)
      addVitePlugin(Tailwind())
    }
    else {
      nuxt.options.postcss.plugins['@tailwindcss/postcss'] = {}
    }

    for (const component of components) {
      addComponent({
        name: `${options.prefix}${component}`,
        export: component,
        filePath: '@kacperborowiec/ui',
      })
    }
  },
})
