import { withDocs } from 'storybook-readme'
import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import StickyReadme from './sticky/index.md'
import StickyTemplate from './sticky/index.vue'
import CenterReadme from './center/index.md'
import CenterTemplate from './center/index.vue'

storiesOf('Utilities/Alignment', module)
  .addDecorator(withDocs(CenterReadme))
  .addDecorator(withKnobs)
  .add('Center', () => CenterTemplate)

storiesOf('Utilities/Alignment', module)
  .addDecorator(withDocs(StickyReadme))
  .addDecorator(withKnobs)
  .add('Sticky', () => StickyTemplate)
