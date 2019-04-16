# Promotion

### Usage

#### Vue.js

```HTML
<dp-promotion
  :promotion-summary="promotionSummary"
  :popover-title="popoverTitle"
  :popover-content="popoverContent"
  :flip-position="flipPosition"
  :prevent-overflow-option="flipOverflowOption"
  :offset-option="offsetOption"
  :is-use-custom-option="isUseCustomOption"
  :action-label="actionLabel">
</dp-promotion>
```

#### HTML

```HTML
<div class="dp-promotion">
    <span><i class="fa fa-megaphone"></i></span>
    <span>Airport lounge access / Wifi voucher</span>
    <span>More</span>
</div>
```

### Preview
<!-- STORY -->

### Classes

| propName | propType | defaultValue | isRequired | description |
|----------|----------| ------------ |------------|-------------|
| promotionSummary | String |   -    |     x      |  The value of promotion summary  |
| actionLabel | String |   -    |     x      |  Call to action label |
| popoverTitle | String |   -    |     x      |  The value of Promotion popover title |
| popoverContent | Array |   -    |     x      |  value of Promotion popover content. [{title: 'test', image: 'image', content: 'test', time: 'time'}] |
| flipPosition  |  array/string   |    flip    |   x        | control popover flip position. If typeof flipPosition is Array , accepted value is `top`, `right`, `bottom`, `left`. If typeof flipPosition is String, accepted value is `flip`, `clockwise`, `counterclockwise`|
| preventOverflowOption | Object |   -    |     x     | an props to control popover action when overflow an element,for more details you can refer to this [link](https://popper.js.org/popper-documentation.html#modifiers..preventOverflow) ,we exposed preventOverflow modifier to props |
| offsetOption | Object |   -    |     x     | an props to control popover offset , for more details you can refer to this [link](https://popper.js.org/popper-documentation.html#modifiers..offset) ,we exposed offset modifier to props |
| isUseCustomOption | Boolean | false |     x     | use cumstom option , if this props was set to true , popover will apply custom preventOverflowOption, offsetOption when those two options were avaliable, otherwise it will apply built-in  preventOverflowOption, offsetOption.| 


### Classes

| className | isRequired | description |
|---------- |------------ | ------------ |
| dp-promotion  |      √     |       Default promotion style     |
