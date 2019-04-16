import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComCurrencyInputReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import DatePicker from './date-picker'
storiesOf('Elements', module)
  .addDecorator(withDocs(ComCurrencyInputReadme))
  .addDecorator(withKnobs)
  .add('Datepicker', () => {
    return DatePicker
  })
