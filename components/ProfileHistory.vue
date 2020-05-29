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
        <v-btn text color="deep-purple accent-4">Add Work History</v-btn>
      </template>
    </v-banner>
    <v-card class="mx-auto">
      <v-list two-line>
        <v-list-item-group v-model="selected" active-class="deep-purple">
          <template v-for="(item, index) in items">
            <v-list-item :key="item.id">
              <template>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="item.organization"
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-text="item.description"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text
                    v-text="`${item.startDate} - ${item.endDate}`"
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
  </div>
</template>

<script>
export default {
  data: () => ({
    selected: [2],
    items: [
      {
        id: 1,
        title: 'Senior Software Engineer',
        organization: 'Engineering Co.',
        startDate: 'May, 2020',
        endDate: 'present',
        description:
          'I use JavaScript and PHP to build open-source civic tech.',
        current: true
      },
      {
        id: 2,
        action: 'SharePoint Administrator',
        headline: 'Summer BBQ',
        title: 'me, Scrott, Jennifer',
        subtitle: "Wish I could come, but I'm out of town this weekend."
      }
    ]
  })
}
</script>

<style scoped>
.wrapper {
  width: 50%;
  margin: 20px auto;
}
.wrapper {
  padding: 0px 0px 40px 0px;
}
.current-job {
  font-size: 0.8rem;
}
</style>
