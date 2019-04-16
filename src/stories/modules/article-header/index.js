import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComArticleHeaderReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import ArticleHeader from './article-header'
storiesOf('Modules', module)
  .addDecorator(withDocs(ComArticleHeaderReadme))
  .addDecorator(withKnobs)
  .add('Article Header', () => {
    return ArticleHeader
  })
