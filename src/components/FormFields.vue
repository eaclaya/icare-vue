<template>
  <div class="sm:col-span-3">
    <div v-for="(field, fieldId) in fields" :key="fieldId" class="mt-10 grid grid-cols-1 gap-4">
      <!-- Only render the field if it passes the dependency check -->
      <template v-if="shouldShowField(field)">
        <div class="gap-1 flex flex-col pb-4">
          <label :for="field.id">{{ field.label }}</label>

          <!-- Select input -->
          <select
            v-if="field.type === 'select'"
            :id="field.id"
            :name="field.id"
            v-model="formData[field.id]"
            :required="field.required"
            class="block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-800 sm:text-sm/6"
          >
            <option v-for="(label, value) in field.options" :key="value" :value="value">
              {{ label }}
            </option>
          </select>

          <!-- Date input -->
          <BaseInput
            v-else-if="field.type === 'date'"
            :id="field.id"
            :name="field.id"
            type="date"
            v-model="formData[field.id]"
            :required="field.required"
          />

          <!-- Default to text input -->
          <BaseInput
            v-else
            :id="field.id"
            :name="field.id"
            :type="field.type || 'text'"
            v-model="formData[field.id]"
            :required="field.required"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import BaseInput from './BaseInput.vue'

const props = defineProps({
  fields: {
    type: Object,
    required: true,
  },
})

const formData = ref({})
const initializeFormData = () => {
  const data = {}
  Object.entries(props.fields).forEach(([fieldId, field]) => {
    data[fieldId] = field.value !== undefined ? field.value : null
  })
  formData.value = data
}

const shouldShowField = (field) => {
  // If no dependency, always show the field
  if (!field.depends_on) {
    return true
  }

  // Check if the dependency condition is met
  const dependentField = field.depends_on.field
  const requiredValue = field.depends_on.value

  // If the dependent field's current value matches the required value, show this field
  return formData.value[dependentField] == requiredValue
}

onMounted(() => {
  initializeFormData()
})
</script>
