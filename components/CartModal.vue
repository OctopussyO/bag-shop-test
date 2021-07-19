<template>
  <div :class="$style.cartRoot">
    <div :class="$style.cart">
      <div :class="$style.header">
        <h2 :class="$style.title">
          Корзина
        </h2>
        <button
          :class="[$style.closeBtn, 'button-clear']"
          @click="close"
        >
          <svg-icon
            name="close"
            :class="$style.icon"
          />
        </button>
      </div>
      <template v-if="formSent">
        <div :class="$style.formSentBlock">
          <img
            src="~/static/ok-hand-emoji.png"
            alt="Эмоджи 'ок'"
            :class="$style.formSentImage"
          >
          <h3 :class="$style.formSentTitle">
            Заявка успешно отправлена
          </h3>
          <p :class="$style.formSentText">
            Вскоре наш менеджер свяжется с Вами
          </p>
        </div>
      </template>
      <template v-else>
        <template v-if="data && data.length">
          <h3 :class="$style.subtitle">
            Товары в корзине
          </h3>
          <div :class="$style.cardList">
            <product-card
              v-for="(item, i) in data"
              :key="item.id + i"
              :data="item"
              minimized
              in-cart
              :class="$style.card"
              @click:delete="$emit('remove-item', item)"
            />
          </div>
          <h3 :class="$style.subtitle">
            Оформить заказ
          </h3>
          <order-form
            ref="formRef"
            @submit="handleSubmit"
          />
        </template>
        <template v-else>
          <p :class="$style.paragraph">
            Пока что вы ничего не добавили в корзину.
          </p>
          <custom-button @click="close">
            Перейти к выбору
          </custom-button>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue'
import OrderForm from '@/components/OrderForm.vue'
import ProductCard from '@/components/ProductCard.vue'

export default {
  components: {
    CustomButton,
    OrderForm,
    ProductCard,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['input', 'close', 'remove-item', 'order-sent'],
  data() {
    return {
      categoryId: null,
      productList: [],
      formSent: false,
    }
  },
  computed: {
    visibility: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
  },
  methods: {
    close() {
      this.$emit('close')
      this.visibility = false
      this.formSent = false
    },
    handleSubmit() {
      // когда будет бэк -- сбрасывать поля после успешной отправки формы
      this.$refs.formRef.reset()
      this.$emit('order-sent')
      this.formSent = true
    },
  },
}
</script>

<style lang="scss" module>
:global { @import '@/assets/styles/classes.scss'; }

.cartRoot {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #FFFFFFCC;
  z-index: 10;
}

.cart {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 30vw;
  min-width: 26rem;
  max-width: 30rem;
  padding: 3.25rem 3rem;
  background-color: #fff;
  border-radius: 8px 0px 0px 8px;
  box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.title {
  margin-top: 0;
  margin-bottom: 0;
  color: $text-color;
  font-family: $PT-Sans;
  font-size: 2rem;
  line-height: 1.3;
}

.subtitle {
  margin-top: 0;
  margin-bottom: 1rem;
  color: $text-color;
  font-family: $PT-Sans;
  font-weight: 400;
}

.closeBtn {
  padding: .4rem;
}

.icon {
  width: .9rem;
  height: .9rem;
}

.cardList {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  overflow-y: auto;
  @include app-scrollbar;
}

.card {
  margin-bottom: 0.75rem;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.paragraph {
  margin-top: 0;
  margin-bottom: 0;
  color: $text-color;
  font-family: $PT-Sans;
  font-size: 1.35rem;
  line-height: 1.3;
}

.formSentBlock {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.formSentImage {
  width: 5rem;
  height: 5rem;
  object-fit: contain;
  object-position: center;
}

.formSentTitle {
  margin-top: 1.5rem;
  margin-bottom: 0;
  color: $text-color;
  font-family: $PT-Sans;
  font-size: 1.5rem;
  line-height: 1.3;
}

.formSentText {
  margin-top: .1rem;
  margin-bottom: 0;
  color: $text-accented-color;
  font-family: $PT-Sans;
  font-size: 1rem;
  line-height: 1.25;
}
</style>
