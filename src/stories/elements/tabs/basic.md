# Tabs

### Usage

```js
<dp-tabs :is-tab-underline="isTabUnderline">

  <dp-tab-item label="tab 1">
    <div>
      <h1>Put any elements you want</h1>
    </div>
  </dp-tab-item>

  <dp-tab-item label="tab 2"
                      :visible="visible">
    <div>
      <h1>tab 2</h1>
    </div>
  </dp-tab-item>

  <dp-tab-item label="tab 3">
    <div>
      <h2>Put any elements you want</h2>
    </div>
  </dp-tab-item>

</dp-tabs>
```

### Preview

<div>
<!-- STORY -->
</div>

### Com Tabs Properties

| propName       | propType | defaultValue | isRequired | description                      |
| -------------- | -------- | ------------ | ---------- | -------------------------------- |
| index          | Number   | 0            | ×          | Set default tab index            |
| isTabVisible   | Boolean  | true         | ×          | Set dp-tabs__header visible      |
| isTabUnderline | Boolean  | true         | ×          | whether show tab underline theme |

### Com TabItem Properties

| propName | propType | defaultValue | isRequired | description     |
| -------- | -------- | ------------ | ---------- | --------------- |
| label    | String   | x            | ×          | Set tab text    |
| visible  | Boolean  | true         | ×          | Set tab visible |

### Event

| eventName | emit with value | value             | description                       |
| --------- | --------------- | ----------------- | --------------------------------- |
| change    | Yes             | Current tab index | When current tab index is changed |

### Keyboard interactive

| Element focus | Key           | Description                                      |
| ------------- | ------------- | ------------------------------------------------ |
| tab header    | up or left    | focus previous tab                               |
| tab header    | right or down | focus next tab                                   |
| tab header    | tab           | focus the focusable component inside tab content |
