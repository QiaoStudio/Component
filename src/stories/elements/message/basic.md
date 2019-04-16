# Message

### Usage

#### HTML

```HTML
<dp-message
  @click="messageAction"
  class="dp-message--yellow">
  <div v-html="sampleContent"/>
</dp-message>
```

### Preview
<!-- STORY -->

### Properties
| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| buttonText   | string        | 'Ok, Got It!'| x          | Text of footer button |
| isShowButton | boolean       | true         | x          | determine if the footer button is shown |

### Events
| eventName     | emit with value |  value  | description |
|---------------|-----------------|---------|  ---------  |
| click         |      false      |    -    | Action when click footer button|

### Classes
| className | isRequired | description |
|---------- |------------| ------------ |
| dp-message|      x     |       Default message style     |
| dp-message--red  |      x     |       Message yellow style     |
| dp-message--green  |      x     |       Message green style     |
