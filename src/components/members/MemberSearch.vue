<template>
  <div
    class="mx-auto max-w-lg flex flex-col h-[500px] border border-gray-300 rounded-lg overflow-hidden"
  >
    <!-- Search Bar (Fixed) -->
    <div class="p-3 shadow">
      <BaseInput v-model="search" @change="fetchData" placeholder="Search..." />
    </div>

    <!-- Scrollable List -->
    <div class="flex-1 overflow-y-auto min-h-[300px]">
      <ul role="list" class="divide-y divide-gray-200">
        <li
          v-for="member in members"
          :key="member.id"
          class="flex items-center justify-between space-x-3 py-4 px-3 cursor-pointer"
          :class="member.selected ? 'bg-green-200' : ''"
          @click="emit('selected', member)"
        >
          <div class="flex min-w-0 flex-1 items-center space-x-3 gap-4">
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">{{ member.name }}</p>
              <p class="truncate text-sm font-medium">{{ member.email }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['selected'])
const loading = ref(false)
const axios = inject('axios')
const members = ref([])
const search = ref('')
const auth = useAuthStore()

const fetchData = async () => {
  try {
    loading.value = true
    const response = await axios.get('/members', {
      params: {
        q: search.value,
      },
    })
    members.value = response.data.data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>
