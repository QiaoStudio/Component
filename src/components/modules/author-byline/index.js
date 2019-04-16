import AuthorByline from './author-byline.vue'

AuthorByline.install = function (Vue) {
  Vue.component(AuthorByline.name, AuthorByline)
}

export default AuthorByline
