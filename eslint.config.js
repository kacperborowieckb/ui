import antfu from '@antfu/eslint-config'
import eslintTailwind from 'eslint-plugin-tailwindcss'

export default antfu({
  stylistic: {
    overrides: {
      'curly': ['off'],
      'perfectionist/sort-imports': ['error', {
        type: 'natural',
        partitionByNewLine: false,
        newlinesBetween: 'always',
        groups: [
          ['builtin', 'external'],
          { newlinesBetween: 'never' },
          ['builtin-type', 'external-type'],
          'internal',
          { newlinesBetween: 'never' },
          'internal-type',
          [
            'index',
            'parent',
            'sibling',
          ],
          { newlinesBetween: 'never' },
          [
            'index-type',
            'parent-type',
            'sibling-type',
            'unknown',
          ],
        ],
      }],
    },
  },
  vue: {
    overrides: {
      'vue/block-order': ['error', {
        order: [['script', 'template'], 'style'],
      }],
    },
  },
  typescript: true,
  rules: {
    'tailwindcss/no-custom-classname': 'off',
  },
}).prepend(eslintTailwind.configs['flat/recommended'])
