import { configure, setAddon } from '@storybook/vue'
import { withOptions } from '@storybook/addon-options'
import 'src/dependency'
import { StickyPosition } from 'src/directives'
import Vue from 'vue'
import { components } from 'src/register'
import moment from 'moment'
import Screen from 'utilities/screen'

let rootDom = document.querySelector('#root')
const app = new Vue()
Vue.use(Screen)
app.$mount(rootDom)

withOptions({
  name: 'Design Com',
  url: '',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
})

components.map((item) => {
  Vue.use(item)
})

Vue.use(StickyPosition)

function loadStories() {
  require('src/stories')
}

configure(loadStories, module)
