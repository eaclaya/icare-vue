<template>
  <div class="text-center flex items-center flex-col gap-2">
    <svg
      class="mx-auto size-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        vector-effect="non-scaling-stroke"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      />
    </svg>
    <h3 class="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No chats yet.</h3>
    <p class="mt-1 text-sm text-gray-500">Let's start creating a new one.</p>
    <div class="mt-6">
      <button
        type="button"
        @click="emit('click')"
        class="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        <PlusIcon class="mr-1.5 -ml-0.5 size-5" aria-hidden="true" />
        New Chat
      </button>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid'

const emit = defineEmits(['click'])
</script>
