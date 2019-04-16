# Coverage Score

### Usage

#### Vue.js

```HTML
<dp-coverage-score
  :score="score"
  :scoreBase="scoreBase"
  :totalScore="totalScore">
</dp-coverage-score>
```

#### HTML

```HTML
<span class="dp-coverage-score">
    {{ score }}
</span>
```

### Preview
<!-- STORY -->

### Classes

| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| score        |     Number    |      0       |      x     | The value of score |
| scoreBase    |     Number    |      5       |      x     | The value of base score |
| totalScore   |     Number    |       0      |      x     | The value of total score |

### Events

| eventName     | emit with value |  value  | description |
|---------------|-----------------|---------|-------------|
| score-popup    |      false      |  event  | Occurs when score gets user click|

### Classes

| className | isRequired | description |
|---------- |------------ | ------------ |
| dp-coverage-score  |      √     |       Default coverage score style     |
