<template>
  <div>
    HOORAY
    <NuxtChild />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { getProductList } from '@/assets/js/api'

export default {
  async asyncData(ctx) {
    const { store, error } = ctx
    let categoriesList

    try {
      categoriesList = await store.dispatch('categories/loadCategories')
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page was not found',
      })
    }
    return {
      categoriesList,
    }
  },
  data() {
    return {
      categoriesList: null,
    }
  },
  mounted() {
    console.log(this.$route.params)
    // this.loadCategories()
    // getProductList(this, { categoryIds: [1] }).then(data => console.log(data))
  },
  methods: {
    ...mapActions({
      loadCategories: 'categories/loadCategories',
    }),
  },
}
</script>

<style lang="scss" scoped>

</style>
