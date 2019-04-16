import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComLabelReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import LabelSolid from './label-solid'
import LabelBordered from './label-bordered'
import LabelWhiteBg from './label-white-bg'

storiesOf('Elements/Label', module)
  .addDecorator(withDocs(ComLabelReadme))
  .addDecorator(withKnobs)
  .add('Solid Bg', () => {
    return LabelSolid
  })

storiesOf('Elements/Label', module)
  .addDecorator(withDocs(ComLabelReadme))
  .addDecorator(withKnobs)
  .add('Bordered', () => {
    return LabelBordered
  })

storiesOf('Elements/Label', module)
  .addDecorator(withDocs(ComLabelReadme))
  .addDecorator(withKnobs)
  .add('White Bg', () => {
    return LabelWhiteBg
  })
