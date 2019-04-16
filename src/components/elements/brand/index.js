import Brand from './brand.vue'

Brand.install = function (Vue) {
  Vue.component(Brand.name, Brand)
}

export default Brand
