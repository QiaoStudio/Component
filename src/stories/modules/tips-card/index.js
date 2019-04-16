import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComTipsCardReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import TipsCard from './tips-card'

storiesOf('Modules', module)
  .addDecorator(withDocs(ComTipsCardReadme))
  .addDecorator(withKnobs)
  .add('Tips Card', () => {
    return TipsCard
  })
