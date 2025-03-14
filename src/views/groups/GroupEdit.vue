<script setup>
import { inject, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import TeamList from '@/components/teams/TeamList.vue'
import GroupProfile from '@/components/groups/GroupProfile.vue'
import MemberListCard from '@/components/members/MemberListCard.vue'
import { useRoute, useRouter } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'
import BaseModal from '@/components/BaseModal.vue'
import GroupSearch from '@/components/groups/GroupSearch.vue'

const auth = useAuthStore()
const navigation = ref([
  { id: 'profile', name: 'Profile' },
  { id: 'teams', name: 'Teams' },
  { id: 'members', name: 'Members' },
])

const activeTab = ref('profile')
const axios = inject('axios')
const route = useRoute()
const router = useRouter()
let groupId = null
const showTeamListModal = ref(false)
const group = ref(null)

const fetchData = async () => {
  try {
    const response = await axios.get(`/groups/${groupId}/edit`)
    group.value = response.data.group
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const addGroup = async (group) => {
  showTeamListModal.value = false
  group.value.push(group)
}

onMounted(() => {
  groupId = route.params.id
  fetchData()
})
</script>
<template>
  <div class="w-full px-4 xl:px-0">
    <h1 class="sr-only">Account Settings</h1>
    <template v-if="group">
      <div class="border-b border-white/5">
        <!-- Secondary navigation -->
        <nav class="flex overflow-x-auto py-4">
          <ul
            role="list"
            class="flex min-w-full flex-none gap-x-6 text-sm/6 font-semibold text-gray-400"
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

      <section class="py-4">
        <!-- Profile tab -->
        <div id="profile" class="divide-y divide-white/5" v-show="activeTab === 'profile'">
          <GroupProfile :group="group" />
        </div>

        <!-- Teams tab -->
        <div id="teams" class="flex flex-col gap-4" v-show="activeTab === 'teams'">
          <template v-if="group?.teams">
            <div class="flex justify-end">
              <PrimaryButton @click="showTeamListModal = true">Add team</PrimaryButton>
            </div>
            <TeamList :teams="group.teams" />
          </template>
        </div>

        <!-- Members tab -->
        <div id="members" class="divide-y divide-white/5" v-show="activeTab === 'members'">
          <template v-if="group?.members">
            <MemberListCard :members="group.members" />
          </template>
        </div>
      </section>
    </template>
  </div>

  <BaseModal :show="showTeamListModal" @close="showTeamListModal = false" :full="true">
    <GroupSearch @selected="addGroup" />
  </BaseModal>
</template>
