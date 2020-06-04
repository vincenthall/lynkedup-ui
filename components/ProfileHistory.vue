<template>
  <div class="wrapper">
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackbarText }}
      <v-btn :color="color" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-banner>
      <v-avatar slot="icon" :color="color" size="40">
        <v-icon icon="mdi-lock" color="white">
          mdi-domain
        </v-icon>
      </v-avatar>
      Work History
      <template v-slot:actions>
        <v-btn text :color="color" @click="activateDialog"
          >Add Work History</v-btn
        >
      </template>
    </v-banner>
    <v-card class="mx-auto">
      <v-list two-line>
        <v-list-item-group v-model="selected" active-class="deep-purple">
          <template v-for="(item, index) in history">
            <v-list-item :key="item.index" @click="activateEntryDialog(item)">
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
                  <div v-if="item.end_date !== 'current'">
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
    <ProfileHistoryEntryModal ref="entryModal" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ProfileHistoryModal from '~/components/ProfileHistoryModal'
import ProfileHistoryEntryModal from '~/components/ProfileHistoryEntryModal'

export default {
  components: {
    ProfileHistoryModal,
    ProfileHistoryEntryModal
  },
  data: () => ({
    selected: [2],
    items: [],
    snackbar: false,
    snackbarText: '',
    timeout: 2500,
    color: 'deep-purple accent-4',
    currentItem: null,
    entryModal: false
  }),
  mounted() {
    this.fetchAndValidateHistory()
    this.$on('history-success', this.historySuccess)
    this.$on('history-failed', this.historyFailed)
  },
  computed: {
    ...mapState('profile', ['history'])
  },
  methods: {
    ...mapActions('profile', ['fetchAndValidateHistory']),
    activateDialog() {
      this.$refs.modal.activateDialog()
    },
    activateEntryDialog(item) {
      this.currentItem = item
      this.$refs.entryModal.activateDialog(item)
    },
    historySuccess(message) {
      this.fetchAndValidateHistory()
      this.snackbarText = message
      this.snackbar = true
    },
    historyFailed(message) {
      this.snackbarText = message
      this.snackbarText = true
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
