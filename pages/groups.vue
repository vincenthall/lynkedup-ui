<template>
  <v-container fluid>
    <v-row>
      <GroupsNav />
      <v-spacer></v-spacer>
      <v-btn tile :color="color">
        My Groups
      </v-btn>
      <v-btn class="mx-4" dark color="deep-purple accent-4" @click="addGroup">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-row :align="alignment" :justify="justify" style="height: 300px;">
          <v-card
            v-for="(group, i) in groups"
            :key="i"
            class="mx-auto"
            max-width="400"
          >
            <v-img
              class="white--text align-end"
              height="200px"
              :src="group.image_url"
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
              <v-btn color="orange" text>
                Join
              </v-btn>

              <v-btn color="orange" text>
                Explore
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
    <GroupsAddModal ref="addGroupModal" />
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
      alignment: 'center',
      justify: 'center'
    }
  },
  computed: {
    ...mapState('groups', ['groups'])
  },
  mounted() {
    this.getGroups()
  },
  methods: {
    ...mapActions('groups', ['getGroups']),
    addGroup() {
      this.$refs.addGroupModal.dialog = true
      this.groupsAddModal = true
    }
  }
}
</script>
