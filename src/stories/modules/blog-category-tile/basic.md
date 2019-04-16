# Blog Category Tile

### Usage
```js
<dp-blog-category-tile :link="link" :target="targer">
  <template slot="img">
    <img class="dp-blog-category-tile__img-wrap__img" :src="imgSource" alt="Personal Finance"/>
  </template>
  <template slot="title">
    <h2 class="dp-blog-category-tile__content-title">Personal Finance</h2>
  </template>
  <template slot="description">
    <p>Stay up to date with the latest regulations and car insurance deals!</p>
  </template>
</dp-blog-category-tile>
```

#### Basic HTML

#### Display as the tile
```HTML
  <div class="dp-blog-category-tile dp-tile">
    <div class="dp-blog-category-tile__img-wrap">
      <img class="dp-blog-category-tile__img" src="https://picsum.photos/62" alt="Title"/>
    </div>
    <div class="dp-blog-category-tile__content">
      <h2 class="dp-blog-category-tile__content-title">Personal Finance</h2>
      <div class="dp-blog-category-tile__content-desc">
        <p>Stay up to date with the latest regulations and car insurance deals!</p>
      </div>
    </div>
  </div>
```

#### Display as the link
```HTML
  <a class="dp-blog-category-tile dp-tile">
    <span class="dp-blog-category-tile__img-wrap">
      <img class="dp-blog-category-tile__img" src="https://picsum.photos/62" alt="Title"/>
    </span>
    <span class="dp-blog-category-tile__content">
      <span class="dp-blog-category-tile__content-title">Personal Finance</h2>
      <span class="dp-blog-category-tile__content-desc">
        <span>Stay up to date with the latest regulations and car insurance deals!</p>
      </span>
    </span>
  </a>
```

### Preview
<!-- STORY -->

### Properties
| propName | propType | defaultValue | isRequired | description                  |
| -------- | -------- | ------------ | ---------- | ---------------------------- |
| link     | String   | ''           | ×          | Tile link                    |
| target   | String   | ''           | ×          | _blank, _self, _parent, _top |

### Slots
| Slot Name   | description                    |
| ----------- | ------------------------------ |
| img         | Blog category tile image       |
| title       | Blog category tile title text  |
| description | Blog category tile description |

### Classes
| className             | isRequired | description                |
| --------------------- | ---------- | -------------------------- |
| dp-blog-category-tile | √          | Wrapped blog category tile |
| dp-tile               | √          | Wrapped the tile           |
| dp-tile__img-wrap     | √          | Wrapped the image          |
| dp-tile__img          | √          | Add the image style        |
| dp-tile__content      | √          | Wrapped the content        |
| dp-tile__title        | √          | Wrapped the title          |
| dp-tile__desc         | √          | Wrapped the desc           |
