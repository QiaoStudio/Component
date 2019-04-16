import AccordionGroup from './src/accordion-group.vue'

AccordionGroup.install = function(Vue) {
  Vue.component(AccordionGroup.name, AccordionGroup)
}

export default AccordionGroup
