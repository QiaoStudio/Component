import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComAutocompleteSingleReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Autocomplete from './autocomplete'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComAutocompleteSingleReadme))
  .addDecorator(withKnobs)
  .add('Autocomplete', () => {
    return Autocomplete
  })
