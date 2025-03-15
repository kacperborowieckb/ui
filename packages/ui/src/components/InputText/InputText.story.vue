<template>
  <Story>
    <Variant title="Default">
      <div class="p-4">
        <InputText
          v-model="username"
          class="max-w-[324px]"
          placeholder="Pick your username"
          label="Username"
          errorMessage="Invalid username"
          :validator="/^[a-zA-Z0-9]*$/"
        />
      </div>
    </Variant>
    <Variant title="Error state">
      <div class="p-4">
        <InputText
          hasError
          class="max-w-[324px]"
          placeholder="Pick your username"
          label="Username"
          errorMessage="Invalid username"
        />
      </div>
    </Variant>
    <Variant title="Disabled">
      <div class="p-4">
        <InputText
          disabled
          class="max-w-[324px]"
          placeholder="Pick your username"
          label="Username"
        />
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import InputText from './InputText.vue'

const username = ref('')
</script>
