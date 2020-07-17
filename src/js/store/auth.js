import Repository from '../repository/repository'

export default {
  state: {
    token: localStorage.getItem('token') || '',
    user: ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    async login ({ dispatch, commit }, payload) {
      try {
        const dataAuth = await Repository.post('/login', payload)
        const data = dataAuth.data
        if (data.code === 200) {
          const token = `Bearer ${data.data.token}`
          const user = data.data.active_sys_company_user
          localStorage.setItem('token', token)
          commit('setToken', token)
          commit('setUser', user)
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
      commit('setToken', '')
      commit('setUser', '')
    }
  },
  getters: {
    isAuthenticated: state => !!state.token
  }

}
