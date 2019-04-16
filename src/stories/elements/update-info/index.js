import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComUpdateInfoReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import UpdateInfo from './update-info'
storiesOf('Elements', module)
  .addDecorator(withDocs(ComUpdateInfoReadme))
  .addDecorator(withKnobs)
  .add('Update Info', () => {
    return UpdateInfo
  })
