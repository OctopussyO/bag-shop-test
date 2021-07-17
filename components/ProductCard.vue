<template>
  <div :class="$style.card">
    <span
      :class="$style.rating"
    >
      {{ rating }}
    </span>
    <button
      :class="[$style.cartBtn, 'button-clear']"
    >
      <svg-icon
        name="cart"
        :class="$style.icon"
      />
    </button>
    <img
      :src="imageUrl"
      :alt="imageAltText"
      :class="$style.image"
    >
    <h3
      :class="$style.title"
    >
      {{ name }}
    </h3>
    <p
      :class="$style.text"
    >
      {{ price }}
    </p>
  </div>
</template>

<script>
import { BaseUrl } from '@/assets/js/constants'

export default {
  props: {
    data: {
      type: Object,
      required: true,
      validator() { // TODO -- validate fields
        return true
      },
    },
  },
  computed: {
    rating() {
      return this.data.rating
    },
    name() {
      return this.data.name
    },
    price() {
      return this.data.price
    },
    imageUrl() {
      return BaseUrl + this.data.photo
    },
    imageAltText() {
      return `Фотография товара '${this.data.name}'`
    },
  },
}
</script>

<style lang="scss" module>
:global { @import '@/assets/styles/classes.scss'; }

$padding: 1rem;
$button-padding: .25rem;

.card {
  position: relative;
  width: 100%;
  min-width: 16rem;
  max-width: 18rem;
  height: 18rem; // TODO
  padding: $padding;
  border-radius: .5rem;
  background-color: #FFF;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
}

.cartBtn {
  padding: .25rem;
  position: absolute;
  top: calc(#{$padding} - #{$button-padding});
  right: calc(#{$padding} - #{$button-padding});
  z-index: 2;
}

.rating {
  position: absolute;
  top: $padding;
  left: $padding;
  z-index: 2;
}

.image {
  display: block;
  width: 9rem;
  height: 11.25rem;
  margin: 0 auto;
  object-fit: cover;
  object-position: center;
}

.icon {
  width: 16px;
  height: 16px;
}
</style>
