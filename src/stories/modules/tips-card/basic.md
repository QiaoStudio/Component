# Tips card

### Usage

#### VueJS

```javascript
<dp-tips-card
  :title="title"
  :content="content"
  :image-url="url"
  alternate-text="Tip Alternate Text">
</dp-tips-card>
```

### Preview
<!-- STORY -->

### Properties

| propName      | propType      | defaultValue  | isRequired | description                           |
| ------------- | ------------- | ------------- | ---------- | ------------------------------------- |
| title         | string        | 'Gobear Tips' | x          | Title text                            |
| content       | string, array | -             | √          | Content text of tips                  |
| imageUrl      | string        | -             | √          | Tips Image                            |
| alternateText | string        | 'Gobear Tips' | x          | Tips Image alternate text             |
| nextText      | string        | 'Next'        | x          | Next button text                      |
| previousText  | string        | 'Previous'    | x          | Previous button text                  |
| lastStepText  | string        | 'Okie Dokie'  | x          | Last step button text (Multiple page) |
| singleTipText | string        | 'Ok, got it'  | x          | Single page button text               |
