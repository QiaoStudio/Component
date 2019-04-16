import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComNavbarReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Navbar from './navbar'
import NavbarTH from './navbar-thailand'
import NavbarHK from './navbar-hongkong'

storiesOf('Modules/Navbar', module)
  .addDecorator(withDocs(ComNavbarReadme))
  .addDecorator(withKnobs)
  .add('Navbar', () => {
    return Navbar
  })

storiesOf('Modules/Navbar', module)
  .addDecorator(withDocs(ComNavbarReadme))
  .addDecorator(withKnobs)
  .add('Navbar - TH', () => {
    return NavbarTH
  })

storiesOf('Modules/Navbar', module)
  .addDecorator(withDocs(ComNavbarReadme))
  .addDecorator(withKnobs)
  .add('Navbar - HK', () => {
    return NavbarHK
  })
