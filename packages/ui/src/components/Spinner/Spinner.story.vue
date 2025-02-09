<template>
  <Story>
    <Variant title="Spinner">
      <div class="flex gap-4">
        <Button>
          <Spinner />
        </Button>
        <Spinner variant="background" />
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="tsx">
import Button from '../Button/Button.vue'
import Spinner from './Spinner.vue'
</script>
