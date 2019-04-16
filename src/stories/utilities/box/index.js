import { withDocs } from 'storybook-readme'
import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import TileReadme from './tile/index.md'
import TileTemplate from './tile/index.vue'

storiesOf('Utilities/Box', module)
  .addDecorator(withDocs(TileReadme))
  .addDecorator(withKnobs)
  .add('Tile', () => TileTemplate)
