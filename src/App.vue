<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from './stores/auth' // Adjust the path based on your store location
import AuthLayout from '@/layouts/AuthLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import Cookies from 'js-cookie'

const auth = useAuthStore()
const cookie = Cookies.get('XSRF-TOKEN')
const layoutComponent = computed(() => (cookie ? AuthLayout : GuestLayout))
</script>
