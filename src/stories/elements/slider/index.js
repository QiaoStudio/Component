import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComTextInputReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Slider from './slider'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComTextInputReadme))
  .addDecorator(withKnobs)
  .add('Slider', () => {
    return Slider
  })
