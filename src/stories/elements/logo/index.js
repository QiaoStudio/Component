import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComLogoBasicReadme from './basic.md'
import ComLogoBaiscWithTextReadme from './basic-with-text.md'
import { withDocs } from 'storybook-readme'
import Logo from './logo'
import LogoWithText from './logo-with-text'

storiesOf('Elements/Logo', module)
  .addDecorator(withDocs(ComLogoBasicReadme))
  .addDecorator(withKnobs)
  .add('Basic Logo', () => {
    return Logo
  })

storiesOf('Elements/Logo', module)
  .addDecorator(withDocs(ComLogoBaiscWithTextReadme))
  .addDecorator(withKnobs)
  .add('Basic with Text', () => {
    return LogoWithText
  })
