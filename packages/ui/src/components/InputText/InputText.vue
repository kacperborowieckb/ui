<template>
  <InputWrapper
    :label="label"
    :disabled="disabled"
    :hasError="isInvalid"
    :errorMessage="errorMessage"
  >
    <InputBase
      v-model="model"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </InputWrapper>
</template>

<script lang="ts">
import { computed } from 'vue'

import { InputBase } from '../InputBase'
import { InputWrapper } from '../InputWrapper'

export interface InputTextProps {
  placeholder?: string
  label?: string
  disabled?: boolean
  validator?: RegExp | ((chipValue: string) => boolean)
  hasError?: boolean
  errorMessage?: string
}
</script>

<script setup lang="ts">
const props = defineProps<InputTextProps>()

const model = defineModel<string>({ default: '' })

const isInvalid = computed(() => {
  return props.hasError || !validateInputValue(model.value)
})

function validateInputValue(value: string) {
  if (!props.validator)
    return true

  if (props.validator instanceof RegExp) {
    return props.validator.test(value)
  }

  return props.validator(value)
}
</script>
