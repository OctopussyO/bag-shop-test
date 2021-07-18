<template>
  <button
    :class="[$style.button]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
}
</script>

<style lang="scss" module>
.button {
  width: 100%;
  padding: .9rem;
  margin-top: 1.5rem;
  background-color: $text-color;
  border-radius: .5rem;
  border: none;
  outline: none;
  color: #FFF;
  font-family: $PT-Sans;
  font-size: 1rem;
  line-height: 1.25;
  cursor: pointer;
  @include transition;

  &:hover {
    background-color: $surface-dark-color;
  }

  &:disabled {
    background-color: $surface-dark-color;
    cursor: default;
  }
}
</style>
