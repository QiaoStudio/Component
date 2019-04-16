import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComPremiumReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Premium from './premium'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComPremiumReadme))
  .addDecorator(withKnobs)
  .add('Premium', () => {
    return Premium
  })
