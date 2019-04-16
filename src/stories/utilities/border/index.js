import { withDocs } from 'storybook-readme'
import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import PillReadme from './pill/index.md'
import PillTemplate from './pill/index.vue'

storiesOf('Utilities/Border', module)
  .addDecorator(withDocs(PillReadme))
  .addDecorator(withKnobs)
  .add('Pill', () => PillTemplate)
