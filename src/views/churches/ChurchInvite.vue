<script setup>
import { inject, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const axios = inject('axios')
const form = ref({
  church: null,
  url: '',
})

const fetchData = async () => {
  try {
    const response = await axios.get(`/churches/${route.params.id}/invite`)
    const { callback, church } = response.data
    form.value.church = church
    if (callback) {
      const responseCallback = await axios.request({
        method: callback.method,
        url: callback.url,
        data: callback.data,
      })
      const { url } = responseCallback.data

      form.value.url =
        window.location.origin + '/' + new URL(url).pathname.replace(/\/api\/v\d+\//, '')
      console.log('Callback response:', responseCallback.data)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>
<template>
  <div class="flex flex-col items-center justify-center flex-1 gap-6">
    <h2>Invitation Link to {{ form.church?.name }}</h2>
    <div class="flex flex-col gap-2 items-center">
      <a :href="form.url">{{ form.url }}</a>
    </div>
  </div>
</template>
