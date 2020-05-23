<template>
  <v-card flat class="mx-auto">
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

    <v-card-actions>
      <v-btn text>Button</v-btn>
      <v-btn text>Button</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
