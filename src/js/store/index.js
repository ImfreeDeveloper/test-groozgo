import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import { fetchWithAuth } from '../repository/repository'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    profile: null,
    success: null
  },
  mutations: {
    setProfile (state, profile) {
      state.profile = profile
    },
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    },
    setSuccess (state, success) {
      state.success = success
    },
    clearSuccess (state) {
      state.success = null
    }
  },
  actions: {
    async profile ({ dispatch, commit }) {
      try {
        const dataProfile = await fetchWithAuth('get', '/company-profile')
        const data = dataProfile.data
        if (data.code === 200) {
          commit('setProfile', data.data)
        } else {
          throw data
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    error: s => s.error,
    getProfile: s => s.profile,
    success: s => s.success
  },
  modules: {
    auth
  }
})
