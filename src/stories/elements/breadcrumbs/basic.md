# Breadcrumbs

### Usage

#### Vue Usage

```js

<dp-breadcrumbs :levels="levels">
</dp-breadcrumbs>
```
#### HTML All level
```HTML
<div class="dp-breadcrumbs">
  <span>
    <span class="dp-breadcrumbs__link">
      <a href="https://www.xxxxxx.com">
        Blog
      </a>
    </span>
    <span>
      <i class="fa fa-angle-right"></i>
    </span>
    <span class="dp-breadcrumbs__link">
      <a href="https://www.xxxxxx.com">
        Budgeting
      </a>
    </span>
    <span>
      <i class="fa fa-angle-right"></i>
    </span>
    <span class="dp-breadcrumbs__text">
        8 Tips to Save Money Everyday
    </span>
  </span>
</div>
```
#### HTML Level 1 & 2 Only
```HTML
<div class="dp-breadcrumbs">
  <span>
    <span class="dp-breadcrumbs__link">
      <a href="https://www.xxxxxx.com">
        Blog
      </a>
    </span>
    <span>
      <i class="fa fa-angle-right"></i>
    </span>
    <span class="dp-breadcrumbs__link">
      <a href="https://www.xxxxxx.com">
        Budgeting
      </a>
    </span>
  </span>
</div>
```

#### HTML Level 2 Only
```HTML
<div class="dp-breadcrumbs">
  <span>
    <span class="dp-breadcrumbs__link">
      <a href="https://www.xxxxxx.com">
        Budgeting
      </a>
    </span>
  </span>
</div>
```


### Preview
<!-- STORY -->

### Properties

| propName | propType        | defaultValue | isRequired | description                                  |
| -------- | --------------- | ------------ | ---------- | -------------------------------------------- |
| levels   | Array of Object |              | true       | The array of texts and links to be displayed |

### Level object defail

| objName   | propType | defaultValue | isRequired | description                 |
| --------- | -------- | ------------ | ---------- | --------------------------- |
| text      | String   | ''           | true       | The text of a level         |
| link      | String   | ''           | true       | The link of a level         |
| isVisible | Boolean  | true         | false      | The level is visible or not |

### Classes

| className            | isRequired | description                                               |
| -------------------- | ---------- | --------------------------------------------------------- |
| dp-breadcrumbs       | √          | Default breadcrumbs style                                 |
| dp-breadcrumbs__link | √          | Style for bold level (clickable text)                     |
| dp-breadcrumbs__text | √          | Style for last level (not clickable text and normal font) |

### Keyboard Interaction
| Element focus | Key         | Description                   |
| ------------- | ----------- | ----------------------------- |
| Component     | Tab         | focus next clickable link     |
|               | Shift + Tab | focus previous clickable link |
