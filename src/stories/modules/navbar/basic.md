# Navbar

### Usage

```js
<dp-navbar :brand="CHECK_BRAND_ELEMENT_DATA_FORMAT"
           :items="MENU_ITEMS"
           :is-fixed="true">
  <template slot="right">
    <dp-button class="dp-button--primary dp-button--sm">
      <span>Log In</span>
    </dp-button>
  </template>
</dp-navbar>
```

### Preview
<!-- STORY -->

### Properties

| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| brand        | array         |              | ✓          | Navbar brand property, check `Brand` element data format |
| items        | array         |              | ✓          | Navbar menu items |

### Available Slots

| slotName     | description |
|--------------| ------------|
| right        | Navbar inline with menu items, positioned at the right (last item of the menu items) |

### Data structure (Items)

| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| label        | string        |              | ✓          | Item title |
| active       | boolean       | false        | x          | Item menu state |
| url          | string        |              | x          | Item menu url |
| megamenu     | array         |              | ✓          | Item menu - megamenu items, check `Megamenu` element data format |


### Sample data structure

```json
[
  {
    'label': 'Insurance',
    'active': false,
    'url': '',
    'megamenu': [
      {
        'title': 'Compare insurance',
        'type': 'link',
        'layout': 'two-column',
        'items': CHECK_MEGAMENU_ELEMENT_DATA_FORMAT
      },
      {
        'title': 'Promotion',
        'type': 'article',
        'layout': '',
        'items': [
          {
            'imgUrl': 'https://picsum.photos/120',
            'url': '/sg/promotion',
            'title': 'Learn a bunch of stuff here',
            'description': 'Don\'t miss the exclusive campaign because you don\'t want to',
            'target': '_self'
          }
        ]
      }
    ]
  },
  {
    'label': 'Credit cards',
    'active': false,
    'url': 'https://www.xxxxxx.com/sg/credit-card',
    'megamenu': []
  }
]
```
