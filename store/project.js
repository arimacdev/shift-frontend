export const state = () => ({
    all : 0
})

export const mutations = {
    increment (state, value) {
      state.all = value
    }
  }