import { withDocs } from 'storybook-readme'
import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import FlipReadme from './flip/index.md'
import ShuffleReadme from './shuffle/index.md'
import FlipTemplate from './flip/index.vue'
import ShuffleTemplate from './shuffle/index.vue'

storiesOf('Utilities/Animation', module)
  .addDecorator(withDocs(FlipReadme))
  .addDecorator(withKnobs)
  .add('Flip', () => FlipTemplate)

storiesOf('Utilities/Animation', module)
  .addDecorator(withDocs(ShuffleReadme))
  .addDecorator(withKnobs)
  .add('Shuffle', () => ShuffleTemplate)
