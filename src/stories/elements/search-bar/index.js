import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import SearchBarReadMe from './basic.md'
import { withDocs } from 'storybook-readme'
import SearchBar from './search-bar'

storiesOf('Elements', module)
  .addDecorator(withDocs(SearchBarReadMe))
  .addDecorator(withKnobs)
  .add('SearchBar', () => {
    return SearchBar
  })
