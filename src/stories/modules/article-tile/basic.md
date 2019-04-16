# Article Tile

### Usage
```js
  <dp-article-tile :type="tileType" :is-stacked="isStacked">
    <template slot="img"><div class="dp-tile__img" role="img" aria-label="article image" style="background-image: url(image-link.png);"></div></template>
    <template slot="title"><div class="dp-tile__title">8 Tips to Save Money Everyday very long title</div></template>
    <template slot="desc"><p class="dp-tile__desc">Vivamus venenatis urna non mi vulputate, lobortis blandit nunc ultricies.</p></template>
    <template slot="author"><span class="dp-tile__author">By Jeremy</span></template>
    <template slot="label">
      <span class="dp-tile__label dp-label">
        <small>credit cards</small>
      </span>
    </template>
    <template slot="date"><span class="dp-tile__date">Feb 16, 2018</span></template>
  </dp-article-tile>
```

#### Basic HTML

```HTML
  <div class="dp-tile__article dp-tile dp-tile__article--large dp-tile__article--stacked">
    <div class="dp-tile__img-wrap"><div class="dp-tile__img" role="img" aria-label="article image" style="background-image: url(~assets/images/articale-tile-full-img.jpg);"></div></div>
    <div class="dp-tile__content">
      <div class="dp-tile__title">5 reasons why free travel insurance may not be sufficient</div>
      <p class="dp-tile__desc">Vivamus venenatis urna non mi vulputate.</p>
      <p class="dp-tile__info">
        <span class="dp-tile__label dp-label">
          <small>travel</small>
        </span>
        <span class="dp-tile__author">By Jeremy</span>
        <span class="dp-tile__date">Nov 20, 2017</span>
      </p>
    </div>
  </div>
```

### Preview
<!-- STORY -->

### Properties
| propName  | propType | defaultValue | isRequired | description                                           |
| --------- | -------- | ------------ | ---------- | ----------------------------------------------------- |
| type      | string   | large        | ×          | set the article tile type,type has large, small, full |
| isStacked | Boolean  | false        | ×          | set the title to be fixed three rows                  |

| className                 | isRequired | description                                              |
| ------------------------- | ---------- | -------------------------------------------------------- |
| dp-tile__article          | √          | Wrapped article tile container                           |
| dp-tile                   | x          | wrapped article tile with the tile style ( hover style ) |
| dp-tile__article--large   | ×          | Wrapped article tile container for large type            |
| dp-tile__article--small   | ×          | Wrapped article tile container for small type            |
| dp-tile__article--full    | ×          | Wrapped article tile container for full type             |
| dp-tile__article--stacked | ×          | when the title to be fixed three rows                    |
| dp-tile__img-wrap         | ×          | Wrapped the image                                        |
| dp-tile__img              | ×          | Add the image style                                      |
| dp-tile__content          | ×          | Wrapped the content                                      |
| dp-tile__title            | ×          | Wrapped the title                                        |
| dp-tile__desc             | ×          | Wrapped the desc                                         |
| dp-tile__info             | ×          | Wrapped the label,author and date                        |
| dp-tile__label            | ×          | Wrapped the label                                        |
| dp-tile__author           | ×          | Wrapped the author                                       |
| dp-tile__date             | ×          | Wrapped the date                                         |
