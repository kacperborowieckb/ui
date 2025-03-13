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
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/attribute-hyphenation': ['error', 'never'],
      'vue/v-on-event-hyphenation': ['error', 'never'],
      'vue/attributes-order': ['error', {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'ATTR_SHORTHAND_BOOL',
          'ATTR_STATIC',
          'ATTR_DYNAMIC',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      }],
    },
  },
  typescript: true,
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 2,
      },
    }],
  },
}).prepend(eslintTailwind.configs['flat/recommended'])
