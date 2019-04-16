# Sticky Positioning Mixin
Sticks element on top

### Preview
<!-- STORY -->

### Usage
Use directive 'v-sticky-position' on the element

```js
  <div class="wrapper">
    <main class="main">
      <div class="sidebar" v-sticky-position>
        {{ Sidebar content }}
      </div>
      <div class="content">
        {{ Main content }}
      </div>
    </main>
  </div>
```

### Note
The sticked element must have display block in order to be able to stick at top.
