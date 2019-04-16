import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComTabsReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Tabs from './tabs'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComTabsReadme))
  .addDecorator(withKnobs)
  .add('Tabs', () => {
    return Tabs
  })
