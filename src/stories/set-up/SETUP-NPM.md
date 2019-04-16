# Set Up Component By npm

## 1. Create a vuejs project
We can create a project with [vue-cli](https://cli.vuejs.org/) easily, if you have a vuejs project already, just skip this step.
```bash
vue create hello-world
```

## 2. Use Component in project
### 2.1 Create and check in a project-specific `.npmrc` file

Since some-component is a private npm package, we need to add a npm token.
```text
@somecomponent:registry=https://registry.npmjs.org
//registry.npmjs.org/:_authToken=${ReadOnlyToken}
```

> Please contact DP team to get a ${ReadOnlyToken} and copy above code to .npmrc file in project root directory. You can [click here](https://docs.npmjs.com/using-private-packages-in-a-ci-cd-workflow) for detail. For example, the `${ReadOnlyToken}` is `abcd-1234-efgh-5678`, the code in `.npmrc` is like the following:
```text
@somecomponent:registry=https://registry.npmjs.org
//registry.npmjs.org/:_authToken=abcd-1234-efgh-5678
```

### 2.2 Install some-component with npm

Installing with npm is recommended

```bash
npm i @somecomponent/some-component -S
```
> note: please make sure npm package `postcss-import`, `postcss-url` and `postcss-loader` are installed in the project

## 3. Quick start
We can choose either import on demand (see `3.1` section) or globally register (see `3.2` section).

### 3.1 import Component resource on demand
#### 3.1.1 import Component on demand example
1. Import basic Component resource: in main.js
  ```js
  import Vue from 'vue'
  import { installScreen } from '@somecomponent/some-component/dist/static/js/app'
  import '@somecomponent/some-component/dist/static/css/app.css'
  installScreen(Vue)
  ```
2. Add design com component in page: in App.vue
  ```html
  <template>
    <div>
      <dp-currency-input
        :max-length="120"
        :precision="0"
        label="Hello world"
        :disabled="false"
        currencyLabel="$"
        thousandSeparator=","
        decimalSeparator="."
        :errorStatus="false"
        :value="innerInputValue"
        @input="innerInput"
      />
      <dp-slider/>
    </div>
  </template>

  <script>
  import DpCurrencyInput from "@somecomponent/some-component/dist/static/js/dp-currency-input";
  import DpSlider from "@somecomponent/some-component/dist/static/js/dp-slider";
  export default {
    name: "app",
    components: {
      DpCurrencyInput,
      DpSlider
    },
    data() {
      return {
        innerInputValue: 1
      };
    },
    methods: {
      innerInput(value) {
        this.innerInputValue = value;
      }
    }
  };
  </script>

  <style>
  @import "~@somecomponent/some-component/dist/static/css/dp-currency-input.css";
  @import "~@somecomponent/some-component/dist/static/css/dp-slider.css";
  </style>
  ```

#### 3.1.2 Simplify the import
With the help of [babel-plugin-component](https://www.npmjs.com/package/babel-plugin-component), we can import components in an easier way.
#### 3.1.3 Steps for use babel-plugin-component in your project
1. Install babel-plugin-component:
```bash
npm i babel-plugin-component -D
```
2. Edit babel configuration file in `babel.config.js` (or `.babelrc`):
```js
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ["component", {
      "libraryName": "@somecomponent/some-component",
      "libDir": "dist/static/js",
      "styleLibrary": {
        "name": "../css",
        "base": false
      }
    }]
  ]
}
```
  > We use kebab case to name the component file in version 12.9.0 and above, please note that the configuration in `babel.config.js` (or `.babelrc`) is different between 12.9.0 and earlier. We should set `"camel2Dash": false` when design com version used is less than 12.9.0.

3. The component can like the following:
   ```html
   <template>
    <div>
      <dp-currency-input
        :max-length="120"
        :precision="0"
        label="Hello world"
        :disabled="false"
        currencyLabel="$"
        thousandSeparator=","
        decimalSeparator="."
        :errorStatus="false"
        :value="innerInputValue"
        @input="innerInput"
      />
      <dp-slider/>
    </div>
  </template>

  <script>
  import { DpCurrencyInput, DpSlider } from "@somecomponent/some-component";
  export default {
    name: "app",
    components: {
      DpCurrencyInput,
      DpSlider
    },
    data() {
      return {
        innerInputValue: 1
      };
    },
    methods: {
      innerInput(value) {
        this.innerInputValue = value;
      }
    }
  };
  </script>
  ```

#### 3.1.4 The main benefits of using `babel-plugin-component`
1. We can import components easier
  ```js
  // before:
  import DpCurrencyInput from "@somecomponent/some-component/dist/static/js/dp-currency-input";
  import DpSlider from "@somecomponent/some-component/dist/static/js/dp-slider";

  // after:
  import { DpCurrencyInput, DpSlider } from "@somecomponent/some-component";
  ```
2. The css was automatically loaded
  ```html
  <!-- before: -->
  <style>
  @import "~@somecomponent/some-component/dist/static/css/dp-currency-input.css";
  @import "~@somecomponent/some-component/dist/static/css/dp-slider.css";
  </style>

  <!-- after: -->
  <!-- do not need to import css manually -->
  ```

### 3.2 Globally register
You can globally register components in main.js. That means they can be used in the template of any root Vue instance (new Vue) created after registration. For example:

#### 3.2.1 How to register design com globally
1. register design com in main.js
```js
import Vue from 'vue'
import App from './App.vue'
import { DesignCom, installScreen } from '@somecomponent/some-component'
import '@somecomponent/some-component/dist/static/css/main.css'
installScreen(Vue)
Vue.use(DesignCom)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
```

2. in any component or page for example, App.vue
  ```html
   <template>
    <div>
      <dp-currency-input
        :max-length="120"
        :precision="0"
        label="Hello world"
        :disabled="false"
        currencyLabel="$"
        thousandSeparator=","
        decimalSeparator="."
        :errorStatus="false"
        :value="innerInputValue"
        @input="innerInput"
      />
      <dp-slider/>
    </div>
  </template>

  <script>
  export default {
    name: "app",
    data() {
      return {
        innerInputValue: 1
      };
    },
    methods: {
      innerInput(value) {
        this.innerInputValue = value;
      }
    }
  };
  </script>
  ```

#### 3.2.2 The main benefits of register design com globally
1. We can use design com components anywhere without import them manually.
  ```html
  <!-- import on demand: -->
  <template>
    <div>
      <dp-currency-input
        :max-length="120"
        :precision="0"
        label="Hello world"
        :disabled="false"
        currencyLabel="$"
        thousandSeparator=","
        decimalSeparator="."
        :errorStatus="false"
        :value="innerInputValue"
        @input="innerInput"
      />
      <dp-slider/>
    </div>
  </template>
  <script>
  import { DpCurrencyInput, DpSlider } from "@somecomponent/some-component";
  export default {
    components: {
      DpCurrencyInput,
      DpSlider
    },
    // ... other code
  }
  </script>

  <!-- Globally register: -->
  <template>
    <div>
      <dp-currency-input
        :max-length="120"
        :precision="0"
        label="Hello world"
        :disabled="false"
        currencyLabel="$"
        thousandSeparator=","
        decimalSeparator="."
        :errorStatus="false"
        :value="innerInputValue"
        @input="innerInput"
      />
      <dp-slider/>
    </div>
  </template>
  <script>
  export default {
    // do not need to import design com components
    // ... other code
  }
  </script>
  ```
