import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,
  vue: { overrides: { 'vue/block-order': ['error', {
    order: [['script', 'template'], 'style'],
  }] } },
  typescript: true,
})
