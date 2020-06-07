<template>
  <div>
    <v-btn-toggle v-model="text" tile color="deep-purple accent-4" group>
      <v-btn
        v-for="(category, idx) in categories"
        :key="idx"
        :value="category.name"
      >
        {{ category.name }}
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'Business',
      categories: [
        {
          name: 'Business',
          description: 'Groups related to various business sectors'
        },
        {
          name: 'Technology',
          description: 'Groups related to various technologies'
        },
        {
          name: 'Psychology',
          description: 'Groups related to psychology'
        }
      ]
    }
  }
}
</script>
