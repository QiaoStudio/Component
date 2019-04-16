# Footer

### Usage

#### VueJS

```javascript
<dp-footer :links="links"
           :social-media="socialMedia"
           :countries="countries"
           :copyright="copyright"
           :policy-links="policyLinks" />
```

### Preview
<!-- STORY -->

### Properties

| propName     | propType      | defaultValue  | isRequired | description |
|--------------|---------------|---------------|------------| ------------|
| links        | array         |               | √          | Footer link items |
| socialMedia  | object        |               | √          | Footer social media item links |
| countries    | array         |               | √          | Footer country item links |
| copyright    | string        |               | √          | Footer copyright text |
| policyLinks  | array         |               | √          | Footer policy item links |


### Data structure (Links)

| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| columnClass  | string        |              | √          | Links column class (based from Bootstrap Grid system) |
| title        | string        |              | √          | Links title text |
| items        | array         |              | √          | Links items |
| items[columnClass] | string  |              | √          | Links item column class (based from Bootstrap Grid system) |
| items[title] | string        |              | √          | Links item title text |
| items[url]   | string        |              | √          | Links item url |


### Links - Sample data structure

```json
[
  {
    "columnClass": "col-lg-2",
    "title": "GoBear",
    "items": [
      {
        "columnClass": "col-sm-12",
        "title": "About us",
        "url": "/sg/about-us"
      },
      ...
    ]
  },
  ...
]
```


### Data structure (Social Media)

| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| title        | string        |              | √          | Social Media title text |
| items        | array         |              | √          | Social Media items |
| items[icon]  | string        |              | √          | Social Media item icon name |
| items[url]   | string        |              | √          | Social Media item url |


### Social Media - Sample data structure

```json
{
  "title": "Follow",
  "items": [
    {
      "icon": "facebook",
      "url": "https://www.facebook.com/GoBearSG"
    },
    ...
  ]
}
```


### Data structure (Countries)

| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| name         | string        |              | √          | Country code name |
| url          | string        |              | √          | Country item url |


### Countries - Sample data structure

```json
[
  {
    "name": "hk",
    "url": "/hk"
  },
  ...
]
```


### Data structure (Policy Links)

| propName     | propType      | defaultValue | isRequired | description |
|--------------|---------------|--------------|------------| ------------|
| title        | string        |              | √          | Policy Links title text |
| url          | string        |              | √          | Policy Links item url |


### Policy Links - Sample data structure

```json
[
  {
    "title": "Terms",
    "url": "/sg/terms-and-conditions"
  },
  ...
]
```
