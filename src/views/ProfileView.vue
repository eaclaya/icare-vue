<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import PermissionTree from '@/components/PermissionTree.vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
const auth = useAuthStore()
const navigation = ref([
  { id: 'account', name: 'Accounts' },
  { id: 'permissions', name: 'Permissions' },
])

const activeTab = ref('account')
</script>
<template>
  <div class="xl:pl-72">
    <h1 class="sr-only">Account Settings</h1>

    <div class="border-b border-white/5">
      <!-- Secondary navigation -->
      <nav class="flex overflow-x-auto py-4">
        <ul
          role="list"
          class="flex min-w-full flex-none gap-x-6 px-4 text-sm/6 font-semibold text-gray-400 sm:px-6 lg:px-8"
        >
          <li v-for="item in navigation" :key="item.id">
            <button
              type="button"
              @click="activeTab = item.id"
              class="cursor-pointer"
              :class="item.id === activeTab ? 'text-green-600' : ''"
            >
              {{ item.name }}
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Permissions tab -->
    <div id="permissions" class="divide-y divide-white/5" v-show="activeTab === 'permissions'">
      <PermissionTree />
    </div>
    <!-- Settings forms -->
    <div id="account" class="divide-y divide-white/5" v-show="activeTab === 'account'">
      <div
        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
      >
        <div>
          <h2 class="text-base/7 font-semibold">Personal Information</h2>
          <p class="mt-1 text-sm/6 text-gray-400">
            Use a permanent address where you can receive mail.
          </p>
        </div>

        <form class="md:col-span-2">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div class="col-span-full flex items-center gap-x-8">
              <img
                :src="auth.user.profile?.url_avatar"
                alt=""
                class="size-24 flex-none rounded-lg bg-gray-800 object-cover"
              />
              <div>
                <PrimaryButton type="button"> Change avatar </PrimaryButton>
                <p class="mt-2 text-xs/5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="first-name" class="block text-sm/6 font-medium">First name</label>
              <div class="mt-2">
                <input
                  type="text"
                  name="first-name"
                  v-model="auth.user.name"
                  id="first-name"
                  autocomplete="given-name"
                  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="block text-sm/6 font-medium">Last name</label>
              <div class="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label for="email" class="block text-sm/6 font-medium">Email address</label>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  v-model="auth.user.email"
                  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label for="username" class="block text-sm/6 font-medium">Username</label>
              <div class="mt-2">
                <div
                  class="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-green-500"
                >
                  <input
                    type="text"
                    name="username"
                    v-model="auth.user.email"
                    id="username"
                    class="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>

            <div class="col-span-full">
              <label for="role" class="block text-sm/6 font-medium">Roles</label>
              <div class="mt-2 grid grid-cols-1">
                <select
                  id="role"
                  name="role"
                  class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base outline-1 -outline-offset-1 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                >
                  <option v-for="role in auth.user.roles" :key="role">{{ role }}</option>
                </select>
                <ChevronDownIcon
                  class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div class="mt-8 flex">
            <PrimaryButton type="submit"> Save </PrimaryButton>
          </div>
        </form>
      </div>

      <div
        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
      >
        <div>
          <h2 class="text-base/7 font-semibold">Change password</h2>
          <p class="mt-1 text-sm/6 text-gray-400">
            Update your password associated with your account.
          </p>
        </div>

        <form class="md:col-span-2">
          <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div class="col-span-full">
              <label for="current-password" class="block text-sm/6 font-medium"
                >Current password</label
              >
              <div class="mt-2">
                <input
                  id="current-password"
                  name="current_password"
                  type="password"
                  autocomplete="current-password"
                  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label for="new-password" class="block text-sm/6 font-medium">New password</label>
              <div class="mt-2">
                <input
                  id="new-password"
                  name="new_password"
                  type="password"
                  autocomplete="new-password"
                  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div class="col-span-full">
              <label for="confirm-password" class="block text-sm/6 font-medium"
                >Confirm password</label
              >
              <div class="mt-2">
                <input
                  id="confirm-password"
                  name="confirm_password"
                  type="password"
                  autocomplete="new-password"
                  class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <div class="mt-8 flex">
            <PrimaryButton type="submit"> Save </PrimaryButton>
          </div>
        </form>
      </div>

      <div
        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
      >
        <div>
          <h2 class="text-base/7 font-semibold">Log out</h2>
          <p class="mt-1 text-sm/6 text-gray-400">Sign out of your account on all devices.</p>
        </div>

        <form class="md:col-span-2">
          <div class="mt-8 flex">
            <PrimaryButton
              @click="auth.logout()"
              type="submit"
              class="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold shadow-xs hover:bg-red-400"
            >
              Log out
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
