<template>
  <InputWrapper :label="label">
    <InputBase v-model="model" :placeholder="placeholder" />
  </InputWrapper>
</template>

<script lang="ts">
import { InputBase } from '../InputBase'
import { InputWrapper } from '../InputWrapper'

export interface InputTextProps {
  placeholder?: string
  label?: string
}
</script>

<script setup lang="ts">
defineProps<InputTextProps>()

const model = defineModel<string>()
</script>
