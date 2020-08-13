import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/regi',
    name: 'Regi',
    component: () => import('@/views/regi.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login2.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/model1',
    name: 'Model1',
    component: () => import('@/views/model1.vue')
  },
    {
      path: '/models',
      name: 'Models',
      component: () => import('@/views/models.vue')
    },
    {
      path: '/base',
      name: 'Base',
      component: () => import('@/views/base.vue')
    },
    {
      path: '/delete',
      name: 'Delete',
      component: () => import('@/views/delete.vue')
    },
    {
      path: '/worktable',
      name: 'Worktable',
      component: () => import('@/views/worktable.vue')
    },
    {
      path: '/test-card',
      name: 'Test-card',
      component: () => import('@/views/test-card.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/profile.vue')
    }

]

const router = new VueRouter({
  routes
})

export default router
