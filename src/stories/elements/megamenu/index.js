import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComMegamenuReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Megamenu from './megamenu'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComMegamenuReadme))
  .addDecorator(withKnobs)
  .add('Megamenu', () => {
    return Megamenu
  })
