import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: () => import('../views/PlaylistView.vue')
    },
    {
      path: '/playlist/:id',
      name: 'playlist-detail',
      component: () => import('../views/PlaylistDetailView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 这里后续需要添加实际的登录状态检查逻辑
    const isLoggedIn = false // 临时
    if (!isLoggedIn) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
