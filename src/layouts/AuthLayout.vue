<template>
  <div class="app-container">
    <main class="main-content flex flex-col">
      <div class="flex justify-between">
        <SwitchTheme />
        <router-link to="/profile">
          <button class="p-2 cursor-pointer">
            <UserCircleIcon class="w-6 h-6" />
          </button>
        </router-link>
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
      <router-link to="/teams" class="flex flex-1 justify-center">
        <button type="button" class="py-4">Teams</button>
      </router-link>
      <router-link to="/groups" class="flex flex-1 justify-center">
        <button type="button" class="py-4">Groups</button>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import SwitchTheme from '@/components/SwitchTheme.vue'
import { UserCircleIcon } from '@heroicons/vue/24/outline'
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
