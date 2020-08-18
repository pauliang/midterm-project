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
    {
      path: '/page',
      name: 'Page',
      component: () => import('@/views/page.vue')
    },
    {
      path: '/help',
      name: 'Help',
      component: () => import('@/views/help.vue')
    },
    {
      path: '/team_inside',
      name: 'Team_inside',
      component: () => import('@/components/team_inside.vue')
    },
    {
      path: '/doc',
      name: 'Doc',
      component: () => import('@/components/doc.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('@/components/search.vue')
    },
    {
      path: '/notification_center',
      name: 'Notification_center',
      component: () => import('@/views/notification_center.vue')
    },
    {
      path: '/notification_center_old',
      name: 'Notification_center_old',
      component: () => import('@/views/notification_center_old.vue')
    }
]

const router = new VueRouter({
  routes:routes,
  mode: 'history',
})

export default router
