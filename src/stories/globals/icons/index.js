import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComIconReadme from './basic.md'
import CountryIconReadme from './country-icon.md'
import FontAwesomeReadme from './fontawesome.md'
import { withDocs } from 'storybook-readme'
import BrandIcon from './brand-icon'
import ProductIcon from './product-icon'
import CountryIcon from './country-icon'
import FontAwesomeIcon from './fontawesome-icon'

storiesOf('Globals/Icons', module)
  .addDecorator(withDocs(ComIconReadme))
  .addDecorator(withKnobs)
  .add('Brand Icons', () => {
    return BrandIcon
  })
  .add('Product Icons', () => {
    return ProductIcon
  })

storiesOf('Globals/Icons', module)
  .addDecorator(withDocs(CountryIconReadme))
  .addDecorator(withKnobs)
  .add('Country Icons', () => {
    return CountryIcon
  })

storiesOf('Globals/Icons', module)
  .addDecorator(withDocs(FontAwesomeReadme))
  .addDecorator(withKnobs)
  .add('FontAwesome Icons', () => {
    return FontAwesomeIcon
  })
