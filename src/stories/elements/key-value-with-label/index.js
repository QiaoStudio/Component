import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComKeyValueWithLabel from './basic.md'
import { withDocs } from 'storybook-readme'
import KeyValueWithLable from './key-value-with-label'
storiesOf('Elements', module)
  .addDecorator(withDocs(ComKeyValueWithLabel))
  .addDecorator(withKnobs)
  .add('Key Value with Label', () => {
    return KeyValueWithLable
  })
