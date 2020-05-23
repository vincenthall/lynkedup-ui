<template>
  <section class="container">
    <Profile />
  </section>
</template>

<script>
import Profile from '~/components/Profile'
export default {
  components: {
    Profile
  },
  middleware: 'auth',
  data() {
    return {
      strategy: this.$auth.$storage.getUniversal('strategy')
    }
  }
}
</script>
