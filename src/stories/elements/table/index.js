import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComBlog from './basic.md'
import { withDocs } from 'storybook-readme'
import Table from './table'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComBlog))
  .addDecorator(withKnobs)
  .add('Table', () => {
    return Table
  })
