import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComCoverageDetailReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import CoverageDetail from './coverage-detail'

storiesOf('Elements', module)
  .addDecorator(withDocs(ComCoverageDetailReadme))
  .addDecorator(withKnobs)
  .add('Coverage Detail', () => {
    return CoverageDetail
  })
