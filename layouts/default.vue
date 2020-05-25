<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="deep-purple accent-4" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-icon>mdi-fire</v-icon>
      <v-spacer />
      <UserNavGroup v-if="this.$auth.loggedIn" />
      <GuestNavGroup v-if="!this.$auth.loggedIn" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer color="deep-purple accent-4" :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer />
      <img src="~/static/vh-logo.png" class="vh-logo" />
    </v-footer>
  </v-app>
</template>

<script>
import UserNavGroup from '~/components/UserNavGroup'
import GuestNavGroup from '~/components/GuestNavGroup'

export default {
  components: {
    UserNavGroup,
    GuestNavGroup
  },
  data() {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-account-plus',
          title: 'Register',
          to: '/register'
        }
      ],
      right: true,
      rightDrawer: false,
      title: 'LynkedUp'
    }
  }
}
</script>

<style scoped>
.vh-logo {
  width: 80px;
}
</style>
