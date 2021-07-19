import { mapActions, mapGetters } from 'vuex'
import { some } from 'lodash'

export default {
  computed: {
    ...mapGetters({
      cartItems: 'cart/getCartItems',
    }),
  },
  methods: {
    ...mapActions({
      loadCart: 'cart/loadCart',
      addItemToCart: 'cart/addItemToCart',
      removeItemFromCart: 'cart/removeItemFromCart',
      clearCart: 'cart/clearCart',
    }),
    isInCart(id) {
      if (!this.cartItems) { return false }
      return some(this.cartItems, (item) => item.id === id)
    },
  },
}
