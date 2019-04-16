import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComTextInputReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import TextArea from './text-area'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComTextInputReadme))
  .addDecorator(withKnobs)
  .add('Textarea', () => {
    return TextArea
  })
