<template>
  <div>
    <v-subheader><v-icon>mdi-cog</v-icon> Administration</v-subheader>
    <v-sheet height="400" class="overflow-hidden" style="position: relative;">
      <v-container class="fill-height px-10 mx-10">
        <v-row align="center" justify="center">
          <v-expansion-panels>
            <AdminUserPanel v-for="(user, i) in users" :key="i" :user="user" />
          </v-expansion-panels>
        </v-row>
      </v-container>

      <v-navigation-drawer absolute expand-on-hover permanent>
        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-sheet>
  </div>
</template>

<script>
import AdminUserPanel from './AdminUserPanel'
export default {
  components: {
    AdminUserPanel
  },
  data() {
    return {
      items: [
        { title: 'Users', icon: 'mdi-account-multiple' },
        { title: 'Data', icon: 'mdi-database' },
        { title: 'Roles', icon: 'mdi-hat-fedora' }
      ],
      users: null,
      error: null,
      admin: true
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const response = await this.$axios({
        method: 'get',
        url: process.env.LARAVEL_ENDPOINT + '/api/users',
        headers: {
          Authorization: this.$auth.getToken('password_grant')
        }
      }).catch((e) => (this.error = e.message))
      this.users = response.data.users
    }
  }
}
</script>
<style scoped>
.users-panel {
  margin-right: 20px;
}
</style>
