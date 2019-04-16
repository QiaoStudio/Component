# Premium

### Usage

### Vue.js

```HTML
<dp-premium
  :currency="currency"
  :premium="premium"
  :unit="unit"
  :originalPremium="originalPremium"
  :discountValue="discountValue"
  :hasQuote="hasQuote"
  :nonQuoteText="nonQuoteText">
</dp-premium>
```

#### HTML

```HTML
<div class="dp-premium">
    <div>
        <span>
            <sup class="dp-premium__currency">{{ currency }}</sup>
            <span class="dp-premium__value">{{ value }}</span>
        </span>
        <span>
            <del class="dp-premium__before-discount">{{ beforeDiscount }}</del>
            <sub class="dp-premium__unit">{{ unit }}</sub>
        </span>
    </div>
</div>
```

### Preview
<!-- STORY -->

### Properties

| propName | propType   | defaultValue| isRequired | description |
|----------|---------   |------------ |------------| ------------|
| currency |  String    | -           | ×          | Default premium currency sign |
| isDiscountShow |  Boolean    | true           | ×          | show discount |
| originalPremium |  Number    | 0           | ×          | The value of original premium |
| premium |  Number    | 0           | ×          | The value of premium |
| hasQuote |  Boolean    | true           | ×          | Premium existed |
| nonQuoteText |  String    | -           | ×          | Text when premium not existed |
| unit |  String    | -           | ×          | Value of unit |

### Classes

| className | isRequired | description |
|---------- |------------ | ------------ |
| dp-premium  |      √     |       Default premium style     |
| dp-premium__currency  |      x     |       Premium price currency     |
| dp-premium__value  |      √     |       Premium price value     |
| dp-premium__before-discount  |      √     |       Premium before discount price     |
| dp-premium__unit  |      √     |       Premium price unit     |

### Slots

| Slot Name | Description |
| --------- | ----------- |
|  premium-currency  | The slot for premium currency |
|  premium-value  | The slot for premium value |
|  original-premium  | The slot for original premium |
|  unit  | The slot for unit |
