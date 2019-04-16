# Icons

### Usage

#### Vue.js

```HTML
<dp-icon
  :type="type"
  :category="category"
  :display="display">
</dp-icon>
```

#### HTML

```HTML
<span class="dp-icon dp-icon--sm-only dp-icon__brand--compare"></span>
```

### Preview

<!-- STORY -->

### Properties

| propName  | propType   | defaultValue| isRequired | description |
|-----------|------------|------------ |------------|-------------|
| type      |  String    |    -        |   √        | Icon type, accepted value: product, brand  |
| category  |  String    |    -        |   √        | Icon category. When type is brand, accepted value: document, reward, compare, discount, unbiased, promotion. When type is product, accepted value: travel-insurance, health-insurance, life-insurance, home-insurance, car-insurance, savings-account, fixed-deposit, credit-card, home-loan, personal-loan|
| display   |  String    |    -        |   ×        | The value of sizing classes, accept value: gb-icon--sm-only, gb-icon--md-only, gb-icon--lg-only, gb-icon--sm-md, gb-icon--sm-lg, gb-icon--md-lg |

### Classes

| Class Name | Is Required | Description |
|---------- |------------| ------------ |
|  dp-icon  |      √     |  Default icon style  |

### Icon category classes

Please select one class from below table based on the type of icon you need.

| Class Name |
|---------- |
| dp-icon__brand--compare |
| dp-icon__brand--discount |
| dp-icon__brand--document |
| dp-icon__brand--promotion |
| dp-icon__brand--reward |
| dp-icon__brand--unbiased |
| dp-icon__product--car-insunrance  |
| dp-icon__product--credit-card  |
| dp-icon__product--fixed-deposit  |
| dp-icon__product--health-insurance  |
| dp-icon__product--home-insurance  |
| dp-icon__product--home-loan  |
| dp-icon__product--life-insurance  |
| dp-icon__product--personal-loan  |
| dp-icon__product--savings-account  |
| dp-icon__product--travel-insurance  |

### Icon sizing classes

| Classes | On Mobile | On Tablet | On Desktop | Is Required |
| ------- | ------- | ------ | -------| -----------|
| gb-icon--sm-only | sm | sm | sm |    ×    |
| gb-icon--md-only | md | md | md |    ×    |
| gb-icon--lg-only | lg | lg | lg |    ×    |
| gb-icon--sm-md | sm | md | md |    ×    |
| gb-icon--sm-lg | sm | sm | lg |    ×    |
| gb-icon--md-lg | md | md | lg |    ×    |

'sm' size is 40px*40px

'md' size is 60px*60px

'lg' size is 80px*80px
