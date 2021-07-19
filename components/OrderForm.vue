<template>
  <div>
    <form
      ref="formRef"
      action="#"
      method="GET"
      noValidate
      @submit="$event.preventDefault()"
    >
      <div
        v-for="item in fields"
        :key="item.key"
        :class="$style.inputWrapper"
      >
        <masked-input
          v-if="item.key === 'phone'"
          :value="data[item.key]"
          :class="$style.input"
          type="text"
          autocomplete="off"
          placeholder-char="_"
          :mask="phoneMask"
          :guide="true"
          :placeholder="item.placeholder"
          :keep-char-positions="true"
          required
          @input="handleMaskedInput($event, item.key)"
        />
        <input
          v-else
          :value="data[item.key]"
          :class="$style.input"
          :placeholder="item.placeholder"
          required
          @input="handleInput($event, item.key)"
        >
        <span v-if="errors[item.key]">{{ errors[item.key] }}</span>
      </div>
      <custom-button
        :class="$style.submitBtn"
        :disabled="isSubmitDisabled"
        @click="submit"
      >
        Отправить
      </custom-button>
    </form>
  </div>
</template>

<script>
import { values, forEach, every } from 'lodash'
import MaskedInput, { conformToMask } from 'vue-text-mask'
import CustomButton from '@/components/CustomButton.vue'

// const REQUIRED_MESSAGE = 'Это поле должно быть заполнено'

// const RulesKeyEnum = {
//   minLength: 'minLength',
//   maxLength: 'maxLength',
//   required: 'required',
// }

export default {
  components: {
    CustomButton,
    MaskedInput,
  },
  emits: ['submit'],
  data() {
    return {
      fields: [
        {
          key: 'name',
          placeholder: 'Ваше имя',
        },
        {
          key: 'phone',
          placeholder: 'Телефон',
        },
        {
          key: 'address',
          placeholder: 'Адрес',
        },
      ],
      data: {},
      errors: {},
      phoneMask: ['+', /\d/, ' ', /[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    }
  },
  computed: {
    isSubmitDisabled() {
      return !every(values(this.data), (val) => !!val) || !this.isLengthValid
    },
    isLengthValid() {
      return this.data.phone?.length === 15
    },
  },
  created() {
    this.reset()
  },
  methods: {
    submit() {
      this.$emit('submit', this.data)
    },
    handleMaskedInput(val, key) {
      this.$set(this.data, key, conformToMask(
        val || '',
        this.phoneMask,
        { guide: false },
      ).conformedValue)
    },
    handleInput(e, key) {
      this.$set(this.data, key, e.srcElement?.value)
    },
    reset() {
      forEach(this.fields, (field) => {
        this.$set(this.data, field.key, null)
      })
    },
  },
}
</script>

<style lang="scss" module>
.inputWrapper {
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }
}
.input {
  width: 100%;
  height: 3rem;
  padding: 0 .9rem;
  background-color: $surface-extra-light-color;
  border-radius: .5rem;
  border: none;
  outline: none;
  color: $text-color;
  font-family: $PT-Sans;
  font-size: 1rem;
  line-height: 1.25;

  &::placeholder {
    color: $surface-light-color
  }
}

.submitBtn {
  margin-top: 1.5rem;
}
</style>
