# Filter Header

### Usage

```HTML
<dp-filter-header
  edit-label="Edit Search"
  filter-label="Filter"
  :status="status"
  :sticky="sticky"
  :current-filters="10"
  :searchDetail="searchDetail">
</dp-filter-header>
```

### Preview

<!-- STORY -->

### Properties

| Property name   | Required | Default | Type    | Description                           |
| --------------- | -------- | ------- | ------- | ------------------------------------- |
| edit-label      |          |         | String  | Edit Search Label                     |
| filter-label    |          |         | String  | Filter Label                          |
| status          |          |         | String  | Filter status                         |
| sticky          |          | false   | Boolean | Make header sticky at top             |
| current-filters |          |         | Number  | Number of current applied filters     |
| search-detail   |          |         | String  | Label text underneath the filter head |

### Events

| Event name  | Description                              |
| ----------- | ---------------------------------------- |
| open-filter | is emmited when user click FILTER button |
| open-search | is emmited when user click EDIT button   |
