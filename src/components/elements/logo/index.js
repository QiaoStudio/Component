import Logo from './logo.vue'

Logo.install = function (Vue) {
  Vue.component(Logo.name, Logo)
}

export default Logo
