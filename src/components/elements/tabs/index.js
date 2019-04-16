import Tabs from './tabs.vue'
import TabItem from './tabItem.vue'

Tabs.install = function (Vue) {
  Vue.component(Tabs.name, Tabs)
  Vue.component(TabItem.name, TabItem)
}

export default Tabs
