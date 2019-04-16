# Article Tile With Snippet

### Usage

```js
<dp-article-tile-with-snippet
  :link="link"
  :target="target"
  :is-stacked="isStacked"
  :snippet-position="snippetPosition">
  <template slot="img"><img :src="imgThumbnail"/></template>
  <template slot="label">
    <span class="dp-label dp-label--white-bg dp-label--blue">
      <small>TRAVEL</small>
    </span>
  </template>
  <template slot="title"><span class="dp-tile__title">Best car rental comparison sites for your next road trip (2018)</span></template>
  <template slot="snippet"><span class="dp-tile__snippet">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur, dui eu euismod tempor, nisi eros pellentesque leo, vita </span></template>
  <template slot="author"><span class="dp-tile__author">By Author</span></template>
  <template slot="date"><span class="dp-tile__date">Nov 20, 2017</span></template>
</dp-article-tile-with-snippet>
```

#### Basic HTML 

##### Display as the link

```HTML
  <a class="dp-tile__article-with-snippet dp-tile__snippet--right dp-tile__snippet--stacked" href="https://google.com" target="_blank">
    <span class="dp-tile__img-wrap"><img src="photo.jpg"/></span>
    <span class="dp-tile__content">
      <span class="dp-tile__title">title</span>
      <span class="dp-tile__snippet">snippet</span>
      <span class="dp-tile__info">
        <span class="dp-tile__label">
          <span class="dp-label dp-label--white-bg dp-label--blue">
            <small> TRAVEL</small>
          </span>
        </span>
        <span class="dp-tile__author">author</span>
        <span class="dp-tile__date">date</span>
      </span>
    </span>
  </a>
```

##### Display as the tile
```HTML
  <div class="dp-tile__article-with-snippet dp-tile__snippet--right dp-tile__snippet--stacked">
    <div class="dp-tile__img-wrap"><img src="photo.jpg"/></div>
    <div class="dp-tile__label">
      <span class="dp-label dp-label--white-bg dp-label--blue">
        <small> TRAVEL</small>
      </span>
    </div>
    <div class="dp-tile__content">
      <div class="dp-tile__title">title</div>
      <div class="dp-tile__snippet">snippet</div>
      <p class="dp-tile__info">
        <span class="dp-tile__author">author</span>
        <span class="dp-tile__date">date</span>
      </p>
    </div>
  </div>
```

### Preview
<!-- STORY -->

### Properties

| propName        | propType | defaultValue | isRequired | description                                                                |
| --------------- | -------- | ------------ | ---------- | -------------------------------------------------------------------------- |
| snippet-positon | String   | 'right'      | √          | Two type of style mode , 'right','bottom'                                  |
| link            | String   | ''           | x          | Tile link                                                                  |
| target          | String   | ''           | x          | _blank, _self, _parent, _top                                               |
| is-stacked      | Boolean  | ''           | x          | Choose if snippet is stacked , only work when snippet-position is 'bottom' |

| className                     | isRequired | description                                                                       |
| ----------------------------- | ---------- | --------------------------------------------------------------------------------- |
| dp-tile__article-with-snippet | √          | basic style class                                                                 |
| dp-tile__snippet-right        | √          | snippet right style , can't exist with 'dp-tile__snippet-bottom' at the same time |
| dp-tile__snippet-bottom       | √          | snippet bottom style , can't exist with 'dp-tile__snippet-right' at the same time |
| dp-tile__snippet-stacked      | ×          | snippet stacked style , can only exist with 'dp-tile__snippet-bottom'             |
| dp-tile__img-wrap             | ×          | Wrapped the image                                                                 |
| dp-tile__img                  | ×          | Add the image style                                                               |
| dp-tile__content              | ×          | Wrapped the content                                                               |
| dp-tile__title                | ×          | Wrapped the title                                                                 |
| dp-tile__snippet              | ×          | Wrapped the snippet                                                               |
| dp-tile__info                 | ×          | Wrapped the label,author and date                                                 |
| dp-tile__label                | ×          | Wrapped the label                                                                 |
| dp-tile__author               | ×          | Wrapped the author                                                                |
| dp-tile__date                 | ×          | Wrapped the date                                                                  |
