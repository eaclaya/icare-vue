<template>
  <div class="flex flex-col flex-1">
    <template v-if="loading">
      <div class="h-full flex flex-col items-center justify-center">
        <LoadingIcon />
      </div>
    </template>
    <template v-else>
      <div v-if="chats.length === 0" class="flex flex-col items-center justify-center h-full">
        <ChatEmpty @click="showModal = true" />
      </div>
      <ul v-else role="list" class="divide-y divide-gray-800">
        <li
          v-for="chat in chats"
          :key="chat.id"
          class="flex justify-between gap-x-6 py-5 px-4 cursor-pointer"
          @click="openChat(chat)"
        >
          <div class="flex min-w-0 gap-x-4">
            <div class="relative overflow-hidden size-12">
              <img class="size-12 flex-none rounded-full bg-gray-800" :src="chat.avatar" />
            </div>

            <div class="min-w-0 flex-auto">
              <p class="text-sm/6 font-semibold">{{ chat.name }}</p>
              <p class="mt-1 truncate text-xs/5">{{ chat.email }}</p>
            </div>
          </div>
          <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p v-if="chat.lastSeen" class="mt-1 text-xs/5 text-gray-400">
              Last seen <time :datetime="chat.lastSeenDateTime">{{ chat.lastSeen }}</time>
            </p>
            <div v-else class="mt-1 flex items-center gap-x-1.5">
              <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                <div class="size-1.5 rounded-full bg-emerald-500" />
              </div>
              <p class="text-xs/5 text-gray-400">Online</p>
            </div>
          </div>
        </li>
      </ul>
      <PrimaryButton
        @click="showModal = true"
        class="fixed w-12 h-12 bottom-20 right-4 !rounded-full overflow-hidden"
        ><PencilIcon class="w-6 h-6"
      /></PrimaryButton>
    </template>

    <BaseModal :show="showModal" @close="showModal = false">
      <ChatUsersList @startChat="newChat" />
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import LoadingIcon from '@/components/LoadingIcon.vue'
import ChatEmpty from '@/components/ChatEmpty.vue'
import ChatUsersList from '@/components/ChatUsersList.vue'
import BaseModal from '@/components/BaseModal.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { PencilIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const loading = ref(false)
const axios = inject('axios')
const chats = ref([])
const showModal = ref(false)
const router = useRouter()

const newChat = async (data) => {
  showModal.value = false
  try {
    const response = await axios.post('/chats', data)
    chats.value.push(response.data)
  } catch (error) {
    console.error('Error creating chat:', error)
  }
}

const openChat = (chat) => {
  router.push({ name: 'chats.show', params: { id: chat.id } })
}

const fetchData = async () => {
  try {
    loading.value = true
    const response = await axios.get('/chats')
    chats.value = response.data.data
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
