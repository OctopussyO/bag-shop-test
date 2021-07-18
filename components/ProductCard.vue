<template>
  <div
    :class="[$style.card, {
      [$style.normal]: !minimized,
      [$style.minimized]: minimized,
    }]"
  >
    <star-rating
      :checked="ratingClicked"
      :value="rating"
      :class="$style.rating"
      @change="ratingClicked = !ratingClicked"
    />
    <button
      :class="[$style.cartBtn, 'button-clear']"
      @click="$emit(inCart ? 'click:delete' : 'click:add')"
    >
      <svg-icon
        v-if="inCart"
        name="trash"
        :class="$style.icon"
      />
      <svg-icon
        v-else
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
    <p :class="[$style.text, $style.accentedText, $style.paragraph, $style.price]">
      {{ price }}
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
    minimized: {
      type: Boolean,
      default: false,
    },
    inCart: {
      type: Boolean,
      default: false,
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
  width: 100%;
  border-radius: .5rem;
  background-color: #FFF;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
}

.cartBtn {
  padding: .25rem;
  color: $surface-light-color;
  @include transition;

  &:hover {
    color: $text-color;
  }
}

.image {
  display: block;
}

.icon {
  width: 16px;
  height: 16px;
}

.title {
  font-weight: 400;
  text-transform: capitalize;
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

.normal {
  min-width: 16rem;
  max-width: 18rem;
  padding: $padding;

  .cartBtn {
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
    width: 9rem;
    height: 11.25rem;
    margin: 0 auto;
    object-fit: cover;
    object-position: center 10px; // just for beauty
    transform: scale(1.2); // just for beauty
  }

  .title {
    margin-top: 1rem;
    margin-bottom: 0.4rem;
    @include overflow-ellipsise;
  }
}

.minimized {
  max-height: 7.5rem;
  padding: 1rem 1.5rem;
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  grid-template-rows: min-content 1fr min-content;
  grid-template-areas:  'image name   btn'
                        'image price  btn'
                        'image rating btn';
  gap: .4rem 2rem;

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .image {
    grid-area: image;
    width: 4.4rem;
    height: 5.6rem;
    margin: 0 auto;
    object-fit: cover;
    object-position: center 10px; // just for beauty
    transform: scale(1.2); // just for beauty
  }

  .title {
    grid-area: name;
    max-height: 2.4rem;
    margin-top: 0;
    margin-bottom: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .price {
    grid-area: price;
  }

  .rating {
    grid-area: rating;
  }

  .cartBtn {
    grid-area: btn;
  }
}

</style>
