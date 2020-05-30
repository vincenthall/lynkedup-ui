<template>
  <div class="wrapper">
    <v-banner>
      <v-avatar slot="icon" color="deep-purple accent-4" size="40">
        <v-icon icon="mdi-lock" color="white">
          mdi-domain
        </v-icon>
      </v-avatar>
      Work History
      <template v-slot:actions>
        <v-btn text color="deep-purple accent-4" @click="activateDialog"
          >Add Work History</v-btn
        >
      </template>
    </v-banner>
    <v-card class="mx-auto">
      <v-list two-line>
        <v-list-item-group v-model="selected" active-class="deep-purple">
          <template v-for="(item, index) in items">
            <v-list-item :key="item.id">
              <template>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.job_title"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="item.org_name"
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-text="item.description"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text
                    v-text="`${item.start_date} - ${item.end_date || ''}`"
                  ></v-list-item-action-text>
                  <div v-if="!item.current">
                    <v-icon color="grey lighten-1">
                      mdi-star
                    </v-icon>
                  </div>
                  <div v-else>
                    <span class="current-job">Currently works here</span>
                    <v-icon color="yellow">
                      mdi-star
                    </v-icon>
                  </div>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
    <ProfileHistoryModal ref="modal" />
  </div>
</template>

<script>
import ProfileHistoryModal from '~/components/ProfileHistoryModal'
export default {
  components: {
    ProfileHistoryModal
  },
  data: () => ({
    selected: [2],
    items: []
  }),
  mounted() {
    this.getHistory()
  },
  methods: {
    async getHistory() {
      const response = await this.$axios({
        method: 'GET',
        url: process.env.LARAVEL_ENDPOINT + '/api/jobhistory',
        headers: {
          Authorization: this.$auth.getToken('password_grant')
        }
      })
      this.items = this.validateJobHistory(response.data)
    },
    validateJobHistory(data) {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      const validated = data.map((data) => {
        const startDate = new Date(data.start_date)
        const endDate = new Date(data.end_date)
        data.start_date = `${
          months[startDate.getMonth()]
        } ${startDate.getFullYear()}`
        data.end_date = data.end_date
          ? `${months[endDate.getMonth()]} ${endDate.getFullYear()}`
          : 'current'
        return data
      })
      return validated
    },
    activateDialog() {
      this.$refs.modal.activateDialog()
    }
  }
}
</script>

<style scoped>
.wrapper {
  width: 80%;
  margin: 20px auto;
}
.wrapper {
  padding: 0px 0px 40px 0px;
}
.current-job {
  font-size: 0.8rem;
}
</style>
