import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComAlertPromptReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import ModalConfirmation from './modal-confirmation'

storiesOf('Modules', module)
  .addDecorator(withDocs(ComAlertPromptReadme))
  .addDecorator(withKnobs)
  .add('Modal confirmation', () => {
    return ModalConfirmation
  })
