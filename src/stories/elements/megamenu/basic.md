# Megamenu

### Usage

```js
<dp-megamenu></dp-megamenu>
```

### Preview
<!-- STORY -->

### Properties

| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| columns      | array         |              | ✓          | Default Megamenu content |

### Data structure (Columns)

| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| title        | string        |              | ✓          | Column title |
| type         | string        | link         | ✓          | Column content type, either "link" or "article" |
| items        | array         |              | ✓          | Column content items |
| layout       | string        |              | ✓          | Column layout, either "" or "two-column" |

### Data structure (Column Content Items - Link)

| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| iconType     | string        |              | x          | Column content items icon type |
| iconCategory | string        |              | x          | Column content items icon category |
| iconDisplay  | string        |              | x          | Column content items icon display |
| label        | string        |              | ✓          | Column content items label text |
| url          | string        |              | ✓          | Column content items anchor url |
| target       | string        | _self        | x          | Column content items anchor target, either "_blank" or "_self" |

### Data structure (Column Content Items - Article)

| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| imgUrl       | string        |              | x          | Column content items image url, image size must be 120x120 |
| url          | string        |              | ✓          | Column content items anchor url |
| title        | string        |              | x          | Column content items title text |
| description  | string        |              | x          | Column content items description text |
| target       | string        | _self        | x          | Column content items anchor target, either "_blank" or "_self" |


### Sample data structure

```json
[
  {
    "title": "Compare insurance",
    "type": "link",
    "layout": "two-column",
    "items": [
      {
        "iconType": "product",
        "iconCategory": "travel-insurance",
        "iconDisplay": "dp-icon--sm-only",
        "label": "Travel Insurance",
        "url": "/sg/travel-insurance",
        "target": ""
      },
      {
        "iconType": "product",
        "iconCategory": "car-insunrance",
        "iconDisplay": "dp-icon--sm-only",
        "label": "Car Insurance",
        "url": "/sg/car-insurance",
        "target": ""
      },
      {
        "iconType": "product",
        "iconCategory": "health-insurance",
        "iconDisplay": "dp-icon--sm-only",
        "label": "Driver & Passenger' Personal Accident",
        "url": "/sg/personal-accident",
        "target": ""
      }
    ]
  },
  {
    "title": "Promotion",
    "type": "article",
    "layout": "",
    "items": [
      {
        "imgUrl": "https://picsum.photos/120",
        "url": "/sg/promotion",
        "title": "Don't miss the exclusive campaign with a very long title",
        "description": "",
        "target": "_self"
      }
    ]
  }
]
```
