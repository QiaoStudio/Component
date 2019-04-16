import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComExclusiveReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Exclusive from './exclusive'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComExclusiveReadme))
  .addDecorator(withKnobs)
  .add('Exclusive', () => {
    return Exclusive
  })
