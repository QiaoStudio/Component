# Modal Confirmation

### Usage

```HTML
<dp-modal-confirmation
  :is-open="true"
  :icon="warning"
  :title="Sure to cancel?"
  :content="The selected values will be canceled if you say yes."
  :ok-text="Yep, I'm sure"
  :cancel-text="Let's keep going">
</dp-modal-confirmation>
```

### Preview

<!-- STORY -->

### Properties

| Property name | Required  | Type         | Default Value      | Description                                               |
| ------------- | --------- | ------------ | ------------------ | --------------------------------------------------------- |
| title         | No          | String       | 'Sure to cancel?'  | Title for confirmation modal. If it is empty, modal header will be hidden |
| icon          | No          | String       | 'warning'          | Icon is displayed at header. It is one of these values:<br>• 'warning'<br>• 'eye'<br>• 'eye-slash'<br>• 'calendar'<br>• 'lightbulb'<br>• 'question'<br>• 'check'<br>• 'times'<br>• 'star'<br>• 'info' |
| content       | No          | String       | 'The selected values will be canceled if you say yes.'  | Confirmation content |
| is-open       | No          | Boolean      | false              | Open confirmation modal |
| ok-text       | No          | String       | "Yep, I'm sure"    | Text content for Ok button. |
| cancel-text   | No          | String       | "Let's keep going" | Text content for Cancel button. If it is empty, button cancel is hidden |

### Events

| Event name                     | Description                      |
| ------------------------------ | -------------------------------- |
| modal-confirmation-close       | is emmited when user click Cancel button |
| confirm                        | is emmited when user click Ok button |
