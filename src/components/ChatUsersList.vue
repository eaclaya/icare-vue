<template>
  <div
    class="mx-auto max-w-lg flex flex-col h-[500px] border border-gray-300 rounded-lg overflow-hidden"
  >
    <!-- Search Bar (Fixed) -->
    <div class="p-3 bg-white shadow">
      <template v-if="form.is_group"
        ><BaseInput v-model="form.name" placeholder="Group name"
      /></template>
      <template v-else><BaseInput v-model="search" placeholder="Search..." /></template>
    </div>

    <!-- Scrollable List -->
    <div class="flex-1 overflow-y-auto min-h-[300px]">
      <ul role="list" class="divide-y divide-gray-200" v-if="form.is_group">
        <li
          v-for="user in selectedUsers"
          :key="user.id"
          class="flex items-center justify-between space-x-3 py-4 px-3 cursor-pointer"
          :class="user.selected ? 'bg-green-200' : ''"
          @click="user.selected = !user.selected"
        >
          <div class="flex min-w-0 flex-1 items-center space-x-3 gap-4">
            <div class="shrink-0">
              <img class="size-10 rounded-full" :src="user.profile.url_avatar" alt="" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium text-gray-900">{{ user.name }}</p>
              <p class="truncate text-sm font-medium text-gray-500">{{ user.email }}</p>
            </div>
          </div>
        </li>
      </ul>
      <ul role="list" class="divide-y divide-gray-200" v-else>
        <li
          v-for="user in filteredUsers"
          :key="user.id"
          class="flex items-center justify-between space-x-3 py-4 px-3 cursor-pointer"
          :class="user.selected ? 'bg-green-200' : ''"
          @click="user.selected = !user.selected"
        >
          <div class="flex min-w-0 flex-1 items-center space-x-3 gap-4">
            <div class="shrink-0">
              <img class="size-10 rounded-full" :src="user.profile.url_avatar" alt="" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium text-gray-900">{{ user.name }}</p>
              <p class="truncate text-sm font-medium text-gray-500">{{ user.email }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- Button (Fixed) -->
    <div
      class="p-3 bg-white shadow flex justify-end"
      v-show="selectedUsers.length > 0"
      :disabled="disableButton"
    >
      <PrimaryButton @click="startChat" class="flex items-center gap-1"
        >{{ form.is_group ? 'Enter Group Name' : 'Start Chat' }}
        <span
          class="flex items-center justify-center rounded-full bg-white h-4 w-4 text-xs font-bold text-green-600 ring-1 ring-green-600/20 ring-inset"
          >{{ selectedUsers.length }}</span
        >
      </PrimaryButton>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import PrimaryButton from './PrimaryButton.vue'
import BaseInput from './BaseInput.vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['selected'])
const loading = ref(false)
const axios = inject('axios')
const users = ref([])
const search = ref('')
const auth = useAuthStore()
const form = ref({
  name: '',
  users: [],
  is_group: false,
})

const filteredUsers = computed(() => {
  if (!search.value) {
    return users.value
  }
  return users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(search.value.toLowerCase()) ||
      user.email.toLowerCase().includes(search.value.toLowerCase()),
  )
})

const disableButton = computed(() => {
  if (selectedUsers.value.length === 0) {
    return true
  }
  if (form.value.is_group && !form.value.name) {
    return true
  }
  return false
})
const selectedUsers = computed(() => users.value.filter((user) => user.selected))

const startChat = () => {
  if (selectedUsers.value.length === 0) {
    return
  }
  form.value.users = selectedUsers.value.map((user) => user.id)
  if (form.value.is_group) {
    emit('startChat', form.value)
    return
  }
  if (selectedUsers.value.length === 1) {
    form.value.name = '{{ USER_NAME }}'
    emit('startChat', form.value)
    return
  }
  form.value.is_group = true
}

const fetchData = async () => {
  try {
    loading.value = true
    const response = await axios.get('/users')
    users.value = response.data.data.filter((user) => user.id != auth.user.id)
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
