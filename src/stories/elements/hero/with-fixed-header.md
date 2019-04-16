# Hero

### Usage

```js
<dp-hero :isCurved="true"
         :curveColor="'#ffffff'"
         :imageUrl="'https://bahaykubo.com/kahitmunti.png'"
         :imageAlt="'Test'"
         :size="'small'"
         :overlayOpacity="'0.6'"></dp-hero>
```

### Preview
<!-- STORY -->

### Properties

| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| isCurved     | boolean       | true         | x          | Enable hero curved bottom |
| curveColor   | string        | #FFFFFF      | x          | Hero bottom curve color |
| imageUrl     | string        |              | x          | Hero background image |
| imageAlt     | string        |              | x          | Hero image alt text |
| size         | string        |              | x          | Hero size; either 'small', 'medium', 'large' |
| overlayOpacity | string      | 0            | x          | Hero image overlay opacity |
