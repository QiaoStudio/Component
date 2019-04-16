import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComBlogCategoryTileReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import ComBlogCategoryTile from './blog-category-tile'

storiesOf('Modules', module)
  .addDecorator(withDocs(ComBlogCategoryTileReadme))
  .addDecorator(withKnobs)
  .add('Blog Category Tile', () => {
    return ComBlogCategoryTile
  })
