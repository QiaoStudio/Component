# Slider

### Usage

```js
<dp-slider
  v-model="value"
  :interval='interval'
  :piecewise='piecewise'
  :min='min' :max='max'
  :disabled='disabled'
  :formatter='"separator" ? separator : formatter'>
</dp-slider>
```
### Preview
<!-- STORY -->
****
### Properties

| propName  | propType        | defaultValue | isRequired | description                       |
| --------- | --------------- | ------------ | ---------- | --------------------------------- |
| v-model   | number array    | _            | Yes        | slider value                      |
| interval  | number          | 1            | ×          |                                   |
| piecewise | bool            | false        | ×          | whether to display gap for slider |
| max       | number          | _            | ×          |                                   |
| min       | number          | _            | ×          |                                   |
| disabled  | bool            | -            | ×          |                                   |
| formatter | string function | -            | ×          | how to display label              |


### Key Shortcuts

| Focus element | Key         | Description                    |
| ------------- | ----------- | ------------------------------ |
| Slider dot    | tab         | focus the right slider dot     |
|               | shift + tab | focus the left slider dot      |
|               | left        | decrease value for current dot |
|               | down        | decrease value for current dot |
|               | right       | increase value for current dot |
|               | up          | increase value for current dot |

### how to modify label for slider
1. adding separator for number
```js
methods: {
  separator(val) {
    return val ? val.toLocaleString() : 0
  }
}
<dp-slider v-model='value' :formatter='separator'></dp-slider>
```
2. adding currency symbol for number
```js
<dp-slider v-model='value' formatter='¥{value}'></dp-slider>
```
