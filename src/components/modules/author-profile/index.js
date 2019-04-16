import AuthorProfile from './author-profile.vue'

AuthorProfile.install = function (Vue) {
  Vue.component(AuthorProfile.name, AuthorProfile)
}

export default AuthorProfile
