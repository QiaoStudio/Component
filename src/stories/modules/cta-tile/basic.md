# CTA Tile

### Vue Usage
```js
  <dp-cta-tile :title="title"
                                :caption="caption">
                                <i slot="iconTitle" class="fa fa-arrow-right"></i>
                                <span slot="iconDesktop" class="dp-icon dp-icon--lg-only dp-icon__brand--compare"></span>
                                <span slot="iconMobile" class="dp-icon dp-icon__brand--compare dp-icon--md-only"></span>
                    </dp-cta-tile>
```

#### Basic HTML

```HTML
  <a class="dp-cta-tile dp-tile__outline dp-blog" href="https://www.xxxxxx.com" target="_self">
    <span class="dp-cta-tile__text-container">
      <span class="dp-cta-tile__text-container__title">
        <span>Compare the best shopping and grocery credit cards on GoBear</span>
        <i class="fa fa-arrow-right"></i>
      </span>
      <span class="dp-cta-tile__text-container__caption">
        <span class="dp-p--sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus vehicula ante in dignissim.</span>
        <span class="dp-cta-tile__icon-container--mobile">
          <span class="dp-icon dp-icon__brand--compare dp-icon--md-only"></span>
        </span>
      </span>
    </span>
    <span class="dp-cta-tile__icon-container--desktop">
      <span class="dp-icon dp-icon--lg-only dp-icon__brand--compare"></span>
    </span>
  </a>
```

### Preview
<!-- STORY -->

### Properties
| propName | propType | defaultValue | isRequired | description                                |
| -------- | -------- | ------------ | ---------- | ------------------------------------------ |
| title    | String   | ''           | √          | Tile title                                 |
| caption  | String   | ''           | ×          | Tile caption                               |
| link     | String   | ''           | ×          | Tile link                                  |
| target   | Boolean  | false        | x          | true if target blank, false if target self |

### Classes

| className                                              | isRequired | description                            |
| ------------------------------------------------------ | ---------- | -------------------------------------- |
| dp-cta-tile                                            | √          | Wrapped cta tile                       |
| dp-tile                                                | √          | Wrapped the tile                       |
| dp-tile-outlineÏ                                       | √          | Wrapped the tile with outline css      |
| dp-blog                                                | √          | Wrapped the tile to use blog's style   |
| dp-cta-tile__text-container                            | √          | Wrapped the title and caption          |
| dp-cta-tile\__text-container\__title                   | √          | Wrapped the title                      |
| fa fa-arrow-right                                      | √          | Arrow right icon                       |
| dp-cta-tile\__text-container\__caption                 | √          | Wrapped the caption                    |
| dp-p--sub dp-cta-tile\__text-container\__caption__text | √          | Wrapped the caption text               |
| dp-cta-tile__icon-container--mobile                    | √          | Wrapped the icon on mobile             |
| dp-icon dp-icon__brand--compare dp-icon--md-only       | x          | Example of icon from dp-icon (md size) |
| dp-cta-tile__icon-container--desktop                   | √          | Wrapped the icon on desktop            |
| dp-icon dp-icon--lg-only dp-icon__brand--compare       | x          | Example of icon from dp-icon (lg size) |

### Slots
| Slot Name   | description                                             |
| ----------- | ------------------------------------------------------- |
| iconTitle   | Icon right after the tile title, default is arrow-right |
| iconMobile  | Icon of the Tile on mobile mode                         |
| iconDesktop | Icon of the Tile on desktop/tablet mode                 |
