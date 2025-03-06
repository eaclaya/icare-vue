<template>
  <div class="flex">
    <select class="border rounded-md" @change="(event) => selectChurch(event)">
      <option v-for="item in churches" :selected="item.selected" :value="item.id" :key="item.id">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue'

const churches = ref([])
const axios = inject('axios')

const selectChurch = async (event) => {
  churches.value = churches.value.map((church) => {
    if (church.id == event.target.value) {
      church.selected = true
    } else {
      church.selected = false
    }
    return church
  })
  localStorage.setItem('churches', JSON.stringify(churches.value))
}
onMounted(async () => {
  if (localStorage.getItem('churches')) {
    churches.value = JSON.parse(localStorage.getItem('churches'))
  } else {
    const response = await axios.get('/user')
    const { user } = response.data
    churches.value = user.churches ?? []
  }
})
</script>
