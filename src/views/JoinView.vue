<script setup>
import BaseInput from '@/components/BaseInput.vue'
import BaseInputError from '@/components/BaseInputError.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import { inject, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const form = ref({
  email: '',
  password: '',
  token: '',
})
const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const axios = inject('axios')
const invitation = ref(null)

const submit = async () => {
  try {
    await auth.register(form.value)
    router.push({ name: 'home' })
  } catch (e) {
    console.error(e)
  }
}

const fetchData = async () => {
  try {
    const response = await axios.get(`/invitations/${form.value.token}`)
    invitation.value = response.data
  } catch (e) {
    console.error(e)
    router.push({ name: 'login' })
  }
}

onMounted(() => {
  if (!route.params.token) {
    router.push({ name: 'login' })
  }

  form.value.token = route.params.token
  fetchData()
})
</script>

<template>
  <section class="flex flex-col items-center justify-center h-screen w-full">
    <p class="text-red-500" v-show="auth.errors.message">{{ auth.errors.message }}</p>
    <p class="text-green-500" v-show="invitation?.invitable?.name">
      Welcome to the {{ invitation?.invitable?.name }} club
    </p>
    <form
      @submit.prevent="submit"
      class="w-full max-w-md p-8 rounded-md shadow-md flex flex-col gap-4"
    >
      <div class="relative w-full">
        <label>Email</label>

        <BaseInput
          v-model="form.email"
          type="email"
          name="email"
          class="w-full px-2 py-2 border border-gray-300 rounded-md"
          placeholder="Enter your email"
        />
        <BaseInputError class="mt-2" :message="auth.errors.email" />
      </div>
      <div class="relative flex flex-col w-full gap-2">
        <label for="password" value="Password">Password</label>
        <div>
          <BaseInput
            type="password"
            name="password"
            v-model="form.password"
            placeholder="Enter your password"
            class="w-full px-2 py-2 pr-10 border border-gray-300 rounded-md"
            autocomplete="current-password"
          />
          <BaseInputError class="mt-2" :message="auth.errors.password" />
        </div>
      </div>

      <div class="flex flex-col items-center justify-center">
        <PrimaryButton
          type="submit"
          class="flex items-center justify-center w-full"
          :loading="auth.loading"
        >
          Log In
          <ChevronRightIcon class="w-5 h-5" />
        </PrimaryButton>
      </div>
    </form>
  </section>
</template>
