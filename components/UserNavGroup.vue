<template>
  <div>
    <v-btn
      v-for="link in links"
      :key="link.idx"
      icon
      router
      class="btn"
      :to="link.to"
    >
      <v-icon>{{ link.icon }}</v-icon>
    </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon router class="btn" dark v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="logout"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{ title: 'Logout', action: this.logout }],
      links: [
        {
          icon: 'mdi-magnify',
          alt: 'Search',
          to: '/search'
        },
        {
          idx: 1,
          icon: 'mdi-account-circle',
          to: '/profile'
        }
      ]
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped></style>
