import { withDocs } from 'storybook-readme'
import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import DisplayReadme from './display/index.md'
import DisplayTemplate from './display/index.vue'
import HorizontalContainerReadme from './horizontal-container/index.md'
import HorizontalContainerTemplate from './horizontal-container/index.vue'

storiesOf('Utilities/Layout', module)
  .addDecorator(withDocs(DisplayReadme))
  .addDecorator(withKnobs)
  .add('Displays', () => DisplayTemplate)

storiesOf('Utilities/Layout', module)
  .addDecorator(withDocs(HorizontalContainerReadme))
  .addDecorator(withKnobs)
  .add('Horizontal Container', () => HorizontalContainerTemplate)
