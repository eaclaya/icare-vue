<script setup>
import { inject, onMounted, ref } from 'vue'
import FormFields from '@/components/FormFields.vue'
import BaseInput from '@/components/BaseInput.vue'
import PrimaryButton from '../PrimaryButton.vue'

const props = defineProps({
  group: {
    type: Object,
  },
})

const emit = defineEmits(['save', 'close'])

const form = ref({
  id: props.group?.id,
  name: props.group?.name,
  group_type_id: props.group?.group_type_id,
  location: {
    country: props.group?.location?.country,
    street: props.group?.location?.street,
    city: props.group?.location?.city,
    state: props.group?.location?.state,
    zip: props.group?.location?.zip,
  },
})

const formRef = ref(null)

const fields = ref(null)
const axios = inject('axios')

const fetchData = async () => {
  try {
    const response = await axios.get(`/groups/create`)
    fields.value = response.data.fields
  } catch (error) {
    console.error(error)
  }
}

const submit = async () => {
  try {
    const formData = new FormData(formRef.value)
    const response = await axios.post('/groups', formData)
    emit('save', response.data.group)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  if (!props.group?.id) {
    fetchData()
  }
})
</script>

<template>
  <form @submit.prevent="submit" ref="formRef">
    <div class="space-y-12">
      <div class="border-b border-white/10 pb-12">
        <h2 class="text-base/7 font-semibold">Group Information</h2>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4">
          <div class="sm:col-span-3">
            <label for="name" class="block text-sm/6 font-medium">Name</label>
            <div class="mt-2">
              <BaseInput type="text" name="name" v-model="form.name" id="name" />
            </div>
          </div>
          <template v-if="fields">
            <FormFields :fields="fields" />
          </template>

          <div class="sm:col-span-3">
            <label for="country" class="block text-sm/6 font-medium">Country</label>
            <div class="mt-2">
              <BaseInput
                type="text"
                v-model="form.location.country"
                name="location-country"
                id="country"
                autocomplete="country"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="location-street" class="block text-sm/6 font-medium">Street address</label>
            <div class="mt-2">
              <BaseInput
                type="text"
                v-model="form.location.street"
                name="location-street"
                id="location-street"
                autocomplete="location-street"
              />
            </div>
          </div>

          <div class="grid grid-cols-3 sm:col-span-3 gap-2">
            <div class="flex flex-col">
              <label for="city" class="block text-sm/6 font-medium">City</label>
              <div class="mt-2">
                <BaseInput
                  v-model="form.location.city"
                  type="text"
                  name="location-city"
                  id="city"
                />
              </div>
            </div>

            <div class="flex flex-col">
              <label for="location-state" class="block text-sm/6 font-medium">State</label>
              <div class="mt-2">
                <BaseInput
                  v-model="form.location.state"
                  type="text"
                  name="location-state"
                  id="location-state"
                  autocomplete="address-level1"
                />
              </div>
            </div>

            <div class="flex flex-col">
              <label for="location-zip" class="block text-sm/6 font-medium">ZIP</label>
              <div class="mt-2">
                <BaseInput
                  v-model="form.location.zip"
                  type="text"
                  name="location-zip"
                  id="location-zip"
                  autocomplete="location-zip"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" @click="emit('close')" class="text-sm/6 font-semibold">Cancel</button>
      <PrimaryButton type="submit"> Save </PrimaryButton>
    </div>
  </form>
</template>
