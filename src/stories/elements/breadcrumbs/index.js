import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComBreadcrumbs from './basic.md'
import { withDocs } from 'storybook-readme'
import Breadcrumbs from './breadcrumbs'
storiesOf('Elements', module)
  .addDecorator(withDocs(ComBreadcrumbs))
  .addDecorator(withKnobs)
  .add('Breadcrumbs', () => {
    return Breadcrumbs
  })
