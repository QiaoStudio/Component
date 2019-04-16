# Coverage Detail

### Usage

#### HTML

```HTML
<table class="dp-coverage-detail">
  <tbody class="dp-coverage-detail__body">
    <tr class="dp-coverage-detail__row">
      <td class="dp-coverage-detail__cell-title">Personal accident payment</td>
      <td class="dp-coverage-detail__cell-content"><strong>$300,000 / adult $60,000 / elderly</strong></td>
    </tr>
    <tr class="dp-coverage-detail__row">
      <td class="dp-coverage-detail__cell-title">Medical expenses(overseas)</td>
      <td class="dp-coverage-detail__cell-content"><strong>$500,000 / adult $100,000 / elderly</strong></td>
    </tr>
  </tbody>
</table>
```

#### Vuejs

```html
<dp-coverage-detail
  :coverage="coverage"
  :view-type="viewType">
</dp-coverage-detail>
```

### Preview
<!-- STORY -->

### Classes

| className | isRequired | description |
|---------- | ---------- | ----------- |
| dp-coverage-detail |      √     | Default coverage detail style |

### Properties

| propName | propType   | defaultValue| isRequired | description |
|----------|---------   |------------ |------------| ------------|
| coverage  |  Array    |  []         | √          | value of coverage. [{title: 'test', content: 'test'}] |
| viewType  |  String   |  grid       | x          | The type of the view. Accepted value: 'grid', 'list'. |
