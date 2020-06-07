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
                  requiredge
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
                      required
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
                <v-menu
                  ref="endDateMenu"
                  v-model="endDateMenu"
                  :close-on-content-click="false"
                  :return-value.sync="inputs.endDate"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="inputs.endDate"
                      label="End Date"
                      prepend-icon="mdi-calendar-month"
                      :color="color"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="inputs.endDate"
                    type="month"
                    no-title
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn text :color="color" @click="endDateMenu = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      :color="color"
                      @click="$refs.endDateMenu.save(inputs.endDate)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
                <!-- end date picker ends -->
              </v-col>
              <v-col cols="12" sm="12">
                <v-textarea
                  v-model="inputs.description"
                  label="Description"
                  hint="A description of work responsibilities and achievements."
                  :color="color"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="deleteHistoryEntry">Delete</v-btn>
          <v-btn :color="color" text @click="updateHistoryEntry">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({
    dialog: false,
    color: 'deep-purple accent-4',
    inputs: {
      id: null,
      orgName: '',
      jobTitle: '',
      startDate: null,
      endDate: null,
      description: ''
    },
    item: null,
    startDateMenu: false,
    endDateMenu: false
  }),
  computed: {
    ...mapState('profile', ['history', 'currentItem'])
  },
  methods: {
    activateDialog() {
      const currentItem = this.history.find(
        (entry) => entry.id === this.currentItem
      )
      let item = JSON.parse(JSON.stringify(currentItem)) // TODO: This can't be right
      item = this.formatDates(item)
      this.inputs.id = item.id
      this.inputs.orgName = item.org_name
      this.inputs.jobTitle = item.job_title
      this.inputs.startDate = item.start_date
      this.inputs.endDate = item.end_date
      this.inputs.description = item.description
      this.dialog = true
    },
    formatDates(item) {
      const startDate = new Date(item.start_date_actual)
      const endDate = new Date(item.end_date_actual)
      const startYear = startDate.getFullYear()
      const endYear = endDate.getFullYear()
      const startMonth =
        startDate.getMonth().toString().length > 1
          ? startDate.getMonth()
          : `0${startDate.getMonth()}`
      const endMonth =
        endDate.getMonth().toString().length > 1
          ? endDate.getMonth()
          : `0${endDate.getMonth()}`
      item.start_date = `${startYear}-${startMonth}`
      item.end_date = `${endYear}-${endMonth}`
      return item
    },
    async updateHistoryEntry() {
      this.dialog = false
      try {
        await this.$axios({
          method: 'patch',
          url: '/api/jobhistory/' + this.inputs.id,
          headers: {
            Authorization: this.$auth.getToken('password_grant')
          },
          data: {
            orgName: this.inputs.orgName,
            jobTitle: this.inputs.jobTitle,
            startDate: new Date(this.inputs.startDate),
            endDate: this.inputs.endDate ? new Date(this.inputs.endDate) : null,
            description: this.inputs.description
          }
        })
        this.$parent.$emit('history-success', 'Entry updated successfully.')
      } catch (e) {
        this.$parent.$emit('history-failed', 'Entry failed to save.')
      }
    },
    async deleteHistoryEntry() {
      this.dialog = false
      try {
        await this.$axios({
          method: 'delete',
          url: '/api/jobhistory/' + this.inputs.id,
          headers: {
            Authorization: this.$auth.getToken('password_grant')
          }
        })
        this.$parent.$emit('history-success', 'Record successfully deleted.')
      } catch (e) {
        this.$parent.$emit('history-failed', 'Failed to delete record.')
      }
    }
  }
}
</script>
