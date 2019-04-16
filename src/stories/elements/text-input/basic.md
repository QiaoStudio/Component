# Text Input

### Usage

```js
<dp-text-input
  label="'Com text Input'"
  @input="InnerInput"
  :inputType="inputType"
  box
  :value="innerInputValue"
  :required="required"
  :errorStatus="errorStatus"
  :is-large="isLarge"
  :disabled="isDisabled"
  maxLength="max"
  minLength="min"/>
</dp-text-input>
```
### Preview
<!-- STORY -->

### Properties

| propName    | propType   | defaultValue| isRequired | description |
|-------------|------------|-------------|------------|-------------|
| label       | string     | _           | ×          | label text |
| value       | string     | _           | ×          | sets or returns the value of the value attribute of the text field(decimal is not supported) |
| box       | boolean     | false           | ×          | whether to apply 'Input Box' style |
| inputType   | string     | text        | ×          | set the type of the input. Currently support 'text', 'email', 'number' |
| minLength   | number     | _           | ×          | minimum Input text length |
| maxLength   | number     | _           | ×          | maximum Input text length(when maxlength is 0, maxlength ingore) |
| required | boolean    | false       | ×          | whether to display the default input box |
| input       |  event     | -           | ×          | occurs when an element gets user input |
| focus       |  event     | -           | ×          | occurs when the value of an element has been focus. |
| blur       |  event     | -           | ×          | occurs when the value of an element has been blur. |
| disabled | boolean    | false       | ×          | whether Input is disabled |
| isLarge | boolean    | false       | ×          | whether show large theme |
| errorStatus | boolean    | false       | ×          | whether to show error status |
| errorMessage | string    | -       | ×          | customed errorMessage |
| errorStyle   |  string     |   ''     |   ×        |  two kinds of errorStyle, 'popover' shows popover style , '' shows underline style       |

### Events
| eventName     | emit with value |  value  | description |
|---------------|-----------------|---------  |---------  |
| input         |        true     | event | emit when an user were inputing|
| focus         |        true     | event | emit when an input was focused|
| blur          |        true     | event | emit when an input was blured|
