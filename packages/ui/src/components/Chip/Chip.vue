<template>
  <div
    :tabindex="isFocusable ? 0 : undefined"
    :class="chipVariants({ variant })"
    @keydown.backspace="handleChipRemoval"
  >
    <span class="flex gap-2 py-[3px] leading-none">
      <template v-if="content">
        {{ content }}
      </template>
      <slot />
    </span>
    <button
      v-if="withButton"
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
import { computed } from 'vue'
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
  content?: string
  variant?: ChipVariants['variant']
  focusable?: boolean
  disabled?: boolean
  withButton?: boolean
}

export interface ChipEmits {
  (e: 'chipRemoval'): void
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<ChipProps>(), {
  variant: 'default',
})

const emit = defineEmits<ChipEmits>()

const isFocusable = computed(() => props.focusable && !props.disabled)

function handleChipRemoval() {
  emit('chipRemoval')
}
</script>
