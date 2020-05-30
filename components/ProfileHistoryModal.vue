<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">New Work History</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="inputs.orgName"
                  label="Organization Name"
                  :color="color"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="inputs.jobTitle"
                  label="Job Title"
                  :color="color"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <!-- start date picker starts -->
                <v-menu
                  ref="startDateMenu"
                  v-model="startDateMenu"
                  :close-on-content-click="false"
                  :return-value.sync="inputs.startDate"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="inputs.startDate"
                      label="Start Date"
                      prepend-icon="mdi-calendar-month"
                      :color="color"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="inputs.startDate"
                    type="month"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text :color="color" @click="startDateMenu = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      :color="color"
                      @click="$refs.startDateMenu.save(inputs.startDate)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
                <!-- start date picker ends -->
              </v-col>
              <v-col cols="12" sm="6">
                <!-- end date picker starts -->
                <v-date-picker
                  v-model="inputs.endDate"
                  label="End Date"
                ></v-date-picker>
                <!-- end date picker ends -->
              </v-col>
              <v-col cols="12" sm="12">
                <v-autocomplete
                  :items="[
                    'Skiing',
                    'Ice hockey',
                    'Soccer',
                    'Basketball',
                    'Hockey',
                    'Reading',
                    'Writing',
                    'Coding',
                    'Basejump'
                  ]"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="color" text @click="dialog = false">Close</v-btn>
          <v-btn :color="color" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    color: 'deep-purple accent-4',
    inputs: {
      orgName: '',
      jobTitle: '',
      startDate: new Date().toISOString().substr(0, 7),
      endDate: new Date().toISOString().substr(0, 7),
      description: ''
    },
    startDateMenu: false,
    endDateMenu: false
  }),
  methods: {
    activateDialog() {
      this.dialog = true
    }
  }
}
</script>
