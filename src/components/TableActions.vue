<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 cursor-pointer"
      >
        <EllipsisHorizontalIcon class="-mr-1 size-5 text-gray-400" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
      >
        <div class="py-1">
          <MenuItem v-for="action in actions" :key="action.id">
            <button
              type="button"
              @click="handleClick(action)"
              class="block px-4 py-2 text-sm w-full hover:bg-gray-100 text-left cursor-pointer"
            >
              {{ action.label }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router'

defineProps({
  actions: {
    type: Array,
    required: true,
  },
})

const router = useRouter()
const handleClick = (action) => {
  const url = new URL(action.url)
  const uri = url.pathname.replace(/\/api\/v\d+\//, '')
  router.push(uri)
}
</script>
