export default {
  namespaced: true,
  state: () => ({config: null}),
  mutations: {
    config: (state, data) => { state.config = data }
  },
  actions: {
    config({commit}, data){
      return new Promise((resolve) => {
        commit('config', data)
        resolve()
      })
    }
  },
  getters: {
    config: state => state.config
  }
}