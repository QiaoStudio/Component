# Radio

### Basic Usage

```js
<template>
  <dp-radio
    :error-style="errorStyle"
    v-model="radio"
    :disabled="isDisabled"
    :errorStatus="isValid"
    :message="errorMessage"
    :label="textlabel" >
  </dp-radio>
</template>

<script>
  export default {
    data () {
      return {
        radio: '1'
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
| label        | string/number | _            | √          | the value of radio |
| value        | string/number | _            | √          | sets or returns the value of the value attribute of the text field(decimal is not supported) |
| disabled     | boolean       | false        | x          | whether Radio is disabled |
| name         | string        | _            | √          | native 'name' attribute |
| errorMessage | string        | _            | x          | error message |
| errorStatus  | boolean       | false        | x          | whether show error message |
| errorStyle   |  string     |   ''     |   ×        |  two kinds of errorStyle, 'popover' shows popover style , '' shows underline style       |

### Events
| eventName     | emit with value |  value  | description |
|---------------|-----------------|---------  |---------  |
| input         |        true     | event | emit when an element gets user click|
