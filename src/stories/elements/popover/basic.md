# Popover

### Usage

```js
<dp-popover
  :title="title"
  :trigger="trigger"
  :appendToBody="appendToBody"
  :display="display"
  :width="width"
  :content="content"
  :placement="placement"
  :closeLabel="closeLabel"
  :always="always"
  :disabled="disabled">
  <div>{{ displayText }} <i class="fa fa-question-circle" aria-hidden="true"></i></div>
</dp-popover>
```
### Preview
<div>
<!-- STORY -->
</div>
### Properties

| propName  | propType   | defaultValue| isRequired | description |
|-----------|------------|------------ |------------|-------------|
| title     |  string    |    -        |   ×        | set popover title |
| trigger   |  string    |    -        |   √        | trigger mode: "hover", "click" |
| appendToBody | boolean | true        |   x        | appends the popup to body or root |
| display   | string     | an icon     |   x        | initial clickable display |
| width     |  number    |    -        |   ×        | set width of popover content |
| content   |  string    |    -        |   √        | set popover content |
| placement |  string    |    bottom   |   √        | set popover position |
| closeLabel |  string    |    -        |   ×        | set popover close text in mobile |
| always    |  boolean   |    false    |   x        | set popover to show always |
| disabled  |  boolean   |    false    |   x        | set popover disabled |
| errorPopup  |  boolean   |    false    |   x        | use popover as formfield error message , refer to form elements such as input radio |
| flipPosition  |  array/string   |    flip    |   x        | control popover flip position. If typeof flipPosition is Array , accepted value is `top`, `right`, `bottom`, `left`. If typeof flipPosition is String, accepted value is `flip`, `clockwise`, `counterclockwise`|
| popoverClass  |  String   |    -    |   x        | set popover new class |
| preventOverflowOption | Object |   -    |     x     | an props to control popover action when overflow element, if you want more details about this props,you can refer to this [link](https://popper.js.org/popper-documentation.html#modifiers..preventOverflow) ,we exposed preventOverflow modifier to props |
| offsetOption | Object |   -    |     x     | an props to control popover offset , if you want more details about this props,you can refer to this [link](https://popper.js.org/popper-documentation.html#modifiers..offset) ,we exposed offset modifier to props |
