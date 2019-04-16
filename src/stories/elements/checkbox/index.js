import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import CheckboxBasicReadme from './dp-checkbox-basic.md'
import CheckboxGroupReadme from './dp-checkbox-group.md'
import { withDocs } from 'storybook-readme'
import Checkbox from './checkbox'
import SmallCheckbox from './small-checkbox'
import CheckboxGroup from './checkbox-group'

storiesOf('Elements/Checkbox', module)
  .addDecorator(withDocs(CheckboxBasicReadme))
  .addDecorator(withKnobs)
  .add('Basic Checkbox', () => {
    return Checkbox
  })

storiesOf('Elements/Checkbox', module)
  .addDecorator(withDocs(CheckboxBasicReadme))
  .addDecorator(withKnobs)
  .add('Small Checkbox', () => {
    return SmallCheckbox
  })

storiesOf('Elements/Checkbox', module)
  .addDecorator(withDocs(CheckboxGroupReadme))
  .addDecorator(withKnobs)
  .add('Checkbox Group', () => {
    return CheckboxGroup
  })
