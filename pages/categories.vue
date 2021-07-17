<template>
  <div :class="$style.root">
    <h1 :class="$style.title">
      Каталог
    </h1>
    <main :class="$style.content">
      <ul :class="['list-clear', $style.categoriesList]">
        <li
          v-for="item in categoriesList"
          :key="item.id"
          :class="[$style.categoriesListItem]"
        >
          <NuxtLink
            :to="`/categories/${item.id}`"
            :class="[$style.categoriesLink, 'link-clear']"
          >
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
      <NuxtChild @selected:category="checkSelectedCategory" />
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  asyncData({ store, error }) {
    try {
      store.dispatch('categories/loadCategories')
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page was not found',
      })
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      categoriesList: 'categories/getCategories',
    }),
  },
  methods: {
    ...mapActions({
      loadCategories: 'categories/loadCategories',
    }),
    checkSelectedCategory(id) {
      if (!(id || id === 0)) {
        this.$router.push(`/categories/${this.categoriesList[0].id}`)
      }
    },
  },
}
</script>

<style lang="scss" module>
:global { @import '@/assets/styles/classes.scss'; }

.title {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: $text-color;
  font-family: $PT-Sans;
  font-size: 2rem;
  line-height: 1.3;
}

.content {
  display: flex;

}

.categoriesList {
  max-width: 8.75rem;
  margin-right: 1.25rem;
}

.categoriesListItem {
  width: 100%;
  margin-bottom: 1rem;
  color: $surface-light-color;
  font-family: $PT-Sans;
  font-size: 1rem;
  line-height: 1.25;

  @include overflow-ellipsise;

  &:hover {
    color: $text-accented-color;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
}

.categoriesLink {
  &:global(.nuxt-link-exact-active) {
    color: $text-color;
    text-decoration: underline;
  }
}
</style>
