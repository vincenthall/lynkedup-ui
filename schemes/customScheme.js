import LocalScheme from '@nuxtjs/auth/lib/schemes/local'

export default class CustomScheme extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  async fetchUser(endpoint) {
    // Token is required but not available
    if (this.options.tokenRequired && !this.$auth.getToken(this.name)) {
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }

    // Try to fetch user
    const user = await this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    )

    // Transform the user object
    const customUser = {
      ...user,
      fullName: user.firstName + ' ' + user.lastName,
      roles: ['user']
    }

    // Set the custom user
    // The `customUser` object will be accessible through `this.$auth.user`
    // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
    this.$auth.setUser(customUser)
  }
}
