import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComPanelReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import AuthorByline from './author-byline'

storiesOf('Modules', module)
  .addDecorator(withDocs(ComPanelReadme))
  .addDecorator(withKnobs)
  .add('Author byline', () => {
    return AuthorByline
  })
