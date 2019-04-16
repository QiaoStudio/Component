# Selection Block

### Usage

#### USAGE

```HTML
<dp-selection-block
  image-url="link to image file"
  text="Cancer care">
</dp-selection-block>
```


### Preview
<!-- STORY -->

### Properties

| Property name | Required    | Type         | Description |
| ------------- | ----------- | ------------ | ------------------------------------------------ |
| image-url     |      *      | String       | Url to image or svg file. If it is empty or not specify, image is not shown    |
| text          |      *      | String       | Text content. If it is empty or not specify, text is not shown    |
| layout        |      *      | String       | Available values: ['', 'horizontal']     |
| selected      |      *      | Boolean      |   is selected as default         |



### Events

| Event name | Description                         |
| ---------- | ----------------------------------- |
| select     | is emmited when user click on it |
