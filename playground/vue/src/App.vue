<template>
  <button @click="toggleDarkMode">
    Toggle
  </button>
  <main class="flex gap-2 p-4">
    <KButton>Submit</KButton>
    <KButton>Action required</KButton>
    <KButton>
      Download
      <template #icon>
        <DownloadIcon />
      </template>
    </KButton>
  </main>
</template>

<script setup lang="ts">
import { DownloadIcon } from '@radix-icons/vue'

function toggleDarkMode() {
  window.document.documentElement.classList.toggle('dark')
}
</script>
