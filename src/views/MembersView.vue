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
const axios = inject('axios')
const loading = ref(false)

const columns = [
  { key: 'first_name', label: 'First Name', sortable: true },
  { key: 'last_name', label: 'Last Name', sortable: true },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
  { key: 'zip', label: 'ZIP' },
  { key: 'church', label: 'Church' },
]

const fetchData = async () => {
  try {
    loading.value = true
    const response = await axios.get('/members', {
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

const changeSort = (key) => {
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
        <!-- <div class="flex items-center gap-2">
          <label for="">Churches</label>
          <select class="border border-white p-2" v-model="distance" @change="fetchData">
            <option v-for="value in distances" :value="value" :key="value">{{ value }}</option>
          </select>
        </div> -->
      </div>
      <div>
        <input
          v-model="searchQuery"
          @change="fetchData"
          type="text"
          locationholder="Search..."
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
            <td class="p-2">{{ row.first_name }}</td>
            <td class="p-2">{{ row.last_name }}</td>
            <td class="p-2">{{ row.location?.city }}</td>
            <td class="p-2">{{ row.location?.state }}</td>
            <td class="p-2">{{ row.location?.zip }}</td>
            <td class="p-2">
              <template v-if="row.churches.length === 0"> N/A </template>
              <template v-else-if="row.churches.length === 1">
                {{ row.churches[0].name }}
              </template>
              <template v-else>
                <select>
                  <option v-for="church in row.churches" :value="church.id" :key="church.id">
                    {{ church.name }}
                  </option>
                </select>
              </template>
            </td>
            <td></td>
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
