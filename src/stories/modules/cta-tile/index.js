import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import CTATile from './basic.md'
import { withDocs } from 'storybook-readme'
import CtaTile from './cta-tile'

storiesOf('Modules', module)
  .addDecorator(withDocs(CTATile))
  .addDecorator(withKnobs)
  .add('CTA Tile', () => {
    return CtaTile
  })
