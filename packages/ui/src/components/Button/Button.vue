<template>
  <button ref="buttonTemplateRef" :class="buttonVariants({ variant })">
    <component :is="buttonContentWrapper" v-bind="buttonContentWrapperProps">
      <span :key="Math.random()" class="flex items-center justify-center gap-2">
        <slot />
      </span>
    </component>
  </button>
</template>

<script lang="ts">
import { tv } from 'tailwind-variants'
import { onMounted, Transition, useTemplateRef } from 'vue'
import type { VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'focus-visible:ring-offset-background focus-visible:ring-ring min-w-(--button-width) min-h-(--button-height) relative inline-flex max-w-fit cursor-pointer items-center justify-center overflow-hidden rounded-md px-4 py-1 ring-offset-1 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-75',
  variants: {
    variant: {
      solid: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/85 active:text-primary-foreground/95',
      gradient: 'bg-linear-[170deg] from-primary/85 to-primary hover:from-primary/80 hover:to-primary active:from-primary/75 active:to-primary/95 text-primary-foreground active:text-primary-foreground/95',
      outline: 'border-input text-foreground hover:bg-accent/75 hover:text-accent-foreground active:bg-accent active:text-accent-foreground/80 border',
    },
  },
})

type ButtonVariantProps = VariantProps<typeof buttonVariants>

export interface ButtonProps {
  variant?: ButtonVariantProps['variant']
  animated?: boolean
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
})

const buttonRef = useTemplateRef('buttonTemplateRef')

const buttonContentWrapper = props.animated ? Transition : 'span'

const buttonContentWrapperProps = props.animated ? { name: 'shift' } : {}

onMounted(() => {
  if (!props.animated)
    return

  const buttonWidth = buttonRef.value?.offsetWidth
  const buttonHeight = buttonRef.value?.offsetHeight

  buttonRef.value?.style.setProperty('--button-width', `${buttonWidth}px`)
  buttonRef.value?.style.setProperty('--button-height', `${buttonHeight}px`)
})
</script>

<style scoped>
.shift-enter-active {
  transition: all 0.3s var(--ease-out);
}

.shift-leave-active {
  transition: all 0.3s var(--ease-out);
}

.shift-enter-from {
  position: absolute;
  transform: translateY(-16px);
  filter: blur(4px);
  opacity: 0;
}

.shift-leave-to {
  position: absolute;
  filter: blur(4px);
  opacity: 0;
  transform: translateY(16px);
}
</style>
