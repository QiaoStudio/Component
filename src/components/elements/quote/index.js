import Quote from './quote.vue'

Quote.install = function (Vue) {
  Vue.component(Quote.name, Quote)
}

export default Quote
