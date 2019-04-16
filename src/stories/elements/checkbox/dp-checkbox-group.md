# Checkbox Group
### Usage

```js
<dp-checkbox-group
    :value="currentValue"
    @input="changeSelected">
        <dp-checkbox :label="1">{{ Option A }}</dp-checkbox>
        <dp-checkbox :label="2">{{ Option B }}</dp-checkbox>
        <dp-checkbox :label="3">{{ Option C }}</dp-checkbox>
</dp-checkbox-group>
```
### Preview
<!-- STORY -->

### Properties

| propName    | propType | defaultValue                     | isRequired | description                                                                       |
| ----------- | -------- | -------------------------------- | ---------- | --------------------------------------------------------------------------------- |
| value       | array    | _                                | x          | sets or returns the value of the value attribute of the checkbox group            |
| message     | string   | 'Please select one option above' | x          | error message                                                                     |
| errorStatus | boolean  | false                            | x          | whether show error message                                                        |
| errorStyle  | string   | ''                               | ×          | two kinds of errorStyle, 'popover' shows popover style , '' shows underline style |

### Events
| eventName | emit with value | value | description                      |
| --------- | --------------- | ----- | -------------------------------- |
| input     | true            | value | emit when user clicking Checkbox |

### Keyboard Interaction
| Element focus | Key        | Description                                |
| ------------- | ---------- | ------------------------------------------ |
| Checkbox item | Space      | Check or uncheck current item              |
|               | DOWN/RIGHT | Focus an item which is bellow current item |
|               | UP/LEFT    | Focus an item which is above current item  |
