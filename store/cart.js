import { filter } from 'lodash'
import { updateLocalStorage } from '@/assets/js/utils'

const CART_KEY = 'cartItems'

export const state = () => ({
  cartItems: null,
  likedItems: null,
})

export const getters = {
  getCartItems: (state) => state.cartItems,
}

export const mutations = {
  setCartItems(state, data) {
    state.cartItems = data
  },
  addItemToCart(state, data) {
    if (state.cartItems) {
      state.cartItems.push(data) // если бы отображалось количество, то проверялось бы наличие и тд
    } else {
      state.cartItems = [data]
    }
    updateLocalStorage(CART_KEY, state.cartItems)
  },
  removeItemFromCart(state, data) {
    if (state.cartItems) {
      state.cartItems = filter(state.cartItems, (item) => item.id !== data.id)
      updateLocalStorage(CART_KEY, state.cartItems)
    }
  },
}

export const actions = {
  loadCart({ commit }) {
    let items
    try {
      items = JSON.parse(localStorage.getItem(CART_KEY))
    } catch (err) {
      items = []
    } finally {
      commit('setCartItems', items)
    }
  },
  addItemToCart({ commit }, data) { // Здесь могло бы быть обращение к апи, поэтому action
    commit('addItemToCart', data)
  },
  removeItemFromCart({ commit }, data) {
    commit('removeItemFromCart', data)
  },
}
