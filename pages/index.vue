<template>
  <div>
    {{ counter }}
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'

export default {
  auth: false,
  computed: {
    counter() {
      return this.$store.state.counter
    }
  }
}
</script>

<style lang="scss" scoped></style>
