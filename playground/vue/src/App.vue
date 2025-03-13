<template>
  <button @click="toggleDarkMode">
    Toggle
  </button>
  <main class="flex flex-col gap-4 p-8">
    <Button animated>
      <template v-if="isLoading">
        <Spinner />
      </template>
      <template v-else>
        Submit
      </template>
    </Button>
    <Spinner variant="background" />
    <InputText
      v-model="isLoading"
      label="SPO Number"
      placeholder="SPO Number"
      class="max-w-[250px]"
      errorMessage="some"
      :validator="(s) => s.length < 4"
    />
    <InputChips
      v-model="inputChips"
      placeholder="SPO Number"
      class="max-w-[250px]"
      errorMessage="Some chips have invalid value"
      label="SPO Number"
      :chips="inputChips"
      :chipSeparators="['Enter']"
      :validator="(e: string) => e.length > 2"
      @updateChips="inputChips = $event"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '../../../packages/ui/src/components/Button'
import { InputChips } from '../../../packages/ui/src/components/InputChips'
import { InputText } from '../../../packages/ui/src/components/InputText'
import { Spinner } from '../../../packages/ui/src/components/Spinner'

const isLoading = ref('')

const inputChips = ref<string[]>([])

// watch(isLoading, () => {
//   console.info(isLoading.value)
// })

// watch(inputChips, () => {
//   console.info(inputChips.value)
// })

function toggleDarkMode() {
  window.document.documentElement.classList.toggle('dark')
}
</script>
