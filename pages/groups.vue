<template>
  <v-container fluid>
    <v-row>
      <GroupsNav />
      <v-spacer></v-spacer>
      <v-btn tile :color="color" @click="toggleGroupView">
        <span v-if="allGroups === true">My Groups</span>
        <span v-else>All Groups</span>
      </v-btn>
      <v-btn class="mx-4" dark color="deep-purple accent-4" @click="addGroup">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-row
          v-if="loaded"
          :align="alignment"
          :justify="justify"
          style="height: 300px;"
        >
          <v-card
            v-for="(group, i) in groupSet"
            :key="i"
            class="mx-auto my-2"
            max-width="400"
          >
            <v-img
              class="white--text align-end"
              height="200px"
              :src="group.image_url || defaultImage"
            >
              <v-card-title>{{ group.name }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0"
              >Group #{{ group.id }}</v-card-subtitle
            >

            <v-card-text class="text--primary">
              <div>{{ group.name }}</div>

              <div>{{ group.description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text @click="joinGroup(group.id)">
                Join
              </v-btn>

              <v-btn color="orange" text>
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
        <v-row
          v-else
          :align="alignment"
          :justify="justify"
          style="height: 300px;"
        >
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-row>
      </v-col>
    </v-row>
    <GroupsAddModal ref="addGroupModal" />
    <v-snackbar v-model="snackbar" :timeout="timeout" :top="top">
      {{ text }}
      <v-btn color="deep-purple accent-4" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GroupsNav from '~/components/GroupsNav'
import GroupsAddModal from '~/components/GroupsAddModal'
export default {
  components: {
    GroupsNav,
    GroupsAddModal
  },
  data() {
    return {
      color: 'deep-purple accent-4',
      alignment: 'end',
      justify: 'start',
      snackbar: false,
      timeout: 4000,
      text: '',
      top: true,
      allGroups: true,
      defaultImage:
        'https://vapor-us-east-1-assets-1591370629.s3.amazonaws.com/Social+media+(7)_Google.jpg'
    }
  },
  computed: {
    ...mapState('groups', ['groups', 'myGroups']),
    loaded() {
      return !!(this.groups && this.myGroups)
    },
    groupSet() {
      return this.allGroups ? this.groups : this.myGroups
    }
  },
  mounted() {
    this.getGroups()
    this.getMyGroups()
  },
  methods: {
    ...mapActions('groups', ['getGroups', 'getMyGroups']),
    addGroup() {
      this.$refs.addGroupModal.dialog = true
      this.groupsAddModal = true
    },
    async joinGroup(id) {
      try {
        const response = await this.$axios({
          method: 'post',
          url: `/api/groups/join/${id}`,
          headers: {
            Accept: 'application/json',
            Authortization: this.$auth.getToken('password_grant')
          }
        })
        this.text = response.data.message
        this.snackbar = true
      } catch (e) {
        this.text = 'You are already in this group!'
        this.snackbar = true
      }
    },
    toggleGroupView() {
      this.allGroups = !this.allGroups
    }
  }
}
</script>
