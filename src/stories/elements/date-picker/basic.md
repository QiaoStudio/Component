# Datepicker

### Usage

```js
<dp-date-picker
  label="Date"
  mode="single"
  :value="innerInputValue"
  formatter="DD-MMM-YYYY"
  :errorStatus="isValid"
  :errorStyle="errorStyle"
  message="please pick a date">
</dp-date-picker>
```
### Preview
<div style="text-aglin:left;">
<!-- STORY -->
</div>
### Properties

| propName | propType   | defaultValue| isRequired | description |
|----------|---------   |------------ |------------| ------------|
| label    |  string    |    -       |   ×        |       label text      |
| mode    |  string    |    single       |   √        |       selection mode: "single", "range"      |
| value    | date or string   |   current  date     |   √        |       selected date, date range.<br/>example:<br/>'single' mode: new Date('2018-01-09')<br/>'range' mode: value: { start: new Date('2018-01-09'), end: new Date('2018-01-19') }        |
| formatter   |  string     |   DD-MMM-YYYY     |   ×        | date format<br/>example:<br/>'range' mode:DD-MMM            |
| disabled   |  boolean     |   false     |   ×        |  whether to show disable status       |
| errorStatus   |  boolean     |   false     |   ×        |  whether to show error status       |
| message   | string     |   'please pick a date'     |   ×        |  customed errorMessage       |
| errorStyle   |  string     |   ''     |   ×        |  two kinds of errorStyle, 'popover' shows popover style , '' shows underline style       |

### Events
| eventName     | emit with value |  value  | description |
|---------------|-----------------|---------  |---------  |
| input         |        true     | event | emit when an user pick a date|
