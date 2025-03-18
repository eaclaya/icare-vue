<template>
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <li
      v-for="member in members"
      :key="member.email"
      class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white dark:bg-gray-800 text-center shadow-sm"
    >
      <div class="flex flex-1 flex-col p-8 items-center">
        <img class="mx-auto size-24 shrink-0 rounded-full" :src="member.url_avatar" alt="" />
        <h3 class="mt-6 text-sm font-medium text-gray-900 dark:text-white">{{ member.name }}</h3>
        <dl class="mt-1 flex grow flex-col justify-between">
          <dd class="mt-3">
            <span
              class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset"
              >{{ member.role }}</span
            >
          </dd>
        </dl>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="flex w-0 flex-1">
            <button
              :href="`mailto:${member.email}`"
              class="cursor-pointer relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 dark:text-white"
            >
              <PencilIcon class="size-5 text-gray-400 dark:text-white" aria-hidden="true" />
              Edit
            </button>
          </div>
          <div class="-ml-px flex w-0 flex-1">
            <button
              @click="emit('remove', member)"
              class="cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 dark:text-white"
            >
              <TrashIcon class="size-5 text-gray-400 dark:text-white" aria-hidden="true" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps({
  members: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['remove'])
</script>
