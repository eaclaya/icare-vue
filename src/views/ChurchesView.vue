<script setup>
import LoadingIcon from '@/components/LoadingIcon.vue'
import { ref, computed, onMounted, inject } from 'vue'

const data = ref([])
const searchQuery = ref('')
const sortKey = ref('name')
const sortOrder = ref('asc')
const perPage = ref(50)
const currentPage = ref(1)
const distances = ref([1, 10, 100, 500, 1000])
const distance = ref(1)
const location = ref({ lat: null, lng: null })
const loading = ref(false)
const axios = inject('axios')

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
  { key: 'zip', label: 'ZIP' },
  { key: 'lat', label: 'Lat' },
  { key: 'lng', label: 'Lng' },
  { key: 'families_count', label: 'Families' },
  { key: 'members_count', label: 'Members' },
]

const fetchData = async () => {
  try {
    loading.value = true
    const response = await axios.get('/churches', {
      params: {
        q: searchQuery.value,
        sort: sortKey.value,
        order: sortOrder.value,
        per_page: perPage.value,
        page: currentPage.value,
        distance: distance.value,
        location: location.value,
      },
    })
    data.value = response.data.data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.error('Error fetching data:', error)
  }
}

onMounted(fetchData)

const totalPages = computed(() => Math.ceil(data.value.length / perPage.value))

const changeSort = (column) => {
  if (!column.sortable) {
    return
  }
  const key = column.key
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const nextPage = () => {
  currentPage.value++
  fetchData()
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchData()
  }
}
</script>
<template>
  <div class="p-4 w-full flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-2">
          <label for="">Radius/KM</label>
          <select class="border p-2 rounded-md" v-model="distance" @change="fetchData">
            <option v-for="value in distances" :value="value" :key="value">{{ value }}</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <input
            type="text"
            class="border p-2 rounded-md"
            placeholder="Latitude"
            v-model="location.lat"
          />
        </div>
        <div class="flex items-center gap-2">
          <input
            type="text"
            class="border p-2 rounded-md"
            placeholder="Longitude"
            v-model="location.lng"
          />
        </div>
      </div>
      <div>
        <input
          v-model="searchQuery"
          @change="fetchData"
          type="text"
          placeholder="Search..."
          class="p-2 border rounded w-full mb-4"
        />
      </div>
    </div>
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="p-2 cursor-pointer"
            @click="changeSort(column)"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr>
            <td :colspan="columns.length">
              <p class="p-8 flex items-center justify-center"><LoadingIcon /></p>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="row in data" :key="row.id" class="border-b">
            <td class="p-2">{{ row.name }}</td>
            <td class="p-2">{{ row.city }}</td>
            <td class="p-2">{{ row.state }}</td>
            <td class="p-2">{{ row.zip }}</td>
            <td class="p-2">{{ row.location[0] ?? 0 }}</td>
            <td class="p-2">{{ row.location[1] ?? 0 }}</td>
            <td class="p-2">{{ row.families_count }}</td>
            <td class="p-2">{{ row.members_count }}</td>
          </tr>
        </template>
      </tbody>
    </table>
    <div class="mt-4 flex justify-between">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="p-2 bg-gray-300 text-black rounded"
      >
        Prev
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" class="p-2 bg-gray-300 text-black rounded">Next</button>
    </div>
  </div>
</template>
