<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import TeamList from '@/components/teams/TeamList.vue'
import ChurchProfile from '@/components/churches/ChurchProfile.vue'
const auth = useAuthStore()
const navigation = ref([
  { id: 'profile', name: 'Profile' },
  { id: 'teams', name: 'Teams' },
  { id: 'users', name: 'Users' },
])

const activeTab = ref('profile')
</script>
<template>
  <div class="xl:pl-72">
    <h1 class="sr-only">Account Settings</h1>

    <div class="border-b border-white/5">
      <!-- Secondary navigation -->
      <nav class="flex overflow-x-auto py-4">
        <ul
          role="list"
          class="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold text-gray-400 sm:px-6 lg:px-8"
        >
          <li v-for="item in navigation" :key="item.id">
            <button
              type="button"
              @click="activeTab = item.id"
              class="cursor-pointer"
              :class="item.id === activeTab ? 'text-green-600' : ''"
            >
              {{ item.name }}
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Profile tab -->
    <div id="profile" class="divide-y divide-white/5" v-show="activeTab === 'profile'">
      <ChurchProfile />
    </div>

    <!-- Teams tab -->
    <div id="teams" class="divide-y divide-white/5" v-show="activeTab === 'teams'">
      <TeamList />
    </div>

    <!-- Users tab -->
    <div id="users" class="divide-y divide-white/5" v-show="activeTab === 'users'">
      <UserList />
    </div>
  </div>
</template>
