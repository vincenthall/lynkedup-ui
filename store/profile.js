export const state = () => ({
  currentItem: null,
  history: null,
  profile: null
})

export const mutations = {
  setCurrentItem(state, item) {
    state.currentItem = item
  },
  setHistory(state, history) {
    state.history = history
  },
  setProfile(state, profile) {
    state.profile = profile
  }
}

export const actions = {
  async getHistory() {
    const response = await this.$axios({
      method: 'GET',
      url: process.env.LARAVEL_ENDPOINT + '/api/jobhistory',
      headers: {
        Authorization: this.$auth.getToken('password_grant')
      }
    })
    return response.data
  },
  validateHistory({ commit }, data) {
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
      data.start_date_actual = data.start_date
      data.end_date_actual = data.end_date
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
  async fetchAndValidateHistory({ commit, dispatch }) {
    const history = await dispatch('profile/getHistory', null, { root: true })
    const validated = await dispatch('profile/validateHistory', history, {
      root: true
    })
    commit('profile/setHistory', validated, { root: true })
  },
  setCurrentItem({ commit }, item) {
    commit('profile/setCurrentItem', item, { root: true })
  },
  async getProfile({ commit }) {
    const response = await this.$axios({
      method: 'get',
      url: '/api/profile',
      headers: {
        Authorization: this.$auth.getToken('password_grant')
      }
    })

    const inputs = {
      address: {}
    }
    inputs.profileData = response.data
    inputs.about = response.data.about ?? ''
    inputs.status = response.data.status ?? ''
    inputs.jobTitle = response.data.job_title ?? ''
    inputs.address.street = response.data.street ?? ''
    inputs.address.city = response.data.city ?? ''
    inputs.address.state = response.data.state ?? ''
    inputs.address.zip = response.data.zip ?? ''
    commit('profile/setProfile', inputs, { root: true })
  }
}

// state, mutations, getters (computed for vuex), actions
