<template>
  <div class="guest-container">
    <main class="guest-main flex flex-col">
      <SwitchTheme class="absolute top-4 right-4" />
      <slot />
    </main>
  </div>
</template>

<script setup>
import SwitchTheme from '../components/SwitchTheme.vue'
</script>

<style>
.guest-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.guest-main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
