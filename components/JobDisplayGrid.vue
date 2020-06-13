<template>
  <v-card class="mx-auto" color="grey darken-4" flat>
    <v-container class="pa-1">
      <v-item-group v-model="selected" multiple>
        <v-row>
          <v-col v-for="(item, i) in items" :key="i" cols="12" md="6">
            <v-item v-slot:default="{ active, toggle }">
              <v-card
                outlined
                :hover="true"
                height="150"
                class="px-5 py-1"
                @click="toggle"
              >
                <v-row align="center">
                  <span class="card-title">{{ item.title }}</span>
                  <v-spacer></v-spacer>
                  <v-btn icon dark>
                    <v-icon>
                      {{ active ? 'mdi-heart' : 'mdi-heart-outline' }}
                    </v-icon>
                  </v-btn>
                </v-row>
                <v-row>
                  <span class="card-description">{{ item.description }}</span>
                </v-row>
                <v-row>
                  <v-col cols="6" sm="6">
                    <span class="card-salary"
                      >${{ item.salary_start }} - ${{ item.salary_end }} per
                      year</span
                    >
                  </v-col>
                </v-row>
                <v-row>
                  Posted by:
                  <span class="card-org">{{ item.organization }}</span>
                  <v-spacer></v-spacer>
                  <v-btn
                    v-if="!item.applied && !myApplications"
                    small
                    @click.stop="apply(item.id)"
                    >Quick Apply</v-btn
                  >
                  <v-btn
                    v-else-if="!myApplications"
                    small
                    disabled
                    @click.stop="apply(item.id)"
                    >Application Sent!</v-btn
                  >
                </v-row>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: null
    },
    active: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    selected: [],
    response: null
  }),
  computed: {
    myApplications() {
      return this.active === 4
    }
  },
  methods: {
    async apply(id) {
      const response = await this.$axios({
        method: 'patch',
        url: `/api/jobs/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: this.$auth.getToken('password_grant')
        },
        data: {
          user: this.$auth.user.id,
          job: id
        }
      })
      this.response = response.data
      this.$parent.$on('job-posted')
    }
  }
}
</script>

<style scoped>
.card-title {
  font-size: 1.3rem;
  font-weight: 700;
}
.card-description {
  font-weight: 300;
}
.card-org {
  font-weight: 700;
  margin-left: 8px;
}
</style>
