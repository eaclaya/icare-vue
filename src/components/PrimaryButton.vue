<script setup lang="ts">
import LoadingIcon from './LoadingIcon.vue'
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
})
</script>

<template>
  <button
    :type="type"
    class="inline-flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-xs gap-2 hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 cursor-pointer"
    :disabled="loading"
  >
    <LoadingIcon v-if="loading" />
    <slot />
  </button>
</template>
