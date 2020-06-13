<template>
  <v-container fluid>
    <v-row>
      <v-col :justify="justify" :align="align">
        <v-toolbar :color="color" dense>
          LynkedUp Jobs
          <v-spacer></v-spacer>
          <v-autocomplete
            v-model="searchModel"
            class="mt-7"
            :items="entries"
            :loading="isLoading"
            :search-input.sync="search"
            :color="btnColor"
            hide-no-data
            hide-selected
            item-text="title"
            item-value="title"
            label="Search for Jobs"
            placeholder="Start typing to Search"
            prepend-icon="mdi-database-search"
            return-object
          ></v-autocomplete>
          <v-btn class="mx-2" :color="btnColor">
            <v-icon class="mr-2">mdi-set-center-right</v-icon>
            Match Me!
          </v-btn>
          <v-btn :color="btnColor" @click="activateJobModal">
            <v-icon class="mr-2">mdi-briefcase-plus</v-icon>
            Post Job
          </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row :height="height">
      <v-col cols="2" class="nav">
        <v-card class="mx-auto" max-width="400">
          <v-list>
            <v-list-item-group v-model="model" mandatory :color="btnColor">
              <v-list-item v-for="(navItem, i) in navItems" :key="i">
                <v-list-item-icon>
                  <v-icon v-text="navItem.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="navItem.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="10">
        <v-sheet
          color="grey darken-4"
          class="sheet"
          :width="width"
          :height="height"
        >
          <JobDisplayGrid :items="jobs" :active="model" />
        </v-sheet>
      </v-col>
    </v-row>
    <JobPostForm ref="postForm" />
  </v-container>
</template>

<script>
import JobPostForm from '@/components/JobPostForm.vue'
import JobDisplayGrid from '@/components/JobDisplayGrid.vue'
export default {
  components: {
    JobPostForm,
    JobDisplayGrid
  },
  data() {
    return {
      color: 'deep-purple accent-4',
      btnColor: 'deep-purple accent-2',
      justify: 'center',
      align: 'center',
      width: '100%',
      height: '100%',
      navItems: [
        {
          icon: 'mdi-fire',
          text: 'Hot Jobs'
        },
        {
          icon: 'mdi-home',
          text: 'Work From Home'
        },
        {
          icon: 'mdi-baby-face-outline',
          text: 'Work Life Balance'
        },
        {
          icon: 'mdi-bacteria-outline',
          text: 'COVID-19 Jobs'
        },
        {
          icon: 'mdi-file',
          text: 'My Applications'
        }
      ],
      model: 1,
      searchModel: null,
      descriptionLimit: 60,
      count: 0,
      entries: [],
      isLoading: false,
      search: null,
      myJobs: []
    }
  },
  computed: {
    fields() {
      if (!this.model) return []

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || 'n/a'
        }
      })
    },
    jobs() {
      if (this.searchModel) return [this.searchModel]
      return this.model === 4
        ? this.myJobs
        : this.entries.map((job) => {
            if (this.applied(job.id)) {
              job.applied = true
            }
            return job
          })
    }
  },
  watch: {
    search(val) {
      this.isLoading = true
      this.getJobs()
      this.loading = false
    }
  },
  mounted() {
    this.getJobs()
    this.getMyApplications()
    this.$on('job-posted', () => {
      this.getJobs()
      this.getMyApplications()
    })
  },
  methods: {
    async getJobs() {
      const response = await this.$axios({
        method: 'get',
        url: '/api/jobs',
        headers: {
          Authorization: this.$auth.getToken('password_grant')
        }
      }).catch((error) => console.log(error))
      this.entries = response.data.jobs
    },
    async getMyApplications() {
      const response = await this.$axios({
        method: 'get',
        url: '/api/jobs/me',
        headers: {
          Authorization: this.$auth.getToken('password_grant')
        }
      })
      this.myJobs = response.data.jobs
    },
    activateJobModal() {
      this.$refs.postForm.activateDialog()
    },
    applied(id) {
      return this.myJobs.map((job) => job.id).includes(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.sheet {
  padding: 20px;
}
</style>
