<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        name="name"
        :color="color"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        name="email"
        :color="color"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        name="password"
        :color="color"
        :rules="passwordRules"
        label="Password"
        type="password"
        required
      ></v-text-field>

      <v-text-field
        v-model="passwordConfirm"
        name="password_confirmation"
        :color="color"
        :rules="passwordRules"
        label="Confirm Password"
        type="password"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        color="deep-purple"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="Do you agree to the terms and conditions?"
        required
      ></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="deep-purple accent-4"
        class="mr-4"
        @click="register"
        >Register</v-btn
      >
    </v-form>
    <div v-show="response" class="wrapper">{{ message }}</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 40) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Password',
      (v) => /[a-zA-Z0-9]/.test(v) || 'Password must be valid'
    ],
    passwordConfirm: '',
    confirmRules: [
      (v) => !!v || 'Password',
      (v) => v === this.password || 'Passwords must match!'
    ],
    select: null,
    checkbox: false,
    color: 'deep-purple accent-4',
    response: null,
    message: null
  }),

  methods: {
    async register() {
      try {
        const res = await this.$axios({
          method: 'POST',
          url: process.env.LARAVEL_ENDPOINT + '/api/register',
          headers: {
            Accept: 'application/json'
          },
          data: {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirm
          }
        })
        this.response = res.data
        this.message = res.data.message
        this.status = res.status
      } catch (e) {
        this.message = e.message
      }
    }
  }
}
</script>
