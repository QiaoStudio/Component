# Accordion Group

### Usage

```js
<dp-accordion-group :title-border="titleBorder">
  <h4 slot="title" class="dp-title">Group Title</h4>
  <dp-accordion
      slot="accordion"
      :key="index"
      v-for="(item, index) in items">
      <span slot="header">{{ item.title }}</span>
      {{ item.body }}
  </dp-accordion>
</dp-accordion-group>
```
### Preview
<!-- STORY -->

### Properties

| propName    | propType | defaultValue | isRequired | description                   |
| ----------- | -------- | ------------ | ---------- | ----------------------------- |
| titleBorder | boolean  | false        | x          | Make title have border or not |

### Keyboard Interaction

| Element focus  | Key            | Description                                                                  |
| -------------- | -------------- | ---------------------------------------------------------------------------- |
| Accordion Item | ENTER or SPACE | expand or collapse current item                                              |
|                | UP             | focus an item which is above current item                                    |
|                | DOWN           | focus an item which is bellow current item                                    |
|                | TAB            | if current item is expanded, focus on first interactive component winthin it |
