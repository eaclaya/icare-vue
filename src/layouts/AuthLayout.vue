<template>
  <div class="app-container">
    <main class="main-content flex flex-col">
      <div class="flex justify-between">
        <SwitchTheme />
      </div>
      <slot />
    </main>

    <!-- Bottom Navigation Bar -->
    <nav class="flex justify-evenly shadow-md border-t border-gray-100">
      <router-link to="/" class="flex flex-1 justify-center">
        <button type="button" class="py-4">Home</button>
      </router-link>
      <router-link to="/chats" class="flex flex-1 justify-center">
        <button type="button" class="py-4">Chats</button>
      </router-link>
      <router-link to="/churches" class="flex flex-1 justify-center">
        <button type="button" class="py-4">Churches</button>
      </router-link>
      <router-link to="/members" class="flex flex-1 justify-center">
        <button type="button" class="py-4">Members</button>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import SwitchTheme from '@/components/SwitchTheme.vue'
</script>
<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-content {
  flex: 1;
  overflow-y: auto;
}
</style>
