import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComBadgeReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Badge from './badge'
storiesOf('Elements', module)
  .addDecorator(withDocs(ComBadgeReadme))
  .addDecorator(withKnobs)
  .add('Badge', () => {
    return Badge
  })
