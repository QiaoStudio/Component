# Rating

### Usage

#### Vue.js

```HTML
<dp-rating
  :rating="rating"
  :reviews="reviews"
  :reviews-text="reviewsText"
  @reviewPopup="reviewPopup()">
</dp-rating>
```

#### HTML

 ```HTML
<button type="button" class="dp-review">
    <span class="dp-review__rating">
        <span aria-hidden="true" class="fa fa-star"></span>
        <span aria-hidden="true" class="fa fa-star"></span>
        <span aria-hidden="true" class="fa fa-star"></span>
        <span aria-hidden="true" class="fa fa-star-o"></span>
    </span>
    <span class="dp-review__label">
        18 Reviews
    </span>
</button>
```

### Preview
<!-- STORY -->

### Properties

| propName  | propType   | defaultValue| isRequired | description |
|-----------|------------|------------ |------------|-------------|
| rating    |  Number    |    0        |   ✗       | The value of rating |
| reviews   |  Number    |    0        |   ✗       | The value of reviews |
| reviewsText   |  String    |    Reviews        |   ✗       | The text of reviews |


### Events

| eventName | emit with value |     value     | description |
|-----------|-----------------|---------------|-------------|
| review-popup |      No       |       -       | Occurs when review area gets user click |

### Classes

| className | isRequired | description |
|---------- |------------ | ------------ |
| dp-review  |      √     |       Default Review style    |
| dp-review__rating  |      √     |       Review star wrapper    |
| dp-review__label  |      √     |       Review label wrapper    |
