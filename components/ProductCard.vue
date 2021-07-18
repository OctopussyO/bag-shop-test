<template>
  <div :class="$style.card">
    <star-rating
      :checked="ratingClicked"
      :value="rating"
      :class="$style.rating"
      @change="ratingClicked = !ratingClicked"
    />
    <button
      :class="[$style.cartBtn, 'button-clear']"
      @click="$emit('click:delete')"
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
    <h3 :class="[$style.text, $style.title]">
      {{ name }}
    </h3>
    <p :class="[$style.text, $style.accentedText, $style.paragraph]">
      {{ price }}&nbsp;&#8381;
    </p>
  </div>
</template>

<script>
import { BaseUrl } from '@/assets/js/constants'
import StarRating from '@/components/StarRating.vue'

export default {
  components: { StarRating },
  props: {
    data: {
      type: Object,
      required: true,
      validator() { // TODO -- validate fields
        return true
      },
    },
  },
  emits: ['click:delete'],
  data() {
    return {
      ratingClicked: false,
    }
  },
  computed: {
    rating() {
      return this.data.rating
    },
    name() {
      return this.data.name?.toLowerCase()
    },
    price() {
      return `${this.data.price} ₽`
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
  // display: flex;
  // flex-direction: column;
  width: 100%;
  min-width: 16rem;
  max-width: 18rem;
  // height: 18rem; // TODO
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
  color: $surface-light-color;
  z-index: 2;
  @include transition;

  &:hover {
    color: $text-color;
  }
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
  object-position: center 10px; // just for beauty
  transform: scale(1.2); // just for beauty
}

.icon {
  width: 16px;
  height: 16px;
}

.title {
  margin-top: 1rem;
  margin-bottom: 0.4rem;
  font-weight: 400;
  text-transform: capitalize;
  @include overflow-ellipsise;
}

.text {
  font-family: $PT-Sans;
  color: $text-accented-color;
  font-size: .9rem;
  line-height: 1.3;
}

.accentedText {
  color: $text-color;
  font-weight: 700;
}

.paragraph {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
