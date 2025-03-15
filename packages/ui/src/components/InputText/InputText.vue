<template>
  <InputWrapper
    :label="label"
    :disabled="disabled"
    :hasError="isInvalid"
    :errorMessage="errorMessage"
  >
    <InputBase
      v-model="inputValue"
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

const inputValue = defineModel<string>({ default: '' })
const error = defineModel<boolean>('error', { default: false })

const isInvalid = computed(() => {
  return props.hasError || !validateInputValue(inputValue.value)
})

function validateInputValue(value: string) {
  if (!props.validator)
    return true

  if (props.validator instanceof RegExp) {
    error.value = !props.validator.test(value)
  }

  if (props.validator instanceof Function) {
    error.value = !props.validator(value)
  }

  return !error.value
}
</script>
