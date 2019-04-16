import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComMessageReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Message from './message'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComMessageReadme))
  .addDecorator(withKnobs)
  .add('Message', () => {
    return Message
  })
