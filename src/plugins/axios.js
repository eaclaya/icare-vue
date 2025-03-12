import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import Cookies from 'js-cookie'

// Create a custom Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  withXSRFToken: true,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const auth = useAuthStore()
    if (auth.user?.current_affiliate_id) {
      config.headers['X-TENANT'] = auth.user.current_affiliate_id
    }

    config.headers['X-Socket-ID'] = window?.Echo?.socketId()

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const auth = useAuthStore()
    if (error.response.status === 401) {
      auth.user = {}
      router.push('/login')
    }
    return Promise.reject(error)
  },
)
window.api = api
const axiosPlugin = {
  install(app) {
    app.config.globalProperties.$api = api
    app.provide('axios', api)
  },
}

export default axiosPlugin
