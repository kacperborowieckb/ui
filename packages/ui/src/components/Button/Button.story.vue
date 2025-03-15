<template>
  <Story>
    <Variant title="Solid">
      <div class="flex gap-4">
        <Button variant="solid" @click="logEvent('Click', $event)">
          Submit
        </Button>
        <Button
          disabled
          variant="solid"
          @click="logEvent('Click', $event)"
        >
          Submit
        </Button>
      </div>
    </Variant>
    <Variant title="Outline">
      <div class="flex gap-4">
        <Button variant="outline" @click="logEvent('Click', $event)">
          Submit
        </Button>
        <Button
          disabled
          variant="outline"
          @click="logEvent('Click', $event)"
        >
          Submit
        </Button>
      </div>
    </Variant>
    <Variant title="Gradient">
      <div class="flex gap-4">
        <Button variant="gradient" @click="logEvent('Click', $event)">
          Submit
        </Button>
        <Button
          disabled
          variant="gradient"
          @click="logEvent('Click', $event)"
        >
          Submit
        </Button>
      </div>
    </Variant>
    <Variant title="Animated">
      <Button
        animated
        variant="gradient"
        @click="startButtonAnimation"
      >
        <template v-if="isLoading">
          <Spinner />
        </template>
        <template v-else>
          Submit
        </template>
      </Button>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
import { logEvent } from 'histoire/client'
import { ref } from 'vue'

import Spinner from '../Spinner/Spinner.vue'
import Button from './Button.vue'

const isLoading = ref(false)

function startButtonAnimation() {
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>
