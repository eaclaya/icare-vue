<script setup>
const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
})
</script>
<template>
  <ul role="list" class="divide-y divide-gray-100 bg-gray-100 dark:bg-[#151b23]">
    <li v-for="comment in comments" :key="comment.id" class="flex gap-x-4 py-5 px-2">
      <img class="size-12 flex-none rounded-full bg-gray-50" :src="comment.user.avatar" alt="" />
      <div class="flex-auto">
        <div class="flex items-baseline justify-between gap-x-4">
          <p class="text-sm/6 font-semibold text-gray-900">{{ comment.user.name }}</p>
          <p class="flex-none text-xs text-gray-600">
            <time :datetime="comment.created_at">{{ comment.created_at }}</time>
          </p>
        </div>
        <p class="mt-1 line-clamp-2 text-sm/6 text-gray-600 dark:text-gray-400">
          {{ comment.content }}
        </p>
      </div>
    </li>
  </ul>
</template>
