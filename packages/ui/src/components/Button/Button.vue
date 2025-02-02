<template>
  <button class="flex bg-red-100 hover:bg-red-200" :class="button({ variant })">
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'

const button = tv({
  base: '',
  variants: {
    variant: {
      solid: '',
      outline: '',
    },
  },
})

type ButtonVariantProps = VariantProps<typeof button>

export interface ButtonProps {
  label?: string
  variant?: ButtonVariantProps['variant']
}
</script>

<script setup lang="ts">
withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
})
</script>
