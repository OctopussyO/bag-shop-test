import { getCategories } from '@/assets/js/api'

export const state = () => ({
  categories: null,
})

export const getters = {
  getCategories: () => state.categories,
}

export const mutations = {
  updateCategories(state, data) {
    state.categories = data
  },
}

export const actions = {
  loadCategories({ commit }) {
    getCategories(this)
      .then((data) => commit('updateCategories', data))
  },
}
