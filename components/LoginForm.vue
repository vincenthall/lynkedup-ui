<template>
  <div class="wrapper">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="login.email"
        color="deep-purple accent-4"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="login.password"
        color="deep-purple accent-4"
        type="password"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        color="deep-purple accept-4"
        class="mr-4"
        @click="userLogin"
        >Login</v-btn
      >
    </v-form>
    <h1 v-show="message">{{ message }}</h1>
    <h1 v-show="loggedIn">{{ loggedIn }}</h1>
    <v-banner two-line class="banner">
      <v-avatar slot="icon" color="deep-purple accent-4" size="40">
        <v-icon icon="mdi-lock" color="white">
          mdi-lock
        </v-icon>
      </v-avatar>

      No Account?

      <template v-slot:actions>
        <v-btn text color="deep-purple accent-4" :to="registerUrl" router exact
          >Register</v-btn
        >
      </template>
    </v-banner>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    login: {
      email: '',
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
    registerUrl: '/register'
  }),
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    }
  },
  methods: {
    async userLogin() {
      try {
        const response = await this.$auth.loginWith('laravel.passport', {
          data: this.login
        })
        this.response = response
      } catch (err) {
        this.message = err
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 30%;
  margin: 0 auto;
}
.banner {
  margin-top: 40px;
}
</style>
