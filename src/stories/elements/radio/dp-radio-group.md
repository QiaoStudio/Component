# Radio Group
### Usage

```js
<dp-radio-group
  :value="currentValue"
  @input="changeSelected">
  <dp-radio :label="1">{{ Option A }}</dp-radio>
  <dp-radio :label="2">{{ Option B }}</dp-radio>
  <dp-radio :label="3">{{ Option C }}</dp-radio>
</dp-radio-group>
```
### Preview
<!-- STORY -->

### Properties

| propName | propType       | defaultValue | isRequired | description |
|----------|----------------|--------------|------------|-------------|
| value    | string/ number | _            | √          | sets or returns the value of the value attribute of the text field(decimal is not supported) |
| message | string        | _            | x          | error message |
| errorStatus  | boolean       | false        | x          | whether show error message |
| errorStyle   |  string     |   ''     |   ×        |  two kinds of errorStyle, 'popover' shows popover style , '' shows underline style       |

### Events
| eventName     | emit with value |  value  | description |
|---------------|-----------------|---------  |---------  |
| input         |        true     | event | emit when an element gets user click|
