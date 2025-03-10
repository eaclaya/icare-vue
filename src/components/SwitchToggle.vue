<template>
  <Switch
    v-model="enabled"
    :class="[
      enabled ? 'bg-green-600' : 'bg-gray-200',
      'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:outline-hidden',
    ]"
  >
    <span
      aria-hidden="true"
      :class="[
        enabled ? 'translate-x-5' : 'translate-x-0',
        'pointer-events-none inline-block size-5 transform rounded-full bg-white ring-0 shadow-sm transition duration-200 ease-in-out',
      ]"
    />
  </Switch>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Switch } from '@headlessui/vue'

// Define props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

// Define emits
const emit = defineEmits(['update:modelValue'])

// Create a ref for the enabled state
const enabled = ref(props.modelValue)

// Watch for changes to the modelValue prop
watch(
  () => props.modelValue,
  (newValue) => {
    enabled.value = newValue
  },
)

// Watch for changes to the enabled state
watch(enabled, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
