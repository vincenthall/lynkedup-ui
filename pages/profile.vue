<template>
  <section class="container">
    <ProfileForm />
    <div>
      <strong>Strategy</strong>
      <pre>{{ strategy }}</pre>
    </div>
    <div>
      <strong>User</strong>
      <pre>{{ $auth.user }}</pre>
    </div>
    <button class="btn btn-primary" @click="logout">
      Logout
    </button>
    <h1>{{ this.$auth.loggedIn }}</h1>
  </section>
</template>

<script>
import ProfileForm from '~/components/ProfileForm'
export default {
  components: {
    ProfileForm
  },
  middleware: 'auth',
  data() {
    return {
      strategy: this.$auth.$storage.getUniversal('strategy')
    }
  },
  mounted() {},
  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>
