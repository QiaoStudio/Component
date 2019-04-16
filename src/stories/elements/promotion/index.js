import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComPromotionReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Promotion from './promotion'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComPromotionReadme))
  .addDecorator(withKnobs)
  .add('Promotion', () => {
    return Promotion
  })
