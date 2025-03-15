<template>
  <InputWrapper
    :label="label"
    :disabled="disabled"
    :hasError="hasErrors"
    :errorMessage="errorMessage"
  >
    <Chip
      v-for="(chip, index) in chips"
      :key="`${index}-${chip}`"
      focusable
      withButton
      :disabled="disabled"
      :content="chip"
      :variant="chipsWithErrors.has(chip) ? 'error' : 'default'"
      @chipRemoval="handleChipRemoval(chip, index)"
    />
    <InputBase
      v-model.trim="inputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @keydown="handleKeyDown"
    />
  </InputWrapper>
</template>

<script lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import { Chip } from '../Chip'
import { InputBase } from '../InputBase'
import { InputWrapper } from '../InputWrapper'

export interface InputChipsProps {
  placeholder?: string
  label?: string
  disabled?: boolean
  chipSeparators: string[]
  validator?: RegExp | ((chipValue: string) => boolean)
  hasError?: boolean
  errorMessage?: string
}

export interface InputChipsEmits {
  (e: 'chipsUpdated', chips: string[]): void
  (e: 'errorStateChanged', hasError: boolean): void
}
</script>

<script setup lang="ts">
const props = defineProps<InputChipsProps>()
const emit = defineEmits<InputChipsEmits>()

const chips = defineModel<string[]>({ default: [] })
const error = defineModel<boolean>('error', { default: false })

const inputValue = ref<string>('')
const chipsWithErrors = ref<Map<string, number>>(new Map())

const hasErrors = computed(() => props.hasError || chipsWithErrors.value.size > 0)

watch(hasErrors, () => {
  emit('errorStateChanged', hasErrors.value)
  error.value = hasErrors.value
})

onMounted(() => {
  if (chips.value.length === 0)
    return

  chips.value.forEach((chip) => {
    if (!validateChip(chip)) {
      createErrorChip(chip)
    }
  })
})

function validateChip(chip: string): boolean {
  if (!props.validator)
    return true

  if (props.validator instanceof RegExp) {
    return props.validator.test(chip)
  }

  return props.validator(chip)
}

function handleKeyDown(e: KeyboardEvent) {
  const shouldCreateNewChip = props.chipSeparators.includes(e.key) && !!inputValue.value

  if (shouldCreateNewChip) {
    handleCreateChip(inputValue.value)
    inputValue.value = ''
  }
}

function handleCreateChip(chip: string) {
  const isValid = validateChip(chip)

  if (!isValid) {
    createErrorChip(chip)
  }

  chips.value = [...chips.value, chip]

  emit('chipsUpdated', chips.value)
}

function handleChipRemoval(chip: string, chipIndex: number) {
  chips.value = chips.value.toSpliced(chipIndex, 1)

  if (chipsWithErrors.value.has(chip)) {
    removeErrorChip(chip)
  }

  emit('chipsUpdated', chips.value)
}

function createErrorChip(chip: string) {
  const currentChipCount = chipsWithErrors.value.get(chip) ?? 0

  chipsWithErrors.value.set(chip, currentChipCount + 1)
}

function removeErrorChip(chip: string) {
  const currentChipCount = chipsWithErrors.value.get(chip)

  if (!currentChipCount)
    return

  if (currentChipCount === 1) {
    chipsWithErrors.value.delete(chip)

    return
  }

  chipsWithErrors.value.set(chip, currentChipCount - 1)
}
</script>
