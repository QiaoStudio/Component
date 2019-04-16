# Expandable Text

### Usage

```HTML
<dp-expandable-text
  :display-lines="2"
  content="Content to be displayed"
  read-more-text="Read more"
  :font-size="12"
  :line-height="15"
  >
</dp-expandable-text>
```

### Preview
<!-- STORY -->

### Description
This component uses text line height to detect number of lines in container. So, it means that, the container should set line height in pixel.

### Properties

| Property name  | Required  | Default         | Type      | Description                            |
| -------------- | --------- | --------------- | --------- | -------------------------------------- |
| display-lines  |           | 2               | String    | Number of lines is displayed in collapsed mode |
| content        |           |                 | String    | Content string                         |
| read-more-text |           | 'Read more'     | String    | Text for 'Read more' button            |
| font-size      |           | 12              | Number    | Font size in pixel                     |
| line-height    |           | 15              | Number    | Line height in pixel                   |

### Keyboard Interaction

| Element focus | Key   | Description      |
| ------------- | ---   | ---------------- |
| Component     | Enter | Show all content | 
