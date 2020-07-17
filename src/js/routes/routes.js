import Login from '../../templates/pages/login.vue'
import Profile from '../../templates/pages/profile.vue'
import ErrorComp from '../../templates/pages/404.vue'

import store from '../store'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/profile')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

export const routes = [
  {
    path: '/login',
    component: Login,
    meta: {
      layout: 'auth'
    },
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      layout: 'default'
    },
    beforeEnter: ifAuthenticated
  },
  {
    path: '*',
    component: ErrorComp,
    name: '404'
  }
]
