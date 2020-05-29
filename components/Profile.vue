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

      <v-tab v-for="tab in tabData" :key="tab.id" :href="tab.href">
        {{ tab.name }}
        <v-icon>{{ tab.icon }}</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="currentTab">
      <v-tab-item
        v-for="tab in tabData"
        :key="tab.name"
        :value="'tab-' + tab.id"
      >
        <ProfileUser v-if="currentTab === 'tab-1'" />
        <ProfileHistory v-if="currentTab === 'tab-2'" />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ProfileUser from '~/components/ProfileUser'
import ProfileHistory from '~/components/ProfileHistory'
export default {
  components: {
    ProfileUser,
    ProfileHistory
  },
  data() {
    return {
      currentTab: null,
      tabData: [
        {
          id: 1,
          href: '#tab-1',
          name: 'Profile',
          text: 'This is the profile tab',
          icon: 'mdi-account-circle'
        },
        {
          id: 2,
          href: '#tab-2',
          name: 'Work History',
          text: 'This is the work history tab',
          icon: 'mdi-briefcase'
        },
        {
          id: 3,
          href: '#tab-3',
          name: 'Skills',
          text: 'This is the skills tab',
          icon: 'mdi-certificate'
        },
        {
          id: 4,
          href: '#tab-4',
          name: 'Education',
          text: 'This is the education tab',
          icon: 'mdi-school'
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
