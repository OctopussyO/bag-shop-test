<template>
  <div>
    opa
  </div>
</template>

<script>
import { getProductList } from '@/assets/js/api'

export default {
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
  mounted() {
    console.log(this.categoryId, this.productList)
  },
}
</script>

<style lang="scss" scoped>

</style>
