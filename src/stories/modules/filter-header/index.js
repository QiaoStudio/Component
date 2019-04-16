import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import README from './basic.md'
import { withDocs } from 'storybook-readme'
import FilterHeader from './filter-header'

storiesOf('Modules', module)
  .addDecorator(withDocs(README))
  .addDecorator(withKnobs)
  .add('Filter Header', () => {
    return FilterHeader
  })
