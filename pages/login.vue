<template>
  <div class="wrapper">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '~/components/LoginForm'
export default {
  components: {
    LoginForm
  }
}
</script>

<style scoped>
.wrapper {
  margin-top: 50px;
}
</style>
