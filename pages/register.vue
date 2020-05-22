<template>
  <v-layout column justify-center align-center>
    <div class="reg-form">
      <RegistrationForm />
    </div>
  </v-layout>
</template>

<script>
import RegistrationForm from '~/components/RegistrationForm'

export default {
  components: {
    RegistrationForm
  }
}
</script>

<style scoped>
.reg-form {
  margin-top: 100px;
}
</style>
