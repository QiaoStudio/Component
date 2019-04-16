import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComLoaderReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Loader from './loader'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComLoaderReadme))
  .addDecorator(withKnobs)
  .add('Loader', () => {
    return Loader
  })
