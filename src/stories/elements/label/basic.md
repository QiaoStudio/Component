# Label

### Usage

#### HTML

```HTML
<span class="dp-label">
    <small>{{ content }}</small>
</span>

<span class="dp-label dp-label--discount">
    <small>
        <strong>{{ discountText }}</strong>
        {{ content }}
    </small>
</span>
```

### Preview
<!-- STORY -->

### Classes

| className | isRequired | description |
|---------- |------------ | ------------ |
| dp-label  |      √     |       Default label style     |
| dp-label--discount |      x     |       Label type - Discount style     |
| dp-label--red  |      x     |       Label red style     |
| dp-label--orange  |      x     |       Label orange style     |
|   |      x     |       Label blue style (useful only with dp-label--white-bg or dp-label--bordered)     |
| dp-label--gray  |      x     |       Label gray style     |
| dp-label--md  |      x     |       Label medium size style     |
| dp-label--lg  |      x     |       Label large size style     |
| dp-label--white-bg  |      x     |       Label type with white background(only support default and blue now)    |
| dp-label--bordered  |      x     |       Label type with border(only support default and blue now)     |
