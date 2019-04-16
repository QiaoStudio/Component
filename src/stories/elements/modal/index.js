import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComModalReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Modal from './modal'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComModalReadme))
  .addDecorator(withKnobs)
  .add('Modal', () => {
    return Modal
  })
