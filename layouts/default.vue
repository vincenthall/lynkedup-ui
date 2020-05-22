<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
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
    <v-app-bar color="deep-purple accent-4" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <UserNavGroup v-show="authenticated" />
      <GuestNavGroup v-show="!authenticated" />
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
      authenticated: false,
      clipped: false,
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
      miniVariant: false,
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
