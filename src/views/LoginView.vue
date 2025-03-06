<script setup>
import BaseInput from '@/components/BaseInput.vue'
import BaseInputError from '@/components/BaseInputError.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import { useAuthStore } from '@/stores/auth'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const form = ref({
  email: '',
  password: '',
})
const auth = useAuthStore()

const router = useRouter()

const submit = async () => {
  try {
    await auth.login(form.value)
    router.push({ name: 'home' })
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <section class="flex flex-col items-center justify-center h-screen">
    <p class="text-red-500" v-show="auth.errors.message">{{ auth.errors.message }}</p>
    <form
      @submit.prevent="submit"
      class="w-full min-w-md p-8 rounded-md shadow-md flex flex-col gap-4"
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
