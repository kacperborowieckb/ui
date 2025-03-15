<template>
  <Story>
    <Variant title="Default">
      <div class="max-w-[424px] p-4">
        <InputChips
          v-model="chips"
          label="Usernames to send email"
          placeholder="Username.."
          errorMessage="Usernames must contains 4-16 characters"
          :chipSeparators="['Tab', 'Enter', ',']"
          :validator="(val) => val.length >= 4 && val.length <= 16"
        />
      </div>
    </Variant>
    <Variant title="Error State">
      <div class="max-w-[424px] p-4">
        <InputChips
          hasError
          label="Usernames to send email"
          placeholder="Username.."
          :chipSeparators="['Tab', 'Enter', ',']"
        />
      </div>
    </Variant>
    <Variant title="Disabled">
      <div class="max-w-[424px] p-4">
        <InputChips
          disabled
          label="Usernames to send email"
          placeholder="Username.."
          :chipSeparators="['Tab', 'Enter', ',']"
        />
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import InputChips from './InputChips.vue'

const chips = ref<string[]>([])
</script>
