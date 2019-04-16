# Icons (Country)

### Usage

#### Vue.js

```HTML
<dp-icon
  :type="type"
  :category="category">
</dp-icon>
```

#### HTML

```HTML
<span class="dp-icon dp-icon__country dp-icon__country--sg"></span>
```

### Preview

<!-- STORY -->

### Properties

| propName  | propType   | defaultValue| isRequired | description |
|-----------|------------|------------ |------------|-------------|
| type      |  String    |    -        |   √        | Icon type, `country`  |
| category  |  String    |    -        |   √        | Icon category, `hk`, `id`, `my`, `ph`, `sg`, `th`, and `vn` |

### Classes

| Class Name | Is Required | Description |
|---------- |------------| ------------ |
|  dp-icon  |      √     |  Default icon style  |
|  dp-icon__country |      √     |  Default country icon style  |

### Icon category classes

Please select one class from below table based on the type of icon you need.

| Class Name |
|---------- |
| dp-icon__country--hk |
| dp-icon__country--id |
| dp-icon__country--my |
| dp-icon__country--ph |
| dp-icon__country--sg |
| dp-icon__country--th |
| dp-icon__country--vn |
