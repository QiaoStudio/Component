import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComSelectReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Select from './select'

storiesOf('Elements', module)
  .addDecorator(withKnobs)
  .addDecorator(withDocs(ComSelectReadme))
  .add('Select', () => {
    return Select
  })
