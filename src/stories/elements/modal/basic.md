# Modal

### Usage

#### VueJS

```javascript
<dp-modal
  :is-vetically="isVetically"
  :enable-close="enableClose"
  :use-hash="useHash"
  :is-sticky = "isSticky"
  :windowed-modal = "windowedModal"
  :open-popup.sync = "openPopup"
  :open-direction = "openDirection">
  <div slot= "title">Searching travel insurance</div>
  <div>This is content part</div>
  <div slot="footer">Modal Footer</div>
</dp-modal>
```

### Preview

<!-- STORY -->

### Properties

| propName        | propType | defaultValue | isRequired | description                                                                                   |
|-----------------|----------|--------------|------------|-----------------------------------------------------------------------------------------------|
| isVetically     | boolean  | true         | false      | modal vertical align                                                                          |
| windowedModal   | boolean  | false        | false      | flexible modal style only in mobile                                                           |
| isContentScroll | boolean  | true         | false      | scroll content in modal or not in flexible modal style                                        |
| isSticky        | boolean  | true         | false      | modal footer sticky                                                                           |
| openPopup       | boolean  | false        | true       | modal open                                                                                    |
| enableClose     | boolean  | true         | false      | close button show , when hidden user not able to close modal, only through openPopup to close |
| useHash         | boolean  | true         | false      | if true , close modal when browser back                                                       |
| openDirection   | string   | ''           | false      | direction when open modal. Value can be 'bottom', 'right' or 'left'                           |
| isFullScreen    | boolean  | false        | false      | show the modal dialog full screen or not                                                      |

### Event

| eventName        | emit with value | value   | description                                     |
|------------------|-----------------|---------|-------------------------------------------------|
| before-close     | No              | -       | Before modal close                              |
| after-close      | No              | -       | After modal close                               |
| update:openPopup | Yes             | Boolean | When openPopup is changed, emit openPopup value |
| before-open      | No              | -       | Before modal shown                              |
| after-shown      | No              | -       | After modal shown                               |
