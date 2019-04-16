import { storiesOf } from '@storybook/vue'
import SetUpByCDNReadMe from './SETUP-CDN.md'
import SetUpByNPMReadMe from './SETUP-NPM.md'
import SetUpSCSSReadMe from './SETUP-SCSS.md'
import { withDocs } from 'storybook-readme'

storiesOf('Setup', module)
  .addDecorator(withDocs(SetUpByCDNReadMe))
  .add('Set up by CDN', () => { })

storiesOf('Setup', module)
  .addDecorator(withDocs(SetUpByNPMReadMe))
  .add('Set up by npm', () => { })

storiesOf('Setup', module)
  .addDecorator(withDocs(SetUpSCSSReadMe))
  .add('Set up scss variable', () => { })
