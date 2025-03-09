<template>
  <InputWrapper :label="label">
    <Chip
      v-for="(chip, index) in chips"
      :key="index"
      :content="chip"
      :variant="chipsWithErrors.has(chip) ? 'error' : 'default'"
      @chip-removal="handleChipRemoval(index)"
    />
    <InputBase v-model.trim="inputValue" :placeholder="placeholder" @keydown="handleKeyDown" />
  </InputWrapper>
</template>

<script lang="ts">
import { ref } from 'vue'

import { Chip } from '../Chip'
import { InputBase } from '../InputBase'
import { InputWrapper } from '../InputWrapper'

export interface InputChipsProps {
  placeholder?: string
  label?: string
  chipSeparators: string[]
  validator?: RegExp | ((chipValue: string) => boolean)
}
</script>

<script setup lang="ts">
const props = defineProps<InputChipsProps>()

const chips = defineModel<string[]>({ default: [] })

const inputValue = ref<string>('')
const chipsWithErrors = ref<Set<string>>(new Set())

function validateChip(): boolean {
  if (!props.validator)
    return true

  if (props.validator instanceof RegExp) {
    return props.validator.test(inputValue.value)
  }

  return props.validator(inputValue.value)
}

function handleCreateChip() {
  const isValid = validateChip()

  if (!isValid) {
    chipsWithErrors.value.add(inputValue.value)
  }

  chips.value = [...chips.value, inputValue.value]
  inputValue.value = ''
}

function handleChipRemoval(chipIndex: number) {
  chips.value = chips.value.toSpliced(chipIndex, 1)
}

function handleKeyDown(e: KeyboardEvent) {
  const shouldCreateNewChip = props.chipSeparators.includes(e.key) && !!inputValue.value

  if (shouldCreateNewChip) {
    handleCreateChip()
  }
}
</script>
