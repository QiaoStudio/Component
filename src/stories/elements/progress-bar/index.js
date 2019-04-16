import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComProgressBar from './basic.md'
import { withDocs } from 'storybook-readme'
import ProgressBar from './progress-bar'
storiesOf('Elements', module)
  .addDecorator(withDocs(ComProgressBar))
  .addDecorator(withKnobs)
  .add('Progress Bar', () => {
    return ProgressBar
  })
