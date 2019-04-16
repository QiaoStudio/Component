import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComMobileMenuReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import MobileMenu from './mobile-menu'
import MobileMenuTH from './mobile-menu-th'
import MobileMenuHK from './mobile-menu-hk'
import WithTop from './with-top'

storiesOf('Modules/Mobile Menu', module)
  .addDecorator(withDocs(ComMobileMenuReadme))
  .addDecorator(withKnobs)
  .add('Default', () => {
    return MobileMenu
  })

storiesOf('Modules/Mobile Menu', module)
  .addDecorator(withDocs(ComMobileMenuReadme))
  .addDecorator(withKnobs)
  .add('With Top Slot', () => {
    return WithTop
  })

storiesOf('Modules/Mobile Menu', module)
  .addDecorator(withDocs(ComMobileMenuReadme))
  .addDecorator(withKnobs)
  .add('Mobile Menu - TH', () => {
    return MobileMenuTH
  })

storiesOf('Modules/Mobile Menu', module)
  .addDecorator(withDocs(ComMobileMenuReadme))
  .addDecorator(withKnobs)
  .add('Mobile Menu - HK', () => {
    return MobileMenuHK
  })
