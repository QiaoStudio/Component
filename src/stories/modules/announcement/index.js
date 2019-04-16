import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComAnnouncementReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Announcement from './announcement'

storiesOf('Modules', module)
  .addDecorator(withDocs(ComAnnouncementReadme))
  .addDecorator(withKnobs)
  .add('Announcement', () => {
    return Announcement
  })
