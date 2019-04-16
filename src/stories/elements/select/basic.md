# Select

### Usage

```js
<dp-select
  :label="'label'"
  :errorstatus="errorStatus"
  :errorStyle="errorStyle"
  :errorMessage="errorMessage"
  :dataWidth="dataWidth"
  :items="[{ key: '1', text: '1 month' }, { key: '2', text: '2 month' }, { key: '3', text: '3 month' }]"
  :value="innerSelectValue"
  :is-large="isLarge"
  :disabled="isDisabled"
  :shadow="isEnableShadow"
  :outline="isEnableOutline"
  :text-align="textAlign"
  @change="changeValue($event)">
</dp-select>
```
### Preview
<!-- STORY -->

### Properties

| propName     | propType      | defaultValue | isRequired | description                                                                                  |
| ------------ | ------------- | ------------ | ---------- | -------------------------------------------------------------------------------------------- |
| label        | string        | -            | ×          | label text                                                                                   |
| disabled     | boolean       | false        | ×          | whether to show disable status                                                               |
| isLarge      | boolean       | false        | ×          | whether show large theme                                                                     |
| required     | boolean       | false        | ×          | is select value required                                                                     |
| errorMessage | string        | -            | ×          | custom errorMessage                                                                          |
| errorstatus  | boolean       | false        | ×          | whether to show error status                                                                 |
| errorStyle   | string        | ''           | ×          | two kinds of errorStyle, 'popover' shows popover style , '' shows underline style            |
| dataWidth    | string        | false        | ×          | when value is 'fit' select will fit it's container's width                                   |
| items        | array         | -            | √          | select options, example [{key:'1', text:'1 month'}, {key:'2', text:'1 month'}]               |
| value        | number/string | -            | √          | sets or returns the value of the value attribute of the text field(decimal is not supported) |
| shadow       | boolean       | false        | ×          | whether to apply shadow style                                                                |
| outline      | boolean       | false        | ×          | whether to apply outline style                                                               |
| text-align   | string        | left         | ×          | Align inner text. It can be 'left', 'right', 'center'.                                       |

### Events
| eventName | emit with value | value              | description                      |
| --------- | --------------- | ------------------ | -------------------------------- |
| change    | true            | changed value, key | emit when value of select change |

### Keyboard Interaction
| Element focus | Key            | Description                 |
| ------------- | -------------- | --------------------------- |
| component     | up or down     | focus above or below option |
|               | space or enter | select current option       |
|               | esc            | hide option list            |
