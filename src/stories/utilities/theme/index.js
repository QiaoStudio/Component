import { withDocs } from 'storybook-readme'
import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import BackgroundTemplate from './background-colors/index.vue'
import BackgroundReadme from './background-colors/index.md'

storiesOf('Utilities/Theme', module)
  .addDecorator(withDocs(BackgroundReadme))
  .addDecorator(withKnobs)
  .add('Background Colors', () => BackgroundTemplate)
