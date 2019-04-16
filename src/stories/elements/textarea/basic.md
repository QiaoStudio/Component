# Textarea

### Usage

```js
<dp-textarea
  label="'Com Textarea'"
  @input="InnerInput"
  :value="innerInputValue"
  :required="required"
  :isDisabled="isDisabled"
  :errorStatus="errorStatus"
  :errorMessage="errorMessage"
  maxLength="max"
  minLength="min"/>
</dp-textarea>
```
### Preview
<!-- STORY -->

### Properties

| propName    | propType   | defaultValue| isRequired | description |
|-------------|------------|-------------|------------|-------------|
| label       | string     | _           | ×          | label text |
| value       | string     | _           | ×          | sets or returns the value of the value attribute of the text field(decimal is not supported) |
| minLength   | number     | _           | ×          | minimum Input text length |
| maxLength   | number     | _           | ×          | maximum Input text length(when maxlength is 0, maxlength ingore) |
| required | boolean    | false       | ×          | whether to display the default input box |
| isDisabled | boolean    | false       | ×          | whether Input is disabled |
| errorStatus | boolean    | false       | ×          | whether to show error status |
| errorMessage | stringoolean    | -       | ×          | set custom error message |
| errorStyle   |  string     |   ''     |   ×        |  two kinds of errorStyle, 'popover' shows popover style , '' shows underline style       |

### Events
| eventName     | emit with value |  value  | description |
|---------------|-----------------|---------  |---------  |
| input         |        true     | event | emit when an user were inputing|
| focus         |        true     | event | emit when an input was focused|
| blur          |        true     | event | emit when an input was blured|
