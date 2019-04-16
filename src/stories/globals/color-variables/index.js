import { withDocs } from 'storybook-readme'
import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import Readme from './index.md'
import SampleTemplate from './sample.vue'

storiesOf('Globals', module)
  .addDecorator(withDocs(Readme))
  .addDecorator(withKnobs)
  .add('Colors', () => SampleTemplate)
