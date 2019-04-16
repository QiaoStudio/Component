# Progress Bar

### Usage

```js
<dp-progress-bar
  :percent="percent"
  :height="height"
  :indicatorOnMobile="indicatorOnMobile"
  :indicatorOnDesktop="indicatorOnDesktop">
</dp-progress-bar>
```

### Preview
<!-- STORY -->

### Properties

| propName           | propType | defaultValue | isRequired | description                      |
| ------------------ | -------- | ------------ | ---------- | -------------------------------- |
| percent            | Number   | 0            | √          | Progress percent                 |
| height             | Number   | 6            | x          | Progress bar height              |
| indicatorOnMobile  | Boolean  | false        | x          | Show indicator on mobile or not  |
| indicatorOnDesktop | Boolean  | true         | x          | Show indicator on desktop or not |
