import { fetchWithAuth } from '../repository/repository'

export default {
  state: {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || ''
  },
  mutations: {
    setAuth (state, { token, user }) {
      state.token = token
      state.user = user
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    }
  },
  actions: {
    async login ({ dispatch, commit }, payload) {
      try {
        const dataAuth = await fetchWithAuth('post', '/login', payload)
        const data = dataAuth.data
        if (data.code === 200) {
          const token = `Bearer ${data.data.token}`
          const user = data.data.active_sys_company_user
          commit('setAuth', { token, user })
        } else {
          throw data
        }
      } catch (e) {
        commit('setError', e)
        dispatch('logout')
        throw e
      }
    },
    async logout ({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      commit('setAuth', { token: '', user: '' })
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    user: state => !!state.user
  }

}
