<template>
  <div>
    opa {{ categoryId }}
  </div>
</template>

<script>
import { sortBy, some } from 'lodash'
import { getProductList } from '@/assets/js/api'
import { SortTypeEnum, SortTypes } from '@/assets/js/constants'

export default {
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

<style lang="scss" scoped>

</style>
