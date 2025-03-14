import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/stores/auth'

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
      path: '/teams',
      name: 'teams.index',
      component: () => import('@/views/teams/TeamsView.vue'),
    },
    {
      path: '/teams/:id/edit',
      name: 'teams.edit',
      component: () => import('@/views/teams/TeamEdit.vue'),
    },
    {
      path: '/groups',
      name: 'groups',
      component: () => import('@/views/groups/GroupsView.vue'),
    },
    {
      path: '/groups/create',
      name: 'groups.create',
      component: () => import('@/views/groups/GroupEdit.vue'),
    },
    {
      path: '/groups/:id/edit',
      name: 'groups.edit',
      component: () => import('@/views/groups/GroupEdit.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
    },
    {
      path: '/churches',
      name: 'churches',
      component: () => import('@/views/ChurchesView.vue'),
    },
    {
      path: '/churches/:id/edit',
      name: 'churches.edit',
      component: () => import('@/views/churches/ChurchEdit.vue'),
    },
    {
      path: '/churches/:id/invite',
      name: 'churches.invite',
      component: () => import('@/views/churches/ChurchInvite.vue'),
    },
    {
      path: '/join/:token',
      alias: '/invitations/:token',
      name: 'join',
      component: () => import('@/views/JoinView.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const cookie = Cookies.get('XSRF-TOKEN')
  const auth = useAuthStore()

  if (!auth.user?.id && to.name !== 'login') {
    auth.user = {}
    return { name: 'login' }
  }
})

export default router
