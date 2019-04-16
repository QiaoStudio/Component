import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComLabelReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Quote from './quote'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComLabelReadme))
  .addDecorator(withKnobs)
  .add('Quote', () => {
    return Quote
  })
