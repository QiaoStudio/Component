import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComFooterReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Footer from './footer'

storiesOf('Modules', module)
  .addDecorator(withDocs(ComFooterReadme))
  .addDecorator(withKnobs)
  .add('Footer', () => {
    return Footer
  })
