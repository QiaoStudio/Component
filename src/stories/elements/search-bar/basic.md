# Search Bar

### Usage

#### HTML

```js
<dp-search-bar
  label="Occupation"
  :options="items"
  :value.sync="value"
  :placeholder
  :errorStatus="errorStatus"
  :errorMessage="errorMessage"
  :pill="pill">
</dp-autocomplete-multiple>
```

### Preview
<!-- STORY -->

### Properties


| propName     | propType | defaultValue             | isRequired | description                                                                                  |
| ------------ | -------- | ------------------------ | ---------- | -------------------------------------------------------------------------------------------- |
| options      | Array    | []                       | ✓          | set dropdown option data [{ text: 'Blgeria', url: 'test'}],{ text: 'Blgeria1', url: 'test1'} |
| lable        | String   | 'please select a option' | ×          | show label and placeholder                                                                   |
| checkBy      | String   | 'text'                   | ×          | check item by text or user customed value                                                    |
| displayBy    | String   | 'text'                   | ×          | display item by text or user customed value                                                  |
| errorStatus  | Boolean  | false                    | ×          | if show customed error                                                                       |
| errorMessage | String   | 'Error'                  | ×          | customed error message                                                                       |
| pill         | Boolean  | false                    | ×          | set border pill style                                                                        |

### Events
| propName      | propType | defaultValue | isRequired | description                                        |
| ------------- | -------- | ------------ | ---------- | -------------------------------------------------- |
| input         | event    | -            | ×          | occurs when an new option is set or remove         |
| search-change | event    | -            | ×          | occurs when the value of an element has been focus |
| select-option | event    | -            | x          | occurs when value was selected                     |
