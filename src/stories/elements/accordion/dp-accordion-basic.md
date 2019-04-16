# Accordion

### Usage

```js
<dp-accordion :icon-position="iconPosition">
    <span slot="header">{{ title }}</span>
    {{ body }}
</dp-accordion>
```
### Preview
<!-- STORY -->

### Properties

| propName    | propType   | defaultValue| isRequired | description |
|-------------|------------|-------------|------------|-------------|
| collapsed   | boolean    | false       | ×          | Collapsed accordion item by default |
| iconPosition| string (left, right)   | left       | ×          | Position for accordion icon |
