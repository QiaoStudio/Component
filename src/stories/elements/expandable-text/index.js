import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComExpandableTextReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import ExpandableText from './expandable-text'
storiesOf('Elements', module)
  .addDecorator(withDocs(ComExpandableTextReadme))
  .addDecorator(withKnobs)
  .add('Expandable Text', () => {
    return ExpandableText
  })
