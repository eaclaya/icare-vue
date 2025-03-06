<script setup>
defineProps({
  message: String,
})
</script>

<template>
  <div>
    <p class="text-sm text-red-600" v-show="message" v-if="typeof message === 'string'">
      {{ message }}
    </p>
    <template v-if="typeof message === 'object'">
      <p v-for="(val, idx) in message" :key="idx" class="text-sm text-red-600">
        {{ val }}
      </p>
    </template>
  </div>
</template>
