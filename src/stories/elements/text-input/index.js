import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComTextInputReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import TextInput from './text-input'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComTextInputReadme))
  .addDecorator(withKnobs)
  .add('Text Input', () => {
    return TextInput
  })
