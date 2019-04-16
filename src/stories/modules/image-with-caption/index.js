import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComImageWithCaptionReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import ImageWithCaption from './image-with-caption'
storiesOf('Modules', module)
  .addDecorator(withDocs(ComImageWithCaptionReadme))
  .addDecorator(withKnobs)
  .add('Image With Caption', () => {
    return ImageWithCaption
  })
