<template>
  <section :class="$style.root">
    <header :class="$style.header">
      <h1 :class="$style.title">
        Каталог
      </h1>
      <sorter
        :options="sortOptions"
        :selected="selectedSortType"
        :class="$style.sorter"
        @select="selectedSortType = $event"
      />
    </header>
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
      <NuxtChild
        :sort-type="selectedSortType"
        @selected:category="checkSelectedCategory"
      />
    </main>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { SortTypeEnum } from '@/assets/js/constants'
import Sorter from '@/components/Sorter.vue'

export default {
  components: { Sorter },
  async asyncData({
    store, error, route, redirect,
  }) {
    try {
      await store.dispatch('categories/loadCategories')
      const { id } = route.params
      if (!id && id !== 0) {
        redirect(`/categories/${store.getters['categories/getCategories'][0].id}`)
      }
    } catch (err) {
      error({
        statusCode: 404,
        message: 'Page was not found',
      })
    }
  },
  data() {
    return {
      sortOptions: [
        {
          key: SortTypeEnum.ByPrice,
          label: 'цене',
        },
        {
          key: SortTypeEnum.ByRating,
          label: 'популярности',
        },
      ],
      selectedSortType: SortTypeEnum.ByPrice,
      categoryId: null,
    }
  },
  computed: {
    ...mapGetters({
      categoriesList: 'categories/getCategories',
    }),
  },
  methods: {
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

.root {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.sorter {
  margin-left: 1rem;
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
