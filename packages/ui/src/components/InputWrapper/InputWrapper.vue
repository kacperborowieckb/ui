<template>
  <div class="flex flex-col gap-1">
    <span v-if="label" class="text-foreground">{{ label }}</span>
    <div
      class="border-border has-focus-visible:ring-offset-background has-focus-visible:ring-ring text-foreground has-focus-visible:outline-none has-focus-visible:ring-2 flex min-h-[32px] flex-wrap items-center gap-1 rounded-md border p-1 text-base ring-offset-1 transition duration-200 ease-out disabled:pointer-events-none disabled:opacity-75"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export interface InputWrapperProps {
  label?: string
}
</script>

<script setup lang="ts">
defineProps<InputWrapperProps>()
</script>
