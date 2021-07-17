export const getCategories = (ctx) => ctx.$axios.$get('/product-category')

export const getProductList = (ctx, { categoryIds } = { categoryIds: [] }) => {
  if (!(categoryIds && Array.isArray(categoryIds))) {
    throw new Error('`categoryIds` parameter is required and must be an Array!')
  }

  return ctx.$axios.$get(`/product?category=${categoryIds.join('%2C')}`)
}
