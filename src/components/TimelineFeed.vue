<template>
  <section role="list" class="bg-white dark:bg-[#181818] gap-4 flex flex-col">
    <PostItem v-for="event in events" :key="event.id" :event="event" @new-comment="newComment" />
  </section>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import PostItem from './PostItem.vue'

const events = ref([])
const currentPage = ref(1)
const totalPages = ref(0)
const isLoading = ref(false)
const error = ref(null)
const axios = inject('axios')

const fetchEvents = async (page = 1) => {
  isLoading.value = true
  try {
    const response = await axios.get(`/events?page=${page}`)
    events.value = [...events.value, ...response.data.data]
    currentPage.value = response.data.current_page
    totalPages.value = response.data.last_page
  } catch (err) {
    error.value = 'Failed to load events. Please try again.'
    console.error('Error fetching events:', err)
  } finally {
    isLoading.value = false
  }
}

const newComment = (newComment, eventId) => {
  const event = events.value.find((event) => event.id == eventId)
  event.comments = event.comments || []
  event.comments = [newComment, ...event.comments]
}

const loadMore = () => {
  if (currentPage.value < totalPages.value && !isLoading.value) {
    fetchEvents(currentPage.value + 1)
  }
}

onMounted(() => {
  fetchEvents()
})
</script>
