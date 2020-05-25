<template>
  <v-expansion-panel>
    <v-expansion-panel-header>#{{ id }} | {{ name }}</v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-row>
        <v-col cols="12" sm="3">
          <v-switch
            v-model="admin"
            :input-value="admin"
            :flat="flat"
            :inset="inset"
            :color="color"
            label="Admin"
            @change="updateUser"
          ></v-switch>
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model="name"
            label="Name"
            outlined
            :color="color"
            @blur="updateUser"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="5">
          <v-text-field
            v-model="email"
            label="Email"
            outlined
            :color="color"
            @blur="updateUser"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6"> Created: {{ createdAt }} </v-col>
        <v-col cols="12" sm="6"> Updated: {{ updatedAt }} </v-col>
      </v-row>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      color: 'deep-purple accent-4',
      flat: true,
      inset: true,
      id: this.user.id,
      name: this.user.name,
      admin: this.user.admin,
      email: this.user.email,
      createdAt: new Date(this.user.created_at),
      updatedAt: new Date(this.user.updated_at),
      message: null,
      response: null
    }
  },
  methods: {
    async updateUser() {
      try {
        const response = await this.$axios({
          method: 'PATCH',
          url: process.env.LARAVEL_ENDPOINT + `/api/users/${this.user.id}`,
          headers: {
            Authorization: this.$auth.getToken('password_grant')
          },
          data: {
            name: this.name,
            email: this.email,
            admin: this.admin
          }
        })
        console.log(response.data.user)
        this.message = response.data.message
      } catch (e) {
        this.message = e.message
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
