import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComPanelReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import SelectionBlock from './selection-block'

storiesOf('Modules', module)
  .addDecorator(withDocs(ComPanelReadme))
  .addDecorator(withKnobs)
  .add('Selection Block', () => {
    return SelectionBlock
  })
