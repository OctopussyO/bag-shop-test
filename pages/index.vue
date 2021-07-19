<template>
  <div>
    kekkekeke
  </div>
</template>

<script>
export default {
  layout: 'default',
  async asyncData({ redirect, store, error }) {
    try {
      await store.dispatch('categories/loadCategories')
      redirect(`/categories/${store.getters['categories/getCategories'][0].id}`)
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page was not found',
      })
    }
    redirect('/categories')
  },
}
</script>
