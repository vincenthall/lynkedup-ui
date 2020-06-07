<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Create Group</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="group.name"
                  label="Name *"
                  required
                  :color="color"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="group.image_url"
                  label="Image URL"
                  required
                  :color="color"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="group.description"
                  :color="color"
                  label="Description"
                  hint="Describe the group's primary focus."
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="color" text @click="dialog = false">Close</v-btn>
          <v-btn :color="color" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    color: 'deep-purple accent-4',
    dialog: false,
    group: {
      name: '',
      description: null,
      image_url: null
    }
  }),
  methods: {
    ...mapActions('groups', ['addGroup']),
    save() {
      this.addGroup(this.group)
      this.group = {
        name: '',
        description: null,
        image_url: null
      }
      this.dialog = false
    }
  }
}
</script>
