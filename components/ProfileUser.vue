<template>
  <v-card flat class="mx-auto">
    <v-snackbar v-model="snackbar" :timeout="snackbarTimeout">
      {{ snackbarText }}
      <v-btn color="deep-purple" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">USER PROFILE</div>
        <v-list-item-title class="headline mb-1">{{
          $auth.user.name
        }}</v-list-item-title>
        <v-list-item-subtitle
          >LynkedUp since {{ memberSince }}</v-list-item-subtitle
        >
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>
    <div class="profile-inputs">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            :value="user.name"
            label="Name"
            color="deep-purple"
            outlined
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            :value="user.email"
            label="Primary Email"
            color="deep-purple"
            outlined
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            v-model="fields.status"
            label="What's your status?"
            color="deep-purple"
            outlined
            @blur="updateProfile"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            v-model="fields.jobTitle"
            label="Job Title"
            color="deep-purple"
            outlined
            @blur="updateProfile"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="12">
          <v-textarea
            v-model="fields.about"
            outlined
            name="input-7-4"
            label="About Me"
            color="deep-purple"
            @blur="updateProfile"
          ></v-textarea>
        </v-col>
      </v-row>
    </div>
    <v-card-actions>
      <v-btn text>Button</v-btn>
      <v-btn text>Button</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      fields: {
        about: '',
        status: '',
        jobTitle: ''
      },
      user: this.$auth.user,
      profileData: null,
      asyncMessage: '',
      snackbar: false,
      snackbarText: '',
      snackbarTimeout: 2500
    }
  },
  computed: {
    memberSince() {
      return new Date(this.$auth.user.created_at).toLocaleDateString()
    }
  },
  mounted() {
    this.getProfile()
  },
  methods: {
    async getProfile() {
      const response = await this.$axios({
        method: 'get',
        url: process.env.LARAVEL_ENDPOINT + '/api/profile',
        headers: {
          Authorization: this.$auth.getToken('password_grant')
        }
      })
      this.profileData = response.data
      this.fields.about = response.data.about ?? ''
      this.fields.status = response.data.status ?? ''
      this.fields.jobTitle = response.data.job_title ?? ''
    },
    async updateProfile() {
      try {
        const response = await this.$axios({
          method: 'patch',
          url: process.env.LARAVEL_ENDPOINT + '/api/profile',
          headers: {
            Authorization: this.$auth.getToken('password_grant')
          },
          data: {
            about: this.fields.about,
            jobTitle: this.fields.jobTitle,
            status: this.fields.status
          }
        })
        this.asyncMessage = response.data.message
        // snackbar
        this.snackbarText = response.data.message
        this.snackbar = true
      } catch (e) {
        this.snackbarText = e.message
        this.snackbar = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-inputs {
  margin-top: 30px;
}
</style>
