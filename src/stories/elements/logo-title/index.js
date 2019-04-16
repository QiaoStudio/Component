import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComLogoTitleBasicReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import LogoTitle from './logo-title'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComLogoTitleBasicReadme))
  .addDecorator(withKnobs)
  .add('Logo Title', () => {
    return LogoTitle
  })
