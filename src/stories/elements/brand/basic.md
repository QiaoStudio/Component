# Brand

### Usage

```js
<dp-brand
  :country="COUNTRY"
  :fallbackLogo="IMAGE_URL"
  :fallbackTagline="IMAGE_URL">
</dp-brand>
```

### Preview
<!-- STORY -->

### Properties

| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| country         | string        | sg           | ✓          | Brand country |
| type            | string        |              | x          | Brand logo is either '' (default) or 'blog' |
| fallbackLogo    | string        |              | x          | Brand logo fallback image (png) |
| fallbackTagline | string        |              | x          | Brand tagline fallback image (png) |
