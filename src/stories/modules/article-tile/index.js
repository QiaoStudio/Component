import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComPanelReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import ArticleTile from './article-tile'

storiesOf('Modules', module)
  .addDecorator(withDocs(ComPanelReadme))
  .addDecorator(withKnobs)
  .add('Article Tile', () => {
    return ArticleTile
  })
