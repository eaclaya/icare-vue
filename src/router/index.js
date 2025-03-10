import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import Cookies from 'js-cookie'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/chats',
      name: 'chats',
      component: () => import('@/views/ChatList.vue'),
    },
    {
      path: '/chats/:id',
      name: 'chats.show',
      component: () => import('@/views/ChatView.vue'),
    },
    {
      path: '/members',
      name: 'members',
      component: () => import('@/views/MembersView.vue'),
    },
    {
      path: '/churches',
      name: 'churches',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/ChurchesView.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const cookie = Cookies.get('XSRF-TOKEN')
  if (!cookie && to.name !== 'login') {
    return { name: 'login' }
  }
})

export default router
