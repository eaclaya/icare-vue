<script setup>
import { inject, ref, onMounted } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import SwitchToggle from '@/components/SwitchToggle.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'

const permissions = ref({})
const openSections = ref(new Set())
const openSubSections = ref(new Set())
const axios = inject('axios') // Inject axios instance
// Fetch permissions data from the API
const fetchPermissions = async () => {
  try {
    const response = await axios.get('/member-permissions') // Replace with your API endpoint
    permissions.value = response.data
  } catch (error) {
    console.error('Error fetching permissions:', error)
  }
}

// Toggle section
const toggleSection = (sectionName) => {
  if (openSections.value.has(sectionName)) {
    openSections.value.delete(sectionName)
  } else {
    openSections.value.add(sectionName)
  }
}

// Check if a section is open
const isSectionOpen = (sectionName) => {
  return openSections.value.has(sectionName)
}

// Toggle sub-section
const toggleSubSection = (subSectionName) => {
  if (openSubSections.value.has(subSectionName)) {
    openSubSections.value.delete(subSectionName)
  } else {
    openSubSections.value.add(subSectionName)
  }
}

// Check if a sub-section is open
const isSubSectionOpen = (subSectionName) => {
  return openSubSections.value.has(subSectionName)
}

const savePermissions = async () => {
  try {
    const response = await axios.post('/member-permissions', { permissions: permissions.value })
    alert('Permissions saved successfully!')
  } catch (error) {
    console.error('Error saving permissions:', error)
  }
}

// Fetch permissions when the component is mounted
onMounted(() => {
  fetchPermissions()
})
</script>
<template>
  <div class="p-4">
    <div class="flex justify-end">
      <PrimaryButton @click="savePermissions">Save</PrimaryButton>
    </div>

    <!-- Loop through resources -->
    <div v-for="(resource, name) in permissions" :key="name" class="mb-4">
      <!-- Section Header -->
      <div
        @click="toggleSection(name)"
        class="flex justify-between items-center p-3 cursor-pointer dark:hover:bg-gray-600 hover:bg-gray-100"
      >
        <h3 class="font-semibold text-sm">{{ name.toUpperCase() }}</h3>
        <ChevronDownIcon
          :class="isSectionOpen(name) ? 'transform rotate-180' : ''"
          class="w-5 h-5 text-green-500 transition-transform"
        />
      </div>

      <!-- Section Content -->
      <div v-if="isSectionOpen(name)" class="mt-2 pl-4">
        <!-- Global Access -->
        <div class="mb-4">
          <div
            @click="toggleSubSection(`${name}-global`)"
            class="flex justify-between items-center p-2 cursor-pointer dark:hover:bg-gray-600 hover:bg-gray-100"
          >
            <h4 class="font-medium">Global Access</h4>
            <ChevronDownIcon
              :class="isSubSectionOpen(`${name}-global`) ? 'transform rotate-180' : ''"
              class="w-5 h-5 text-gray-500 transition-transform"
            />
          </div>
          <div v-if="isSubSectionOpen(`${name}-global`)" class="mt-2 pl-4">
            <ul class="space-y-1 flex items-center justify-end gap-2">
              <li
                v-for="action in resource.global.actions"
                :key="action"
                class="flex items-center cursor-pointer flex-col"
              >
                <label class="font-semibold text-[10px]">{{ action.name }}</label>
                <SwitchToggle
                  @click="() => (action.updated_at = Date.now())"
                  v-model="action.enabled"
                />
              </li>
            </ul>
          </div>
        </div>

        <!-- Scoped Access -->
        <div>
          <div
            @click="toggleSubSection(`${name}-scoped`)"
            class="flex justify-between items-center p-2 cursor-pointer dark:hover:bg-gray-600 hover:bg-gray-100"
          >
            <h4 class="font-medium">Scoped Access</h4>
            <ChevronDownIcon
              :class="isSubSectionOpen(`${name}-scoped`) ? 'transform rotate-180' : ''"
              class="w-5 h-5 text-gray-500 transition-transform"
            />
          </div>
          <div v-if="isSubSectionOpen(`${name}-scoped`)" class="mt-2 pl-4 flex flex-col divide-y">
            <div
              v-for="instance in resource.scoped"
              :key="instance.name"
              class="py-2 flex justify-between gap-4 cursor-pointer dark:hover:bg-gray-600 hover:bg-gray-100 items-center"
            >
              <p class="font-medium">{{ instance.name }}</p>
              <ul class="flex items-center gap-2">
                <li
                  v-for="action in instance.actions"
                  :key="action"
                  class="flex items-center flex-col"
                >
                  <label class="font-semibold text-[10px]">{{ action.name }}</label>
                  <SwitchToggle
                    @click="() => (action.updated_at = Date.now())"
                    v-model="action.enabled"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
