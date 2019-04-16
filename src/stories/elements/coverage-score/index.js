import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComCoverageScoreReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import CoverageScore from './coverage-score'
storiesOf('Elements', module)
  .addDecorator(withDocs(ComCoverageScoreReadme))
  .addDecorator(withKnobs)
  .add('Coverage Score', () => {
    return CoverageScore
  })
