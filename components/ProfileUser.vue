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
        <v-col cols="12" sm="12">
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
      <v-divider></v-divider>
      <v-row>
        <v-col>
          <v-icon>mdi-home-city</v-icon
          ><span class="section-header">Demographics</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            v-model="fields.address.street"
            label="Street Address"
            color="deep-purple"
            outlined
            @blur="updateProfile"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="fields.address.city"
            label="City"
            color="deep-purple"
            outlined
            @blur="updateProfile"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-select
            v-model="fields.address.state"
            :items="states"
            color="deep-purple"
            label="State"
            outlined
            @blur="updateProfile"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="fields.address.zip"
            label="Zip"
            color="deep-purple"
            outlined
            @blur="updateProfile"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm></v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      fields: {
        about: '',
        status: '',
        jobTitle: '',
        address: {
          street: '',
          city: '',
          state: '',
          zip: ''
        }
      },
      user: this.$auth.user,
      profileData: null,
      asyncMessage: '',
      snackbar: false,
      snackbarText: '',
      snackbarTimeout: 2500,
      states: [
        'AK - Alaska',
        'AL - Alabama',
        'AR - Arkansas',
        'AS - American Samoa',
        'AZ - Arizona',
        'CA - California',
        'CO - Colorado',
        'CT - Connecticut',
        'DC - District of Columbia',
        'DE - Delaware',
        'FL - Florida',
        'GA - Georgia',
        'GU - Guam',
        'HI - Hawaii',
        'IA - Iowa',
        'ID - Idaho',
        'IL - Illinois',
        'IN - Indiana',
        'KS - Kansas',
        'KY - Kentucky',
        'LA - Louisiana',
        'MA - Massachusetts',
        'MD - Maryland',
        'ME - Maine',
        'MI - Michigan',
        'MN - Minnesota',
        'MO - Missouri',
        'MS - Mississippi',
        'MT - Montana',
        'NC - North Carolina',
        'ND - North Dakota',
        'NE - Nebraska',
        'NH - New Hampshire',
        'NJ - New Jersey',
        'NM - New Mexico',
        'NV - Nevada',
        'NY - New York',
        'OH - Ohio',
        'OK - Oklahoma',
        'OR - Oregon',
        'PA - Pennsylvania',
        'PR - Puerto Rico',
        'RI - Rhode Island',
        'SC - South Carolina',
        'SD - South Dakota',
        'TN - Tennessee',
        'TX - Texas',
        'UT - Utah',
        'VA - Virginia',
        'VI - Virgin Islands',
        'VT - Vermont',
        'WA - Washington',
        'WI - Wisconsin',
        'WV - West Virginia',
        'WY - Wyoming'
      ]
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
      this.fields.address.street = response.data.street ?? ''
      this.fields.address.city = response.data.city ?? ''
      const [state] = this.states.filter((el) =>
        el.includes(response.data.state) ? el : null
      )
      this.fields.address.state = state
      this.fields.address.zip = response.data.zip ?? ''
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
            status: this.fields.status,
            street: this.fields.address.street,
            city: this.fields.address.city,
            state: this.fields.address.state,
            zip: this.fields.address.zip
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
.section-header {
  margin-left: 10px;
}
</style>
