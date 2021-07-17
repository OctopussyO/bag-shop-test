<template>
  <div :class="$style.root">
    <product-card
      v-for="item in sortedProductsList"
      :key="item.id"
      :data="item"
    />
  </div>
</template>

<script>
import { sortBy, some } from 'lodash'
import { getProductList } from '@/assets/js/api'
import { SortTypeEnum, SortTypes } from '@/assets/js/constants'
import ProductCard from '../../components/ProductCard.vue'

export default {
  components: { ProductCard },
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
      productList = await getProductList(ctx, { categoryIds: [id] })
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
      switch (this.sortType) {
        case SortTypeEnum.ByPrice:
          return sortBy(this.productList, ['price'])
        case SortTypeEnum.ByRating:
          return sortBy(this.productList, ['rating'])
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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1rem;
}
</style>
