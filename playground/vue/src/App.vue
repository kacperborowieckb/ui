<template>
  <button @click="toggleDarkMode">
    Toggle
  </button>
  <main class="flex gap-4 p-8">
    <Button animated @click="action">
      <template v-if="isLoading">
        <Spinner />
      </template>
      <template v-else>
        Submit
      </template>
    </Button>
    <Spinner variant="background" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '../../../packages/ui/src/components/Button'
import { Spinner } from '../../../packages/ui/src/components/Spinner'

const isLoading = ref(false)

function action() {
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 5000)
}

function toggleDarkMode() {
  window.document.documentElement.classList.toggle('dark')
}
</script>
