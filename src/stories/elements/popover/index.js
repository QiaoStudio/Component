import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComPopoverReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Popover from './popover'
storiesOf('Elements', module)
  .addDecorator(withDocs(ComPopoverReadme))
  .addDecorator(withKnobs)
  .add('Popover', () => {
    return Popover
  }, {
    knobs: {
      escapeHTML: false
    }
  }
  )
