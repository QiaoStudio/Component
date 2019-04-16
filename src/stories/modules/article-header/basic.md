# Article Header

### Usage
```js
<dp-article-header :levels="levels"
                   :title="title"
                   :imageAlt="imageAlt"
                   :imageUrl="imageUrl"
                   :mobileImageUrl="mobileImageUrl"
                   :author="authorDetails"></dp-article-header>
```

### Preview
<!-- STORY -->

### Properties
| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| levels   | array    |              | √          | The array of texts and links to be displayed, please refer to `Breadcrumbs` element component for format |
| title    | string   |              | √          | Title of an article |
| imageAlt | string   |              | x          | Image alt text |
| imageUrl | string   |              | √          | Image url of the article |
| mobileImageUrl | string |          | √          | Should be light-weight mobile specific image url of the article |
| author   | object   |              | √          | Article's author details, please refer to `Author Byline` module component for format |
