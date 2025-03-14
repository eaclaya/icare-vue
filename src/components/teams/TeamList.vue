<template>
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <li
      v-for="team in teams"
      :key="team.id"
      class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white dark:bg-gray-800 text-center shadow-sm"
    >
      <div>
        <p class="text-sm/6 font-bold py-4">
          <router-link :to="{ name: 'teams.edit', params: { id: team.id } }">
            {{ team.name }} - <span class="text-white">{{ team.team_type?.name }}</span>
          </router-link>
        </p>
      </div>
      <div
        class="flex w-full flex-none justify-between gap-4 items-center px-4"
        v-for="member in team.members"
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
    </li>
  </ul>
</template>

<script setup>
defineProps({
  teams: {
    type: Array,
    required: true,
  },
})
</script>
