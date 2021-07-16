<template>
  <div>
    <header>
      <p :class="$style.test">
        TestList
      </p>
    </header>
    <Nuxt/>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" module>
.test {
  color: red;
  font-family: $PT-Sans;
}
</style>
