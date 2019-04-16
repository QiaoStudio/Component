import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import RadioBasicReadme from './dp-radio-basic.md'
import RadioGroupReadme from './dp-radio-group.md'
import { withDocs } from 'storybook-readme'
import Radio from './radio'
import RadioGroup from './radio-group'

storiesOf('Elements/Radio', module)
  .addDecorator(withDocs(RadioBasicReadme))
  .addDecorator(withKnobs)
  .add('Basic Radio', () => {
    return Radio
  })

storiesOf('Elements/Radio', module)
  .addDecorator(withDocs(RadioGroupReadme))
  .addDecorator(withKnobs)
  .add('Radio Group', () => {
    return RadioGroup
  })

