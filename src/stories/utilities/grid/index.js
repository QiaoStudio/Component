
import { withDocs } from 'storybook-readme'
import { storiesOf } from '@storybook/vue'
import Readme from './index.md'
import GridTemplate from './index.vue'

storiesOf('Utilities', module)
  .addDecorator(withDocs(Readme))
  .add('Grid', () => GridTemplate)
