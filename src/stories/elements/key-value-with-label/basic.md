# Key Value with label

### Usage

```js
<dp-key-value-with-label
  :topLabel="topLabel"
  :valueFrom="valueFrom"
  :valueTo="valueTo"
  :asteriskVisible="asteriskVisible"
  :bottomLabel="bottomLabel"
  :alignMobile="alignMobile"
  :alignDesktop="alignDesktop">
</dp-key-value-with-label>
```

### Preview
<!-- STORY -->

### Properties

| propName | propType | defaultValue | isRequired | description |
| -------- | -------- | ------------ | ---------- | ----------- |
| topLabel  | Object  | -  |      x     |       Key value support text on top    |
| valueFrom  | Number  | ''  |      √     |       From value     |
| valueTo  | Number  | ''  |      x     |       To value. Let it blank if you want single value    |
| asteriskVisible  | Boolean  | true  |      x     |       Flag to set Asterisk's (*) visibility     |
| bottomLabel  | Object  | -  |      x     |       Key value support text on bottom    |
| alignMobile  | String  | 'center'  |      x     |       Text alignment on mobile     |
| alignDesktop  | String  | 'left'  |      x     |       Text alignment on desktop     |

## Properties of label (topLabel and bottomLabel)

| label  | propType   | defaultValue | isRequired | description |
| ------ | ---------- | ------------ | ---------- | ----------- |
| visible   |  Boolean    | true | ×          | Flag to set visibility of the label|
| content | String  |     ''   |  ×  | Content of label |
