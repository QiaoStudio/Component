# Logo Title

### Usage

#### HTML

### Default logo element
```HTML
<p class="dp-logo-title">
    <strong class="dp-logo-title__insure">insurerName, </strong>
    <span class="dp-logo-title__plan">planName</span>
</p>
```

### Vue Usage

```js
<dp-logo
  :insure-name="insureName"
  :plan-name="planName">
</dp-logo>
```

### Preview
<!-- STORY -->

### Properties

| propName | propType   | defaultValue| isRequired | description |
|----------|---------   |------------ |------------| ------------|
| insurerName |  string | -           | ×          | Default logo insurer name |
| containerWidth |  number |     62       | ×          | Width of image container |
| href |  string |     'javascript:;'       | ×          | Link value of title |
| target |  string |     '_self'       | ×          | How to jump to specified link.  Accepted value: _blank, _self, _parent, _top|

### Classes

| className | isRequired | description |
|---------- |------------ | ------------ |
| dp-logo-title  |      √     |       Default logo title style     |
| dp-logo-title__insure  |      √     |   Default logo title insure style     |
| dp-logo-title__plan  |      √     |   Default logo title plan style     |
