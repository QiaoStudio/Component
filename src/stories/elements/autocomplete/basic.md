# Autocomplete

### Usage

```js
<dp-autocomplete-multiple
  label="Occupation"
  :options="items"
  :value.sync="value"
  :placeholder-single="placeholderSingle"
  :placeholder-multi="placeholderMulti"
  :required="required"
  :custom-available="customAvailable"
  :errorStatus="errorStatus"
  :multiple="multiple">
</dp-autocomplete-multiple>
```
### Preview
<!-- STORY -->

### Properties

| propName          | propType | defaultValue                         | isRequired | description                                                                                                                                                                                       |
| ----------------- | -------- | ------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label             | string   | _                                    | ×          | label text                                                                                                                                                                                        |
| value             | string   | _                                    | ×          | sets or returns the value of the value of autocomplete                                                                                                                                            |
| options           | array    |                                      | ✓          | set dropdown option data [{ text: 'Blgeria', isRelated: [{ text: 'Blgeria2' }, { text: 'Blgeria3' }] }, { text: 'Albania' }, { text: 'afghanistan' }, { text: 'Blgeria2' }, { text: 'Blgeria3' }] |
| multiple          | boolean  | false                                | ×          | single or multiple                                                                                                                                                                                |
| required          | boolean  | true                                 | ×          | whether to display the default input box                                                                                                                                                          |
| placeholderSingle | string   | Start typing to search               | ×          | sets the single placeholder text                                                                                                                                                                  |
| placeholderMulti  | string   | Select destination(s)                | ×          | sets the multi placeholder text                                                                                                                                                                   |
| noResult          | string   | No result found. Try something else. | ×          | sets the text text when the select option does not exist                                                                                                                                          |
| isDisabled        | boolean  | false                                | ×          | whether Input is disabled                                                                                                                                                                         |
| errorStatus       | boolean  | false                                | ×          | whether to show error status                                                                                                                                                                      |
| displayBy         | string   | 'text'                               | ×          | display item by text or user customed value                                                                                                                                                       |
| checkBy           | string   | 'text'                               | ×          | check item by text or user customed value                                                                                                                                                         |
| errorMessage      | string   | -                                    | ×          | customed errorMessage                                                                                                                                                                             |
| customAvailable   | boolean  | false                                | ×          | whether to enter a value that does not exist option                                                                                                                                               |
| customSearch      | boolean  | false                                | ×          | whether to stop internal search rule, user have to modify options by themself when search-change event is triggered, this often works with search-change                                          |
| multipleAlt       | boolean  | false                                | ×          | use a alterntive style which seperate chips with space + comma                                                                                                                                    |

### Events
| propName      | propType | defaultValue | isRequired | description                                        |
| ------------- | -------- | ------------ | ---------- | -------------------------------------------------- |
| input         | event    | -            | ×          | occurs when an new option is set or remove         |
| search-change | event    | -            | ×          | occurs when the value of an element has been focus |
| update:value  | event    | -            | x          | occurs when autocompleteValue is changed           |


### Key Shortcuts

| Focus element | Key                 | Description                       |
| ------------- | ------------------- | --------------------------------- |
| Input         | left arrow          | focus the most left chip          |
|               | esc                 | hide option list                  |
|               | delete or backspace | delete the most right chip        |
| Chip          | right arrow         | focus next chip or the input      |
|               | left arrow          | focus previous chip               |
|               | delete or backspace | Remove it then focus next chip    |
| Option list   | up arrow            | focus above option                |
|               | down arrow          | focus below option                |
|               | enter               | select or unselect current option |
|               | esc                 | hide option list                  |



### How to use custom search rule

HTML:
```js
<dp-autocomplete-multiple :custom-search="customSearch" @search-change="searchChange"><dp-autocomplete-multiple>
```
JS:
```js
methods: {
  searchChange(searchQuery) {
    if (this.customSearch) {
      let filteredOptions = _.filter(this.options, function(option) {
        return (
          _.lowerCase(option['text']).indexOf(
            _.lowerCase(searchQuery)
          ) >= 0
        )
      })
      this.options = _.sortBy(
        filteredOptions,
        function(option) {
          return _.lowerCase(option['text'])
        }
      )
    }
  }
}
```
