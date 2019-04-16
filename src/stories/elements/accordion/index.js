import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import ComAccordionReadme from './dp-accordion-basic.md'
import ComAccordionGroupReadme from './dp-accordion-group.md'
import { withDocs } from 'storybook-readme'
import AccordionGroup from './accordion-group'
import Accordion from './accordion'

storiesOf('Elements/Accordion', module)
  .addDecorator(withDocs(ComAccordionReadme))
  .addDecorator(withKnobs)
  .add('Basic Accordion', () => {
    return Accordion
  })

storiesOf('Elements/Accordion', module)
  .addDecorator(withDocs(ComAccordionGroupReadme))
  .addDecorator(withKnobs)
  .add('Accordion Group', () => {
    return AccordionGroup
  })
