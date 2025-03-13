<template>
  <div
    :tabindex="focusable ? 0 : undefined"
    :class="chipVariants({ variant })"
    @keydown.backspace="handleChipRemoval"
  >
    <span class="py-[3px] leading-none">
      {{ content }}
    </span>
    <button
      tabindex="-1"
      class="cursor-pointer"
      @click="handleChipRemoval"
    >
      <Cross2Icon />
    </button>
  </div>
</template>

<script lang="ts">
import { Cross2Icon } from '@radix-icons/vue'
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'

const chipVariants = tv({
  base: 'focus-visible:ring-offset-background focus-visible:ring-ring flex items-center gap-1 rounded-sm border px-2 transition-colors focus-visible:outline-none focus-visible:ring-2 ',
  variants: {
    variant: {
      default: 'bg-muted dark:bg-muted/80 dark:hover:bg-input text-secondary-foreground hover:bg-input/75 border-input',
      error: 'bg-destructive/10 border-destructive/20 text-destructive hover:bg-destructive/20 dark:brightness-150',
    },
  },
})

type ChipVariants = VariantProps<typeof chipVariants>

export interface ChipProps {
  content: string
  variant?: ChipVariants['variant']
  focusable?: boolean
}

export interface ChipEmits {
  (e: 'chipRemoval'): void
}
</script>

<script setup lang="ts">
withDefaults(defineProps<ChipProps>(), {
  variant: 'default',
})

const emit = defineEmits<ChipEmits>()

function handleChipRemoval() {
  emit('chipRemoval')
}
</script>
