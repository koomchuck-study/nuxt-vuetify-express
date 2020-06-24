export const state = () => ({
  me: null,
})

export const mutations = {
  // 비동기 작업 못함
  setMe(state, payload) {
    state.me = payload
  },
}

export const actions = {
  // 비동기 작업
  signUp({ commit }, payload) {
    commit("setMe", payload)
  },
  loginIn({ commit }, payload) {
    commit("setMe", payload)
  },
  logOut({ commit }) {
    commit("setMe", null)
  },
}
