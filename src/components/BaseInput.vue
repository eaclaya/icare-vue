<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  type: {
    type: String,
    default: 'text',
  },
})
const model = defineModel({
  type: String,
  default: '',
})

const input = ref(null)

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus()
  }
})

defineExpose({ focus: () => input.value.focus() })
</script>

<template>
  <input
    :type="type"
    class="block w-full rounded-md border-gray-300 dark:border-white px-3 py-1.5 text-base text-gray-900 dark:text-white outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-800 sm:text-sm/6"
    v-model="model"
    ref="input"
  />
</template>
