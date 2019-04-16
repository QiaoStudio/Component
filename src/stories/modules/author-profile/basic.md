# Author Profile

### Usage

#### Vue.js
```js
<dp-author-profile :author="author"
                   :link-button-text="linkButtonText"
                   :link-url="linkUrl"
                   :alt="alt"
                   :author-avatar="authorAvatar"
                   :descirption="description">
</dp-author-profile>
```
#### HTML
```HTML
<div class="dp-author-profile">
  <div class="dp-author-profile__avatar">
    <img src="authorAvatar" alt="author avatar">
  </div>
  <div class="dp-author-profile__content-wrap">
    <div class="dp-theme-article">
      <h2 class="dp-author-profile__author dp-title">{{ author }}</h2>
    </div>
    <div class="dp-theme-blog">
      <p class="dp-author-profile__description dp-p--sub">{{ description }}</p>
    </div>
    <a class="dp-author-profile__link-button dp-link dp-link--author-profile">linkButtonText</a>
  </div>
</div>
```

### Preview
<!-- STORY -->

### Properties

#### Props
| propName | propType | defaultValue | isRequired | description |
|--------- |--------- | ------------ | ---------- | ----------- |
| author  | String  | ''  |      √     |       value of author    |
| description  | String  | ''  |      √     |       value of description    |
| authorAvatar  | String  | ''  |      x     |       value of author avatar, if null or empty, image will be hidden   |
| linkButtonText  | String  | ''  |       x     |       value of link button text, if null or empty, link button will be hidden    |
| linkUrl  | String  | ''  |       x      |       value of link button link, will be emitted with event |
| alt  | String  | ''  |      x     |       value of avatar alt    |

#### Classes
| className | isRequired | description |
|---------- |------------ | ------------ |
| dp-author-profile | √ | basic style for author profile |
| dp-author-profile__avatar | x | basic style for author avatar |
| dp-author-profile__content-wrap | x | warpper of right content |
| dp-author-profile__author | x | basic style for author |
| dp-author-profile__description | x | basic style for description |
| dp-author-profile__link-button | x | basic style for link-button |
| dp-article__h2| x | article h2 style |
| dp-blog__p--sub| x | blog p sub style |
| dp-link| x | text link style |
