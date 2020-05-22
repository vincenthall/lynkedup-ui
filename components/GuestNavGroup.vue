<template>
  <div>
    <v-btn
      v-for="(item, i) in items"
      :key="i"
      class="ma-2"
      tile
      elevation
      color="purple"
      dark
      :to="item.to"
      router
      exact
    >
      <v-icon left>{{ item.icon }}</v-icon> {{ item.title }}
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-account-plus',
          title: 'Register',
          to: '/register'
        },
        {
          icon: 'mdi-login-variant',
          title: 'Login',
          to: '/login'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped></style>
