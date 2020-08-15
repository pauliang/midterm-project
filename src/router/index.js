import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Page',
    component: () => import('@/views/page.vue')
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
      path: '/test-card',
      name: 'Test-card',
      component: () => import('@/views/test-card.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/profile.vue')
    },
    {
      path: '/test-team',
      name: 'Test-team',
      component: () => import('@/views/test-team.vue')
    },
    {
      path: '/test-comment',
      name: 'Test-comment',
      component: () => import('@/views/test-comment.vue')
    },
    // {
    //   path: '/page',
    //   name: 'Page',
    //   component: () => import('@/views/page.vue')
    // },
    {
      path: '/test-remark',
      name: 'Test-remark',
      component: () => import('@/views/test-remark.vue')
    },
    {
      path: '/ckr',
      name: 'Ckr',
      component: () => import('@/views/ckr.vue')
    },
    {
      path: '/help',
      name: 'Help',
      component: () => import('@/views/help.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router
