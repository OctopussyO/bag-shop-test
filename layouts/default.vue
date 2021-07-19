<template>
  <div :class="$style.root">
    <header :class="$style.header">
      <nuxt-link
        :class="[$style.logoLink, 'link-clear']"
        to="/"
      >
        TestList
      </nuxt-link>
      <button
        :class="[$style.cartButton, 'button-clear']"
        @click="showCart"
      >
        <svg-icon
          name="cart"
          :class="$style.cartIcon"
        />
        <span
          :class="$style.cartCounter"
        >
          {{ cartQuantity }}
        </span>
      </button>
    </header>
    <main :class="$style.content">
      <Nuxt />
    </main>
    <cart-modal
      v-show="isCartOpen"
      ref="cartModal"
      v-model="isCartOpen"
      :data="cartItems"
      @remove-item="removeItemFromCart"
      @order-sent="clearCart"
    />
  </div>
</template>

<script>
import CartModal from '@/components/CartModal.vue'
import cart from '@/components/mixins/cart.mixin'

export default {
  components: { CartModal },
  mixins: [cart],
  data() {
    return {
      isCartOpen: false,
    }
  },
  computed: {
    cartQuantity() {
      return this.cartItems?.length || 0
    },
  },
  created() {
    this.loadCart()
  },
  methods: {
    showCart() {
      this.isCartOpen = true
    },
  },
}
</script>

<style lang="scss" module>
:global { @import '@/assets/styles/classes.scss'; }

$header-height: 4rem;

.root {
  height: 100%;
  min-height: 100vh;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $header-height;
  padding: 1.25rem $page-left-right-padding;
  background-color: #FFF;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  z-index: 5;
}

.content {
  height: 100%;
  min-height: inherit;
  padding: calc(#{$header-height} + 2rem) $page-left-right-padding 1rem;
  background-color: $surface-extra-light-color;
}

.logoLink {
  margin-right: .5rem;
  color: $text-color;
  font-family: $PT-Sans;
  font-size: 1.4rem;
  line-height: 1.75rem;
  font-weight: 700;
}

.cartButton {
  position: relative;
  margin-right: 1rem;
  color: $text-color;
  @include transition;

  &:hover {
    color: $surface-light-color;
  }
}

.cartCounter {
  position: absolute;
  transform: translate(-75%, -10%);
  top: 0;
  left: 100%;
  display: inline-block;
  min-width: 12px;
  height: 12px;
  padding: 2px;
  background-color: $surface-light-color;
  border-radius: 50%;
  color: #FFF;
  font-family: $PT-Sans;
  font-size: 8px;
  line-height: 1;
  font-weight: 700;
  text-align: center;
}

.cartIcon {
  width: 2rem;
  height: 2rem;
}
</style>
