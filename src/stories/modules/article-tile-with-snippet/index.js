import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComArticleTileWithSnippetReadMe from './basic.md'
import { withDocs } from 'storybook-readme'
import ArticleTileWithSnippet from './article-tile-with-snippet'

storiesOf('Modules', module)
  .addDecorator(withDocs(ComArticleTileWithSnippetReadMe))
  .addDecorator(withKnobs)
  .add('Article Tile With Snippet', () => {
    return ArticleTileWithSnippet
  })
