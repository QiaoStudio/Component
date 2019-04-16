# Author byline

### Usage
```js
<dp-author-byline
  :author="author"
  :author-avatar="authorAvatar"
  :alt="alt"
  :time="time"
  :max-width="maxW"
  :max-height="maxH"
  :is-span-wrap="isSpanWrap"
  :formatter="formatter"
  :href="href">
</dp-author-byline>
```

#### Basic HTML

```HTML
  <div class="dp-author__byline">
    <div class="dp-author__img-wrap">
      <img alt="alt" src="image.png" />
    </div>
    <div class="dp-author__content">
      <div class="dp-theme-article">
        <span class="dp-span--sm dp-span-wrap">
          <span class="dp-author-wrap dp-author-name">By<a>Walter White</a></span>
          <span class="dp-date-wrap">last updated 22 Nov 2018</span>
        </span>
      </div>
    </div>
  </div>
```

### Preview
<!-- STORY -->

### Properties
| propName    | propType   | defaultValue| isRequired | description |
|-------------|------------|-------------|------------|-------------|
| author       | string     | -           | √          | value of author name  |
| authorAvatar       | string     | -             | ×          | value of image url |
| alt       | string     | -             | ×          | value of image alt |
| time       | number/string     | -           | ×          | the total number of milliseconds from 01:00 to 00:00, January 1, 1970, GMT.(e.g. Nov 23 2018 => 1542931200000)  |
| maxHeight       | number     | -           | ×          | max height of the image wrapper  |
| maxWidth       | number     | -           | ×          | max width of the image wrapper  |
| isSpanWrap       | boolean     | false           | ×          | is author byline wrap  |
| formatter       | string     | -           | ×          | the famatter of time {famatter: YYYY MMM DD} => time : 2018 Nov 23 (the more principles can reference to https://en.wikipedia.org/wiki/ISO_8601)   |
| href       | string     | -           | ×          | author page link  |


| className | isRequired | description |
|---------- |------------ | ------------ |
| dp-span-wrap  |   ×       | Whether author and date to display on the same line     |
| dp-author-name  |   ×       | author display normal or bold     |
