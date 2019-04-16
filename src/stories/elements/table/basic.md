# Table

### Vue Usage

```js 
<dp-table
  :headers="headers"
  :data="data"
  :header-style="headerStyle"
  :class="tableStyle">
</dp-table>
```
### HTML Table

#### HTML Table with Top Header style

```HTML
<div class="dp-table dp-table--secondary-simple">
  <table class="dp-table--default-header">
    <tr>
      <th>Credit card</th>
      <th>Grocery cashback</th>
      <th>Other rewards</th>
    </tr>
    <tr>
      <td>Citi Cash Back Card</td>
      <td >- 1.6% \r\n - No cashback cap \r\n - No minimum spend required</td>
      <td >- 2 TREATS points for the equivalent of $1 spent on foreign currency transactions</td>
    </tr>
    <tr>
      <td>HSBC Cash Back Card</td>
      <td >- 7% in all Sheng Siong stores (capped at $70 per month)</td>
      <td >- 5% cashback on Grab and taxi rides (capped at $20, minimum spend of $400 outside of Sheng Siong)</td>
    </tr>
    <tr>
      <td>TP Cash Back Card</td>
      <td >- 1.6% \r\n - No cashback cap \r\n - No minimum spend required</td>
      <td >- 5% cashback on Grab and taxi rides (capped at $20, minimum spend of $400 outside of TP Bank)</td>
    </tr>
  </table>
</div>
```

#### HTML Table with Left Header style

```HTML
<div class="dp-table dp-table--secondary-simple">
  <table class="dp-table--left-header">
    <tr>
      <th>Credit card</th>
      <td>Citi Cash Back Card</td>
      <td>HSBC Cash Back Card</td>
      <td>TP Cash Back Card</td>
    </tr>
    <tr>
      <th>Grocery cashback</th>
      <td>- 1.6% \r\n - No cashback cap \r\n - No minimum spend required</td>
      <td>- 7% in all Sheng Siong stores (capped at $70 per month)</td>
      <td>- 1.6% \r\n - No cashback cap \r\n - No minimum spend required</td>
    </tr>
    <tr>
      <th>Other rewards</th>
      <td>- 2 TREATS points for the equivalent of $1 spent on foreign currency transactions</td>
      <td>- 5% cashback on Grab and taxi rides (capped at $20, minimum spend of $400 outside of Sheng Siong)</td>
      <td>- 5% cashback on Grab and taxi rides (capped at $20, minimum spend of $400 outside of TP Bank)</td>
    </tr>
  </table>
</div>
```

### Preview
<!-- STORY -->

### Properties

| propName    | propType        | defaultValue | isRequired | description                   |
| ----------- | --------------- | ------------ | ---------- | ----------------------------- |
| headers     | Array of Object |              | true       | The array of header objects   |
| data        | Array of Object |              | true       | The array of row objects      |
| headerStyle | String          | 'top'        | false      | Header style: 'top' or 'left' |

### Header object
| propName  | propType | defaultValue | isRequired | description                                      |
| --------- | -------- | ------------ | ---------- | ------------------------------------------------ |
| fieldName | String   |              | true       | Field name which is used to map with data's keys |
| label     | String   |              | true       | Label to show on Front End                       |

### Classes

| className                  | isRequired | description                            |
| -------------------------- | ---------- | -------------------------------------- |
| dp-table                   | √          | Default table style                    |
| dp-table--secondary-simple | x          | Style for Secondary Simple table style |
| dp-table--default-header   | √          | Header top table wrapper               |
| dp-table--left-header      | √          | Header left table wrapper              |
| dp-table__bold-cell        | x          | Bold style cell                        |
