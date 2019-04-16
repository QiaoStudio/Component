# Article Tile

### Usage
```js
<dp-mobile-dual-key-value-tile
  :exclusive-message="exclusiveMessage"
  :insurer-logo="insurerLogo"
  :maxWidth="maxWidth"
  :maxHeight="maxHeight"
  :containerWidth="containerWidth"
  :containerHeight="containerHeight"
  :imgVertAlignMobile="imgVertAlignMobile"
  :imgVertAlignDesktop="imgVertAlignDesktop"
  :imgHorizAlignMobile="imgHorizAlignMobile"
  :imgHorizAlignDesktop="imgHorizAlignDesktop"
  :insurer-name="insurerName"
  :plan-name="planName"
  :alt="alt"
  :promotion="promotion"
  :top-label1="topLabel1"
  :value-from1="valueFrom1"
  :value-to1="valueTo1"
  :asterisk-visible1="asteriskVisible1"
  :bottom-label1="bottomLabel1"
  :alignMobile1="alignMobile1"
  :alignDesktop1="alignDesktop1"
  :top-label2="topLabel2"
  :value-from2="valueFrom2"
  :value-to2="valueTo2"
  :asterisk-visible2="asteriskVisible2"
  :bottom-label2="bottomLabel2"
  :alignMobile2="alignMobile2"
  :alignDesktop2="alignDesktop2">
</dp-mobile-dual-key-value-tile>
```

### Preview
<!-- STORY -->

### Properties
| propName    | propType   | defaultValue| isRequired | description |
|-------------|------------|-------------|------------|-------------|
| exclusiveMessage       | object     | -           | ×          | Exclusive Message setting object|
| insurerLogo       | String     | -           |   √        | set insurer logo source url |
| maxWidth  |  number    | -           | ×          | max width of logo image inside container in px, if not set, max-width is 100%|
| maxHeight  |  number    | -           | ×          | max height of logo image inside container in px, if not set, max-height is 100%|
| insurerName       | String     | -           | x          | set insurer namne  |
| containerWidth |  number |     62       | ×          | Width of image container |
| containerHeight |  number | 62           | ×          | Height of image container |
| imgVertAlignMobile |  string | center           | ×          | Vertical alignment on mobile of image inside container. Can be: top, bottom, center |
| imgVertAlignDesktop |  string | center           | ×          | Vertical alignment on desktop of image inside container. Can be: top, bottom, center |
| imgHorizAlignMobile |  string | center           | ×          | Horizontal alignment on mobile of image inside container. Can be: left, right, center |
| imgHorizAlignDesktop |  string | center           | ×          | Horizontal alignment on desktop of image inside container. Can be: left, right, center |
| planName       | String     | -           | ×          | set the plan name  |
| alt |  string | logo           | ×          | Alt value for logo image |
| promotion       | Object     | -           | ×          | promotion setting object |
| topLabel1       | Object     | -           | ×          | top label 1 setting object  |
| valueFrom1       | Number     | -           | √          | set value from  |
| valueTo1       | Number     | -           | x          | set the To value 1. Let it blank if you want single value |
| asteriskVisible1       | Boolean     | true           | ×          | set visibility of asterisk 1  |
| bottomLabel1       | Object     | -           | ×          | bottom label 1 setting object  |
| topLabel2       | Object     | -           | ×          | top label 2 setting object |
| valueFrom2       | Number     | -           | √          | set value from 2 |
| valueTo2       | Number     | -           | x          | set the To value 2. Let it blank if you want single value  |
| asteriskVisible2       | Boolean     | true           | ×          | set visibility of asterisk 2  |
| bottomLabel2       | Object     | -           | ×          | bottom label 2 setting object  |

## Properties of exclusiveMessage, topLabel1, bottomLabel1, topLabel2, bottomLabel2

| label | propType | defaultValue | isRequired | description |
| ----- | -------- | ------------ | ---------- | ----------- |
| visibility   |  Boolean    | true | ×          | Flag to set visibility of the label|
| content | String  |     ''   |  ×  | Content of label |

## Properties of promotion

| label | propType | defaultValue | isRequired | description |
| ----- | -------- | ------------ | ---------- | ----------- |
| visibility   |  Boolean    | true | ×          | Flag to set visibility of the label|
| summary | String  |     ''   |  ×  | Summary of promotion |
| actionLabel | String  |     ''   |  ×  | Promotion action label |
