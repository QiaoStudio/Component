# Filter Drawer

### Usage

```HTML
<dp-filter-drawer
  :show-drawer.sync="openDrawer"
  :title="32 Plans"
  @resetFilters="onResetFilters"
  @applyFilters="onApplyFilters">
  <div>Put Content Here</div>
</dp-filter-drawer>
```

### Preview

<!-- STORY -->

### Properties

| Property name | Required  | Type         | Description         |
| ------------- | --------- | ------------ | ------------------- |
| title         | *         | String       | Title for drawer header  |
| show-drawer   | *         | Boolean      | Open drawer |

### Events

| Event name          | Description                      |
| ------------------- | -------------------------------- |
| reset-filters       | is emmited when user click RESET button |
| apply-filters       | is emmited when user click DONE button |
