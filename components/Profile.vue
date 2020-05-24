<template>
  <v-card>
    <v-tabs
      v-model="currentTab"
      background-color="deep-purple accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        My Profile
        <v-icon>mdi-account-circle</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Favorites
        <v-icon>mdi-heart</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Contacts
        <v-icon>mdi-account-box</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="currentTab">
      <v-tab-item
        v-for="tab in tabData"
        :key="tab.name"
        :value="'tab-' + tab.id"
      >
        <ProfileUser v-show="currentTab == 'tab-1'" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ProfileUser from '~/components/ProfileUser'
export default {
  components: {
    ProfileUser
  },
  data() {
    return {
      currentTab: null,
      tabData: [
        {
          id: 1,
          name: 'Profile',
          text: 'This is the profile tab'
        },
        {
          id: 2,
          name: 'Favorites',
          text: 'This is the favorites tab'
        },
        {
          id: 3,
          name: 'Contacts',
          text: 'This is the contact tab'
        }
      ]
    }
  }
}
</script>

<style scoped>
.mx-auto {
  width: 50%;
  margin: 0 auto;
}
</style>
