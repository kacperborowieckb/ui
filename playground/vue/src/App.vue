<template>
  <button @click="toggleDarkMode">
    Toggle
  </button>
  <main class="flex gap-4 p-8">
    <Button animated @click="action">
      {{ buttonLabel }}
      <DownloadIcon size="2" />
    </Button><div class="flex gap-4">
      <Button animated variant="gradient" @click="startButtonAnimation">
        <template v-if="isLoading">
          <AngleIcon />
        </template>
        <template v-else>
          Submit
        </template>
      </Button>
      <Button animated variant="gradient" :disabled="isLoadingSecond" @click="startButtonAnimationSecond">
        <template v-if="isLoadingSecond">
          <AngleIcon />
        </template>
        <template v-else>
          Submit
        </template>
      </Button>
    </div>
    <!-- <Button animated @click="action">
      {{ buttonLabel }}
      <DownloadIcon v-if="!isLoading" />
    </Button>
    <Button animated @click="action">
      <DownloadIcon v-if="!isLoading" />
      {{ buttonLabel }}
    </Button>
    <Button animated variant="outline" @click="action">
      {{ buttonLabel }}
      <DownloadIcon v-if="!isLoading" />
    </Button>
    <Button animated variant="gradient" @click="action">
      <DownloadIcon v-if="!isLoading" />
      {{ buttonLabel }}
    </Button>
    <Button @click="action">
      {{ buttonLabel }}
    </Button>
    <Button animated variant="outline" @click="action">
      {{ buttonLabel }}
    </Button>
    <Button  variant="gradient" @click="action">
      {{ buttonLabel }}
    </Button>
    <Button disabled variant="gradient" @click="action">
      {{ buttonLabel }}
    </Button>
    <Button  disabled @click="action">
      {{ buttonLabel }}
    </Button>
    <Button disabled variant="outline" @click="action">
      {{ buttonLabel }}
    </Button> -->
  </main>
</template>

<script setup lang="ts">
// import { Button } from '@kacperborowiec/ui'
import { AngleIcon, DownloadIcon } from '@radix-icons/vue'
import { ref } from 'vue'

import { Button } from '../../../packages/ui/src/components/Button'

const buttonLabels = ['ds', 'dsfs', 'dsabi', 'some', 'submit']

const isLoading = ref(false)
const isLoadingSecond = ref(false)

function startButtonAnimation() {
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

function startButtonAnimationSecond() {
  isLoadingSecond.value = true

  setTimeout(() => {
    isLoadingSecond.value = false
  }, 2000)
}
const buttonLabel = ref(buttonLabels[0])

function action() {
  isLoading.value = true
  buttonLabel.value = buttonLabels[Math.floor(Math.random() * 5)]
  // setTimeout(() => {
  //   isLoading.value = false
  //   buttonLabel.value = buttonLabels[Math.floor(Math.random() * 5)]
  // }, 3000)
}

function toggleDarkMode() {
  window.document.documentElement.classList.toggle('dark')
}
</script>
