import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import AuthorProfileReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import AuthorProfile from './author-profile'
storiesOf('Modules', module)
  .addDecorator(withDocs(AuthorProfileReadme))
  .addDecorator(withKnobs)
  .add('Author Profile', () => {
    return AuthorProfile
  })
