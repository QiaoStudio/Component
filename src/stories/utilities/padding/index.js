import { withDocs } from 'storybook-readme'
import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import Readme from './index.md'
import PaddingTemplate from './index.vue'

storiesOf('Utilities', module)
  .addDecorator(withDocs(Readme))
  .addDecorator(withKnobs)
  .add('Padding', () => PaddingTemplate)
