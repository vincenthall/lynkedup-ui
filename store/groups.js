export const state = () => ({
  groups: null
})

export const mutations = {
  setGroups(state, groups) {
    state.groups = groups
  },
  addGroup(state, group) {
    state.groups.push(group)
  }
}

export const actions = {
  async getGroups({ commit }) {
    const response = await this.$axios({
      method: 'GET',
      url: '/api/groups',
      headers: {
        Authorization: this.$auth.getToken('password_grant')
      }
    })
    commit('groups/setGroups', response.data, { root: true })
  },
  async addGroup({ commit }, group) {
    const response = await this.$axios({
      method: 'post',
      url: '/api/groups',
      headers: {
        Authorization: this.$auth.getToken('password_grant')
      },
      data: {
        name: group.name,
        description: group.description,
        image_url: group.image_url
      }
    })
    console.log(response.data)
    commit('groups/addGroup', response.data.group, { root: true })
  }
}
