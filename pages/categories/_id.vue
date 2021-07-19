<template>
  <div :class="$style.root">
    <div :class="$style.cardList">
      <product-card
        v-for="item in sortedProductsList"
        :key="item.id"
        :data="item"
        :in-cart="isInCart(item.id)"
        @click:add="addItemToCart(item)"
        @click:delete="removeItemFromCart(item)"
      />
    </div>
  </div>
</template>

<script>
import { some } from 'lodash'
import ProductCard from '@/components/ProductCard.vue'
import cart from '@/components/mixins/cart.mixin'
import { getProductList } from '@/assets/js/api'
import { SortTypeEnum, SortTypes } from '@/assets/js/constants'

export default {
  components: { ProductCard },
  mixins: [cart],
  props: {
    sortType: {
      type: [String, null],
      default: null,
      validator(v) {
        if (!some(SortTypes, (type) => type === v)) {
          throw new Error(`\`sortType\` prop can take the following values: ${SortTypes.join(', ')}`)
        }
        return true
      },
    },
  },
  emits: ['selected:category'],
  async asyncData(ctx) {
    const { route, error } = ctx
    const id = route.params?.id
    let productList
    try {
      if (id) {
        productList = await getProductList(ctx, { categoryIds: [id] })
      }
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page was not found',
      })
    }
    return {
      categoryId: id,
      productList,
    }
  },
  data() {
    return {
      categoryId: null,
      productList: null,
    }
  },
  computed: {
    sortedProductsList() {
      if (!this.productList) { return [] }
      switch (this.sortType) {
        case SortTypeEnum.ByPrice:
          return [...this.productList].sort((a, b) => a.price - b.price)
        case SortTypeEnum.ByRating:
          return [...this.productList].sort((a, b) => b.rating - a.rating)
        default:
          return this.productList
      }
    },
  },
  mounted() {
    this.$emit('selected:category', this.categoryId)
  },
}
</script>

<style lang="scss" module>
.root {
  display: flex;
  width: 100%;
  max-height: 75vh;
  overflow-y: auto;
  @include app-scrollbar;
}

.cardList {
  flex-grow: 1;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1rem;
}
</style>
