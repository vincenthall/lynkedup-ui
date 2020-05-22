<template>
  <section class="container">
    <div>
      <strong>Home Page</strong>
      <pre>Both guests and logged in users can access!</pre>
      <nuxt-link to="/login">Login</nuxt-link>
    </div>
  </section>
</template>

<script>
// import { mapMutations } from 'vuex'

export default {
  auth: false,
  computed: {
    counter() {
      return this.$store.state.counter
    }
  }
}
</script>

<style lang="scss" scoped></style>
