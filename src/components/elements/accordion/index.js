import Accordion from './src/accordion.vue'

Accordion.install = function (Vue) {
  Vue.component(Accordion.name, Accordion)
}

export default Accordion
