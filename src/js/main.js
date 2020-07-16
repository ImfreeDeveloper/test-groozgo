// scss
import './../scss/main.scss'
import '@babel/polyfill'

import Vue from 'vue'

import MainApp from '../templates/layouts/mainApp.vue'
import AuthApp from '../templates/layouts/authApp.vue'

import router from './routes'
import store from './store'

import App from '../templates/App.vue'

Vue.component('default', MainApp)
Vue.component('auth', AuthApp)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
