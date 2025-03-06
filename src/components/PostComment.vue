<script setup>
import { PaperClipIcon } from '@heroicons/vue/20/solid'
import { FaceSmileIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

const emit = defineEmits(['new-comment'])
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})
const showEmo = ref(false)
const comment = ref('')

const openEmo = () => {
  setTimeout(() => {
    showEmo.value = true
  }, 100)
}
const selectEmo = (emoji) => {
  showEmo.value = false
  comment.value += emoji.i
}

const submit = () => {
  const newComment = {
    id: Math.floor(Math.random() * 1000000),
    content: comment.value,
    created_at: new Date().toISOString(),
    user: {
      id: 1,
      name: 'John Doe',
      avatar:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  }
  emit('new-comment', newComment)
  comment.value = ''
}

document.addEventListener('click', function (event) {
  if (showEmo.value && !event.target.closest('.v3-emoji-picker')) {
    showEmo.value = false
  }
})
</script>
<template>
  <div class="flex items-start space-x-4">
    <div class="shrink-0">
      <img
        class="inline-block size-10 rounded-full"
        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt=""
      />
    </div>
    <div class="min-w-0 flex-1">
      <form @submit.prevent="submit" class="relative">
        <div
          class="rounded-lg bg-white dark:bg-gray-800 outline-1 -outline-offset-1 outline-gray-300 !ml-2"
        >
          <label for="comment" class="sr-only">Add your comment</label>
          <textarea
            rows="3"
            name="comment"
            id="comment"
            v-model="comment"
            class="block w-full resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            placeholder="Add your comment..."
          />

          <!-- Spacer element to match the height of the toolbar -->
          <div class="py-2" aria-hidden="true">
            <!-- Matches height of button in toolbar (1px border + 36px content height) -->
            <div class="py-px">
              <div class="h-9" />
            </div>
          </div>
        </div>

        <div class="flex justify-between py-2 pr-2 pl-3 relative">
          <div class="flex items-center space-x-5">
            <div class="flex items-center">
              <button
                type="button"
                class="-m-2.5 flex size-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
              >
                <PaperClipIcon class="size-5" aria-hidden="true" />
                <span class="sr-only">Attach a file</span>
              </button>
            </div>
            <div class="flex items-center relative">
              <button type="button" @click="openEmo" class="p-2 z-10">
                <FaceSmileIcon class="w-4 h-4" />
              </button>
            </div>
          </div>
          <div class="shrink-0">
            <button
              type="submit"
              :disabled="!comment.length"
              class="inline-flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 disabled:bg-green-300 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
        <div class="absolute bottom-0 overflow-hidden" v-if="showEmo">
          <EmojiPicker :native="true" @select="selectEmo" class="relative z-10 bg-white" />
        </div>
      </form>
    </div>
  </div>
</template>
