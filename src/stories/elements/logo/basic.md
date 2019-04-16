# Logo

### Usage

#### HTML

### Default logo element
```HTML
<div class="dp-logo">
    <div class="dp-logo__img">
        <img src="logo.png" alt="logo" />
    </div>
</div>
```

### Vue Usage

```js
<dp-logo
    :src="src"
    :max-width="max-width"
    :max-height="max-height"
    :containerWidth="containerWidth"
    :containerHeight="containerHeight"
    :imgVertAlignMobile="imgVertAlignMobile"
    :imgVertAlignDesktop="imgVertAlignDesktop"
    :imgHorizAlignMobile="imgHorizAlignMobile"
    :imgHorizAlignDesktop="imgHorizAlignDesktop"
    :alt="alt">
</dp-logo>
```

### Preview
<!-- STORY -->

### Properties

| propName | propType   | defaultValue| isRequired | description |
|----------|---------   |------------ |------------| ------------|
| src  |  string    | -           | √          | Default logo image url |
| maxWidth  |  number    | -           | ×          | max width of logo image inside container in px, if not set, max-width is 100%|
| maxHeight  |  number    | -           | ×          | max height of logo image inside container in px, if not set, max-height is 100%|
| alt |  string | logo           | ×          | Alt value for logo image |
| containerWidth |  number |     62       | ×          | Width of image container |
| containerHeight |  number | 62           | ×          | Height of image container |
| imgVertAlignMobile |  string | center           | ×          | Vertical alignment on mobile of image inside container. Can be: top, bottom, center |
| imgVertAlignDesktop |  string | center           | ×          | Vertical alignment on desktop of image inside container. Can be: top, bottom, center |
| imgHorizAlignMobile |  string | center           | ×          | Horizontal alignment on mobile of image inside container. Can be: left, right, center |
| imgHorizAlignDesktop |  string | center           | ×          | Horizontal alignment on desktop of image inside container. Can be: left, right, center |

### Classes

| className | isRequired | description |
|---------- |------------ | ------------ |
| dp-logo  |      √     |       Default logo style     |
| dp-logo__img  |      √     |       Logo image     |
