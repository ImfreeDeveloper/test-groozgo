import Login from '../../templates/pages/login.vue'
import Profile from '../../templates/pages/profile.vue'
import ErrorComp from '../../templates/pages/404.vue'

export const routes = [
  {
    path: '/login',
    component: Login,
    meta: {
      layout: 'auth'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      layout: 'default'
    }
  },
  {
    path: '*',
    component: ErrorComp,
    name: '404'
  }
]
