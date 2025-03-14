<template>
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <li
      v-for="group in groups"
      :key="group.id"
      class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white dark:bg-gray-800 text-center shadow-sm"
    >
      <div>
        <p class="text-sm/6 font-bold py-4">
          <router-link :to="{ name: 'groups.edit', params: { id: group.id } }"
            >{{ group.name }} -
            <span class="text-white">{{ group.group_type?.name }}</span></router-link
          >
        </p>
      </div>
      <div
        class="flex w-full flex-none justify-between gap-4 items-center px-4 py-4"
        v-for="member in group.members"
        :key="member.id"
      >
        <div class="py-2">
          <img
            class="size-12 rounded-full bg-gray-50 ring-2 ring-white"
            :src="member.url_avatar"
            :alt="member.name"
          />
        </div>
        <div class="mt-1 text-xs/5 text-gray-500">
          <p>{{ member.name }}</p>
          <p class="text-green-600">{{ member.role }}</p>
        </div>
      </div>
      <div class="-mt-px flex divide-x divide-gray-200">
        <div class="flex w-0 flex-1">
          <button
            class="cursor-pointer relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 dark:text-white"
          >
            <PencilIcon class="size-5 text-gray-400 dark:text-white" aria-hidden="true" />
            Edit
          </button>
        </div>
        <div class="-ml-px flex w-0 flex-1">
          <button
            @click="emit('remove', group)"
            class="cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 dark:text-white"
          >
            <TrashIcon class="size-5 text-gray-400 dark:text-white" aria-hidden="true" />
            Remove
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps({
  groups: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['remove'])
</script>
