<template>
  <form>
    <div class="space-y-12">
      <div class="border-b border-white/10 pb-12">
        <h2 class="text-base/7 font-semibold">Team Information</h2>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="name" class="block text-sm/6 font-medium">Name</label>
            <div class="mt-2">
              <BaseInput
                type="text"
                name="name"
                v-model="form.name"
                id="name"
                autocomplete="given-name"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="country" class="block text-sm/6 font-medium">Country</label>
            <div class="mt-2">
              <BaseInput
                type="text"
                v-model="form.location.country"
                name="country"
                id="country"
                autocomplete="country"
              />
            </div>
          </div>

          <div class="col-span-full">
            <label for="street-address" class="block text-sm/6 font-medium">Street address</label>
            <div class="mt-2">
              <BaseInput
                type="text"
                v-model="form.location.street"
                name="street-address"
                id="street-address"
                autocomplete="street-address"
              />
            </div>
          </div>

          <div class="sm:col-span-2 sm:col-start-1">
            <label for="city" class="block text-sm/6 font-medium">City</label>
            <div class="mt-2">
              <BaseInput
                v-model="form.location.city"
                type="text"
                name="city"
                id="city"
                autocomplete="address-level2"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="region" class="block text-sm/6 font-medium">State / Province</label>
            <div class="mt-2">
              <BaseInput
                v-model="form.location.state"
                type="text"
                name="region"
                id="region"
                autocomplete="address-level1"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="postal-code" class="block text-sm/6 font-medium">ZIP / Postal code</label>
            <div class="mt-2">
              <BaseInput
                v-model="form.location.zip"
                type="text"
                name="postal-code"
                id="postal-code"
                autocomplete="postal-code"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm/6 font-semibold">Cancel</button>
      <PrimaryButton type="submit"> Save </PrimaryButton>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'

const props = defineProps({
  team: {
    type: Object,
    required: true,
  },
})

const form = ref(props.team)
</script>
