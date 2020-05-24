<template>
  <div class="wrapper">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="user.username"
        name="email"
        color="deep-purple accent-4"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.password"
        color="deep-purple accent-4"
        type="password"
        name="password"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>
      <v-btn
        color="deep-purple accept-4"
        class="mr-4"
        @click="passwordGrantLogin"
        >Login</v-btn
      >
    </v-form>
    <v-banner two-line class="banner">
      <v-avatar slot="icon" color="deep-purple accent-4" size="40">
        <v-icon icon="mdi-lock" color="white">mdi-lock</v-icon> </v-avatar
      >No Account?
      <template v-slot:actions>
        <v-btn text color="deep-purple accent-4" :to="registerUrl" router exact
          >Register</v-btn
        >
      </template>
    </v-banner>
    <div class="text-center">
      <v-snackbar v-model="snackbar" :timeout="timeout" top="true">
        {{ text }}
        <v-btn color="deep-purple accent-4" text @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  auth: false,
  data: () => ({
    valid: true,
    user: {
      username: '',
      password: ''
    },
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [
      (v) => !!v || 'Name is required',
      (v) => /[a-zA-Z0-9]/.test(v) || 'Password must be valid.'
    ],
    response: null,
    message: '',
    status: null,
    registerUrl: '/register',
    snackbar: false,
    text: '',
    timeout: 4000
  }),
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    }
  },
  methods: {
    async passwordGrantLogin() {
      try {
        await this.$auth.loginWith('password_grant', {
          data: {
            grant_type: 'password',
            client_id: process.env.PASSPORT_PASSWORD_GRANT_ID,
            client_secret: process.env.PASSPORT_PASSWORD_GRANT_SECRET,
            scope: '',
            username: this.user.username,
            password: this.user.password
          }
        })
      } catch (e) {
        this.text = 'Invalid credentials. Check your username or password.'
        this.snackbar = true
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 50%;
  margin: 30px auto;
}
.banner {
  margin-top: 40px;
}
</style>
