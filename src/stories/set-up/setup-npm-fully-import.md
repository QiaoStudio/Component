
### Globally register
You can globally register components in main.js. That means they can be used in the template of any root Vue instance (new Vue) created after registration. For example:

register design com in main.js
```js
import Vue from 'vue'
import App from './App.vue'
import { install, installScreen } from '@somecomponent/some-component/dist/static/js/app'
import '@somecomponent/some-component/dist/static/css/app.css'
installScreen(Vue)
install(Vue)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
```

in App.vue
```html
<div id="app">
  <dp-button class="dp-button--primary">button</dp-button>
  <dp-currency-input>test</dp-currency-input>
  <dp-brand/>
  <dp-slider/>
</div>
```

### In specific component

You can import your components as plain JavaScript objects. Then define the components you’d like to use in a components option.

```js
import Vue from 'vue'
import App from './App.vue'
import installScreen from '@somecomponent/some-component'
import '@somecomponent/some-component/dist/static/css/main.css'

Vue.use(installScreen)

new Vue({
  el: '#app'
})
```

```html
<template>
  <div class="design-demo-wrapper">
    <dp-button class="dp-button--primary">button</dp-button>
    <dp-currency-input>test</dp-currency-input>
    <dp-brand/>
    <dp-slider/>
  </div>
</template>
<script>
import {
  DpButton,
  DpCurrencyInput,
  DpBrand,
  DpSlider
} from '@somecomponent/some-component'

export default {
  name: 'design-demo',
  components: {
    DpButton,
    DpCurrencyInput,
    DpBrand,
    DpSlider,
  }
}
</script>
```
