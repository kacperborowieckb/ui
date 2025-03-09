<template>
  <div
    :class="chipVariants({ variant })"
  >
    <span class="py-[3px] leading-none">
      {{ content }}
    </span>
    <button class="cursor-pointer" @click="handleChipRemoval">
      <Cross2Icon />
    </button>
  </div>
</template>

<script lang="ts">
import { Cross2Icon } from '@radix-icons/vue'
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'

const chipVariants = tv({
  base: 'flex items-center gap-1 rounded-sm border px-2 transition-colors',
  variants: {
    variant: {
      default: 'bg-muted text-secondary-foreground hover:bg-input/75 border-input',
      error: 'bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20',
    },
  },
})

type ChipVariants = VariantProps<typeof chipVariants>

export interface ChipProps {
  content: string
  variant?: ChipVariants['variant']
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
