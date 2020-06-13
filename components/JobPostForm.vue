<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">New Job Posting</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="inputs.title"
                  label="Job Title*"
                  :color="color"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="inputs.type"
                  :items="items"
                  :color="color"
                  label="Job Type*"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="inputs.organization"
                  label="Organization Name*"
                  :color="color"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="inputs.description"
                  :color="color"
                  label="Description*"
                  hint="Please provide a thorough description of job duties and expectations."
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="inputs.salary_start"
                  label="Salary Range Start*"
                  :color="color"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="inputs.salary_end"
                  label="Salary Range End*"
                  :color="color"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :color="color" text @click="dialog = false">Close</v-btn>
          <v-btn :color="color" text @click="postJob">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    color: 'deep-purple accent-4',
    inputs: {
      title: '',
      organization: '',
      description: '',
      type: null,
      salary_start: null,
      salary_end: null
    },
    dialog: false,
    data: null,
    items: ['Full-time', 'Part-time', 'Contract']
  }),
  methods: {
    activateDialog() {
      this.dialog = true
    },
    async postJob() {
      const response = await this.$axios({
        method: 'post',
        url: '/api/jobs',
        headers: {
          Accept: 'application/json',
          Authorization: this.$auth.getToken('password_grant')
        },
        data: this.inputs
      })
      this.data = response.data.job
      this.inputs = {
        title: '',
        organization: '',
        description: '',
        type: null,
        salary_start: null,
        salary_end: null
      }
      this.$parent.$emit('job-posted')
      this.dialog = false
    }
  }
}
</script>
