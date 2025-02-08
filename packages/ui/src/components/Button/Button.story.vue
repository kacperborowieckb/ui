<script lang="ts" setup>
import { AngleIcon } from '@radix-icons/vue'
import { logEvent } from 'histoire/client'
import { ref } from 'vue'

import Button from './Button.vue'

const isLoading = ref(false)

function startButtonAnimation() {
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>

<template>
  <Story>
    <Variant title="Solid">
      <div class="flex gap-4">
        <Button variant="solid" @click="logEvent('Click', $event)">
          Submit
        </Button>
        <Button variant="solid" disabled @click="logEvent('Click', $event)">
          Submit
        </Button>
      </div>
    </Variant>
    <Variant title="Outline">
      <div class="flex gap-4">
        <Button variant="outline" @click="logEvent('Click', $event)">
          Submit
        </Button>
        <Button variant="outline" disabled @click="logEvent('Click', $event)">
          Submit
        </Button>
      </div>
    </Variant>
    <Variant title="Gradient">
      <div class="flex gap-4">
        <Button variant="gradient" @click="logEvent('Click', $event)">
          Submit
        </Button>
        <Button variant="gradient" disabled @click="logEvent('Click', $event)">
          Submit
        </Button>
      </div>
    </Variant>
    <Variant title="Animated">
      <Button animated variant="gradient" @click="startButtonAnimation">
        <template v-if="isLoading">
          <AngleIcon />
        </template>
        <template v-else>
          Submit
        </template>
      </Button>
    </Variant>
  </Story>
</template>
