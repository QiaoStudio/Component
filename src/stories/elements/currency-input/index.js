import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComCurrencyInputReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import CurrencyInput from './currency-input'
storiesOf('Elements', module)
  .addDecorator(withDocs(ComCurrencyInputReadme))
  .addDecorator(withKnobs)
  .add('Currency Input', () => {
    return CurrencyInput
  })
