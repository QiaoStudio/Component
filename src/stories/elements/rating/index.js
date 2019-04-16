import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComRatingReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Rating from './rating'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComRatingReadme))
  .addDecorator(withKnobs)
  .add('Rating', () => {
    return Rating
  })
