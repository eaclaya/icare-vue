import { inject, ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref({
      id: null,
      name: null,
      email: null,
    })

    const errors = ref({})
    const loading = ref(false)
    const axios = inject('axios')

    const login = async (credentials) => {
      try {
        loading.value = true
        await axios.get('/sanctum/csrf-cookie')
        const response = await axios.post(`/login`, credentials)
        loading.value = false
        user.value = response.data.user
        return response
      } catch (err) {
        loading.value = false
        if (err.response?.data?.errors) {
          errors.value = err.response.data.errors
        } else {
          errors.value = err.response.data
        }
        throw err
      }
    }

    return { user, login, loading, errors }
  },
  {
    persist: true,
  },
)
