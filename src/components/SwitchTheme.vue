<template>
  <button @click="switchTheme" class="theme-toggle">
    <MoonIcon v-if="isDark" class="w-6 h-6" />
    <SunIcon v-else class="w-6 h-6" />
  </button>
</template>

<script setup>
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const switchTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// Check saved theme on mount
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
}
</style>
