<template>
  <div class="flex">
    <select
      class="border rounded-md px-4"
      v-model="auth.user.current_tenant_id"
      @change="changeTenant"
    >
      <option v-for="item in tenants" :value="item.id" :key="item.id">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'

const tenants = ref([])
const auth = useAuthStore()

const changeTenant = async () => {
  setTimeout(() => window.location.reload(), 500)
}

onMounted(async () => {
  tenants.value = auth.user.tenants
})
</script>
