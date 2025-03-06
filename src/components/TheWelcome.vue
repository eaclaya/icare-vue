<script setup>
import { ref, onMounted, inject } from 'vue'

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

const loadMore = () => {
  if (currentPage.value < totalPages.value && !isLoading.value) {
    fetchEvents(currentPage.value + 1)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(() => {
  fetchEvents()
})
</script>

<template>
  <div class="timeline-container">
    <h1 class="timeline-title">Event Timeline</h1>

    <!-- Error Message -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <!-- Timeline Feed -->
    <div class="timeline">
      <div v-for="event in events" :key="event.id" class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="event-header">
            <div class="h-12 w-12 rounded-full overflow-hidden shadow-md">
              <img :src="event.user.profile.url_avatar" />
            </div>
            <p class="text-gray-700">{{ event.user.name }}</p>
            <h3 class="event-name">{{ event.name }}</h3>
            <span class="event-type">{{ event.type }}</span>
          </div>

          <div class="event-details">
            <p v-if="event.description">{{ event.description }}</p>
            <p class="event-location"><strong>Location:</strong> {{ event.location }}</p>
            <p class="event-contact">
              <strong>Contact:</strong> {{ event.contact_name }} ({{ event.contact_phone }})
            </p>

            <!-- Linked Items -->
            <div v-if="event.links?.length" class="event-links">
              <h4>Connected to:</h4>
              <ul>
                <li v-for="link in event.links" :key="link.id">
                  {{ link.linkable.name }}
                  <span class="link-type">({{ link.linkable_type.split('\\').pop() }})</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="event-footer">
            <span class="event-date">{{ formatDate(event.created_at) }}</span>
            <span class="event-timezone">{{ event.timezone }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <div class="load-more-container">
      <button
        v-if="currentPage < totalPages"
        @click="loadMore"
        :disabled="isLoading"
        class="load-more-button"
      >
        {{ isLoading ? 'Loading...' : 'Load More' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.timeline-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.timeline-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
}

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 15px;
  height: 100%;
  width: 2px;
  background: #e0e0e0;
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
  padding-left: 45px;
}

.timeline-marker {
  position: absolute;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #3498db;
  border: 4px solid #fff;
  box-shadow: 0 0 0 2px #3498db;
}

.timeline-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.event-name {
  margin: 0;
  color: #2c3e50;
  font-size: 1.2em;
}

.event-type {
  background: #3498db;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.event-details {
  margin: 15px 0;
}

.event-location,
.event-contact {
  margin: 8px 0;
  color: #666;
}

.event-links {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.event-links h4 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.event-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.event-links li {
  margin: 5px 0;
  color: #666;
}

.link-type {
  color: #999;
  font-size: 0.9em;
}

.event-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  color: #666;
  font-size: 0.9em;
}

.error-message {
  background: #ff6b6b;
  color: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}

.load-more-container {
  text-align: center;
  margin-top: 30px;
}

.load-more-button {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background 0.3s;
}

.load-more-button:hover {
  background: #2980b9;
}

.load-more-button:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}
</style>
