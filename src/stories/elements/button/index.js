import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComButtonReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Button from './button'
storiesOf('Elements', module)
  .addDecorator(withDocs(ComButtonReadme))
  .addDecorator(withKnobs)
  .add('Button', () => {
    return Button
  })
