<template>
  <div
    ref="sorterRoot"
    :class="$style.sorter"
  >
    <span :class="$style.mainText">
      Сортировать по:&nbsp;
    </span>
    <button
      :class="[$style.mainText, $style.sortButton, 'button-clear']"
      @click="toggleList"
    >
      {{ selectedValueLabel }}
      <svg-icon
        name="arrow"
        :class="[$style.icon, {
          [$style.iconRotated]: isListShown,
        }]"
      />
    </button>
    <ul
      v-show="isListShown"
      :class="[$style.optionsList, 'list-clear']"
    >
      <li
        v-for="opt in options"
        :key="opt.key"
        :class="[$style.optionItem]"
      >
        <button
          :class="[$style.optionButton, 'button-clear']"
          @click="setSelected(opt.key)"
        >
          По {{ opt.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { find } from 'lodash'

export default {
  model: {
    prop: 'selected',
    event: 'select',
  },
  props: {
    options: {
      type: Array,
      default: () => [],
      validator() { // TODO -- validate unique keys, label
        return true
      },
    },
    selected: {
      type: String,
      default: null,
    },
  },
  emits: ['select'],
  data() {
    return {
      isListShown: false,
    }
  },
  computed: {
    selectedValue: {
      get() {
        return this.selected
      },
      set(val) {
        this.$emit('select', val)
      },
    },
    selectedValueLabel() {
      return find(this.options, (opt) => opt.key === this.selected)?.label || null
    },
  },
  mounted() {
    window.addEventListener('mouseup', this.handleClickOutside)
  },
  beforeUnmount() {
    window.removeEventListener('mouseup', this.handleClickOutside)
  },
  methods: {
    toggleList() {
      this.isListShown = !this.isListShown
    },
    handleClickOutside(e) {
      if (this.isListShown && !this.$refs.sorterRoot.contains(e.target)) {
        this.toggleDropdown()
      }
    },
    setSelected(key) {
      this.selectedValue = key
      this.toggleList()
    },
  },
}
</script>

<style lang="scss" module>
:global { @import '@/assets/styles/classes.scss'; }

.sorter {
  position: relative;
  font-family: $PT-Sans;
}

.mainText {
  color: $text-color;
  font-size: 1rem;
  line-height: 1.25;
}

.sortButton {
  color: $text-accented-color;
  @include transition;

  &:hover {
    color: $text-color;
  }
}

.optionsList {
  position: absolute;
  transform: translateY(100%);
  left: 0;
  bottom: -.5rem;
  width: 100%;
  padding-top: .5rem !important;
  padding-bottom: 0.5rem !important;
  border-radius: .5rem;
  background-color: #fff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 5;
}

.optionItem {
  padding: .25rem .75rem;
  color: $text-muted-color;
  @include transition;

  &:hover,
  &.selectedOption {
    background-color: $surface-extra-light-color;
    color: $text-color;
  }
}

.optionButton {
  width: 100%;
  font-size: .9rem;
  line-height: 1.3;
  text-align: left;
  @include overflow-ellipsise;
}

.icon {
  width: 5px;
  height: 3px;
  margin-left: 4px;
  margin-bottom: .1rem;
  @include transition;
}

.iconRotated {
  transform: rotate(-180deg);
}
</style>
