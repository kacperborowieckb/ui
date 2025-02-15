<template>
  <span class="relative flex size-5 items-center justify-center" aria-label="Loading">
    <span
      v-for="(spinnerLine, index) in spinnerLines" :key="index"
      class="spinner-line transform-[rotate(var(--line-rotation))_translate(150%)] absolute block h-[12%] w-1/4 rounded-[1px]"
      :class="spinnerColorClasses"
      v-bind="spinnerLine"
    />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface SpinnerProps {
  variant: 'foreground' | 'background'
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  variant: 'foreground',
})

const spinnerColorClasses = computed(() => props.variant === 'foreground' ? ' bg-primary-foreground' : 'bg-foreground')

const spinnerLines = Array.from({ length: 12 }, (_, i) => {
  return { style: { '--line-rotation': `${(30 * i) || 0.00001}deg`, '--line-delay': `${((12 - i) * -0.1).toFixed(2)}s` } }
})
</script>

<style scoped lang="css">
.spinner-line {
  animation: spin-steps 1.2s infinite;
  animation-delay: var(--line-delay);
}

@keyframes spin-steps {
  from {
    opacity: 0.8;
  } to {
    opacity: 0.2;
  }
}
</style>
