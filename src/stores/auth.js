import { inject, ref } from 'vue'
import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import router from '@/router'

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

    const register = async (data) => {
      try {
        loading.value = true
        const response = await axios.post(`/register`, data)
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

    const logout = async () => {
      Cookies.remove('XSRF-TOKEN')
      user.value = {}
      router.push('/login')
    }

    return { user, login, loading, errors, logout, register }
  },
  {
    persist: {
      storage: localStorage,
      pick: ['user'],
    },
  },
)
