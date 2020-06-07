<template>
  <v-card>
    <div>
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
        <div v-if="loaded">
          <ProfileUser v-if="currentTab === 'tab-1'" />
          <ProfileHistory v-if="currentTab === 'tab-2'" />
        </div>
        <div v-else>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center" style="height:300px;">
              <v-col align="center" justify="center">
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="purple"
                  class="my-4"
                  indeterminate
                ></v-progress-circular>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-tabs-items>
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
  },
  computed: {
    ...mapState('profile', ['profile', 'history']),
    loaded() {
      return !!(this.profile && this.history)
    }
  },
  mounted() {
    this.getProfile()
    this.fetchAndValidateHistory()
  },
  methods: {
    ...mapActions('profile', ['getProfile', 'fetchAndValidateHistory'])
  }
}
</script>

<style scoped>
.mx-auto {
  width: 80%;
  margin: 0 auto;
}
</style>
