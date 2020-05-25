<template>
  <div>
    <v-btn icon router class="btn" to="/search">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-chip
      class="ma-2"
      color="deep-purple accent-4"
      icon
      text-color="white"
      to="/profile"
    >
      <v-avatar left>
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>
      {{ user }}
    </v-chip>
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
          @click="item.action"
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
      // items: [{ title: 'Logout', action: this.logout }],
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
  computed: {
    user() {
      return this.$auth.user.name.split(' ')[0]
    },
    items() {
      if (!this.$auth.user.admin) {
        return [{ title: 'Logout', action: this.logout }]
      } else {
        return [
          { title: 'Admin', action: this.admin },
          { title: 'Logout', action: this.logout }
        ]
      }
    }
  },
  methods: {
    admin() {
      return this.$router.push('/admin')
    },
    logout() {
      this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped></style>
