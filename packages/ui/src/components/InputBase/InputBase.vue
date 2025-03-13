<template>
  <input
    v-model="model"
    class="placeholder:text-muted-foreground py-1/2 h-full min-w-[120px] flex-1 px-2 focus:outline-0"
    type="text"
    :placeholder="placeholder"
    :disabled="disabled"
  >
</template>

<script lang="ts">
export interface InputBaseProps {
  placeholder?: string
  disabled?: boolean
}
</script>

<script setup lang="ts">
defineProps<InputBaseProps>()

const model = defineModel<string>()
</script>
