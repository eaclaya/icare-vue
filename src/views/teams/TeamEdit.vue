<script setup>
import { inject, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import GroupList from '@/components/groups/GroupList.vue'
import TeamProfile from '@/components/teams/TeamProfile.vue'
import MemberListCard from '@/components/members/MemberListCard.vue'
import { useRoute, useRouter } from 'vue-router'
import PrimaryButton from '@/components/PrimaryButton.vue'
import BaseModal from '@/components/BaseModal.vue'
import GroupSearch from '@/components/groups/GroupSearch.vue'
import MemberSearch from '@/components/members/MemberSearch.vue'
const auth = useAuthStore()
const navigation = ref([
  { id: 'profile', name: 'Profile' },
  { id: 'groups', name: 'Groups' },
  { id: 'members', name: 'Members' },
])

const activeTab = ref('profile')
const axios = inject('axios')
const route = useRoute()
const router = useRouter()
let teamId = null
const showGroupListModal = ref(false)
const showGroupMemberListModal = ref(false)
const team = ref(null)

const fetchData = async () => {
  try {
    const response = await axios.get(`/teams/${teamId}/edit`)
    team.value = response.data.team
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const addGroup = async (group) => {
  showGroupListModal.value = false
  try {
    const response = await axios.post(`/teams/${teamId}/groups`, { group_id: group.id })
    team.value = response.data.team
  } catch (error) {
    console.error('Error adding group:', error)
  }
}

const removeGroup = async (group) => {
  showGroupListModal.value = false
  try {
    const response = await axios.delete(`/teams/${teamId}/groups`, { group_id: group.id })
    team.value = response.data.team
  } catch (error) {
    console.error('Error adding group:', error)
  }
}

const addMember = async (member) => {
  showGroupMemberListModal.value = false
  try {
    let roleName = prompt('Enter member role')
    roleName = ['Volunteer', 'Team Leader'].includes(roleName) ? roleName : 'Volunteer'
    const response = await axios.post(`/teams/${teamId}/members`, {
      member_id: member.id,
      role: roleName,
    })
    team.value = response.data.team
  } catch (error) {
    console.error('Error adding member:', error)
  }
}

onMounted(() => {
  if (!route.params.id) {
    router.push({ name: 'teams.index' })
  }
  teamId = route.params.id
  fetchData()
})
</script>
<template>
  <div class="w-full px-4 xl:px-0">
    <h1 class="sr-only">Account Settings</h1>
    <template v-if="team">
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
          <TeamProfile :team="team" />
        </div>

        <!-- Groups tab -->
        <div id="groups" class="flex flex-col gap-4" v-show="activeTab === 'groups'">
          <template v-if="team?.groups">
            <div class="flex justify-end">
              <PrimaryButton @click="showGroupListModal = true">Add group</PrimaryButton>
            </div>
            <GroupList :groups="team.groups" @remove="removeGroup" />
          </template>
        </div>

        <!-- Members tab -->
        <div id="members" class="flex flex-col gap-4" v-show="activeTab === 'members'">
          <div class="flex justify-end">
            <PrimaryButton @click="showGroupMemberListModal = true">Add member</PrimaryButton>
          </div>
          <template v-if="team?.members">
            <MemberListCard :members="team.members" />
          </template>
        </div>
      </section>
    </template>
  </div>

  <BaseModal :show="showGroupListModal" @close="showGroupListModal = false" :full="true">
    <GroupSearch @selected="addGroup" />
  </BaseModal>
  <BaseModal
    :show="showGroupMemberListModal"
    @close="showGroupMemberListModal = false"
    :full="true"
  >
    <MemberSearch @selected="addMember" />
  </BaseModal>
</template>
