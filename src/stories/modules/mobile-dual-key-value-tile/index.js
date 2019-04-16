import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComMobileDualKeyValueTile from './basic.md'
import { withDocs } from 'storybook-readme'
import MobileDualKeyValueTile from './mobile-dual-key-value-tile'

storiesOf('Modules', module)
  .addDecorator(withDocs(ComMobileDualKeyValueTile))
  .addDecorator(withKnobs)
  .add('Mobile Dual Key Value Tile', () => {
    return MobileDualKeyValueTile
  })
