# Checkbox

### Basic Usage

```js
<template>
  <dp-checkbox v-model="checkbox" label="1">Option A</dp-checkbox>
  <dp-checkbox v-model="checkbox" label="2">Option B</dp-checkbox>
</template>

<script>
  export default {
    data () {
      return {
        checkbox: '1'
      };
    }
  }
</script>
```
### Preview
<!-- STORY -->

### Properties

| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| label        | string/number/boolean | _            | √          | the value of checkbox |
| value        | string/number | _            | √          | sets or returns the value of the value attribute of checkbox |
| disabled     | boolean       | false        | x          | whether Checkbox is disabled |
| name         | string        | _            | √          | native 'name' attribute |
| errorMessage | string        | _            | x          | error message |
| errorStatus  | boolean       | false        | x          | whether show error message |
| errorStyle   |  string     |   ''     |   ×        |  two kinds of errorStyle, 'popover' shows popover style , '' shows underline style       |

### Events
| eventName     | emit with value |  value  | description |
|---------------|-----------------|---------  |---------  |
| input         |        true     | value | emit when user check checkbox|
| change         |        true     | event | emit when value was changed|
