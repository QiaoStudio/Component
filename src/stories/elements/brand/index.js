import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComBrandReadme from './basic.md'
import { withDocs } from 'storybook-readme'
import Brand from './brand.vue'
storiesOf('Elements', module)
  .addDecorator(withDocs(ComBrandReadme))
  .addDecorator(withKnobs)
  .add('Brand', () => {
    return Brand
  })
