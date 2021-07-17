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
          1
        </span>
      </button>
    </header>
    <div :class="$style.content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showCart () {

    },
  }
}
</script>

<style lang="scss" module>
:global { @import '@/assets/styles/classes.scss'; }

$header-height: 4rem;

.root {
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
}

.content {
  min-height: inherit;
  padding: calc(#{$header-height} + 2rem) $page-left-right-padding 2rem;
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
