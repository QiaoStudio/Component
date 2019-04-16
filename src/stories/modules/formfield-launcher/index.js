import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import FormfieldLauncherReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import FormfieldLauncher from './formfield-launcher'

storiesOf('Modules', module)
  .addDecorator(withDocs(FormfieldLauncherReadme))
  .addDecorator(withKnobs)
  .add('Formfield launcher', () => {
    return FormfieldLauncher
  })
