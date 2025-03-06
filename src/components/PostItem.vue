<script setup>
import { HeartIcon, ChatBubbleBottomCenterIcon } from '@heroicons/vue/24/outline'
import PostComment from './PostComment.vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ref } from 'vue'
import PostComments from './PostComments.vue'

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['new-comment'])

dayjs.extend(relativeTime)
const showComments = ref(false)
const showCommentForm = ref(false)

const like = (event) => {
  event.liked = !event.liked
}

const openComments = () => {
  showComments.value = true
  showCommentForm.value = true
}

const newComment = (comment) => {
  emit('new-comment', comment, props.event.id)
  showCommentForm.value = false
}

const formatDate = (dateString) => {
  return dayjs(dateString).fromNow()
}
</script>
<template>
  <article class="relative flex flex-col gap-x-6 sm:px-6 shadow-xs pt-4">
    <div class="flex flex-col gap-2 px-4">
      <div class="flex justify-between gap-x-4">
        <div class="flex items-center gap-2">
          <img
            class="size-12 flex-none rounded-full bg-gray-50"
            :src="event.user.profile.url_avatar"
            alt=""
          />
          <p class="text-sm/6 font-semibold text-gray-900 dark:text-white">
            {{ event.user.name }}
          </p>
        </div>
        <div class="sm:flex sm:flex-col sm:items-end">
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {{ formatDate(event.created_at) }}
          </p>
        </div>
      </div>

      <div class="min-w-0 flex-auto">
        <p class="mt-1 flex text-sm text-gray-500 dark:text-gray-300">
          {{ event.description }}
        </p>
      </div>
    </div>

    <div class="flex justify-between">
      <button
        @click="like(event)"
        class="flex-1 flex items-center justify-center p-2 cursor-pointer"
      >
        <HeartIcon class="w-4 h-4" :class="{ 'text-red-500': event.liked }" />
      </button>
      <button
        @click="openComments"
        class="flex-1 flex items-center justify-center p-2 cursor-pointer"
      >
        <ChatBubbleBottomCenterIcon class="w-4 h-4" />
      </button>
    </div>
    <div class="flex flex-col p-2" v-if="showCommentForm">
      <PostComment :event="event" @new-comment="newComment" />
    </div>
    <PostComments v-if="showComments && event.comments?.length > 0" :comments="event.comments" />
  </article>
</template>
