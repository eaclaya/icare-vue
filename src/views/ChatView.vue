<script setup>
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid'
import ChatBubble from '@/components/ChatBubble.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import echo from '@/plugins/echo'
import { useAuthStore } from '@/stores/auth'

const messages = ref([])
let chatId = null
const newMessage = ref('')
const router = useRouter()
const route = useRoute()
const processing = ref(false)
const loading = ref(false)
const axios = inject('axios')
let channel = null
const auth = useAuthStore()

const fetchData = async () => {
  if (loading.value) {
    return
  }

  const response = await axios.get(`/chats/${chatId}`)
  messages.value = response.data.data
}

const sendMessage = async () => {
  try {
    const data = {
      content: newMessage.value,
    }
    const response = await axios.post(`/chats/${chatId}/message`, data)
    messages.value.push(response.data)
    newMessage.value = ''
  } catch (error) {
    console.error('Error creating chat:', error)
  }
}

onMounted(() => {
  chatId = route.params.id
  if (!chatId) {
    return router.push({ name: 'chat' })
  }

  fetchData()
  channel = echo.private(`chat.${chatId}`).listen('NewChatMessage', (message) => {
    messages.value.push(message)
  })
})

onUnmounted(() => {
  if (channel) {
    channel.unsubscribe()
  }
})
</script>
<template>
  <div class="flex flex-col">
    <section class="flex-1 p-2 overflow-y-auto chat-wrapper pb-[80px]">
      <div class="flex flex-col flex gap-2">
        <div v-for="(message, index) in messages" :key="index" class="chat-item-wrapper">
          <ChatBubble class="chat-bubble" :message="message" />
        </div>
      </div>
    </section>
  </div>
  <form
    @submit.prevent="sendMessage"
    class="fixed left-0 z-50 flex items-center w-full p-2 bg-gray-100 dark:bg-gray-700 border-b shadow-sm bottom-[60px]"
  >
    <input
      v-model.trim="newMessage"
      type="text"
      class="flex-1 px-4 py-2 mr-4 border-gray-300 outline-0 text-gray-800 dark:text-white"
      placeholder="Type your message..."
    />
    <PrimaryButton
      type="submit"
      :disabled="newMessage.trim().length === 0 || processing"
      class="px-4 py-2 text-white rounded-full bg-primary"
    >
      <PaperAirplaneIcon class="w-6 h-6" />
    </PrimaryButton>
  </form>
</template>
