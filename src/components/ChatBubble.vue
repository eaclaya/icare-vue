<script setup>
import { useAuthStore } from '@/stores/auth'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

defineProps({
  message: {
    type: Object,
    required: true,
  },
})
const auth = useAuthStore()
dayjs.extend(relativeTime)
</script>
<template>
  <section>
    <div v-if="message.user.id == auth.user.id" class="flex flex-col items-end mb-4">
      <div class="flex gap-1">
        <div
          class="relative max-w-md px-4 py-2 text-white break-words rounded-lg bg-gray-800 right-bubble"
        >
          <p class="text-xs text-white">
            {{ message.user.name }}
          </p>
          <p class="text-sm" v-html="message.content"></p>
          <p class="w-full mt-2 text-xs text-right text-gray-100">
            {{ dayjs().to(message.created_at) }}
          </p>
        </div>

        <img
          class="w-8 h-8 rounded-full bg-primary"
          :src="message.user.profile.url_avatar"
          alt="Avatar"
        />
      </div>
    </div>
    <div v-else class="flex flex-col items-start mb-4">
      <div class="flex gap-1">
        <img
          class="w-8 h-8 rounded-full bg-primary"
          :src="message.user.profile.url_avatar"
          alt="Avatar"
        />
        <div
          class="relative max-w-md px-4 py-2 break-words bg-green-400 dark:bg-green-600 rounded-lg left-bubble"
        >
          <p class="text-xs text-white">
            {{ message.user.name }}
          </p>
          <p class="text-sm text-white" v-html="message.content"></p>
          <p class="w-full mt-2 text-xs text-right text-white">
            {{ dayjs().to(message.created_at) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
