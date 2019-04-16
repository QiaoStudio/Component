# Image with Caption

### Usage
```html
  <div class="dp-blog" style="max-width: 700px; margin:auto;">
    <p class="dp-p--text">Lorem ipsum dolor sit amet...</p>
    <dp-image-with-caption sizeImage="40">
      <img slot="image" src="https://picsum.photos/2000/600">
      <p slot="caption">Image credit: example.com</p>
    </dp-image-with-caption>
    <p class="dp-p--text">Lorem ipsum dolor sit amet, ...</p>
  </div>
```

### Preview
<!-- STORY -->

### Properties
| propName  | propType | defaultValue | isRequired | description               |
| --------- | -------- | ------------ | ---------- | ------------------------- |
| sizeImage | Number   | 100          | x          | set collapsed image width |

### Slots
| Slot Name | description             |
| --------- | ----------------------- |
| image     | Review tile header text |
| caption   | Review tile description |

### Classes
| className | isRequired | description |
| dp-image-with-caption__text--center | x | align center for image's caption |
