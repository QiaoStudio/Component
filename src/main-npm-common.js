// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'src/dependency'
import { StickyPosition } from 'src/directives'
import Screen from 'utilities/screen'
let registerObj = {}

const installScreen = function (Vue) {
  Vue.use(Screen)
}

registerObj = Object.assign({
  installScreen,
  StickyPosition
}, registerObj)

module.exports = registerObj
