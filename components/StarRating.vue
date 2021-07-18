<template>
  <div :class="$style.starRating">
    <div :class="$style.star">
      <input
        :checked="innerValue"
        type="checkbox"
        :class="$style.input"
      >
      <span :class="$style.starWrapper">
        <star
          :class="$style.starBg"
        />
        <span
          :class="$style.valueWrapper"
          :style="`height: ${ratingValue}%;`"
        >
          <star
            :class="$style.starValue"
          />
        </span>
      </span>
    </div>
    <span :class="$style.rating">
      {{ value }}
    </span>
  </div>
</template>

<script>
import Star from '@/components/Star.vue'

export default {
  components: { Star },
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: 0,
    },
  },
  emits: ['change'],
  data() {
    return {
      styleStarWidth: 100,
    }
  },
  computed: {
    innerValue: {
      get() {
        return this.checked
      },
      set(val) {
        this.$emit('change', val)
      },
    },
    ratingValue() {
      return this.value / 0.05
    },
  },
  methods: {

  },
}
</script>

<style lang="scss" module>
$star-size: .9rem;

.starRating {
  display: flex;
  align-items: center;
}

.star {
  position: relative;
  width: 1.25rem;
  height: 1.25rem;
  color: $star-color;
}

.input {
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
}

.input,
.starWrapper {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}

.starWrapper {
  width: $star-size;
  height: $star-size;
}

.starBg,
.starValue {
  width: $star-size;
  height: $star-size;
}

.starBg,
.starValue,
.valueWrapper {
  position: absolute;
  bottom: 0;
  left: 0;
}

.starBg {
  path {
    fill: none;
  }
}

.valueWrapper {
  width: $star-size;
  height: 0;
  overflow: hidden;
}

.rating {
  margin-left: 0.25rem;
  color: $star-color;
  font-family: $PT-Sans;
  font-size: .65rem;
  line-height: 1.3;
  font-weight: 700;
}
</style>
