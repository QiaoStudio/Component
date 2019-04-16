# Currency Input

### Usage

```js
<dp-currency-input
  :label="'Com Currency Input'"
  :errorStatus="errorStatus"
  :precision="precision"
  :placeholder="placeholder"
  :disabled="disabled"
  :maxLength="maxLength"
  :value="innerInputValue"
  :currencyLabel="currencyLabel"
  :thousandSeparator="thousandSeparator"
  :decimalSeparator="decimalSeparator"
  @input="InnerInput"
  :is-large="isLarge"
  :disabled="isDisabled"
  @change="changeValue($event)" />
```
### Preview
<!-- STORY -->
### Properties

| propName | propType   | defaultValue| isRequired | description |
|----------|---------   |------------ |------------| ------------|
| label    |  string    |    ''       |   ×        |       label text      |
| errorStatus   |  boolean     |   false     |   √        |  whether to show error status       |
| errorStyle   |  string     |   ''     |   ×        |  two kinds of errorStyle, 'popover' shows popover style , '' shows underline style       |
| value    | number/string    |   ''     |   √        |       sets or returns the value of the value attribute of the text field(decimal is not supported)       |
| precision |  number    |    0       |   ×        |    how many places after decimal you want to caculate    |
| placeholder |  string    |    -       |   ×        |    placeholder    |
| currencyLabel    |  string    |    $       |   ×        |       currency label      |
| thousandSeparator    |  string    |    ,       |   ×        |       currency thousand separator      |
| decimalSeparator    |  string    |    .       |   ×        |       currency decimal point separator      |
| disabled   |  boolean     |   false     |   ×        |  whether to show disable status       |
| isLarge | boolean    | false       | ×          | whether show large theme |
| maxLength   |  number     |   null     |   ×        |  define max length of input value      |

### Events
| eventName     | emit with value |  value  | description |
|---------------|-----------------|---------  |---------  |
| input         |        true     | input value| emit when input|
| change        |  true           | changed value| emit when change|
