export const state = () => ({
  groups: null,
  myGroups: null
})

export const mutations = {
  setGroups(state, groups) {
    state.groups = groups
  },
  addGroup(state, group) {
    state.groups.push(group)
  },
  setMyGroups(state, myGroups) {
    state.myGroups = myGroups
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
    commit('groups/addGroup', response.data.group, { root: true })
  },
  async getMyGroups({ commit }) {
    const response = await this.$axios({
      method: 'get',
      url: '/api/groups/me',
      headers: {
        Accept: 'application/json',
        Authorization: this.$auth.getToken('password_grant')
      }
    })
    commit('groups/setMyGroups', response.data.groups, { root: true })
  }
}
