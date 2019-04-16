# Mobile Menu

### Usage

```js
<dp-mobile-menu title="Menu"
                home="{
                  label: 'Home',
                  url: '/sg'
                }"
                items-title="Compare:"
                :items="MENU_ITEMS">
    <template slot="top">
      <dp-button class="dp-button--primary dp-button--sm">
        <span>Log In</span>
      </dp-button>
    </template>
</dp-mobile-menu>
```

### Preview
<!-- STORY -->

### Properties

| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| title        | string        | Menu         | x          | Mobile Menu header text |
| home         | object        | { label: 'Home', url: '/sg' } | x          | Mobile Menu home link |
| itemsTitle   | string        | Compare:     | x          | Mobile Menu items main text |
| items        | array         | []           | ✓          | Mobile Menu items, basically items data should be the same with `Navbar` items |

### Available Slots

| slotName     | description |
|--------------| ------------|
| top        | Mobile Menu slot above menu items |

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
